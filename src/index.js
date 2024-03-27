// Get the '2 Players' and 'Play CPU' buttons element with their ids
document.addEventListener("DOMContentLoaded", function () {
    const twoPlayersBtn = document.getElementById("twoPlayersBtn");
    const playCpuBtn = document.getElementById("playCpuBtn");
    
  /*  This will navigate the user to the game.html page where the actual game is played */
    twoPlayersBtn.addEventListener("click", function () {
      localStorage.getItem('gamemode', '2P')
      window.location.href = "game.html";
    });
  });
  
    playCpuBtn.addEventListener("click", function () {
      localStorage.getItem('gamemode', 'CPU')
      window.location.href = "game.html";
    });
  