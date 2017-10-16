'use strict';

const canvas = document.createElement('canvas');
document.body.appendChild(canvas);
const context = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let playerOne = {
  x: 0,
  y: canvas.height / 2 - 100,
  height: 200,
  width: 30,
  color: '#35999e',
  velocity: { x: 0, y: 0 }
};

let playerTwo = {
  x: canvas.width - 30,
  y: canvas.height / 2 - 100, // this.height / 2 ?
  height: 200,
  width: 30,
  color: '#35999e',
  velocity: { x: 5, y: 5 }
};

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

  //playerTwo.y += playerTwo.velocity.y;
  window.requestAnimationFrame(mainLoop);
})();
