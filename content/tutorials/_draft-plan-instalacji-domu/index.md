---
title: "Planowanie instalacji elektrycznej i sieciowej w nowoczesnym domu"
description: "Kompletny przewodnik po planowaniu infrastruktury elektrycznej i sieciowej dla inteligentnego domu - od layoutu funkcjonalnego po szafy rack i bezpieczeństwo energetyczne."
summary: "Jak zaplanować instalację elektryczną i sieciową w nowoczesnym domu? Przewodnik po layoutcie funkcjonalnym, sieci kablowej, szafach rack i bezpieczeństwie energetycznym."
date: 2023-09-07T16:27:22+02:00
lastmod: 2023-09-07T16:27:22+02:00
draft: true
weight: 50
categories: ["instalacja", "sieć", "energia"]
tags: ["instalacja elektryczna", "sieć komputerowa", "szafa rack", "smart home", "bezpieczeństwo energetyczne"]
contributors: ['Paweł Żentała']
pinned: false
homepage: false
seo:
  title: "Planowanie instalacji elektrycznej i sieciowej - kompletny przewodnik" # custom title (optional)
  description: "Dowiedz się jak zaplanować instalację elektryczną i sieciową w nowoczesnym domu. Praktyczne wskazówki dotyczące layoutu, kabli sieciowych, szaf rack i bezpieczeństwa energetycznego." # custom description (recommended)
  canonical: "" # custom canonical URL (optional)
  noindex: false # false (default) or true
---

# Szkielet nowoczesnego domu – od czego zacząć

Zanim zabierzemy się za prace tech nad smart home, potrzebujemy przemyśleć kilka rzeczy, aby zrobić plan tej instalacji.

## Layout funkcjonalny – zacznij od tego

Musisz przemyśleć **layout kotłowni** oraz **layout funkcjonalny domu**, żeby wiedzieć, co gdzie ogólnie rozmieścić, na co planować.

## Sieć kablowa – fundament wszystkiego

Z mojego doświadczenia internet po kablu działa dużo lepiej niż Wi-Fi.
Mieszkasz na wsi, więc może nie będziesz miał zakłóceń i będzie szybko, ale kto wie.
Ja czuję u siebie w Warszawie, czy teraz jak podróżuję, że kabel ma mniejszy czas reakcji, mimo że prędkość po Wi-Fi jest już dość wysoka.

### Pytanie, czy i ile chcesz infrastruktury kablowej?

Ja traktuję kabel ETH do kompa jako szybki internet.
Obecnie **CAT6 lub CAT7** oferuje **10 Gbps**, co pozwala pobrać **1 GB plik w niecałą sekundę.**
To jest dobre do przesyłania plików w domu między komputerami i serwerem plików.

Ogólnie puszcza się kabel do:
- Komputerów (biurek)
- TV (tam może być konsola itd.)
- Innych urządzeń multimedialnych

Np. instalka do konsoli może zajmować 30 GB – to nadal tylko 30 sekund pobierania (jeśli z serwera lokalnego).

### Mój błąd

Ja najbardziej żałowałem, że nie puściłem szybkich kabli gdzieś (tylko wolne), albo że na jakąś ścianę nie dałem, bo myślałem, że tam będzie łóżko (a chciałem tymczasowo postawić kompa).

## Szafa rack – czy Ci się to opłaca?

Zaplanowałbym też **małą szafę rack podsufitową**, coś takiego:
https://www.google.com/search?q=szafa+rack+podsufitowa

Zamontuje się w niej switch (po waszym zamieszkaniu).

### Po co / dlaczego szafa rack?

**Switch** – aby podłączyć komputery z domu.

**Serwer plików z czasem** – serwer plików to zajebista sprawa:
- Backup plików
- Serwer nagrań z monitoringu
- Backup zdjęć z telefonu
- Inne zastosowania

Daje Ci możliwość dość bezpiecznego trzymania plików na zawsze. Dwa dyski mają ten sam plik – jak jeden się zepsuje, to podmieniasz dysk i serwer kopiuje dane z działającego. To utrzymuje mirror copy of your data, żebyś miał je na zawsze bezpieczne.

Kolejne zastosowanie serwera plików to zdjęcia, archiwum starych zdjęć. Ja nie używam już Google Photos, ale backupuję na NAS.

