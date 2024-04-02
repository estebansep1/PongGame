//Load sounds
const racketSound = new Audio("../../assets/sounds/racketSound.mp3");
const cheerSound = new Audio("../../assets/sounds/Cheer.mp3");
const sadSound = new Audio("../../assets/sounds/Disappointed.mp3");

let isMuted = true;

// Function to play racket sound
function playRacketSound() {
  if (!isMuted) {
    racketSound.currentTime = 0;
    racketSound
      .play()
      .catch((error) => console.error("Error playing sound:", error));
  }
}

document.getElementById("soundToggle").addEventListener("click", toggleSound);

function toggleSound() {
  isMuted = !isMuted;
  document.getElementById("soundToggle").textContent = isMuted ? "🔇" : "🔊";

  localStorage.setItem("isMuted", isMuted.toString());
}

document.addEventListener("DOMContentLoaded", function () {
  const savedMuteState = localStorage.getItem("isMuted");

  if (savedMuteState !== null) {
    isMuted = savedMuteState === "true";
    document.getElementById("soundToggle").textContent = isMuted ? "🔇" : "🔊";
  }

  document.getElementById("soundToggle").addEventListener("click", toggleSound);
});

function testSound() {
  sadSound.play().catch((e) => console.error("Playback failed:", e));
}

document.addEventListener("DOMContentLoaded", testSound);
