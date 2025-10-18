# Spec 001: Glossary Tooltips - Future Enhancements

**Status:** Backlog
**Created:** 2025-10-18
**Related Spec:** `.claude/specs/001-glossary-tooltips.md`
**Related Task:** `.claude/tasks/GLOSSARY_TOOLTIPS.md`

---

## Overview

This document contains future enhancements for the Glossary Tooltips system that are **out of scope** for MVP but valuable for long-term roadmap.

**Priority levels:**
- 🔥 **HIGH** - High value, low effort
- ⭐ **MEDIUM** - Moderate value/effort
- 💡 **LOW** - Nice-to-have, requires research

---

## Visual Enhancements

### 4.4 Category & Term Icons (⭐ MEDIUM)

**Goal:** Visual distinction for terms and categories

**Implementation:**

```yaml
# content/docs/actuators/_index.md
---
category_icon: "switch-3"  # Tabler icon
---

# content/docs/actuators/przekazniki.md
---
glossary:
  term_icon: "relay-icon.svg"  # Optional per-term icon
  term_image: "przekaznik-thumb.jpg"  # Square thumbnail
---
```

**Tooltip with icon:**
```html
<div class="glossary-tooltip">
  <div class="glossary-tooltip__header">
    <img src="przekaznik-thumb.jpg" class="glossary-tooltip__image">
    <h4>Przekaźniki</h4>
  </div>
  <p>...</p>
</div>
```

**Glossary page with icons:**
```html
<article class="glossary-card">
  <span class="category-badge">
    <i data-tabler="switch-3"></i> Actuators
  </span>
  <h3>Przekaźniki</h3>
</article>
```

**SCSS:**
```scss
.glossary-tooltip__image {
  width: 48px;
  height: 48px;
  border-radius: 8px;
  margin-right: 0.75rem;
}

.category-badge i[data-tabler] {
  width: 1rem;
  height: 1rem;
  margin-right: 0.25rem;
}
```

**Effort:** 2-3 days
**Value:** High (visual appeal, better UX)

---

### 4.5 Animations (💡 LOW)

**Goal:** Smooth tooltip appearance/disappearance

```scss
@keyframes tooltip-appear {
  from {
    opacity: 0;
    transform: translateX(-50%) translateY(4px);
  }
  to {
    opacity: 1;
    transform: translateX(-50%) translateY(0);
  }
}

.glossary-tooltip {
  animation: tooltip-appear 0.2s ease-out;
}

.glossary-tooltip.hiding {
  animation: tooltip-disappear 0.15s ease-in;
}
```

**Effort:** 1 day
**Value:** Low (polish, not critical)

---

### 4.6 Dark Mode Colors (🔥 HIGH)

**Goal:** Respect user's dark/light mode preference

```scss
.glossary-tooltip {
  background: var(--bs-gray-900);
  color: var(--bs-white);

  @media (prefers-color-scheme: light) {
    background: var(--bs-white);
    color: var(--bs-gray-900);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15),
                0 0 0 1px rgba(0, 0, 0, 0.05);
  }
}
```

**Effort:** 1 day
**Value:** High (accessibility, modern UX)

---

## Search & Discovery

### 4.3 Search Integration (⭐ MEDIUM)

**Goal:** Glossary terms appear in site search results

**Implementation:**

**A. Algolia/Pagefind Index:**
```json
{
  "objectID": "glossary-iot",
  "title": "IoT (Internet of Things)",
  "type": "glossary",
  "category": "concepts",
  "summary": "Internet Rzeczy to...",
  "url": "/docs/concepts/iot/",
  "aliases": ["Internet Rzeczy", "Internet of Things"]
}
```

**B. Search UI Enhancement:**
```html
<div class="search-result search-result--glossary">
  <span class="badge">Słownik</span>
  <h4>IoT (Internet of Things)</h4>
  <p>Internet Rzeczy to...</p>
  <span class="aliases">Znane też jako: Internet Rzeczy</span>
</div>
```

