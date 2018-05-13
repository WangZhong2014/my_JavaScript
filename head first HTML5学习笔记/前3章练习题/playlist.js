window.onload = init;
function init() {
    let button = document.getElementById('addButton');
    button.onclick = handlebuttonclick;
    loadPlaylist();
};

function handlebuttonclick() {
    let songName = document.getElementById('songTextInput').value;
    if (songName === '') {
    alert('Please input a song')
    } else {
    alert(`Adding ${songName}`);
    let ul = document.getElementById('playlist');
    let li = document.createElement('li');
    li.innerHTML = songName;
    ul.appendChild(li);
    save(songName);
  }
};