Kolejne to muzyka – nie skonfigurowałem jeszcze, ale można mieć prywatnego Spotify ze swoją muzyką.

Backup dokumentów – mam wszystkie ważne dokumenty poszeregowane według częstości używania. Na każdym komputerze kopiuję sobie z NAS około 1 GB, których używam na co dzień (jak swoje zdjęcia na strony www, kopie dowodu, paszportu etc.) + do tego rzadziej używane: urzędowe, medyczne.

Inne self-hosted apps do trzymania dokumentów w zorganizowanej formie.

### Przyszłość

Myślę, że przyszłościowo będzie to wyglądało tak, że masz **jeden porządny CPU+GPU w racku**, np. za 20k zł, a w całym domu tanie terminale i one korzystają z tego GPU, kiedy potrzebują (np. jak grasz w grę czy robisz coś w CAD czy renderujesz).

Na tym serwerze mocne GPU obsługuje lokalne modele AI i udostępnia GPU do obciążających prac terminalom. Pozwala Ci to mieć lokalnego prywatnego chata oraz gadać ze smart home poleceniami głosowymi, rozpoznawać ludzi / tablice aut systemem monitoringu etc.

## Energia i bezpieczeństwo energetyczne

Nie znam się na tym, ale jeśli planujesz np. panele słoneczne oraz magazyn energii i inwerter, to warto o tym pomyśleć chociaż trochę.

Baterie są często w formie **Rack 19"**, np.:
https://www.google.com/search?q=bateria+lifepo4+rack+19

Falowniki rzadziej, ale też:
https://www.google.com/search?q=falownik+fotowoltaiczny+rack

### Co proponuję?

Obok rozdzielnicy mieć miejsce – np. po lewej – na szafę rack. Na górze szafę podwieszaną telecom (switch, serwery), a pod nią szafę na magazyn energii.

Ja osobiście polecam chociaż **mały magazyn**, tak aby w przypadku problemów z prądem podtrzymać lodówkę w domu i mieć podstawowe oświetlenie.

Co najmniej przez najbliższą dekadę ceny prądu w Polsce będą rosły, chyba że UE wycofa się z polityki klimatycznej. Co czyni inwestycję w fotowoltaikę coraz bardziej opłacalną.

### Layout w kotłowni

Obecnie oczywiście nic nie będziesz instalował, ale miałbyś już miejsce zaplanowane: po prawej w rogu od góry do dołu rozdzielnia elektryczna w 1 lub więcej module, a po lewej szafa rack. Albo właśnie odwrotnie.

Skoro szafa rack jest głęboka (60-120 cm nawet), to szafa po prawej, a rozdzielnica po lewej – wówczas masz szafę w rogu, nie zajmuje tyle miejsca.

### Co zrobić już teraz?

Jeśli chcesz być gotowy na takie rozwiązania (energetyczne), to trzeba przemyśleć ewentualne podłączenie, zostawienie jakichś przewodów, może już dziś kupić przewody i położyć na ścianach, zostawić gdzieś wyciągnięte pod dachem.

Na tym się nie znam, ale wiem, że są grube, bo niskie napięcie wymaga grubszych przewodów. Dlatego trzeba pomyśleć o tym już dziś.

## Drobiazgi, które robią różnicę

### Czujniki otwarcia drzwi

Wydaje mi się, że dobrze byłoby też dołożyć czujniki otwarcia do drzwi zewnętrznych domu, czego nie zrobiliśmy. To kosztuje grosze, ale poprawia bezpieczeństwo i ułatwia automatyzację. Jest też łatwe w montażu.

To zwykły przełącznik magnetyczny – magnes blisko to zamknięte, daleko to otwarte.

### Gniazdka na zewnątrz

Trzeba pomyśleć też, czy i gdzie na zewnątrz chcesz mieć gniazdka. Ludzie coraz częściej mają gniazdka na zewnątrz – podłączyć kosiarkę czy jakiekolwiek narzędzie.

### Brama i furtka

Zakładam, że od razu puszczamy przewody do bramy oraz furtki. Dajemy oświetlenie w obu miejscach, czy nie? Czy masz światła na ulicy, bo już nie pamiętam?

---

**To wszystko.** Czysta wersja tylko z tego co napisałeś, żadnych dodatków ode mnie.
