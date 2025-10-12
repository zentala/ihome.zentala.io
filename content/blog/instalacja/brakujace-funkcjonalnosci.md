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

Zbiór pomysłów na produkty i systemy, które mogą zmienić sposób, w jaki projektujemy inteligentne domy. To nie są gotowe rozwiązania - to inspiracje dla producentów elektroniki IoT, którzy chcą wypełnić luki rynkowe i tworzyć przyszłość smart home.

## Ewolucja w architekturze - od gwiazdy do drzewa

### Problem statement

Remontując swoje mieszkanie, najbardziej bolało mnie stosowanie wszędzie architektury gwiazdy - dziesiątki kabli biegnących z każdego pomieszczenia do centralnej rozdzielnicy *jak promienie słońca*.

**W nowych budynkach:** Owszem, można robić sufity podwieszone i prowadzić kable nad nimi, ale to oznacza to ukrywanie tras kablowych.

**W starych budynkach:** Brak sufitów podwieszanych = brak miejsca na ukrycie dziesiątek przewodów. Modernizacja do smarthome wymagała ode mnie wywiercenia przepustów otworncą oraz [zaprojektowania sufitu otwartego na korytarzu]().

**Nieefektywność kosztowa i środowiskowa:** Prowadzenie setek metrów przewodów po całym domu to marnotrawstwo materiałów, pracy i pieniędzy. Plus ogromny ślad węglowy. To nieefektywne, drogie i nieprzyszłościowe.

### Solution

Zamiast ciągnąć kilka skrętek z każdego pomieszczenia, pociągniemy jedną. Zamiast kilku linii 250V do punktów światła, ciągniemy jedną linię zasilającą. Lokalny sterownik w pomieszczeniu obsługuje wszystko na miejscu, komunikując się z centrum przez MQTT, ale zachowując podstawową funkcjonalność nawet przy awarii sieci.

### Sterownik do pomieszczeń - koniec z kablomazią

**Problem:** W salonie mam 5 punktów światła, 3 przełączniki i 2 czujniki ruchu. W obecnej architekturze to oznacza 10 skrętek biegnących do rozdzielnicy głównej.

**Rozwiązanie:** Mikrorozdzielnica w pomieszczeniu z modułowym sterownikiem.

**Jak to działa:**
- Do pomieszczenia ciągniesz tylko: 1 skrętkę (dane) + 1 linię zasilającą 16A/2.5mm²
- Linia 16A spokojnie zasili 5-10 nowoczesnych lamp LED (są energooszczędne!)
- Sterownik lokalnie obsługuje wszystkie przełączniki, czujniki i oświetlenie
- Komunikacja z centrum przez MQTT
- **Kluczowe:** Podstawowe funkcje działają nawet przy awarii sieci (kliknięcie przełącznika = zapalenie światła)

**Modułowość to klucz:**
- Mikro (3 wejścia/2 wyjścia) - łazienka, garderoba
- Średni (6 wejść/4 wyjścia) - sypialnia, biuro
- Duży (9 wejść/6 wyjść) - salon, kuchnia
- Wielki (12 wejść/8 wyjść) - przestrzenie otwarte

**Korzyści finansowe:**
- Oszczędność na przewodach (mniej kabli = mniej pracy instalatora)
- Łatwiejsza instalacja (jeden punkt zamiast dziesiątek)
- Przyszłościowość (łatwa rozbudowa przez wymianę modułów)

### Sterownik do okien - inteligentne zarządzanie oknami

Instalowany w pobliżu okna sterownik obsługujący okno:
* rolety wewnętrzne
* rolety zewnętrzne
* kontaktron (rozwarcia i uchylne)
* czujniki drgania
* silniki zasłon
* siłowniki do elektronicznego otwierania okna

Dodatkowo dobrze, aby do takiego sterownika dało się podłączyć coś extra:
* kamerę wewnętrzną
* zewnętrzną stację pogodową
* zewnętrzną syrenę alarmową

Taki sterownik instalowałby się blisko zespołów okien, a do samego sterownika prowadziłyby tylko przewody zasilania i telecom. Albo nawet jedna skrętka łącząca przewody zasilania i telecom; wówczas do każdego okna prowadziłby się jeden przewód do kontrolera, a od kontrolera można by zostawiać dużo krótkich przewodów do przyszłych potencjalnych instalacji.

**Ten sam koncept, zastosowany do okien.**

Zamiast ciągnąć osobne kable do:
- Rolety zewnętrznej
- Rolety wewnętrznej
- Czujnika otwarcia
- Czujnika drgań
- Przyszłej kamery

