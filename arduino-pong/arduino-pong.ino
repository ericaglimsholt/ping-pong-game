
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
  int OneLeftNewVal = digitalRead(PlayerOneLeft);
  int OneRightNewVal = digitalRead(PlayerOneRight);
  int TwoLeftNewVal = digitalRead(PlayerTwoLeft);
  int TwoRightNewVal = digitalRead(PlayerTwoRight);
  if (OneLeftBtnVal != OneLeftNewVal) {
    OneLeftBtnVal = OneLeftNewVal;
    Serial.print("AL");
    Serial.print(OneLeftBtnVal);
  }
  if (OneRightBtnVal != OneRightNewVal) {
    OneRightBtnVal = OneRightNewVal;
    Serial.print(":");
    Serial.print("AR");
    Serial.print(OneRightBtnVal);
  }
  if (TwoLeftBtnVal != TwoLeftNewVal) {
    TwoLeftBtnVal = TwoLeftNewVal;
    Serial.print(":");
    Serial.print("BL");
    Serial.print(TwoLeftBtnVal);
  }
  if (TwoRightBtnVal != TwoRightNewVal) {
    TwoRightBtnVal = TwoRightNewVal;
    Serial.print(":");
    Serial.print("BR");
    Serial.print(TwoRightBtnVal);
  }

  delay(50);
}
