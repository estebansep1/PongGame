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
const ballColor = "pink"; 
const ballBorderColor = "white";
const ballRadius = 12.5;
const paddleSpeed = 50;
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
function createBall(){};
function moveBall(){};
function drawBall(ballX, ballY){};
function checkCollision(){
};
function changeDirection(event){
    const keyPressed = event.keyCode;
    console.log(keyPressed);
};
function updateScore(){};
function restartGame(){};