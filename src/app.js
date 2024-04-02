// Get the game canvas and its 2D rendering context
const gameBoard = document.querySelector("#gameBoard");
const ctx = gameBoard.getContext("2d");
// Get references to the score display and restart button
const scoreText = document.querySelector("#scoreText");
const restartBtn = document.querySelector("#restartBtn");
// Set up game dimensions and colors
const gameWidth = gameBoard.width;
const gameHeight = gameBoard.height;
const boardBackground = "#00ff00";
const paddle1Color = "blue";
const paddle2Color = "red";
const paddleBorder = "black";
const ballColor = "orange";
const ballBorderColor = "black";
const ballRadius = 12.5;
const paddleSpeed = 50;
const originalBallSpeed = 1;
// Variables to keep track of game state and scores
let intervalID;
let ballSpeed = 1;
let ballX = gameWidth / 2;
let ballY = gameHeight / 2;
let ballXDirection = 0;
let ballYDirection = 0;
let player1Score = 0;
let player2Score = 0;
let gameMode = localStorage.getItem("gameMode") || "2P";
let gameIsRunning = true;

// Define the paddles for Player 1 and Player 2
let paddle1 = {
  width: 25,
  height: 100,
  x: 0,
  y: 0,
};

let paddle2 = {
  width: 25,
  height: 100,
  x: gameWidth - 25,
  y: gameHeight - 100,
};

// Add event listeners for keydown (changeDirection) and click (restartGame)
window.addEventListener("keydown", changeDirection);
restartBtn.addEventListener("click", restartGame);

// Event listeners for the 'Home' button. Directs user back to the index.html
document.addEventListener("DOMContentLoaded", function () {
  const homeBtn = document.getElementById("homeBtn");

  homeBtn.addEventListener("click", function () {
    console.log("Button clicked!");
    window.location.href = "index.html";
  });
});

// Start the game when the page loads
gameStart();

// Function to start the game
function gameStart() {
  createBall();
  setupTouchControls();
  nextTick();
}

// Function to update the game state and render the next frame
function nextTick() {
  if (!gameIsRunning) return;

  intervalID = setTimeout(() => {
    clearBoard();

    if (gameMode === "CPU") {
      moveCpuPaddle();
    }
    drawPaddles();
    moveBall();
    drawBall(ballX, ballY);
    checkCollision();
    nextTick();
  }, 10);
}

// Function to create CPU paddle movement
function moveCpuPaddle() {
  const reactionThreshold = gameWidth * 0.4; // CPU starts reacting earlier
  let baseSpeed = paddleSpeed * 0.5; // Base speed of the CPU paddle
  let speedModifier = ballSpeed * 0.5; // Adjust this to change how much the ball speed affects the CPU speed
  let maxSpeed = baseSpeed + speedModifier;

  let targetY = ballY + (Math.random() - 0.5) * 50;

  if (ballXDirection > 0 && ballX > reactionThreshold) {
    const paddleCenter = paddle2.y + paddle2.height / 2;
    let distance = targetY - paddleCenter;
    let speedAdjustmentFactor = 8; // Adjust for quicker or slower speed adaptation
    // Calculate speed based on distance and speed modifier to ensure it does not exceed maxSpeed
    let speed = Math.min(Math.abs(distance) / speedAdjustmentFactor, maxSpeed);

    if (distance < 0) {
      paddle2.y -= speed;
    } else if (distance > 0) {
      paddle2.y += speed;
    }

    // Ensure the CPU paddle does not move out of bounds
    paddle2.y = Math.max(Math.min(paddle2.y, gameHeight - paddle2.height), 0);
  }
}

// Function to clear the game board and draw a vertical line in the center
function clearBoard() {
  ctx.fillStyle = boardBackground;
  ctx.fillRect(0, 0, gameWidth, gameHeight);

  // Vertical line inside canvas goes here

  ctx.strokeStyle = "black";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(gameWidth / 2, 0);
  ctx.lineTo(gameWidth / 2, gameHeight);
  ctx.stroke();
}

// Function to draw the paddles on the game board
function drawPaddles() {
  ctx.strokeStyle = paddleBorder;

  ctx.fillStyle = paddle1Color;
  ctx.fillRect(paddle1.x, paddle1.y, paddle1.width, paddle1.height);
  ctx.strokeRect(paddle1.x, paddle1.y, paddle1.width, paddle1.height);

  ctx.fillStyle = paddle2Color;
  ctx.fillRect(paddle2.x, paddle2.y, paddle2.width, paddle2.height);
  ctx.strokeRect(paddle2.x, paddle2.y, paddle2.width, paddle2.height);
}

// Function to create the ball and set its initial position and direction
function createBall() {
  ballX = gameWidth / 2;
  ballY = gameHeight / 2;
  ballXDirection = Math.random() < 0.5 ? -1 : 1;
  ballYDirection = Math.random() < 0.5 ? -1 : 1;
  ballSpeed = originalBallSpeed;
}

// Function to move the ball
function moveBall() {
  ballX += ballXDirection * ballSpeed;
  ballY += ballYDirection * ballSpeed;
}

// Function to draw the ball at its current position
function drawBall(ballX, ballY) {
  ctx.fillStyle = ballColor;
  ctx.beginPath();
  ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
  ctx.fill();

  ctx.strokeStyle = ballBorderColor;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
  ctx.stroke();
}

