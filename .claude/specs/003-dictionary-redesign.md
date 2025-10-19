# Spec 003: Dictionary Redesign - Browsable Index

**Created:** 2025-10-19
**Status:** 📋 **PLANNED** (Long-term)
**Priority:** Medium
**Complexity:** Medium (3-5 days)
**Dependencies:** i18n migration must be complete first
**Related:** `.claude/tasks/CONTENT_AUDIT.md`, `.claude/tasks/I18N_URL_MIGRATION.md`

---

## Problem Statement

**Current dictionary structure (BROKEN):**
- URL: `/docs/dict/[term-slug]`
- No index page - direct access to terms only
- No way to browse all terms
- No search functionality
- No categorization
- Mixed Polish word (`dict`) in English path
- Not i18n-friendly (no language prefix)

**User pain points:**
- Can't discover terms (must know term name to find it)
- No "browse all" option
- No alphabetical navigation
- Hard to find related terms

**Post-migration goals:**
- New URL structure: `/pl/slownik/` and `/en/dictionary/`
- Browsable index page
- Alphabetical navigation (A-Z)
- Category view toggle
- Search within dictionary
- Per-language dictionaries

---

## Goals

### Must Have (MVP)

1. **Index Page:**
   - `/pl/slownik/` - Dictionary homepage
   - Shows all terms alphabetically
   - A-Z navigation buttons

2. **Alphabetical Sections:**
   - Group terms by first letter
   - Click letter → jump to section
   - Visual letter markers

3. **Term Pages:**
   - `/pl/slownik/[term]/` - Individual term
   - Back to index link
   - Related terms links

4. **Bilingual Support:**
   - `/pl/slownik/` - Polish dictionary
   - `/en/dictionary/` - English dictionary (future)
   - Separate term lists per language

### Should Have

5. **Search:**
   - Live search as you type
   - Filter terms by keyword
   - Highlight matches

6. **Category View:**
   - Toggle: Alphabetical ↔ Categories
   - Categories: Electronics, IoT, Networking, etc.
   - Terms grouped by category

### Nice to Have

7. **Statistics:**
   - Total terms count
   - Terms per category
   - Recently added terms

8. **Cross-linking:**
   - Related terms automatically detected
   - "See also" section
   - Category breadcrumbs

---

## Current State Analysis

**Existing dictionary structure:**
```
content/
  docs/
    dict/
      term-1.md
      term-2.md
      ...
```

**Frontmatter example:**
```yaml
---
title: "Arduino"
date: 2024-01-15
category: "Micro-controllers"
tags: ["IoT", "Electronics", "Programming"]
draft: false
---

Definition content here...
```

**Number of terms:** ~50-100 (estimate, need to count)

---

## Proposed Solution

### URL Structure (Post-Migration)

**Polish:**
```
/pl/slownik/                    # Index page
/pl/slownik/a/                  # Letter 'A' terms
/pl/slownik/arduino/            # Individual term
/pl/slownik/kategoria/iot/      # Category view
```

**English (Future):**
```
/en/dictionary/                 # Index page
/en/dictionary/a/               # Letter 'A' terms
/en/dictionary/arduino/         # Individual term
/en/dictionary/category/iot/    # Category view
```

### Directory Structure

**Recommended:**
```
content/
  pl/
    slownik/
      _index.md           # Dictionary homepage
      arduino.md          # Individual terms
      esp32.md
      mqtt.md
      ...

  en/
    dictionary/
      _index.md           # Dictionary homepage (future)
      arduino.md
      ...
```

**Alternative (keep current for now, migrate later):**
```
content/
  docs/
    slownik/              # Renamed from 'dict'
      _index.md           # NEW: Index page
      arduino.md
      esp32.md
      ...
```

---

## Design Mockup (Text)

### Index Page (`/pl/slownik/`)

```
=================================================
                 SŁOWNIK POJĘĆ
=================================================

Wyszukaj: [___________________] 🔍

[Widok: Alfabetyczny ▼] [Kategorie]

--------- Alfabetyczny --------

[A] [B] [C] [D] [E] [F] [G] [H] [I] [J] [K]
[L] [M] [N] [O] [P] [Q] [R] [S] [T] [U] [V]
[W] [X] [Y] [Z]

--- A ---

→ Arduino - Platforma mikrokontrolerowa...
→ API - Application Programming Interface...

--- B ---

→ Bluetooth - Technologia bezprzewodowa...

--- C ---

→ Cloud - Chmura obliczeniowa...

...

[Wszystkich terminów: 87]
```

### Category View (`/pl/slownik/` + toggle)

```
=================================================
                 SŁOWNIK POJĘĆ
=================================================

Wyszukaj: [___________________] 🔍

[Widok: Alfabetyczny] [Kategorie ▼]

--------- Kategorie --------

📱 IoT (15 terminów)
→ Arduino, ESP32, MQTT, Zigbee...

⚡ Elektryka (23 terminy)
→ Napięcie, Natężenie, Moc, LED...

🌐 Sieci (12 terminów)
→ Wi-Fi, Ethernet, Router, Switch...

🏠 Automatyka (18 terminów)
→ Czujnik, Przekaźnik, Sterownik...

```

