'use strict';

// Create canvas game board inside #canvas-wrap
const canvas = document.createElement('canvas');
document.getElementById('canvas-wrap').appendChild(canvas);
const context = canvas.getContext('2d');
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

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
  return Math.random() < 0.5 ? left : right;
}

// Create ball
let ball = {
  radius: 20,
  color: '#ffffff',
  x: canvas.width / 2,
  y: canvas.height / 2,
  velocity: {
    x: randomDirection(-4, 4),
    y: randomInt(-4, 4)
  }
};

// Create player rackets
const playerWidth = 30;
const playerHeight = 170;

class Player {
  constructor (color, x, y) {
    this.color = color;
    this.backgroundColor = '#000000';
    this.x = x;
    this.y = y;
    this.height = playerHeight;
    this.width = playerWidth;
    this.velocity = 7;
  }
}
const playerOne = new Player('#7ED321', 0, canvas.height / 2 - playerHeight / 2);
const playerTwo = new Player('#F8E71C', canvas.width - playerWidth, canvas.height / 2 - playerHeight / 2);

// Uncomment this to play on keyboard instead of with arduino buttons.
// Player one plays with 'a' and 'd' keys and player two plays with left and right arrow keys
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

// Click on ball to start game
let gameRunning = false;
let ballStart = document.querySelector('.ball-button');
ballStart.addEventListener('click', (event) => {
  startInstructionsBox.classList.remove('show');
  gameRunning = true;
});

// Score counter
let scorePlayerOne = 0;
let scorePlayerTwo = 0;
let hasPlayerScored = false;

function drawGame () {
  // draw board background
//  context.fillStyle = 'rgba(0, 0, 0, 0.5)';
  context.clearRect(0, 0, canvas.width, canvas.height);

  // draw center line
  context.fillStyle = '#000';
  context.fillRect(canvas.width / 2 - 1.5, 0, 3, canvas.height);

  // draw player one
  context.beginPath();
  context.fillStyle = playerOne.backgroundColor;
  context.fillRect(playerOne.x, playerOne.y, playerOne.width, playerOne.height);
  context.fillStyle = playerOne.color;
  context.fillRect(playerOne.x + 28, playerOne.y, playerOne.width / 8, playerOne.height);

  // draw player two
  context.beginPath();
  context.fillStyle = playerTwo.backgroundColor;
  context.fillRect(playerTwo.x, playerTwo.y, playerTwo.width, playerTwo.height);
  context.fillStyle = playerTwo.color;
  context.fillRect(playerTwo.x - 2, playerTwo.y, playerTwo.width / 8, playerTwo.height)

  // draw ball
  context.beginPath();
  context.fillStyle = ball.color;
  context.arc(ball.x, ball.y, ball.radius, 0, 2 * Math.PI, false);
  context.fill();
}

function movePlayers () {
  // players movement - move up and down on buttons click
  if (playerOneButtons.left) {
    if (playerOne.y > 0) {
      playerOne.y -= playerOne.velocity;
    }
  }
  if (playerOneButtons.right) {
    if (playerOne.y + playerOne.height < canvas.height) {
      playerOne.y += playerOne.velocity;
    }
  }
  if (playerTwoButtons.left) {
    if (playerTwo.y + playerTwo.height < canvas.height) {
      playerTwo.y += playerTwo.velocity;
    }
  }
  if (playerTwoButtons.right) {
    if (playerTwo.y > 0) {
      playerTwo.y -= playerTwo.velocity;
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
  let collision = false;
  // If ball intersects the right vertical line of player one
  if (ball.x - ball.radius <= playerWidth) {
    if (ball.y + ball.radius >= playerOne.y && ball.y <= playerOne.y) {
      // If ball intersects the top horizontal line of player one
      ball.y = playerOne.y - ball.radius - 1;
      ball.velocity.y *= -1;
      console.log('intersects top');
      collision = true;
    } else if (ball.y - ball.radius <= playerOne.y + playerHeight && ball.y >= playerOne.y + playerHeight) {
      // If ball intersects the bottom horizontal line of player one
      ball.y = playerOne.y + playerHeight + ball.radius + 1;
      ball.velocity.y *= -1;
      console.log('intersects bottom');
      collision = true;
    }
  }
  // Check if the ball collides with long side on player one
  if (!collision && ball.y + ball.radius >= playerOne.y && ball.y - ball.radius <= playerOne.y + playerOne.height) {
    if (ball.x - ball.radius <= playerWidth) {
      ball.x = playerWidth + ball.radius + 1;
      ball.velocity.x = -ball.velocity.x + 1;
      ball.color = playerOne.color;
      console.log('intersects longside');
    }
  }
  // If ball intersects the left vertical line of player two
  if (ball.x + ball.radius >= playerTwo.x) {
    if (ball.y + ball.radius >= playerTwo.y && ball.y <= playerTwo.y) {
      // If ball intersects the top horizontal line of player two
      ball.y = playerTwo.y - ball.radius - 1;
      ball.velocity.y *= -1;
      console.log('intersects top');
      collision = true;
    } else if (ball.y - ball.radius <= playerTwo.y + playerHeight && ball.y >= playerTwo.y + playerHeight) {
      // If ball intersects the bottom horizontal line of player two
      ball.y = playerTwo.y + playerHeight + ball.radius + 1;
      ball.velocity.y *= -1;
      console.log('intersects bottom');
      collision = true;
    }
  }
  // Check if the ball collides with long side on player two
  if (!collision && ball.y + ball.radius >= playerTwo.y && ball.y - ball.radius <= playerTwo.y + playerTwo.height) {
    if (ball.x + ball.radius >= playerTwo.x) {
      ball.x = playerTwo.x - ball.radius;
      ball.velocity.x = -ball.velocity.x - 1;
      ball.color = playerTwo.color;
    }
  }
}

function resetBoard () {
  // put ball back in the center to get ready for a new round
  ball.x = canvas.width / 2;
  ball.y = canvas.height / 2;
  ball.color = '#FFFFFF';
  ball.velocity.x = randomDirection(-4, 4);
  ball.velocity.y = randomInt(-4, 4);

  ball.color = '#FFFFFF';

  // reset players
  playerOne.y = canvas.height / 2 - playerHeight / 2;
  playerTwo.y = canvas.height / 2 - playerHeight / 2;
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
  // Check if one of the players has 3 points, then the game is finished
  if (scorePlayerOne >= 3) {
    winnerBox.classList.add('show');
    winnerBox.classList.add('green');
    winnerBox.firstChild.innerText = 'Green player is the winner!';
    return true;
  } else if (scorePlayerTwo >= 3) {
    winnerBox.classList.add('show');
    winnerBox.classList.add('yellow');
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
      resetBoard();
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
  winnerBox.classList.remove('green');
  winnerBox.classList.remove('yellow');
  startInstructionsBox.classList.add('show');

  resetBoard();
}

restartButton.addEventListener('click', function (event) {
  resetGame();
  mainLoop();
});
