// Helper function to dynamically create Winsock alert box
function createWinsockAlert(message) {
    var tmpDiv = document.createElement("div");

    tmpDiv.setAttribute("class", "WinsockAlertBoxID");
    tmpDiv.setAttribute("role", "alert");
    tmpDiv.className = "alert alert-info";
    tmpDiv.appendChild(document.createTextNode(message));

    document.getElementById("alertBox").appendChild(tmpDiv);

    scrollToBottom();
}

// Helper function to dynamically create normal alert box
function createNormalAlert(message) {
	var tmpDiv = document.createElement("div");

    tmpDiv.setAttribute("class", "NormalAlertBoxID");
    tmpDiv.setAttribute("role", "alert");
    tmpDiv.className = "alert alert-secondary";
    tmpDiv.appendChild(document.createTextNode(message));

    document.getElementById("alertBox").appendChild(tmpDiv);

	scrollToBottom();
}

// Helper function to dynamically create good alert box
function createGoodAlert(message) {
	var tmpDiv = document.createElement("div");

    tmpDiv.setAttribute("class", "GoodAlertBoxID");
    tmpDiv.setAttribute("role", "alert");
    tmpDiv.className = "alert alert-success";
    tmpDiv.appendChild(document.createTextNode(message));

    document.getElementById("alertBox").appendChild(tmpDiv);

	scrollToBottom();
}


function createErrorAlert(message) {
    var tmpDiv = document.createElement("div");

	tmpDiv.setAttribute("class", "ErrorAlertBoxID");
    tmpDiv.setAttribute("role", "alert");
    tmpDiv.className = "alert alert-danger";
    tmpDiv.appendChild(document.createTextNode(message));  

    document.getElementById("alertBox").appendChild(tmpDiv);

	scrollToBottom();
}

function scrollToBottom() {
	var messages = document.getElementById('alertBox');
	if (messages != null)
		messages.scrollTop = messages.scrollHeight;
}

function init_main() {
    window.external.beginDrag(false);
    document.getElementById("configButton").onclick = function(){
        try{
            window.external.openMhlConfig();
        } catch(e){
            createErrorAlert("Error on openMhlConfig: " + e);
        }
    };

    document.getElementById("titlebar").onmouseenter = function(e) {
        window.external.beginDrag(true);
    };

    document.getElementById("titlebar").onmouseleave = function(e) {
        window.external.beginDrag(false);
    };

    document.getElementById("exit").onclick = function(e) {
        window.external.closeWindow();
    };

	document.getElementById("Reduce").onclick = function(e) {
        window.external.minimizeWindow();
	};

    var attachEvent;
    if (typeof window.addEventListener !== "undefined") {
        attachEvent = window.addEventListener;
    } else {
        attachEvent = window.attachEvent;
    }
    attachEvent("message", function(e) {
        //alert(e);
        var data = e.data;
		CheckMessage(data);
    });

    doLauncherInitalize();
};


function CheckMessage(message){
	// Good Alert
	if (message == "Connected."){
		createGoodAlert(message);
	}
	// Normal Alert
	else if (message == "Authentification..."){
		createNormalAlert(message);	
	}
	else if (message == "After selecting a character, press [Start] button."){
		createNormalAlert(message);		
	}
	// Error Alert
	else {
		createErrorAlert(message);
	}
}

function doLauncherInitalize() {
	createWinsockAlert("Winsock Ver. [2.2]");
	createNormalAlert("After entering Erupe ID and Password, press [Connect] button.");
    try{
        window.external.getMhfMutexNumber();
    } catch(e){
        createErrorAlert("Error getting Mhf mutex number! " + e + ".");
    }

    try{
        var serverListXml = window.external.getServerListXml();
    } catch(e){
        createErrorAlert("Error getting serverlist.xml! " + e + ".");
    }

    if(serverListXml == ""){
        createErrorAlert("Got empty serverlist.xml!");
    }
    if (typeof console !== "undefined") {console.log(serverListXml);}

    try{
        var lastServerIndex = window.external.getIniLastServerIndex();
    } catch(e){
        createErrorAlert("Error on getIniLastServerIndex: " + e + ".");
    }
    if (typeof console !== "undefined") {console.log("Last server index:" + lastServerIndex);}

    try{
        window.external.setIniLastServerIndex(0);
    } catch(e){
        createErrorAlert("Error on setIniLastServerIndex: " + e + ".");
    }

    try{
        var mhfBootMode = window.external.getMhfBootMode();
    } catch(e){
        createErrorAlert("Error on getMhfBootMode: " + e + ".");
    }
    if (typeof console !== "undefined") {console.log("mhfBootMode:" + mhfBootMode);}

    try{12
        var userId = window.external.getUserId();
    } catch(e){
        createErrorAlert("Error on getUserId: " + e + ".");
    }
    if (typeof console !== "undefined") {console.log("userId:" + userId);}

    try{
        var password = window.external.getPassword();
    } catch(e){
        createErrorAlert("Error on getPassword: " + e + ".");
    }
    if (typeof console !== "undefined") {console.log("password:" + password);}
}	
	
	
	


