'use strict';

const canvas = document.createElement('canvas');
document.body.appendChild(canvas);
const context = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

function randomInt (min, max) {
  return Math.random() * (max - min) + min;
}
function randomDirection (left, right) {
  return Math.random() < 0.5 ? right : left;
}

let ball = {
  radius: 20,
  color: '#fff',
  x: canvas.width / 2,
  y: canvas.height / 2,
  velocity: {
    x: randomDirection(-5, 5),
    y: randomInt(-5, 5)
  }
};

class Player {
  constructor (color, x, y) {
    this.color = color;
    this.x = x;
    this.y = y;
    this.height = 200;
    this.width = 30;
    this.velocity = { up: -10, down: 10 };
  }
}

const playerOne = new Player('#00cc66', 0, canvas.height / 2 - 100);
const playerTwo = new Player('#fff44f', canvas.width - 30, canvas.height / 2 - 100);

let playerOneButtons = {
  'AL': false,
  'AR': false
}

let playerTwoButtons = {
  'BL': false,
  'BR': false
}

window.addEventListener('keydown', (event) => {
  if (event.keyCode === 65) playerOneButtons.AL = true;
  if (event.keyCode === 68) playerOneButtons.AR = true;
  if (event.keyCode === 37) playerTwoButtons.BL = true;
  if (event.keyCode === 39) playerTwoButtons.BR = true;
});

window.addEventListener('keyup', (event) => {
  if (event.keyCode === 65) playerOneButtons.AL = false;
  if (event.keyCode === 68) playerOneButtons.AR = false;
  if (event.keyCode === 37) playerTwoButtons.BL = false;
  if (event.keyCode === 39) playerTwoButtons.BR = false;
});

let gameStarted = false;
window.addEventListener('keyup', (event) => {
  if (event.keyCode === 32) {
    gameStarted = true;
  }
});

let scorePlayerOne = 0;
let scorePlayerTwo = 0;

(function mainLoop () {
  // set board background
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

  // players
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
    if (ball.y > playerOne.y && ball.y < playerOne.y + playerOne.height && ball.x - 30 <= ball.radius) {
      ball.velocity.x = Math.abs(ball.velocity.x - 1);
    }
    // Check if the ball collides with player two
    if (ball.y > playerTwo.y && ball.y < playerTwo.y + playerTwo.height && ball.x + ball.radius + 30 > canvas.width) {
      ball.velocity.x = -ball.velocity.x - 1;
    }
    // start new round if ball hits right or left
    if (ball.x + ball.radius < 0 || ball.x - ball.radius > canvas.width) {
      if (ball.x + ball.radius < 0) {
        scorePlayerTwo++;
        document.querySelector('.player-two').innerText = scorePlayerTwo;
      } else {
        scorePlayerOne++;
        document.querySelector('.player-one').innerText = scorePlayerOne;
      }
      gameStarted = false;
      const winnerBox = document.querySelector('.winner');
      if (scorePlayerOne >= 5) {
        winnerBox.classList.add('show');
        winnerBox.firstChild.innerText = 'Green is the winner';
      } else if (scorePlayerTwo >= 5) {
        winnerBox.classList.add('show');
        winnerBox.firstChild.innerText = 'Yellow is the winner';
      } else {
        ball.x = canvas.width / 2;
        ball.y = canvas.height / 2;
        ball.velocity.x = randomDirection(-5, 5);
        ball.velocity.y = randomInt(-5, 5);
      }
    }
  }

  window.requestAnimationFrame(mainLoop);
})();
