'use strict';

let playerOneButtons = {
  'left': false,
  'right': false
};
let playerTwoButtons = {
  'left': false,
  'right': false
};

// if ('WebSocket' in window) {
//   const ws = new WebSocket('ws://localhost:8025/pong');
//   ws.onopen = function () {
//     console.log('Yay! connected to server.');
//   };
//   ws.onmessage = function (event) {
//     const pushedButton = event.data;
//     switch (pushedButton) {
//       case 'AL1':
//         playerOneButtons.left = true;
//         break;
//       case 'AL0':
//         playerOneButtons.left = false;
//         break;
//       case 'AR1':
//         playerOneButtons.right = true;
//         break;
//       case 'AR0':
//         playerOneButtons.right = false;
//         break;
//       case 'BL1':
//         playerTwoButtons.left = true;
//         break;
//       case 'BL0':
//         playerTwoButtons.left = false;
//         break;
//       case 'BR1':
//         playerTwoButtons.right = true;
//         break;
//       case 'BR0':
//         playerTwoButtons.right = false;
//         break;
//       default:
//         break;
//     }
//   };
// }
