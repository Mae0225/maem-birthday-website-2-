// All interactions for the birthday surprise.
const $ = (selector) => document.querySelector(selector);

const welcome = $("#welcome");
const birthdaySite = $("#birthday-site");
$("#open-surprise").addEventListener("click", () => {
  welcome.classList.add("fade-out");
  setTimeout(() => {
    welcome.classList.add("hidden");
    birthdaySite.classList.remove("hidden");
    window.scrollTo({top: 0, behavior: "smooth"});
  }, 450);
});

// Envelope opens the birthday letter.
const envelope = $("#envelope");
const letterPaper = $("#letter-paper");
envelope.addEventListener("click", () => {
  const opened = envelope.classList.toggle("open");
  letterPaper.classList.toggle("revealed", opened);
  $("#envelope-hint").textContent = opened ? "A little message, just for you ♡" : "Tap the envelope to open ♡";
});

// Photo gallery lightbox.
const lightbox = $("#lightbox");
const lightboxImage = $("#lightbox-image");
document.querySelectorAll(".photo-open").forEach((button) => {
  button.addEventListener("click", () => {
    lightboxImage.src = button.dataset.full;
    lightbox.classList.add("open");
  });
});
function closeLightbox() { lightbox.classList.remove("open"); lightboxImage.src = ""; }
$("#lightbox-close").addEventListener("click", closeLightbox);
lightbox.addEventListener("click", (event) => { if (event.target === lightbox) closeLightbox(); });
document.addEventListener("keydown", (event) => { if (event.key === "Escape") closeLightbox(); });

// Confetti effect, used for the cake wish.
function celebrate() {
  const layer = $("#confetti-layer");
  const colors = ["#f7c6d0", "#a9c9e8", "#dcd6f7", "#ffe5a3", "#ffffff"];
  for (let i = 0; i < 85; i++) {
    const piece = document.createElement("i");
    piece.className = "confetti";
    piece.style.left = `${Math.random() * 100}%`;
    piece.style.background = colors[Math.floor(Math.random() * colors.length)];
    piece.style.animationDelay = `${Math.random() * 0.8}s`;
    piece.style.transform = `rotate(${Math.random() * 360}deg)`;
    layer.appendChild(piece);
    setTimeout(() => piece.remove(), 4200);
  }
}
$("#wish-button").addEventListener("click", () => {
  $(".cake").classList.add("blown");
  $("#wish-message").classList.add("show");
  $("#wish-button").textContent = "Wish sent with love! ♡";
  celebrate();
});

// Pop a balloon to reveal its note.
document.querySelectorAll(".message-balloon").forEach((balloon) => {
  balloon.addEventListener("click", () => {
    if (balloon.classList.contains("popped")) return;
    $("#balloon-message").textContent = balloon.dataset.message;
    balloon.classList.add("popped");
  });
});

// Lightweight local-file music player. Add MP3 files to assets/music and list them here.

// Birthday Music Player

const playlist = [
  { title: "Song 1", src: "./song1.mp3" },
  { title: "Song 2", src: "./song2.mp3" },
  { title: "Song 3", src: "./song3.mp3" }
];

const audio = document.querySelector("#audio");
const playButton = document.querySelector("#play-song");
const songTitle = document.querySelector("#song-title");
const songStatus = document.querySelector("#song-status");

let currentSong = 0;

function loadSong(index) {
  currentSong = (index + playlist.length) % playlist.length;

  audio.pause();
  audio.src = playlist[currentSong].src;
  audio.load();

  songTitle.textContent = playlist[currentSong].title;
  songStatus.textContent = "Ready when you are ♡";
  playButton.textContent = "▶";
}

async function playMusic() {
  try {
    await audio.play();
    playButton.textContent = "Ⅱ";
    songStatus.textContent = "Now playing ♫";
  } catch (error) {
    console.error("Music error:", error);
    songStatus.textContent = "Unable to play. Check the MP3 file path.";
    playButton.textContent = "▶";
  }
}

function pauseMusic() {
  audio.pause();
  playButton.textContent = "▶";
  songStatus.textContent = "Paused";
}

playButton.addEventListener("click", () => {
  if (audio.paused) {
    playMusic();
  } else {
    pauseMusic();
  }
});

document.querySelector("#prev-song").addEventListener("click", () => {
  loadSong(currentSong - 1);
  playMusic();
});

document.querySelector("#next-song").addEventListener("click", () => {
  loadSong(currentSong + 1);
  playMusic();
});

audio.addEventListener("ended", () => {
  loadSong(currentSong + 1);
  playMusic();
});

audio.addEventListener("error", () => {
  playButton.textContent = "▶";
  songStatus.textContent = "Song unavailable. Check your MP3 file.";
});

loadSong(0);


// Replay takes the visitor back to the welcome screen and resets the little surprises.
$("#replay").addEventListener("click", () => {
  audio.pause();
  isPlaying = false;
  $("#play-song").textContent = "▶";
  $("#birthday-site").classList.add("hidden");
  welcome.classList.remove("hidden", "fade-out");
  window.scrollTo({top: 0, behavior: "smooth"});
  envelope.classList.remove("open");
  letterPaper.classList.remove("revealed");
  $("#envelope-hint").textContent = "Tap the envelope to open ♡";
  $(".cake").classList.remove("blown");
  $("#wish-message").classList.remove("show");
  $("#wish-button").textContent = "Make a birthday wish ✨";
  document.querySelectorAll(".message-balloon").forEach((b) => b.classList.remove("popped"));
  $("#balloon-message").textContent = "Tap a balloon to reveal a tiny birthday note.";
});