**Effort:** 3-4 days (depends on search provider)
**Value:** High (discoverability)

---

### 5.1 Related Terms Sidebar (⭐ MEDIUM)

**Goal:** Show related terms on docs pages

**Frontmatter:**
```yaml
glossary:
  related_terms:
    - "mqtt"
    - "zigbee"
    - "home-assistant"
```

**Sidebar template:**
```html
<!-- layouts/partials/docs-sidebar.html -->
{{ with .Params.glossary.related_terms }}
<aside class="related-terms">
  <h4>Zobacz też</h4>
  <ul>
    {{ range . }}
      {{ $page := $.Site.GetPage (printf "/docs/%s" .) }}
      <li>
        <a href="{{ $page.RelPermalink }}">{{ $page.Title }}</a>
      </li>
    {{ end }}
  </ul>
</aside>
{{ end }}
```

**Effort:** 2 days
**Value:** Medium (SEO, user engagement)

---

## Analytics & Tracking

### 4.1 Interaction Analytics (💡 LOW)

**Goal:** Track which terms users hover/click

**Implementation:**

```javascript
// assets/js/glossary-tooltips.js
class GlossaryTooltips {
  trackInteraction(term, action) {
    if (typeof gtag !== 'undefined') {
      gtag('event', 'glossary_interaction', {
        term_slug: term.slug,
        term_title: term.title,
        action: action,  // 'hover' | 'click'
        page_url: window.location.pathname
      });
    }
  }

  showTooltip(tooltip, data) {
    tooltip.classList.add('visible');
    this.trackInteraction(data, 'hover');
  }

  attachTooltips() {
    // ...
    link.addEventListener('click', () => {
      this.trackInteraction(data, 'click');
    });
  }
}
```

**Google Analytics Dashboard:**
- Most hovered terms
- Tooltip → docs conversion rate
- Terms with low click-through (improve summary?)

**Effort:** 2 days
**Value:** Medium (data-driven improvements)

---

### 5.2 A/B Testing (💡 LOW)

**Goal:** Test tooltip variations

**Variants:**
- A: Short summary (1 sentence)
- B: Detailed summary (2-3 sentences)
- C: Summary + image
- D: Summary + related terms list

**Tool:** Google Optimize or custom JS

**Metrics:**
- Click-through rate
- Time to click
- Bounce rate after tooltip

**Effort:** 1 week
**Value:** Low (nice-to-have, requires traffic)

---

## Performance Optimizations

### 5.3 Intersection Observer (🔥 HIGH)

**Goal:** Load tooltips only when visible

**Current:** All tooltips initialized on page load
**Future:** Lazy-load tooltips as user scrolls

```javascript
class GlossaryTooltips {
  init() {
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.attachTooltip(entry.target);
            this.observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '100px' }
    );

    document.querySelectorAll('.glossary-term').forEach(term => {
      this.observer.observe(term);
    });
  }
}
```

**Benefit:** Faster initial page load (especially long posts)

**Effort:** 1 day
**Value:** High (performance)

---

### 5.4 Web Worker for Parsing (💡 LOW)

**Goal:** Offload glossary.json parsing to background thread

```javascript
// assets/js/glossary-worker.js
self.addEventListener('message', async (e) => {
  const res = await fetch('/glossary.json');
  const data = await res.json();
  self.postMessage(data);
});

// Main thread
const worker = new Worker('/js/glossary-worker.js');
worker.postMessage('load');
worker.addEventListener('message', (e) => {
  this.glossary = e.data;
  this.attachTooltips();
});
```

**Benefit:** Non-blocking main thread

**Effort:** 2 days
**Value:** Low (only matters for 100KB+ JSON)

---

### 5.5 Trie Data Structure (💡 LOW)

**Goal:** Faster term matching in build script

**Current:** Regex loop O(n×m) where n=terms, m=content length
**Future:** Trie O(m) single pass

