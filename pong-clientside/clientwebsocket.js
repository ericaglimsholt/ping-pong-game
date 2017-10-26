'use strict';

let playerOneButtons = {
  'left': false,
  'right': false
};
let playerTwoButtons = {
  'left': false,
  'right': false
};

if ('WebSocket' in window) {
  const ws = new WebSocket('ws://172.17.12.27:8025/pong');
  ws.onopen = function () {
    console.log('Yay! connected to server.');
  };
  ws.onmessage = function (event) {
    const pushedButton = event.data;
    switch (pushedButton) {
      case 'AL1':
        playerOneButtons.left = true;
        break;
      case 'AL0':
        playerOneButtons.left = false;
        break;
      case 'AR1':
        playerOneButtons.right = true;
        break;
      case 'AR0':
        playerOneButtons.right = false;
        break;
      case 'BL1':
        playerTwoButtons.left = true;
        break;
      case 'BL0':
        playerTwoButtons.left = false;
        break;
      case 'BR1':
        playerTwoButtons.right = true;
        break;
      case 'BR0':
        playerTwoButtons.right = false;
        break;
      default:
        break;
    }
  };
}

// Uncomment this to play on keyboard instead of with arduino buttons.
// Player one plays with 'a' and 'd' keys and player two plays with left and right arrow keys
// If the players press the valid button, set button to true
// window.addEventListener('keydown', (event) => {
//   if (event.keyCode === 65) playerOneButtons.left = true;
//   if (event.keyCode === 68) playerOneButtons.right = true;
//   if (event.keyCode === 37) playerTwoButtons.left = true;
//   if (event.keyCode === 39) playerTwoButtons.right = true;
// });
//
// // Listen to the players keyup, set button to false
// window.addEventListener('keyup', (event) => {
//   if (event.keyCode === 65) playerOneButtons.left = false;
//   if (event.keyCode === 68) playerOneButtons.right = false;
//   if (event.keyCode === 37) playerTwoButtons.left = false;
//   if (event.keyCode === 39) playerTwoButtons.right = false;
// });
