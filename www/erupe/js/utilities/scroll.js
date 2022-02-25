// Button Top
document.getElementById("bt_up_char_list").onclick = function() {
	var target = getPreviousEntry(getSelectedEntry());
	if (target === null) {
		target = getElementsByClassName(document.body, 'char-list-entry').pop();
	}

	target.scrollIntoView();

	selectEntry(target);

	// Prevent default
	return false;
};

// Button Bottom
document.getElementById("bt_down_char_list").onclick = function() {
	var target = getNextItemCls(getSelectedEntry());
	if (target === null) {
		target = getElementsByClassName(document.body, 'char-list-entry').pop(0);
	}

	target.scrollIntoView();
	selectEntry(target);

	// Prevent default
	return false;
};




