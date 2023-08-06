// Get the 'Play Game' button element with the id 'playGameBtn'
document.addEventListener("DOMContentLoaded", function () {
    const playGameBtn = document.getElementById("playGameBtn");
    
  /*  This will navigate the user to the game.html page where the actual game is played */
    playGameBtn.addEventListener("click", function () {
      window.location.href = "game.html";
    });
  });
  