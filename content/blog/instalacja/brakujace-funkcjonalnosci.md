---
title: ""
description: ""
summary: ""
thumb: ""
date: 2023-09-07T16:27:22+02:00
lastmod: 2023-09-07T16:27:22+02:00
draft: true
weight: 50
categories: ['Smart Home']
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

## Brakujące rozwiązania do inteligentego domu

zauwaam ze duzo funkcjonalnosci smarthom ktore bym chcial i ktore sa do zrobienie jesce nie ma, nie ma zestandaryzowanych rozwiazan aby bylo wiadomo jakie przewody pod to zostawic. 

o tym bedzie ten artykul - o toym jakie problemy i braki napotkalem budujac inteligentny mieszkanie, oraz kich rozwiazan bym oczekiwal i jak bym je zaprojektowal w przyszlosci - gdybym mial biznes projektujacy osprzed do inteligentnych domow to jaka archiekture bym wam zaproponowal - porzedstawiam wizje na ekosystem produktow IoT  i w jaki sposob mozna za pomoca ich tworzyc domy

koncepscja mikro rozdzilnic
ograniczenie ilosci kabli do mimnimum
standardyzacja rozwiazan
mirkoro rodzielnice (obudpwe, puszke) mozna obsadzic wieczekiem 3-4mm ponizej tynku i zatynkowac, albo dac te 5mm glebsze wieczeko lub dzwiczki i zostawic widoczne z zewnatrz 

## Sterowniki / Ściemnicze LED
Jest malo i sa slabe. Potrzebujemy moc robic abymacje LEDami. 

# Sciemniacze zarowek 250v

tez jest malo, niejasnej jakosci, nie ma systrmu montowania



## Kontroler Okna

Instalowany w pobliżu okna sterownik obsługujący okno:
* rolety wewnetrzne 
* rolety zewnętrze
* kontaktorny (rozwarcia i uchylne)
* cujniki drgania
* silniki zasłon
* siłowniki do elektronicznego otwierania okna

Dodatkowo dobrze aby do takiego sterownika dało się podłączyć coś extra:
* kamerę zenętrzną
* zewnątrzna stację pogodową
* zewnetrzna syrene alarmowa

Taki sterownik instalowałby się blisko zespołów okien, a do samego sterownika prowadziało tylko przewody zasilania i telecom. ...albo nawet jedna sretka laczaca przewody zasilania i telecom; wówcas do kazdego okna prowadzialoby sie jeden przewod do kontrolera a od konteolera mozna byloby zostawiac duzo krotkich przewodow do przyszlych potencjalnych instalacji.

### Silniki do rolet i zaluzji wewnetrznych

Szcególnie takich gdzie sterownik jest po za urzadzeniem. Oczekujemy od wewnetrzej roliety czy zaluzji ze bedzie malutka, w zamian za to mozemy podlczac przewod z zasilaniem. 

W ogole jakbym byl producentem okien albo jako taka firma IoT SmartHome bym przejal sobie producenta okien czy czy wzial jakies udzialy i zainwestowal w produkcje  okien z przylaczeniami do elektrcznych rolet/zaluzji wewnetrznych, wówczas sam koszt okna nie rosnie znacaco (tylko dodatkowe przewody i zlacza), ale jest mozliwosc podlaczenia bezposrednio pod zasilanie sterujace takiego urzadzenia zaciejmniajcego oraz dodatkowo wlozenia bezposrednio w ramy okna prylasczy do czujnikow lub nawet jakis czujnikow (np czy roleta todarla do dolu). 


## Dyskretne gniazdo scienne i sufitowe

Budujes sobie intelignetny dom i nie bedzies mocowal od razu wszystkich inteligentnych bajerow. Nektoeych nie zainstalujesz moze nigdy. Ale ju polozyles do nich kable, na zapsas. Lepiej polozzy tera ni pozniej kuc, mowia. Ale te kable wystaja ze sciany, spod tynków. Kable do przyszlych czujnikow ruchu wisza zz sufitu. A jasli teraz chce polozyc kable pod rolety ale jescze min kilka lat ich nie kupie. Co wystajacymi z kablami? Co z nimi zrobic?

Obecnie aby zostawic sobie mozliwosc podlaczenia rolet okiennych w przyszlosci doprowadilem przewody do glifow okiennych, wykulem w nich puszki i zostawilem w nich przewody, a same puszki zatynkowalem. Przydalby sie laczniki, gniazda ktore mozna latwo zatynkowac a pozniej tylko zamocowac przedlyzke i zostawic taka zatyczke mala okragla tylko aby moc dostac sie do gniazda. Gniazda do podlaczenia np czujnikow ruchu na suficie, kamer, opcjonalnych rzeczy. 