```javascript
class Trie {
  constructor(terms) {
    this.root = {};
    terms.forEach(term => this.insert(term));
  }

  search(text) {
    // Single pass through text, find all matches
    // Much faster than 100+ regex checks
  }
}

const trie = new Trie(glossaryTerms);
const matches = trie.search(content);
```

**Benefit:** 10x faster for 500+ terms

**Effort:** 3 days
**Value:** Low (current performance acceptable)

---

## Content Enhancements

### 5.6 Glossary Difficulty Levels (⭐ MEDIUM)

**Goal:** Mark terms as beginner/intermediate/advanced

```yaml
glossary:
  difficulty: "beginner"  # beginner | intermediate | advanced
```

**UI:**
```html
<span class="badge badge-difficulty-{{ .Params.glossary.difficulty }}">
  {{ .Params.glossary.difficulty | humanize }}
</span>
```

**Use cases:**
- Filter glossary page by difficulty
- Show "Beginner-friendly" badge on simple terms
- Recommend learning path (beginner → advanced)

**Effort:** 2 days
**Value:** Medium (educational content)

---

### 5.7 Version History (💡 LOW)

**Goal:** Track definition changes over time

```yaml
glossary:
  summary: "Updated definition..."
  changelog:
    - date: 2025-10-18
      change: "Added MQTT integration details"
    - date: 2024-05-10
      change: "Initial definition"
```

**UI:**
```html
<details class="glossary-changelog">
  <summary>Historia zmian</summary>
  <ul>
    {{ range .Params.glossary.changelog }}
      <li>{{ .date }}: {{ .change }}</li>
    {{ end }}
  </ul>
</details>
```

**Effort:** 2 days
**Value:** Low (nice for technical docs)

---

## Internationalization (i18n)

### 6.1 Multi-language Support (⭐ MEDIUM)

**Goal:** Glossary in multiple languages

**Structure:**
```
content/
├── pl/
│   └── docs/
│       └── concepts/
│           └── iot.md (Polish)
└── en/
    └── docs/
        └── concepts/
            └── iot.md (English)
```

**Frontmatter:**
```yaml
# content/en/docs/concepts/iot.md
---
glossary:
  summary: "Internet of Things (IoT) is..."
  aliases: ["IoT", "Internet of Things"]
---
```

**Generated JSON per language:**
- `/en/glossary.json`
- `/pl/glossary.json`

**Tooltip JS:**
```javascript
const lang = document.documentElement.lang || 'pl';
const glossaryUrl = `/${lang}/glossary.json`;
```

**Effort:** 1 week (requires Hugo i18n setup)
**Value:** Medium (if targeting EN audience)

---

### 6.2 URL Aliasing for i18n (🔥 HIGH)

**Goal:** Smooth migration from `/docs/dict/` to language-specific URLs

**Current (PL only):**
- `/docs/dict/` (Polish glossary)

**Future (multi-lang):**
- `/pl/docs/slownik/` (Polish)
- `/en/docs/dictionary/` (English)

**Migration strategy:**

**Year 1:** Keep `/docs/dict/`, add redirects
```toml
# config/_default/hugo.toml
[[redirects]]
  from = "/docs/dict/*"
  to = "/pl/docs/slownik/:splat"
  status = 301
```

**Year 2:** Remove old URLs

**Effort:** 2 days (config + testing)
**Value:** High (future-proof for i18n)

**Related backlog item:** `.claude/tasks/I18N_URL_MIGRATION.md`

---

## Accessibility

### 7.1 ARIA Labels (🔥 HIGH)

**Goal:** Better screen reader support

```html
<abbr
  class="glossary-term"
  data-term="iot"
  role="button"
  aria-label="Definicja: IoT (Internet of Things)"
  aria-describedby="tooltip-iot"
>
  IoT
</abbr>

<div
  id="tooltip-iot"
  class="glossary-tooltip"
  role="tooltip"
  aria-hidden="true"
>
  <!-- content -->
</div>
```

