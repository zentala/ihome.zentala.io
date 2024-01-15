---
title: "random notes"
description: "E.ON (STOEN operator) Warszawa"
summary: "Zwiększenie mocy i fazowosci, przebudowa instalacji pod wspolczene potrzeby. Zuzywamy coraz wicej energii elektrycznej. Linia zasilająca do mieszkania z rynku wtórnego może nie zapewnić Ci dość mocy jeśli zamierzasz przejść na indukcję czy używać klimatyzacji. Dowiedz się kiedy i jak wymienić ją aby uniknąć przykrych niespodzianek w przyszłości."
date: 2023-09-07T16:27:22+02:00
lastmod: 2023-09-07T16:27:22+02:00
draft: true
weight: 50
categories: []
tags: []
contributors: ['Paweł Żentała']
pinned: false
homepage: false
seo:
  title: "" # custom title (optional)
  description: "" # custom description (recommended)
  canonical: "" # custom canonical URL (optional)
  noindex: false # false (default) or true
---

>> excerpt: My setup of smart home and instructions for you how to start with smart home with this sysyem

# Czego się dowiesz i nauczysz
Jestem programistą z doświadczeniem w IoT.
Kupiem mieszkanie 50m2, z dwoma pokojami i kuchnia, wybudowane w 1955 roku.
Musialem je wyremontowac, wiec przy okazji zdecydowalem uczynic sie je z smart (domem) z Bone.io.

Czym jest Bone.io?
- w pelni otwarte oprogramoanie oraz hardware rdzenia systemu smart home
- stworzone w oparciu o BeagleBone Black (SBC) i customowe PCB z elementami wykonywalnymi (przekazniki)
- opracowane przez Maciej Krasuki, i rozwijane przez spoeczność programistów i elektronikow, w duzej mierze Kamila Bozyka, ktory bardzo ciezko pracuje nad kolejnymi wersjami elektroniki
- w ciaglym rozwoju - niektóre swietne funkcje powinny być gotowe wkrótce

Dlaczego wiec Bone.io?
* open-source, a ja chcę eksperymentowac z IoT, jest duzo do wymyslenia, zamkniete systemy nie pozwalaja na to
* cost-effective - jest po prostu tanie w porowaniu z innymi rozwiazaniami, mnie kosztowalo 2000 zl za Bone.io (zamowione u Kamila) + nowe BBB + zasilacz
* latwe, opiera sie na naprawde prostych pryncypiach, zarowno hardwarowo jak i stwarowo nie jest zbyt zlozone
* spolecznosc - pomagala, dawala rady, dyskutowala, tworzyla.

W tym artykile podzilee sie z Tobą :
* co mozesz zrobic z Bone.io - jakie sa jego mozliwosci, co mozna do niego podlaczyc i jak go uzyc
* moja architektura smart home, i podejscia do architektury
* co musisz rozwazyc planujac smart home
* z jakimi wyzwaniami sie spotkalem i jak do nich mozna podejsc
* czego nauczylem sie podczas wdraznia swojego systemu
* czego sie nauczyc z elektryki, elektroniki i protokolow komunikacyjnych

Mozesz uznac ten art za za tutorial jak zbudowac smart home w mieszkaniu na Bone.io w oparciu o realny przyklad. Staram się w nim poruszyć, zaznaczyć wszystkie istotne aspekty budowy prostego inteligentnego domu.

Z mojej strony ten artykul to forma podziekowania dla tworcow i spolecznosci Bone.io (szczegolnie dla Macieja i Kamila). Staralem sie nim uzupelnic luke w edukacji o budowie smart-home, uporzadkowac wiedze ktorej nie ma w oficjalnej dokumentajci sytysemu, a która jest przydatna aby praktycznie wdrozyc Bone.io w swoim domu czy mieszkaniu.

Mam nadzieje, ze zmotywuje Cie do samodzielnych eksperymementow, i przyda Ci sie ta wiedza gdy bedziesz planowal swoje inteligente meieszkanie.

# Jak opracowac plan smart home i jak skorzystac z tego artykulu?

1) Zapisz sobie ten artykul w zakladkach - bedziesz do niego wracal.
2) Zrob folder w zakladkach zweiazany ze smart home, bedziesz tam trzymal przydatne linki.
3) Skopiuj sobie baze z AirTable i wypelnij swoimi danymi, bedzie Ci potrzebna do zrobienia list zakupowych czy wycen

Stworzylem baze na AirTable w której planuje swoją instalację:
https://airtable.com/shrxwNUVnFUJoy9Jk
Inspirowaem się instrukcjami Maćka:
https://www.youtube.com/watch?v=6winSE5_7IE
...ale uznalem ze airtable bedzie nieco lepsze do uporzadkowania tego rozaju inforamcji.
Skopij sobie te moja table, i wypelnij ja swoimi danymi

## Jak pracowac z ta tabela?

{{moge tu omowic zakladki tej bazy}}

### Features
po zrobieniu listy punktow i przylaczy mialem poczucie ze nie wiem czy sa mi na prawde potrzebne,
ani czy nie przeszadzam oraz ze za to innych za malo i ze cos jeszcze jest potrzebne na przyszlosc
dlateteo w pewnym moemncie porzucilem spusywanie piunktow i dodalem zakladke Featuees i spisalem oczekiwane funckjonalnosci
pomoze mi to podejsc do mieszkania w sposob uwzgledniajacy przyszle wdrozenia ktore chce miec




# Czym jest Bone.io i czy moge je czyms zastpiac?

# Possibilites

## Smart Home
https://budujemydom.pl/instalacje/instalacje-elektryczne/a/90966-sposoby-sterowania-oswietleniem-w-smart-domu
*
* Sensory i aktory

## Przeglad sterownikow na rynku
bazujjace na esp32 wparcie esphome daje więcej możliwości
do tego jest masa innych opcji w podobnych cenach

1. master din od SmartBob
jest aktualnie dla mnie numer jeden pod kątem cena/możliwości
https://forum.supla.org/viewtopic.php?t=10279
master din jest bliski ideau. brakuje mu ethernetu i dopieszczenie kwesti wizualnej obudowy .
aktualnie na nim mam oparty ostateczny setup. no i cena jest dużo lepsza niż kincony

2. masa sterowników od kincony
wersje od 4-128 output
https://www.kincony.com/product/esp32-home-automation

Kincony KC868-H32B.... Już 3ci będę montowa w swoim domu 🙂 Narazie dziaa świetnie

Ja u siebie mam zrobiona automatyke na Mega2560 z podstawka od EasySwitch (Ethernet shield osobno) bo jak robilem automatyke ponad 2 lata temu to boneIO jeszcze nie bylo a i EasySwitch mial podstawki bez ethernetu...
36 wejsc + 16 przekaznikow.
Komunikacja tylko po MQTT.
Ogolnie wszystko sprawuje sie ok, tylko musialem zasilic Arduino i przekazniki zewnetrznym zasilaczem bo tak to pradowo nie wyrabialo.


## Bone.io
> Start with reading Bone.io docs.

czym ja chce sterowac i jakie sa mozliwosci sterownia

## Analog Inputs
* high/low signal; zwarcie; np dzwonek ale tez
* one wire senosrs eg. temperature, movement sensor

### button, np. przycisk dzwonkowy
kazdy przucisk chwilowy, tak zwany button mozna podlaczyc pod wejscie analogowe
button daje nam infomacje jaka chcemy - stan niski(rozlaczony) albo wysoki (zwarty, wcisniety)
w ten sposob mozemy np przyciskami dzwonowymi sterowac swiatlem (z tym ze wtedy to klik wlacza swiatlo, a nie przelaczenie wlacznika bo nie da sie go na stale przelaczyc)
mozna obsludzic 1-klik, 2-klik i np long-press i dac na to rozne akcje
pobaw sie z buttonem po prostu: dac jakis link do filemu o buttonach

### czujnik ruchu
najwazniszy ze wszystkich czzujnikow
wchodzisz do domu z sitami zakupow, w korutarzu swiatlo wlaczy sie same, idziesz do kuchni - to samo
wychodziz z lazienki, wylacza sie same, nie myslisz o tym, a wiatrak wylacza sie pare minut po

wiekszosc z nich moze dawac stan wysoki albo niski, czyli "w przeciaug ostanich X sekund w zasiegu czujnika wydarzyl sie ruch" albo nie. proste.

### kontaktron
wyobraz sobie nastepujacy case.
idziesz do kibelka i siadasz na tronie
czujnik wykryl ruch ale zamyslles sie i swiatlo gasnie, bo przestales sie ruszac na dluzsza chwile
jak temu zapobiec?
mamy w drzwiach kontaktron, czunik otwarcia.
i dajemy nastepujaca regule
jesli po otwarciu i zamknieciu drzwi w lazience zostanie w niej wykryty ruch to znaczy ze ktos jest w srodku i do nastpenego otwarcia nie gasimy swiatla! proste.

ja zamierzam zamontowac kontaktony do wszyskich drzwi bez wyjatku oraz do wszystkich okien bez wyjatku

kontraktony sa tanie jak barszcz, dostepne w kolorze cznym i bialym i potrze im tylko 2 zyl
daja stan "zamkniety" albo "otwarty" - wysoki albo niski
prosty analowgowy sensor

````
Chyba nie twierdzicie, że istotą stosowania tych czujników jest reakcja jedynie na przypadek, gdy przymkniemy skrzydo nie przekręcając klamki i ulegnie ono otwarciu przez wamywacza, który akurat będzie chcia to wykorzystać do wejścia bez niszczenia szyby?

Myślę, że jedyny większy sens ich stosowania byby tylko we wspópracy z innym czujnikiem zaryglowania zamka, żeby wykrywać przypadki zostawienia któregoś niezamkniętego okna, gdy opuszczamy budynek i uzbrajamy alarm. To mogoby nas ustrzec przed uchyleniem okna przez wiatr, zalaniem przez nacinający deszcz czy wywoaniem faszywego alarmu przez dostające się wtedy do pomieszczenia zwierzęta.
Oprócz tego możnaby za pomocą takiego czujnika automatycznie wyączać tymczasowo ogrzewanie w pomieszczeniu, gdy otwieramy okno by je wywietrzyć.
```

#### instalacka
https://forum.muratordom.pl/showthread.php?368362-ALARM-Monta%C5%BC-kontaktronu-w-zamontowanym-oknie-drzwiach
https://www.elektroda.pl/rtvforum/topic2942435.html#14200560 - dobry topic

### wylacznik krancowy

### czujnik zalania
montuje sie przy plytkach, wykrywa zwarcie spowodowane przeplywem pradu miedzy elektrodami, zwartymi woda znajdaujaca sie na podlodze
dajesz na wejscie max 24v i jesli na wyjsciu masz 0 to nie ma wody na podlodze, a jak masz 24 to znaczy ze prad przeplynal przez wode, zalalo Ci kuchnie czy lazienke

## Relays
zazwyczaj podlaczamy urzadzenia na 240v ale mozemuy tez stwrowac urzadzeniami na nizsze napiecia, co podajmy to wyjdzie
* zarowki 240v
* wiatrak w lazience, dowolny silnik krecoy sie w jedna stonne
* dzwonek do drzwi; u mnie na szyne DIN - wejscie jest na button dzwonowy podpinay do Bone, a wyjscie z relay, w ten sposob bone wie ze ktos dzwoni, moge np zrobic regule ze od 22:00 do 7:00 nad rame dzwonek nie dziala
* niektore gniazdka jesli chce nimi sterowac z jakiegos powodu

I could connect:
 * alartm sound and light too

## 2 directionsal Motors (2x relatys)
Bone.io community is working on driving motors eg roler blinder motors.
* rolety
* zaslony
* bramy
* chowany projektor i ekran projecyjny
cokolwiek co moze byc sterowane w 2 strony, w 2 kierunkach

## LEDs
* LED baord, dowaolna ilosc kanalow

### Co musisz wiedziec o tasmach led?
* sa kanaly, kazyd kolor to kanal
* rgb/rgbw/rozne oddcienie W
* masz X kanalow, czasmei tasma uzywa 1 a czasami wiecej, dobirze takie tasmy jakie uwazasz ze Ci potrzeba liczac kanaly

## RS485
Read: https://ntronic.pl/rs-485/
* licznik pradu?

## Ethernethet
bone jest urzadzeniem sieciowym i moze wspolpracowc ze wszystkim podpietym do sieci po eth lub po wifi
kamery IP, czujnik bezprzeowodwe

## other interfaces
masz port USB, mozesz podlaczyc urzadzenie USB albo nawet modem <produkul co korzysta Ivan> i laczyc sie z nimi bezprzewodowo chociaz jest to dosc egzotyczne rozwiazanie, bo po to Ci bone.io aby zrobic all przewodowo i miec mniej awaryjna potencjalnie siec

# planning cable installation

## architektura w gwiazde:
  * latwosc debugowania, latwosc konfigracji i przebudowywania
  * achiektura rozproszona, wielu gwiazd w wiekszym budynku - uwazam to za najrozsdniesze rozwiazanie
  * https://budujemydom.pl/instalacje/instalacje-elektryczne/a/21467-bezpuszkowa-instalacja-elektryczna-to-podstawa
  * https://budujemydom.pl/instalacje/instalacje-elektryczne/a/21485-jak-nalezy-poprowadzic-bezpuszkowa-instalacje-elektryczna
  * przewody sa wzgledni tanie

ciekway komentarz (nadaje sie do wiekszych domow chociaz i ja rozwazam aby zrobic troche dodatowa mala giwazdke):
```
Polecam cakiem inny system, sprawdzony od 4 lat, tani, zapewniający sterowanie jasnością i atwą rozbudowę. Zamiast gwiazda, która ma więcej wad niż zalet polecam system maych rozdzielnic średnio na 3 pomieszczenia i jedna gówna większa. W ten sposób wszelkie przewody prądowe i większość sygnaowych jest możliwie krótka, a magistrale komunikacyjne przechodząc przez te rozdzielnice zapewniają sterowanie.

