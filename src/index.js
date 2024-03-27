// Get the '2 Players' and 'Play CPU' buttons element with their ids
document.addEventListener("DOMContentLoaded", function () {
  const twoPlayersBtn = document.getElementById("twoPlayersBtn");
  const playCpuBtn = document.getElementById("playCpuBtn");
  
  // Event listener for '2 Players' button
  twoPlayersBtn.addEventListener("click", function () {
      localStorage.setItem('gameMode', '2P');
      window.location.href = "game.html";
  });

  // Event listener for 'Play CPU' button
  playCpuBtn.addEventListener("click", function () {
      localStorage.setItem('gameMode', 'CPU');
      window.location.href = "game.html";
  });
});

