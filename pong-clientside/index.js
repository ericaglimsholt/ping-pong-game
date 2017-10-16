'use strict';

const canvas = document.createElement('canvas');
document.body.appendChild(canvas);
const context = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

function randomInt(min, max) {
  return Math.random() * (max - min) + min;
}

class Player {
  constructor(color, x, y) {
    this.color = color;
    this.x = x;
    this.y = y;
    this.height = 200;
    this.width = 30;
    this.velocity = { up: -10, down: 10 };
  }
}
  let ball = {
    radius: 20,
    color: '#fff',
    x: canvas.width / 2,
    y: canvas.height / 2,
    velocity: {
      x: 5,
      y: randomInt(-5, 5)
    }
  };


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

(function mainLoop () {
  // set board background
  context.fillStyle = '#333';
  context.fillRect(0, 0, canvas.width, canvas.height);

  context.beginPath();
  context.fillStyle = playerOne.color;
  context.fillRect(playerOne.x, playerOne.y, playerOne.width, playerOne.height);

  context.beginPath();
  context.fillStyle = playerTwo.color;
  context.fillRect(playerTwo.x, playerTwo.y, playerTwo.width, playerTwo.height);

  // draw ball
  context.beginPath();
  context.fillStyle = ball.color;
  context.arc(ball.x, ball.y, ball.radius, 0, 2 * Math.PI, false);
  context.fill();

  // Update the x and y cordinates based on the velocity.
  ball.x += ball.velocity.x;
  ball.y += ball.velocity.y;

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
  window.requestAnimationFrame(mainLoop);
})();
