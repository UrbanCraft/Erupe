var DoOnceActive = true;

function createNormalAlert(message) {
	parent.postMessage(message, "*");
}

function createGoodAlert(message) {
	parent.postMessage(message, "*");
}

function createErrorAlert(message) {
	parent.postMessage(message, "*");
}

function hasClass(obj, cls) {
	if (typeof obj.className === "null" || typeof obj.className === "undefined") {
		return false;
	}

	//alert(obj);
	var classes = obj.className.split(' ');

	for (var j = 0; j < classes.length; j++) {
		var _cls = classes[j];
		if (_cls === cls) {
			return true;
		}
	}

	return false;
}

function removeClass(obj, cls) {
	//alert(obj);
	var classes = obj.className.split(' ');
	var new_classes = new Array();

	for (var j = 0; j < classes.length; j++) {
		var _cls = classes[j];
		if (_cls !== cls) {
			new_classes.push(_cls);
		}
	}
	obj.className = new_classes.join(' ');
}

function addClass(obj, cls) {
	//alert(obj);
	if (!hasClass(obj, cls)) {
		var classes = obj.className.split(' ');
		classes.push(cls);
		obj.className = classes.join(' ');
	}
}

function getElementsByClassName(obj, cls) {
	var res = new Array();
	if (hasClass(obj, cls)) {
		res.push(obj);
	}

	if (typeof obj.children !== "undefined") {
		for (var i = 0; i < obj.children.length; i++) {
			var child = obj.children[i];
			res = res.concat(getElementsByClassName(child, cls));
		}
	}

	return res;
}

function createCharListItem(name, uid, weapon, HR, GR, lastLogin, sex) {
	console_log(JSON.stringify([name, uid, weapon, HR, GR, lastLogin, sex]));
	var icon;
	var active = "active";
	var unixTimestamp = lastLogin;
	var milliseconds = unixTimestamp * 1000;
	var dateObject = new Date(milliseconds);
	var humanDateFormat = dateObject.toLocaleString();
	dateObject.toLocaleString("en-US", {
		weekday: "long"
	});
	dateObject.toLocaleString("en-US", {
		month: "long"
	});
	dateObject.toLocaleString("en-US", {
		day: "numeric"
	});
	dateObject.toLocaleString("en-US", {
		year: "numeric"
	});
	dateObject.toLocaleString("en-US", {
		timeZoneName: "short"
	});
	lastLogin = humanDateFormat;
	lastLogin = lastLogin.split(' ')[0];
	if (sex == "M") {
		sex = "♂";
	} else {
		sex = "♀";
	}
	if (HR > 999) {
		HR = "999";
	}
	if (GR > 999) {
		GR = "999";
	}

	if (weapon == "片手剣") {
		weapon = "Sword & Shield";
		icon = "./ressources/icons/SS.png";
	} else if (weapon == "双剣") {
		weapon = "Dual Swords";
		icon = "./ressources/icons/DS.png";
	} else if (weapon == "大剣") {
		weapon = "Great Sword";
		icon = "./ressources/icons/GS.png";
	} else if (weapon == "太刀") {
		weapon = "Long Sword";
		icon = "./ressources/icons/LS.png";
	} else if (weapon == "ハンマー") {
		weapon = "Hammer";
		icon = "./ressources/icons/H.png";
	} else if (weapon == "狩猟笛") {
		weapon = "Hunting Horn";
		icon = "./ressources/icons/HH.png";
	} else if (weapon == "ランス") {
		weapon = "Lance";
		icon = "./ressources/icons/L.png";
	} else if (weapon == "ガンランス") {
		weapon = "Gunlance";
		icon = "./ressources/icons/GL.png";
	} else if (weapon == "穿龍棍") {
		weapon = "Tonfa";
		icon = "./ressources/icons/T.png";
	} else if (weapon == "スラッシュアックスF") {
		weapon = "Switch Axe F";
		icon = "./ressources/icons/SAF.png";
	} else if (weapon == "マグネットスパイク") {
		weapon = "Magnet Spike";
		icon = "./ressources/icons/MS.png";
	} else if (weapon == "ヘビィボウガン") {
		weapon = "Heavy Bowgun";
		icon = "./ressources/icons/HS.png";
	} else if (weapon == "ライトボウガン") {
		weapon = "Light Bowgun";
		icon = "./ressources/icons/LB.png";
	} else if (weapon == "弓") {
		weapon = "Bow";
		icon = "./ressources/icons/B.png";
	} else {
		weapon = "Unknown"
		icon = "./ressources/icons/null.png";
	}

	if (DoOnceActive) {
		DoOnceActive = false;

		var topDiv = document.createElement('div');
		topDiv.setAttribute("href", "#");
		topDiv.setAttribute("uid", uid);
		topDiv.className = "char-list-entry list-group-item list-group-item-action flex-column align-items-start active";
	} else {
		var topDiv = document.createElement('div');
		topDiv.setAttribute("href", "#");
		topDiv.setAttribute("uid", uid);
		topDiv.className = "char-list-entry list-group-item list-group-item-action flex-column align-items-start";
	}
	var topLine = document.createElement('div');
	topLine.className = "Name_Player";

	var _h1 = document.createElement('h1');
	_h1.className = "mb-1";
	_h1.appendChild(document.createTextNode(name));
	topLine.appendChild(_h1);

	var bottomLine = document.createElement('div');
	bottomLine.className = "Info";

	var tmp;
	tmp = document.createElement('img');
	tmp.setAttribute('src', icon);
	bottomLine.appendChild(tmp);

	tmp = document.createElement('div');
	tmp.className = "icon_weapon";
	bottomLine.appendChild(tmp);

	tmp = document.createElement('div');
	tmp.className = "weapon_title";
	tmp.appendChild(document.createTextNode('Current Weapon'));
	bottomLine.appendChild(tmp);

	tmp = document.createElement('div');
	tmp.className = "weapon_name";
	tmp.appendChild(document.createTextNode(weapon));
	bottomLine.appendChild(tmp);

	tmp = document.createElement('div');
	tmp.className = "hr_lvl";
	tmp.appendChild(document.createTextNode('HR' + HR));
	bottomLine.appendChild(tmp);

	tmp = document.createElement('div');
	tmp.className = "gr_lvl";
	tmp.appendChild(document.createTextNode('GR' + GR));
	bottomLine.appendChild(tmp);

	tmp = document.createElement('div');
	tmp.className = "sex";
	tmp.appendChild(document.createTextNode(sex));
	bottomLine.appendChild(tmp);

	tmp = document.createElement('div');
	tmp.className = "uid";
	tmp.appendChild(document.createTextNode('ID: ' + uid));
	bottomLine.appendChild(tmp);

	tmp = document.createElement('div');
	tmp.className = "lastlogin";
	tmp.appendChild(document.createTextNode('LastLogin ' + lastLogin));
	bottomLine.appendChild(tmp);

	topDiv.appendChild(topLine);
	topDiv.appendChild(bottomLine);

	document.getElementById("characterlist").appendChild(topDiv);

	topDiv.onclick = function () {
		selectEntry(this);
	}
}

