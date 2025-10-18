# VS Code Snippets - Hugo Shortcodes

Snippety dla szybszego pisania Hugo shortcodes w Markdown.

## Jak używać?

1. Otwórz plik `.md` w VS Code
2. Zacznij pisać prefix (np. `callout-tip`)
3. Naciśnij `Tab` lub `Enter` gdy pojawi się autocomplete
4. Snippet się rozwinie
5. `Tab` przeskakuje między placeholderami (`${1}`, `${2}`, etc.)

## Przykład

Wpisujesz:
```
callout-tip
```

Naciskasz `Tab`, rozwija się do:
```markdown
{{< callout context="tip" title="Wskazówka" icon="rocket" >}}
[cursor tutaj - możesz wpisać treść]
{{< /callout >}}
```

Naciskasz `Tab` ponownie - przeskakujesz do następnego placeholdera.

---

## Dostępne Snippety

### 📢 Callouts (wyróżnione bloki)

| Prefix | Opis | Ikona | Kolor |
|--------|------|-------|-------|
| `callout-note` | Informacja/uwaga | info-circle | Niebieski |
| `callout-tip` | Wskazówka/tip | rocket | Zielony |
| `callout-caution` | Ostrzeżenie | alert-triangle | Żółty |
| `callout-danger` | Niebezpieczeństwo | alert-octagon | Czerwony |

**Przykład:**
```markdown
{{< callout context="tip" title="Wskazówka" icon="rocket" >}}
Hugo cache znacznie przyspiesza buildy!
{{< /callout >}}
```

---

### 🗂️ Details (rozwijane sekcje)

| Prefix | Opis |
|--------|------|
| `details` | Collapsible section (domyślnie zwinięty) |
| `details-open` | Collapsible section (domyślnie rozwinięty) |

**Przykład:**
```markdown
{{< details "Rozwiń aby zobaczyć więcej" >}}
Ukryta treść, która się rozwinie po kliknięciu.
{{< /details >}}
```

---

### 📑 Tabs

| Prefix | Opis |
|--------|------|
| `tabs` | Zakładki (3 taby) |

**Przykład:**
```markdown
{{< tabs "install-methods" >}}
{{< tab "npm" >}}

\`\`\`bash
npm install
\`\`\`

{{< /tab >}}
{{< tab "pnpm" >}}

\`\`\`bash
pnpm install
\`\`\`

{{< /tab >}}
{{< /tabs >}}
```

---

### 📊 Diagramy (Kroki)

| Prefix | Typ diagramu |
|--------|--------------|
| `kroki-d2` | D2 diagram |
| `kroki-mermaid` | Mermaid diagram |
| `kroki-plantuml` | PlantUML diagram |

**Przykład (Mermaid):**
````markdown
```kroki {type=mermaid}
graph TD
  A[Start] --> B[Process]
  B --> C[End]
```
````

---

### 💻 Code Blocks (rozszerzone)

| Prefix | Funkcja |
|--------|---------|
| `code-title` | Code block z tytułem pliku |
| `code-lines` | Code block z numerami linii |
| `code-highlight` | Code block z podświetlonymi liniami |

**Przykład (z numerami linii):**
````markdown
```js {lineNos=true lineNoStart=32}
function hello() {
  console.log("Hello!");
}
```
````

**Przykład (podświetlenie):**
````markdown
```js {hl_lines=2-3}
function hello() {
  console.log("Hello!");  // Ta linia podświetlona
  console.log("World!");  // Ta też
}
```
````

---

### 🖼️ Obrazy

| Prefix | Typ |
|--------|-----|
| `img` | Prosty obraz |
| `picture` | Responsive picture |
| `figure` | Obraz z podpisem (caption) |

**Przykład (figure):**
```markdown
{{< figure
  src="https://static.zentala.io/flat/8.jpg"
  alt="Opis obrazu dla SEO"
  caption="Podpis pod obrazem"
>}}
```

---

### 🎨 Inne

| Prefix | Funkcja |
|--------|---------|
| `svg` | Tabler icon (inline SVG) |
| `youtube` | YouTube embed |
| `link-card` | Card z linkiem |
| `math-inline` | Wzór matematyczny inline |
| `math-block` | Blok matematyczny |

**Przykład (YouTube):**
```markdown
{{< youtube id="dQw4w9WgXcQ">}}
```

**Przykład (icon):**
```markdown
{{< inline-svg "coffee" >}}
```

**Przykład (math):**
```markdown
Wzór Pitagorasa: {{< math >}}$a^2 + b^2 = c^2${{< /math >}}
```

---

## Dodawanie własnych snippetów

Edytuj plik `.vscode/hugo-snippets.code-snippets`:

```json
{
  "Nazwa Snippetu": {
    "scope": "markdown",
    "prefix": "twoj-prefix",
    "description": "Opis snippetu",
    "body": [
      "Linia 1",
      "${1:placeholder}",  // Tab stop 1
      "${2:drugi}",        // Tab stop 2
      "$0"                 // Final cursor position
    ]
  }
}
```

**Dokumentacja:**
- [VS Code Snippets Guide](https://code.visualstudio.com/docs/editor/userdefinedsnippets)
- [Snippet Syntax](https://code.visualstudio.com/docs/editor/userdefinedsnippets#_snippet-syntax)

---

## Tips & Tricks

1. **Autocomplete:** Zacznij pisać prefix a VS Code podpowie dostępne snippety
2. **Tab navigation:** `Tab` skacze do następnego placeholdera, `Shift+Tab` cofa
3. **Multi-cursor:** Możesz edytować kilka placeholderów jednocześnie
4. **Scope:** Snippety działają tylko w plikach `.md` (markdown)
5. **Konflikt prefixów:** Jeśli jest kilka snippetów z podobnym prefixem, VS Code pokaże listę

---

*Wszystkie snippety bazują na shortcodes z `content/demo.md`*
