---
title: "Strukura instalacji ważniejsza niż sterownik"
description: "Zdecydowałem się na instalację kablowa, ale jest mnóstwo argumentów aby wybrać bezprzewodowe rozwiązania smart home. Zanim zdecydujesz się na prócie wszystkich ścian, powinieneś je rozważyć. Prawdę mówiąc do dziś nie wiem, czy nie popełniłem błędu idąc w kable."
summary: "Istnieje cała masa sterowników na rynku i ważne pytanie brzmi który wybrać. A jeszcze ważniejsze pytanie to: jak zaprojektować dom aby móc go wymienić?"
# thumb: "https://static.zentala.io/boneio/bone-esp32-2.jpg"
date: 2024-03-14T03:50:44+02:00
lastmod: 2024-03-14T03:50:44+02:00
draft: false
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

## Jaki wybrać sterownik intelignetgo domu?

Ja wybralem BoneIO.
Nie wiem czy BoneIO to dobry wybór.
Na pewno nie jest zły.

### Nie ma idealnych rozwiazań SH

Wydaje mi się, że rynek inteigentnych domow i produkow do nich nie jest jeszcze dosc rozwiniety aby moc mowic o idealnych rozwizaniach. Z mojego researchu wykonaneg w 2022 roku wynika, ze nie ma dobrych rozwiazzan (systemow). Sa tylko kompromisy i rozwiania nie dopracowane. Są niezłe i bardzo drogie produkty z pudelka ktorych bym dla siebie nie kupil (bo nie mozna ich customizowac, bo sa zdecydowanie za drogie i nie mam tyle kasy aby przeplacac). Oraz jest szereg bardziej otwartych rozwiazan ktore tez nie sa idealne, a przynajmniej nie stanowia kompleksowego sytsemu, ale sa tworzone przez splecznosc dzieki czemu sa customizowalne i latwo integrowalne.


## Kto buduje inteligente domy
Inteligentne domy buduja sobie glownie programsci alb majetni ludzie. Majetni bo ich stac na rozwiazania z pudelka i sa w stanie wydac extra kase na podniesiony komfort zycia, zas programisci bo wiedza co jest mozliwe i maja wizje aby poekserymentowac sobie z inteligentym mieszkaniem.

Jest jeszcze 3cia grupa - interesujaca sie nowinakami - bardziej pragmantyczna, ktora jednak na ogol idzie w rozwiazania bezprzewodowe. Dla niej w ogole stworzylem artykuly "Smart Home w wersji minimum" oraz "Tani i Prosty Inteligentny Dom". Dziele się tam swoimi przemysleniami jak zbudwac prosta i efektywna kosztowo insalacje -co poradzilbym osobom nie technicznym planujacym mieszkanie. Opisuje tam co latwo i tanio mozna wdrozyc, tez jak czasem dzieki kladzeniu kabli na etapie budowy mozna pozniej oszczedzic na bezprzewodwyhc rozwiazaniach. Tej grupe ppolecam przeczyac moej artykuly z ktorych dowiedza sie co jest tanio mozliwe, a apo co nie warto siegac aby mierzac sily na zamiary mogli zdecydowac sie na to co jest prosto wdrozyc.

## Czym się kierowałem w wyborze sterownika?
Kazdej z tych grup polecilbym cos nieco innego. Natomiast ja jako programista chcacy eksperymentwac mialem prwien zestaw kierowalem sie nastepujacymi kryteriami:

{x} dokumentacja Kiedy patrzysz na dokumentacje sterownikow na ogol wiele tam nie ma bo prawde mowiac te sterowniki sa slabo udokumentwoane bo sa wzglednie proste i nie ma tam co dokumentowac. Jest kilka opcji do ktorych aby sie dostac i tak pewnie bedziesz potrzebowal kwadransu kogos bardziej doswiadczonego. Dlatego ja nie zwracam uwagi na domentacje.

