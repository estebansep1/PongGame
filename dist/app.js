"use strict";
// Get the game canvas and its 2D rendering context
var gameBoard = document.querySelector("#gameBoard");
var ctx = gameBoard.getContext("2d");
// Get references to the score display and restart button
var scoreText = document.querySelector("#scoreText");
var restartBtn = document.querySelector("#restartBtn");
// Set up game dimensions and colors
var gameWidth = gameBoard.width;
var gameHeight = gameBoard.height;
var boardBackground = "#00ff00";
var paddle1Color = "blue";
var paddle2Color = "red";
var paddleBorder = "black";
var ballColor = "orange";
var ballBorderColor = "black";
var ballRadius = 12.5;
var paddleSpeed = 50;
var originalBallSpeed = 1;
// Variables to keep track of game state and scores
var intervalID;
var ballSpeed = 1;
var ballX = gameWidth / 2;
var ballY = gameHeight / 2;
var ballXDirection = 0;
var ballYDirection = 0;
var player1Score = 0;
var player2Score = 0;
// Define the paddles for Player 1 and Player 2
var paddle1 = {
    width: 25,
    height: 100,
    x: 0,
    y: 0
};
var paddle2 = {
    width: 25,
    height: 100,
    x: gameWidth - 25,
    y: gameHeight - 100
};
// Add event listeners for keydown (changeDirection) and click (restartGame)
window.addEventListener("keydown", changeDirection);
restartBtn.addEventListener("click", restartGame);
// Event listeners for the 'Home' button. Directs user back to the index.html
document.addEventListener("DOMContentLoaded", function () {
    var homeBtn = document.getElementById("homeBtn");
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
    nextTick();
}
// Function to update the game state and render the next frame
function nextTick() {
    intervalID = setTimeout(function () {
        clearBoard();
        drawPaddles();
        moveBall();
        drawBall(ballX, ballY);
        checkCollision();
        nextTick();
    }, 10);
}
// Function to clear the game board and draw a vertical line in the center
function clearBoard() {
    ctx.fillStyle = boardBackground;
    ctx.fillRect(0, 0, gameWidth, gameHeight);
    // Vertical line inside canvas goes here
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(gameWidth / 2, 0);
    ctx.lineTo(gameWidth / 2, gameHeight);
    ctx.stroke();
}
;
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
;
// Function to create the ball and set its initial position and direction
function createBall() {
    ballX = gameWidth / 2;
    ballY = gameHeight / 2;
    ballXDirection = (Math.random() < 0.5) ? -1 : 1;
    ballYDirection = (Math.random() < 0.5) ? -1 : 1;
    ballSpeed = originalBallSpeed;
}
;
// Function to move the ball
function moveBall() {
    ballX += (ballXDirection * ballSpeed);
    ballY += (ballYDirection * ballSpeed);
}
;
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
;
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
    if (ballX <= (paddle1.x + paddle1.width + ballRadius)) {
        if (ballY > paddle1.y && ballY < paddle1.y + paddle1.height) {
            ballX = (paddle1.x + paddle1.width) + ballRadius;
            ballXDirection *= -1;
            ballSpeed += 1;
        }
    }
    if (ballX >= (paddle2.x - ballRadius)) {
        if (ballY > paddle2.y && ballY < paddle2.y + paddle2.height) {
            ballX = paddle2.x - ballRadius;
            ballXDirection *= -1;
            ballSpeed += 1;
        }
    }
}
;
// Function to handle key presses and move the paddles
function changeDirection(event) {
    var keyPressed = event.keyCode;
    console.log(keyPressed);
    var paddle1Up = 87;
    var paddle1Down = 83;
    var paddle2Up = 38;
    var paddle2Down = 40;
    switch (keyPressed) {
        case paddle1Up:
            if (paddle1.y > 0) {
                paddle1.y -= paddleSpeed;
            }
            break;
        case paddle1Down:
            if (paddle1.y < gameHeight - paddle1.height) {
                paddle1.y += paddleSpeed;
            }
            break;
        case paddle2Up:
            if (paddle2.y > 0) {
                paddle2.y -= paddleSpeed;
            }
            break;
        case paddle2Down:
            if (paddle2.y < gameHeight - paddle2.height) {
                paddle2.y += paddleSpeed;
            }
            break;
    }
}
// Function to update the score display
function updateScore() {
    scoreText.textContent = "".concat(player1Score, " : ").concat(player2Score);
}
;
// Function to declare the game winner and restart the game if needed
function declareGameWinner() {
    if (player1Score === 5) {
        clearInterval(intervalID);
        alert('Player 1 wins!');
        restartGame();
    }
    else if (player2Score === 5) {
        clearInterval(intervalID);
        alert('Player 2 wins!');
        restartGame();
    }
}
// Function to restart the game and reset scores and paddles
function restartGame() {
    player1Score = 0;
    player2Score = 0;
    paddle1 = {
        width: 25,
        height: 100,
        x: 0,
        y: 0
    };
    paddle2 = {
        width: 25,
        height: 100,
        x: gameWidth - 25,
        y: gameHeight - 100
    };
    ballSpeed = originalBallSpeed;
    updateScore();
    createBall();
}
