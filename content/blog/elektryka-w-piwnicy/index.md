---
title: "Elektryka w komórce lokatorskiej"
description: "d"
summary: "Jak podlaczylem prąd do komórki lokatorskiej oraz zaprojektowałem w niej elektrykę i jakie umieściłem sensory."
date: 2023-09-07T16:27:22+02:00
lastmod: 2023-09-07T16:27:22+02:00
draft: true
weight: 50
categories: []
tags: []
contributors: []
pinned: false
homepage: false
seo:
  title: "" # custom title (optional)
  description: "" # custom description (recommended)
  canonical: "" # custom canonical URL (optional)
  noindex: false # false (default) or true
---

## Podłączenie prądu
W mojej piwnicy jak w innych nie bylo pradu.
Ale mielismy rzecz jasna prad na korytarzach
SKontaktowalem sie z administratorem, pozwolil mi sie wlaczyc do sieci, ale bez pobierania przesadnych ilosci pradu

W pienicy byla instalacja 1 fazowa, 2 zylowa.
Co wiecej nie mialem dostepu do bezpiecznikow.

Przecialem kable pod napiecniem. Raz jedna zyla, raz 2ga.
zainstalowlaem puszke podobna do innych, w niej zlaczki wago,
a do piwnicy poczatkowo wprowadzilem... przedluzacz.

## Projekt instalacji
nastepnie zabralem sie za projetkowanie instalacji elektrycznej w piwnicy

1) puszka rozdzelcza z szyna din; co ma zawierac
- zabezpieczenie nadpradowe. dosc niskie, mamy przewody 2.5mm2 miedz, ale dalem zabezpiecznie 10A bo one ida na cala piwnice, aby ich nie przegzac, bedzie tez funkcjowanolo jak rozlacznik glownyu
- licznik pradu - zdecydowalem sie zainstlowac malu 1f licznik pradu jakby kedys ktos chcial sie rozpiczac ze mna

2) osprzet
- przelacznik swiatla i gniazdka przy wejsciu
- 2 gniazdka gniazko przy siedzisku, 2 na dole, 3 na gorze - lampka, laptop, jakies narzedzie ew, chociaz moze listwe dam tam jaks po prostu pradowa
- jeszcze jedno gdzies na srodku

3) oswietlnie
- jedna na gorze glowne
- ledu za plkami aby bylo widac co sie dzieje, wlaczana dodatkowo
- pytanie jak je wlaczac jeszcze ? czy osobn czy nie?

4) bezpieczenstwo
- [kontakton](), zewnetrzny (instalowany od srodka), na drzwi
- [czujnik ruchu]() aby automatycznie zapalac swiatlo i wiedziec czy ktos nie wszedl
- [czujnik zalania]() aby monitorowac na wypadek pojawiania sie wody/podtopów w piwnicy

5) internet
- spobuje polaczyc sie bezprzewodowo z mieszkaniem pprzez WIFi albo [LoRaWAN]() (jesli WiFi nie nie bedzie miało zasiegu)

wiec dodatkowo puszka ma zawierac:
1) prosty sterownik z kilkoma wejsciami (przeaczniki, ruchu, kontrakton) i wyjsciami (LEDy, glowne swiatlo)
2) zasilacz led

## Jak zrealizuje sterownik?

### hardware

Zakładam że wifi nie będzie działało. Więc weżmy na warsztat LoRa WAN. Mozna łatwo zreaziowac ten sam projekt na WiFi, ale zakladam ze mozesz miec podobne problemy wiec pokaze jak to zrobic na LoRaWAN:
* kupujemy 2x:
  * LoRa HAT dla Raspberry Pi
  * rpi0 W v2 (wifi pozwoli nam sie polaczyc jak bedzie lepszy zasieg czy cos, oraz polaczyc sie latpopowi ze steorniwkiem)

RPI bedzie stanowiło sterwnik i brakme do kominikacji jednoczesnie. Po za tym pobiera malo pradu, a na tym nam zalezy. A jednoczesnie pozwala na calkiem zlozona logike zaimplemntowac czy nawet podlaczyc kamerke i nagrywac potencjalnego zlodzieja na karte SD.

* opcjonalnie dokupujemy kamere, np.
 * HD F Night Vision OV5647 5Mpx
 - lub kamere USB

* jakas karta SD, wezme jakas stara 8GB, ew musisz cos kupic
* alumnium housing
* rpi0 UPS battery
* przekazniki albo moduly przekaznikow do RPi albo zewnetrzne na szyne DIN albo Zero Relay rozmaru

dzieki temu mamy RPi0 z:
* UPS,
* radiatorem,
* kamerą
* loraWAN
* 2 lub wiecej  przekaznikami


### funkjonalosci
przenalizujmy czoego od niego chcemy:
* odbior danych z
  * sensora ruchu (3in)
  * kontaktronu (1in)
  * przyciskow swiatla - przy wejsciu i przy siedzisku (4-6in)
  * licznik pradu
  * ew jaks czytnik RDID drzwi, najlepiej ukryty np za plyta GK na zewnatrz
  * czujnika zalania
* przelacznanie:
 * gasil swiatlo glowne
 * zasilacz ledow
 * ew zamek elektromechaniczny (ok 200zl)

 rozwazyc: osobne sterowanie tamsamu led, albo miec je jakosc mocno przyciemnione, opcja rozjasniania

## design piwnicy
### zewnaatrza
* drzwi
  * wymiana drzwi zewnetrznych na stalowe - wymierzyc
    * z zewnątrz: biale drzwi i biala sciana albo szare drzwi i szara sciana (tynkowana)
  * wzmocnienie obecnych i dodanie oscieznicy z desek
    * z zewnątrz nic sie nie zmienia
    * w środku będzie
      * deska drewniana, można ją fajnie pomoalować,
      * albo dać płyte jakąś i pomalować farbą do kredy czy do malowania
* obrobic sciane ddokola tynkiem albo GK wlasnie albo zalepic dziury w pustaku jak nic nie będzie robione tam
* w miare mozliwosci ukryc czytnik rfid (np w drziurze albo w drzwiach)

w srodku
* posadzka
  * wylewka betnowoa samopoziom
  * można dodać mikrocement
  * jak zostanie można dodać listy przypodlogowe xD powinno byc ladniej
* sciany
  * czesc scian zatynkowac - te z brzydkiego pustaka + zawalic dzury betonem (aby kolki sie trzymaly)
  * czesc uzupelnic fugi - aby byly ladne fugi - zostal mi material
  * otynkowane sciany (wejscowa) pomalowac,
    * nie wiem jaki kolor, moze jakas szarosc albo czern ew, albo zielen na cala te sciane wejsciowa
    * jak drzwi biale to sciana szara pewnie by sie przydala, ciemnoszara
* polki
  * kontowniki do scian przykrecic (czarne lub czerowno przeciwrdzy)
  * do nich deski malowane jakas lakierobejca albo impregnat koloryzujacy na bazie zywicy, kolor np jasny dab, cos aby komponwalo sie z czerowna sciana ale nie za ciemne bo to piwnica
  * profil narozy na kazdej polce w glebi aby doswietlic je
* od saisada zachpwac wentulacje (sicana z przekladanych cegiel)
  * albo pegboard z ikea czarna albo w kolorze drewna - moze lepiej bo jasniej i przytulniej
  * albo blacha perforwana