To co liczyc sie to:
{v} stabilnoc dzialania
{v} otwartosc oprogramowania (mozliwosc wlasnych modyfkacji i integracji),
{v} pomoc jaka mozesz dostac od spolecznosci.

Omwmy dokladniej te punkty:

Stabilnosc dzialania z oczywistych przyczyn - trzeba wybrac cos z czego korzystali juz inni i maja dobre opinie, a przynajmniej to istnieje na rynku i nie ma zlych opinii :)

Otwattosc orpgoramoania - z powodu jej braku powstal BoneIO i jest to bardzo wazny czynnik jesli chcemy miec smart home tani i elastyczny (rozbudowywalny). Za jakis czas mozesz chciec cos zmienic lub dodać, a produkty mocno komercyjnych firm beda mialy drogie komponenty albo beda chcialy duzo za customizacje oprogamwania. Natomiast jesli wybierasz

Pomoc jest bardzo wazna, moze najwazniejsza. Dlatego wybralem Bone.IO bo podobala mi sie jej spolecznosc. Widzialem jeszcze inny polski system XXX ktory tez ma fajna spolecznosc i jest nieco bardziej rozwiniety, wiec prawdopodobnie dzis zdecydowalbym sie na niego ale prawde mowiac - nie robi to duzej roznicy.

## Daczego struktura instalacji jest wazniejsza niz sterownik?
Natmiast poniewaz idealne rozwiazanie w moim mniejamniu nie istnieje - bo smart home to rynek rozwijacy sie - to jestem zwolnnikiem pogladu, ze wazniejsze od wyboru sterownika SH, jest projekt instalacji w taki sposb, aby sterownik dalo sie wymienic i zastaapiac innym. Co kilka lat wymieniamy telefony i komputery, technologia zmienia się z roku na rok. Czemu nie mielibysmy wymienic w przyszlosci stwoenika smart home? Uwazam ze bedziemy to robic, stad nowsze ze striktura instalacji IoT powina byc na tyle elastyczna aby sie dalo.

## Na jakim etapie rozwoju jest ryenk intelignetnych domow?
Moim zdaniem smart home jest mniej wiecej na takm etapie rozwoju jak urzadzenia AGD w czasach wynalezienia silnika elektrycznego. Uzywano go glownie do mielenia ziarna w mlycnach elektrycznch i ciecia drewna w tartakach. Ktos tam wymyslil pralke, ale wielu putalo po co to? Trzeba prad podlaczac do domu a i przeciez mozna prac recznie, c'nie? Nie wiedza jeszcze ze za niedlugo przyjdzie mixer, maszynka do miesa a w przyszlosci AGD zrewolucjonizuje thermomix.

podobnie jest z inteligentnym domem 2024 roku - wizjonerzy wiedza ze smarthome wchodzi i bedzie sie rozwijac, technologia (metaformny silnik) juz jest, ale znalezienie sposobw jego wykorzystania w bardziej kreatywny i ambitny sposob jest jeszcze przed nami!

stad powinienes zakladac ze smart home sie zmieni, co wiecej nie waiadmo jak. dlatego nie warto w niego prze inwestowywac, a jednoczesnie warto starac sie go budowac (na tyule na ile to mozliwe, bonie wiemy co sie pojawi) tak, aby dalo sie go skonfigurowac w inny sposob.

korzystajac dalej z metafory slnika - jacys kolesie w garazu zbudowali juz prototyp miskera, ale t dopiero prototyp i nie ma wygodnej obudowy i nie pojawi sie na rynku. podobnie dzis np w inteligentych domach nie ma dobrych sterownikow oswietlenia - sciemniaczy oraz sterwnikow RGBWA led po to aby dom mogl np komunikowac sie z Toba swiatlem albo tworzyc nim nastroj. owszem da sie cos takiego zaaplikowac, ale jest to na tyle nie dopracowane, na tyle ma ograniczone mozliwosci (np do konkrenego rodzaju zrodla swiatla) i w dodaktu brakuje do tego oprogramowania ktorym by sie to skonfugoealo bez umiejetnosci programowani, ze w zwiazku z tym wdazanie takiego zaawansowego oswietlenia jest na tyle karkolomne we wdrozeniu, ze nie oplaca sie tego robic jesli nie jestem informatykem ktory ma ochote sie z tym bawic i defacto wymylac jak to zrobic.

