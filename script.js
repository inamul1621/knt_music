const songs = [
  {
    title: 'Akhiyaan Gulaab',
    file: 'music/song1.mp3',
    cover: 'images/pic1.jpg'
  },
  {
    title: 'Faded',
    file: 'music/song2.mp3',
    cover: 'images/pic2.png'
  },
  {
    title: 'Ek Do Teen',
    file: 'music/song3.mp3',
    cover: 'images/pic3.webp'
  },
  {
    title: 'Dekhte Dekhte',
    file: 'music/song4.mp3',
    cover: 'images/pic4.jpg'
  },
  {
    title: 'Bom Diggy Diggy',
    file: 'music/song5.mp3',
    cover: 'images/pic5.jpg'
  },
  {
    title: 'Love Stereo Again',
    file: 'music/song6.mp3',
    cover: 'images/pic6.jpg'
  },
  {
    title: 'Dil Diyan Gallan',
    file: 'music/song7.mp3',
    cover: 'images/pic7.jpg'
  },
  {
    title: 'Galliyan',
    file: 'music/song8.mp3',
    cover: 'images/pic8.jpg'
  },
  {
    title: 'Sanam Re',
    file: 'music/song9.mp3',
    cover: 'images/pic9.jpg'
  },
  {
    title: 'Saturday Saturday',
    file: 'music/song10.mp3',
    cover: 'images/pic10.jpg'
  },
  {
    title: 'Phir Bhi Tumko Chaahunga',
    file: 'music/song11.mp3',
    cover: 'images/pic11.jpg'
  },
  {
    title: 'Paglu Title Song',
    file: 'music/song12.mp3',
    cover: 'images/pic12.jpg'
  },
  {
    title: 'First Class',
    file: 'music/song13.mp3',
    cover: 'images/pic13.jpg'
  },
  {
    title: 'Malang',
    file: 'music/song14.mp3',
    cover: 'images/pic14.jpg'
  }
];

const audio = document.getElementById('audio');
const nowPlaying = document.getElementById('now-playing');
const cover = document.getElementById('cover');
const songList = document.getElementById('song-list');
const libraryList = document.getElementById('library-list');

// Play a selected song
function playSong(song) {
  audio.src = song.file;
  nowPlaying.textContent = song.title;
  cover.src = song.cover;
  audio.play();
}

// Create a song card with play, like, or remove buttons
function createCard(song, showLike = true, isLiked = false) {
  const card = document.createElement('div');
  card.className = 'song-card';

  const img = document.createElement('img');
  img.src = song.cover;

  const title = document.createElement('h4');
  title.textContent = song.title;

  const playBtn = document.createElement('button');
  playBtn.textContent = 'Play ▶';
  playBtn.onclick = () => playSong(song);

  card.appendChild(img);
  card.appendChild(title);
  card.appendChild(playBtn);

  if (showLike && !isLiked) {
    const likeBtn = document.createElement('button');
    likeBtn.textContent = '❤️ Like';
    likeBtn.onclick = () => {
      likeSong(song);
    };
    card.appendChild(likeBtn);
  }

  if (isLiked) {
    const removeBtn = document.createElement('button');
    removeBtn.textContent = '💔 Remove';
    removeBtn.onclick = () => {
      removeFromLibrary(song);
    };
    card.appendChild(removeBtn);
  }

  return card;
}

// Add a song to the liked library
function likeSong(song) {
  let liked = JSON.parse(localStorage.getItem('likedSongs')) || [];

  if (!liked.find(s => s.title === song.title && s.file === song.file)) {
    liked.push(song);
    localStorage.setItem('likedSongs', JSON.stringify(liked));
    loadLibrary();
  }
}

// Remove a song from the liked library
function removeFromLibrary(songToRemove) {
  let liked = JSON.parse(localStorage.getItem('likedSongs')) || [];

  liked = liked.filter(song =>
    song.title !== songToRemove.title || song.file !== songToRemove.file
  );

  localStorage.setItem('likedSongs', JSON.stringify(liked));
  loadLibrary();
}

// Load all songs into the main list
function loadSongs() {
  songList.innerHTML = '';
  songs.forEach(song => {
    songList.appendChild(createCard(song));
  });
}

// Load liked songs into the library
function loadLibrary() {
  libraryList.innerHTML = '';
  let liked = JSON.parse(localStorage.getItem('likedSongs')) || [];
  liked.forEach(song => {
    libraryList.appendChild(createCard(song, false, true));
  });
}

// Init
loadSongs();
loadLibrary();
audio.addEventListener('ended', () => {
  if (isRepeating) {
    audio.currentTime = 0;
    audio.play();
  } else {
    nextSong();
  }
});