W temacie świata moim zdaniem najlepiej sterować DMX pomiędzy rozdzielnicami. HA może po art-net sterować bramką ethernet/dmx znajdującą się w gównej rozdzielnicy. W celu zmniejszenia prądu paski led na 24v, jeden zasilacz gdzieś w centrum i tylko solidniejsze przewody od zasilacza do mniejszych rozdzielnic w których znajdują się drivery led dmx zależnie od potrzeb. Mam 30 kanaowe drivery po 2A na kana (50W na kana w ledach to bardzo dużo świata) Dodatkowo drivery staoprądowe 700mA do power led i kilka obwodów jest podączone przez wzmacniacze prądu do 5A. Przewody driver-pasek led 2.5mm2, ale spokojnie mogą być 1.5 bo odlegości nie są duże, max kilkanaście metrów. Teraz ciekawostka. Praktyka pokazaa, że dobre ledy samsung na paskach dugości caych pomieszczeń plus kinkiety przerobione na paski itd. są tak jasne przy 24v, że po czasie napięcie na zasilaczu centralnym zostao zmniejszone z 24v na 20v dając dokadniejszą regulację jasności po dmx, a max jasność jest wystarczająca, natomiast w pwm driverów max prąd jest kilkakrotnie mniejszy. (Led ma bardzo nieliniową charakterystyke u/i) Instalacja ma ponad 120 kanaów wliczając dodatkową masę rgb które są realnie nieużytkiem. W praktyce nigdy wszystkie świata nie będą razem na 100% jasności więc zasilacz 600W jest cakiem wystarczający.
```

podczas pracy nad projektem mieszkania wyszlo mi okolo 100 punktow w 47m2 mieszkaniu!
w zwiazku z tym zaczalem sie zastanawiac jak zrobic to taniej,
bo opunkt kosztuje 150zl, a to daje 15 000 zl za samo 100 punktow
dlatego zadecydowalem aby co mozna zrobic w suficie podwieszanym i  trasie kablowej

ale trasa nie powoduje ze jest mniej kabli
wiec zastanawiam sie nad architektura w gwiazde
z tego co rozmawialem z wykonawca wszystkie beziecnzieki by dal w glownej rozdzielnicy
natomiast takie rzczy jak sciemniacze swiatla DMX czy inputy do pryzciskow jst moga byc lokalnie, w mikro rozdzielnicach
wiec w kuchni w pawlaczu luba na korutarzu nad sufitem podwieszanm dam sterownik DMX i jakies Bone.io/MasterDIN/KinCony


## dobor kabli
* przekroje kabli do jakich punktow jakie
  * elekstyczne
  * komunikacyjne i do zasilania maluych rzeczy - skretka
  * siec, internt, upt6


# switchboard / Rozdzielnica.

> Wyzwanie: nie ma rodzielnic dedykowanych do smart home
w ogogole jest bueda jesli chodzi o aparature modulowa do smart home

## Mozliwe elementy rodzielnicy
* klasyka czyli szyny DIN i elektryczna
* rozdzial skretek i kabli komikacyjnych - LSA
* rodzielnica mulimedialna - rozdzielic internet
* elementy szafy rack - ethenet, servery, etc.
* system alarmowy
* smart home


## Czesto uzywane rozdzielnice

### Co uzywaja chlopaki ktorzy zrobili insatacje z Bone.io?

### Moj pomysl na rodzielnica bez obudowy we wnece sciennej
Pomys na rozdzielnicę bez obudowy:
* uchwyt szyny DIN
  * seria z ergom: https://www.ergom.com/uchwyt-szyn-tse-typ-um-01.html
  * 20mm wysokości; 12szt 46zl: https://allegro.pl/oferta/uchwyt-szyny-tse-um-01-20-r34rr-05030100103-11917053927
  * 25mm wysokości; 12szt za 77zl: https://allegro.pl/oferta/uchwyt-szyny-tse-um-01-25-r34rr-05030100113-12szt-11916939536
  * 50mm wysokosci; 12szt za 117zl: https://allegro.pl/oferta/uchwyt-szyny-tse-um-01-50-r34rr-05030100143-11916954663
  * 70mm wysokości; 12szt za 110z: https://allegro.pl/oferta/uchwyt-szyny-tse-um-01-70-r34rr-05030100153-11917053940
  * 90mm wysokości; 12szt za 125zl: https://allegro.pl/oferta/uchwyt-szyny-tse-um-01-90-r34rr-05030100163-12szt-11916939522
  * ukośny, 12szt za 45z: https://allegro.pl/oferta/uchwyt-szyny-tse-um-02-r34rr-05030100203-12szt-11917053917
  * model 3d uchwytu: https://www.ergom.com/tse-rail-holder-um-01-type-um-01-20-12-pcs.html - wynika z niego ze otwor ma 7mm srednicy
* 4x szyna DIN perforowana
  * 0,5mb za 5,99zl/szt: https://allegro.pl/oferta/szyna-montazowa-th-35-din-listwa-perforowana-0-5m-10755656340
* przewody puszczę w kana grzebieniowy:
  * 40x40; 9zl /mb: https://www.speckable.pl/pl/product/10568,kanal-grzebieniowy-szary-40x40
* uchwyty DIN mocowane do (jeszcze robie research):
  * ściany kokam rozporowymi
  * pyty montazowej (z innej rodzielnicy)
  * [plyty stalowej perforowanej na zamowienie](https://www.mevaco.pl/503227.html), cena okolo 1200 zl za plyte 550x1000mm)
  * plyty z bakielitu (inne nazwy: Tekstolit, Novotex, Rezoteks, Turbax) np. [1x1m o grubości 6mm](https://allegro.pl/oferta/plyta-tekstolitowa-tcf-rezotex-6mm-novotex-turbax-7473438332) za 459,90z
  * [pyty szklano-epoksydowej TSE (EPGC)](https://www.izoerg.com.pl/do-transformatorow/laminaty-techniczne-plyty/plyty-szklano-epoksydowe-tse.html)

* skretka UTP5 z elementow nisko-napieciowych rozbita na zlaczkach LSA jak Maciej zrboil u siebie

* natomiast wnęka zabezpieczona dzwiczkami rewizyjnymi na wymiar:
  * https://www.mikavent.pl/pl/p/Drzwiczki-rewizyjne-metalowe-na-wymiar/3104
  * albo te wyglądają świetnie: https://www.luxmetal.pl/drzwiczki-rewizyjne
  * ew dzwiczki z plexy lub szkla dymionego, aby byo widać "mózg" mieszkania za szybą.

Projektuję mieszkanie nieco w stylu industrialnym, więc będzie pasować.
Mógbym zbić te cegę i zrobić tę instalacje bezpośrednio na cegle.
Zza czarnej dymionej plexy byoby widać rozdzielnicę z Bone.io na ścianie z czerwonej cegy.

## czego powininees nauczyc sie elektryce aby zaplanowac rozdzielnice i instalacje
### podstawy elektyrki, prad, napiecie, natezenie
Napiecie

Za napiecie bezpiecne uwaza sie napiecie do 24V.

### uklady sieci
Uklad sieci to wazna sprawa. Od niego zalezy sensownosc uzywania pewnych zabezpiecznen oraz sposob podlaczenia przwdowod ochronnych.

Zadanie: dowiedz się jaki masz uklad sieci. Z jedenj strony przesledz podlaczenie przewodow, z 2giej sprawdz w umowie (jakiej) i/lub zapytaj operatora.

Poczytaj:
* https://bezel.com.pl/2018/08/01/uklady-sieci/

Dowiedzialem sie od Stoen ze u mnie jest TN-C (punkt 2.2 z powyzszego artyklulu).

#### Jak sie tego dowiedzialem?
Wystosowalem maila do operatora:

```
x
```

i dostalem odpowiedz
```
X
```

#### Co w zrobie w zwiazku z moim TN-C?

Po pierwsze zrobie w rodzielnicy rodzial PEN na PE i N (bez dodatkowego uziemienia bo nie mam gdzie) zmieniajac uklad sieci z TN-C (2.2) na TN-C-S(2.4). Taki rodzial pozwoli mi zastosowac wylaczniki roznicowo pradowe.

```
nowych modernizowanych sieciach konieczne jest stosowanie
ukadu TN-S lub TN-C-S. Związane jest to z normą dotyczącą bezpieczeństwa porażeniowego. W tych ukadach przewód ochronno-neutralny PEN zosta rozdzielony na przewód ochronny PE
i neutralny N.
Eliminuje to takie zjawiska jak:
- pojawienie się napięcia fazowego na obudowach odbiorników,
- pojawienie się na przewodzie PEN napięcia niekorzystnego dla użytkowanych odbiorników, wywoanego przepywem przez ten przewód prądu wyrównawczego, spowodowanego
zaistnieniem asymetrii prądowej w instalacji.
```
Zrodlo: https://laczynasnapiecie.pl/pytanie/czym-sie-rozni-uklad-sieciowy-tnc-od-tns-czy-ma-to-jakies-znaczenie-w-domowej-instalacji

Uklad TN-C jest przestarzaly i zapewnia slaba ochrone przeciw porazaeniowa. Prawde mowiac to ja nie do konca rozumiem jak rodzial PEN (TN-C-S) pomgaga zwiekszyc bezpiecznestwo (po za mozliwosc uzycia RCD), no ale wszedzie spotaklem sie z inforamacja ze wspolczesnie sie je rozdziela wiec robie tak. Jednoczesnie lobbuje we wspolnocie aby przed remontem klatki puscic nowa instalacje elektryczna, z grubszumi przewodami, 3 fazowa i z osobnym uziomem (uklad TN-S). Zamierzam uzyc argymentow o zwiekszonym zapotrzebowania na prad elektryczny (kuchnie idukcyjne, kilimatyzatory) oraz straszyc kuciem swiezo wyremontowanej klatki w przypadku gdyby ktos popalil kable. Zobaczymy czy pomoze :)

### fazy

Zadanie: powinienes wiedziec czy masz instalacje 1 czy 3 fazowa. Oraz ile A przylacze. (jak to sie dokladnie nazywa?)

### definicja kabel vs przewod

```
Pojedynczy, przewodzący prąd elektryczny drut, linka albo paskownik szyny prądowej to elementy przewodu nazywane żyami. Przewód zwiera zawsze tylko jedną żyę, która może być zaizolowana lub nie. Innymi sowy, przewód to prosty, jednożyowy ącznik elektryczny, który może być, ale nie musi, osonięty zwykle najprostszą możliwą izolacją, której zadaniem jest tylko i wyącznie izolowanie żyy pod względem elektrycznym. Obecnie na izolacje ży w przewodach stosuje się najczęściej różnego rodzaju tworzywa sztuczne takie jak np. PCV.

Z kolei kabel, to, zgodnie z międzynarodową nomenklaturą, wyrób zożony skadający się z jednego lub kilku (bądź kilkunastu) najczęściej osobno izolowanych przewodów umieszczonych we wspólnej powoce lub osonie. Dodatkowo, skadające się na kabel przewody mogą być wspólnie lub pojedynczo ekranowane, a ich izolacja może zawierać również elementy wzmocnienia mechanicznego takie jak, np. oplot czy stalowe linki. Co więcej, w kablu poszczególne żyy mogą być również zatapiane we wspólnej powoce. Innymi sowy, każdy kabel jest zożonym przewodem, natomiast nie każdy przewód jest kablem – waśnie ze względu na swoją najprostszą możliwą budowę.

