---
date: 2023-09-07 16:13:18+02:00
description: Reference pages are ideal for outlining how things work in terse and
  clear terms.
contributors: ['Paweł Żentała']
draft: false
lastmod: 2023-09-07 16:13:18+02:00
menu:
  docs:
    identifier: docs-d0974f0bad7ee208
    parent: ''
seo:
  canonical: ''
  description: Prąd stały i przemienny - kompleksowy opis Więcej informacji na smart
    home znajdziesz w naszym serwisie.
  noindex: false
  title: Prąd stały i przemienny | Dokumentacja - ihome.zentala.io
summary: ''
title: Prąd stały i przemienny
toc: true
weight: 100
---


{{< callout context="danger" title="Uwaga, niebezpieczenstwo." icon="alert-octagon" >}}
Alert: nie pwinienes zabierac sie za jakakoleiek elektryke jesli nie rozumiesz dobrze tych pojec poniewaz grozi to w najelspzym wypadku uszkodzeniem urzadzenn i niestabilnoscia instalacji, a w najgorszzym stworzeniem zagrozenia dla siebie i innych.
{{< /callout >}}

## Moc = Napięcie * Natężenie

 Watt to podstawoa jednostka mocy jaka powinienes sie poslugwac. **moc wyrazone w Wattach to uniwersalna miara tego ile energii wymaga zasilenie urządzenia elektrycznego**, dlatego np w watach rozlicza się energie elektryczna z dostawca energii elektrycznej*, podobnie jak [konsumbcje energii elektrycznej urzadzenn elektrycznych podaje sie w Watach]()

Moc to napiecie pomnozone przez natezenie:
```
napiecie [wyrażone w Voltach ] * natężenie [wyrażone w Amperach ] = moc [wyrażona w Watach]
```


{{< math class=text-center >}}
$$
I[] * U = P[ower]
$$
{{< /math >}}

 ```

 ```

Czyli będziesz konsumował tyle samo prądu dostarczajac proporcjonalnie wiecej napiecia lub wiecej natezenia, np:

| przy napieciu | i nateżeniu | pobieżemy mocy | [równanie] |
| --- | --- | --- | --- |
| 12 Volt | 2 Aamper | 24 Watt |  {{< math >}}$12V * 2A = 24W${{< /math >}} |
| 24 Volt | 1 Aamper | 24 Watt | {{< math >}}$24V * 1A = 24W${{< /math >}} |
| 48 Volt | 0.5 Amepera | 24 Watt | {{< math >}}$48V * 0.5 = 24W${{< /math >}} |

Za kazdym razem pobralismy tyle samo mocy aby zasilić urządzenie.
Dlatego właśnie podaje sie moc urządzeń w Watach, po to abyś wiedział [ile max zapłacisz za jego używanie](#rozliczenie), bez wzgledu na to na ilu voltach pracuje.

Powinienes zapiamiecac: moc wyrażna Watem jest ostatcznym miernikiem mocy. Dlatego wlasnie poslugujamy sie pojeciem mocy np mowiac 600W odkurzacz (powinien byc silniejszy niz 350W ale pobierze wiecj pradu), albo mowimy o mocy paneli slonecznych podajac takie wartosci jak 450, 500, 600W (maksymalna moc mozliwa do wygenrowania). Napiecie i natezenie sa skladowymi mocy.


``` info / smart
swoja droga jest to bardzo zyciowy przypadek i budujac smart home bedziesz musial wiele razy wykonywac kalkulacje na takich napieciach, np po to aby obliczyc moc zasilacza do ledow lub do sterownika inteligentego domu, ktore pracuja na napieciiach 12 lub 24V.

masz 8 czujnikow na 12V oznaczone 0.5A, 3 czujniki 12V 1A, 3 zawory elektryczne 12V 12W (nie jest napisane ile A) oraz sterownik Bone.io na 12V pobieracy max 24W. skad bedziesz wiedzial jaki zasilacz kupic do tych wszystkich urzadzen aby wystarczylo mocy na zasilenie ich wszystkich? .... bla bla bla

pnadto napieicia do 48 Voltów uznaje sie za [napiecie bezpieczne](). oznacza to ze porazona takim napiecie nie dozna uszczebku na zdrowiu. m.in. mozesz spotkac sie z gniazdkami do golarek elekrczynych na 24V, które zostały zainstalowane w czasach kiedy nie bylo jeszcze urzadzen bateryjnych. pracuja one wlasnie na napieciu 24V aby zwiekszyc bezpieczenstwo uzytkownika golacego sie w poblizu wody i w przypadky przebicia uniknac porazenia mogacego prowadzic do uszczebrku na zdrowiu. to wlasnie mam na mysli mowiac ze napiecia ponize 48V sa bezpiecznie - nawet w przypadku porazenia nic powaaznego Ci sie nie stanie.

z napieciem do 48V mamy do czynienia w (PoE \(Power over Ethernet\))[] czyli przesylaniu energii kablem sieciowym (skretka), obok danych. (skretka nje wykorzystuje wszystkich 8 zyl do kominiakcji)[], w zwiazku z czym mozemy przeslac prad tymi nie uzywanymi. PoE to standard zasilania urzadzen takich jak routery czy kamery IP za pomoca tego samego przewodu ktorym komuunikuja sie one z internetem. wyonbraz sobie ze chcesz zainstloac routter wifi w miejscu do ktorego doprowadzony jest kabel sieciowy ale nie ma doprowadzonego zasilania, a nie chcesz prowadzic dodatkowych kabli, ktore nie wygladaja zbyt esteczynie. wowczas wlasnie uzyjesz [adapterów PoE]() ktore pozwola Ci zasilic takie urzadzenie bez doprowadznaia dodatkowego kabla elektrycznego.

```

## Praktyczne konotacje

stad nie wazne czy w sieci masz napiecie 240V jak w Europie czy 110V jak w USA i Japonii - to moc urzadzen bedzie taka sama dla tych krajów, poniewaz moc jest miara tego ile energii wymaga zasilenie urzadzenia.

 po prostu w USA potrzebujemy grubszych kabli bo przesylajac energiie z niszym napieciem, bedzie ona musiala zostac skompenswana wyzszym natezeniem, co obrazuje wzór:

 ```
 napiecie [V] * natezenie [A] = moc [W]
 ```

skroro w USA mamy o ppolowe nizsze napiecie (110V zamiast 220V), a uzarzenie do pracuy potrzebuje te sama ilosc mocy, to majac instalacje o polowe nizszym napieciu, aby przeslac te sama moc musimy 2x zwikezzyc naterzenie, czyli:
* w USA: `110V napiecia sieciowego * 9 amperów natezenia = 1000 Watt konsumowanej mocy`
* w eurpeie `220V napiecia sieciowego * 4.5ampera natezenia = 1000 Watów konsumowanej mocy`

## przekształcenia
Wyliczylem te natezenia przkształacajac powyzszy wzór w nastepujacy sposob:

 ```
napiecie * natezenie = moc
napiecie * natezenie = moc  /:napiecie
natezenie = moc / napiecie
```

obrazuje to ten trojkat

[wstawic obrazek]

mozemu z niego wyczytac 3 wzory:

```
napiecie * natezenie = moc
natezenie = moc / napiecie
napiecie = moc / natezenie
```

powiedzmy ze thermomix zuzywa 1000W mocy
majac sie

## Jednostki

Poznałes juz podstawowe jednostki.

## Rozliczenia z elektrownia w kWh - co to?

## Natezenie a spadki napiecia
