'use strict';

// create canvas game board
const canvas = document.createElement('canvas');
document.body.appendChild(canvas);
const context = canvas.getContext('2d');
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;
// canvas.style.height = `${canvas.height / 2}px`;
// canvas.style.width = `${canvas.width / 2}px`;

// Get all the html elements needed
const startInstructionsBox = document.querySelector('.start');
const winnerBox = document.querySelector('.winner');
const restartButton = document.querySelector('.restart');
const playerOneScoreBoard = document.querySelector('.player-one');
const playerTwoScoreBoard = document.querySelector('.player-two');

// helper functions
function randomInt (min, max) {
  return Math.random() * (max - min) + min;
}
function randomDirection (left, right) {
  return Math.random() < 0.5 ? right : left;
}

// Create ball
let ball = {
  radius: 20,
  color: '#f2f2f2',
  x: canvas.width / 2,
  y: canvas.height / 2,
  velocity: {
    x: randomDirection(-4, 4),
    y: randomInt(-4, 4)
  }
};

// Create player rackets
const playerWidth = 15;
const playerHeight = 200;

class Player {
  constructor (color, x, y) {
    this.color = color;
    this.x = x;
    this.y = y;
    this.height = playerHeight;
    this.width = playerWidth;
    this.velocity = { up: -10, down: 10 };
  }
}
const playerOne = new Player('#00cc66', 0, canvas.height / 2 - playerHeight / 2);
const playerTwo = new Player('#fff44f', canvas.width - playerWidth, canvas.height / 2 - playerHeight / 2);

let playerOneButtons = {
  'left': false,
  'right': false
};
let playerTwoButtons = {
  'left': false,
  'right': false
};

// If the players press the valid button, set button to true
window.addEventListener('keydown', (event) => {
  if (event.keyCode === 65) playerOneButtons.left = true;
  if (event.keyCode === 68) playerOneButtons.right = true;
  if (event.keyCode === 37) playerTwoButtons.left = true;
  if (event.keyCode === 39) playerTwoButtons.right = true;
});

// Listen to the players keyup, set button to false
window.addEventListener('keyup', (event) => {
  if (event.keyCode === 65) playerOneButtons.left = false;
  if (event.keyCode === 68) playerOneButtons.right = false;
  if (event.keyCode === 37) playerTwoButtons.left = false;
  if (event.keyCode === 39) playerTwoButtons.right = false;
});

// If press spacebar the game begin
let gameRunning = false;
window.addEventListener('keyup', (event) => {
  if (event.keyCode === 32) {
    startInstructionsBox.classList.remove('show');
    gameRunning = true;
  }
});

// Score counter
let scorePlayerOne = 0;
let scorePlayerTwo = 0;
let hasPlayerScored = false;

function drawGame () {
  // draw board background
  context.fillStyle = '#333';
  context.fillRect(0, 0, canvas.width, canvas.height);
  // draw player one
  context.beginPath();
  context.fillStyle = playerOne.color;
  context.fillRect(playerOne.x, playerOne.y, playerOne.width, playerOne.height);
  // draw player two
  context.beginPath();
  context.fillStyle = playerTwo.color;
  context.fillRect(playerTwo.x, playerTwo.y, playerTwo.width, playerTwo.height);

  // draw ball
  context.beginPath();
  context.fillStyle = ball.color;
  context.arc(ball.x, ball.y, ball.radius, 0, 2 * Math.PI, false);
  context.fill();
}

function movePlayers () {
  // players movement - move up and down on buttons click
  if (playerOneButtons.left) {
    if (playerOne.y + playerOne.height < canvas.height) {
      playerOne.y += playerOne.velocity.down;
    }
  }
  if (playerOneButtons.right) {
    if (playerOne.y > 0) {
      playerOne.y += playerOne.velocity.up;
    }
  }
  if (playerTwoButtons.left) {
    if (playerTwo.y + playerTwo.height < canvas.height) {
      playerTwo.y += playerTwo.velocity.down;
    }
  }
  if (playerTwoButtons.right) {
    if (playerTwo.y > 0) {
      playerTwo.y += playerTwo.velocity.up;
    }
  }
}

function moveBall () {
  // Update the x and y of the ball cordinates based on the velocity
  // TODO: calculate with delta time
  ball.x += ball.velocity.x;
  ball.y += ball.velocity.y;
  // Check if the ball collides at the bottom
  if (ball.y + ball.radius > canvas.height) {
    ball.velocity.y *= -1;
  }
  // Check if the ball collides at the top
  if (ball.y <= ball.radius) {
    ball.velocity.y *= -1;
  }
  // Check if the ball collides with player one
  if (ball.y + ball.radius >= playerOne.y && ball.y - ball.radius <= playerOne.y + playerOne.height && ball.x - playerWidth <= ball.radius) {
    ball.velocity.x = Math.abs(ball.velocity.x - 1);
  }
  // Check if the ball collides with player two
  if (ball.y + ball.radius >= playerTwo.y && ball.y - ball.radius <= playerTwo.y + playerTwo.height && ball.x + ball.radius + playerWidth >= canvas.width) {
    ball.velocity.x = -ball.velocity.x - 1;
  }
}

function resetBall () {
  // put ball back in the center to get ready for a new round
  ball.x = canvas.width / 2;
  ball.y = canvas.height / 2;
  ball.velocity.x = randomDirection(-4, 4);
  ball.velocity.y = randomInt(-4, 4);
}

function countScores () {
  // Start new round if one of the players misses the ball
  if (ball.x + ball.radius < 0 || ball.x - ball.radius > canvas.width) {
    if (ball.x + ball.radius < 0) {
      // add score to player two on score board
      scorePlayerTwo++;
      playerTwoScoreBoard.innerText = scorePlayerTwo;
    } else {
      // add score to player one on score board
      scorePlayerOne++;
      playerOneScoreBoard.innerText = scorePlayerOne;
    }
    gameRunning = false;
    return true;
  } else {
    return false;
  }
}

function isGameFinished () {
  // Check if one of the players has 5 points, then the game is finished
  if (scorePlayerOne >= 5) {
    winnerBox.classList.add('show');
    winnerBox.firstChild.innerText = 'Green player is the winner!';
    return true;
  } else if (scorePlayerTwo >= 5) {
    winnerBox.classList.add('show');
    winnerBox.firstChild.innerText = 'Yellow  player is the winner!';
    return true;
  } else {
    return false;
  }
}

function mainLoop () {
  movePlayers();

  if (gameRunning) {
    moveBall();
    hasPlayerScored = countScores();
  }
  if (!isGameFinished()) {
    if (hasPlayerScored) {
      resetBall();
    }
    window.requestAnimationFrame(mainLoop);
  } else {
    gameRunning = false;
  }
  drawGame();
}
mainLoop();

function resetGame () {
  // Reset positions and scores when starting a new game
  gameRunning = false;
  scorePlayerOne = 0;
  scorePlayerTwo = 0;
  playerOneScoreBoard.innerText = scorePlayerOne;
  playerTwoScoreBoard.innerText = scorePlayerTwo;

  winnerBox.classList.remove('show');
  startInstructionsBox.classList.add('show');

  resetBall();
  // reset players
  playerOne.y = canvas.height / 2 - playerHeight / 2;
  playerTwo.y = canvas.height / 2 - playerHeight / 2;
}

restartButton.addEventListener('click', function (event) {
  resetGame();
  mainLoop();
});