Gniazda musialby miec mala srednice, okolo 1cm i zakladaloby sie ze to sa gniazda do wpiania, ze zadko cos tam wypinaly albo wypinamy, i ze one sa do polaczen IoT ze scianami. Takie ganizda musialnby wystepowac w wersji wodoodpoernej (deszz, snieg) oraz musialby miec zzatyczki ktore sa praektycznie na rowni ze sciana i ktore mozna malowac. musalby muec tez jakis element w srdku np rfid aby je latwo lokalizowac w scianie w przyszlosci. 

Takie rozwiazanie umozliwiloby planowanie inteligetnych rozszezalnych domow - gdzie juz teraz kladziemy Ci wiekszosc instalacji pod bardo inteligenny dom, ale w przyszlosci mozesz sobie dokladac urzadzenia. 

Na przyklad gdzies przy oknie zamocowal bym w puszce glebokiej w scianie ten steronik okna na synie DIN, powiedzmy 6DIN.

Stamtąd rozprowadzilbym kable do wszystkich obslygiwanych przylaczen - rolety wewnętrzne, zewnętrzbe, alarmy, etc. 

Takie rzecy jak czujniki drgania czy kontraktony ze wzgledu na niska cene moglibysmy instalowac domyslnie. Przyslodby sie z producentamiu okien wyprowacowac stantard zlacza do okna i aby oni juz mocowali czujniki samodzielnie. To nie powinno byc drogie ale nie ma standardu - jesli na oknie mialonby byc wystarndardyowane zlacze np 10cm od dolu z prawej strony patrzac od wewnatrz, to jakie ono mialoby pinout... 

Z kolei do zewnętrznych urządzeń zamocowałbym gniazda (zaprojektowane tak aby nadawaly sie do montarzu podtynkowo), a po otynkowaniu wyddlubujemy troche zaprawy, zdejmujemy zatyczke, zakladamy specjalna przedluzke (przycianana na gleboskoc sciany) z docelowa zatyczka i zostawil takie przylacza dookola okna aby w przyszlosci podlaczcyc sobie rolety czy sterowniki. 

Developerzy budujac mieszkania wiedziliby aby przy kazdym oknie zamocowac mala puszke na mikrorozdzielnice np. 6-12DIN, która też by była wystandaryzowana pinoutem (czy oznaczenami pinów). Taka puszka w kazdym razie to tylko puszka, wiec mialaby byc tania, a do niej mozna by wkladac sterowniki gdy potrzebne. Mozna by tez latwo zaktualizowac sterowniki

## Sterowniki do drzwi wewetrznych i zewnetrznych

Do drzwi wewnetrnzych nie istnuluje sie na ogol nic, a jesli juz  to kontaktron. A ja mam mieszkanie w Warszawie, mysle aby okresowo wynajmowac 1 lub oba pokoje na AirBnB (gdy mnie nie bedzie) i przydalby mi sie dodatkowo:
* elektrozameki sterowane centralnie
* czytkik RDFI do szybkiego odblokowywania swoich drzwi

Moze nigdy nie bede wynajmowac mieszkania na AirBnB, ale jesli bede chcialbym moc otwierac je i zamykac elektromagnetczynie.

Do tego, do drzwi także przydałbt się sterownik. Aby nie ciagną przewodu od zamka do drzwi. W ogole najlepiej aby sterownik byl w okolicy drzwi gdzie chcemy zamiescic ew panel sterownia nimi (np pinpad), wowczas w razie potrzeby dodatnia takeigo panelu, podlaczy sie go bepzostednio do puszki drwi.

Tak wiec wprowadzilbym puszke drzwi, z wymiennym sterownikiem drzwi, obslugujacym kontaktorny, czujnikik drgan (próby wyważena monitoruje), elekttrozamek, czytnik rfid oraz pinpad, jakis touchscreen, czytnik palców - wymienne interfaces. 

Do drzi wejściowych pewnie także integracja z kamerą, wbudowanych w drzwi wizjerem, etc.

W razie potrzeby (jesli bediesz chcial dodac jakas elektronike jeszcze do drzwi) mozes wkuc kabel od sterownika do dodawanego elementu, raczej to bedzie blisko, a nie musisz sie martwic jak dostarczyc kablel z rozdzielnicy i go maskowac. Ale zakladam ze na ogol juz po prostu domyslnie bys polozyl ten 1m przewodu do elektrozamka, gdyby byla taka puszka, bo to jest nic po prostu.

PO za tym tutaj tez oracowlalbysmy jakis standard pinoutu z producemtasmi drzwi, a nawet dotarczali im support i podzewspoly jak obsadzac kontraktowny i czujniki dragan i elektrozamki itd w produkowanych drzwuach.

