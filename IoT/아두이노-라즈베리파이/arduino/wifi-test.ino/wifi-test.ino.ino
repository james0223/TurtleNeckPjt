#include "ESP8266.h"
#include <SoftwareSerial.h> 
 
#define SSID "pin"  

#define PASSWORD "pin135321"  

#define HOST_PORT 23

 
SoftwareSerial mySerial(10, 9); /* RX:D10, TX:D9 */
ESP8266 wifi(mySerial);


void setup(void)
{
    Serial.begin(115200);
    Serial.print("setup begin\r\n");
    
    Serial.print("FW Version:");
    Serial.println(wifi.getVersion().c_str());
      
    if (wifi.setOprToStationSoftAP()) {
        Serial.print("to station + softap ok\r\n");
    } else {
        Serial.print("to station + softap err\r\n");
    }
 
    if (wifi.joinAP(SSID, PASSWORD)) {
        Serial.print("Join AP success\r\n");
        Serial.print("IP: ");
        Serial.println(wifi.getLocalIP().c_str());    
    } else {
        Serial.print("Join AP failure\r\n");
    }
    
    if (wifi.enableMUX()) {
        Serial.print("multiple ok\r\n");
    } else {
        Serial.print("multiple err\r\n");
    }
    
    if (wifi.startTCPServer(HOST_PORT)) {
        Serial.print("start tcp server ok\r\n");
    } else {
        Serial.print("start tcp server err\r\n");
    }
    
    if (wifi.setTCPServerTimeout(10)) { 
        Serial.print("set tcp server timout 10 seconds\r\n");
    } else {
        Serial.print("set tcp server timout err\r\n");
    }
    
    Serial.print("setup end\r\n");
 
    pinMode( 13, OUTPUT ); 
}
 
void loop(void)
{
    uint8_t send_buffer[128] = {0};
    uint8_t recv_buffer[128] = {0};
    uint8_t mux_id;
    uint32_t len = wifi.recv(&mux_id, recv_buffer, sizeof(recv_buffer), 100);
    if (len > 0) {
        Serial.print("Received:[");
        for(uint32_t i = 0; i < len; i++) {
            Serial.print((char)recv_buffer[i]);
        }
        Serial.print("]\r\n");


        char command = recv_buffer[0];
        int ledStatus = digitalRead(LED_BUILTIN);
        

        switch (command){
        
            case '1':
              
              if (ledStatus == LOW){
                digitalWrite(LED_BUILTIN, HIGH);
                sprintf(send_buffer, "LED is on\n");
                wifi.send(mux_id,send_buffer, strlen(send_buffer));
              }
              else{
                sprintf(send_buffer, "LED is already on\n");
                wifi.send(mux_id,send_buffer, strlen(send_buffer));
              }
              break;
        
            case '2':
            
              if (ledStatus == HIGH){
                digitalWrite(LED_BUILTIN, LOW);
                sprintf(send_buffer, "LED is off.\n");
                wifi.send(mux_id,send_buffer, strlen(send_buffer));
              }
              else{
                sprintf(send_buffer, "LED is already off.\n");
                wifi.send(mux_id,send_buffer, strlen(send_buffer));
              }
              break;
        
            case 'S':
            case 's':
                
              if (ledStatus == LOW){
                sprintf(send_buffer, "LED status: off\n");
                wifi.send(mux_id,send_buffer, strlen(send_buffer));
              }
              else {
                sprintf(send_buffer, "LED status: on\n");
                wifi.send(mux_id,send_buffer, strlen(send_buffer));
              }
              break;
              
            default:
              uint8_t buf[]="Usage\n1 : Turn On LED\n2 : Turn Off LED\nS : LED status\n\n";
              wifi.send(mux_id, buf, strlen(buf));
              break;
              
        }      
    }
}
