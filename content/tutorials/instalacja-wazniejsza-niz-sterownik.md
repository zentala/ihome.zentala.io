---
title: "Sterownik wymienisz, kabli w ścianie wolałbyś nie - jak mądrze zaplanować elastyczną instalację Smart Home"
description: "Dlaczego przy budowie Smart Home struktura instalacji elektrycznej jest ważniejsza niż wybór sterownika? Sterownik można wymienić, ale kabli w ścianach już nie. Praktyczne porady jak zaprojektować instalację IoT na lata."
summary: "Co wziąć pod uwagę przy budowie Smart Home z myślą o przyszłości? Dowiedz się dlaczego warto skupić się na strukturze kabli, oznaczeniach i zapasowych przewodach... i być gotowym na ewentualną modernizację sterownika w przyszłości."
# thumb: "https://static.zentala.io/boneio/bone-esp32-2.jpg"
date: 2024-03-14T03:50:44+02:00
lastmod: 2024-03-14T03:50:44+02:00
draft: false
weight: 50
categories: ['Smart Home']
tags: ['instalacja elektryczna', 'kable', 'IoT', 'BoneIO', 'projektowanie', 'modernizacja', 'rozdzielnica', 'przewody zapasowe']
contributors: ['Paweł Żentała']
pinned: false
homepage: false
url: "/strukura-instalacji-wazniejsza-niz-sterownik/"
aliases: ["/tutorials/instalacja-wazniejsza-niz-sterownik/"]
seo:
  title: "Future-proof instalacja Smart Home - jak zaplanować okablowanie raz a dobrze" # custom title (optional)
  description: "Sterownik można wymienić, kabli w ścianach już nie. Praktyczny poradnik jak zaprojektować elastyczną instalację Smart Home gotową na przyszłe technologie IoT." # custom description (recommended)
  canonical: "" # custom canonical URL (optional)
  noindex: false # false (default) or true
---

Jako programista IoT oceniam, że w 2024 roku rynek inteligentnych domów jest wciąż na wczesnym etapie rozwoju. Obecnie powstają głównie rozwiązania, które opłaca się tworzyć ze względu na skalę - wystarczająco uniwersalne, by kupowało je wiele osób. Gdy popularność Smart Home wzrośnie, pojawią się bardziej różnorodne, niszowe rozwiązania dopasowane do konkretnych potrzeb. Dziś takie specjalistyczne produkty są albo bardzo drogie (bo robione na zamówienie dla majętnych), albo w ogóle się ich nie opłaca produkować.

Na rynku mamy więc kompromisy: drogie systemy pudełkowe (zamknięte, nie do customizacji) lub otwarte rozwiązania społecznościowe (customizowalne, ale niekompletne). Idealnego sterownika po prostu jeszcze nie ma.


## Kto buduje inteligentne domy
Inteligentne domy budują sobie głównie programiści albo majętni ludzie. Majętni bo ich stać na rozwiązania z pudełka i są w stanie wydać extra kasę na podniesiony komfort życia, zaś programiści bo wiedzą co jest możliwe i mają wizję aby poeksperymentować sobie z inteligentnym mieszkaniem.

Jest jeszcze 3cia grupa - interesująca się nowinkami - bardziej pragmatyczna, która jednak na ogół idzie w rozwiązania bezprzewodowe. Dla niej w ogóle stworzyłem artykuły "Smart Home w wersji minimum" oraz "Tani i Prosty Inteligentny Dom". Dzielę się tam swoimi przemyśleniami jak zbudować prostą i efektywną kosztowo instalację - co poradziłbym osobom nietechnicznym planującym mieszkanie. Opisuję tam co łatwo i tanio można wdrożyć, też jak czasem dzięki kładzeniu kabli na etapie budowy można później oszczędzić na bezprzewodowych rozwiązaniach. Tej grupie polecam przeczytać moje artykuły z których dowiedzą się co jest tanio możliwe, a po co nie warto sięgać aby mierząc siły na zamiary mogli zdecydować się na to co jest prosto wdrożyć.

## Czym się kierowałem w wyborze sterownika?
Każdej z tych grup poleciłbym coś nieco innego. Natomiast ja jako programista chcący eksperymentować miałem pewien zestaw kryteriów:

