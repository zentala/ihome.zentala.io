---
title: "Przyciski"
description: ""
summary: ""
date: 2023-09-07T16:04:48+02:00
lastmod: 2023-09-07T16:04:48+02:00
draft: false
menu:
  docs:
    parent: ""
    identifier: "example-6a1a6be4373e933280d78ea53de6158e"
weight: 30
toc: true
seo:
  title: "" # custom title (optional)
  description: "" # custom description (recommended)
  canonical: "" # custom canonical URL (optional)
  noindex: false # false (default) or true
---

## text

w standarodwj instali elektycznej uzawa sie przelacznikow (ktore zalaczaja lub rozlaczaja przewod z napieciem siecowym np 240V lecacy do swiatla)

natomiast w smarthme funckje przelacznikow pelna przekazniki  w stowniku, to one zalaczaja napiecie na swiatlo i inne elementy wykonawcze

to co sie liczyc w zamian to mozliwosc wyslania jakiegos sygnalu do tego sterwnika, by wiedzial kiedy ten przekaznik ma zalaczyc napiecie na wyjscie na przekazniku

w zwiazku z tym potrzebujemy tak zwaneg przycisku zwiernego. w standardwoych instlacjach byly uzywane do dzwonkow - kiedy zwierwasz jest sygnal, a kiedy puszczas nie ma. tak bedzie dzialal przycisk jaki podlaczymy do naszego sterownika. to standardowa praktyka w IoT

dzieki temu ze sterownik jest cyfrowmy moze odebrac nasze zwarcie, a nawet je zainterprtowac np:
1 kroki przycisk
doubble click
triple click
long click

do takich intepretacji mozna przypisac akcje np
1click - zamknij rolete
double click - zamknij rolete do polowy
triple click - zamknij rolete do 2/3
long click - manualnie kontuljemy zamkniecie rolety, tak dlug jak przyciskamy, tak dlugo roleta sie zamyka

w pakcytce takie przelaczniki dzialaja tak, ze dostarczamy jakies niskie napiecie np 5,12 czy 24V na wejscia mikrokontrolera
mzoemy do tego uzyc - i czesto uzywamy - ciekich kabli np skretki. na ogol

dobra praktyka w IoT jest uloznie od sterownka czy mikrorodzielnicy do puszki z przelacznikiem skretki.

skretka UTP 5 z powodzeniem wystarcza.

## merge

# Przyciski

-   mozna wziac analogowy przycisk zwierny, chwilowy, dzwonkowy

-   wtowczas zwarcie (klikniecie) jest informacja dla bone.io

-   cala masa przyciskow: [https://www.dobregniazdka.pl/search/przycisk-dzwonka](https://www.dobregniazdka.pl/search/przycisk-dzwonka)

-   dowolny przycisk mozna obsluzyc tak ze jak jest zwarty to jest wysoki stan
