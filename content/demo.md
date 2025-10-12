---
date: 2023-09-07 16:33:54+02:00
description: Markdown demo - kompleksowy opis Więcej informacji na smart home znajdziesz
  w naszym serwisie.
contributors: ['Paweł Żentała']
draft: false
lastmod: 2023-09-07 16:33:54+02:00
lead: ''
seo:
  canonical: ''
  description: Markdown demo - kompleksowy opis Więcej informacji na smart home znajdziesz
    w naszym serwisie.
  noindex: false
  title: Markdown demo | Dokumentacja - ihome.zentala.io
title: Markdown demo
---


## Inline styles
Text can be **bold**, _italic_, or ~~strikethrough~~.

You can [link to another page](/contact/).

You can highlight `inline code` with backticks.

I need to highlight these <mark>very important words</mark>.

H<sub>2</sub>O and X<sup>2</sup>

That is so funny! :joy:

## Markdown

| Syntax      | Description |
| ----------- | ----------- |
| Header      | Title       |
| Paragraph   | Text        |

Here's a sentence with a footnote. [^1]

[^1]: This is the footnote.

term
: definition

- [x] Write the press release
- [ ] Update the website
- [ ] Contact the media
{.list-unstyled}

## Blockquotes

> This is a blockquote, which is commonly used when quoting another person or document. Blockquotes are indicated by a `>` at the start of each line.

## Callouts

{{< callout note >}} This is a note callout. Example text to show it in action. {{< /callout >}}

{{< callout context="note" title="Note" icon="info-circle" >}}
Doks is a documentation website toolkit built with Hyas. You can get started with this command:

```bash
npm create hyas@latest -- --template doks
```

{{< /callout >}}

