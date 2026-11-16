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
const playlist = [
  { title: "Song 1", src: "assets/music/song1.mp3" },
  { title: "Song 2", src: "assets/music/song2.mp3" },
  { title: "Song 3", src: "assets/music/song3.mp3" }
];
const audio = $("#audio");
let currentSong = 0;
let isPlaying = false;
function loadSong(index) {
  currentSong = (index + playlist.length) % playlist.length;
  audio.src = playlist[currentSong].src;
  $("#song-title").textContent = playlist[currentSong].title;
  $("#song-status").textContent = "Ready when you are ♡";
  $("#play-song").textContent = "▶";
  isPlaying = false;
}
async function toggleMusic() {
  if (!audio.src) loadSong(currentSong);
  if (isPlaying) {
    audio.pause();
    isPlaying = false;
    $("#play-song").textContent = "▶";
    $("#song-status").textContent = "Paused";
  } else {
    try {
      await audio.play();
      isPlaying = true;
      $("#play-song").textContent = "Ⅱ";
      $("#song-status").textContent = "Now playing ♫";
    } catch (error) {
      $("#song-status").textContent = "Add MP3 files to assets/music";
      isPlaying = false;
    }
  }
}
$("#play-song").addEventListener("click", toggleMusic);
$("#prev-song").addEventListener("click", () => { loadSong(currentSong - 1); toggleMusic(); });
$("#next-song").addEventListener("click", () => { loadSong(currentSong + 1); toggleMusic(); });
audio.addEventListener("ended", () => { loadSong(currentSong + 1); toggleMusic(); });
audio.addEventListener("error", () => {
  isPlaying = false;
  $("#play-song").textContent = "▶";
  $("#song-status").textContent = "Add your MP3 files in assets/music";
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
