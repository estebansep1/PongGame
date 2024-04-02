//Load sounds
const racketSound = new Audio("../../assets/sounds/racketSound.mp3");

// Function to play racket sound
function playRacketSound() {
    racketSound.currentTime = 0;
    racketSound.play();
  }