{{< callout context="tip" title="Did you know?" icon="rocket" >}}
Hyas simplifies developer on boarding time and makes for faster collaboration by using a single declaration manifest for [dependencies](https://docs.gethyas.com/concepts/dependencies/).
{{< /callout >}}

{{< callout context="caution" title="Caution" icon="alert-triangle" >}}
If you are not sure you want an awesome docs site, think twice before using [Doks](https://getdoks.org/).
{{< /callout >}}

{{< callout context="danger" title="Danger" icon="alert-octagon" >}}
Your users may be more productive and find your product easier to use thanks to helpful Doks features.

- Clear navigation
- User-configurable color theme
- [i18n support](/docs/guides/i18n/)
{{< /callout >}}

## Details

{{< details "Details" >}}
Something small enough to escape casual notice.
{{< /details >}}

{{< details "Start in open state" open >}}
This Boolean attribute indicates whether the details — that is, the contents of the \<details> element — are currently visible. The details are shown when this attribute exists, or hidden when this attribute is absent. By default this attribute is absent which means the details are not visible.
{{< /details >}}



## Tabs

{{< tabs "create-new-site" >}}
{{< tab "npm" >}}

```bash
npm create hyas@latest
```

{{< /tab >}}
{{< tab "pnpm" >}}

```bash
pnpm create hyas@latest
```

{{< /tab >}}
{{< tab "Yarn" >}}

```bash
yarn create hyas
```

{{< /tab >}}
{{< /tabs >}}

## Tabler Icons

Theme is using [Tables Icons](https://tabler.io/icons) that you can embbed.

{{< inline-svg "coffee" >}}

{{< inline-svg src="hand-rock" stroke-width="1" stroke="#ee52b7" height="3rem" width="3rem" class="svg-inline-custom" >}}

## Math

Read more in [Dosk Math](https://getdoks.org/docs/built-ins/math/) docs.


```math
$$
\frac{1}{\Gamma(s)}\int_{0}^{\infty}\frac{u^{s-1}}{e^{u}-1}\mathrm{d}u
$$
```

{{< math class=text-center >}}
$$
x^n + y^n = z^n
$$
{{< /math >}}

An inline {{< math >}}${(x+y)}^2${{< /math >}} expression.

## Diagrams

Read more in [Doks Diagrams](https://getdoks.org/docs/built-ins/diagrams/) docs based on [Kroki](https://kroki.io/).

### D2

```kroki {type=d2}
# Actors
hans: Hans Niemann

defendants: {
  mc: Magnus Carlsen
  playmagnus: Play Magnus Group
  chesscom: Chess.com
  naka: Hikaru Nakamura

  mc -> playmagnus: Owns majority
  playmagnus <-> chesscom: Merger talks
  chesscom -> naka: Sponsoring
}

# Accusations
hans -> defendants: 'sueing for $100M'

# Offense
defendants.naka -> hans: Accused of cheating on his stream
defendants.mc -> hans: Lost then withdrew with accusations
defendants.chesscom -> hans: 72 page report of cheating
```

### Mermaid

```kroki {type=mermaid}
sequenceDiagram
  participant Alice
  participant Bob
  Alice->John: Hello John, how are you?
  loop Healthcheck
    John->John: Fight against hypochondria
  end
  Note right of John: Rational thoughts prevail...
  John-->Alice: Great!
  John->Bob: How about you?
  Bob-->John: Jolly good!
```

### PlantUML

```kroki {type=plantuml}
@startmindmap
skinparam monochrome true
+ OS
++ Ubuntu
+++ Linux Mint
+++ Kubuntu
+++ Lubuntu
+++ KDE Neon
++ LMDE
++ SolydXK
++ SteamOS
++ Raspbian
-- Windows 95
-- Windows 98
-- Windows NT
--- Windows 8
--- Windows 10
@endmindmap
```
## Code blocks

```js
if ([1,"one",2,"two"].includes(value)){
  console.log("Number is either 1 or 2.");  // comment
}
```

```js {title="count.js"}
if ([1,"one",2,"two"].includes(value)){
  console.log("Number is either 1 or 2.");  // comment
}
```

## Terminal

```bash
npm install @hyas/doks-core@latest
```

```bash {title="Installing dependencies…"}
npm install
```

```bash {frame="none"}
npm install @hyas/doks-core@latest
```

```js {lineNos=true lineNoStart=32}
if ([1,"one",2,"two"].includes(value)){
  console.log("Number is either 1 or 2.");  // comment
}
```

```js {hl_lines=2}
if ([1,"one",2,"two"].includes(value)){
  console.log("Number is either 1 or 2.");  // comment
}
```

## Video

{{< youtube id="6Wm4c4N1zm0">}}


## Images

Read more on [Hays Images](https://images.gethyas.com/).

### Img

[ShortCode Reference](https://images.gethyas.com/docs/reference/shortcodes/img/)

{{< img process="fill 2100x900" lqip="21x webp q20" loading="eager" fetchpriority="high" src="https://static.zentala.io/flat/5.jpg" alt="A white bird flying over a lush green field" >}}

### Picture

[ShortCode Reference](https://images.gethyas.com/docs/reference/shortcodes/picture/)

{{< picture src="https://static.zentala.io/flat/16.jpg" alt="A bird flying through a field of tall grass" >}}

### Figure

[ShortCode Reference](https://images.gethyas.com/docs/reference/shortcodes/figure/)

{{< figure
  src="https://static.zentala.io/flat/8.jpg"
  alt="A small bird sitting on top of a dry grass field"
  caption="A small bird sitting on top of a dry grass field. Photo by Vincent van Zalinge"
>}}

## SVG

TODO add

## Link cards

### With desc

{{< link-card
  title="Showcase"
  description="Explore the infinite possibilities of Doks"
  href="/showcase/"
  target="_blank"
>}}

### Without

{{< link-card title="Showcase" href="/showcase/" >}}

### Grid

{{< card-grid >}}
  {{< link-card title="Showcase" href="/showcase/" >}}
  {{< link-card title="Showcase" href="/showcase/" >}}
{{< /card-grid >}}


## Fruther readings
* [Offical theme docs about shortcodes](https://getdoks.org/docs/basics/shortcodes/)

