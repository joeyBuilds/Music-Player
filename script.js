const musicContainer = document.getElementById("music-container");

const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");

const audio = document.getElementById("audio");
const progress = document.getElementById("progress");
const progressContainer = document.getElementById("progress-container");
const title = document.getElementById("title");
const cover = document.getElementById("cover");

// Song Titles
const songs = [
  {
    title: "Son of Sun",
    audioSrc: `https://www.dropbox.com/s/j5fysjd3wgxegel/SonOfSun_v1.mp3?raw=1`,
    coverSrc: `images/sun.jpg`,
  },
  {
    title: "The Fiend Lord",
    audioSrc: `https://www.dropbox.com/s/cbzks4zfqnyhxep/TheFiendLord_v4.mp3?raw=1`,
    coverSrc: `images/Darkmatter.jpg`,
  },
  {
    title: "Jenova Absolute",
    audioSrc:
      "https://www.dropbox.com/s/e79ix2hcntt3bkr/JenovaAbsolute_v6.mp3?raw=1",
    coverSrc: `images/jenova.jpg`,
  },
];

//Keep track of song
let songIndex = 0;

//Initialize song details into DOM

loadSong(songs[songIndex]);

//Update song details
function loadSong(song) {
  title.innerText = song.title;
  audio.src = song.audioSrc;
  cover.src = song.coverSrc;
}

// Play song

function playSong() {
  musicContainer.classList.add(`play`);
  playBtn.querySelector("i.fas").classList.remove("fa-play");
  playBtn.querySelector("i.fas").classList.add("fa-pause");

  audio.play();
}

// Pause song
function pauseSong() {
  musicContainer.classList.remove(`play`);
  playBtn.querySelector("i.fas").classList.add("fa-play");
  playBtn.querySelector("i.fas").classList.remove("fa-pause");

  audio.pause();
}

// Previous song

function prevSong() {
  songIndex--;

  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }

  loadSong(songs[songIndex]);

  playSong();
}

//Next song

function nextSong() {
  songIndex++;

  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }

  loadSong(songs[songIndex]);

  playSong();
}

// Update progress bar

function updateProgress(e) {
  const { duration, currentTime } = e.srcElement;
  const progressPercent = (currentTime / duration) * 100;
  progress.style.width = `${progressPercent}%`;
}

// Set progress bar
function setProgress(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;

  audio.currentTime = (clickX / width) * duration;
}

// Event listeners
playBtn.addEventListener("click", () => {
  const isPlaying = musicContainer.classList.contains("play");

  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
});

//C Change song

prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);

// Time-song update event

audio.addEventListener("timeupdate", updateProgress);
//Click progress bar
progressContainer.addEventListener("click", setProgress);

//Song Ends
audio.addEventListener("ended", nextSong);
