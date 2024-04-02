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

function playCheerSound() {
  if (!isMuted) {
    cheerSound.play().catch((error) => console.error("Error playing sound:", error));
  }
}

function playSadSound() {
  if (!isMuted) {
    sadSound.play().catch((error) => console.error("Error playing sound:", error));
  }
}

document.getElementById("soundToggle").addEventListener("click", toggleSound);

function toggleSound() {
  isMuted = !isMuted;
  document.getElementById("soundToggle").textContent = isMuted ? "🔇" : "🔊";

  // Apply the muted state to all your sound objects
  racketSound.muted = isMuted;
  cheerSound.muted = isMuted;
  sadSound.muted = isMuted;
  // Continue for any other sounds you have

  localStorage.setItem("isMuted", isMuted.toString());
}

document.addEventListener("DOMContentLoaded", function() {
  // Retrieve the stored mute state from localStorage and apply it
  const savedMuteState = localStorage.getItem("isMuted");
  if (savedMuteState !== null) {
    isMuted = savedMuteState === "true";
    // Apply the mute state to all sound objects upon page load
    racketSound.muted = isMuted;
    cheerSound.muted = isMuted;
    sadSound.muted = isMuted;
    // Continue for any other sounds you have

    // Update the button text based on the mute state
    document.getElementById("soundToggle").textContent = isMuted ? "🔇" : "🔊";
  }

  // Attach the event listener to the sound toggle button
  document.getElementById("soundToggle").addEventListener("click", toggleSound);
});


document.addEventListener("DOMContentLoaded", function () {
  const savedMuteState = localStorage.getItem("isMuted");

  if (savedMuteState !== null) {
    isMuted = savedMuteState === "true";
    document.getElementById("soundToggle").textContent = isMuted ? "🔇" : "🔊";
  }

  document.getElementById("soundToggle").addEventListener("click", toggleSound);
});