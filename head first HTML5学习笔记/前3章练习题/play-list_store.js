
function save(item) {
    let playlistArray = getStoreArray('playlist');
    playlistArray.push(item);
    localStorage.setItem('playlist', JSON.stringify(playlistArray));
};

function loadPlaylist() {
    let playlistArray = getSavedSongs();
    let ul = document.getElementById('playlist');
    if (playlistArray !== null) {
        playlistArray.forEach(item => {
            let li = document.createElement('li');
            li.innerHTML = item;
            ul.appendChild(li);
        });
    }
};

function getSavedSongs() {
    return getStoreArray('playlist');
};


function getStoreArray(key) {
    let playlistArray = localStorage.getItem(key);
    if (playlistArray === null || playlistArray === '') {
        playlistArray = [];
    } else {
        playlistArray = JSON.parse(playlistArray);
    };
    return playlistArray;
};