// Function to check for collisions with walls and paddles
function checkCollision() {
  if (ballY <= 0 + ballRadius) {
    ballYDirection *= -1;
  }
  if (ballY >= gameHeight - ballRadius) {
    ballYDirection *= -1;
  }
  if (ballX <= 0) {
    player2Score += 1;
    updateScore();
    declareGameWinner();
    createBall();
    return;
  }
  if (ballX >= gameWidth) {
    player1Score += 1;
    updateScore();
    declareGameWinner();
    createBall();
    return;
  }
  if (ballX <= paddle1.x + paddle1.width + ballRadius) {
    if (ballY > paddle1.y && ballY < paddle1.y + paddle1.height) {
      playRacketSound();
      ballX = paddle1.x + paddle1.width + ballRadius;
      ballXDirection *= -1;
      ballSpeed += 1;
    }
  }
  if (ballX >= paddle2.x - ballRadius) {
    if (ballY > paddle2.y && ballY < paddle2.y + paddle2.height) {
      playRacketSound();
      ballX = paddle2.x - ballRadius;
      ballXDirection *= -1;
      ballSpeed += 1;
    }
  }
}

// Function to handle key presses and move the paddles
function changeDirection(event) {
  const key = event.key;
  const paddle1Up = "w";
  const paddle1Down = "s";
  const paddle2Up = "ArrowUp";
  const paddle2Down = "ArrowDown";

  // Control for Paddle 1
  if (key === paddle1Up && paddle1.y > 0) {
    paddle1.y -= paddleSpeed;
  } else if (key === paddle1Down && paddle1.y < gameHeight - paddle1.height) {
    paddle1.y += paddleSpeed;
  }

  // Control for Paddle 2, only if gameMode is "2P"
  if (gameMode === "2P") {
    if (key === paddle2Up && paddle2.y > 0) {
      paddle2.y -= paddleSpeed;
    } else if (key === paddle2Down && paddle2.y < gameHeight - paddle2.height) {
      paddle2.y += paddleSpeed;
    }
  }
}

// Function to update the score display
function updateScore() {
  scoreText.textContent = `${player1Score} : ${player2Score}`;
}

// Function to declare the game winner and restart the game if needed
function declareGameWinner() {
  let message;
  let sound;
  let shouldPlayConfetti = false;

  if (gameMode === "2P") {
    if (player1Score === 5) {
      message = "Player 1 Wins!";
      sound = cheerSound;
      shouldPlayConfetti = true;
    } else if (player2Score === 5) {
      message = "Player 2 Wins!";
      sound = cheerSound;
      shouldPlayConfetti = true;
    }
  } else if (gameMode === "CPU") {
    if (player1Score === 5) {
      message = "You Won!";
      sound = cheerSound;
      shouldPlayConfetti = true;
    } else if (player2Score === 5) {
      message = "You Lost!";
      sound = sadSound;
      shouldPlayConfetti = false;
    }
  }

  // If a winner has been determined, display the message, play the sound
  if (message) {
    document.getElementById("winnerMessage").textContent = message;
    sound.play();
    document.getElementById("win-popup").style.display = "block";
    if (shouldPlayConfetti) {
      confetti.start(1500);
    }
    gameIsRunning = false;
  }
}

// Add event listeners for closing the popup and restarting the game
document.querySelector(".close").addEventListener("click", function () {
  document.getElementById("win-popup").style.display = "none";
  confetti.stop();
});

// Function to restart the game and reset scores and paddles
function restartGame() {
  player1Score = 0;
  player2Score = 0;
  paddle1.y = (gameHeight - paddle1.height) / 2;
  paddle2.y = (gameHeight - paddle2.height) / 2;
  ballX = gameWidth / 2;
  ballY = gameHeight / 2;
  ballXDirection = Math.random() < 0.5 ? -1 : 1;
  ballYDirection = Math.random() < 0.5 ? -1 : 1;
  ballSpeed = originalBallSpeed;
  updateScore();
  gameIsRunning = true;
  window.addEventListener("keydown", changeDirection);
  document.getElementById("win-popup").style.display = "none";
  nextTick();
}

// Attach the restart function to the restart button click event
restartBtn.addEventListener("click", restartGame);

// Setting up functionality for mobile paddle scrolling
function setupTouchControls() {
  let lastMoveTime = Date.now();
  const throttleDuration = 10;

  gameBoard.addEventListener(
    "touchmove",
    function (e) {
      e.preventDefault();

      const now = Date.now();
      if (now - lastMoveTime < throttleDuration) {
        return;
      }
      lastMoveTime = now;

      const touches = e.touches;
      const rect = gameBoard.getBoundingClientRect();
      const scaleY = gameHeight / rect.height;
      const scaleX = gameWidth / rect.width;

      for (let i = 0; i < touches.length; i++) {
        let touch = touches[i];
        let touchX = touch.clientX;
        let touchY = touch.clientY;
        let canvasTouchY = (touchY - rect.top) * scaleY;
        let canvasTouchX = (touchX - rect.left) * scaleX;

        if (canvasTouchX < gameWidth / 2) {
          movePaddleSmoothly(paddle1, canvasTouchY);
        } else {
          movePaddleSmoothly(paddle2, canvasTouchY);
        }
      }
    },
    { passive: false }
  );
}

function movePaddleSmoothly(paddle, targetY) {
  const easeAmount = 0.2;
  const deltaY = (targetY - paddle.y) * easeAmount;

  paddle.y += deltaY;
  paddle.y = Math.max(paddle.y, 0);
  paddle.y = Math.min(paddle.y, gameHeight - paddle.height);
}

function movePaddle(paddle, touchY) {
  let newY = touchY;

  if (newY < 0) {
    newY = 0;
  } else if (newY > gameHeight - paddle.height) {
    newY = gameHeight - paddle.height;
  }

  paddle.y = newY;
}