W tym miejscu warto też zwrócić uwagę na stosowane często w elektroenergetyce niezbyt poprawne rozróżnienie kabli i przewodów. Przyjmuje się tutaj, że kabel jest przewodem do zastosowań zewnętrznych, poza budynkami – na przykad kable ziemne czy napowietrzne – natomiast przewody montowane są wyącznie wewnątrz budynków, bez względu na ich zożoną budowę. W ogólności termin kabel może odnosić się do konstrukcji, a przewód do penionej funkcji.
```
Źródo: https://helukabel.pl/blog/przewod-czy-kabel-oto-jest-pytanie/

Podsumowanie:
* miedzynaorodowo:
  * zyla - drut, linka, plastkownik, przewodzi prad elektryczny
  * przewod - zawiera jeda zyę - na ogó zaizolowaną
  * kabel - skada się z osobno izolowanych przewodow
* w budownictwie czasami przyjmuje sie podzial poprzez zastosowanie:
   * kabel - zewnetrznych
   * przewod - wewnetrnych

## kolory przewodów
Wspócześnie kolory przewodow oznacza się następująco:
![kolory przewodow](https://wroclaw.house/sites/wroclaw.house/files/styles/responsive_image_1200/public/media/image/przewody-elektryczne-kolory.jpg?itok=fy0CFayi)

W instalacjach 1-fazowych, występuje tylko L1 (Line 1) oznaczane jako L (Line), N (neutral) i PE(protective earth).
W instalacjach 3fazowych wysteouje takze L2 i L3. Typowe zastoswanie instalacji 3fazowej w domu to:
* kuchenka indukcyjna
* ladowarka samochodow elektrycznych
* maszyny przemysowe, silniki elektryczne, np krejzega

I podlacza sie je go gniazdka nastepujaco:
![podlaczenie gniazdka](https://wroclaw.house/sites/wroclaw.house/files/styles/responsive_image_1200/public/media/image/jak-podlaczyc-gniazdko-kolory.jpg?itok=ez5lbT5l)

Do poczytania: https://wroclaw.house/instalacje/elektryczne/co-oznaczaja-kolory-przewodow-elektrycznych

Natomiast w instalachach niskonapieciowych stosuje się dodatkowo kolory:
![kolory](http://grylewicz.pl/wp-content/uploads/2014/12/rozpiska_atx.jpg)

Nie jestem pewien ich wszytkich natomiast na pewno:
* czarny - GND, ground, minus
* czerowny - plus, na ogol +5V

https://iautomatyka.pl/barwy-w-automatyce/ - tutaj zas mowia ze czerwony do +24 i +48V

stad ja np przewody z zasilacza 24V oznaczam kablami w kolorze czarnym oraz czerwonym, aby odroznic przewody niskonapieciowe o wysoko napieciowych. jesli jest do wyniesienia jakas lekcja o kolorach kabli dla amatora to uzyj czarno-czerwnoego kolory zlaczek i przewodow dla instalacji niskonapeiciowych, a jak masz rozne napiecia np 12 i 24v to uzyj jeszcze wiecej

### Mam kablel 4 zylowy do podlaczenia zyrandola, jak to podlaczam?
masz prwniee kolry L1, L2, N i PE.
L1 do jednej zarwko, L2 do 2giej
nie musza byc wcale podlczaone do osnych faz, tylko do osobnego stycznika
tu masz to ladnie opiane: https://lumenos.pl/jak-podlaczyc-lampe-w-domu/

### rodzaje kabli omowic

### przekroje przewodow i bezpieczniki
jakie przewody w okole uzywamy w instalacjach domowych?

prosta zasada:
* do gniazdek 16a bezpiecznik i przewod 2.5mm2
* do swiatel przewod 1.5mm2 i bezpiecznik 10A

![przekroje przewodow](https://static01.leroymerlin.pl/files/fs-upload/fckeditor/image/multimedia-storage/85/08/b8311552cf2d2c2376b891f5857f-przekroje_przewodow.jpg)


Zabezpieczniea, definicje:
* bezpiecznik nadprdowy
* wylacznik roznocowo pradowy
* RCBO (Residual current operated Circuit Breaker with Overcurrent protection - Wyączniki różnicowoprądowe z czonem nadprądowym)
* (te od przepiec)
* rozlacznik izolacyjny

#### Jakie uzylem zabezpiecznia w rodzielnicy?
Uzylem uzywanych RCBO Siemensa za srednio okolo 75zl za sztuke z Allegro, na ogol wymontowywane z maszyn przemyslowych. Zalozylem ze RCBO Simensa sa solidne, raczej sie nie zepsuja. Ale nie polecam tego rozwiazania nikomu innemu, bo nie moge wziac za to opowiedzialosci, zrobilem to na wlasne ryzyko. Uzywane RCBO byly tanie, zajmuja malo miejsca i sa wygodne aby podzielic mieszkanie na sekcje, gdzie kazda sekcja ma osobne zabezpiecznie roznicowo prodowe, zabezpieczajace przed porazeniem. Poniewaz duzo pracuje przed komputerami to dla mnie wazne aby jedna awarnia nie wywalila mi calego mieszkania - stad taki podzial.

Mieszkanie podzielilem na sekcj RCBO:
* C16 - gniazdka 16A w pracowni oraz gniazda robocze w rodzielnicy (jakby przyszlo mi do glowy podlaczac ciezsze maszyny)
* B6 - lodowka w kuchni (to nie jest rozwiazanie zgodne ze sztuka - jesli mam gniazdko 16A, a mam to zabepzpiecznie powinno byc 16A; ale jednoczensie lodowka nie pobierze tyle pradu, 6A dla lodowki wystarczy, a ja chce moc ja osobno odlaczac, na wypadek np wyjazdu na urlop oraz aby w przyopadku awarii nie odlaczylo mi lodowki i sie nie rozmrozila, dlatego puscilem do niej osobny przewod 2.5mm2, ale zamiast zabezpiecznia 16A dalem 6A bo takie mialem wolne, pod reka)
* B16 - pozostale gniazdka w kuchni - zmywarka, mikrofalowka, okap, etc.
* B16 - sypialnia
* B16 - pracownia (po za jednym gniazdem przeznaczonym do podlacznia urzedzen ktore moga chwilowo pobierac wiecej pradu)
* B10 - sekcja swiatl pomieszczen o zwiekszonym ryzyku awarii (woda) czyli lazienka i kuchnia
* B10 - sekcja pozostalych swiatel - korytarz i 2 pokoj
* B6 - gniazda w lazience (znow, nie jest to zgodne ze sztuka, mam gniazda 16A, powinno byc zabezpiecznie 16A ale nie planuje nic mocnego podlaczac w lazience a nie chce aby byle zachlapanie wywalilo mi bezpieczniki gdzies indziej, wiec mam osobno).
* X? - infrastruktura sieciowa w rodzielnicy - modem, switch PoE

Czyli mam 8 RCBO za srednio okolo 75zl za sztuke z Allegro, czyli 8*75=600zl
Troche sporo ale uznalem ze warto dla spokoju ducha i bezpieczniesntwa istalacji i nieprzewwanej pracy.

Generalnie poniewaz przekazniki bone.io (w mojej wersji) maja 16a to wszystko co przez nie przepuszczasz powinno byc podlaczone do bezpiecznika B16(A). W ten sposob chronisz tez przekazniki przed uszkodzeniem. Ja do beziecznika C16(A) podlaczylem tylko gniazda, ktore nie sa sterowane przez Bone.io.

Do urzadzen w rodzielnicy, ktore nie uzywaja przewodu PE, takich jak zasilacze impulsowe 24V (jeden do Bone.io, drugi do tasm LED) uzylem po prostu bezpiecznika nadpradowego o charakterystye C2 (Bone.io) i C4 (tasm LED). Zabezoiecznia i charakterysrtyce C sa polecane do zasilaczy impulswoych ktoe przy rozruzchy moga pobierac wiecej pradu. Natomioast maly amperaz dlatego, ze stosuje do tych urzadzen cienkie przewody i nie przewiduje aby pobieraly wiecej. Mam tez 2 osobne zasilacze i 2 osobne bezpieczniki, aby wyjezdzajac np na wakcje moc wylaczyc zasilacz do LEDow ale nie wylaczac tego do Bone.io.

Co wiecej, czesc RCBO przyszla ze stycznikami. Stycznuki to 0.5 modulu do ktoego moge podlaczyc Bone.io a te bedzie mi podal stan wysoki lub niski w zaleznosci od tego czy obwod jest otwarty czy zmkniety. To oznacza, ze moge miec prosty monitoring z poziomu Bone.io ktore obwody sa zamkniete, np powiadomienia gdy wyleci wiekszosc bezpiecznikow (po za tymi ktore zasilaja bone.io i infrastrukure sieciowa). Dokupilem styczniki do pozostalych RCBO i bezoeicznika do LED i zamierzam odczytywac stan bezpieczniaka ze wszystkich RCBO i bezpiecznikow, po za tym ktory zasila Bone.io. W ten sposob bede mial monitoring np kiedy "wylecial korek". Bede tez mogl sprawdzic czy wylaczylem prad wyjezdzajac na wakacje.

Instalacja jest tak zaprojektowana aby mogl wyjechac na wakacje zostawiajac wlaczone tykko Bone.io, urzadzenia sieciowe i lodowke.
{rozwazam osobny kabel do serverow, szafy rack}

#### Przegląd aparatury modulowej Siemensa
* lampka kontrolna:
  * [5TE5800](https://www.google.com/search?q=5TE5800) (czerwony)
  * [5TE5801](https://www.google.com/search?q=5TE5801) (zielony, czerwony)
  * [5TE5802](https://www.google.com/search?q=5TE5802) (3x zielony)
  * [5TE5803](https://www.google.com/search?q=5TE5803) (czerwony, zóty, zielony)
  * mozna dokupic do nich pokrywki w kolorach: niebieski, czarny, przezoczysty, czerwony, zielony, zolty, szary
* [przyciski](https://mall.industry.siemens.com/mall/en/WW/Catalog/Products/10006503)
* RCBO
  * seria 5SU1356 (2P):
[B32](https://www.google.com/search?q=5su1356-6kk32)
[B25)](https://www.google.com/search?q=5su1356-6kk25)
[B20](https://www.google.com/search?q=5su1356-6kk20)
[B16](https://www.google.com/search?q=5su1356-6kk16)
[B10](https://www.google.com/search?q=5su1356-6kk10)
[B6](https://www.google.com/search?q=5su1356-6kk6)
  * seria 5SV1316 (1P):
[B6](https://www.google.com/search?q=5SV1316-6KK06)
[B10](https://www.google.com/search?q=5SV1316-6KK10)
[B13](https://www.google.com/search?q=5SV1316-6KK13)
[B16](https://www.google.com/search?q=5SV1316-6KK16)



* zabezpieczenia i elementy rozdzielnicy
  * rozlacznik izolacyjny
  * lampka / kontroler faz
  * ogranicznik przepiec
  * bezpiecznik nadmiarowo-pradowy
  * roznocowopradowy
  * RCBO - kombinowany
  * rodzilecze
    * szyna zbiorcza / laczeniowa / grzebieniow
    * listwa zaciskowa na szyne din
    * blok rozdzielczy
    * zączki ZUG i trzymacz KU
  * szyna DIN TH35

ogolnie

tutaj zebrac linki do Ciekawych YT i artow i dac do przeczytaniaw odpowniedniej kolejniosci




# przeprowadzanie instalacji
## planowanie
* jak zrobic liste punktow, urzadzen, kabli wyliczenie
* porpizycje jakie gniazda i do czego, checkboxy

## obszycie rozdzielnicy w domu
* tak robia elektrycy
* pozwala to wzglednie bezpiecznie ptzetestowac instalacje
* polecam pozniej dac wszustko elektrokiwo do sprawdzenia i ostatecznego montazu

## otworny pod gniazdka i bruzdowanie
* otwory na puski, jak duze, czym zrobic
* alternatywne sposoby na gniazdka -  MainLine
* bruzdy pod przewody i ew ich zabezpiecznie albo pod GK
* gdzie klasc a gdzie nie klasc kabli
* zabezpiecznie puszczek przed dalszymi pracowania
* laczenie kabli

## sufit podwieszany do eksperymentow
w suficie moga znajdowac sie rozne cuda jak np
* custom swiatla
* system naglosnenia strfeowrgo
* czujniki ruchu

aby zostawic sobie otwarta reke w rozwianiu ioT w niektorych miejssach dalem podwieszany, by moc latwo dokladac kolejne przewody

# zakupy

## nardzeia elektryka
lifehack: jak sie na czyms nie znam to wchodze na allegro i kupuje rozwiaznie ktoe jest popualrne i ma dobre komentarze
* zestaw wkretakow izolowanych
* zestaw kombinerek i szczypiec bocznych izolowanych
* próbnik napiecia
* miernik uniwersalny (multimetr)
* automatyczny sciagacz kabli
* zaciskarka koncowek tulejkowych + koncowki na zylke

## czesci instalacji elektrycznej
* taśma izolacyjna i rurki termokurczliwe
* zaczki elektryczne
* opaski kablowe
* koncowki konetkorowe
* ącznik
* przycisk
* gniazdo 2P+Z
* ramka
* źródo świata
* lampa jedno lub 2-sekcyjna

co mozna wyporzyczyc:
* wykrywacz kabli

## jakiej marki kable wybrac?
Polski NKT, Bitner, helukabel, lappkabel, molex, telegartner, telefonika.
Generalnie w zastosowaniach domowych trzymabym się marek europejskich.

### lączenie instalacji cyfrowej za pomocą ączówek LSA 2/10

https://www.youtube.com/watch?v=8W0czsaIQUA

Moja instalacja cyfrowa będzie poprowadzona 8-zylową skrętką UTP-5.
To popularny, ogólnodostępny przewód stosowany w sieciach komputerowych.
Uzycie skrętki daje nam duzą elastyczność na przyszość pozwalając podlaczyć do niej wiele urządzeń:
czujniki ruchu na podczerwień i mikrofalowe, wilgotności i temperatury, styczniki, kontraktony,
...wszelkiego rodzaju urządzenia niskonapięciowe, nie konsumujące duzo mocy (jak światla LED).
Nie bardzo wiem co i po co to mogoby być, ale po skrętce mógbyś takze podlaczyć urządzenia PoE IoT
(np mikrokomputer zasilany po PoE) - więc zostawianie skrętki daje duze mozliwości na przyszość.

W przypadku mojego mieszkania wychodzi okoo 20-30 skrętek na:
czujniki ruchu (PIR i mikrofalowe), kontraktony (czujniki otwarcia),
wilgotności i temperatury, świata oraz najwanzniejsze styczniki, wączniki...

To dość duzo kabli. Jak nimi zarządzać w rodzielnicy?
Do instalacji wysokonapięciowyh (230V) standardowo stosuje się zączki szynowe.
Do instalacji niskonapieciowych (do 24V), za przkadem Macieja, zastosuję ączówki LSA 2/10 - odpowiednik zączek szynowych do ączenia linii telefonicznych w szafach telekomunikacyjnych.

Aby uporządkować nasze przewody niskonapięciowe za pomocą ączówek LSA będziesz potrzebowa gniezdnika na ączówki i ączówek do przewodów telefoniczych.

Gniezdnik do ączówek LSA moze byc zamontowny na ścianie, do pyty montaowej w rodzielnicy oraz w szafie RACK 19".

Oto kilka tanich gniezdiników, jakie znalazem na Allegro:
* najtańszy [naścienny do montażu 10 ączówek LSA](https://allegro.pl/oferta/gniezdnik-nascienny-do-montazu-10-laczowek-lsa-10810999204) za 30z
* na 3/5/10 ączówek firmy Delta Electronics:
[LSA-GN-10/3](https://allegro.pl/produkt/gniezdnik-delta-electronics-lsa-gn-10-3-883596d6-ebff-43af-916a-f359aea1dc91?bi_m=search_suggester) za 9,91z,
[LSA-GN-10/5](https://allegro.pl/produkt/gniezdnik-lsa-gn-10-5-c9b2a8f8-2a7b-4cd9-9998-bdfcb1297477?bi_m=search_suggester) za 15,49z,
[LSA-GN-10/10](https://allegro.pl/produkt/gniezdnik-lsa-gn-10-10-7857dcba-dd2b-490f-ba0a-fbc6a7c3045c?bi_m=search_suggester) za 31,52z.
* do szaf RACK 19"
  * firmy ZPAS:
    * [1U na 6 ączówek / 60 par ży](https://allegro.pl/oferta/panel-19-1u-gniezdnik-do-laczowek-lsa-60-par-zpas-9197105726) za 69,99 z
    * [3U na 15 ączówek / 150 par ży](https://allegro.pl/oferta/panel-telefoniczny-rack-19-150-par-lsa-laczowka-5889906108) za 93z
  * firmy D-LAN:
    * [3U na 15 ączówek / 150 par ży](https://allegro.pl/oferta/uchwyt-lsa-150-par-19-3u-11500449122)
    * [4U na 18 ączówek / 180 par ży](https://allegro.pl/oferta/uchwyt-lsa-180-par-19-4u-11500449721)

Gniezdniki wypeniasz ączówkami LSA 2/10, np:
* najtańsza ączówka LSA typu Krone firmy Neku do 10 par ży:
[rozączna](https://allegro.pl/oferta/neku-laczowka-lsa-10-par-rozlaczna-typu-krone-5147580939) za 7 z lub
[nierozączna](https://allegro.pl/oferta/neku-laczowka-lsa-10-par-nierozlaczna-typu-krone-6784393387?fromVariant=5147580939) za 6,9zl
- wydaje mi się ze wszystko jedno jaką wybierzesz chocia ja wybraem rozączne,
* na Allegro znajdziesz tez innych producentow ale wszystko jest w standardzie LSA więc powinno pasować.

Do to wszystkiego potrzebujesz jakoś wciskać kable do ączówek. Zrobisz to za pomocą wciskacza,
np [wciskacza LSA z sensorem firmy Neku](https://allegro.pl/oferta/neku-wciskacz-lsa-z-sensorem-noz-krone-kronowski-5164776422) za 16,90z
(znajdziesz inne, tańsze ale sensor mnie przekona).


sa patch panele tez uzywaja LSA, wiec mozna skretki sciangac na patch cord w rodzielnicy i od niego przepinac kable do boneIO


z 2giej stroy kabla, np pod sufitem mozesz zostaiwac jakas srketke
ale co jak bedzie za krotka?
są puszki LSA do laczenia kabli  np pod sufittem

https://images.morele.net/i1064/1795241_3_i1064.jpg


## osprzet elektryczny - gniazdka i przyciski
W tej czesci omowimy sobie to co instalujemy na scianie czyli: ramki, gniazdka i przedewszystkim przycsiki elektryczne. Jakie przyciski i jak mozesz podlaczyc do Bone.io - jakie sa dostepne rozwiazania i ile mniej wicej kosztuja. Przeglad technologii i info jak zrobic instalacje.

### Teoria
Intersuje na przycisk montostabilny:
https://www.proxima.pl/blog/roznica-pomiedzy-trybem-monostabilnym-a-bistabilnym/


### Najtaniej: przycisk dzwonowy, zwierny
Mozna uzyc przycisku dzwonkowego (po prostu zamykajacego obwod) aby zasygnaloowac cos do Bone.io, np wlaczenie swiatla.

##### Kontakt-Simon
* Simon basic: https://www.dobregniazdka.pl/category/simon-basic
  * paleta kolorow
  * rj 45 5e i 6e, pojedyczne za okolo 55zl, podwojne za okolo 100zl
  * gniazda glosnikowe za 26-55zl
* np w zestawie Simon 10 (prod. Kontakt-Simon) znajdziemy:
  * [przyciski zwierne](https://www.dobregniazdka.pl/group-product/przyciski-zwierne-swiatlo/dzwonek-simon-10):
    * pojedynczy przycisk za 9,03 z
    * pojdeyncyzy prsyzcisk z podsietleniem za 15,57 z
    * podwojny za 16,67 z
  * [przyciski zaluzjowe](https://www.dobregniazdka.pl/group-product/wylaczniki-zaluzjowe-simon-10) za 17,97 z
  * + ramka oczywiście
* natomiast z Serii 54, mamy:
  * [zaluzjowe](https://www.dobregniazdka.pl/group-product/wylaczniki-zaluzjowe-simon-54),
  * [dzwonek](https://www.dobregniazdka.pl/group-product/przyciski-dzwonek-simon-54-chwilowy),
  * [zwierne bez piktogramu pojedyncze](https://www.dobregniazdka.pl/group-product/przyciski-pojedyncze-zwierne-bez-piktogramow-simon-54) + [klawisze](https://www.dobregniazdka.pl/group-product/klawisze-pojedyncze-do-wylacznkow-simon-54-antybakteryjnych),
  * [podwojne](https://www.dobregniazdka.pl/group-product/przyciski-podwojne-zwierne-bez-piktogramow-simon-54) + [klawisze](https://www.dobregniazdka.pl/group-product/klawisze-podwojne-do-wylacznkow-simon-54-antybakteryjnych),
  * [potrojne](https://www.dobregniazdka.pl/group-product/przyciski-potrojne-zwierne-simon-54) oraz [z podświetleniem](https://www.dobregniazdka.pl/group-product/przyciski-zwierne-potrojne-podswietlane-simon-54) od 40,10z.
  * [poczworne](https://onelectro.pl/lacznik-przycisk-poczworny-elektroniczny-czarny-mat-dew4-01-49-simon-54) od 138z
  * [rozwierne](https://www.dobregniazdka.pl/group-product/przyciski-rozwierne-simon-54) które dziaają odwrotnie - rozwierają obwód przy naciśnieciu klawisza od 21,83z,
  * przy czym prawdopodobnie podświetlenia nie będą dziaay bo przyciski dedykowane są do 250V, być moze da się zmienić źródo świata w przycisku na 24V
  *  + ramka oczywiście
  * ciawostki:
    * [gniazda glosnikowe](https://www.dobregniazdka.pl/group-product/gniazda-glosnikowe-simon-54) od 31,60zl
    * [ladowarka 2x USB A](https://www.dobregniazdka.pl/group-product/gniazda-ladowarka-2xusb-simon-54) od 79,61 z
    * [gniazda światowodowoe i optyczne](https://www.dobregniazdka.pl/group-product/gniazda-swiatlowodowe---optyczne-simon-54) od 25,9zl
    * [Gniazda komp. RJ45 kat.5e + tel. RJ12](https://www.dobregniazdka.pl/group-product/gniazda-komp.-rj45-kat.5e-tel.-rj12-simon-54) od 59,54zl

* seria [54 Touch](https://www.dobregniazdka.pl/category/simon-54-touch)
 * moze ale nie musi byc kompatybilna - sprawdzic
 * wystepuje w kolorze czarnym, biaym i [szarym](https://www.dobregniazdka.pl/product/panel-dotykowy-podwojny-44-simon-54-touch-srebrna-mgla)

* [Simons 82] mamy:
  * [zaluzjowe](https://www.dobregniazdka.pl/group-product/wylaczniki-zaluzjowe-simon-82) od 55,05zl,
  * [jednoprzyciskowe](https://www.dobregniazdka.pl/group-product/przyciski-zwierne-simon-82-detali-nature) od 32,84z
  * [dwuprzyciskowe](https://www.dobregniazdka.pl/group-product/przyciski-zwierne-podwojne-simon-82) od 54,77z,
  * w serii są tez ciekawe dodatki jak:
    * [adowarki 2x USB A](https://www.dobregniazdka.pl/group-product/ladowarka-usb-simon-82) za 128,56z,
    * [gniazda USB A + HDMI](https://www.dobregniazdka.pl/group-product/gniazdo-hdmiusb-simon-82) za 136,60z,
    * a nawet VGA + 3x RCA...
  * + oczywiście ramka
* [Simon 100] dedykowany do smarthome


Wielu innych producentow tez oferuje przyciski zwierne jedno, dwu, a czsem i 3-przyciskowe. Wielu oferuje przyciski zaluzjowe. One wszystkie moga podawac do Bone.io stan niski (rozwarty) albo wysoki (zwarty).

Generalnie: [wbijasz na dobregniazdko.pl i szukasz przyciskow "rozwiernych"](ttps://www.dobregniazdka.pl/search?q=zwierny&filters[c]=0&page=1&order_by=popularity&order=desc) - znajdziesz cos co pasuje Ci do gustu. Oto tania opcja na wlaczniki. Zrob to teraz - przejrzyj jakie sa mozliwosci i wroc z powrotem do artykulu.

##### F&F

Po za oferta firmy Simon warto zapoznac sie z oferta firmy F&F:
* [4 przyciski, z podswietleniem, dotykowy]:
[biay](https://allegro.pl/oferta/f-f-przycisk-szklany-dotykowy-bialy-4-kanalowy-11216253419) za 239 zl
lub [czarny](https://epstryk.pl/product-pol-79018-Przycisk-szklany-czarny-4-kanalowy-przycisk-dotykowy-z-funkcja-zblizeniowa-9-30V-GS4-DC-B-F-F-uniw.html) za 280z
* [w ofercie są takze wersje 8 przyciskowe w obu kolorach](https://www.fif.com.pl/pl/przyciski-szklane/1309-podwojny-przycisk-szklany-dotykowy-44h-poziomy.html)
* wersje z 2ma przyciskami (roletowe) w obu kolorach
* a nawet wersje do montarzu w puszcze potrojnej
* [kliknij tutaj aby zapoznac sie z pelna oferta](https://www.fif.com.pl/pl/66-przyciski-szklane)

##### dLED
Dedykowana 100-230V, ale sprawdzilym czy nie bedzie dzialac na napieciu 24V u nas, bo moze, a przelaczniki (biale, czarne i szary) w miare tanie: https://dled.erli.pl/produkty?categoryId=51  Sa tez gniazda elektryczne. Oficjalna strona: [wylaczniki](https://dled.pl/pl/c/Wylaczniki/131), [gniazda i ramki](https://dled.pl/pl/c/Gniazdka-elektryczne/18). Ale nie idzie wlozyc wlacznikow i gniazek w jedna ramke.

##### (Aliexpress)
* [WallPad](https://www.aliexpress.com/item/4001122560057.html)


#### Jak to dziala? +
Bone.io ma XX wejsc, ktore rozpoznaja stan niski/wysoki. Na jednym wejsciu podlaczasz 24V (zwalidowac), a na 2gim Bone.io i w ten sposob przyciskik daje znac Bone.io, ze jest zwrcie - 24v zostalo podane na wejscie Bone.io. Jesli nie masz zlozonej logiki, nie masz wielu scen to przyciski zwierne sa calkiem dobrym pomysem, bo sa tanie i wygladaja normalnie. Przycisk najlepiej podlaczyc skretka UTP-5 jak wiekszoc cyforwych instlacji w domu. Daje Ci to duza elasycznosc na przyszlosc aby wykorzystac te sama skrentke do podlaczenia innego rodzau przycisku, po przepieciu jej w rozdzielnicy w inne miejsce/ w inny sposob.

####  Podlaczenie przysku zeietnego do Bone.io
Tak jak wszystkie skretki podlaczamy do zlaczki LSA na naszej rodzielnicy, i stamtad dopiero podlaczamy do Bone.io.
[przesumac czesc z wyzej]

#### Kwestie User Experience czyli jak tego uzywac i czy goscie sie polapia.

tag: interior design

1) Czy montujemy laczniki swiatla i gdzie?
montujemy je normalnie, tak jak w zwyklym mieszkaniu. po pierwsze jak wywali sie IoT to zawsze mozna przepiac rozdzielnice na zwykle przekazniki i sterowc swiatlem


Ponadto goscie znaja je i moga sie latwo nauczyc - jedno klikniecie wlaczenie swiata. To dosc intucicyjne.
A po dodatkowe opcje mozna zaprogramowac aby wykrywalo kliknoecie, 2kliknecie i dlugie przytrzymanie na przyklad.
Czyli np jedno klikniecie swiatlo glowne, 2 klikniecia kinkiet.
Dlugie klikniecie swiatlo nastrojowe. I tak w kazdym pomieszczeniu. Jeden przycisk obslugije 3 akcje.

Wada przyciskow dzwonkowych jest taka, ze mozemy chciec duzo akcji, a to moze wyjagac wiele przyciskow i czesto czasami w smathome sie polapac ktorzy przyczisk od czego. Trzeba takze wiedziec co oznacza klikniecie, 2klik czy dlugie przytrzymanie.

##### Podlacznie przyciskow zaluzjowych
Przycisk zaluzjowey moze dzialac jak zwykly zaluzjowy z tym ze zamiast zwierac bezposrednio styki silnika podajew wysoki stane na Bone.io, i wtedy to bone.io zalacza napiecie na styki slnika.

## Przyciski rozwierne

Byc moze zauwazyles tez przycsiki rozwierne. Po co przycisk rozwierny, kiedy go uzywac, jak dziala? Rozwierny domyslnie jest zamkniety, domylnie obwo jest zamkniety, wylaczasz go jedynie kiedy klikasz w przysik.... jednoczesnie kiedy zepsuje sie polaczenie to urzadzenie tez przestanie dzialac. <dopisac>

### A gdyby uzyc czegos spoza sprzetu elektrycznego? - push button za kilka pln

Poniewaz Bone.io rozpozanje stan, to mozemy podac zwarcie, stan ywsoki za pomoca dowolnego przycisku, np przycisku np zwyklego przysisku

Kilka przykladow buttonow w obudowach:
* https://allegro.pl/oferta/przycisk-chwilowy-zwierny-dzwonkowy-2a-250v-metal-11866016200
* https://allegro.pl/oferta/przycisk-chwilowy-zwierny-dzwonkowy-2a-250v-metal-12296830778
* https://allegro.pl/oferta/przycisk-reset-okragly-zwierny-off-on-gq12b-10j-11069526968
* https://allegro.pl/oferta/przycisk-reset-okragly-zwierny-off-on-gq16m-10-7686891822
* https://allegro.pl/oferta/przycisk-reset-okragly-zwierny-hq-off-on-ps28h-8125075999

* z ramka jako wandaloodporne:
* https://allegro.pl/oferta/aco-ins-ob-zewnetrzny-przycisk-zwierny-10744863505
* https://allegro.pl/oferta/ins-ob-60-zewnetrzny-przycisk-zwierny-do-puszki-12087838872


I samych przyciskow:
* https://allegro.pl/oferta/przelcznik-monostabilny-podwojny-8x8mm-5720254487?fromVariant=7402800349
* https://allegro.pl/oferta/tact-switch-10-sztuk-6x6x17mm-7489202701?fromVariant=5720254487

TACT SWITCH, przycisk monostabilny, przycisk reset, zwierny, ącznik, chwilowy - sowa klucze

Mozesz sobir zabuddowac tai przycisk gdzies w meblach czy nawet na scianie z takim samym efektem jak uzywanie zwyklego przycisku z osprzetu elektrucznego.

Wada taich przyciskow2 to ich rozamiar - dodtyamy te oklice reka i latwo ubudzic sciane jak sa male.

Ale czasami ich maly rozmiar to zaleta, gdy chcemy ukryc jakis przycisk, dlatego zaznaczam ich istnienie i daje pod rozwage wykorzystanie w pewnych sytauacjach. Podlaczenie do Bone.io jest tak samo latwe jak sciennego zwiernego.

### Nietypowe przyciski zwierne
w porpzednim rozdzaale omowilismy typowe przyciski zwiernw w typoych zestawach osprzetu elektrycznego, w tym omowimy pozostale jakie znalazlem i uwazam za gdne uwagi:


### Panele szklane IQ system z ikonami na zamowienie
Jest firma IQ system ktora robi takie rzeczy w PL:
* http://dotykowy.eu/szklo.html - przyklady w obrazkach
* http://dotykowy.eu/faq.html
* http://dotykowy.eu/services.html - cennik, instrukcja obsugi i montazu
generalnie: na rok 2022 ceny jednej ramki z 4 przyciskami  (ikonami) zaczynaja sie od 250zl
oferuja przyciski (panele)( z 1-2 gniazdkami (w tym z klamka) ale nic wiecej, zadnych portow USB ani nic takego, zadnych bajerow ;/

Rozwiazanie na pewno jest ciekawe jak ma sie np duzy salnn z duza iloscia roznych scen: komimek, projektor, rozne miejsca do siedzenia i spedzania czasu. Masz szalon z kuchnia do robienia imprezy i wiele scen do niego przygotowych. Wowczas to swietny pomysl. Natomiaost w przeyciwnym wypadku mozesz, ale nie musisz isc w tym kierunku i nie wiem czy warto ze wzgledu na ograniczenia tego co moga zawierac takie plytki. Licze na bardziej rozbudowana oferte w przyszlosci.

### ekrany LCD w formie przycisku
* z Alibaba
  * [MVAVA T3E](https://www.alibaba.com/product-detail/T3E-Wireless-Smart-Home-Control-In-Wall_1600463126980.html) za 580zl
    * zigbee 3.0, bluetooth 4.2 gateway capacybility
    * ethernet: LAN and WiFi(2.4GHz b/g/n, up to 150Mbps)
    * RS485
    * synchronised with Tuya account
    * od frontu: 8,6cm x 8,6cm; glebokosc: 3.6cm (z czego wystaje 1cm)
    * CPU quad core cortex a35 + 2GB RAM + 8GB ROM
    * andoid 8.1
    * 2x relay (up to 200W)
    * build-in speakrt and 2x microphobe
    * ambient light sensor (natezenia swiatla)
  * [LifeSmart Nature Mini LS226 / LS228WH](https://www.alibaba.com/product-detail/Smart-home-wireless-mobile-remote-control_1600189772306.html) za 620zl
    * komunikacja: WiFi 2.4GHz, CoSS (?)
    * Resolution: 480*480P
    * speaker tylko (no mic!)
    * 3x 16A relay
    * od frontu 8,6cm x 8,6cm; glebokosc: 3.6cm (z czego wystaje 1.1ncm)
    * [NatureOS 2.0 video presentation](https://www.youtube.com/watch?v=jrkbYljCE0Q)
    * Linux jakis podobno
    * generalnie jest to rozwiazanie do systemu LifeSmart, brak zigbee i mikrofonu czyjni  je raczej malo elastycznym
    * fajny extra panel na biurko https://www.orbitadigital.com/en/cctv/smart-home/lifesmart/20420-basenaturemini.html

  * LifeSmart Nature Mini S LS248WH - nie da sie go znalexc
    * system andorid
    * IPS resolution 720p
    * plus ma mikrofon
  * [Sonof NSPanel](https://www.alibaba.com/product-detail/SONOFF-NSPanel-Smart-Scene-Wall-Switch_1600407376187.html)
    * za 330zl
    * ZigBee, WiFi IEEE 802.11 b/g/n 2.4GHz, Blue-tooth Standard 4.2 BLE
    * TFT Screen Size 3.5" (Capacitive Touch Panel); Resolution 480*320pixel
    * 2x relay, 300W na jednen
    * wg tej strony nawet taniej; https://hejdom.pl/promocje/promocja/219.html
    * custom firmware:
      * ESPHome: https://hejdom.pl/blog/12-sonoff/662-sonoff-nspanel-test-zmiana-oprogramowania-na-esphome-2-fizyczne-przyciski-i-dotykowy-ekran.html
      * Tasmota: https://hejdom.pl/blog/12-sonoff/702-sonoff-nspanel-lovelance-ui-tasmota.html
    * podsumowanie: tanie i daje mozliwosc customizacji
  * [Tuya T6E](https://www.alibaba.com/product-detail/Tuya-Smart-European-Standard-Multifunction-Electric_1600476984303.html) za 405zl
    * WiFi, Bluetooth, ZigBee
    * 86 * 86 * 36 mm (10.5 wystaje)
    * 4-calowy wyświetlacz HD LCD, IPS,
    * RAM/ROM: 1GB/8GB
    * APP: Tuya Smart / Smart Life
    * PX30 Quad core Cortex-A35
  * [some custom with android 6](https://miro.com/app/board/uXjVOh_Xlmg=/)
  * [YC-SM06E PX30 2GB RAM 4 inch android smart switch for smart home](https://www.alibaba.com/product-detail/Factory-price-YC-SM06E-PX30-2GB_1600342643912.html)
  * [Golden Security GS-T3E za 208zl](https://www.alibaba.com/product-detail/Wireless-smart-switch-with-LCD-touch_1600560151953.html?spm=a2700.details.0.0.377b1df36bPWsH)
    * zigbee
    * 3x relay
    * 480px
    * 16mb + 2mb(?)
    * ma malo pamieci, nie wiadomo co za os
  * [GS-T6E](https://www.alibaba.com/product-detail/4-inch-control-panel-tuya-smart_1600520432682.html?spm=a2700.details.0.0.531548eehcGvhR)
    * za 405zl
    * wifi, zigbee
    * Built-in WIFI module
    * Built-in Ziggble/Bluetooth module (customer's choice of module manufacturer)
    * Supports up to 4 relays to achieve single lamp control
    * Supports 220V strong current and 24V/12V weak current  (tego tez nie widze)
    * Support RS485 and CAN bus and other wired communication (???? nie widze tego)
    * Support OTA remote upgrade
    * Z20 platform supports built-in online voice SDK and dual-mic hardware noise reduction.
    * Support of FlyThing UI makes development more convenient and efficient
    * Support long time uninterrupted standby work, the motherboard does not heat, do not appear black screen of death
    * Built-in DDR plus Flash16M and greatly reduce product cost, experience with Android no difference
    * 3 seconds startup speed, more quickly experience the wisdom scene
    1）Linux version CPU: Cortex-A7 dual-core main frequency 1.2g
    2）DDR: 128 MB built-in
    3）Flash: 16 m
    4) LCD resolution: 480*480
    5) Backlight brightness: 300CD
    6) Touch: capacitive single touch G+F
    7) USB: 1 pcs
    8) 2.4 G WIFI: RTL8188
    9) Power supply: 220 v and 240 v
    * tu jest za 317 tenb sam ale czarny https://www.alibaba.com/product-detail/2022-hot-sale-tuya-smart-zigbee_1600539410323.html
* [GS-T8E-Linux](https://www.alibaba.com/product-detail/2022-newest-linux-smart-home-panel_1600561127110.html?spm=a2700.details.0.0.4cb65a7dqZt1GF)
  * za 317zl
* ORVIBO
  * general:
    * https://www.red-dot.org/project/home-ai-20-49303
    * https://www.orvibo.com/en/index.html
  * [ORVIBO MixPad Mini V30X Black](https://www.alibaba.com/product-detail/ORVIBO-MixPad-Mini-supper-smart-gateway_1600267223082.html?__detailProductImg=https%3A%2F%2Fs.alicdn.com%2F%40sc04%2Fkf%2FH7c8a615772aa44319c632dada618e15bJ.png_220x220.png)
    * 1,010.17zl
    * Main control Quad-core ARM Cortex-A35 architecture processor
    * Storage 2GB RAM+8GB ROM
    * Display 4 inches, 480*480P resolution
    * Speaker AAC 1813 speaker
    * Zigbee networking built-in gateway
    * Number of supported devices 350
    * Power Supply AC110V-230V
    * Built-in switch  2 gang, 200W/gang
    * Support network standards: Wi-Fi, Bluetooth, zigbee3.0
    * Size 86*86*35.8mm
    * Temperature and humidity sensor
    * [opis na stronie produceta](https://www.orvibo.com/en/product/mixpad_mini.html)
  * [ORVIBO Mixpad Genie V51X](https://www.alibaba.com/product-detail/ORVIBO-Mixpad-genie-zigbee-smart-home_1600305593330.html?spm=a2700.details.0.0.781a155aq9DAbO)
    * 700 zl
    * duzo kolorkow
    * 320x240 - niska rodzieczosc ;/
    * Quad-Core Cortex-A7,@1.5GHz
    * [opis na stronie producenta](https://www.orvibo.com/en/product/mixpad_elf.html)
    * https://pl.banggood.com/Orvibo-MixSwitch-Original-MixCtrl-Free-Definition-of-Key-Functions-ZB-Wireless-Remote-Control-by-HomeMate-p-1885608.html
    * 3 configurable buttons

* [Aqara S1](https://pl.aliexpress.com/item/1005004384614273.html)
  * 633zl

# inne ciekawe
Livolo
* lampa podlogowa (oswietlenie nocne)  https://www.alibaba.com/product-detail/Livolo-New-Arrival-EU-Standard-Porch_62413423201.html?spm=a2700.galleryofferlist_catalog.normal_offer.d_title.54dd5a2fUVJijt
* temp control https://www.alibaba.com/product-detail/Livolo-EU-Standard-Temperature-Control-With_62013420060.html?spm=a2700.wholesale.0.0.259f59fbH9G1FP

# remont mieskznaia
* wyzwania zwiazane z aktualizacja instalacji
  * prosty przyklad: https://budujemydom.pl/instalacje/instalacje-elektryczne/a/23991-remont-instalacji-elektrycznej-po-20-latach-uzytkowania
* typ sieci enegetycznej
* ciekie przewody, czesto aluminiowe
* przeniesienie licznika
* brak miejsca na rozdzielnice
* wymiana przewodow, jak

## Add: zasady ukladania przewodow elektrycznych
* pod posadzka - opisac; ze w peszlach, na jakiej min. glebokosci
* w poblizu rur gazowych, instalacji wodnych i kanalizacyjnych
* scianie

### Robienie bruzd
* bruzdownisca, SDS wiertlo bruzdownicze, recznie

### Rozwiecanie otworow pod puszki
* jakie normalnie puszki
* otwnica + mlotowiertarka

### Mocowanie kabli i puszek w scianie
* na gips montazowy chyba


# i need to research


### Add: konsultacje
na pewnym etapie zdecydowalem sie na konsultacje, zatrudnienie kogos aby pomogl mi podjac decyzje projektowe dt rozdzielnicy
gdy bydowalem robota niew eidzielem jak ustawic tak zwana odometrie i zaplacilem polakowi ze szwarcajii na upwork aby mi powiedzial. chcialem zrboic to samo tym razem, tylko tym rezem ptyajac o moje nietypowe problemy. zaczalem od spisania swoje pytan ale takeze oczekiwan, czego oczekije jako wynik naszej pracy. oto one.

1) Gdzie kaść kable do gniazedek. W podlgogach (biorac pod uwage ze wylewam 1cm wylewke samopoziomujaca na jakas posadzke na stropie teriva ktora jest juz spekana, jak na zdjeciach, czy bruzdrowac w tym) i jesli tak to jaki przeod w jakim peszlu i czy to nie za duza dziora? Do pracowni 3 przewody, najwiecej. Czy w ogole moge dawac w peszlach przewody jak mam wylewke 1cm nad to i czy oslabiac posadzke ktroa juz jest bruzdowaniem? Czu nie na robue za duzo bruzd w podzlodze? Czy moze robic wiecej burzd ale w scianach, w tynku cmeentowwo-wapiennym. Czy on mi sie nie rozwali/obsunie? Jak lepiej? Na tynk idzie cienka wartstwa tynku maszynowego do wyrowania sciany. Tutaj chce miec albo plan gdzie mam wybruzdowac przewody albo plan i wycene ile to bedzie kosztowac aby zrobic to za mnie i polozyc w srodinku przewody. Zalaczam liste punktow jakie chce miec w mieszkaniu i ich lokalizacje. Omawiam je na zalaczonym filmie video gdzie w mieszkanii wskazuje co gdzie bedzie.

2) Robie rodzielnice do smart home. Nie mam pytani o smarthom bo to sobie ogarne. Mam pytania o rozdzielnice bo nie ma tkaiej ktora nadaje sie na moje potrzeby smart home jak chce wiec chce zrobic wlasna zgodnie z normami bezpieczenstwa. Oraz jak ogarnac swoj uklad sieci. W rodzielnicy chce miec:

* poki co takze gniazdo kablowki, router kablowki (za kilka lat bedzie swiatlowod),
* zlaczki LSA (30x) do rozbijania skretek do ktorych podlaczam niskonapieciowe urzadzeania i przelaczniki,
* Bone.io (14M?), 7x RCBO+stycznik (2.5M), licznik energii elektrycznej

3) Mam tez pytanie czy przeniscic licznik na zewnatrz, ile to zajmie, jak ogarnac. Podobno mam dobre przewidy 2.5mm2 miedziane na wejsciu w ukladzie tnc (2 kable). A licznik mam na desce. Ktos musi go przeniesc. Pytanie czy na zewnatrz czy do srodka. Mysle ze deycja powinna byc powiazana z rozmiarami elektyrki, szafy i mozliwosciami. Chce poznac cene roznych rozwiazan aby wybrac.

4) Skonsuktuje rozmieszczenia naglownisnia stefowego - jak przygotowac pod nie mieszkanie, kable, glosnikiki, otwory na nie? (bo nie mam kasy poki co),

## gowica termostatyczna
jak podlaczyc przewodowa glowie termostaryczna i jak sie komnikaukja, skad wiedza gdzie start a gdzie stop
https://www.amazon.pl/Watts-22CX230NC2-nastawczy-uruchamianie-elektromagnetyczne/dp/B018W77L3G

tutaj Pan z HejDom! zrobi ciekawy ranking:
https://hejdom.pl/blog/20-testy-porownawcze/627-ranking-smart-glowic-termostatycznych.html?fbclid=IwAR2x1qrhh6nT1uEDltuwR8_TyoZM74hicXhUzv4ZIxFhjsrGS0w2tgmkdXo



# Add: szyna elektryczna
Mozesz byc w sytuacji gdzie nie wiesz ile gniazedk zamiescic albo gdzie, np w kuchni czy za biurkiem.
Z pomoca moze przysc drogie, ale warte odnotowania rozwaiazanie czyli "power track".
Kilka ropzwiazan z AliExpress:
* https://www.aliexpress.com/item/1005002314959552.html
* https://www.aliexpress.com/item/1005003595761540.html
* [szyna](https://www.aliexpress.com/item/1005002559199332.html)
* [gniazdka](https://www.aliexpress.com/item/1005004119629323.html)
* [więcej](https://www.aliexpress.com/store/group/Power-Track-socket/5632356_10000001129066.html)

Oraz pierwozor z Austalii: {dodac}

# Add: zaslony elektryczne
{byc moze z tego wszystkiego nalezy zrobic filmik z przegalem rozwiazan i tym co opiusuje}

Nie znalazlem dobtego rozwiazania do sterowania roletami i zaslonami w domu. Zakladam ze dosc dobre urzadzenie jeszcze nie powstalo. Wykonalem krotki przegald urzadzen do sterowania roletami dostepny ponizej, ale to nadal nie jest to czego szukam.

A szukam rozwiazania ktore potrafiloby sterowac zaluzajami (nie roletami) 25/27mm zamwiesonymi na skrzydle okna, i uchwylajacymi sie z nim. Nie ma takich malych silniczkow.

Rozwiazania zasilanego, najlepiej elektrycznie, co by nie trzyma bylo z ladowarka biegac, ale takie sa tylko do silnikow roletowych.

Jednoczesnie rozwiazania ktore najlepiej da sie tez sterowac recznie w przypadku zaniku pradu, ale wiekszosc rozwiazan dziala tylko cyfrowo.

Oraz ktore zna aktyalna poizycje zaluizji ktorymi stteruje. Zadnego co ogarnia zaluzje solidnie nie znalazlem, co najwyzej wykorzystje sie do tego silniki roletowe.

A ja chcialbym miec automatyzcaje ktore wykorzystuja te wiedze o aktualnej poizycji rolety (nachyeleniu i stopniu rozwarcia) i lacza z danymi pogodowymi i mikrokoltem mieszkania oraz pora dnia i opytmalnie steruja tymy parametrami. Czyli ze jak swieci mopcne slonce i jest goraco to zaluje same zaciemniaa (szczegolnie np w nieuzywamym pokoju), mimo ze jest dzien. Podobnie jak swieci za mocne slonce i wali po oczach to tak samo zaciemniaja.

Nie ma rozwiazania na rynku jakie szukam w zakresie zaluzji, rozwiazania jakie mi sie marzy. Ale zakladam ze pewnego dnia bedzie. I bede mogl je podlaczc. Do tego czasu bede moze zadnego nie bede mial a moze bede eksperymentoal z dostepnymi a moze rozwijal wlasne.

Dodatkowo gdzieniedzie mysle ze pasowalby zaslony elektryczne. To wymaga dodaktowych koncowek sterowania.

W ogole mam problem z tym smart home ze wcale nie ma solidnych czujnikow i steruje urzadzeniami na slepo, jak zostalo zaprogramowanie ,np przewin rolete 100cm, a nie przewin do pozycji zamknieta czy otwarta. Ktos przestawi rolete i system sie gubi. Dlatego nie ma rozwiazan gdzie mopzna sterowac np roleta czy zaluzajami reka i elektrycznie. To wyjagaloby tracowania pozycji tego zacieniacza a takich rozwiazan nie ma ;/

Jak sobie z ty poradzic?

Rozwazalem polozenie infrastuttuey kotra bedzie pasowala pod wszustko, ale uznalem ze to za duzo kabla, szczegole ze nie wiem co koniec konocw zainstaluje. Infra pod wszystko to osobny kabel 4x 1mm2 z pusta puszka na koncu do kadego skrzydla okienniego oraz ew osobna skretke (na dane z sensorow).

Wezmy sopbie na tapete (anelize) okno z zaslonami. To daje nam 4 komplety przewodow zakonczone puszka. Po dwie po obu stronach okna (do zaluzji), oraz po 2 po obu stronach karnisza. Przypominam ze do okna beda podpiete tez przewody kotaktronow. Robie sie juz z tego niezla wiazka.

Nawet sam kabel 4x do takiej ilosci punktow to duzo. Nie wszedzie bym instalowal zaslony ale na moje mieszkanie wychodzi 8 takich punktow, co daje okolo 100m, co daje 400 zl za kabel elektryczny (YDYp 4x1mm2) oraz 50 zl za skretke. Niby mozna ale czy warto, czy warto klasc tyle kabla przedewszystkim.

Nie wiem czym bede zaslanial okna oraz jakim urzadzeniem bede sterowal. Moze by tak tylko puscic do kazdego z tych gniazdek 230V jednym kablem 3x1.5mm2  i tyle, zasilenie, z ktorego bedzie sie przez WIFi sterowalo i komunikowlo z czymioleiek co bedzie podlaczone. To daje mi max 3 punkty na mieszkenie (kade okno oddzielnie). Max 45m kabla 3x1.5mm2 po 3 zl za metr.

Moge wziac i zrboic puszke z jakimis zlaczami do tych 230V albo ukryte gniazdko albo puszke sama ukryc nakladajac np siatke i szpachlujac?

Mozna elektrycznie sterowc zaslonami w mieszkaniu, co robi sie poprzez takeie cos:
https://www.aliexpress.com/item/1005002652016240.html

* do obecnych rolet
  * [https://smartblinds-shop.eu/silnik-smartblinds-do-rolet-zaluzji/](SmartBlinds) do obecnych rolet (dziala z sznurkiem z kulkami), zasilany panelem soneczym (który trzeba zamonowac w oknie) kub w wersji zasilnejej bateryjnie (trzeba ladowac raz na jakis czas)
  * https://www.aliexpress.com/item/1005002333699520.html za 281 zl z AliEx
  * [MoesHouse](https://www.aliexpress.com/item/1005001698400295.html) za 300 z z AE
  * [Zemismart](https://www.aliexpress.com/item/4000983297439.html) za 368z
* sterowniki eolet
  * polski (?) [Supla SRW-01](https://sklep.elus.pl/sterownik-rolet-wi-fi-supla-srw-01,3,514298,89275) dziala za pomoca przyciskow i sieci wifi, jesli jest jakies API to mozna by skonfigurowac aby dowolny przycisk podpiety pod bone.io dzialal jak przycisk zwierny i zalaczal rolety przez WiFi

  * AUBESS za 50zl : https://www.aliexpress.com/item/1005004255274341.html
  * [Moeshouse Tuya Smart Life WiFi+RF433](https://www.aliexpress.com/item/1005001872913986.html) za 72zl
  * [LoraTap WiFi](https://www.aliexpress.com/item/4000424450915.html) za 80zl
  * [LoraTap WiFi 3th gen](https://www.aliexpress.com/item/1005002624977900.html)
  * LoraTap ma 3genetacje, ZigBee, WiFi i RF868HMHZ
  * [QS-Zigbee-CP03 ](https://www.aliexpress.com/item/1005004095554218.html) za 50 zl
  czyli jeden sterownik silnikow kosztuje 50-100 zl
* silniki rolet
  * Zemismart
    * podączany do sterownika, [elektryczny](https://www.aliexpress.com/item/33035993758.html) za 286z
    * oraz sterowane zdalnie, podączane do 230V, ze zingegrowanym sterownikiem:
      * [Zigbee](https://www.aliexpress.com/item/4001135382474.html) za 312z
      * [RF433](https://www.aliexpress.com/item/33010198287.html) za 286z
      * [WiFi](https://www.aliexpress.com/item/4000201855781.html) za 305z
    * ta firma ma roznierz takie do zaslon np [wersja wifi](https://www.zemismart.com/collections/for-slide-curtain-389)
    *
* https://www.aliexpress.com/item/1005002865036543.html? - ma wersje for 17, 25 i 28mm tube, te 17 brzmi bardzo zachacajaco  za 300 zl, albo tutaj za 255 zl: https://www.zemismart.com/products/zmam1501 i dzaiala z WiFi i RF



generalnie: nie ma rozwizan innych niz proste sterowaie silnikami
najlepiejto to byloby sterowac nimi po wifi
wieg moge pusicl 3kable i sterowac po wifi
ale moge tez puscic 4ry i wtedy tez ew kiedysprzestawic je na sterownaie po wifi

https://www.zemismart.com/products/bcm500d
ale on chce 5 kabli :O

w kazdym razie poki co wszystkie te rozwaiazania sa dosc niepotrzebnie dorgie
300x 6 silnikow w oknach, to 1800zl + a strowneik zaslony okolo 700 zl pewnie x2 czyli

1800 rolety
1400 zaslony
500 zl kable i puszku
---
3700 zl lacznie na sterownaie zasloanmi lekko

wychodzi ze koszt przwodow to maly procent ceny
natomiast walbalym przewod 3x1 do kazdego punktu
pusze i na nia gniazdo przelotowe, tzw. przylacz kablory, wyjscie kkablowe, wypist kablowy
https://www.google.com/search?q=wypust+kablowy&tbm=shop
no i takie wypusty mozemy sobie poinstalowac na puszkach i zostawic
da sie kupic wypust firmy simon ponizej 20 zl, x10szt max, daje nam 200 zl
lacznie insfastrkuytra pod same zaslony i rolety (bo nie wiadomo co z zaluzjami) to do 1000 zl
plus  urzadzenia ponad oklo 3000 zl

wiec podsymownie pomyslow jest takie, ze zbudujemy chyba infrastrukture pod rolety i spuscimy ja do rozdzielnicy

a jaie koszty mixed board? w bone.io?

## przewody do rolet
> @jacke
> Mam pytanie nie do końca związane z bone-io, ale blisko. W zasadzie to nie pytanie, a prośba o radę - czy do sterowania rolet wewnętrznych (takich zwykych materiaowych) wystarczy mi przewód 4x0,5?

> tomasz.kakiel
> spokojnie linka starczy

> @jacke: to kamień z serca (i z portfela również) 🙂
> @jacke: To idąc tym tropem, gdyby robić sterowanie również z przycisków fizycznych, również 4x0,5 starczy chyba, co nie?
> tomasz.kakiel: ja wrzuciem 4x1; w zasadzie po dwa przewody 2x1mm2 i do tego skrętkę
> Krzysztof Skalski: https://www.elektroda.pl/rtvforum/viewtopic.php?t=3908008 Polecam ;)
> tomasz.kakiel: tyle ze będę mia silniki które ogarniają bez potencjaowo otwieranie/zamykanie
> Kamil_Bozyk: 4x0.75 sobie daj będziesz spokojnie spać
> @jacke: bezpotencjaowo, czyli napięcie będzie podane tylko w momencie pracy?
> tomasz.kakiel: chodzi o to ze na przewód góra dó nie muszę podawać napięcia, wystarczy zewrzeć do masy
> tomasz.kakiel: można też zastosować jakiś prosty modu do puszki typu shelly i zwyky silnik obsugiwać, rozwiązań jest sporo
> @jacke: chcę mieć możliwość sterowania roletami zarówno z bone-io jak i z przycisku przy oknie (albo-albo), ale do 9 rolet jak będę chcia puścić nawet 4x1 to pójdę z torbami. 4x0,5 kusi ceną 🤯
> tomasz.kakiel: to szukaj napędy z taką opcja, tz radiowo+przyciski, po mqtt potem można sterować, ewentualnie do każdej rolety shelly i po wifi
> zentala: mozesz tez przycisk typu dzwonkowy przy oknie podlaczyc przez skretke do wejsci bone io
jacke — Dziś o 13:57
9x shelly jest warte tyle co 200m kabla 🤔

> tomasz.kakiel: somfy ma krańcówki  elektroniczne i rozpoznawanie czy nie przymarza loleta itp
somfy io hybrid; jakaś tam integracja jest nawet pod HA
https://otwieramy.com/product-pol-5277-Somfy-1033339-S-SO-RS100-io-Hybrid-6-17-elektroniczny-naped-radiowy-do-rolet-z-detekcja-przeszkod-i-oblodzenia-oraz-zmiana-predkosci-obrotowej.html

jacke —  Dziś o 14:04
a shelly można triggerować po kablu (z przycisku), czy tylko przez wifi?

tomasz.kakiel — Dziś o 14:04
ma chyba wejścia
raczej napewno
bo stosują go waśnie do tego
kup takie puszki
https://allegro.pl/oferta/puszka-podtynkowa-do-elektroniki-gleboka-kieszen-12255308518

jacke —
Czyli wystarczy jak do sterowania rolet z przycisku pociągnę przewód do puszki z shelly

tomasz.kakiel — Dziś o 14:06
do tego to można cae biglebone wożyć 😛
https://discord.com/channels/900067317524873236/900067318258864180/1003272735692173342
a same przyciski możesz podączyć równolegle do boneio przez skrętkę
i masz sterowanie z boneio też

po mqtt możesz sobie feedbac czy zamkną


tomasz.kakiel — Dziś o 14:30
możesz też zainwestować w silniki od somfy IO
one mają dwustronną komunikacje
można odczytać pozycje rolety itp
tylko potrzebna jest ich bramka
jacke — Dziś o 14:32
Poczytam, bo dobrze by byo wiedzieć czy są otwarte czy zamknięte
tomasz.kakiel — Dziś o 14:34
TaHoma obuguje IO
do tego zigbee też

Layton — Dziś o 14:35
Ja kupiem rolety z centralka bezprzewodowo. Ogarnąem temat zanim postanowiem z ebede robil instalacje taka jaka robię...
Rolety wewnętrzne raczej będę robi klasyczne o ile w ogóle będę robi... mam nadrpoza zelbetowe, wizja kucia tam pod przewody mnie wystarczająco zniechęcia 😆

## czy w ogole instalowac rolety?
Krzysztof Skalski — 13.08.2022
Dojdą mi zączki wago pod rolety to montuje w tygodniu caość, będą testy
[12:53]
Sonda do kilku kV zakupiona, to powinna wylapac wszystko bez odcinki
14 sierpnia 2022

tomasz.kakiel — Wczoraj o 16:35
@Krzysztof Skalski  masz wszystkie rolety do rozdzielni pociągnięte? Jakie silniki używasz?

Krzysztof Skalski — Wczoraj o 20:29
Wszystko do rozdzielni, rolety solido, ale nie wiem jakie tam silniczki. Wazne ze z krańcówkami więc mniej problemow

tomasz.kakiel — Wczoraj o 20:30
5 przewodów ciągniesz do rozdzielnicy ?

Krzysztof Skalski — Wczoraj o 21:04
4x1 mm okragle,

tomasz.kakiel — Wczoraj o 21:05
sterujesz tym 230V
[21:05]
?
[21:05]
czy bezpotencjaowo ?

Krzysztof Skalski — Wczoraj o 21:58
230 gora/dó

tomasz.kakiel — Wczoraj o 22:01
ja odpuściem
[22:02]
będę najwyżej jakieś shelly pakowa do puszki

Krzysztof Skalski — Wczoraj o 22:04
Czemu odpusciles

tomasz.kakiel — Wczoraj o 22:04
kolejne kilometry kabla
[22:04]
to raz
[22:04]
dwa ze i tak z doświadczenia wiem ze nie ma sensu sterowania centralnego reolet
[22:05]
każdy indywidualnie sobie steruje

nofox (Karol obaczewski) — Wczoraj o 22:05
No nie do końca

tomasz.kakiel — Wczoraj o 22:05
jedyna opcja centralnego to jak nikogo nie ma w domu, żeby z harmonogramu zamykać i otwierać

Krzysztof Skalski — Wczoraj o 22:05
Przy oknach i w pokojach mam skretki do sterowania lokalnego
[22:06]
Czujniki swiatla otworzą rano w salonie itp

tomasz.kakiel — Wczoraj o 22:06
skrętki mam pociągnięte do sterowania waśnie w razie jak by jednak byo trzeba

nofox (Karol obaczewski) — Wczoraj o 22:06
Ja nie mam skretek do sterowania roletami stricte

tomasz.kakiel — Wczoraj o 22:07
w razie czego mogę dwa przekaźniki wpiąć i atwo sterować góra dó
[22:07]
@Krzysztof Skalski a jak rozwiązaeś poączenia skrętek ?
[22:08]
odwrócony patchpanel ?
[22:08]
mi te lsa to tak średnio
[22:08]
szkoda że nie ma wago dla takich rzeczy




# add: zakup: zawory elektryczne
Czy jest elektrozawór do wody na gówny zawór pod 24v DC
Powyżej 3/4 cala tylko pneumatyczne widziaem
https://allegro.pl/oferta/zawor-kulowy-2-drogowy-bev-1cal-no-silownik-afriso-10132322511


https://allegro.pl/oferta/zawor-kulowy-2-drogowy-bev-3-4-nc-silownik-afriso-10132223604
Tu NC

https://allegro.pl/oferta/zawor-kulowy-2-drogowy-bev-1cal-nc-silownik-afriso-10570029214
Taki chyba wrzucę
Też na niego patrzyem do siebie

Minus taki że bez prądu nie zamknie się
Nie ma sprężyny
Chyba bardziej energooszczędny bedzie NO
I podaje zasilanie dopiero jak chcesz zamknąć
A to się rzadziej zdąży

https://www.proxima.pl/produkt/zawor-kulowy-elektryczny/
Ten gdzieś znalazem jako polecamy
12v
I sam do siebie chyba waśnie taki kupię
O i ręcznie można sterować
I cena przyzwoita
Cena niższa bo brak atestu

https://allegro.pl/oferta/salus-zawor-dwudrogowy-1-naped-el-pmv21-463-9868545848
Ale ponoć bardzo solidna firma
Ale 230v

Probleme jest jak różnica ciśnień duża
Jak walnie rurkaz to soadek jest taki że zaden 24V nie da rady
tomasz.kakiel — Wczoraj o 20:49
Sa afriso bev na 24V
Ale AC
Afriso ma jako jedyne możliwość przeączania przy różnicy 6 barów ciśnienia
Czyli są w stanie otworzyć się do pustej instalacji
Większość ma max 0.8 bara

ja chyba wrzucę ten
https://afriso.pl/katalog-online/afriso/2-drogowe-zawory-kulowe-z-silownikiem-elektrycznym-bev-2/produkt/9022310#dane-techniczne


## ladny opis instalacji logiiki automatyki oraz link do zaworu z
https://www.elektroda.pl/rtvforum/topic3711850-60.html#18828656
(1 cal; 318zl) https://hpcontrol.pl/elektrozawor-kulowy-1cal-z-silownikiem-a80-lub-a83.html
(5/4 cali; 388zl) https://hpcontrol.pl/elektrozawor-kulowy-5-4-cala-z-silownikiem-a80-lub-a83.html



# zakup czujki magentyczne (kontraktony)
wybralem czujki satel bo oferuja duzo wersji i sa dosc tanie
dobralem pasujace mi na podstawoe [porowania czujek magnetycznych satel](https://www.satel.pl/api/download/leaflet/516)

generalnie czujki mozna podzielic wg:
* spodobu montazu
  * powierzchiowego - przykrecanego albo przyklejnego
  * wpuszczanego - w ramie wieci sie otwor do ktorego wpiszcza sie czujke (bezpieczniejsze i estetyczniejsze, mozemy calkowicie ukryc widocznosc czujek)
* obudowy
  * materialu
    * metalowej
    * plastikowej
  * hermetycznosci (lub jej braku)

ja wybralem czujki wpuszczane poniewaz uwazam ze bedzie to rozwiazanie trwalsze i estetyczniejsze

zamowilem z allegro od jednego sprzedawcy kilka czujek wpuszczanych aby zobaczyc co bedzie mi bardziej pasowalo do ram okien i potestowac

pytaniem pozostaje gdzie je zamontowac w oknie, i drzwiach, w ktorych miejscach - poczytamo tym albo bede jeszcze nad tym myslal

# zakup sonda zalania
> @zentala
> Hej, wiecie może czy taką sondę https://www.satel.pl/produkty/sswin/system-bezprzewodowy-abax-2/akcesoria-abax-2/fpx-1/ mogę bezpośrednio podączyć do wejścia Bone.io czy potrzebuję dodatkowo czujki? https://www.satel.pl/produkty/sswin/czujki-przewodowe/czujki-ochrony-obwodowej-czujki/xd-2/

> @Layton
> Potrzebujesz czujnik
> Ale kupiem taka czujkę jedna na testy i jest naprawdę fajna, maa zgrabna itp ja polecam.
> Lepiej nawet przygotować sobie miejsce, przewod i czujki z czasem dokupić.

> @zentala
> A gdzie zamontowaeś te XD-2 aby wyglądao estetycznie? W jakiejś zabudowie meblowej (tylko wtedy nie widać diody), czy na zewnątrz, a jeśli na zewnątrz. to na jakiej wysokosci? Bo jeśli wysoko to trzeba by też ukryć kabel miedzy czujką a sondą...

> @Layton
> Wiesz co ja puściem sobie peszel do którego idzie kabel z xd-2 do bone i zrobiem sobie puszkę na dole i zostawiem pilota którym wciagbe sondę też do xd-2.
> Jedno zamontuje pod zabudowa w kuchni, tam mam duże oknonwiec nie miaem żadnego miejsca żeby to umieścić.
> W kotowni na widoku obok zbiornika cwu
> W pralni tak samo nie daleko pralki będzie
> W azience zależao mi aby sonda bya pod wanna i tam też mam puszkę, a czujnik będzie też na widoku, może mnie moja nie zabije 😆
> Bo jednak czujnik jest w miarę estetyczny.


Sonda dziala na 12V, wiec bedzie zasialana osobnym zasilaczem 12V.

# czujki gazow
Wybieram [czujki Satel](https://www.satel.pl/kategoria-produktu/sswin/czujki-przewodowe/czujki-gazu/)
poniewaz mają styki alarmowe, które mozna podlaczyc do Bone.io i budować na nich dalszą automatykę.
Nie znalazem na polskim rynku innych takich czujek, a przynajmniej ich zestawu (wykrywajacych kazdego rodzaju gazy).
Wybor tego samego producenta, zestawu czujek jest o tyle dobry ze przynajmniej bedziemy mieli wszedzie takie same obudowy.

**Jakie czujki dobierac:**
* ja mam w bloku gaz z sieci, czyli tak zwany gaz ziemny, skladajacy sie glownie z metanu, wiec potrzebuje czujki metanu,
* jesli ktos uzywa gazu z butli czyli LPG, wowczas potrzebuje czujki propan-butanu
* poniewaz cos na kuchence moze sie zapalaic zainstaluje tez czujkę dymu
* a poniewaz gaz spalajac sie w warunkach niskiego dostpeu do tlenu moze wydzielać czad, potrzebuje czujki czadu

Panie, ale to 3 czujki do jednej maej kuchni.
**Czy nie mozna wszysktich zmiescisc  jednej obudowie?**
Odpowiadając krótko: NIE. Kazdy z czujników powinno instalować się w innym miejscu.
Aby nie powielać tego co zostao juz napisane przytocze linki do artykulow:
* [jak-i-gdzie-zamontowac-czujnik-czadu-gazu-dymu](https://www.libra.com.pl/baza-wiedzy/jak-i-gdzie-zamontowac-czujnik-czadu-gazu-dymu) na przykladzie produktow formy Orno
* [Gdzie zainstalować czujniki?](https://czujniki.co/blog/news/gdzie-zainstalowac-czujniki)
* doczytaj wiecej wyszukujac w Google Images "gdzie zamontowac czujnik gazu/metanu/LPG/dymu" - znajdziesz tam duzo skicow ktore pomoga Ci zaplanowac gdzie zamontowac jaka czujke

Na podstawie artykuów ustaliem **jak ma wyglądac instalacja w moim miejszkaniu**:
* czujka dymu
  * nie montowac w kuchni oraz lazience (falszywe alarmy)
  * chociaz niektorzy montuja w kuchni
  * zainstaloac conajmniej jedna centralnie na pietro (korytarz)
  * a najlpeiej dodatkowo w pokojach
  * montarz centralnie na suficie
  * wypadaloby wystaiwc na srodku sufitu przewodu do czujek dymu w kazdym pomieszczeniu po za lazienka
* czujka czadu
  * na ścianie, na wysokosci oczu (1.5-2m), conajmniej 1.5m od kuchenki, min 15cm od sufitu
  * w moim przypadku będezie to ściana kuchni znajdujaca sie blizej centrum mieszkania
* czujka metanu
  * na scianie pod sufitem w kuchni, min 0.3m od sufitu, 2-4m od kuchenki
  * zamonuje go na tej samej scianie co czujka czadu, ale nizej

Wiec jakie dokladnie czujki?
*  czujka gazu ziemnego Satel DG-1 ME kosztuja 170zl+ / szt
  * warto zwrocic uwage na testery do nich (5 ampuelek)
* satel dymu TSD-1 [na allegro od 100zl juz](https://allegro.pl/oferta/tsd-1-satel-czujka-pozarowa-dymu-ciepla-p-poz-5890801412) al
* [czujka tlenku wegla Satel DG-1 CO](https://www.satel.pl/produkty/sswin/czujki-przewodowe/czujki-gazu/dg-1-co/)

Czujki Satel dzialaja na 12V wiec beda zasilane osobnym zasilaczem.

Altrnatywnie znalazlem nieco [tansza i dzialajaca na 24V czujke dymu firmy Sentek za 88zl](https://allegro.pl/oferta/czujka-dymu-sentek-sd119-g-4-10-60v-en54-7-11715251689)
Ale one nie sa w zestawie z innymi, podobnymi wiec raczej odpuszcze.

Do czujek nalezy poprawic skretke kat UTP5.

Czujka potrzebuje:
* zlacza sabotazowego NC, zlacza NC czujki, GND i 12v czyli 4 przewodow
  * z czego min 1, a najlepiej 2 niech ida do sensora





# czujki ruchu
gdzies moze opisywalem ze kupilem chinskie ale tez kupie satela na probe
https://www.satel.pl/kategoria-produktu/sswin/czujki-przewodowe/czujki-ruchu-dualne/
dualne wydaja sie byc na maxa sensowne

rozwazam kurtynowe do wejscia do kuchni oraz przechodzenia po korytarzu moze nawet moglbym rejwarwoqac ruch miedzy wszystkimi pomieszczeniami

## Add LED dimming

> @Layton: Zna ktoś jakiś dimmer 24v który moznaby zintegrować z HA bądź sterować przez boneio? Wiem że jest dedykowany board ale pnie potrzebuje aż tyle sciemnialnych punktów, chyba że faktycznie zrobibym cae oswietlenie na 24v
> @Layton: Chociaż w sumie teraz nie do zrobienia, mam wszędzie do świate puszczony przewód 3x1.5.
> @Layton: Najleossy byby dimmer 230 plus oswietlenie tkroe by fajnie z tym dziaao...
> @Michal_Szymczuk: U siebie planuję do oświetlenia 24V QuinLED-An-Penta z Ethernetem (https://quinled.info/analog-led-dimming/#AnalogBoards), ale jak nie musi być przewodowy, to może Shelly RGBW2 się nada? Max 90W na kana, może komunikować się lokalnie po mqtt  bez chmury. Shelly ma też dimmer na 230V (https://shelly.cloud/products/shelly-dimmer-2-smart-home-light-controller/). Jeśli pasuje Ci sterowanie bezprzewodowe, to możesz poszukać takiego źróda świata (profile led), w którym da się ukryć zasilacz i sterownik,  wtedy przewód 3x1,5 nie będzie problemem. Z powodu spadku napięcia do większych mocy (oświetlenie gówne a nie dekoracyjne) 1,5mm raczej będzie za cienki gdybyś montowa zasilacz w rozdzielnicy a nie przy źródle świata.

# co to znaczy smart Home
majac prawie gotowy projekt wnetrza
i muszac podjac decyzje odn projektu elektryki
uswiadomilem sobie ze nie wiem czym dokladnie mialby byc smart home/
dlaczego go chce
dlaczego po kablu
po co to wszystko

bo jak sie ma nornalne pomieszczenie to wielu automatyzacji nie mozna wykonac

czego oczekuje?
1) swiatla


# Elastyczna instalacja do Smart Home z system tras kablowych

1) Rodzielnica i switch w centum mieszkania (na korytarzu) aby oganircznyc ilosc kucia i dlugosci przewodów, z latwym dostepem, nad otwieralnym sufitem podwieszanym
2) Poniewaz przez srodek mieszkania przechodzi sciana nosna o grubosci 60cm to rozwazam ograniczenie kucia przez nia budujac kolejna rodzielnice w pokojach, na pokoje, na scianie zewnetrznej, poneiwaz jest tam najwiecej elementow do podlaczenia
3) Trasy kablowe z wykorzystaniem koryt i drabinek oraz przepustow kablowych aby byc bardziej elastycznym na przyszlosc i moc cos dodac, rozbudowac instalacje, bawic sie IoT https://www.elektro.info.pl/artykul/kable-i-przewody/161604,systemy-tras-kablowych-i-przepusty-kablowe


https://www.elektro.info.pl/artykul/kable-i-przewody/161604,systemy-tras-kablowych-i-przepusty-kablowe
https://www.fachowyelektryk.pl/technologie/kable-i-przewody/964-trasa-kablowa-nie-zawsze-prosta.html

## Przemusty kablowe

[Przepust kablowy niedzielony KEL-DP-E, na 7 przewodów, 43585](https://abcelektro.pl/przepust-kablowy-niedzielony-kel-dp-e-na-7-przewodow-43585-id-ic-43585000000000) za 17 z
[Przepust kablowy niedzielony KEL-DP-E, na 9 przewodów, 43587](https://abcelektro.pl/przepust-kablowy-niedzielony-kel-dp-e-na-9-przewodow-43587-id-ic-43587000000000) za 17 z
[Przepust kablowy niedzielony KEL-DPZ 50, na 19 przewodów, 43758](https://abcelektro.pl/przepust-kablowy-niedzielony-kel-dpz-50-na-19-przewodow-43758-id-ic-43758000000000) za 50z
[Przepust kablowy niedzielony KEL-DPZ-E, na 21 przewodów, 43790](https://abcelektro.pl/przepust-kablowy-niedzielony-kel-dpz-e-na-21-przewodow-43790-id-ic-43790000000000) za 60,50z
[...przejrzyj oferte sklepu od najtanszych](https://abcelektro.pl/zlacza-osprzet-kablowy-i-mocowania/przepusty-kablowe/przepusty-kablowe-niedzielone?page=1&rows=15&sortCriteria=GROSS_PRICE_ASC)

# Szafa RACK 19" na sciane


# klimatyzatory

u mnie nie mozna montowac nic na fasadzie budynku bo jest pokryta piaskowecem i by to zepsulo jej walory estetyczne
jednoczesnie ten sam piaskowiec powoduje ze budybek sie nagrzewa jak diabli w lato i jest goraco w srodku
dlatego chce miec  (conajmniej w pracowni, a najlepiej tez w sypialni) klimatyzator wewnetrzny, bez jednostki zewnetrzbenej, tzw monokilamtyzator

przyklady (6-10k pln)
https://allegro.pl/oferta/klimatyzator-bez-jednostki-zewnetrznej-smart12sf-10592810771
https://allegro.pl/oferta/monoklimatyzator-bez-jednostki-zewnetrznej-air-8sf-10604316614
https://allegro.pl/oferta/klimatyzator-bez-jednostki-zew-pro-inverter-14hp-10596085870
https://allegro.pl/oferta/monoklima-bez-jednostki-zew-vantubo-apollo-12hp-12021758868

musze uzyskac od wspoloty zezwolenie na zrobienie 2 otwoarow
a moze nawet uda sie zrobic kolejne 2 do sypialni tez pod parapetem
(mam tam cienka sciane, a w pracowni bede robil zabudowe i tak)


# ESPHOME - KinCony
* KC868-A4
* KC868-A4E za 316zl: https://pl.aliexpress.com/item/1005003208784146.html
* KC868-A8 relays za okolo 300: https://pl.aliexpress.com/item/1005004097696244.html
* KC868-A§8S
* Kincony H32BS
  * 1 606,93zl: https://pl.aliexpress.com/item/1005003163728268.html
  * 32 dry contact inputs
  * 6 digital inputs
  * RS485 / modbus
  * 32 digital output (12/24V)
  * eth
  * szerokosc 215mm (6.5M)
* KC868-AI
  * 48 dry contacts
* KC868-A16 dimmer za okolo 450zl: https://pl.aliexpress.com/item/1005004381439074.html
  * 16 MOSFET outputs 12/24V 0.5A per channel
  * input: 16ch digital, 4ch analog
* Switch terminal with 32 inputs (8 COM)
  * externder that allows to connect a lot of inputs
  * connected to KC868 via RS232 port
  * 12V input and output
  * 305zl: https://pl.aliexpress.com/item/4001006807920.html
* KC868-A32: https://pl.aliexpress.com/item/1005004047704697.html
  * 32ch 10A 220V outputs
  * 32ch digital inputs
* 4 gang za 90 zl / szt
  * colors: golder, metalic, black
  * https://pl.aliexpress.com/item/1005004015559370.html?
* KC868-E16S:
  * 16ch digital outputs
  * 16ch dry contact
  * 2x 2 analog input
* KC868-D8: https://pl.aliexpress.com/item/1005004575220843.html
  * 8ch  dimmer + 8 inputs
  * chyba wymaga extra led driverow
  * 0-10V
*  KC868-Server: https://pl.aliexpress.com/item/1005003987063158.html
  * 1600 zl
  * nie ma dimmerow, ma RPI w srodk
*

## Scie,mnaicze 240V

## DMX
dimmery do bone.io nie sa skonczone, nic o nich nie wiadomo
wiec zaczalem przegladac inne sciemiacze
i natknalem sie na sciemniacze DMX
ktos juz kiedys o nich wspomial no i przegladajac ich oferte i mozliwowci calkiem maja one sens

### wprowadzenie do dmx
https://www.megascena.pl/blog/sterowanie-dmx-jak-zaczac-prace-z-sygnalem-dmx.html
https://livesound.pl/tutoriale/4890-dmx.-co-jak-z-czym-i-dlaczego

generalnie DMX to rozwiazanie stosowane do stewrownaia oswietleniem na scenach, imoprezaach itd
a wiec pozwala nam na mega dokladne sterowanie oswietleniem, co wiecej mozna nim sterowac kodem, mozesz ustawic sobie sceny oswietleniowe lub jakies automatyzacje
a poniewaz ropzwiazanie jest ustandardyzowane mamy duzy wybor sterownikoe na rynku i sa one ze soba kompatybilne

### 240v
dopuszkowny ale 100 zl za 4ch czyli tanio; https://pl.aliexpress.com/item/1005003417122659.html?
albo za 40 zl https://pl.aliexpress.com/item/32797135745.html?

High Voltage: https://pl.aliexpress.com/item/1005003306939059.html
* WS-DMX-DMXHV-6CH-KE za 214zl; z obudowa; 6CH x 5A 220V zarowki
* WS-DMX-HVDIM-6CH za 185zl; j/w tylko bez obudowy
* WS-DMX-HVDIM-12CH za 313zl; to samo tylko 12 zarowek

https://pl.aliexpress.com/item/1005003306939059.html
* DMX-LED-HVDIM-12CH za 365zl do LED; 4x RBGW 220V (max 2A chanel; 12A total)

DMX302 na DIN
* 183zl: https://pl.aliexpress.com/item/32832319283.html
* 37usd: https://www.ebay.com/itm/232448975755

DMX512 na DIN
* https://www.ebay.com/itm/373603966130
* 60USD: https://www.ebay.com/itm/373603966130


din:
* 2x 250V za 101,48zl (1.2A): https://pl.aliexpress.com/item/32842079514.html
  * ● To dim and switch single color dimmable LED lamps, traditional incandescent and halogen lights.
* 4CH (RGB/RGBW) DC5V-24V za 184z https://www.aliexpress.com/item/1005004593259150.html
* 5CH BC-835-DIN / BC-835-DIN-RJ45: https://www.aliexpress.com/item/1005003495732463.html
* (nie DMX) L4-D: https://www.aliexpress.com/item/1005004167894536.html
* rggbw -sr-2103din

tylko czy to jest sciemnialne?
tak, na obrazku jest napisane ze to sa dimmery

wiec w miejscach gdzie mam duzo zarowek moge dac takie dimmery

## Dimery LED
generalnie do sterowania swiatlami w pracowni najlepiej chyba bedzie uzyc DMX po prostu, da mi to kontroler nad wszystkim

* https://pl.aliexpress.com/item/1005003495788088.html
  * zasilanie: 12-24V
  * wersje w zaleznosci od ilosci kanaow:
    * BC-624-DIN; 24CH: 8x 3(RGB); 5A per CH; 368z
    * BC-632-DIN; 32CH: 8x 4(RGBW); 3A per CH; 495z
    * BC-640-DIN; 40CH: 8x 5(RGBWW); 3A per CH; 601z

* https://pl.aliexpress.com/item/1005003306308759.html
  * 3ch (RGB) za 75
  * 4ch (RGBW) za 80 zl


* https://pl.aliexpress.com/item/32647393237.html - solidna obudowa
  * 90 za 3/4 ch (1g)

* [Miboxer system](https://pl.aliexpress.com/item/1005003115130381.html)
  * sterowniki na 1-5ch (za 88,44zl) wraz z odpowiadajacymi im panelami dotykowymi (za 132,94z)
  * potencjalnie mozna by sterowac kontrolerem za pomoca RF i tym samym wszystkimi podlaczonymi sterownikami, z tym ze ten panel nie jest wygodny

* 8x RGB za 165zl (ale bez wyjscia): https://pl.aliexpress.com/item/4001178711966.html
* 8x RGB za 208zl: https://pl.aliexpress.com/item/32444070411.html
* 8x RGB za 260zl: https://pl.aliexpress.com/item/32819691487.html
* 8x RGB za 324zl: https://pl.aliexpress.com/item/1005004415550026.html
* 8x RGB za 339zl: https://pl.aliexpress.com/item/1005002669337969.html
* 10x RGB za 230zl: https://pl.aliexpress.com/item/4001084554388.html

* 12x RGB za 241zl: https://pl.aliexpress.com/item/4001211968045.html

* 2x RGBW za 56zl: https://pl.aliexpress.com/item/32443321987.html
* 2x RGBW za 75zl: https://pl.aliexpress.com/item/1005002741898045.html
* 8x RGBW za 730zl: https://pl.aliexpress.com/item/1005004630972510.html
* 8x RGBW za 860zl: https://pl.aliexpress.com/item/1005001804637605.html

* 4x adresable 404zl with artnet: https://pl.aliexpress.com/item/4000693369664.html



## podsumowanie przegladu urzadzen
sa sciemniacze dosc tanie ktore beda mi sciemnialy zarowno zarowki 240v jak chce np w sypialni jak i beda mi sicemnialy w pracowni za kanapa zarowki, albo beda sciemiac tasmy led do szafy, na kortyarz

## dmx gateway
1400 zl drogo: https://consteel-electronics.com/HD67944-B2-en
240 euro: https://www.enttec.co.uk/en/product/controls/dmx-ethernet-lighting-control/ethernet-to-dmx-rdm-adapter/
600zl: https://allegrolokalnie.pl/oferta/enttec-open-dmx-ethernet-interface-dmx
135 usd: https://www.amazon.com/Pknight-Ethernet-Lighting-Controller-Interface/dp/B092CJKJHK
700zl: https://www.megascena.pl/eurolite/eurolite-dxt-poe-art-net-node-i-interface-konwerter-artnet-dmx.html?
900zl: https://www.megascena.pl/showtec/showtec-net-2-5-pocket-2-channel-artnet-node-5p-xlr.html

### wejscia danych:
https://a.allegroimg.com/s1024/068052/ae38d7e746de82c822ae03aebbc4/Kontroler-DMX-512-RGB-24A-3x8A-Tasma-LED-DEKODER-Dlugosc-0-2-m

* IP-DMX data conventer
* USB-DMX data conventer
* DMX control system

650zl: https://prosklep.pl/chauvetdj-dmx-an2-artnet-node,3,39,17744
2150zl: https://ribalto.com/en/contest-sweet-net512-h10958
1100zl: https://www.amazon.pl/Showtec-NET-2-3-Pocket/dp/B083ZWTW44/ref=asc_df_B083ZWTW44/
500 zl: https://shopee.pl/Kontroler-Artnetu-LED-DMX-Kontroler-Artnet-WS2801-WS2811-Artnet-Madrix-LED-Kontroler-pikseli-do-%C5%9Bwiate%C5%82-ci%C4%85gowych-i.607833888.20415158016
750zl: https://www.musicstore.com/pl_PL/PLN/Eurolite-DXT-PoE-Art-Net-Node-I/art-LIG0018227-000
240Eur: https://www.enttec.co.uk/en/product/din/ethernet-to-dmx-rdm-adapter/
166zl: https://www.musicstore.com/pl_PL/PLN/Neutrik-DMX-CAT5-F-Adapter/art-ACC0010448-000
* Neutrik DMX-CAT5-F Adapter;
RJ45 CAT5 męski do 5-pinowego XLR żeńskiego; Z Neutrik DMX-CAT5-F
otrzymujesz adapter DMX, który umożliwia poączenie z wtyczki RJ45 CAT5
do pięciopinowego gniazda XLR. Czarna metalowa obudowa jest trwaa i sprawia,
że jest to akcesorium muzyczne na dugi czas. Produkt w sprawdzonej
jakości firmy Neutrik.
700zl: Contest SWEET NET512: https://www.lightingcenter.pl/58775-contest-sweet-net512-interfejs-ethernet-dmx-z-oprogramowaniem.html
600zl: Pknight ArtNet DMX 512 Ethernet: https://pl.aliexpress.com/item/1005003723704360.html
530z: MOKA SFX Artnet DMX512 Splitter Ethernet Lighting Controller Interface Stage Light DMX Distributor Mini DJ Controllerhttps://pl.aliexpress.com/item/1005004383502403.html
700zl: Contest SWEET NET512: https://www.lightingcenter.pl/58775-contest-sweet-net512-interfejs-ethernet-dmx-z-oprogramowaniem.html

350zl artnet to 4x DMX (2k devices): https://www.lightingcenter.pl/19734-sigma-net-e-node-am-83-l1-sterownik-dmx.html

usb:
640zl: https://www.conrad.pl/p/interfejs-dmx-eurolite-usb-dmx512-pro-mk2-51860121-1519482
250zl: https://ribalto.com/en/briteq-firmware-updater-b04319
200zl: https://www.megascena.pl/img-stage-line/img-stage-line-dmx-510usb-kontroler-dmx.html?

## czego ja dokladnie potrzebuje
* workshop
  * zabudowa okna
    * LEDy na 12 polek (moze mozna by sterowac all jednoczesnie albo pietrami)
    * LEDy na 3 szafki w srodku
    * 3 spoty
  * 3 lampy 240V przy kanapie
  * moje logo RBGW pewnie wezme
  * 16 lamp na 4 szynach w pokoju (nie wiem czy to dobry pomysl)
  * lampa nad biurkiem warszatowym
  * moze jakies lampki do polek nad kompem?
  * warto tu by sie zastanaowic nad oswietleniem dolnym jednak, takim nocnym
  * ew kilka nocnych przy lozku, przy wejsciu, pod kompem (3?)

* bedroom
  * 2x kinkiet
  * 2x lampa sufitowa (plafon i nad lozkiem)
  * ew 2x nocne w scianue

* korytarz
  * kilka razy tasma LED, np 6-8x8m
  * 2x kinkiet
  * ew 1-2x nocne w scianue

* lazienka
  * ew nocne w scianie
  * ew tasma polki (nie wiem czy to dobry pomysl)
  * do lustra cos
  * w suficie nie wiem co

* kuchnia
  *


W kazdym pomieszczeniu z  podwieszanym sufitem musi znalexc sie osobne podlaczenie do DMX - data + power.
Dzieki temu mozna pozniej przebudowywac instalacje podsufiowa, dawac wiecej albo mniej jakis rzeczy.


## zarowki sciemnialne

E27:
* 4W: https://www.ledkia.com/pl/kup-bombillas-led-e27-filamento/646-zarowka-led-e27-regulowana-ozdobna-tory-zlota-35w.html
* 5.5W: https://www.ledkia.com/pl/kup-bombillas-led-e27-filamento/650-zarowka-led-e27-regulowana-ozdobna-globo-zlota-g80-6w.html
* 6W: https://www.ledkia.com/pl/kup-bombillas-led-e27-filamento/3129-zarowka-led-e27-regulowana-ozdobna-classic-zlota-a60-6w.html
* wiekszosc tutaj jest sciemnialnych: https://www.ledkia.com/pl/68-kup-bombillas-led-e27-filamento


# software
https://tasmota.github.io/docs/
https://esphome.io/

# nagkosnienie strefowe

Dyskusja na discord:
```
Panowie, instalowaliście nagośnienie strefowe? Jakie kable? Gdzie montować gośniki? W ścianę się wbijaliście? Jakieś zasady jak to robić? Rady?
tomasz.kakiel — Dziś o 21:06
W dobie sonosów to skręta wystarczy
pszafer — Dziś o 21:06
co chcesz osiągnąć?
zentala — Dziś o 21:11
Marzę o tym aby nie musieć siedzieć przed kompem na dugich callach w pracy tylko móc iść do kuchni i zrobić sobie jeść czy się odlać suchając ich w tle 🙂