{x} dokumentacja - Kiedy patrzysz na dokumentację sterowników na ogół wiele tam nie ma bo prawdę mówiąc te sterowniki są słabo udokumentowane bo są względnie proste i nie ma tam co dokumentować. Jest kilka opcji do których aby się dostać i tak pewnie będziesz potrzebował kwadransu kogoś bardziej doświadczonego. Dlatego ja nie zwracam uwagi na dokumentację.

To co liczy się to:
{v} stabilność działania
{v} otwartość oprogramowania (możliwość własnych modyfikacji i integracji),
{v} pomoc jaką możesz dostać od społeczności.

Omówmy dokładniej te punkty:

Stabilność działania z oczywistych przyczyn - trzeba wybrać coś z czego korzystali już inni i mają dobre opinie, a przynajmniej to istnieje na rynku i nie ma złych opinii :)

Otwartość oprogramowania - z powodu jej braku powstał BoneIO i jest to bardzo ważny czynnik jeśli chcemy mieć smart home tani i elastyczny (rozbudowywalny). Za jakiś czas możesz chcieć coś zmienić lub dodać, a produkty mocno komercyjnych firm będą miały drogie komponenty albo będą chciały dużo za customizację oprogramowania.

Pomoc jest bardzo ważna, może najważniejsza. Dlatego wybrałem Bone.IO bo podobała mi się jej społeczność. Widziałem jeszcze inny polski system który też ma fajną społeczność i jest nieco bardziej rozwinięty, więc prawdopodobnie dziś zdecydowałbym się na niego ale prawdę mówiąc - nie robi to dużej różnicy.

## Dlaczego struktura instalacji jest ważniejsza niż sterownik?
Ponieważ idealne rozwiązanie w moim mniemaniu nie istnieje - bo smart home to rynek rozwijający się - jestem zwolennikiem poglądu, że ważniejsze od wyboru sterownika SH jest zaprojektowanie instalacji w taki sposób, aby sterownik dało się wymienić i zastąpić innym. Co kilka lat wymieniamy telefony i komputery, technologia zmienia się z roku na rok. Czemu nie mielibyśmy wymienić w przyszłości sterownika smart home? Uważam że będziemy to robić, stąd struktura instalacji IoT powinna być na tyle elastyczna aby się dało. **Sterownik można zmienić, ale tego co położysz w ścianie - kabli - już nie.**

## Na jakim etapie rozwoju jest rynek inteligentnych domów?
Moim zdaniem smart home jest mniej więcej na takim etapie rozwoju jak urządzenia AGD w czasach wynalezienia silnika elektrycznego. Używano go głównie do mielenia ziarna w młynach elektrycznych i cięcia drewna w tartakach. Ktoś tam wymyślił pralkę, ale wielu pytało po co to? Trzeba prąd podłączać do domu a i przecież można prać ręcznie, c'nie? Nie wiedzą jeszcze że za niedługo przyjdzie mikser, maszynka do mięsa a w przyszłości AGD zrewolucjonizuje thermomix.

Podobnie jest z inteligentnym domem 2024 roku - wizjonerzy wiedzą że smarthome wchodzi i będzie się rozwijać, technologia (metaforyczny silnik) już jest, ale znalezienie sposobów jego wykorzystania w bardziej kreatywny i ambitny sposób jest jeszcze przed nami!

Stąd powinieneś zakładać że smart home się zmieni, co więcej nie wiadomo jak. IoT ewoluuje, potrzeby się zmieniają, rozwiązania techniczne się zmieniają. Dlatego nie warto w niego przeinwestowywać, a jednocześnie warto starać się go budować (na tyle na ile to możliwe, bo nie wiemy co się pojawi) tak, aby dało się go skonfigurować w inny sposób. **Kluczem jest modyfikowalność i edytowalność systemu.**

