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
    //alert('connect to server');
    console.log('Yay! connected to server.');
  }
  ws.onmessage = function(event) {
    const pushedButton = event.data;
    console.log(pushedButton);
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
    // const buttonPush = JSON.parse(event.data);
    // console.log(buttonPush);
    // ws.send("client: ok");
  }
}


// class Button {
//   constructor(name, pressed, key){
//     this.name = name;
//     this.pressed = pressed;
//     this.key = key;
//
//     window.addEventListener('keyUp', this.handleKeyUp.bind(this))
//   }
//
//   handleKeyUp (event) {
//     if (event.keyCode === this.key) {
//       this.pressed = true
//     }
//   }
// }
//
// const AL = new Button('AL', false, 65);
// const AR = new Button('AR', false, 68);
// const BL = new Button('BL', false, 37);
// const BR = new Button('BR', false, 39);
