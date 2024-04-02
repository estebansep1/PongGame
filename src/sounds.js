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

// Function to play cheer sound
function playCheerSound() {
  if (!isMuted) {
    cheerSound.play().catch((error) => console.error("Error playing sound:", error));
  }
}

//function to play sad sound
function playSadSound() {
  if (!isMuted) {
    sadSound.play().catch((error) => console.error("Error playing sound:", error));
  }
}

document.getElementById("soundToggle").addEventListener("click", toggleSound);

function toggleSound() {
  isMuted = !isMuted;
  document.getElementById("soundToggle").textContent = isMuted ? "🔇" : "🔊";

  racketSound.muted = isMuted;
  cheerSound.muted = isMuted;
  sadSound.muted = isMuted;

  localStorage.setItem("isMuted", isMuted.toString());
}

document.addEventListener("DOMContentLoaded", function() {
  const savedMuteState = localStorage.getItem("isMuted");
  if (savedMuteState !== null) {
    isMuted = savedMuteState === "true";
    racketSound.muted = isMuted;
    cheerSound.muted = isMuted;
    sadSound.muted = isMuted;

    document.getElementById("soundToggle").textContent = isMuted ? "🔇" : "🔊";
  }

  document.getElementById("soundToggle").addEventListener("click", toggleSound);
});