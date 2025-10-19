---
date: 2023-09-07 16:04:48+02:00
description: Domoticz - lekka i wydajna platforma automatyki domowej w C++
contributors: ['Paweł Żentała']
draft: false
lastmod: 2025-10-19
aliases:
  - /docs/software/domoticz/
menu:
  docs:
    identifier: ''
    parent: ''
seo:
  canonical: ''
  description: Domoticz - lekka platforma automatyki domowej w C++. Wydajna, działa na starszym sprzęcie, z polską społecznością.
  noindex: false
  title: Domoticz | Dokumentacja - ihome.zentala.io
summary: 'Lekka i wydajna platforma automatyki domowej napisana w C++. Idealna dla starszego sprzętu, z prostym GUI i dobrą integracją ze sprzętem DIY.'
title: Domoticz
toc: true
weight: 300
---

## Domoticz — lekka i wydajna platforma dla DIY

![Domoticz Dashboard](https://www.domoticz.com/wiki/images/3/3a/Dashboard.png)

### 1. Co to jest Domoticz

Domoticz to **lekka i wydajna** otwartoźródłowa platforma automatyki domowej, napisana w języku **C++**. Charakteryzuje się bardzo małym zużyciem zasobów, dzięki czemu doskonale sprawdza się na **starszym sprzęcie** (Raspberry Pi Zero, stare komputery, routery z OpenWrt).

Platforma jest popularna wśród **entuzjastów DIY i elektroników**, którzy budują własne sensory i urządzenia, szczególnie w oparciu o ESP8266/ESP32 i Arduino.

### 2. Główne cechy i zalety

* **Bardzo niskie zużycie zasobów:** Działa płynnie nawet na Raspberry Pi Zero (512 MB RAM)
* **Prosta instalacja:** Jeden plik wykonywalny, brak skomplikowanych zależności
* **Wsparcie dla sprzętu DIY:** Świetna integracja z ESP8266, ESP32, Arduino
* **Integracja MQTT:** Natywna obsługa protokołu MQTT do komunikacji z IoT
* **Polska społeczność:** Aktywne polskie forum i dokumentacja
* **Proste GUI:** Czytelny interfejs webowy, mniej nowoczesny ale funkcjonalny
* **Skrypty Lua/Python/Bash:** Automatyzacje przez skrypty w różnych językach
* **Niezawodność:** Stabilny, rzadko się zawiesza, sprawdza się w instalacjach 24/7
* **Wsparcie dla sprzętu RF:** Dobre wsparcie dla urządzeń 433 MHz i innych protokołów radiowych

### 3. Architektura i komponenty

* **Core (C++):** Bardzo wydajny rdzeń, kompilowany binarnie
* **Web UI:** Prosty interfejs HTML/JavaScript dostępny przez przeglądarkę
* **Hardware Devices:** Integracje ze sprzętem (Zigbee, Z-Wave, MQTT, RFXtrx, etc.)
* **Scripts:** Automatyzacje w Lua, Python, dzBash lub Blockly (wizualnie)
* **Events:** System zdarzeń reagujący na zmiany stanów urządzeń
* **Timers:** Harmonogramy czasowe dla automatyzacji
* **Notifications:** Powiadomienia przez email, SMS, Telegram, push

### 4. Instalacja

**Domoticz oferuje kilka metod instalacji:**

1. **Linux (Debian/Ubuntu/Raspbian)** — zalecana metoda
   ```bash
   sudo curl -sSL install.domoticz.com | sudo bash
   ```
   - Automatyczny skrypt instalacyjny
   - Instaluje się jako usługa systemowa
   - Dostępny na: `http://ip-adres:8080`

2. **Docker**
   ```bash
   docker run -d --name domoticz \
     -p 8080:8080 \
     -v /path/to/data:/opt/domoticz/userdata \
     domoticz/domoticz
   ```

3. **Windows**
   - Pobierz plik wykonywalny z domoticz.com
   - Uruchom jako aplikację lub usługę

4. **OpenWrt (router)**
   - Dostępny w repozytoriach OpenWrt
   - Domoticz na routerze = centrum smart home bez dodatkowego sprzętu!

### 5. Kluczowe zastosowania

* **Projekty DIY:** Integracja własnych sensorów (temperatura, wilgotność, ruch) przez MQTT
* **Sterowanie urządzeniami RF 433 MHz:** Gniazdka, przełączniki, czujniki
* **Budowa taniej automatyki:** Wykorzystanie starszego sprzętu (Pi Zero, stare PC)
* **Monitoring domu:** Czujniki ruchu, otwarcia drzwi/okien, kamery
* **Automatyzacje czasowe:** Włączanie ogrzewania, podlewanie ogrodu, sterowanie oświetleniem
* **Integracja z Node-RED:** Domoticz + Node-RED = potężne combo dla automatyzacji

### 6. Porównanie z innymi platformami

| Cecha | Domoticz | Home Assistant | openHAB |
|-------|----------|----------------|----------|
| **Język** | C++ | Python | Java |
| **Zużycie RAM** | **~50 MB** | ~300 MB | ~400 MB |
| **Konfiguracja** | GUI + skrypty | GUI + YAML | Pliki/GUI |
| **Próg wejścia** | Średni | Niski | Wysoki |
| **DIY/Hobby** | **Świetne** | Dobre | Średnie |
| **Integracji** | ~100 | 2000+ | 400+ |
| **Polska społeczność** | **Tak** | Mała | Bardzo mała |
| **Sprzęt** | Pi Zero, stare PC | Pi 3/4+ | Pi 3/4+ |

### 7. Dla kogo Domoticz?

**Zalecany dla:**
* Entuzjastów elektroniki i DIY (własne sensory, ESP8266/ESP32)
* Osób posiadających starszy sprzęt (Pi Zero, stare komputery)
* Użytkowników urządzeń RF 433 MHz
* Osób szukających polskiej społeczności i wsparcia
* Projektów wymagających niskiego zużycia energii (serwer 24/7)
* Osób ceniących stabilność i prostotę nad nowoczesnością

**Może nie być najlepszy dla:**
* Osób szukających nowoczesnego, ładnego UI (lepszy Home Assistant)
* Użytkowników bez doświadczenia w elektronice/programowaniu
* Osób chcących mieć tysiące gotowych integracji (HA ma 2000+, Domoticz ~100)
* Projektów komercyjnych wymagających wsparcia technicznego

### 8. Rozpoczęcie pracy

**Najprostszy sposób (Raspberry Pi):**

1. Zainstaluj Raspberry Pi OS Lite na karcie SD
2. Uruchom Pi i zaloguj się przez SSH
3. Wykonaj:
   ```bash
   sudo curl -sSL install.domoticz.com | sudo bash
   ```
4. Poczekaj na zakończenie instalacji (~5 minut)
5. Otwórz przeglądarkę: `http://ip-raspberry:8080`
6. Przejdź przez kreator Setup → Add Hardware
7. Dodaj swoje urządzenia (Zigbee, MQTT, RFXtrx, etc.)
8. Twórz automatyzacje przez Events lub skrypty Lua/Python

**Test z MQTT:**
1. Zainstaluj Mosquitto MQTT broker: `sudo apt install mosquitto`
2. W Domoticz: Setup → Hardware → MQTT Client Gateway
3. Opublikuj wiadomość MQTT z sensora ESP8266
4. Zobacz urządzenie w Domoticz

### 9. Społeczność polska

Domoticz ma **jedną z największych polskich społeczności** wśród platform open-source:

* **Forum polskie:** https://www.elektroda.pl/rtvforum/forum.php?f=172
* **Grupa Facebook:** Domoticz Polska
* **Forum międzynarodowe:** https://www.domoticz.com/forum/

Wiele poradników, gotowych skryptów i wsparcia w języku polskim!

### 10. Podsumowanie

Domoticz to **najlepsza platforma dla entuzjastów DIY** i osób posiadających starszy sprzęt. Mimo mniejszej liczby integracji niż Home Assistant, kompensuje to wydajnością, stabilnością i świetnym wsparciem dla sprzętu własnego.

**Jeśli budujesz własne sensory ESP8266, masz Raspberry Pi Zero lub stary komputer, a szukasz polskiej społeczności — Domoticz jest dla Ciebie.**

Platforma doskonale współpracuje z Node-RED, co pozwala na budowę zaawansowanych automatyzacji wizualnie.

### 11. Przydatne linki

* **Oficjalna strona:** https://www.domoticz.com/
* **Dokumentacja:** https://www.domoticz.com/wiki/
* **Forum międzynarodowe:** https://www.domoticz.com/forum/
* **Forum polskie (Elektroda.pl):** https://www.elektroda.pl/rtvforum/forum.php?f=172
* **GitHub:** https://github.com/domoticz/domoticz
* **Wiki (instrukcje):** https://www.domoticz.com/wiki/Main_Page