function selectEntry(el) {
	if (!hasClass(el, "active")) {
		var characters = getElementsByClassName(document.body, "char-list-entry");
		for (var i = 0; i < characters.length; i++) {
			var character = characters[i];
			removeClass(character, "active");
		}
	}
	addClass(el, "active");
}

function getPreviousEntry(el) {
	var prev = el.previousSibling;
	while (prev !== null) {
		prev = prev.previousSibling;
		if (prev.nodeType == 1) {
			if (hasClass(prev, 'char-list-entry')) {
				return prev;
			}
		}
	}
}

function getNextItemCls(el) {
	var next = el.nextSibling;
	while (next !== null) {
		next = next.nextSibling;
		if (next.nodeType == 1) {
			if (hasClass(next, 'char-list-entry')) {
				return next;
			}
		}
	}
}

function getSelectedEntry() {
	var characters = getElementsByClassName(document.body, "char-list-entry");
	//alert(JSON.stringify(characters));
	for (var i = 0; i < characters.length; i++) {
		var character = characters[i];
		if (hasClass(character, "active")) {
			return character;
		}
	}
}

function getSelectedUid() {
	return getSelectedEntry().getAttribute("uid");
}

function console_log(log_msg) {
	if (typeof console !== "undefined") {
		console.log(log_msg)
	};
}

var testdata = "<CharacterInfo defaultUid=''>\n<Character name='Testdata loaded' uid='511111' weapon='??' HR='7' GR='0' lastLogin='1645561498' sex='M' />\n</CharacterInfo>";
var xml_object_types = {
	CDATA: "cdata",
	XML_DECLARATION: "xmldec",
	COMMENT: "comment",
	TAG: "tag",
	TEXT: "text",
}
var re_xml = new RegExp("(?:<!\\[CDATA\\[([\\s\\S]*?)\\]\\]>|(<\\?[\\s\\S]*?\\?>)|<!--([\\s\\S]*?)-->|<\\s*([A-z][A-z0-9-_.:]*)((?:\\s+([A-z][A-z0-9-_.:]*)\\s*(?:=\\s*([\"'])((?:\\\\\\7|(?:(?!\\7)).)*)(?:\\7)\\s*)?)*)?\\s*(?:/\\s*>|>([\\s\\S]*)?<\\s*/\\s*\\4\\s*>)|([^<]+))", 'gm');
/*
1 = cdata
2 = xml
3 = comment
4 = tag
5 = attributes
6 = *attribute
7 = *quote
8 = *attribute value
9 = innerHTML
10 = text
*: Use re_xml_attrs to extract these; only last instance is captured here
*/
var re_xml_attrs = new RegExp("([A-z][A-z0-9-_.:]*)\\s*(?:=\\s*([\"'])((?:\\\\\\2|(?:(?!\\2)).)*)(?:\\2))?", 'gm');
/*
1 = key
2 = quote?
3 = value?
*/
function parseXmlAttributes(str) {
	console_log("Input: " + str);
	var res = {};
	re_xml_attrs.lastIndex = 0; // Reset regex

	while ((obj = re_xml_attrs.exec(str)) !== null) {
		console_log('Found ' + obj[0] + '.');
		console_log(obj[1] + ':' + obj[3]);
		res[obj[1]] = obj[3];
	}
	console_log("Output: " + JSON.stringify(res));
	return res;
}

