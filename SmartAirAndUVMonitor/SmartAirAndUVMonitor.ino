#include "DHT.h"
#include <Wire.h>
#include <LiquidCrystal_I2C.h>

// Pin ที่เชื่อมต่อกับเซ็นเซอร์ DHT
#define DHTPIN 4       // สำหรับ ESP8266 ใช้ GPIO4
#define DHTTYPE DHT22  // DHT 22 (AM2302), AM2321

// กำหนดขาอะนาล็อกที่เชื่อมต่อกับ MQ-135
#define MQ135PIN A1  // ใช้ A0 สำหรับ MQ-135

// กำหนดขาอะนาล็อกที่เชื่อมต่อกับ UV Sensor (S12SD)
#define UVPIN A3     // ใช้ A0 สำหรับ UV sensor (หรือพินอะนาล็อกที่มีอยู่)

String qualityair ="";
// สร้างตัวแปรสำหรับเซ็นเซอร์ DHT
DHT dht(DHTPIN, DHTTYPE);
// กำหนด I2C LCD address และขนาดของจอ (16x2)
LiquidCrystal_I2C lcd(0x27, 16, 2);  // 0x27 คือ I2C address ของ LCD

void setup() {
  // เริ่มต้นการสื่อสารกับ Serial Monitor
  Serial.begin(9600);
  Serial.println("Start Smart Air And Uv Monitor!");

  // เริ่มต้นเซ็นเซอร์ DHT
  dht.begin();
  lcd.init();
  // เริ่มต้น LCD
  lcd.begin(16, 2);  // ขนาดจอ LCD 16x2
  lcd.backlight();   // เปิดไฟแบ็คไลท์
  lcd.print("Start Smart Air ");
  lcd.setCursor(0, 1);
  lcd.print(" And Uv Monitor! ");
}

void loop() {
  // รอระยะเวลาประมาณ 2 วินาทีเพื่ออ่านข้อมูลจากเซ็นเซอร์
  delay(5000);

  // อ่านค่าความชื้นและอุณหภูมิ
  float h = dht.readHumidity();
  float t = dht.readTemperature();

  // อ่านค่าจาก MQ-135 (ก๊าซในอากาศ)
  int mq135Value = analogRead(MQ135PIN);

  double uvIndex;
  int uvValue = analogRead(UVPIN);
 

  // ตรวจสอบว่าการอ่านจาก DHT ล้มเหลวหรือไม่
  if (isnan(h) || isnan(t)) {
    Serial.println(F("Failed to read from DHT sensor!"));
    return;
  }
  if (isnan(mq135Value)) {
    Serial.println(F("Failed to read from GAS sensor!"));
    return;
  }
  if (isnan(uvValue)) {
    Serial.println(F("Failed to read from UV sensor!"));
    return;
  }
  uvIndex = UV_index(uvValue);
  // --- แสดงค่าบน Serial Monitor ---
  Serial.print(F("Humidity: "));
  Serial.print(h);
  Serial.print(F("%  Temperature: "));
  Serial.print(t);
  Serial.print(F(" C  GasValue: "));
  Serial.print(mq135Value);
  Serial.print(F(" QualityAir: "));
  Serial.print((mq135Value < 600) ? "Fresh Air" : "Bad Air");
  Serial.print(F("  UV Index: "));
  Serial.println( uvIndex);

  // --- แสดงค่าบน LCD ทั้งหมด ---
  // แสดงความชื้นและอุณหภูมิ
  lcd.clear();
  lcd.setCursor(0, 0);
  lcd.print("Humidity:");
  lcd.print(h);
  lcd.print("%");
  delay(5000);
  lcd.clear();
  lcd.setCursor(0, 0);
  lcd.print("Temperature: ");
    lcd.setCursor(0, 1);
    lcd.print(t);
    lcd.print(" C");
  delay(5000);

  // แสดงคุณภาพอากาศ
  lcd.clear();
  lcd.setCursor(0, 0);
  lcd.print("Gas Value: ");
  lcd.print(mq135Value);
  lcd.setCursor(0, 1);
  if (mq135Value < 600) {
    lcd.print("Fresh Air");
    qualityair = "Fresh Air";
  } else {
    lcd.print("Bad Air");
    qualityair = "Bad Air";
  }
  delay(5000);

  // แสดงค่า UV
  lcd.clear();
  lcd.setCursor(0, 0);
  lcd.print("UV Index: ");
  lcd.print(uvIndex);
  delay(5000);
}
double UV_index(int sensor_value){
  double Vcc = 5;
  double x = ((double)sensor_value * Vcc) / 1023;
  x *= 1000; // แปลงจาก V เป็น mV
  // Serial.print("\tVolt = ");
  // Serial.print(x, 3);
  // Serial.print("mV");
  
  double uv_index = 0.00000000000543329220 * pow(x, 4) 
                  - 0.00000001711915535446 * pow(x, 3) 
                  + 0.00001910444947213210 * pow(x, 2) 
                  + 0.00176791835612988000 * x 
                  + 0.00759534583886534000;
  return uv_index;
}
