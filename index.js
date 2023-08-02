// Get the 'Play Game' button element with the id 'playGameBtn'
document.addEventListener("DOMContentLoaded", function () {
    const playGameBtn = document.getElementById("playGameBtn");
    
    /* Add a 'click' event listener to the 'Play Game' button
     This will navigate the user to the game.html page where the actual game is played */
    playGameBtn.addEventListener("click", function () {
      window.location.href = "game.html";
    });
  });
  