W pryszlosci majac puske na sterownik przy dzrzwiach (moze nawet 2 bo z obu stron czasami) mozna latwo iterowac z rozna elektronika do drzwi. Mozna tez przemyslec przewody do drwi aby byly uniewersalne i future proof i je zamorowac. 

### Elektromechaniczne intelignetne zamki

Aby zarówno dalo sie podlaczyc do przekaznika (NZ), jak i otowrzyc za pomoca wkładki.
Obsuga wielu rygli.

## Wizja integracji rynku produktow budowlanych

Naszym celem byłoby doprowadzenie takiej puszki i pryłączy obok drzwi aby w mieszkaniach wyposarzonych w taka infrasturkure drzwi staly sie customiowalym produktem IoT od producentów. Podobnie okna. Chcemy napedzeic rynek IoT do budowlanki. Budujemy warunku i standardy ora rozwiazania aby producemci okien i drzwi mogli w wystadaryzowany sposob odferowac eleastyczne rowiazania dla inteligenych budynkow.

## Mirko rozdzelnice

Zrobilem w swoim mieszkaniu system mikrorozdielnic i mysle ze ma on totalnie sens a nawet nalezaloby go rozwijac. [Co to sa mikrorodzielnice w smarthome przeczytasz tutaj]().

Gdybym mial finansowanie postawilbym firme produkujaca ekosystem rozwiazan do smarrhome opaertych na mikrorodzielnicach.

Ja u siebie np w mikrorodzielncach (puszka z szyna DIN, na niej zlaczki szynowe i blokowe) polaczylem punkty oswietleniowe z przewodem sterowniczym 12x1.5mm2  ktory szedl do sterownika rozdzielnicy. W ten sposób znacac oganiczylem ilosc przewodow oswietleniowych go glownego steronika oswietlenia w rodzielnicy.

Podobnie skretki z przelacnikow i czujnikow puscilem do puszek ze zlaczkami LSA. Dzieki takeru rozwiazaniu jedna skretka do rodzielnicy obsluguje kilka czujnikow/przelacznikow.

Projektowalbym byc tanie modulowe, puszki rozdzielcze do IoT w systmie mikrorodzielnic. 

Opracowabym systm mikrorodielnic do domow i mieszkan i promowal instalacje w tym systemie jako future proof i latwy do rozbudowy,. Jednoczesnie upewnilbym sie ze podstawe funkcje jak sterownie oswietleniem sa tanie w tym systemie.

## Przelaczniki do 24V

Jednym ze spposob w jaki taki ekosystem moglby byc tanszy i konkurencyjny w stosunku do klasycznej elektryka sa przyciski. Obecnie prycski do zapalania swiatel projektuje sie po 250V co wiaze sie z normami, odpowiednio duza iloscia stali, bezpiecenstem, etc.

Projekujacac przyciski do IoT pod 24V moga one byc duzo bardiej roznorodne, miec wiecej przyciskow i wiecej funkcji. takie Funkcje jak np regulacja natezenia swiatla (rotary switch) moga byd duzo tansze (obescnie sciemniacz to min 50 usd) bo funckje sciemniania spelnia sciemniac w rodzielnicy, a tu w przycisku mamy tylko prosty rotarty switch za 1 usd.

Mozna by wiec projektowaniac tanie ale i bardziej zlozone oraz infoametywne panele i przyciski. 

Trzeaba by stworzyc warunki do tego. uwazam ze nalezalobty miec zlacze do skertek dopuszkowe, i kilka standardow komunikacji, analogowy, jakis cyftowy jak rs485 etc

Aby ludzie mogli latwo eksperymentowac z przyciskami do IoT. 

[A o samych customizowalnych przelacznikach do Smart Home piszę tutaj]().

## Wizja IoT

Mamy dom modularny, Modul przy kazdym zestawie okiennym, przy kazdych drwiach. Modyly mikrorodzielnic - jedna do oswietlnie na np 10 puntkow, jedna do przlacznikow i czujnikow podobnie. W ten sposob mamy po donu stosunkowo malo kabli do rozpuszcenia oraz latwa mozliwosc modernizacji w przyszlosci. 

Przedstawioene standardyzacje tworza rynek dla calej gamy rozwiazan IoT. Najchewtniej to opracowalbym takie standarzyacje jako jakies konsorcjum firm lub z czasem po prostu jako firma IOT przejmowal firmy produkuajce wyposarzenie - okna, rolety, drzwi - i dodawal do nich elementy IoT i sprzedawal calosc jako ekosystem.

Jako pierwszego klienta dla tego ekossytemu wybralbym sobie lokalne na wyjanem krotko i dlugotemrinowny, bo jako wlasciciel takiego lokalu chcesz miec jego monitoring, a jako gosc cenisz sobie udogodnienia, szcegolnie jak jestes zabiegany w trasie.
