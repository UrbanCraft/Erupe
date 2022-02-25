var audio_cursor = null;
var audio_select = null;
var audio_confirm = null;
var audio_starting = null;

if (typeof Audio !== 'undefined') {
  audio_cursor = new Audio('./audio/sys_cursor.mp3');
  audio_select = new Audio('./audio/sys_select.mp3');
  audio_confirm = new Audio('./audio/sys_confirm.mp3');
  audio_starting = new Audio('./audio/sys_starting.mp3');
}


function CUE_Cursor() {
  if (audio_cursor) {
    audio_cursor.play();
  }
}

function CUE_Selected() {
  if (audio_select) {
    audio_select.play();
  }
}

function CUE_Confirm() {
  if (audio_confirm) {
    audio_confirm.play();
  }
}

function CUE_Starting() {
  if (audio_starting) {
    audio_starting.play();
  }
}