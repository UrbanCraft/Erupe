function createNormalAlert(message) {
	parent.postMessage(message, "*");
}

function createGoodAlert(message) {
	parent.postMessage(message, "*");
}

function createErrorAlert(message) {
	elementID.style.display = "none";
	parent.postMessage(message, "*");
}

// Add global variables to block page when is loading.
var elementID;
// Function to continually check if we got a login result yet,
// then navigating to the character selection if we did.
function checkAuthResult() {
	var loginResult = window.external.getLastAuthResult();
	if (typeof console !== "undefined") {console.log('|' + loginResult + '|')};
	if (loginResult == "AUTH_PROGRESS") {
		setTimeout(checkAuthResult, 10);
	} else if (loginResult == "AUTH_SUCCESS") {
		saveAccount();
		createGoodAlert("Connected.");
		createNormalAlert("After selecting a character, press [Start] button.");
		window.location.href = 'charsel.html'
	} else {
		elementID.style.display = "none";
		createErrorAlert("Error logging in ! ");
	}
}

function saveAccount() {
	var userName = document.getElementById("username").value;
	var password = document.getElementById("password").value;
	var checkBox = document.getElementById("saveAccount");

	if (checkBox.checked == true) {
		localStorage.setItem('pseudo', userName);
		localStorage.setItem('pswd', password);
		localStorage.setItem('svAccount', 'true');
	} else {
		var userNameSaved = localStorage.removeItem('pseudo');
		var passwordSaved = localStorage.removeItem('pswd');
		var checkBoxSaved = localStorage.removeItem('svAccount');
	}
}

var kk_audio = null;
if (typeof Audio !== 'undefined') {
	kk_audio = new Audio("./audio/sys_cursor.mp3");
}

function showKeyCode(e) {
	if (kk_audio) {
		kk_audio.play();
	}
}



function login_init() {
	elementID = document.getElementById("Block");
	// Login form submission.
	document.getElementById("loginform").onsubmit = function () {
		elementID.style.display = "block";

		username = document.getElementById("username").value;
		password = document.getElementById("password").value;

		if (username == "") {
			createErrorAlert("Please insert Erupe ID !");
		}
		if (password == "") {
			createErrorAlert("Please insert Password !");
		} else {
			createNormalAlert("Authentification...");
			try {
				window.external.loginCog(username, password, password);
			} catch (e) {
				createErrorAlert("Error on loginCog: " + e + ".");
			}
			checkAuthResult();
		}

		return false;
	}
}