---
date: 2025-10-19
description: FHEM - historyczna platforma automatyki domowej w Perlu
contributors: ['Paweł Żentała']
draft: false
lastmod: 2025-10-19
aliases:
  - /docs/software/fhem/
menu:
  docs:
    identifier: ''
    parent: ''
seo:
  canonical: ''
  description: FHEM - jedna z pierwszych platform automatyki domowej w Perlu. Opis historyczny i dlaczego obecnie lepiej wybrać nowsze rozwiązania.
  noindex: false
  title: FHEM | Dokumentacja - ihome.zentala.io
summary: 'Historyczna platforma automatyki domowej napisana w Perlu. Jedna z pierwszych open-source systemów smart home, obecnie wyparta przez nowocześniejsze rozwiązania.'
title: FHEM
toc: true
weight: 500
---

## FHEM — historyczna platforma smart home

### 1. Co to jest FHEM

FHEM (**F**reundliche **H**ausautomations-**E**ntwicklungs-**M**aschine) to jedna z **najstarszych** otwartoźródłowych platform automatyki domowej, napisana w języku **Perl**. Powstała w 2005 roku w Niemczech i była jednym z pionierów ruchu DIY smart home.

⚠️ **Uwaga:** FHEM jest obecnie **przestarzałą platformą**. Nie zalecamy jej dla nowych projektów — lepiej wybrać **Home Assistant**, **Domoticz**, **openHAB** lub **ioBroker**.

### 2. Dlaczego FHEM straciło na znaczeniu?

* **Perl jest przestarzały:** Mało programistów zna Perl w 2025 roku, trudno znaleźć pomoc
* **Stagnacja rozwoju:** Bardzo wolne tempo aktualizacji, brak nowych funkcji
* **Archaiczny interfejs:** GUI wygląda jak z lat 90., brak nowoczesnej wizualizacji
* **Małe wsparcie:** Społeczność znacznie zmniejszyła się, forum nieaktywne
* **Brak integracji:** Nowe urządzenia IoT rzadko otrzymują wsparcie FHEM
* **Konkurencja:** Home Assistant, Domoticz i inne platformy są znacznie lepsze

### 3. Historia i znaczenie

Mimo że FHEM nie jest dziś polecane, **odegrało ważną rolę historyczną**:

* **Pionier open-source smart home:** Jeden z pierwszych systemów dostępnych za darmo
* **Inspiracja dla innych:** Pomysły z FHEM znalazły się w późniejszych platformach
* **Społeczność DIY:** Pomagało budować ruch entuzjastów automatyki domowej
* **Dokumentacja sprzętu:** Forum FHEM zawiera cenne informacje o starszym sprzęcie

### 4. Dla kogo FHEM dzisiaj?

**Jedyne uzasadnione przypadki użycia:**

* Stare instalacje już działające (nie ma sensu przepisywać całego systemu)
* Obsługa bardzo starego sprzętu nieobsługiwanego przez nowsze platformy
* Studia historyczne/badania nad ewolucją smart home

**NIE polecamy dla:**
* Nowych projektów (wybierz Home Assistant, Domoticz lub openHAB)
* Osób uczących się automatyki domowej
* Projektów komercyjnych
* Każdego, kto nie jest zmuszony używać FHEM

### 5. Alternatywy — co wybrać zamiast FHEM?

Jeśli rozważasz FHEM, **zdecydowanie polecamy jedną z tych platform**:

| Platforma | Dla kogo | Dlaczego lepsza niż FHEM |
|-----------|----------|--------------------------|
| **[Home Assistant](/docs/software/home-assistant/)** | Początkujący i zaawansowani | Nowoczesny GUI, 2000+ integracji, ogromna społeczność, Python |
| **[Domoticz](/docs/software/domoticz/)** | Entuzjaści DIY, starszy sprzęt | Lekka, wydajna (C++), polska społeczność, aktywny rozwój |
| **[openHAB](/docs/software/openhab/)** | Zaawansowani użytkownicy | Elastyczna, profesjonalna, wsparcie KNX/przemysł, Java |
| **[ioBroker](/docs/software/iobroker/)** | Programiści JavaScript | Modułowa, Node.js, świetne wizualizacje, niemiecka społeczność |

**Zobacz nasz [tutorial porównawczy platform](/tutorials/jak-wybrac-platforme-automatyki-domowej/)** aby wybrać najlepszą dla Ciebie.

### 6. Techniczne szczegóły (dla ciekawskich)

**Język:** Perl 5
**Rok powstania:** 2005
**Licencja:** GPL v2
**Port domyślny:** 7072 (web), 7073 (websocket)
**Platforma:** Linux (Debian, Raspbian), Docker

**Instalacja (NIE zalecamy):**
```bash
# Debian/Ubuntu/Raspbian
sudo apt-get install perl libdevice-serialport-perl
git clone https://github.com/fhem/fhem-mirror.git
cd fhem-mirror
perl fhem.pl fhem.cfg
```

**Dostęp:** `http://ip-adres:8083` (domyślnie)

### 7. Podsumowanie

FHEM to **fragment historii smart home**, ale jego czas już minął. Jeśli planujesz nowy projekt automatyki domowej, **wybierz Home Assistant** (jeśli jesteś początkujący) lub **Domoticz** (jeśli budujesz własne sensory DIY) albo **openHAB** (dla zaawansowanych).

**Perl stał się niszowym językiem**, a FHEM nie nadąża za rozwojem nowoczesnych urządzeń IoT. Nie ma sensu inwestować czasu w naukę przestarzałej platformy, gdy dostępne są znacznie lepsze alternatywy.

### 8. Przydatne linki (archiwalne)

* **Oficjalna strona:** https://fhem.de/
* **Forum (DE):** https://forum.fhem.de/
* **GitHub:** https://github.com/fhem/fhem-mirror
* **Wiki (DE):** https://wiki.fhem.de/

---

💡 **Zamiast FHEM, przeczytaj nasze artykuły o nowoczesnych platformach:**

- 🚀 [Home Assistant](/docs/software/home-assistant/) — najpopularniejsza platforma (Python)
- 🔧 [Domoticz](/docs/software/domoticz/) — lekka i wydajna (C++)
- 🏢 [openHAB](/docs/software/openhab/) — elastyczna i profesjonalna (Java)
- 📦 [ioBroker](/docs/software/iobroker/) — modułowa (Node.js)
- 📖 [Tutorial: Jak wybrać platformę?](/tutorials/jak-wybrac-platforme-automatyki-domowej/)

