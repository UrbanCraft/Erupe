"""
A simple gameguard disabler for Monster Hunter Frontier (JP).

Requires Python3.7 and frida (via pip: `py -3 -m pip install frida`).

Usage:
    1. Place script in the same folder as you mhf.exe.
    2. Open a cmd prompt as admin and run the script, it will spawn the game launcher with the gameguard init patched out.
    3. Leave running until you are entirely in-game, as it has to patch both mhf.exe AND mhfo.dll after they unpack.
"""

import frida
import time
import psutil

def getServerAddress():
    try:
        with open("SERVER", "r") as fh:
            return fh.read().strip()

    except Exception:
        return "127.0.0.1"

def main():
    executable_name = "mhf.exe"
    serverAddress = getServerAddress()
    pID = frida.spawn(executable_name)
    session = frida.attach(pID)

    print(f"Connecting to server at {serverAddress}")

    script = session.create_script(f"""
    var serverAddress = "{serverAddress}";

    """ + """

    var redirectedHosts = [
        "mhfg.capcom.com.tw",
        "mhf-n.capcom.com.tw",
        "cog-members.mhf-z.jp",
        "www.capcom-onlinegames.jp",
        "srv-mhf.capcom-networks.jp",
        "mhf-z.jp"
    ]

    function shouldRedirectHost(name) {
        return redirectedHosts.includes(name);
    }

    //Intercept network requests without HOSTS file
    Interceptor.attach(Module.findExportByName("ws2_32.dll", "gethostbyname"), {
        onEnter: function(args) {
            var namePointer = args[0];
            var name = namePointer.readCString();

            if (shouldRedirectHost(name)) {
                namePointer.writeUtf8String(serverAddress);

                console.log(`Redirecting gethostbyname from ${name} -> ${serverAddress}`);
            }
        }
    });

    Interceptor.attach(Module.findExportByName("ws2_32.dll", "inet_addr"), {
        onEnter: function(args) {
            var namePointer = args[0];
            var name = namePointer.readCString();

            if (shouldRedirectHost(name)) {
                namePointer.writeUtf8String(serverAddress);

                console.log(`Redirecting inet_addr from ${name} -> ${serverAddress}`);
            }
        }
    });

    Interceptor.attach(Module.findExportByName("ws2_32.dll", "GetAddrInfoExW"), {
        onEnter: function(args) {
            var namePointer = args[0];
            var name = namePointer.readUtf16String();

            if (shouldRedirectHost(name)) {
                namePointer.writeUtf16String(serverAddress);

                console.log(`Redirecting GetAddrInfoExW from ${name} -> ${serverAddress}`);
            }
        }
    });
/*
    Interceptor.attach(Module.findExportByName("ws2_32.dll", "GetAddrInfoExA"), {
        onEnter: function(args) {
            console.log("GetAddrInfoExA OnEnter")
            var namePointer = args[0];
            var name = namePointer.readCString();

            if (shouldRedirectHost(name)) {
                namePointer.writeUtf8String(serverAddress);

                console.log(`Redirecting GetAddrInfoExA from ${name} -> ${serverAddress}`);
            }
        }
    });
*/

    Interceptor.attach(Module.findExportByName("ws2_32.dll", "getaddrinfo"), {
        onEnter: function(args) {
            console.log("getaddrinfo OnEnter")
            var namePointer = args[0];
            var name = namePointer.readCString();

            if (shouldRedirectHost(name)) {
                namePointer.writeUtf8String(serverAddress);

                console.log(`Redirecting getaddrinfo from ${name} -> ${serverAddress}`);
            }
        }
    });


    // Hook listing
    /*
    Process.enumerateModules({
        onMatch: function(module){
            console.log('Module name: ' + module.name + " - " + "Base Address: " + module.base.toString());
        },
        onComplete: function(){}
    });

    var moduleTarget = "ws2_32.dll";
    var methodBlacklist = [
        "WSAGetLastError",
        "WSASetLastError",
    ]

    Module.enumerateExportsSync(moduleTarget).forEach(function(e) {
        if (methodBlacklist.includes(e.name)) {
            console.log("Skipping");
            return;
        }

        try {
            Interceptor.attach(Module.findExportByName(moduleTarget, e.name), {
                onEnter: function(args) {
                    //console.log(moduleTarget + " " + e.name);
                    //Thread.sleep(0.75);
                }
            })
        } catch (e) {
            console.log(moduleTarget, e.name)
            console.log(e);
        }
    });
    */

    // Wait for ASProtect to unpack.
    // mhf.exe calls GetCommandLineA near it's entrypoint before WinMain, so it will be one of the first few calls.
    var mhfGetCommandLineAHook = Interceptor.attach(Module.findExportByName("kernel32.dll", "GetCommandLineA"), {
        onEnter: function(args){
            try{
                var mhfMod = Process.getModuleByName('mhf.exe');
                var ggInitFuncResults = Memory.scanSync(mhfMod.base, mhfMod.size, "55 8B EC 81 EC 04 01 00 00");
                if(ggInitFuncResults.length < 1) {
                    console.log("Failed to find gameguard init function");
                    return;
                } else {

                    console.log("Found GG init function in mhf.exe. Patching...");

                    var ggInitFunc = ggInitFuncResults[0].address;
                    Memory.patchCode(ggInitFunc, 64, function (code) {
                        var cw = new X86Writer(code, { pc: ggInitFunc });
                        cw.putMovRegU32('eax', 1);
                        cw.putRet();
                        cw.flush();
                    });

                    console.log("Patch complete.");
                    mhfGetCommandLineAHook.detach();
                }
            } catch(e){
            }
        }
    });

    // Waits for the mhfo.dll module to be loaded and unpacked.
    // this works by hooking user32.dll$RegisterClassExA and waiting for
    // the mhfo.dll module to register the " M H F " class.
    var mhfoRegisterClassExAHook = Interceptor.attach(Module.findExportByName("user32.dll", "RegisterClassExA"), {
        onEnter: function(args) {
            var wndClassExA = args[0];
            var lpszClassName = wndClassExA.add(0x28).readPointer();
            var classNameStr = lpszClassName.readCString();
            var match = classNameStr == " M H F ";
            if(match) {
                console.log("mhfo.dll unpacked.");
                var mhfoMod = Process.getModuleByName('mhfo.dll');
                var ggCheckFuncResults = Memory.scanSync(mhfoMod.base, mhfoMod.size, "A1 ?? ?? ?? ?? 48 A3 ?? ?? ?? ?? 85 C0 7F 32");
                if(ggCheckFuncResults.length >= 1) {
                    console.log("Found GG check function in mhfo.dll. Patching...");

                    var ggCheckFunc = ggCheckFuncResults[0].address;
                    Memory.patchCode(ggCheckFunc, 64, function (code) {
                        var cw = new X86Writer(code, { pc: ggCheckFunc });
                        cw.putMovRegU32('eax', 1);
                        cw.putRet();
                        cw.flush();
                    });

                    console.log("Patch complete.");
                    console.log("All patches are complete, you can now exit this frida script.");
                    mhfoRegisterClassExAHook.detach();
                }

            }
        }
    });

    // Waits for the mhfo-hd.dll module to be loaded and unpacked.
    // this works by hooking user32.dll$RegisterClassExA and waiting for
    // the mhfo-hd.dll module to register the " M H F " class.
    var mhfoHDRegisterClassExAHook = Interceptor.attach(Module.findExportByName("user32.dll", "RegisterClassExA"), {
        onEnter: function(args) {
            var wndClassExA = args[0];
            var lpszClassName = wndClassExA.add(0x28).readPointer();
            var classNameStr = lpszClassName.readCString();
            var match = classNameStr == " M H F ";
            if(match) {
                console.log("mhfo-hd.dll unpacked.");
                var mhfoMod = Process.getModuleByName('mhfo-hd.dll');
                var ggCheckFuncResults = Memory.scanSync(mhfoMod.base, mhfoMod.size, "A1 ?? ?? ?? ?? 48 A3 ?? ?? ?? ?? 85 C0 7F 32");
                if(ggCheckFuncResults.length >= 1) {
                    console.log("Found GG check function in mhfo-hd.dll. Patching...");

                    var ggCheckFunc = ggCheckFuncResults[0].address;
                    Memory.patchCode(ggCheckFunc, 64, function (code) {
                        var cw = new X86Writer(code, { pc: ggCheckFunc });
                        cw.putMovRegU32('eax', 1);
                        cw.putRet();
                        cw.flush();
                    });

                    console.log("Patch complete.");
                    console.log("All patches are complete, you can now exit this frida script.");
                    mhfoHDRegisterClassExAHook.detach();
                }

            }
        }
    });
""")
    def on_message(message, data):
        print("[{}] => {}".format(message, data))

    script.on('message', on_message)
    script.load()

    frida.resume(pID)

    # Wait for game to exit
    while psutil.pid_exists(pID):
        time.sleep(1)

    print("Game closed, exiting...")

    session.detach()

if __name__ == '__main__':
    main()
