#include <ESP8266WiFi.h>
#include <WiFiClient.h>
#include <ESP8266WebServer.h>
#include <ESP8266mDNS.h>

#ifndef STASSID
#define STASSID "Internet"
#define STAPSK  "mrfunkfunk"
#endif

const char* ssid = STASSID;
const char* password = STAPSK;

ESP8266WebServer server(80);

const int led = 13;
bool blinking = false;
bool ledOn = true;
bool prevState = ledOn;

unsigned long previousMillis = 0;
const long interval = 1000;

void setup(void) {
  pinMode(LED_BUILTIN, OUTPUT);
  Serial.begin(9600);
  WiFi.mode(WIFI_STA);
  WiFi.begin(ssid, password);
  Serial.println("");

  // Wait for connection
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("");
  Serial.print("Connected to ");
  Serial.println(ssid);
  Serial.print("IP address: ");
  Serial.println(WiFi.localIP());

  if (MDNS.begin("esp8266")) {
    Serial.println("MDNS responder started");
  }

  server.on("/on", []() {
    server.send(200, "text/plain", "on");
    ledOn = true;
    Serial.println("on");
  });

  server.on("/off", []() {
    server.send(200, "text/plain", "off");
    ledOn = false;
    Serial.println("off");
  });

  server.on("/blinking/on", []() {
    server.send(200, "text/plain", "on");
    blinking = true;
    Serial.println("blinking on");
  });

  server.on("/blinking/off", []() {
    server.send(200, "text/plain", "off");
    blinking = false;
    Serial.println("blinking off");
  });

  server.on("/blinking/interval", [](AsyncWebServerRequest *request) {
     AsyncWebParameter* p = request->getParam(0);
     Serial.print("Param name: ");
    Serial.println(p->name());
    Serial.print("Param value: ");
    Serial.println(p->value());
    Serial.println("------");
  });

  server.begin();
  Serial.println("HTTP server started");
}

void loop(void) {
  unsigned long currentMillis = millis();

  if (currentMillis - previousMillis >= interval) {
    previousMillis = currentMillis;

    if (blinking) {
      Serial.println("Blink");
      ledOn = !ledOn;
    }
  }

  if (prevState != ledOn) {
    Serial.println("update");
    if (ledOn == true) {
      digitalWrite(LED_BUILTIN, LOW);
    } else {
      digitalWrite(LED_BUILTIN, HIGH);
    }
  }
  prevState = ledOn;
 
  server.handleClient();
  MDNS.update();
}
