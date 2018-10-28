function play(track_id) {
    var audio = document.getElementById(track_id);
    audio.play();
}

function pause(track_id) {
    var audio = document.getElementById(track_id);
    audio.pause();
}