bo to Ci informatycy ktorzy dzis sie tym bawia wypracuja standardy i pomsyly na wykrozystanie tych technologii. np mowisz cos do asystenta glosowanego a on potiwerdza ze zaczal suchac delikatnym sygnalem swietlnym (np nieco sie rozjasnia), albo potwierdza ze przyjal cos i wykonuje 2ma mrugnieciami zamiast gadac do Ciebie, co jest niezbyt fajne moim daniem jesli nie konieczne.

wiec CI infomatycy dzisiaj ktorzy na tym sprzecie jaki juz jest, bo da sie to zlozyc z komponentw jakie sa, budyja z tego systemym ktore pewnie keidys sie przyja sa jak ludzie ktorzy z silnika zbudowali mixer, bo ktos pierwszy raz musal wymyslec jak zrobic z tego silnika system skladajacy sie z wymiennych miesadlem i korpusu oraz jakiejs tam regulacji obrotow.

## zalecenia przy budowie smart home

### proste i pewne rozwiazania
stad - dla przecietnego zjadacza mrozonego chleba - owszem warto **skorzystac ze sprawdzonych, prostych rozwiazan**, w zakresie smarthome, ale warto zdawac sobie sprawe gdzie sa te niskowiszace jablka, a gdzie sa fantazje dla wizjonerow i tworcow, po ktore nie warto siegac. i warto tez **zdawac sobie sprawe ze w przyszlosci moga pojawic sie nowe zastosowania, nowe rewolucujne steronwiki iot** itd do smarthome. to moze byc za 5-10-20 lat. i warto **miec gotowa infrastukrue pod te przyszłe rozwiazania**. nie wyamga to znaczących nakładów, a jedynie nieco pracy na wlasciwe zaprojektowanie i opisanie jej - aby miec infrastukture na tyle czytelna i PROSTA aby dalo sie podlaczyc pod nia cokolwiek.

### oznaczenie przewodow
bo pomysl - jaki jest najwieszy koszt przebudwy instalacji IoT w istniejacy mieszkaniu? to remont. kucie kabli w sciacnach. kurz i brud. wymiana czy dokladnie nowych przewodow. nie chcesz tego. mozesz zmienic urzadzenia po obu stonach kabla, ale nie chcesz wymieniac kabla - tak powinines myslec o instalacji budujac smart home. w zwiazku z tym **dobrze** [**oznacz przewody po obu stronach** za pomoca drukarki etykiet](), bo za 20 lat nie będziesz pamietał który do czego

### mapa instalacji

ponadto majac na uwadze ze moga pojawic sie nowe urzadzenia **zaprewne gdzieniejdzie zostawisz nadmiarowe kable na zas. w szczegolosci kable elektryczne**. bo o ile urzadzenia iot moga komunikwac sie bezprzeowodwo ze soba, to braku kabla z napieciniem niczym nie zamienisz.

## do czego warto polozyc nadmiarowe kable
* **rolety elektryczne wewn** np nie ma dzis na rynku atrkacyjnej oferty rolet wewnatrznych sterowanych przez smarthome. ale kedys tak ofeta sie pojawi bo technolgia istnieje, po prostu jeszcze nie stworzono produktow. dlatego ja zdecydowalem sie polozyc kable zasilania do puszek podtynkowych obok okien. rolety moga sie komunikowac bezprzeowdowo ale pradu bezprzewodowo nie przeslemy.

- tak warto myslec o przyszlej potencjalnej modernizacji kladzac kable. warto rozwazyc czy w przyszlosci nie chcielnbysmy jakiegos feature i  czy w zwiazku z tym nie chcemy gdzie zostawic kabla na zas.

