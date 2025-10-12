---
title: "Moja historia BoneIO - wady i zalety polskiego sterownika Smart Home"
description: "Dlaczego wybrałem BoneIO, problemy które napotkałem, dlaczego planuję zakup  test chińskiej alternatywy."
summary: "Osobiste doświadczenia z instalacją BoneIO - problemy, które napotkałem, lokalne wsparcie i dlaczego planuję test chińskiej alternatywy."
thumb: "https://static.zentala.io/boneio/bone-esp32-2.jpg"
date: 2023-09-07T16:27:22+02:00
lastmod: 2025-01-09T12:00:00+02:00
draft: false
weight: 50
categories: ['Smart Home']
tags: ['BoneIO', 'sterownik', 'polska elektronika', 'DIY']
contributors: ['Paweł Żentała']
pinned: false
homepage: false
seo:
  title: "Moja historia z BoneIO - wady i zalety polskiego sterownika Smart Home" # custom title (optional)
  description: "Szczera recenzja BoneIO po 3 latach użytkowania. Problemy które napotkałem, lokalne wsparcie, polska społeczność i dlaczego planuję test chińskiej alternatywy." # custom description (recommended)
  canonical: "" # custom canonical URL (optional)
  noindex: false # false (default) or true
---

## Jak dowiedziałem się o BoneIO?