**Montujesz mikrorozdzielnicę okienną w ścianie przy oknie:**
- 1 kabel zasilający + 1 skrętka danych
- Sterownik na szynie DIN (6-12 modułów)
- Wszystkie urządzenia okna podłączasz lokalnie krótkimi przewodami
- Komunikacja z centrum przez MQTT
- Lokalna inteligencja (np. zamknij rolety przy silnym wietrze, nawet bez internetu)



**Wizja współpracy z producentami okien:**
Wyobraź sobie okna z fabrycznie zamontowanymi złączami standardowymi. Producent okien wie, że 10cm od dołu z prawej strony jest zawsze złącze X do czujników, a 15cm od góry złącze Y do rolet. To otwiera rynek na ekosystem urządzeń okiennych.



## Zaawansowane sterowanie/animowanie oświetlenia

### Sterowniki/ściemniacze LED - czas na rewolucję

**Problem:** Obecne sterowniki LED są prymitywne. Chcemy animacji jak w klubach, ale w domu.

**Rozwiązanie:** Sterowniki LED z protokołem DMX lub podobnym, modulowe, pasujące do naszego systemu mikrorozdzielnic.

**Wizja przyszłości:**
- Oświetlenie jako interfejs domowego AI
- System AI komunikuje się przez głośniki, ale też przez światło
- Pulsujące światło = powiadomienie
- Zmiana kolorów = różne tryby domu (praca, relaks, przyjęcie)
- Animacje światła = instrukcje (np. migające światło prowadzi do wyjścia ewakuacyjnego)

### Ściemniacze żarówek 250V - modułowość przede wszystkim

**Problem:** Mało opcji, niejasna jakość, brak systemu montażu.

**Rozwiązanie:** Modulowe ściemniacze pasujące do mikrorozdzielnic, z możliwością sterowania sieciowego (może też DMX?).

---

### Silniki do rolet i żaluzji wewnętrznych

Szczególnie takich, gdzie sterownik jest poza urządzeniem. Oczekujemy od wewnętrznej rolety czy żaluzji, że będzie malutka, w zamian za to możemy podłączać przewód z zasilaniem.

W ogóle, jakbym był producentem okien albo jako taka firma IoT Smart Home, przejąłbym sobie producenta okien czy wziął jakieś udziały i zainwestował w produkcję okien z przyłączeniami do elektrycznych rolet/żaluzji wewnętrznych. Wówczas sam koszt okna nie rośnie znacząco (tylko dodatkowe przewody i złącza), ale jest możliwość podłączenia bezpośrednio pod zasilanie sterujące takiego urządzenia zaciemniającego oraz dodatkowo włożenia bezpośrednio w ramy okna przyłączy do czujników lub nawet jakichś czujników (np. czy roleta dotarła do dołu).


## Dyskretne gniazdo scienne i sufitowe

Budujesz sobie inteligentny dom i nie będziesz mocował od razu wszystkich inteligentnych bajerów. Niektórych nie zainstalujesz może nigdy. Ale już położyłeś do nich kable, na zapas. Lepiej położyć teraz niż później kuć, mówią. Ale te kable wystają ze ściany, spod tynków. Kable do przyszłych czujników ruchu wiszą z sufitu. A jeśli teraz chcę położyć kable pod rolety, ale jeszcze min. kilka lat ich nie kupię. Co z wystającymi kablami? Co z nimi zrobić?

Obecnie, aby zostawić sobie możliwość podłączenia rolet okiennych w przyszłości, doprowadziłem przewody do glifów okiennych, wykułem w nich puszki i zostawiłem w nich przewody, a same puszki zatynkowałem. Przydałyby się łączniki, gniazda, które można łatwo zatynkować, a później tylko zamocować przedłużkę i zostawić taką zatyczkę małą okrągłą tylko, aby móc dostać się do gniazda. Gniazda do podłączenia np. czujników ruchu na suficie, kamer, opcjonalnych rzeczy.

Gniazda musiałyby mieć małą średnicę, około 1cm i zakładałoby się, że to są gniazda do wpiania, że rzadko coś tam wypinamy albo wpinamy, i że one są do połączeń IoT ze ścianami. Takie gniazda musiałyby występować w wersji wodoodpornej (deszcz, śnieg) oraz musiałyby mieć zatyczki, które są praktycznie na równi ze ścianą i które można malować. Musiałyby mieć też jakiś element w środku, np. RFID, aby je łatwo lokalizować w ścianie w przyszłości.

Takie rozwiązanie umożliwiłoby planowanie inteligentnych rozszerzalnych domów - gdzie już teraz kładziemy Ci większość instalacji pod bardzo inteligentny dom, ale w przyszłości możesz sobie dokładać urządzenia.

Na przykład gdzie przy oknie zamocowałbym w puszce głębokiej w ścianie ten sterownik okna na szynie DIN, powiedzmy 6DIN.

