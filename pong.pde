
import processing.serial.*;
import websockets.*;

WebsocketServer ws;

Serial myPort;  // Create object from Serial class
int lineFeed = 10; 
//String currentValues;
Btn[] btns; 

class Btn {
  Boolean pressed;
  String button;
  Btn(String button) {
    this.button = button;
    pressed = false;
  }
}

void setup() 
{
  
  btns = new Btn[4];
  btns[0] = new Btn("AL"); // AL
  btns[1] = new Btn("AR"); // AR
  btns[2] = new Btn("BL"); // BL
  btns[3] = new Btn("BR"); // BR
  
  size(200, 200);

  String portName = Serial.list()[3];

  myPort = new Serial(this, portName, 9600);
  myPort.bufferUntil(lineFeed);
  
  ws = new WebsocketServer(this, 8025, "/pong");

}

void draw() {}

void serialEvent(Serial port) 
{
  String currentValues = port.readString();

  
  String[] buttonsValue = split(currentValues, ":");
  
  for (int i=0; i<buttonsValue.length; i++) {
    String value = trim(buttonsValue[i]);
    
    if(value.equals("AL1")) {
      btns[0].pressed = true; 
      ws.sendMessage("{ \"button\": \"AL\", \"pressed\": true }");
    }
    if(value.equals("AR1")) {
      btns[1].pressed = true;
      ws.sendMessage("{ \"button\": \"AR\", \"pressed\": true }");
    }
    if(value.equals("BL1")) {
      btns[2].pressed = true;
       ws.sendMessage("{ \"button\": \"BL\", \"pressed\": true }");
    }
    if(value.equals("BR1")) {
      btns[3].pressed = true;
      ws.sendMessage("{ \"button\": \"BR\", \"pressed\": true }");
    }
  }
  
}