Korzystając dalej z metafory silnika - jacyś kolesie w garażu zbudowali już prototyp miksera, ale to dopiero prototyp i nie ma wygodnej obudowy i nie pojawi się na rynku. Podobnie dziś np. w inteligentnych domach nie ma dobrych sterowników oświetlenia - ściemniaczy oraz sterowników RGBWA LED po to aby dom mógł np. komunikować się z Tobą światłem albo tworzyć nim nastrój. Owszem da się coś takiego zaaplikować, ale jest to na tyle nie dopracowane, na tyle ma ograniczone możliwości (np. do konkretnego rodzaju źródła światła) i w dodatku brakuje do tego oprogramowania którym by się to skonfigurowało bez umiejętności programowania, że w związku z tym wdrażanie takiego zaawansowanego oświetlenia jest na tyle karkołomne we wdrożeniu, że nie opłaca się tego robić jeśli nie jestem informatykiem który ma ochotę się z tym bawić i de facto wymyślać jak to zrobić.

Bo to Ci informatycy którzy dziś się tym bawią wypracują standardy i pomysły na wykorzystanie tych technologii. Np. mówisz coś do asystenta głosowego a on potwierdza że zaczął słuchać delikatnym sygnałem świetlnym (np. nieco się rozjaśnia), albo potwierdza że przyjął coś i wykonuje 2-ma mrugnięciami zamiast gadać do Ciebie, co jest niezbyt fajne moim zdaniem jeśli nie konieczne.

Więc Ci informatycy dzisiaj którzy na tym sprzęcie jaki już jest, bo da się to złożyć z komponentów jakie są, budują z tego systemy które pewnie kiedyś się przyjmą są jak ludzie którzy z silnika zbudowali mikser, bo ktoś pierwszy raz musiał wymyślić jak zrobić z tego silnika system składający się z wymiennych mieszadeł i korpusu oraz jakiejś tam regulacji obrotów.

## Zalecenia przy budowie smart home

### Proste i pewne rozwiązania
Stąd - dla przeciętnego zjadacza mrożonego chleba - owszem warto **skorzystać ze sprawdzonych, prostych rozwiązań** w zakresie smarthome, ale warto zdawać sobie sprawę gdzie są te niskowiszące jabłka, a gdzie są fantazje dla wizjonerów i twórców, po które nie warto sięgać. I warto też **zdawać sobie sprawę że w przyszłości mogą pojawić się nowe zastosowania, nowe rewolucyjne sterowniki IoT** itd. do smarthome. To może być za 5-10-20 lat. I warto **mieć gotową infrastrukturę pod te przyszłe rozwiązania**. Nie wymaga to znaczących nakładów, a jedynie nieco pracy na właściwe zaprojektowanie i opisanie jej - aby mieć infrastrukturę na tyle czytelną i PROSTĄ aby dało się podłączyć pod nią cokolwiek.

### Oznaczenie przewodów
Bo pomyśl - jaki jest największy koszt przebudowy instalacji IoT w istniejącym mieszkaniu? To remont. Kucie kabli w ścianach. Kurz i brud. Wymiana czy dokładanie nowych przewodów. **Nie chcesz kuć w ścianach!** Możesz zmienić urządzenia po obu stronach kabla, ale nie chcesz wymieniać kabla - tak powinieneś myśleć o instalacji budując smart home. W związku z tym **dobrze** [**oznacz przewody po obu stronach** za pomocą drukarki etykiet](), bo za 20 lat nie będziesz pamiętał który do czego.

### Mapa instalacji

Ponadto mając na uwadze że mogą pojawić się nowe urządzenia **zapewne gdzieniegdzie zostawisz nadmiarowe kable na zapas. W szczególności kable elektryczne**. Bo o ile urządzenia IoT mogą komunikować się bezprzewodowo ze sobą, to braku kabla z napięciem niczym nie zastąpisz. **Musisz też położyć zapasowe kable myśląc o ewentualnym zapasie** - potrzeby się zmieniają!

## Do czego warto położyć nadmiarowe kable
* **Rolety elektryczne wewnętrzne** - np. nie ma dziś na rynku atrakcyjnej oferty rolet wewnętrznych sterowanych przez smarthome. Ale kiedyś taka oferta się pojawi bo technologia istnieje, po prostu jeszcze nie stworzono produktów. Dlatego ja zdecydowałem się położyć kable zasilania do puszek podtynkowych obok okien. Rolety mogą się komunikować bezprzewodowo ale prądu bezprzewodowo nie prześlemy.

Tak warto myśleć o przyszłej potencjalnej modernizacji kładąc kable. Warto rozważyć czy w przyszłości nie chcielibyśmy jakiegoś feature i czy w związku z tym nie chcemy gdzieś zostawić kabla na zapas.