Stamtąd rozprowadzałbym kable do wszystkich obsługiwanych przyłączeń - rolety wewnętrzne, zewnętrzne, alarmy, etc.

Takie rzeczy jak czujniki drgania czy kontaktrony ze względu na niską cenę moglibyśmy instalować domyślnie. Przydałoby się z producentami okien wypracować standard złącza do okna i aby oni już mocowali czujniki samodzielnie. To nie powinno być drogie, ale nie ma standardu - jeśli na oknie miałoby być wystandaryzowane złącze np. 10cm od dołu z prawej strony patrząc od wewnątrz, to jakie ono miałoby pinout...

Z kolei do zewnętrznych urządzeń zamocowałbym gniazda (zaprojektowane tak, aby nadawały się do montażu podtynkowego), a po otynkowaniu wydłubujemy trochę zaprawy, zdejmujemy zatyczkę, zakładamy specjalną przedłużkę (przycinaną na głębokość ściany) z docelową zatyczką i zostawiłbym takie przyłącza dookoła okna, aby w przyszłości podłączyć sobie rolety czy sterowniki.

Developerzy budując mieszkania wiedzieliby, aby przy każdym oknie zamocować małą puszkę na mikrorozdzielnicę np. 6-12DIN, która też by była wystandaryzowana pinoutem (czy oznaczeniami pinów). Taka puszka w każdym razie to tylko puszka, więc miałaby być tania, a do niej można by wkładać sterowniki gdy potrzebne. Można by też łatwo zaktualizować sterowniki.

## Sterowniki do drzwi wewnętrznych i zewnętrznych

Do drzwi wewnętrznych nie instaluje się na ogół nic, a jeśli już, to kontaktron. A ja mam mieszkanie w Warszawie, myślę, aby okresowo wynajmować 1 lub oba pokoje na AirBnB (gdy mnie nie będzie) i przydałby mi się dodatkowo:
* elektrozamki sterowane centralnie
* czytnik RFID do szybkiego odblokowywania swoich drzwi

Może nigdy nie będę wynajmować mieszkania na AirBnB, ale jeśli będę, chciałbym móc otwierać je i zamykać elektromagnetycznie.

Do tego, do drzwi także przydałby się sterownik. Aby nie ciągnąć przewodu od zamka do drzwi. W ogóle najlepiej, aby sterownik był w okolicy drzwi, gdzie chcemy zamieścić ew. panel sterowania nimi (np. pinpad), wówczas w razie potrzeby dodania takiego panelu, podłączy się go bezpośrednio do puszki drzwi.

Tak więc wprowadzałbym puszkę drzwi, z wymiennym sterownikiem drzwi, obsługującym kontaktron, czujniki drgań (próby wyważenia monitoruje), elektrozamek, czytnik RFID oraz pinpad, jakiś touchscreen, czytnik palców - wymienne interfejsy.

Do drzwi wejściowych pewnie także integracja z kamerą, wbudowanym w drzwi wizjerem, etc.

W razie potrzeby (jeśli będziesz chciał dodać jakąś elektronikę jeszcze do drzwi) możesz wykuć kabel od sterownika do dodawanego elementu, raczej to będzie blisko, a nie musisz się martwić, jak dostarczyć kabel z rozdzielnicy i go maskować. Ale zakładam, że na ogół już po prostu domyślnie położyłbyś ten 1m przewodu do elektrozamka, gdyby była taka puszka, bo to jest nic po prostu.

Po za tym tutaj też opracowywałbysmy jakiś standard pinoutu z producentami drzwi, a nawet dostarczali im support i podzespoły, jak obsadzać kontaktrony i czujniki drgań i elektrozamki itd. w produkowanych drzwiach.

W przyszłości mając puszkę na sterownik przy drzwiach (może nawet 2, bo z obu stron czasami) można łatwo iterować z różną elektroniką do drzwi. Można też przemyśleć przewody do drzwi, aby były uniwersalne i future proof i je zamurować.

### Elektromechaniczne inteligentne zamki

Aby zarówno dało się podłączyć do przekaźnika (NZ), jak i otworzyć za pomocą wkładki.
Obsługa wielu rygli.

## Wizja integracji rynku produktów budowlanych

Naszym celem byłoby doprowadzenie takiej puszki i przyłączy obok drzwi, aby w mieszkaniach wyposażonych w taką infrastrukturę drzwi stały się customizowalnym produktem IoT od producentów. Podobnie okna. Chcemy napędzić rynek IoT do budowlanki. Budujemy warunki i standardy oraz rozwiązania, aby producenci okien i drzwi mogli w wystandaryzowany sposób oferować elastyczne rozwiązania dla inteligentnych budynków.

## Mikro rozdzielnice

Zrobiłem w swoim mieszkaniu system mikrorozdzielnic i myślę, że ma on totalnie sens, a nawet należałoby go rozwijać. [Co to są mikrorozdzielnice w smart home przeczytasz tutaj]().

