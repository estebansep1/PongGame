const gameBoard = document.querySelector("#gameBoard");
const ctx = gameBoard.getContext("2d");
const scoreText = document.querySelector("#scoreText");
const restartBtn = document.querySelector("#restartBtn")
const gameWidth = gameBoard.width;
const gameHeight = gameBoard.height;
const boardBackground = "#00ff00"
const paddle1Color = "blue";
const paddle2Color = "red";
const paddleBorder = "black";
const ballColor = "orange"; 
const ballBorderColor = "black";
const ballRadius = 12.5;
const paddleSpeed = 50;
const originalBallSpeed = 1;
let intervalID; 
let ballSpeed = 1;
let ballX = gameWidth / 2;
let ballY = gameHeight / 2;
let ballXDirection = 0;
let ballYDirection = 0;
let player1Score = 0;
let player2Score = 0;

let paddle1 = {
    width: 25,
    height: 100,
    x: 0,
    y: 0
};

let paddle2 ={
    width: 25,
    height: 100,
    x: gameWidth - 25, 
    y: gameHeight - 100
};

window.addEventListener("keydown", changeDirection);
restartBtn.addEventListener("click", restartGame)

gameStart();

function gameStart(){
    createBall();
    nextTick();
}

function nextTick(){
    intervalID = setTimeout(() => {
        clearBoard();
        drawPaddles();
        moveBall();
        drawBall(ballX, ballY);
        checkCollision();
        nextTick();
    }, 10)
}

function clearBoard(){
    ctx.fillStyle = boardBackground;
    ctx.fillRect(0, 0, gameWidth, gameHeight);

//Vertical line inside canvas goes here

    ctx.strokeStyle = 'black';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(gameWidth / 2, 0);
    ctx.lineTo(gameWidth / 2, gameHeight);
    ctx.stroke();
};


function drawPaddles(){
    ctx.strokeStyle = paddleBorder;

    ctx.fillStyle = paddle1Color;
    ctx.fillRect(paddle1.x, paddle1.y, paddle1.width, paddle1.height);
    ctx.strokeRect(paddle1.x, paddle1.y, paddle1.width, paddle1.height);

    ctx.fillStyle = paddle2Color;
    ctx.fillRect(paddle2.x, paddle2.y, paddle2.width, paddle2.height);
    ctx.strokeRect(paddle2.x, paddle2.y, paddle2.width, paddle2.height);
};
function createBall(){
    ballX = gameWidth / 2;
    ballY = gameHeight / 2;
    ballXDirection = (Math.random() < 0.5) ? -1 : 1; 
    ballYDirection = (Math.random() < 0.5) ? -1 : 1; 
    ballSpeed = originalBallSpeed
};

function moveBall(){
    ballX += ballXDirection * ballSpeed;
    ballY += ballYDirection * ballSpeed;
};
function drawBall(ballX, ballY){
    ctx.fillStyle = ballColor;
    ctx.beginPath();
    ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = ballBorderColor;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
    ctx.stroke();
};

function checkCollision(){
     if(ballY <= 0 + ballRadius){
        ballYDirection *= -1;
     }
     if(ballY >= gameHeight - ballRadius){
        ballYDirection *= -1;
     }
     if(ballX <= 0){
        player2Score+=1;
        updateScore()
        createBall()
        return;
     }
     if (ballX >= gameWidth){
        player1Score+=1;
        updateScore()
        createBall()
        return;
     }
     if(ballX <= (paddle1.x + paddle1.width + ballRadius)){
        if(ballY > paddle1.y && ballY < paddle1.y + paddle1.height){
          ballX = (paddle1.x + paddle1.width) + ballRadius;
          ballXDirection *= -1;
          ballSpeed += 1;
        }
     }
     if(ballX >= (paddle2.x - ballRadius)){
      if(ballY > paddle2.y && ballY < paddle2.y + paddle2.height){
        ballX = paddle2.x - ballRadius;
        ballXDirection *= -1;
        ballSpeed += 1;
      }
     }
};

function changeDirection(event) {
    const keyPressed = event.keyCode;
    console.log(keyPressed);
    const paddle1Up = 87;
    const paddle1Down = 83;
    const paddle2Up = 38;
    const paddle2Down = 40;
  
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
function updateScore(){
  scoreText.textContent = `${player1Score} : ${player2Score}`
};

function restartGame(){
  player1Score = 0;
  player2Score = 0;

 paddle1 = {
    width: 25,
    height: 100,
    x: 0,
    y: 0
};
 paddle2 ={
    width: 25,
    height: 100,
    x: gameWidth - 25, 
    y: gameHeight - 100
  };
 updateScore()
 createBall()
}