### Individual Term (`/pl/slownik/arduino/`)

```
=================================================
            ← Powrót do słownika

ARDUINO

Kategoria: Mikrokontrolery

Arduino to otwarta platforma mikrokontrolerowa...

[Full content]

---
Zobacz także:
→ ESP32
→ Mikrokontroler
→ IoT

Kategoria: Mikrokontrolery (7 terminów)
```

---

## Technical Implementation

### Phase 1: Index Page Template

**File:** `layouts/slownik/list.html` (or `layouts/dictionary/list.html`)

**Features:**
- List all terms in current language
- Group by first letter
- Alphabetical navigation
- Count display

**Template logic:**
```go
{{ define "main" }}
<h1>{{ .Title }}</h1>

{{ $terms := where .Site.RegularPages "Section" "slownik" }}
{{ $terms := $terms.ByTitle }}

{{ range $terms.GroupByParamDate "title" "asc" }}
  <h2>{{ .Key }}</h2>
  {{ range .Pages }}
    <a href="{{ .Permalink }}">{{ .Title }}</a> - {{ .Summary }}
  {{ end }}
{{ end }}

{{ end }}
```

### Phase 2: Search Functionality

**Options:**
- **Hugo search index** (generated JSON)
- **Fuse.js** (client-side fuzzy search)
- **Lunr.js** (full-text search)

**Recommended:** Fuse.js (lightweight, no backend needed)

### Phase 3: Category View

**Frontmatter extension:**
```yaml
---
title: "Arduino"
category: "Micro-controllers"
categoryPl: "Mikrokontrolery"
categoryEn: "Microcontrollers"
---
```

**Template:** Group by `category` instead of letter

### Phase 4: Bilingual Support

**Separate content directories:**
- `content/pl/slownik/` - Polish terms
- `content/en/dictionary/` - English terms

**Translations linked in frontmatter:**
```yaml
---
title: "Arduino"
translationKey: "arduino"
---
```

---

## Migration Plan

**Step 1: Create Index Page**
- Create `content/docs/slownik/_index.md`
- Create template `layouts/slownik/list.html`
- Test locally

**Step 2: Rename Directory**
- Move `content/docs/dict/` → `content/docs/slownik/`
- Update internal links
- Test

**Step 3: Add Search**
- Generate search index
- Implement Fuse.js
- Test search functionality

**Step 4: Add Category View**
- Update frontmatter with categories
- Create category toggle
- Test filtering

**Step 5: Post-i18n Migration**
- Move to `content/pl/slownik/`
- Update URLs to `/pl/slownik/`
- Setup redirects from old URLs

**Step 6: English Dictionary (Future)**
- Create `content/en/dictionary/`
- Translate key terms
- Link PL ↔ EN translations

---

## Acceptance Criteria

**MVP Complete When:**
- ✅ Index page shows all terms alphabetically
- ✅ A-Z navigation works
- ✅ Clicking term → term page
- ✅ Clicking letter → jumps to that section
- ✅ "Back to dictionary" link on term pages
- ✅ URLs use `/slownik/` not `/dict/`
- ✅ Mobile-friendly layout

**Full Feature Complete When:**
- ✅ Search works (live filter)
- ✅ Category view toggle works
- ✅ Categories displayed correctly
- ✅ Bilingual structure ready
- ✅ Related terms auto-linked
- ✅ Statistics displayed

---

## Dependencies

**Must complete FIRST:**
- `.claude/tasks/I18N_URL_MIGRATION.md` - Need `/pl/` structure
- `.claude/tasks/CONTENT_AUDIT.md` - Know what terms exist

**Blocks:**
- EN dictionary translation
- Glossary tooltips (`.claude/specs/001-glossary-tooltips.md`)

---

## Testing Plan

**Manual Tests:**
- [ ] All terms visible on index
- [ ] Alphabetical sorting correct
- [ ] Search finds terms
- [ ] Category filter works
- [ ] Mobile responsive
- [ ] No broken links

**Automated Tests (Future):**
- [ ] Smoke test: Index page loads
- [ ] Smoke test: Search returns results
- [ ] Smoke test: All term pages load

---

## Future Enhancements

**Post-MVP:**
- Term of the day
- Popular terms (analytics)
- Recently updated terms
- Term history/changelog
- User-contributed terms (?)
- Glossary API endpoint
- Term embedding in articles (tooltip)

---

## References

**Similar implementations:**
- MDN Web Docs: https://developer.mozilla.org/en-US/docs/Glossary
- AWS Glossary: https://docs.aws.amazon.com/general/latest/gr/glos-chap.html
- Hugo Taxonomy example: https://gohugo.io/content-management/taxonomies/

---

**Status:** 📋 **PLANNED** - Implementation after i18n migration
