# Task: Tutorial Article Improvements

**Status:** 🔴 **IN PROGRESS**
**Created:** 2025-10-19
**Priority:** 🟡 **MEDIUM**
**Complexity:** Medium (2-3 hours)
**Branch:** `main`
**Related:** `.claude/CLAUDE.md`, `content/tutorials/jak-wybrac-platforme-automatyki-domowej/`

---

## Goal

Improve tutorial article "Jak wybrać platformę automatyki domowej" based on user feedback:
1. Remove tutorial from categories (tutorial = content type)
2. Fix placeholder component colors (dark text on light theme)
3. Create improved table component with color backgrounds
4. Increase content width
5. Improve content per user suggestions

---

## Issues to Fix

### 1. Category Cleanup
**URL:** http://localhost:1313/tutorials/jak-wybra%C4%84%C2%87-platform%C4%99-automatyki-domowej/

**Problem:** Tutorial appears in "Tutorial" category, but tutorial is already a content TYPE

**Fix:**
- Remove `categories: ["Tutorial"]` from frontmatter
- Add ONE category describing the TOPIC (e.g., "Smart Home" or "Automatyka")
- Update CLAUDE.md with rule (✅ DONE)

### 2. Placeholder Component Colors
**URL:** http://localhost:1313/strukura-instalacji-wazniejsza-niz-sterownik/

**Problem:** Placeholder text/icons invisible on light theme (white on white)

**Fix:**
- Find placeholder component
- Change text/icon color to dark (with same transparency)
- Test on both light and dark themes

### 3. Table Component Improvements
**Location:** Tutorial article comparison table

**Current:** Uses emoji 🔴 🟢 🟡 for status indicators

**Desired:**
- Create Hugo/TSX component for tables
- Use colored backgrounds instead of emoji
- Options: Red, Green, Yellow backgrounds
- Option for bold text
- Better visual appearance

**Component API:**
```html
{{< comparison-table >}}
| Feature | Platform A | Platform B |
|---------|-----------|-----------|
| Status  | {{< cell bg="green" bold >}}Good{{< /cell >}} | {{< cell bg="red" >}}Bad{{< /cell >}} |
{{< /comparison-table >}}
```

### 4. Content Width
**Current:** Default theme width (too narrow for tutorials)

**Fix:**
- Content: `col-lg-9` → `col-lg-10`
- Header: `col-lg-10` → `col-lg-11`
- Apply to tutorial single layout

### 5. Voice & Tone
**Problem:** Uses "my" (we/editorial) instead of "I" (Paweł)

**Fix:**
- "Pomożemy Ci" → "Pomogę Ci"
- "Nasz portal" → "na tym portalu" or "portalu"
- "Nasza redakcja" → remove

**Rule added to:** `.claude/CLAUDE.md`

---

## Content Improvements

### Platform Summaries - Add Missing Details

#### Domoticz
**Current focus:** DIY sensors, light & efficient

**Add:**
- ✅ Świetne do przełączania przekaźników przez Raspberry Pi
- ✅ Nie tylko sensory ale i **aktuatory** (przełączniki, przekaźniki)
- ✅ Idealne dla DIY elektronika

**Summary:** "Domoticz dla DIY elektronika - buduj własne sensory i aktuatory, przełączaj przekaźniki przez RPi"

#### ioBroker
**Current focus:** Node.js, modular, adapters

**Add:**
- ✅ Pełna kontrola nad flow/logikami/automatyzacjami
- ✅ Zaawansowane wizualizacje (VIS)
- ✅ Dla programistów JavaScript

**Summary:** "ioBroker dla programisty JavaScript - pełna kontrola nad logiką, zaawansowane wizualizacje"

#### openHAB
**Current focus:** Professional, flexible, Java

**Add:**
- ✅ Dla projektów komercyjnych
- ✅ Instalacje dla firm, instytucji publicznych
- ✅ Vendor-independent (niezależny od dostawców)
- ✅ Profesjonalne wdrożenia IoT

**Summary:** "openHAB dla profesjonalisty - projekty komercyjne, instytucje, vendor-independent"

#### Home Assistant
**Current focus:** Entry level, easy, popular

**Add:**
- ✅ Dla każdego, niezależnie od doświadczenia
- ✅ Polecane jako pierwsza platforma dla osób bez doświadczenia ze smart home

**Summary:** "Home Assistant entry level - dla każdego, szczególnie polecane jako pierwsza platforma"

### Section 8: Scenariusze użycia

**Current:** Plain list

**Improvement:** Add recommendation icons

**Example:**
```markdown
### 🎯 Scenariusze użycia — konkretne przykłady

#### 🏆 Rekomendacja: Entuzjasta DIY + stary/tani sprzęt
**Platforma:** Domoticz
**Dlaczego:** ...
```

**Icons:**
- 🏆 Rekomendacja
- 💰 Budżetowe rozwiązanie
- 🚀 Dla zaawansowanych
- 👶 Dla początkujących

### Section 10: Następne kroki

