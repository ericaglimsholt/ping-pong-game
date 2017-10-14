
int PlayerOneLeft = 7; // Green player
int PlayerOneRight = 6; // Green player
int PlayerTwoLeft = 8; // Yellow player
int PlayerTwoRight = 9; // yellow player
int OneLeftBtnVal = 0;
int OneRightBtnVal = 0;
int TwoLeftBtnVal = 0;
int TwoRightBtnVal = 0;

void setup() {
  Serial.begin(9600);
  pinMode(PlayerOneLeft, OUTPUT);
  pinMode(PlayerOneRight, OUTPUT);
  pinMode(PlayerTwoLeft, OUTPUT);
  pinMode(PlayerTwoRight, OUTPUT);
}

void loop() {
  OneLeftBtnVal = digitalRead(PlayerOneLeft);
  OneRightBtnVal = digitalRead(PlayerOneRight);
  TwoLeftBtnVal = digitalRead(PlayerTwoLeft);
  TwoRightBtnVal = digitalRead(PlayerTwoRight);
  //String s = buttonValue1 + buttonValue2;
  Serial.print("AL");
  Serial.print(OneLeftBtnVal);
  Serial.print(":");
  Serial.print("AR");
  Serial.print(OneRightBtnVal);
  Serial.print(":");
  Serial.print("BL");
  Serial.print(TwoLeftBtnVal);
  Serial.print(":");
  Serial.print("BR");
  Serial.println(TwoRightBtnVal);

  delay(50);
}