**JavaScript:**
```javascript
showTooltip(tooltip) {
  tooltip.setAttribute('aria-hidden', 'false');
}

hideTooltip(tooltip) {
  tooltip.setAttribute('aria-hidden', 'true');
}
```

**Effort:** 1 day
**Value:** High (accessibility compliance)

---

### 7.2 Keyboard Navigation (🔥 HIGH)

**Goal:** Navigate tooltips with Tab/Enter/Escape

```javascript
class GlossaryTooltips {
  attachKeyboardListeners(abbr, tooltip) {
    abbr.setAttribute('tabindex', '0');

    abbr.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        this.toggleTooltip(tooltip);
      }

      if (e.key === 'Escape') {
        this.hideTooltip(tooltip);
      }
    });
  }
}
```

**Effort:** 1 day
**Value:** High (accessibility)

---

## SEO Enhancements

### 8.1 Schema.org Markup (⭐ MEDIUM)

**Goal:** Rich snippets in Google search results

```html
<abbr
  class="glossary-term"
  itemscope
  itemtype="https://schema.org/DefinedTerm"
>
  <span itemprop="name">IoT</span>
  <meta itemprop="description" content="Internet Rzeczy to...">
  <link itemprop="url" href="/docs/concepts/iot/">
</abbr>
```

**Glossary page:**
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "DefinedTermSet",
  "name": "Słownik Smart Home",
  "hasDefinedTerm": [
    {
      "@type": "DefinedTerm",
      "name": "IoT",
      "description": "Internet Rzeczy to...",
      "url": "https://ihome.zentala.io/docs/concepts/iot/"
    }
  ]
}
</script>
```

**Effort:** 2 days
**Value:** Medium (Google may show rich snippets)

---

### 8.2 Breadcrumbs in Tooltips (💡 LOW)

**Goal:** Show term's category path

```html
<div class="glossary-tooltip">
  <nav class="breadcrumb">
    Docs → Concepts → IoT
  </nav>
  <h4>IoT (Internet of Things)</h4>
  <!-- ... -->
</div>
```

**Effort:** 1 day
**Value:** Low (visual clutter)

---

## AI-Generated Enhancements

### 9.1 AI-Generated Term Icons (💡 LOW)

**Goal:** Unique AI-generated icons for each term

**Tools:**
- DALL-E 3 API
- Stable Diffusion
- Midjourney

**Process:**
1. For each term, generate prompt:
   ```
   "Minimalist icon representing [term], flat design,
    square aspect ratio, white background"
   ```
2. Generate image via API
3. Save as `term-icon.svg`
4. Add to frontmatter: `term_icon: "iot-icon.svg"`

**Effort:** 1 week (automation + review)
**Value:** Low (expensive, needs human review)

---

### 9.2 AI Summary Generation (💡 LOW)

**Goal:** Auto-generate summaries from article content

**Process:**
1. Extract first 500 words from article
2. Send to GPT-4 API:
   ```
   Prompt: "Summarize this technical article in 2 sentences
            for a tooltip. Max 150 characters."
   ```
3. Add to frontmatter: `glossary.summary: "..."`

**Effort:** 3 days
**Value:** Low (needs human review for accuracy)

---

## Advanced Features

### 10.1 Tooltip Customization per Page (💡 LOW)

**Goal:** Different tooltip styles for different sections

```yaml
# content/blog/_index.md
---
glossary_style: "compact"  # compact | detailed | minimal
---
```

**CSS:**
```scss
.blog-section .glossary-tooltip {
  &.compact {
    width: 200px;  // Smaller for blog
  }
}

