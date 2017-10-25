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
  const ws = new WebSocket('ws://localhost:8025/pong');
  ws.onopen = function () {
    console.log('Yay! connected to server.');
  };
  ws.onmessage = function (event) {
    const pushedButton = event.data;
    if (pushedButton === 'AL1') {
      playerOneButtons.left = true;
    }
    if (pushedButton === 'AL0') {
      playerOneButtons.left = false;
    }
    if (pushedButton === 'AR1') {
      playerOneButtons.right = true;
    }
    if (pushedButton === 'AR0') {
      playerOneButtons.right = false;
    }
    if (pushedButton === 'BL1') {
      playerTwoButtons.left = true;
    }
    if (pushedButton === 'BL0') {
      playerTwoButtons.left = false;
    }
    if (pushedButton === 'BR1') {
      playerTwoButtons.right = true;
    }
    if (pushedButton === 'BR0') {
      playerTwoButtons.right = false;
    }
  };
}