**Current problems:**
1. "Pomożemy Ci" → should be "Pomogę Ci"
2. "naszym portalu" → "tym portalu" or "portalu"
3. "Znajdź instrukcję instalacji" → instrukcje nie są w artykułach

**New content:**

```markdown
## 10. Następne kroki

### Jak zacząć?

1. **Pogłęb swoją wiedzę**
   - Przeczytaj szczegółowy opis wybranej platformy na tym portalu:
     - [Home Assistant](/docs/software/home-assistant/)
     - [Domoticz](/docs/software/domoticz/)
     - [openHAB](/docs/software/openhab/)
     - [ioBroker](/docs/software/iobroker/)

2. **Szukaj video-tutoriali**
   - Polecam YouTube do zapoznania się z interfejsem i możliwościami
   - Obejrzyj kilka filmów pokazujących realne użycie platformy
   - Zobacz jak wygląda konfiguracja i automatyzacje

3. **Dołącz do społeczności**
   - Znajdź forum / grupę Facebook dla wybranej platformy
   - Obserwuj, jak inni użytkownicy rozwiązują problemy
   - Zacznij od **kopiowania prostych integracji** które oni robią
   - Pytaj o pomoc gdy utkniesz

4. **Kup 1 sztukę do testów**
   - Zanim kupisz wiele urządzeń, przetestuj na pojedynczych:
     - Przełącznik inteligentny (1 szt.)
     - Żarówka smart (1 szt.)
     - Czujnik ruchu (1 szt.)
   - **Zobacz wady i zalety** danego urządzenia
   - Sprawdź jak działa integracja z platformą
   - Jeśli Ci nie podejdzie, zmienisz na inny system **bez dużych strat**
   - Poznasz jak to działa przed zakupem większej ilości sprzętu

### Moje wskazówki

💡 **Nie śpiesz się z zakupami** - lepiej przetestować na małą skalę niż żałować dużego zakupu

💡 **Każda platforma ma swoją społeczność** - wykorzystaj ich doświadczenie

💡 **Nie ma złych wyborów** - każda platforma ma swoje mocne strony, wybierz tę która pasuje do Twoich potrzeb
```

---

## Implementation Phases

### Phase 1: Quick Fixes (30 min)
1. ✅ Update CLAUDE.md with content rules
2. Remove tutorial from categories in frontmatter
3. Fix "Pomożemy" → "Pomogę"
4. Fix "nasz portal" → "portalu"

### Phase 2: Placeholder Colors (30 min)
5. Find placeholder component
6. Change text/icon colors to dark
7. Test both themes

### Phase 3: Content Width (15 min)
8. Update tutorial single layout
9. col-lg-9 → col-lg-10 (content)
10. col-lg-10 → col-lg-11 (header)

### Phase 4: Content Improvements (45 min)
11. Update platform summaries (Domoticz, ioBroker, openHAB, HA)
12. Add recommendation icons to "Scenariusze użycia"
13. Rewrite "Następne kroki" section

### Phase 5: Table Component (1 hour)
14. Research Hugo shortcode vs partial
15. Create table component with colored backgrounds
16. Replace emoji table with new component
17. Test rendering

---

## Acceptance Criteria

- [x] Tutorial NOT in "Tutorial" category
- [x] Placeholder text visible on light theme
- [x] Content width increased (col-lg-10)
- [x] All "Pomożemy" → "Pomogę"
- [x] All "nasz portal" → "portalu"
- [x] Platform summaries updated with missing details
- [x] Recommendation icons in "Scenariusze użycia"
- [x] "Następne kroki" rewritten with new content
- [x] Table component created (badge shortcode)
- [x] Article builds without errors

---

## Files Modified

1. ✅ `content/tutorials/jak-wybrac-platforme-automatyki-domowej/index.md` - frontmatter & content
2. ✅ `layouts/tutorials/single.html` - width adjustments
3. ✅ `assets/scss/custom/custom.scss` - placeholder colors + badge CSS
4. ✅ `layouts/shortcodes/badge.html` - created badge shortcode
5. ✅ `content/demo.md` - added badge demo
6. ✅ `.claude/CLAUDE.md` - content writing rules

---

## Commits

1. **341416e** - feat(tutorial): improve platform comparison article
   - Content improvements, voice changes, enhanced descriptions
2. **07524a8** - fix(tutorial): placeholder visibility and content width improvements
   - Fixed placeholder component, increased width
3. **35532ca** - feat(tutorial): add colored badge shortcode for comparison tables
   - Created badge shortcode, replaced emojis

---

## Notes

**Table component implementation:**
- ✅ Created badge shortcode instead of complex table wrapper
- ✅ Green, yellow, red colors with dark theme support
- ✅ Optional bold parameter
- ✅ Works inside markdown tables
- ✅ Demo added to /demo/ page

**Testing:**
- ✅ Tested locally - builds successfully
- ✅ Dev server running without errors
- ✅ All 270 pages built

---

**Status:** ✅ **COMPLETED**

**Completion Date:** 2025-10-19

**Actual Time:** ~2 hours

**Next Step:** Move to done folder