function parseXml(str) {
	console_log("Input: " + str);
	var res = new Array();

	re_xml.lastIndex = 0; // Reset regex

	while ((obj = re_xml.exec(str)) !== null) {
		console_log('Found ' + obj[0] + '.');
		console_log(JSON.stringify(obj));
		if (obj[1]) {
			// CDATA
			res.push({
				type: xml_object_types.CDATA,
				content: obj[1],
			});
		} else if (obj[2]) {
			// xml
			res.push({
				type: xml_object_types.XML_DECLARATION,
				content: obj[2],
			});
		} else if (obj[3]) {
			// comment
			res.push({
				type: xml_object_types.COMMENT,
				content: obj[3],
			});
		} else if (obj[10]) {
			// text
			res.push({
				type: xml_object_types.TEXT,
				content: obj[10],
			});
		} else if (obj[4]) {
			// tag
			var tag = {
				type: xml_object_types.TAG,
				tagName: obj[4],
			};
			console_log(JSON.stringify(tag));
			var innerHTML = obj[9];
			console_log(innerHTML);
			if (obj[5]) {
				// attributes
				tag.attributes = parseXmlAttributes(obj[5]);
			} else {
				tag.attributes = {};
			}
			if (innerHTML) {
				// innerHTML
				var idx = re_xml.lastIndex;
				tag.children = parseXml(innerHTML);
				re_xml.lastIndex = idx;
			}
			res.push(tag)
		} else {}
	}
	console_log("Output: " + JSON.stringify(res));
	return res;
}
//JSON.stringify(parseXml(testdata));

function xmlGetElementsByTagName(xml, tagName) {
	var res = new Array();

	for (var i = 0; i < xml.length; i++) {
		var obj = xml[i];

		if (obj.type === xml_object_types.TAG) {
			console_log(obj.tagName);
			if (obj.tagName === tagName) {
				console_log('= ' + tagName);
				res.push(obj);
			}
		}
		if (obj.children) {
			res = res.concat(xmlGetElementsByTagName(obj.children, tagName));
		}
	}

	return res;
}

function init_charsel() {
	try {
		var charInfo = window.external.getCharacterInfo();
		//alert(JSON.stringify(charInfo));
	} catch (e) {
		alert(e);
		createErrorAlert("Error on getCharacterInfo!");
		charInfo = testdata;
	}
	var xmlobj;
	try {
		xmlobj = parseXml(charInfo);
	} catch (e) {
		alert("1" + e);
		createErrorAlert("Error parsing character info xml!" + e);
	}

	try {
		var characters = xmlGetElementsByTagName(xmlobj, "Character");
		for (var i = 0; i < characters.length; i++) {
			var character = characters[i];
			console_log(JSON.stringify(character.attributes));

			createCharListItem(
				character.attributes.name,
				character.attributes.uid,
				character.attributes.weapon,
				character.attributes.HR,
				character.attributes.GR,
				character.attributes.lastLogin,
				character.attributes.sex
			);
		}
	} catch (e) {
		alert("2" + e);
		createErrorAlert("Error searching character info xml!");
	}


	//var selectedUid = getSelectedUid();

	document.getElementById("bt_new_char").onclick = function () {
		alert("NOT WORK");
	};

	document.getElementById("bt_delete_char").onclick = function () {
		alert("NOT WORK");
	};

	document.getElementById("bt_confirm").onclick = function () {
		try {
			elementID = parent.document.getElementById("BlockGlobal");
			elementID.style.display = "block";
		} catch (e) {
			alert(e);
		}

		var selectedUid = getSelectedUid();

		try {
			window.external.selectCharacter(selectedUid, selectedUid);
		} catch (e) {
			createErrorAlert("Error on select character!");
			try {
				elementID = parent.document.getElementById("BlockGlobal");
				elementID.style.display = "none";
			} catch (e) {
				alert(e);
			}
		}
		setTimeout(function () {
			window.external.exitLauncher();
		}, 3000);
	};
}

// Enable to read JP text
function isKanji(ch) {
	return (ch >= "\u4e00" && ch <= "\u9faf") ||
		(ch >= "\u3400" && ch <= "\u4dbf");
}

function accumulativeParser(str, condition) {
	var accumulations = [];
	var accumulator = "";

	for (var i = 0; i < str.length; ++i) {
		var ch = str[i];

		if (condition(x)) {
			accumulator += ch;
		} else if (accumulator !== "") {
			accumulations.push(accumulator);
			accumulator = "";
		}
	}
	return accumulations;
}

function parseKanjiCompounds(str) {
	return accumulativeParser(str, isKanji);
}