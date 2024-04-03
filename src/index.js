// Get the '2 Players' and 'Play CPU' buttons element with their ids
document.addEventListener("DOMContentLoaded", function () {
  const twoPlayersBtn = document.getElementById("twoPlayersBtn");
  const playCpuBtn = document.getElementById("playCpuBtn");

  // Event listener for '2 Players' button
  twoPlayersBtn.addEventListener("click", function () {
    localStorage.setItem("gameMode", "2P");
    window.location.href = "game.html";
  });

  // Event listener for 'Play CPU' button
  playCpuBtn.addEventListener("click", function () {
    localStorage.setItem("gameMode", "CPU");
    window.location.href = "game.html";
  });
});

// Get the modal
const modal = document.getElementById("creditsContainer");
const btn = document.getElementById("creditsBtn");
const span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btn.onclick = function () {
  modal.style.display = "block";
  document.getElementById("mainGame").style.display = "none";
};

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
  modal.style.display = "none";
  document.getElementById("mainGame").style.display = "block";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
    document.getElementById("mainGame").style.display = "block";
  }
};