Ponadto mio by byo:
- móc puszczać nutę na domówkach lekko w tle, wszędzie
- (z czasem opracować) jakieś komunikaty dźwiękowe do uzytkownika smart home, niech wydaje proste dźwięki z systemu, np jak zamierza zgasić świato to wydaje delikaty dźwięki i jak nie kliknę jakiegokolwiek buttona to wykona daną akcję
ew moge podlaczc do tego tez TV / netflixa na podopbnej zasadzie, szczegolnie jak czasami ogladam seriale jednym okiem

tomasz.kakiel — Dziś o 21:13
No to sonos
Bo tak to kilka amplitunerów by trzeba
Do brzdąkania w tle jakość wystarczająca
Dps maja fajne
Dsp
Większość dostosuje się do pomieszczeń
Są jakieś systemy do kina domowego. Ale nie widziaem tego u nikogo w europie
W stanach jest mega popularny

wracając do tematu... ten sonos wydaje się drogi, 3k za 2 glosniki sufitowe, nie lepiej wziac np cos takiego? https://allegro.pl/oferta/naglosnienie-strefowe-100v-lokalu-biura-mp3-bt-fm-9429398209?offerId=9429398209&inventoryUnitId=h0KRCvtQw1d-aXa42DwOmA&adGroupId=Mzk3N2FlYjgtMzRlMi00YmNjLWEwZDUtNjcwYzYyNmNkZTYwAA&campaignId=MzU2NDhmNjctYjhkNS00NDM4LTkwY2UtNzc4NTA2NWY1ODVhAA&sig=8dc5d70a8dc059285373ab9ff4cd34b9&utm_feed=aa34192d-eee2-4419-9a9a-de66b9dfae24&utm_source=google&utm_medium=ads&gclid=CjwKCAjwpKyYBhB7EiwAU2Hn2UXjbxeoR6Q9LEkrwJxA2s0rL9ImHBBrC5pm9weUuNfol8mZp87iZxoCSZwQAvD_BwE
i nadal pytanie jak sensownie rozmiescic glosniki, na co zwracac uwage
tomasz.kakiel — 28.08.2022
To nie jest system strefowy tylko jakieś hinskie g.
Do sklepu się nada żeby puścić muzyczkę w tle
Tanio nie będzie niestety
Taniej wychodzą gośniki z ikea
zentala — 28.08.2022
nie bardzo rozumiem co to jest za roznica?
co czyni system strefowym?