- **siłowniki do (drzwi i) okien** - pada deszcz, chcesz zamknąć automatycznie okno. dzis nie ma takich rozwiazan albo sa diablenie drogie ale stawiam ze za 30 lat beda dosc tanie. po fortunie ktora wydamy na transformacje enegetyczna i ogranicznaie kosztw zuzycia energii takie silowniki moga stac sie dosc popuarne a wraz z nimi spadnie ich cena.

- **zamki w drzwiach** - zaluje ze nie poloylem kabla 2x1 do kazdego zamka drzwi, z czasem z pewnsci bardzie latwiej je otwierac elektrcznie. czasami moglbys chciec zamknac dzwrzi do pokoju z lozka, albo wpuszaajac kogos do mieszkania podczas swojej niebecnosci odciac droge do jednego pokoju. nie mowiac juz o drzwiach wejscowych - moze fajnie byloby pozowlic kurierwi wejsc do mieszkania i zostawic paczke na podlodze podczas wakacji. albo umozliwoc awaryjne wejscie do mieszkania dzorcy w razie awarii np instalacji wodnej.

- **podjazdy dla wozkow inwalidzkich** niezwiazane z IoT ale zyjemy w starzejacym sie spoleczenstwie i szczegolnie na klatkach warto zabezpieczyc prad na winde dla wozkow, po za tym kazdy moze ulec kedys jakies kontuzji (mam nadzieje ze nie)

nie sa to obowiazkowe rzeczy ale warte rozwaznia, szceglnie jesli pracujesz w [systemie mirkorodzielnic]() i w zwiazku z tym nie masz duzo przewdu do pociagniecia.

dodatkowo zawsze mozna dorzucic skretke telekomunikacyjna. natomiast najwazniejszy jest prad. tam gdzie mozemy chciec cos podlaczyc zawsze przyda sie prad. np jesli nie wiesz czy bedziesz chcial cos podlaczyc w sfucie podwieszanym zawsze mozesz zostac kable z pradem (odlaczaony lub zabezpueczny zlaczmaki na kncu), bedziesz chcial dodac glosnik - dodasz bezprzewodowy, bedziesz chcial dodac extra sensor, podobnie - dobasz bezprzewodowy, bedziesz chcial dodac tasme led, znow - bezprzewodowa

## pdsumwanie

ne wiem czy czy bone.io to najlepszy wybor, prawde mowiac nie znalazlem najlepzego wyboru. nie ma tanich systemow sciemniaczy swiatla ani tanich rolet wewnetrznych sterwnych elektrycznie. nie ma dobrych sterownikow ledow aby mozna bylo latwo osiagac na nich fajne efekty wizualne. nie da sie latwo scentralizoac sterowania oswietniem swiatal. ale nie sa to tylko wady bone.io. po prostu nie bardzo sa takie rozwiaazania na rynkku. sa jakies zamkniete systemy pudelkowe oferujace tego rodzaju funkcjonalnosci, ale nie sa one na tyle zaawansowe aby biorac pod uwagre ogromna cene takich systemow warto bylo je polecic. dlatego mowi ze indealny sterownik (lub system sterownikow) do inteligentego domu nie istnieje. przyjdzie nam na niego zaczekac. poki co nalezy skupic sie na
a) [nisko wiszacych jablkach - minimalnych i tanich do wdrozenia rozwiazaniach iot](minialny-dom-io),
b) majac na uwadze aby prjektujac instalacje [dobrze opsac przewody]() i [zrobic ich solidna mape](), aby w przyszlosci dalo sie latwo zmoderunowc urzdzenia po obu stronch kabla, gdy wyjdna lepsze rzwaizania smart home,
c) a takze dolozyc gdzeniegdzie przewody zasilajace jesli liczymy na to ze dodamy kiedys jakies rozwiazania ktore technicznie sa juz mozliwe ale poki co nie ma ich na rynku