Zobaczyłem [film na YouTube, w którym twórca opowiadał, o tym jak zbudował swoją instalację Smart Home](https://www.youtube.com/watch?v=gt_hVfifvMU) i że stworzył BoneIO, z braku otwartej na modyfikacje, otwarto-źródłowej alternatywy.

W 2022 roku alternatywy były tylko:
- Drogie "markowe" systemy (5-7k zł) - zamknięto-źródłowo rozwiązania
- Tanie chińskie sterowniki o nieznanej jakości, bez znanych mi przykładów wdrożeń
- nowy, otwarto-źródłowy, polski [BoneIO BBB](https://www.youtube.com/watch?v=_EIppBDZWvk&list=PLjW3u5l4eAd2qtv4A4kIWntlwjxupNBip)

BoneIO było dla mnie - jako programisty - optymalnym wyborem: z polska społecznością, open source, w rozsądnej cenie.

## Dlaczego wybrałem BoneIO?

Główny powód? **To polskie rozwiązanie z lokalnym wsparciem.**

Kiedy później popełniłem błąd z podłączeniem zasilania i uszkodziłem elektronikę, mogłem odesłać sterownik do twórcy w Polsce, który mi to naprawił. To była ogromna zaleta - mieć kogoś "na miejscu", kto się zna na rzeczy i może pomóc.

Kolejną dużą zaletą była **polska społeczność**, która intensywnie dyskutowała o tym jak buduje swoje rozdzielnice i systemy Smart Home. Byłem w stanie się od nich dużo nauczyć - doradzali jakie części wybrać, co jest dostępne w polskich sklepach i hurtowniach. Tak naprawdę nie kupiłem tylko sterownika, ale też wsparcie społeczności, która pomogła mi z całą instalacją.

## Ile to kosztowało?

- 2000 zł za BoneIO (zamówione u Kamila)
- BeagleBone Black 2x po 300 zł (pierwsze spaliłem, zapasowe się przydało!)
- Zasilacz około 100 zł
- naprawa spalonego BoneIO 300zł

**Razem: 2400 zł** + 600zł zł naprawa

## Moje problemy z BoneIO

### Problem 0: Produkt w fazie rozwoju
BoneIO to produkt który ciągle się rozwija, nie jest jeszcze w pełni "dojrzały". Myślę że za jakiś czas będzie stabilnym rozwiązaniem, obecnie nie jest do końca stabilny - szczególnie pod kątem dokumentacji. Zespół naprawia problemy, ale problemy się pojawiają. **To póki co rozwiązanie raczej dla ludzi, którzy wiedzą co robią.**

### Problem 1: Brak oznaczenia wyjść
Urządzenie które dostałem **nie miało naklejek z numerami wyjść**. Różne wersje BoneIO mają różne oznaczenia portów, a ja nie sprawdziłem dokładnie w dokumentacji. Rezultat? Podłączyłem źle zasilanie i uszkodziłem sterownik oraz BBB.

**Kiedy odesłałem go do naprawy, dostałem z powrotem z naklejkami** - szkoda że od razu nie było naklejek, ale to właśnie rzecz z produktami rozwojowymi w fazie developmentu.

### Problem 2: Konfiguracja numerów portów
Po naprawie coś było pomieszane z konfiguracją. Numery portów w konfiguracji nie odpowiadały numerom na naklejkach. Musiałem testować który numer w konfigu to który fizyczny output. **Mnóstwo niepotrzebnej, dodatkowej pracy** - ale lepiej dostać naprawione urządzenie z dodatkową pracą niż śmieć wyrzucić do kosza i kupować nowe.

### Problem 3: Developer/Installer Experience
Developer experience w BoneIO pozostawia wiele do życzenia. Słabość dokumentacji polega właśnie np. na braku naklejek lub różnicach w numerach portów w konfigu. Jest dużo wersji urządzenia, firmware itd. i czasami to się miesza - firmware, urządzenie, dokumentacja, naklejki, oznaczenia.

Ale pamiętajmy - dobre DX i dokumentacja kosztują, a to budżetowe rozwiązanie.

## Alternatywy na rynku

### BoneIO na ESP32
Z czasem BoneIO wypuściło wersję na ESP32, która jest tańsza - ma nieco mniej przekaźników ale nie ma to znaczenia dla większości instalacji. Wychodzi dużo taniej per przekaźnik.

### Inne polskie rozwiązania
Widziałem że są inne osoby/grupy które budują sterowniki na ESP32, ale nie śledziłem tego dokładnie.

### Chińska alternatywa - planuję test
Zdecydowałem się kupić bardzo budżetowe rozwiązanie **KC868-A16S** (16-kanałowy ESP32) za około 500-600 zł, aby przetestować je u brata. To około 1/3 ceny BoneIO.

Nie wiem jak to możliwe, że Chińczycy produkują tak tanio. Zakładam że są oszczędności na przekaźnikach i kto wie na czym jeszcze. Developer experience zakładam że może być jeszcze gorszy niż w BoneIO, ale nie wiem. **Test przeprowadzę dopiero w 2026 roku** - wtedy napiszę czy eksperyment się udał.

## Co planuję u brata?

Zgodnie z moją filozofią że [struktura instalacji jest ważniejsza niż sterownik](/tutorials/instalacja-wazniejsza-niz-sterownik/), u brata planuję:
- Zaprojektować instalację tak, aby dało się wymienić sterownik
- Zostawić zapas kabli do świateł - gdyby w innym sterowniku były gdzieś indziej wyjścia, aby dało się łatwo podłączyć przez przedłużacze
- Przygotować się na to, że w razie potrzeby podmienię chiński na BoneIO ESP32

## Czy wybrałbym dziś BoneIO?

Szczerze? Nie wiem.

**Plusy BoneIO:**
- Lokalne wsparcie (bezcenne gdy coś się zepsuje)
- Polska społeczność która pomaga z całą instalacją
- Porady o częściach dostępnych w polskich sklepach
- Open source
- Stabilność działania (poza moimi początkowymi problemami)

**Minusy:**
- Developer/installer experience do poprawy
- Produkt wciąż w rozwoju

- Cena (około 2-3x tańsze niż "brandowe" europejskie sterowniki)
- Cena (około 3x droższe niż chińskie)


## Komu polecam BoneIO?

Jeśli jesteś polskim programistą jak ja, to polecam spróbować BoneIO. Zakładam że wiele problemów "wieku młodzieńczego" zostało naprawionych, jako że chłopaki pracują nad nim intensywnie cały czas. Do tego jest polskie wsparcie i społeczność.

## Podsumowanie

Nie ma idealnych sterowników Smart Home. BoneIO to ekonomiczna półka która intensywnie się rozwija - prawdopodobnie najlepszy wybór cena/jakość, a przynajmniej bezpieczny wybór cena/jakość.

**Najważniejsze to dobrze zaprojektować instalację** - czyli tak aby sterownik dało się wymienić łatwo. O czym piszę w poradniku [Struktura instalacji ważniejsza niż sterownik](/tutorials/instalacja-wazniejsza-niz-sterownik/).

**Update 2025:** Planuję test chińskiej alternatywy w 2026. Napiszę jak wypadnie porównanie!



To ekonomiczna półka cenowa. Profesjonalne sterowniki marek premium kosztują 5-7k zł, a ściemniacze dodatkowe kilka tysięcy. BoneIO oferuje też [8-kanałowy dimmer LED za 450 zł](https://boneio.eu/pl) (2x RGBW lub 8x biały). Więc BoneIO wypada o 1/2 do 2/3 taniej niż premium.

---

*Więcej o tym dlaczego struktura instalacji jest ważniejsza niż wybór sterownika przeczytasz w moim [poradniku o projektowaniu instalacji Smart Home](/tutorials/instalacja-wazniejsza-niz-sterownik/).*