.docs-section .glossary-tooltip {
  &.detailed {
    width: 400px;  // Larger for docs
  }
}
```

**Effort:** 2 days
**Value:** Low (adds complexity)

---

### 10.2 Tooltip Positioning Algorithm (⭐ MEDIUM)

**Goal:** Smarter positioning (avoid viewport edges, overlapping)

**Current:** Simple above/below based on space
**Future:** Full collision detection

```javascript
positionTooltip(trigger, tooltip) {
  const rect = trigger.getBoundingClientRect();
  const tooltipRect = tooltip.getBoundingClientRect();

  // Preferred positions (priority order)
  const positions = [
    { name: 'above', y: rect.top - tooltipRect.height - 12 },
    { name: 'below', y: rect.bottom + 12 },
    { name: 'left', x: rect.left - tooltipRect.width - 12 },
    { name: 'right', x: rect.right + 12 }
  ];

  // Find first position that fits in viewport
  for (const pos of positions) {
    if (this.fitsInViewport(pos, tooltipRect)) {
      tooltip.classList.add(pos.name);
      return;
    }
  }

  // Fallback: center on screen
  tooltip.classList.add('center');
}
```

**Effort:** 3 days
**Value:** Medium (better UX on mobile)

---

### 10.3 Print Stylesheet (💡 LOW)

**Goal:** Show term definitions in printed pages

```scss
@media print {
  .glossary-term::after {
    content: " [" attr(data-term-title) "]";
    font-style: italic;
    color: #666;
  }

  .glossary-tooltip {
    display: block !important;
    position: static;
    border: 1px solid #ccc;
    margin-top: 0.5rem;
    page-break-inside: avoid;
  }
}
```

**Effort:** 1 day
**Value:** Low (rare use case)

---

## Testing Enhancements

### 11.1 Visual Regression Tests (⭐ MEDIUM)

**Goal:** Catch CSS/layout breaks

**Tool:** Percy.io or Chromatic

```javascript
// tests/visual/glossary.spec.js
import percySnapshot from '@percy/playwright';

test('tooltip visual regression', async ({ page }) => {
  await page.goto('/blog/article/');
  await page.locator('.glossary-term').first().hover();
  await percySnapshot(page, 'Glossary Tooltip');
});
```

**Effort:** 2 days (setup + baseline)
**Value:** Medium (catch visual bugs)

---

### 11.2 Accessibility Tests (🔥 HIGH)

**Goal:** Automated a11y testing

**Tool:** axe-core

```javascript
import { injectAxe, checkA11y } from 'axe-playwright';

test('tooltip accessibility', async ({ page }) => {
  await page.goto('/blog/article/');
  await injectAxe(page);
  await page.locator('.glossary-term').first().hover();
  await checkA11y(page, '.glossary-tooltip');
});
```

**Effort:** 1 day
**Value:** High (WCAG compliance)

---

## Priority Recommendations

| Priority | Enhancement | Effort | Value | Rationale |
|----------|-------------|--------|-------|-----------|
| 🔥 **P1** | Dark mode colors | 1 day | High | Modern UX expectation |
| 🔥 **P1** | ARIA labels | 1 day | High | Accessibility compliance |
| 🔥 **P1** | Keyboard nav | 1 day | High | Accessibility compliance |
| 🔥 **P1** | Intersection Observer | 1 day | High | Performance boost |
| 🔥 **P1** | i18n URL aliasing | 2 days | High | Future-proof |
| ⭐ **P2** | Category icons | 3 days | Medium | Visual appeal |
| ⭐ **P2** | Search integration | 4 days | Medium | Discoverability |
| ⭐ **P2** | Schema.org markup | 2 days | Medium | SEO boost |
| ⭐ **P2** | Related terms sidebar | 2 days | Medium | User engagement |
| 💡 **P3** | Analytics tracking | 2 days | Low | Nice-to-have data |
| 💡 **P3** | Animations | 1 day | Low | Polish |

---

## Total Effort Estimate

- **P1 (Must-have):** 7 days
- **P2 (Should-have):** 11 days
- **P3 (Nice-to-have):** 15+ days

**Recommended Phase 2 Scope (after MVP):**
1. Dark mode + A11y (ARIA + keyboard) - 3 days
2. Intersection Observer - 1 day
3. Category icons - 3 days
4. Search integration - 4 days

**Total:** ~11 days for solid Phase 2

---

**End of Future Enhancements**
