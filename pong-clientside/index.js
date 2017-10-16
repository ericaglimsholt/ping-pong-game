'use strict';

// Create canvas game board inside #canvas-wrap
const canvas = document.createElement('canvas');
document.getElementById('canvas-wrap').appendChild(canvas);
const context = canvas.getContext('2d');
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

// get all the html elements we need
const startInstructionsBox = document.querySelector('.start')
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
  color: '#FFFFFF',
  x: canvas.width / 2,
  y: canvas.height / 2,
  velocity: {
    x: randomDirection(-4, 4),
    y: randomInt(-4, 4)
  }
};

// Create player rackets
class Player {
  constructor (color, x, y) {
    this.color = color;
    this.x = x;
    this.y = y;
    this.backgroundColor = '#000000';
    this.height = 170;
    this.width = 30;
    this.velocity = { up: -7, down: 7 };
  }
}

const playerOne = new Player('#7ED321', 0, canvas.height / 2 - 100);
const playerTwo = new Player('#F8E71C', canvas.width - 30, canvas.height / 2 - 100);

let playerOneButtons = {
  'AL': false,
  'AR': false
}
let playerTwoButtons = {
  'BL': false,
  'BR': false
}

// If the players press the valid button, set button to true
window.addEventListener('keydown', (event) => {
  if (event.keyCode === 65) playerOneButtons.AL = true;
  if (event.keyCode === 68) playerOneButtons.AR = true;
  if (event.keyCode === 37) playerTwoButtons.BL = true;
  if (event.keyCode === 39) playerTwoButtons.BR = true;
});

// Listen to the players keyup, set button to false
window.addEventListener('keyup', (event) => {
  if (event.keyCode === 65) playerOneButtons.AL = false;
  if (event.keyCode === 68) playerOneButtons.AR = false;
  if (event.keyCode === 37) playerTwoButtons.BL = false;
  if (event.keyCode === 39) playerTwoButtons.BR = false;
});

// If press spacebar the game begin
let gameStarted = false;
window.addEventListener('keyup', (event) => {
  if (event.keyCode === 32) {
    startInstructionsBox.classList.remove('show');
    gameStarted = true;
  }
});

// Score counter
let scorePlayerOne = 0;
let scorePlayerTwo = 0;

function mainLoop () {
  // draw board background
  context.fillStyle = '#1F1F1F';
  context.fillRect(0, 0, canvas.width, canvas.height);
  // draw player one
  context.beginPath();
  context.fillStyle = playerOne.backgroundColor;
  context.fillRect(playerOne.x, playerOne.y, playerOne.width, playerOne.height);
  context.fillStyle = playerOne.color;
  context.fillRect(playerOne.x+28, playerOne.y, playerOne.width/8, playerOne.height);

  // draw player two
  context.beginPath();
  context.fillStyle = playerTwo.backgroundColor;
  context.fillRect(playerTwo.x, playerTwo.y, playerTwo.width, playerTwo.height);
  context.fillStyle = playerTwo.color;
  context.fillRect(playerTwo.x-2, playerTwo.y, playerTwo.width/8, playerTwo.height);

  // draw ball
  context.beginPath();
  context.fillStyle = ball.color;
  context.arc(ball.x, ball.y, ball.radius, 0, 2 * Math.PI, false);
  context.fill();

  // players movement - check if buttons are pressed
  if (playerOneButtons.AL) {
    if (playerOne.y + playerOne.height < canvas.height) {
      playerOne.y += playerOne.velocity.down;
    }
  }
  if (playerOneButtons.AR) {
    if (playerOne.y > 0) {
      playerOne.y += playerOne.velocity.up;
    }
  }
  if (playerTwoButtons.BL) {
    if (playerTwo.y + playerTwo.height < canvas.height) {
      playerTwo.y += playerTwo.velocity.down;
    }
  }
  if (playerTwoButtons.BR) {
    if (playerTwo.y > 0) {
      playerTwo.y += playerTwo.velocity.up;
    }
  }
  if (gameStarted) {
    // Update the x and y of the ball cordinates based on the velocity.
    ball.x += ball.velocity.x;
    ball.y += ball.velocity.y;
    // Check if the ball collides to the top.
    if (ball.y + ball.radius > canvas.height) {
      ball.velocity.y = -ball.velocity.y;
    }
    // Check if the ball collides to the bottom.
    if (ball.y <= ball.radius) {
      ball.velocity.y = Math.abs(ball.velocity.y);
    }
    // Check if the ball collides with player one
    if (ball.y + ball.radius >= playerOne.y && ball.y + ball.radius <= playerOne.y + playerOne.height && ball.x - 15 <= ball.radius) {
      ball.velocity.x = Math.abs(ball.velocity.x - 1);
    }
    // Check if the ball collides with player two
    if (ball.y + ball.radius >= playerTwo.y && ball.y + ball.radius <= playerTwo.y + playerTwo.height && ball.x + ball.radius + 15 >= canvas.width) {
      ball.velocity.x = -ball.velocity.x - 1;
    }
    // start new round if one of the platyers misses the ball
    if (ball.x + ball.radius < -5 || ball.x - ball.radius > canvas.width + 5) {
      if (ball.x + ball.radius < -5) {
        scorePlayerTwo++;
        playerTwoScoreBoard.innerText = scorePlayerTwo;
      } else {
        scorePlayerOne++;
        playerOneScoreBoard.innerText = scorePlayerOne;
      }
      gameStarted = false;
      // put ball back in the center to get ready for a new round
      ball.x = canvas.width / 2;
      ball.y = canvas.height / 2;
      ball.velocity.x = randomDirection(-5, 5);
      ball.velocity.y = randomInt(-5, 5);
    }
  }

  // Check if one of the players has 5 points, then the game is finished
  if (scorePlayerOne >= 5) {
    winnerBox.classList.add('show');
    winnerBox.firstChild.innerText = 'Green is the winner';
  } else if (scorePlayerTwo >= 5) {
    winnerBox.classList.add('show');
    winnerBox.firstChild.innerText = 'Yellow is the winner';
  } else {
    window.requestAnimationFrame(mainLoop);
  }
}
mainLoop();

// reset positions and scores when starting a new game
restartButton.addEventListener('click', function (event) {
  scorePlayerOne = 0;
  scorePlayerTwo = 0;
  playerOneScoreBoard.innerText = scorePlayerOne;
  playerTwoScoreBoard.innerText = scorePlayerTwo;

  winnerBox.classList.remove('show');
  startInstructionsBox.classList.add('show');

  ball.x = canvas.width / 2;
  ball.y = canvas.height / 2;
  ball.velocity.x = randomDirection(-5, 5);
  ball.velocity.y = randomInt(-5, 5);

  playerOne.y = canvas.height / 2 - 100;
  playerTwo.y = canvas.height / 2 - 100;

  mainLoop();
});
