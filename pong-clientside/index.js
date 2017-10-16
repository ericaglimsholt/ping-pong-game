'use strict';

const canvas = document.createElement('canvas');
document.body.appendChild(canvas);
const context = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class Player {
  constructor(color, x, y) {
    this.color = color;
    this.x = x;
    this.y = y;
    this.height = 200;
    this.width = 30;
    this.velocity = { up: -5, down: 5 };
  }
}

const playerOne = new Player('#35999e', 0, canvas.height / 2 - 100);
const playerTwo = new Player('#35999e', canvas.width - 30, canvas.height / 2 - 100);

let buttonPressedPlayerOne = null;
let buttonPressedPlayerTwo = null;

window.addEventListener('keydown', (event) => {
  if (event.keyCode === 65) {
    buttonPressedPlayerOne = 'AL'
  }
  if (event.keyCode === 68) {
    buttonPressedPlayerOne = 'AR'
  }
  if (event.keyCode === 37) {
    buttonPressedPlayerTwo = 'BL'
  }
  if (event.keyCode === 39) {
    buttonPressedPlayerTwo = 'BR'
  }
});

window.addEventListener('keyup', (event) => {
  if (event.keyCode === 65 || event.keyCode === 68) {
    buttonPressedPlayerOne = null;
  }
  if (event.keyCode === 37 || event.keyCode === 39) {
    buttonPressedPlayerTwo = null;
  }
});

(function mainLoop () {
  // set board background
  context.fillStyle = '#ccffe9';
  context.fillRect(0, 0, canvas.width, canvas.height);

  context.beginPath();
  context.fillStyle = playerOne.color;
  context.fillRect(playerOne.x, playerOne.y, playerOne.width, playerOne.height);

  context.beginPath();
  context.fillStyle = playerTwo.color;
  context.fillRect(playerTwo.x, playerTwo.y, playerTwo.width, playerTwo.height);

  if (buttonPressedPlayerOne === 'AL') {
    playerOne.y += playerOne.velocity.down;
  }
  if (buttonPressedPlayerOne === 'AR') {
    playerOne.y += playerOne.velocity.up;
  }
  if (buttonPressedPlayerTwo === 'BL') {
    playerTwo.y += playerTwo.velocity.down;
  }
  if (buttonPressedPlayerTwo === 'BR') {
    playerTwo.y += playerTwo.velocity.up;
  }

  window.requestAnimationFrame(mainLoop);
})();
