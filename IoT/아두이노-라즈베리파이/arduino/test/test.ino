#include <DHT.h>
#include <DHT_U.h>
#include <Servo.h>

#define DHT_PIN 7
#define SERVO_PIN 3
#define SPEAKER_PIN 8
#define RELAY_PIN 12

#define DHTTYPE DHT11
DHT_Unified dht(DHT_PIN, DHTTYPE);

int Oct4[12] = {262, 277, 294, 311, 330, 349, 370, 392, 415, 440, 466, 494};
int Oct5[12] = {523, 554, 587, 622, 659, 698, 740, 784, 831, 880, 932, 988};
int Oct6[12] = {1047, 1109, 1175, 1245, 1319, 1397, 1480, 1568, 1661, 1760, 1865, 1976};

Servo servo;

boolean b_new_data = false;
String s_data;
boolean humidifier_state = false;

void setup()
{
  Serial.begin(9600);
  pinMode(RELAY_PIN, OUTPUT);
  servo.attach(SERVO_PIN);
  dht.begin();
}

void loop()
{
  recData();
  function();
}
void recData()
{
  if (Serial.available() > 0)
  {
    s_data = Serial.readString();
    Serial.print(s_data);
    b_new_data = true;
  }
}
void note(int pin, int hz, int t)
{
  tone(pin, hz);
  delay(t);
}
void staNote(int pin, int hz, int t)
{
  tone(pin, hz);
  delay(t - 20);
  noTone(pin);
  delay(20);
}
void rest(int pin, int t)
{
  noTone(pin);
  delay(t);
}
void function()
{
  if (b_new_data == true)
  {

    if (s_data == "SR")
    {
      sensors_event_t event;
      dht.temperature().getEvent(&event);

      if (isnan(event.temperature))
      {
        Serial.println(F("Error reading temperature!"));
      }
      else
      {

        Serial.print(event.temperature);
        Serial.print(",");
      }
      // Get humidity event and print its value.
      dht.humidity().getEvent(&event);
      if (isnan(event.relative_humidity))
      {
        Serial.println(F("Error reading humidity!"));
      }
      else
      {
        Serial.println(event.relative_humidity);
      }
    }

    else if (s_data == "MC1")
    {
      servo.write(90);
      Serial.println("1");
    }

    else if (s_data == "MC2")
    {
      servo.write(45);
      Serial.println("2");
    }

    else if (s_data == "MC3")
    {
      servo.write(0);
      Serial.println("3");
    }
    else if (s_data == "MS1")
    {
      note(SPEAKER_PIN, Oct6[0], 160);
      note(SPEAKER_PIN, Oct6[5], 160);
      note(SPEAKER_PIN, Oct6[9], 160);
      note(SPEAKER_PIN, 2093, 160);
      rest(SPEAKER_PIN, 10);
    }
    else if (s_data == "ME1")
    {
      note(SPEAKER_PIN, 2093, 160);
      note(SPEAKER_PIN, Oct6[9], 160);
      note(SPEAKER_PIN, Oct6[5], 160);
      note(SPEAKER_PIN, Oct6[0], 160);
      rest(SPEAKER_PIN, 10);
    }
    else if (s_data == "MW1")
    {
      staNote(SPEAKER_PIN, Oct5[6], 180);
      staNote(SPEAKER_PIN, Oct5[9], 180);
      staNote(SPEAKER_PIN, Oct5[9], 180);
      staNote(SPEAKER_PIN, Oct5[9], 180);
      rest(SPEAKER_PIN, 180);
      staNote(SPEAKER_PIN, Oct5[6], 180);
      staNote(SPEAKER_PIN, Oct5[9], 360);

      staNote(SPEAKER_PIN, Oct5[6], 180);
      staNote(SPEAKER_PIN, Oct5[9], 180);
      staNote(SPEAKER_PIN, Oct5[9], 180);
      staNote(SPEAKER_PIN, Oct5[9], 360);
      staNote(SPEAKER_PIN, Oct5[11], 180);
      staNote(SPEAKER_PIN, Oct5[9], 360);

      staNote(SPEAKER_PIN, Oct6[2], 180);
      staNote(SPEAKER_PIN, Oct6[2], 180);
      staNote(SPEAKER_PIN, Oct6[2], 180);
      rest(SPEAKER_PIN, 180);
      staNote(SPEAKER_PIN, Oct6[2], 180);
      staNote(SPEAKER_PIN, Oct6[2], 180);
      staNote(SPEAKER_PIN, Oct6[2], 180);
      rest(SPEAKER_PIN, 180);

      staNote(SPEAKER_PIN, Oct5[11], 180);
      staNote(SPEAKER_PIN, Oct5[11], 180);
      staNote(SPEAKER_PIN, Oct5[11], 180);
      staNote(SPEAKER_PIN, Oct5[11], 360);
      staNote(SPEAKER_PIN, Oct5[9], 180);
      staNote(SPEAKER_PIN, Oct5[11], 180);

      staNote(SPEAKER_PIN, Oct5[7], 180);
      staNote(SPEAKER_PIN, Oct5[7], 180);
      staNote(SPEAKER_PIN, Oct5[9], 180);
      staNote(SPEAKER_PIN, Oct5[9], 180);
      staNote(SPEAKER_PIN, Oct5[11], 180);
      staNote(SPEAKER_PIN, Oct5[11], 180);
      staNote(SPEAKER_PIN, Oct6[1], 180);
      staNote(SPEAKER_PIN, Oct6[2], 360);

      staNote(SPEAKER_PIN, Oct5[10], 360);
      staNote(SPEAKER_PIN, Oct5[10], 540);
      rest(SPEAKER_PIN, 360);

      staNote(SPEAKER_PIN, Oct6[6], 180);
      staNote(SPEAKER_PIN, Oct6[6], 180);
      staNote(SPEAKER_PIN, Oct6[6], 180);
      staNote(SPEAKER_PIN, Oct6[6], 360);
      staNote(SPEAKER_PIN, Oct6[2], 180);
      staNote(SPEAKER_PIN, Oct6[6], 360);
      staNote(SPEAKER_PIN, Oct6[4], 360);
    }

    else if (s_data == "MS2")
    {
      note(SPEAKER_PIN, Oct6[0], 160);
      note(SPEAKER_PIN, Oct6[5], 160);
      note(SPEAKER_PIN, Oct6[9], 160);
      note(SPEAKER_PIN, 2093, 160);
      rest(SPEAKER_PIN, 10);
    }
    else if (s_data == "ME2")
    {
      note(SPEAKER_PIN, 2093, 160);
      note(SPEAKER_PIN, Oct6[9], 160);
      note(SPEAKER_PIN, Oct6[5], 160);
      note(SPEAKER_PIN, Oct6[0], 160);
      rest(SPEAKER_PIN, 10);
    }
    else if (s_data == "MW2")
    {
      staNote(SPEAKER_PIN, Oct5[9], 160);
      staNote(SPEAKER_PIN, Oct6[2], 160);
      staNote(SPEAKER_PIN, Oct6[4], 160);
      staNote(SPEAKER_PIN, Oct6[6], 160);

      staNote(SPEAKER_PIN, Oct6[4], 320);
      staNote(SPEAKER_PIN, Oct6[2], 160);
      staNote(SPEAKER_PIN, Oct6[2], 800);
      rest(SPEAKER_PIN, 640);
      staNote(SPEAKER_PIN, Oct5[9], 160);
      staNote(SPEAKER_PIN, Oct6[2], 160);
      staNote(SPEAKER_PIN, Oct6[4], 160);
      staNote(SPEAKER_PIN, Oct6[6], 160);

      staNote(SPEAKER_PIN, Oct6[4], 320);
      staNote(SPEAKER_PIN, Oct6[2], 160);
      staNote(SPEAKER_PIN, Oct6[4], 320);
      staNote(SPEAKER_PIN, Oct6[9], 320);
      staNote(SPEAKER_PIN, Oct6[6], 800);
      staNote(SPEAKER_PIN, Oct5[6], 320);
      staNote(SPEAKER_PIN, Oct6[7], 320);

      staNote(SPEAKER_PIN, Oct6[9], 320);
      staNote(SPEAKER_PIN, Oct6[9], 160);
      staNote(SPEAKER_PIN, Oct6[9], 480);
      staNote(SPEAKER_PIN, Oct6[9], 320);
      staNote(SPEAKER_PIN, Oct6[9], 320);
      staNote(SPEAKER_PIN, Oct6[6], 160);
      staNote(SPEAKER_PIN, Oct6[2], 480);
      staNote(SPEAKER_PIN, Oct6[6], 160);
      staNote(SPEAKER_PIN, Oct6[7], 160);

      staNote(SPEAKER_PIN, Oct6[9], 320);
      staNote(SPEAKER_PIN, Oct6[9], 160);
      staNote(SPEAKER_PIN, Oct6[9], 480);
      staNote(SPEAKER_PIN, Oct6[9], 320);
      staNote(SPEAKER_PIN, Oct6[9], 320);
      staNote(SPEAKER_PIN, Oct6[6], 160);
      staNote(SPEAKER_PIN, Oct6[2], 480);
      staNote(SPEAKER_PIN, Oct6[2], 160);
      staNote(SPEAKER_PIN, Oct6[4], 160);

      staNote(SPEAKER_PIN, Oct6[6], 320);
      staNote(SPEAKER_PIN, Oct6[6], 160);
      staNote(SPEAKER_PIN, Oct6[6], 480);
      staNote(SPEAKER_PIN, Oct6[6], 320);
      staNote(SPEAKER_PIN, Oct6[6], 640);

      staNote(SPEAKER_PIN, Oct6[4], 107);
      staNote(SPEAKER_PIN, Oct6[6], 107);
      staNote(SPEAKER_PIN, Oct6[4], 107);
      staNote(SPEAKER_PIN, Oct6[2], 160);
      staNote(SPEAKER_PIN, Oct5[11], 160);
      staNote(SPEAKER_PIN, Oct6[2], 480);
    }

    else if (s_data == "MS3")
    {
      note(SPEAKER_PIN, Oct6[0], 160);
      note(SPEAKER_PIN, Oct6[5], 160);
      note(SPEAKER_PIN, Oct6[9], 160);
      note(SPEAKER_PIN, 2093, 160);
      rest(SPEAKER_PIN, 10);
    }
    else if (s_data == "ME3")
    {
      note(SPEAKER_PIN, 2093, 160);
      note(SPEAKER_PIN, Oct6[9], 160);
      note(SPEAKER_PIN, Oct6[5], 160);
      note(SPEAKER_PIN, Oct6[0], 160);
      rest(SPEAKER_PIN, 10);
    }
    else if (s_data == "MW3")
    {
      tone(SPEAKER_PIN, 1865);
      delay(2000);

      tone(SPEAKER_PIN, 988);
      delay(500);
      tone(SPEAKER_PIN, 1175);
      delay(500);
      tone(SPEAKER_PIN, 1480);
      delay(500);
      tone(SPEAKER_PIN, 1175);
      delay(500);

      tone(SPEAKER_PIN, 932);
      delay(500);
      tone(SPEAKER_PIN, 1109);
      delay(500);
      tone(SPEAKER_PIN, 1319);
      delay(500);
      tone(SPEAKER_PIN, 932);
      delay(500);

      tone(SPEAKER_PIN, 988);
      delay(500);
      tone(SPEAKER_PIN, 1175);
      delay(500);
      tone(SPEAKER_PIN, 1480);
      delay(500);
      tone(SPEAKER_PIN, 1175);
      delay(500);

      tone(SPEAKER_PIN, 932);
      delay(500);
      tone(SPEAKER_PIN, 1109);
      delay(500);
      tone(SPEAKER_PIN, 1319);
      delay(500);
      tone(SPEAKER_PIN, 932);
      delay(500);

      noTone(SPEAKER_PIN);
      Serial.println("알람");
    }
    else if (s_data == "RON")
    {
      if (!humidifier_state)
      {
        digitalWrite(RELAY_PIN, 1);
        delay(200);
        digitalWrite(RELAY_PIN, 0);

        humidifier_state = true;
      }
      Serial.println("가습기 : on");
    }
    else if (s_data == "ROF")
    {
      if (humidifier_state)
      {
        digitalWrite(RELAY_PIN, 1);
        delay(200);
        digitalWrite(RELAY_PIN, 0);
        delay(200);
        digitalWrite(RELAY_PIN, 1);
        delay(200);
        digitalWrite(RELAY_PIN, 0);

        humidifier_state = false;
      }
      digitalWrite(RELAY_PIN, 0);
      Serial.println("가습기 : off");
    }

    b_new_data = false;
  }
}