Maciej Krasuski — 28.08.2022
ja mam yamaha musiccast jakby coś
też cakiem fajnie to dziaa

zentala — 28.08.2022
sam boss się odezwa 🙂
dzięki za propozycję...
też drogie ale marka to już bardziej usprawiedliwia 🙂
jednak chętnie bym wzią coś tańszgo i z gośnikami do sufitu, byle tylko dao się atwo osobno sterować każdym pomieszczeniem
Krzysztof Skalski — 29.08.2022
Do ilu pomieszczen potrzebujesz?
Tez mam yamahe, dwie strefy osobno sterowane i mozliwosc dwoch zrodel dzwieku na kazdą
Zawsze mozna druga strefe podzielić przekaznikami na rozne pomieszczenia  😉

pszafer — 29.08.2022
chromecast zapewne tylko Zone1; chyba że w nowszych modelach to poprawili

pszafer — 29.08.2022
czyli Chromecast nie ma

tomasz.kakiel — 29.08.2022
To najtaniej symfonisk z ikea. Gośniki sufitowe wymagają źróde dźwięku. Pojedyncze sterowanie każdego gośnika, to raczej na zasadzie wącz i wyacz.
Systemy multiroom nigdy tanie nie byy
```

http://www.aval.com.pl/index.php?podstawowe-pojecia-pa
https://www.dysten.pl/naglosnienie-krok-po-kroku/
https://www.dysten.pl/system-naglosnienia/

sonos
dsp

* to sie nazywa
  * systemy PA
  * strefowy odtwarzasz cieciowy

* zyla 10-20cm od pradowych aby nie szumialo
* [BluOS](https://bluos.net/) wydaje sie byc standardem przesylu jakiego szukam
  * ciezko znalexc jakies info ale ma api wg tego: https://manuals.plus/m/3239197ecdbd2e099bcbad72ce6b3e8ab75997626adad256077ee2714b15af7b


Yamaha:
* XDA-QS5400RK
  * 13k https://www.ceneo.pl/85902993
  * do szafy rack 19”
  * niedostepny obecnie ;/
  * https://europe.yamaha.com/en/products/audio_visual/multi-room_amplifiers/xda-qs5400rk/index.html

[Power Dynamics PDV550M](https://www.ceneo.pl/33446746#tab=spec) za 2.5k

https://s4home.pl/wzmacniacze-tranzystorowe/yamaha-xda-amp5400rk.html
https://www.tophifi.pl/glosniki/glosniki-instalacyjne/yamaha-ns-aw194.html


rozwiązania które wygladaj dobrze:
* https://hifi24.pl/axium-mini-4-amm2-4-strefowy-ukryty-system-audio.html
  * 4 zony po 30w x2 glosniki/zona
  * 8400zl
  * wyglada solidnie i jak cos mocno sieciowego, o co mi chodzi

* [Bluesound B400S 4 strefowy odtwarzacz sieciowy - 1/3 U]
(https://hifi24.pl/bluesound-b400s-4-strefowy-odtwarzacz-sieciowy-1-3-u.html)
za 7400 zl

* Monitor Audio
  * [Monitor Audio IMS-4 + IA60-12 + 12x gośniki CSS 233]
  (https://hifi24.pl/monitor-audio-ims-4-ia60-2-zestaw-mutiroom-6-stref-z-glosnikami.html)
  za 37 600 zl
    * 4 niezalezne strefy wejscia
    * sam sterownik za 16k, ale ciezko ustalic jakie inne glosniki dac
    * 1U, 43.1 x 438 x 236.1 mm
    * 2U, 97.2 x 438 x 427 mm
    * lacznie 3U, glebokosc 430mm
    * 5cm glosniki, ale gdzie je wsadzic?


  * ew podbny ale 4 srefy, zamisat 6:
  [Monitor Audio IMS-4]
  (https://hifi24.pl/monitor-audio-ims-4-strefowy-odtwarzacz-plikow-audio-dzieki-bluos-moze-przesylac-strumieniowo-sygnal-audio-do-czterech-oddzielnych-stref.html)
    * [xxx]
    (https://www.monitoraudio.com/pl/serie-glosnikow/streamery-wzmacniacze/ims-4/)

  * IMS-4 powinien wspópracować ze wzmacniaczem instalacyjnym, takim jak nasz IA150-8C.

  * mozna dojsc do wniosku ze naglosnienie strefowe to sa defacto 2 moduly: streamer  i wzmacniacz

# Szafy Rack 19"
* szafe czy rame 19" (jak to wietrzyc?) a w niej
  * switch zrzadzalny PoE 19" 1U (np https://allegro.pl/oferta/switch-cisco-3750v2-48ps-s-48-fe-4-sfp-poe-l3-1u-6956495762),
  * server NAS 2U (np https://www.synology.com/pl-pl/products/RS1221+),
  * UPS 2U (ok 2000VA np https://www.x-kom.pl/p/545721-zasilacz-awaryjny-ups-power-walker-line-interactive-2200va-1320w-4x-iec-lcd-avr.html),
  * nagośnienie strefowe 3U, 48cm glebokosci


uchwyty rack:
* 1U == 44,5 mm;
* 8U za 141zl:  https://allegro.pl/oferta/uchwyt-scienny-rack-19-8u-497x400-240-czarny-12297628384?utm_feed=aa34192d-eee2-4419-9a9a-de66b9dfae24&utm_term=desc-yes&utm_source=google&utm_medium=cpc&utm_campaign=_elktrk_komputery_akcesoria_pla_pmax&ev_campaign_id=17966335850&gclid=Cj0KCQjwmdGYBhDRARIsABmSEeNh0NcumJuJ8R1Ze3eqGM3MGC6IH7gxs0x7chzL4cJbslFrDE_vSGsaAlJaEALw_wcB
  * - regulowana gębokość od 240mm do 400mm - za mala!!!
  * 365 mm

* 44,5 * 12 = 534

mniej niz 50cm szerokoci i 45cm gleboskoci
https://allegro.pl/oferta/szafa-rack-19-6u-450mm-metal-czarna-rc19-6u-450mb-10824228394
https://allegro.pl/oferta/szafa-rack-wiszaca-19-cali-9u-glebokosc-450-czarna-12402031172

wymiary oczekiwane:
* wokosc: 55cm
* szerokosc: 50+
* glebnosckosc: 47cm+


# Szafy Rack, wybor do wneki

----
to moze byc zajebiste:
https://akustyk.pl/blog/news/nowosci-caymon-stelaze-rack-19-opr-zawieszane-szafy-rack-19-npr-stelaze-nabiurkowe-rack-19-tpr

## Caymon - dobre produkty
OPR412
Stelaż rack 19"
12 U
558 x 520 x 450 mm
OPR412
https://caymon.eu/products/d/opr412---wall-mounted-19inch-open-frame-rack---12-unit---450mm- disconituned

re[placed with
https://caymon.eu/products/s/racks/open-frame-racks/opr-series
https://caymon.eu/Products/d/opr312a---19inch-in-depth-adjustable-open-frame-rack---12-unit---300-~-450mm
	520 x 558 x 300~450 mm (W x H x D) (excl. rubber feet)

tu jest dostepna
https://www.morele.net/szafa-caymon-wiszaca-19-12u-opr512a-b-8542010/
https://kami.sklep.pl/import-z-systemu-magazynowego/847653-caymon-opr512a-b-19-in-depth-adjustable-open-frame-rack-12-unit-500-700-mm-black.html


ew ta jest jeszcze glebsza
https://caymon.eu/Products/d/opr512a---19inch-in-depth-adjustable-open-frame-rack---12-unit---500-~-700-mm
520 x 558 x 500~700 mm (W x H x D) (excl. rubber feet)


# Samodzielnie zrobienie szafy rack z gootwyhc czesci

# Konsultacja
wykonanie:
* zwyklego robotnika do wykonania, platne jak w google opisane
* konsultacja z kilkoma specami z fixly co ciekawie gadaja

1) projekt rodzielnicy
2) rozrysowac mi bruzdy
3) co z tym co jest zrobione - co z peszlami, co pod sufitem
4) czy moge rozbierac sciane i stawiac od nowa zostawiajac obecne kable
5) czy trasa kablowa na korytarzu, co z kablem w pawlaczu
6) gdzie zrobic otwory na kable do rozdzielnicy
7) skonsultowac lokaliacje gniazedk i przelacznikow
8) jak robic bruzdy
9) jak przewody do sufitu
10)

przygotowanie na takie spotkanie:
1) jakie czesci elektryczne juz mam
2) ja sam potrzebuje spiac czym chce sterowac smart home - sciemnianie swiatlem, bone.io, etc. ile modulow maja urzadzenia i jakie. co ma byc w rodzielnicy
3)


# sieć światowodowa
elektryk zaproponowa mi rozpowadzenie swiatlowodu w domu
https://www.youtube.com/watch?v=F2KfEqBOhMM
https://www.youtube.com/watch?v=_sbo4PJjMAs - tutaj od polowy opowiada o swiatlowodze
https://onninen.pl/artykul/praca-ze-swiatlowodem-wszystko-co-musisz-wiedziec

KLD Kabel (światowodowy) Lłatwego Dostępu
ma iles zyl w srodku, puszcza sie pod sufitem, jak bedzie trzeba to mozna wyciagnac
https://www.cdr.pl/p7533,opton-vertix-wd-notksd-kabel-swiatlowodowy-latwego-dostepu-24j-24x9-125-itu-t-g-657-a2.html

Nie ma tego w sklepach ale sa rozglalezienia do tych KLD:
* https://www.prysmiangroup.com/en/en_telecom-solutions_optical-connectivity_racks-and-rack-mounted_wall-mounted-racks_WM041-04.html (i inne z tej strony, idac nizej w related proucts)
* http://brightstarbah.com/product.php?id=30


# czego nauczylem sie z elektrykiem?

## rozporadzwnie swiatla na suficie
zacznikmy od tego ze mam male mieszkanie, nie chcialem robic wielkich bruzd na kable, a jakbym rozpinal takie ilosci oswietlenia na osobne kable 3x1.5 lub 5x1.5 to by byla gruba wizka przewodow, czego musielismy uniknac ze wzgledu na ograniczenia konstrukcji i estetyczne

1) mam duzo sterowalnych swiatel, najlepszym sposobem aby polozuc do nich duzo kabli jest **przewod sterowniczny** np 20G1,5 ktory daje nam 20 zyl, 19 oznaczonych numerami i 1 PE.
przewody oznacza sie <ilosc_zyl>G<grubosc_zyly> czyli np 20G1,5 to 20 zyl po 1.5mm2

2) W puscze nad suyfitem podwieszanym rozdzialamy takie kable na wszystkie swiatla.
Interesuje nas puszka odgalezna / rozglezna z zaciskami rzedowymi albo po prostu puszka z szyna DIN na ktora montujemy zlaczki wago
https://www.hensel-electric.eu/pl/produkte/index.php?IdTreeGroup=7615&IdProduct=12460

3) te puszke sufitowa ukrywamy pod: plafonem albo rozeta, w ten sposob puszka jest nie widoczna (!) a my mamy okienko rewizyjne do przepinania kabli, mozemy do punkot swiatla pusicc nadmiarowe przewody (np do kazdej lampy 5x1.5mm2), nawet ich obecnie ich nie podpiac ale na przyszlosc moc przepinac

4) w moim mieszkaniu, w wiekszych pomieszczeniach planowane sa po 2 duze swiatla, mocujac pod nimi palafony moge miec 2 puszki rozlozone symetrycznie w centrym pokoju, co daje mi doskanala przestrzen do przepinania i przeciagania kabli po suficie jakbym mi sie cos umyslilo

5) do zrodel swiatla 220V puszczam jeden kabel sterowniczy, do zrodl LED (24V u mnie) puszczam 2gi kabel aby nie mieszac napiec, podobnie 2 osobne puszki ale obok siebie

6) podobno tego rodzaju instalcje (z puszka na suficie) robia w skandynawii, podobno oni tam nawet gniazk spinaja, caly pokoj na jednej puszcze po plafonem lub rozeta; natomiasty u mnie beda tylko switatla w ten sposob

7) pociagne do tej puszki extra przewody ETH cat 5 na potrzebny ew czujnikow lub innych urzadzen smart - mozna podpisac urzadzenia 12-24v jak np czujnik ruchu, dymu itd jak i podlaczyc urzedzenie ETH np po PoE wiec daje to duza elastycznosc. ja puszcze 2 takie na sufit, moze kiedys sie przyda a raczej nie zaszkodzi

## rozprowadzenie przwodu po scianie
zadecydowalem ze nie bede sterowal gniazdkami osobno
praktywka pokazuje ze raczej nie jest to potrzebne, a jesli jest to ciezko przewidziec ktore to bedzie gniazdko
i mozna wowczas np zamienic gniazdko na smart komunikaujace sie wireless albo do gniazdka wlaczyc przelaczni
natomiast co zrobic aby moc latwo przebudowywac instalacje gniazdek na dole?
tutaj dobre tipy od mojego elektryka:
* latwiej przebudowac instalacje elektryczna na dole, niz na goze, kliencie sie czesciej i latwiej godza bo jest niej kucia, latwiej tez czyms zastawic sciane jesli sie ladnie nie wygipsuje nawet
* dlatego powinn osie miec kabel 220V i ETH puszczony dolem, ciagiem gniazdek, aby mozna bylo go przeciac i wstawic extra gniazdo jesli jest to potrzebne
* wies schodzimy sobie z gory na dol, na wysokosc 30cm i robimy tu pierwsze gniazdo (pod kablem schodzacym z gory)
* dalej idziemy w prawa czy lewa i po drodze robimy gniazda; jesli bdede potrzebowal extra gniazda, przecinam kable, wierce puszke i sztukuje i lece dalej

uwazam ze zaproponowany system jest rzeczywiscie calkiem elastyczny pod katem potencjalnej przyszej rozbudowy/przebodowy, a to wlasnie gniazdka sa tym czego moze najbardziej potrzebowac, wszstko inne robi sie w miare bezprzewodowe, ale gniazdek potrzeba coraz wiecej



# ukladnie przewodow elektrycznych
jest seria artykolow jak rozmieszczac je
https://budujemydom.pl/instalacje/instalacje-elektryczne/a/19833-gdzie-najlepiej-ukladac-przewody-elektryczne

dodam ze u mnie w budynku jest strop gestozebroty dz-3 terriva
w zwaizku z tym kucpie w posadzce nie ma wiekszego sensu bo on juz jest ciekie
nie ma tez sensu kucie w suficie bo jest super cieki
dlatego tez robie sufit podwieszany i wszystkie przewody pod sufitem
i w pionie w dol sciagm

ogolnie o instalacji elekteycznej, jak robic:
https://budujemydom.pl/instalacje/instalacje-elektryczne/a/25087-nowoczesna-instalacja-elektryczna-jak-ja-wykonac
https://budujemydom.pl/instalacje/instalacje-elektryczne/a/11687-czeste-bledy-przy-wykonywaniu-instalacji-elektrycznej

# sufity podwieszane
jak wspomnialem elektryka bedzie w suficie podieszanym, dlatego tez caly rozdzial dedykuje sufitom i co ciekawego mozna z nimi zrobic

know-how:
https://ardant.pl/blog/jak-zamontowac-ciezka-lampe-lub-zyrandol-w-suficie-podwieszanym/
