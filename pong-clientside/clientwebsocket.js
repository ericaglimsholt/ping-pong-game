'use strict';

// if ('WebSocket' in window) {
//   const ws = new WebSocket('ws://localhost:8025/pong');
//   ws.onopen = function () {
//     //alert('connect to server');
//     console.log('waiting for server');
//   }
//   ws.onmessage = function(event) {
//     const buttonPush = JSON.parse(event.data);
//     console.log(buttonPush);
//     ws.send("client: ok");
//   }
// }

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