Gdybym miał finansowanie, postawiłbym firmę produkującą ekosystem rozwiązań do smart home opartych na mikrorozdzielnicach.

Ja u siebie np. w mikrorozdzielnicach (puszka z szyną DIN, na niej złączki szynowe i blokowe) połączyłem punkty oświetleniowe z przewodem sterowniczym 12x1.5mm2, który szedł do sterownika rozdzielnicy. W ten sposób znacząco ograniczyłem ilość przewodów oświetleniowych do głównego sterownika oświetlenia w rozdzielnicy.

Podobnie skrętki z przełączników i czujników puściłem do puszek ze złączkami LSA. Dzięki takiemu rozwiązaniu jedna skrętka do rozdzielnicy obsługuje kilka czujników/przełączników.

Projektowałbym być tanie modulowe puszki rozdzielcze do IoT w systemie mikrorozdzielnic.

Opracowałbym system mikrorozdzielnic do domów i mieszkań i promował instalacje w tym systemie jako future proof i łatwy do rozbudowy. Jednocześnie upewniłbym się, że podstawowe funkcje jak sterowanie oświetleniem są tanie w tym systemie.

## Przełączniki do 24V

Jednym ze sposobów, w jaki taki ekosystem mógłby być tańszy i konkurencyjny w stosunku do klasycznej elektryki, są przyciski. Obecnie przyciski do zapalania świateł projektuje się po 250V, co wiąże się z normami, odpowiednio dużą ilością stali, bezpieczeństwem, etc.

Projektując przyciski do IoT pod 24V mogą one być dużo bardziej różnorodne, mieć więcej przycisków i więcej funkcji. Takie funkcje jak np. regulacja natężenia światła (rotary switch) mogą być dużo tańsze (obecnie ściemniacz to min. 50 USD), bo funkcję ściemniania spełnia ściemniacz w rozdzielnicy, a tu w przycisku mamy tylko prosty rotary switch za 1 USD.

Można by więc projektować tanie, ale i bardziej złożone oraz informatywne panele i przyciski.

Trzeba by stworzyć warunki do tego. Uważam, że należałoby mieć złącze do skrętek dopuszkowe i kilka standardów komunikacji, analogowy, jakiś cyfrowy jak RS485 etc.

Aby ludzie mogli łatwo eksperymentować z przyciskami do IoT.

Przełączniki powinny mieć też opcję modułowego dołączenia czujników np. temperatury i wilgotności, do sterowania klimą.

[A o samych customizowalnych przełącznikach do Smart Home piszę tutaj]().

## Wizja IoT

Mamy dom modularny. Moduł przy każdym zestawie okiennym, przy każdych drzwiach. Moduły mikrorozdzielnic - jedna do oświetlenia na np. 10 punktów, jedna do przełączników i czujników podobnie. W ten sposób mamy po domu stosunkowo mało kabli do rozpuszczenia oraz łatwą możliwość modernizacji w przyszłości.

Przedstawione standardyzacje tworzą rynek dla całej gamy rozwiązań IoT. Najchętniej to opracowałbym takie standardyzacje jako jakieś konsorcjum firm lub z czasem po prostu jako firma IoT przejmował firmy produkujące wyposażenie - okna, rolety, drzwi - i dodawał do nich elementy IoT i sprzedawał całość jako ekosystem.

Jako pierwszego klienta dla tego ekosystemu wybrałbym sobie lokale na wynajem krótko i długoterminowy, bo jako właściciel takiego lokalu chcesz mieć jego monitoring, a jako gość cenisz sobie udogodnienia, szczególnie jak jesteś zabiegany w trasie.

## Dla producentów IoT - szansa na rynek

**Te pomysły to nie science fiction. To luki rynkowe czekające na wypełnienie.**

Jeśli jesteś producentem elektroniki IoT i widzisz potencjał w tych rozwiązaniach:

**Zacznij od jednego elementu:**
- Mikrosterownik pomieszczenia (najprostszy do zrealizowania)
- Modulowe sterowniki LED z DMX
- Standardowe złącza do okien (współpraca z producentami okien)

**Kluczowe cechy sukcesu:**
- Modułowość (różne rozmiary, łatwa rozbudowa)
- Standardyzacja (pinouty, złącza, protokoły komunikacji)
- Lokalna inteligencja (działanie bez internetu)
- Otwarte protokoły (MQTT, DMX, RS485)

**Rynek czeka na lidera,** który pierwszy zrozumie, że przyszłość smart home to architektura drzewa, nie gwiazdy.

---

*Masz pytania o te koncepcje? Chcesz przedyskutować możliwości techniczne? Napisz - chętnie podzielę się szczegółami implementacji.*