* **Siłowniki do (drzwi i) okien** - pada deszcz, chcesz zamknąć automatycznie okno. Dziś nie ma takich rozwiązań albo są diabelnie drogie ale stawiam że za 30 lat będą dość tanie. Po fortunie którą wydamy na transformację energetyczną i ograniczanie kosztów zużycia energii takie siłowniki mogą stać się dość popularne a wraz z nimi spadnie ich cena.

* **Zamki w drzwiach** - żałuję że nie położyłem kabla 2x1 do każdego zamka drzwi, z czasem z pewnością łatwiej będzie je otwierać elektrycznie. Czasami mógłbyś chcieć zamknąć drzwi do pokoju z łóżka, albo wpuszczając kogoś do mieszkania podczas swojej nieobecności odciąć drogę do jednego pokoju. Nie mówiąc już o drzwiach wejściowych - może fajnie byłoby pozwolić kurierowi wejść do mieszkania i zostawić paczkę na podłodze podczas wakacji. Albo umożliwić awaryjne wejście do mieszkania dozorcy w razie awarii np. instalacji wodnej.

* **Podjazdy dla wózków inwalidzkich** - niezwiązane z IoT ale żyjemy w starzejącym się społeczeństwie i szczególnie na klatkach warto zabezpieczyć prąd na windę dla wózków, poza tym każdy może ulec kiedyś jakiejś kontuzji (mam nadzieję że nie)

Nie są to obowiązkowe rzeczy ale warte rozważenia, szczególnie jeśli pracujesz w [systemie mikrorozdzielnic]() i w związku z tym nie masz dużo przewodu do pociągnięcia.

Dodatkowo zawsze można dorzucić skrętkę telekomunikacyjną. Natomiast najważniejszy jest prąd. Tam gdzie możemy chcieć coś podłączyć zawsze przyda się prąd. Np. jeśli nie wiesz czy będziesz chciał coś podłączyć w suficie podwieszanym zawsze możesz zostawić kable z prądem (odłączony lub zabezpieczony złączkami na końcu), będziesz chciał dodać głośnik - dodasz bezprzewodowy, będziesz chciał dodać extra sensor, podobnie - dodasz bezprzewodowy, będziesz chciał dodać taśmę LED, znów - bezprzewodowa.

## Podsumowanie

Nie wiem czy Bone.IO to najlepszy wybór, prawdę mówiąc nie znalazłem najlepszego wyboru. Nie ma tanich systemów ściemniaczy światła ani tanich rolet wewnętrznych sterowanych elektrycznie. Nie ma dobrych sterowników LED-ów aby można było łatwo osiągać na nich fajne efekty wizualne. Nie da się łatwo scentralizować sterowania oświetleniem świateł. Ale nie są to tylko wady Bone.IO. Po prostu nie bardzo są takie rozwiązania na rynku. Są jakieś zamknięte systemy pudełkowe oferujące tego rodzaju funkcjonalności, ale nie są one na tyle zaawansowane aby biorąc pod uwagę ogromną cenę takich systemów warto było je polecić. Dlatego mówię że idealny sterownik (lub system sterowników) do inteligentnego domu nie istnieje. Przyjdzie nam na niego zaczekać.

**Kluczowa myśl: sterownik można zmienić, ale tego co położysz w ścianie - kabli - już nie.** IoT ewoluuje, potrzeby i rozwiązania techniczne się zmieniają. Nie chcesz kuć w ścianach za kilka lat!

Póki co należy skupić się na:
a) [Niskowiszących jabłkach - minimalnych i tanich do wdrożenia rozwiązaniach IoT](minimalny-dom-io),
b) Mając na uwadze aby projektując instalację [dobrze opisać przewody]() i [zrobić ich solidną mapę](), aby w przyszłości dało się łatwo zmodernizować urządzenia po obu stronach kabla, gdy wyjdą lepsze rozwiązania smart home,
c) A także dołożyć gdzieniegdzie przewody zasilające jeśli liczymy na to że dodamy kiedyś jakieś rozwiązania które technicznie są już możliwe ale póki co nie ma ich na rynku. **Położyć zapasowe kable myśląc o ewentualnym zapasie!**

