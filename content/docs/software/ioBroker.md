---
date: 2025-10-19
description: ioBroker - modułowa platforma automatyki domowej w Node.js
contributors: ['Paweł Żentała']
draft: false
lastmod: 2025-10-19
aliases:
  - /docs/software/iobroker/
menu:
  docs:
    identifier: ''
    parent: ''
seo:
  canonical: ''
  description: ioBroker - modułowa platforma automatyki domowej w Node.js z systemem adapterów i silną społecznością niemiecką.
  noindex: false
  title: ioBroker | Dokumentacja - ihome.zentala.io
summary: 'Modułowa platforma automatyki domowej oparta na Node.js z systemem adapterów. Popularna w Niemczech, z doskonałą wizualizacją i obsługą IoT.'
title: ioBroker
toc: true
weight: 300
---

## ioBroker — modułowa platforma z Node.js

![ioBroker Dashboard](https://www.iobroker.net/wp-content/uploads/2021/07/ioBroker_Image_Homeautomation_13-1024x576.jpg)

### 1. Co to jest ioBroker

ioBroker to **modułowa** otwartoźródłowa platforma automatyki domowej, napisana w języku **Node.js (JavaScript)**. Charakteryzuje się architekturą opartą na **adapterach** — każda integracja to osobny moduł, który można doinstalować niezależnie.

Platforma jest **bardzo popularna w Niemczech** i krajach niemieckojęzycznych, gdzie posiada dużą społeczność i obszerną dokumentację.

### 2. Główne cechy i zalety

* **System adapterów:** Ponad **500 adapterów** do różnych urządzeń i usług (Zigbee, Z-Wave, Alexa, Sonos, etc.)
* **Node.js/JavaScript:** Znajoma technologia dla programistów webowych
* **Doskonałe wizualizacje:** Zaawansowane narzędzia do tworzenia dashboardów (VIS, VIS-2)
* **Multi-host:** Możliwość rozproszenia na wiele serwerów (główny + satelity)
* **Duża społeczność niemiecka:** Ogromne wsparcie na forum niemieckim
* **Łatwa instalacja adapterów:** Wszystko przez GUI, jak w app store
* **Backup & Restore:** Wbudowane narzędzia do kopii zapasowych
* **IoT ready:** Świetne wsparcie dla MQTT, Modbus, KNX i innych protokołów przemysłowych
* **Skrypty JavaScript:** Automatyzacje w JavaScript/TypeScript bezpośrednio w systemie

### 3. Architektura i komponenty

* **js-controller:** Rdzeń systemu zarządzający adapterami i obiektami
* **Adaptery:** Moduły do komunikacji z urządzeniami (każdy działa jako osobny proces)
* **Objects & States:** Baza danych stanów urządzeń (Redis lub wbudowana)
* **Admin UI:** Panel administracyjny do zarządzania systemem i adapterami
* **VIS / VIS-2:** Kreatory wizualizacji do tworzenia niestandardowych dashboardów
* **Scripts (JavaScript):** Silnik skryptów do automatyzacji
* **Blockly:** Wizualny edytor automatyzacji (jak Scratch)
* **Scenes:** Mechanizm scen (zapisane stany wielu urządzeń)

### 4. Instalacja

**ioBroker oferuje kilka metod instalacji:**

1. **Linux (Debian/Ubuntu/Raspbian)** — zalecana metoda
   ```bash
   curl -sL https://iobroker.net/install.sh | bash -
   ```
   - Automatyczny skrypt instalacyjny
   - Instaluje Node.js, js-controller i podstawowe adaptery
   - Dostępny na: `http://ip-adres:8081`

2. **Docker**
   ```bash
   docker run -d \
     --name iobroker \
     -p 8081:8081 \
     -v iobrokerdata:/opt/iobroker \
     buanet/iobroker
   ```

3. **Windows**
   - Pobierz installer z iobroker.net
   - Uruchom setup wizard
   - Wymaga zainstalowanego Node.js

4. **Proxmox/VM**
   - Dostępne gotowe obrazy VM
   - Import OVA/OVF do Proxmox, VirtualBox, VMware

### 5. Kluczowe zastosowania

* **Złożone wizualizacje:** Tworzenie profesjonalnych paneli sterowania z VIS
* **Integracja systemów przemysłowych:** KNX, Modbus, BACnet dla budynków komercyjnych
* **Multi-room audio:** Integracja z Sonos, Squeezebox, Chromecast Audio
* **Zarządzanie energią:** Monitoring PV (fotowoltaika), baterie, pompy ciepła
* **Powiadomienia i alerty:** Telegram, Pushover, Email, VoIP
* **Monitoring IoT:** Zbieranie danych z wielu czujników MQTT/Modbus

### 6. Porównanie z innymi platformami

| Cecha | ioBroker | Home Assistant | openHAB |
|-------|----------|----------------|----------|
| **Język** | Node.js/JS | Python | Java |
| **Architektura** | Adaptery | Integracje | Bindingi |
| **Liczba integracji** | **500+** | 2000+ | 400+ |
| **Konfiguracja** | GUI + JS | GUI + YAML | Pliki/GUI |
| **Wizualizacje** | **Świetne (VIS)** | Dobre | Dobre |
| **Społeczność** | Duża (DE) | **Bardzo duża** | Średnia |
| **Multi-host** | **Tak** | Nie | Nie |
| **Dla developerów** | **JS/TS** | Python | Java |

### 7. Dla kogo ioBroker?

**Zalecany dla:**
* Programistów JavaScript/Node.js (znają ekosystem npm)
* Osób mówiących po niemiecku (najlepsza dokumentacja i wsparcie)
* Projektów wymagających rozproszonych instalacji (multi-host)
* Entuzjastów zaawansowanych wizualizacji (VIS jest bardzo potężny)
* Instalacji przemysłowych (KNX, Modbus, BACnet)
* Osób ceniących modułowość i separation of concerns

**Może nie być najlepszy dla:**
* Osób nie mówiących po niemiecku/angielsku (mało polskich zasobów)
* Użytkowników szukających największej liczby integracji (HA ma więcej)
* Początkujących bez doświadczenia w IT (Home Assistant łatwiejszy)

### 8. Rozpoczęcie pracy

**Najprostszy sposób (Raspberry Pi):**

1. Zainstaluj Raspberry Pi OS Lite na karcie SD
2. Uruchom Pi i zaloguj się przez SSH
3. Wykonaj:
   ```bash
   curl -sL https://iobroker.net/install.sh | bash -
   ```
4. Poczekaj na zakończenie instalacji (~15-20 minut)
5. Otwórz przeglądarkę: `http://ip-raspberry:8081`
6. Zaloguj się do Admin UI
7. Przejdź do zakładki "Adapters" i zainstaluj potrzebne adaptery
8. Skonfiguruj adaptery (np. Zigbee, MQTT, Telegram)
9. Twórz automatyzacje w zakładce "Scripts" (JavaScript lub Blockly)
10. Stwórz wizualizację w VIS-2

**Pierwsze adaptery do zainstalowania:**
- `admin` (preinstalowany) - panel administracyjny
- `discovery` - automatyczne wykrywanie urządzeń
- `zigbee` - obsługa urządzeń Zigbee (jeśli masz bramkę)
- `mqtt` - protokół MQTT do IoT
- `telegram` - powiadomienia przez Telegram
- `javascript` - skrypty automatyzacji
- `vis-2` - nowoczesna wizualizacja

### 9. Społeczność i zasoby

ioBroker ma **silną społeczność niemieckojęzyczną**:

* **Forum niemieckie:** https://forum.iobroker.net/ (największe)
* **Forum angielskie:** https://forum.iobroker.net/category/1/english
* **Dokumentacja:** https://www.iobroker.net/#de/documentation
* **GitHub:** https://github.com/ioBroker
* **Facebook:** Grupy ioBroker (DE)
* **YouTube:** Wiele tutoriali (głównie po niemiecku)

**Polska społeczność:** Znacznie mniejsza niż dla Home Assistant czy Domoticz.

### 10. Podsumowanie

ioBroker to **doskonała platforma dla programistów JavaScript** i osób mówiących po niemiecku. Modułowa architektura z adapterami zapewnia elastyczność, a system VIS pozwala na tworzenie profesjonalnych wizualizacji.

**Jeśli znasz JavaScript/Node.js i planujesz złożony projekt wymagający zaawansowanych dashboardów lub multi-host — ioBroker to świetny wybór.**

Platforma szczególnie sprawdza się w instalacjach **komercyjnych i przemysłowych** (wsparcie dla KNX, Modbus, BACnet).

**Jednak dla polskojęzycznych użytkowników bez znajomości niemieckiego** Home Assistant lub Domoticz mogą być lepszym wyborem ze względu na dostępność polskich zasobów.

### 11. Przydatne linki

* **Oficjalna strona:** https://www.iobroker.net/
* **Dokumentacja:** https://www.iobroker.net/#de/documentation
* **Forum (DE):** https://forum.iobroker.net/
* **GitHub:** https://github.com/ioBroker/ioBroker
* **Lista adapterów:** https://www.iobroker.net/#de/adapters
* **VIS dokumentacja:** https://github.com/ioBroker/ioBroker.vis

