
import processing.serial.*;
import websockets.*;

WebsocketServer ws;

Serial myPort;  // Create object from Serial class
int lineFeed = 10; 

void setup() 
{
  size(200, 200);

  String portName = Serial.list()[3];

  myPort = new Serial(this, portName, 9600);
  myPort.bufferUntil(lineFeed);
  
  ws = new WebsocketServer(this, 8025, "/pong");
}

void draw() {}

void serialEvent(Serial port) 
{
  String value = trim(port.readString());
  //println(value);
  ws.sendMessage(value);
}