var userNameSaved = localStorage.getItem('pseudo');
var passwordSaved = localStorage.getItem('pswd');
var checkBoxSaved = localStorage.getItem('svAccount');

if (typeof userNameSaved != "null"){
	document.getElementById("username").value = userNameSaved;
}
if (typeof passwordSaved != "null"){
	document.getElementById("password").value = passwordSaved;
}
if (typeof checkBoxSaved != "null"){
	if (checkBoxSaved == "true"){
		var checkBox = document.getElementById("saveAccount");
		checkBox.checked = true;
	} else {
		var userNameSaved = localStorage.removeItem('pseudo');
		var passwordSaved = localStorage.removeItem('pswd');
		var checkBoxSaved = localStorage.removeItem('svAccount');
	}
}