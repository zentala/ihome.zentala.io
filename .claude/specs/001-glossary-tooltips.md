# Spec 001: Glossary Tooltips System

**Status:** Draft
**Created:** 2025-10-18
**Author:** Claude (Software Architect)
**Related Tasks:** `.claude/tasks/GLOSSARY_TOOLTIPS.md`
**Future Enhancements:** `.claude/specs/001-glossary-tooltips.FUTURE.md`
**Testing Architecture:** `.claude/specs/000-testing-architecture.md`

---

## Problem Statement

The knowledge base in `/content/docs/` contains 100+ technical terms across multiple categories (actuators, cables, concepts, etc.). Readers encounter these terms in blog posts and tutorials without context.

**Current state:**
- No automatic linking to documentation
- No inline definitions
- Readers must manually search for terms
- Poor SEO internal linking
- Low engagement with `/docs/` content

**Desired state:**
- Automatic tooltips on first occurrence of terms
- Inline definitions with "Read more" links
- Rich glossary page for SEO
- Future-proof for icons, images, i18n

---

## Goals & Non-Goals

### Goals
- ✅ Automatic term detection in blog/tutorial content
- ✅ Interactive tooltips with definitions (hover)
- ✅ SEO-optimized glossary page (`/docs/dict/`)
- ✅ Single source of truth (frontmatter)
- ✅ Markdown support in definitions
- ✅ Future-proof for icons, images, categories
- ✅ Performance: localStorage cache, build-time processing

### Non-Goals
- ❌ Real-time term detection (client-side only)
- ❌ Multiple languages (i18n is future task)
- ❌ Automatic translation
- ❌ Term icons (future enhancement)
- ❌ Analytics tracking (future enhancement)

---

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                    BUILD-TIME PROCESSING                     │
└─────────────────────────────────────────────────────────────┘

1. SOURCE: content/docs/**/*.md (frontmatter)
   ├── glossary.enabled: true
   ├── glossary.summary: "..." (markdown)
   ├── glossary.aliases: ["syn1", "syn2"]
   └── category metadata in _index.md

2. SCRIPT: scripts/mark-glossary-terms.mjs
   ├── Parse frontmatter → build glossary object
   ├── Scan content/ for first term occurrence
   ├── Insert: {{< term "slug" >}}text{{< /term >}}
   └── Skip: code blocks, existing links, comments

3. HUGO BUILD: layouts/
   ├── shortcodes/term.html → <abbr data-term="slug">
   ├── _default/index.glossary.json → glossary.json
   └── dict/list.html → /docs/dict/ page

┌─────────────────────────────────────────────────────────────┐
│                    RUNTIME (CLIENT-SIDE)                     │
└─────────────────────────────────────────────────────────────┘

4. JAVASCRIPT: assets/js/glossary-tooltips.js
   ├── Fetch glossary.json (cached in localStorage 24h)
   ├── Find all <abbr data-term="...">
   ├── Attach hover listeners
   └── Render tooltip with summary + link

5. STYLES: assets/scss/components/_glossary-tooltips.scss
   ├── Tooltip positioning (smart: above/below)
   ├── Dark mode support
   └── Responsive design
```

---

## Data Model

### Frontmatter Structure (Term)

```yaml
# content/docs/concepts/iot.md
---
title: "IoT (Internet of Things)"
date: 2023-09-07
contributors: ['Paweł Żentała']
draft: false

# === GLOSSARY ===
glossary:
  enabled: true  # If false/missing → not in glossary/tooltips

  summary: |
    **Internet Rzeczy (IoT)** to sieć urządzeń codziennego użytku połączonych z internetem, które wymieniają dane i automatycznie wykonują zadania.

    Obejmuje urządzenia od prostych {{< term "czujniki" >}}czujników{{< /term >}} i smart home, po zaawansowane systemy przemysłowe.

  aliases:
    - "Internet Rzeczy"
    - "Internet of Things"
    - "IoT"

  category: "concepts"  # Auto-detected from folder, can override

  # Future fields (optional):
  term_image: ""  # Square thumbnail URL
  related_terms: ["mqtt", "zigbee"]

# === SEO ===
seo:
  title: "IoT | Dokumentacja"
  description: "..."

# === HUGO ALIASES (for synonyms) ===
aliases:
  - /internet-of-things/
  - /internet-rzeczy/
---

## Definicja

Full article content...
```

### Frontmatter Structure (Category)

```yaml
# content/docs/actuators/_index.md
---
title: "Actuators"
weight: 10

# Category metadata
category_icon: "switch-3"  # Tabler icon name (future)
category_color: "#ff6b6b"
---

Category description...
```

### Generated JSON

```json
{
  "iot": {
    "title": "IoT (Internet of Things)",
    "url": "/docs/concepts/iot/",
    "summary": "<p><strong>Internet Rzeczy (IoT)</strong> to sieć urządzeń...</p>",
    "aliases": ["Internet Rzeczy", "Internet of Things", "IoT"],
    "category": "concepts",
    "category_icon": "bulb"
  },
  "przekaznik": {
    "title": "Przekaźniki",
    "url": "/docs/actuators/przekazniki/",
    "summary": "<p>Urządzenia elektromechaniczne...</p>",
    "aliases": ["przekaźnik", "relay"],
    "category": "actuators",
    "category_icon": "switch-3"
  }
}
```

---

## Component Specifications

### 1. Build Script: `scripts/mark-glossary-terms.mjs`

**Purpose:** Parse frontmatter, detect terms, insert shortcodes

**CLI Interface:**
```bash
# Mark all content files
pnpm run glossary:mark --all

# Mark specific files
pnpm run glossary:mark content/blog/my-post.md content/blog/other.md

# Mark uncommitted changes only
pnpm run glossary:mark --dirty

# Mark files changed in time range
pnpm run glossary:mark --since="2 days ago"

# Preview without writing
pnpm run glossary:mark --dry-run

# Verbose output
pnpm run glossary:mark --verbose
```

**Algorithm:**
```javascript
1. Parse all content/docs/**/*.md frontmatter
2. Build glossary object: { slug: { title, aliases, summary } }
3. For each target file:
   a. Read content
   b. Skip if has merge conflict markers
   c. For each glossary term (longest first):
      - Find first occurrence (case-insensitive)
      - Skip if inside: <code>, <pre>, <a>, <!-- glossary:ignore -->
      - Insert: {{< term "slug" >}}matched_text{{< /term >}}
      - Mark term as processed (only once per file)
   d. Write file
4. Report: X files marked, Y terms inserted, Z skipped
```

**Skip Logic:**
```javascript
// Skip patterns
const skipPatterns = [
  /<code[^>]*>.*?<\/code>/gs,
  /<pre[^>]*>.*?<\/pre>/gs,
  /`[^`]+`/g,  // Inline code
  /<a[^>]*>.*?<\/a>/gs,  // Existing links
  /<!--\s*glossary:ignore\s*-->.*?<!--\s*\/glossary:ignore\s*-->/gs,
  /\{\{<.*?>\}\}/gs,  // Existing shortcodes
];
```

**Error Handling:**
- Merge conflicts → Skip with warning
- Missing frontmatter → Skip silently
- IO errors → Log and continue
- Invalid regex → Skip term with error

**Dependencies:**
```json
{
  "gray-matter": "^4.0.3",
  "fast-glob": "^3.3.2",
  "chalk": "^5.3.0",
  "yargs": "^17.7.2"
}
```

---

### 2. Hugo Shortcode: `layouts/shortcodes/term.html`

```go-html-template
{{- $slug := .Get 0 -}}
<abbr class="glossary-term" data-term="{{ $slug }}" title="{{ $slug }}">
  {{- .Inner -}}
</abbr>
```

**Output:**
```html
<abbr class="glossary-term" data-term="iot" title="iot">IoT</abbr>
```

---

### 3. Hugo Output Format: `glossary.json`

**Config:** `config/_default/hugo.toml`
```toml
[outputs]
  home = ["HTML", "RSS", "searchIndex", "glossary"]

[outputFormats.glossary]
  mediaType = "application/json"
  baseName = "glossary"
  isPlainText = true
  notAlternative = true
```

**Template:** `layouts/_default/index.glossary.json`
```go-html-template
{{- $glossary := dict -}}

{{- range where .Site.RegularPages "Section" "docs" -}}
  {{- if .Params.glossary.enabled -}}
    {{- $slug := path.Base .File.Dir -}}
    {{- $category := .CurrentSection -}}

    {{- $term := dict
      "title" .Title
      "url" .RelPermalink
      "summary" (.Params.glossary.summary | markdownify)
      "aliases" (.Params.glossary.aliases | default slice)
      "category" .Section
      "category_icon" ($category.Params.category_icon | default "")
    -}}

    {{- $glossary = merge $glossary (dict $slug $term) -}}
  {{- end -}}
{{- end -}}

{{- $glossary | jsonify (dict "indent" "  ") -}}
```

---

### 4. JavaScript: `assets/js/glossary-tooltips.js`

**Features:**
- Fetch `glossary.json` (cache 24h in localStorage)
- Attach tooltips to all `<abbr data-term="...">`
- Smart positioning (above/below viewport)
- Lazy load (only when scrolled into view)

**Pseudo-code:**
```javascript
class GlossaryTooltips {
  async init() {
    this.glossary = await this.loadGlossary();
    this.attachTooltips();
  }

  async loadGlossary() {
    // Check localStorage cache
    const cached = localStorage.getItem('glossary');
    const cacheTime = localStorage.getItem('glossary_time');

    if (cached && Date.now() - cacheTime < 24 * 60 * 60 * 1000) {
      return JSON.parse(cached);
    }

    // Fetch fresh
    const res = await fetch('/glossary.json');
    const data = await res.json();

    localStorage.setItem('glossary', JSON.stringify(data));
    localStorage.setItem('glossary_time', Date.now());

    return data;
  }

  attachTooltips() {
    document.querySelectorAll('.glossary-term').forEach(abbr => {
      const slug = abbr.dataset.term;
      const data = this.glossary[slug];

      if (!data) return;

      const tooltip = this.createTooltip(data);
      abbr.appendChild(tooltip);

      abbr.addEventListener('mouseenter', () => this.showTooltip(tooltip));
      abbr.addEventListener('mouseleave', () => this.hideTooltip(tooltip));
    });
  }

  createTooltip(data) {
    const tooltip = document.createElement('div');
    tooltip.className = 'glossary-tooltip';
    tooltip.innerHTML = `
      <h4>${data.title}</h4>
      <div>${data.summary}</div>
      <a href="${data.url}">Czytaj więcej →</a>
    `;
    return tooltip;
  }

  showTooltip(tooltip) {
    const rect = tooltip.parentElement.getBoundingClientRect();
    const spaceAbove = rect.top;
    const spaceBelow = window.innerHeight - rect.bottom;

    if (spaceAbove > spaceBelow) {
      tooltip.classList.add('above');
    } else {
      tooltip.classList.add('below');
    }

    tooltip.classList.add('visible');
  }
}

new GlossaryTooltips().init();
```

---

### 5. SCSS: `assets/scss/components/_glossary-tooltips.scss`

```scss
.glossary-term {
  position: relative;
  border-bottom: 1px dotted var(--bs-primary);
  cursor: help;
  text-decoration: none;
  color: var(--bs-primary);

  &:hover {
    border-bottom-style: solid;
  }
}

.glossary-tooltip {
  display: none;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  width: 320px;
  max-width: 90vw;
  padding: 1rem 1.25rem;
  background: var(--bs-gray-900);
  color: var(--bs-white);
  border-radius: 0.75rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  z-index: 1000;

  &.visible {
    display: block;
  }

  &.above {
    bottom: calc(100% + 12px);
  }

  &.below {
    top: calc(100% + 12px);
  }

  h4 {
    margin: 0 0 0.5rem;
    font-size: 1rem;
    font-weight: 600;
  }

  a {
    display: inline-block;
    margin-top: 0.75rem;
    color: var(--bs-primary-light);
    font-size: 0.875rem;

    &:hover {
      color: var(--bs-primary);
    }
  }
}
```

---

### 6. Glossary Page: `layouts/dict/list.html`

**URL:** `/docs/dict/`

**Layout:**
```html
{{ define "main" }}
<div class="container glossary-page">
  <h1>Słownik Pojęć</h1>

  <!-- Alphabet navigation -->
  <nav class="alphabet-nav">
    {{ range $letter := slice "A" "B" "C" "D" "E" "F" "G" "H" "I" "J" "K" "L" "M" "N" "O" "P" "Q" "R" "S" "T" "U" "V" "W" "X" "Y" "Z" }}
      <a href="#{{ $letter }}">{{ $letter }}</a>
    {{ end }}
  </nav>

  <!-- Terms grouped by letter -->
  {{ range $letter, $terms := .Site.Taxonomies.glossary_letter }}
  <section id="{{ $letter }}" class="letter-group">
    <h2>{{ $letter }}</h2>

    {{ range $terms }}
    <article class="glossary-card">
      <div class="glossary-card__header">
        <h3><a href="{{ .RelPermalink }}">{{ .Title }}</a></h3>

        <span class="badge badge-{{ .Params.glossary.category }}">
          {{ .CurrentSection.Title }}
        </span>
      </div>

      <div class="glossary-card__summary">
        {{ .Params.glossary.summary | markdownify }}
      </div>

      {{ with .Params.glossary.aliases }}
      <div class="glossary-card__aliases">
        <strong>Znane też jako:</strong> {{ delimit . ", " }}
      </div>
      {{ end }}

      <a href="{{ .RelPermalink }}" class="btn-read-more">
        Czytaj więcej →
      </a>
    </article>
    {{ end }}
  </section>
  {{ end }}
</div>
{{ end }}
```

---

## Pre-commit Hook

**File:** `.husky/pre-commit` (or `.git/hooks/pre-commit`)

```bash
#!/bin/sh

# Detect changed content files
CHANGED=$(git diff --cached --name-only --diff-filter=ACM | grep '^content/.*\.md$')

if [ -z "$CHANGED" ]; then
  exit 0  # No content changes
fi

# Check environment variable for auto-mode
if [ "$GLOSSARY_AUTO_MARK" = "true" ]; then
  echo "🔄 Auto-marking glossary terms..."
  pnpm run glossary:mark --staged
  git add $CHANGED
  exit 0
fi

# Manual mode: show preview and abort
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📝 Glossary terms detected in changed files:"
echo ""
echo "$CHANGED"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "Preview changes:"
echo "  pnpm run glossary:mark --dry-run"
echo ""
echo "Apply changes:"
echo "  pnpm run glossary:mark --staged"
echo "  git add ."
echo "  git commit"
echo ""
echo "Or auto-mark:"
echo "  GLOSSARY_AUTO_MARK=true git commit"
echo ""
echo "Skip hook:"
echo "  git commit --no-verify"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

exit 1  # Abort commit
```

**User workflows:**

```bash
# Workflow 1: Manual review (default)
git add content/blog/my-post.md
git commit -m "Add post"
# → Hook aborts, shows instructions
pnpm run glossary:mark --dry-run  # Preview
pnpm run glossary:mark --staged   # Apply
git diff                          # Review
git commit -m "Add post"          # Success

# Workflow 2: Auto mode
GLOSSARY_AUTO_MARK=true git commit -m "Add post"
# → Hook auto-marks and commits

# Workflow 3: Skip hook
git commit --no-verify -m "Add post"
```

---

## Testing Strategy

**General Testing Architecture:** See `.claude/specs/000-testing-architecture.md` for:
- Playwright setup and configuration
- Test structure templates
- Best practices and anti-patterns
- Page Object Model examples
- CI/CD integration
- Debugging techniques

**This section covers glossary-specific test cases only.**

---

### Unit Tests (Vitest)

**File:** `tests/unit/mark-glossary-terms.test.js`

**Purpose:** Test the build script logic in isolation

**Test cases:**
```javascript
import { describe, it, expect } from 'vitest';
import { markTerms } from '../scripts/mark-glossary-terms.mjs';

describe('markTerms', () => {
  const glossary = {
    iot: {
      title: 'IoT',
      aliases: ['IoT', 'Internet of Things']
    }
  };

  it('marks first occurrence only', () => {
    const input = 'IoT systems use IoT devices.';
    const output = markTerms(input, glossary);

    expect(output).toContain('<abbr data-term="iot">IoT</abbr>');
    expect(output.match(/<abbr/g)).toHaveLength(1);  // Only one marked
  });

  it('skips inline code blocks', () => {
    const input = 'Use `IoT` in code.';
    const output = markTerms(input, glossary);
    expect(output).toBe(input);  // Unchanged
  });

  it('skips existing links', () => {
    const input = '[IoT](https://example.com) is cool.';
    const output = markTerms(input, glossary);
    expect(output).toBe(input);
  });

  it('respects ignore comments', () => {
    const input = '<!-- glossary:ignore -->IoT relay<!-- /glossary:ignore -->';
    const output = markTerms(input, glossary);
    expect(output).toBe(input);
  });

  it('is case-insensitive', () => {
    const input = 'iot, IoT, IOT are different cases.';
    const output = markTerms(input, glossary);
    expect(output.match(/<abbr/g)).toHaveLength(1);  // Only first marked
  });

  it('handles merge conflicts gracefully', () => {
    const input = '<<<<<<< HEAD\nIoT\n=======\nInternet of Things\n>>>>>>> branch';
    const result = markFile(input, glossary);
    expect(result.skipped).toBe(true);
    expect(result.reason).toBe('conflict');
  });
});
```

---

### E2E Tests (Playwright)

**File:** `tests/e2e/glossary-tooltips.spec.js`

```javascript
import { test, expect } from '@playwright/test';

test.describe('Glossary Tooltips', () => {
  test('should show tooltip on hover', async ({ page }) => {
    await page.goto('/blog/test-article/');

    const term = page.locator('.glossary-term').first();
    await term.hover();

    const tooltip = page.locator('.glossary-tooltip.visible');
    await expect(tooltip).toBeVisible();
  });

  test('tooltip contains title, summary, and link', async ({ page }) => {
    await page.goto('/blog/test-article/');
    await page.locator('.glossary-term').first().hover();

    const tooltip = page.locator('.glossary-tooltip');
    await expect(tooltip.locator('h4')).toContainText('IoT');
    await expect(tooltip.locator('a')).toHaveAttribute('href', /\/docs\/concepts\/iot/);
  });

  test('should mark only first occurrence', async ({ page }) => {
    await page.goto('/blog/multiple-iot-mentions/');

    const terms = page.locator('.glossary-term');
    await expect(terms).toHaveCount(1);
  });

  test('should not mark terms in code blocks', async ({ page }) => {
    await page.goto('/blog/technical-article/');

    const codeIoT = page.locator('code:has-text("IoT")');
    await expect(codeIoT).not.toHaveClass(/glossary-term/);
  });

  test('tooltip positions correctly near viewport edges', async ({ page }) => {
    await page.goto('/blog/article/');

    const topTerm = page.locator('.glossary-term').first();
    await topTerm.hover();

    const tooltip = page.locator('.glossary-tooltip');
    const hasPositionClass = await tooltip.evaluate(el =>
      el.classList.contains('above') || el.classList.contains('below')
    );

    expect(hasPositionClass).toBe(true);
  });

  test('clicking link navigates to docs', async ({ page }) => {
    await page.goto('/blog/article/');
    await page.locator('.glossary-term').first().hover();
    await page.locator('.glossary-tooltip a').click();

    await expect(page).toHaveURL(/\/docs\/concepts\/iot/);
  });
});

test.describe('Glossary Page', () => {
  test('shows alphabetical index', async ({ page }) => {
    await page.goto('/docs/dict/');

    const nav = page.locator('.alphabet-nav');
    await expect(nav.locator('a[href="#A"]')).toBeVisible();
  });

  test('displays term cards with metadata', async ({ page }) => {
    await page.goto('/docs/dict/');

    const card = page.locator('.glossary-card').first();
    await expect(card.locator('h3')).toBeVisible();
    await expect(card.locator('.badge')).toBeVisible();
    await expect(card.locator('.glossary-card__summary')).toBeVisible();
  });

  test('shows aliases when present', async ({ page }) => {
    await page.goto('/docs/dict/');

    const aliases = page.locator('.glossary-card__aliases');
    await expect(aliases.first()).toContainText('Znane też jako');
  });
});
```

### Performance Tests

```javascript
test.describe('Performance', () => {
  test('glossary.json loads in <1s', async ({ page }) => {
    const start = Date.now();
    await page.goto('/blog/article/');
    await page.waitForLoadState('networkidle');
    const duration = Date.now() - start;

    expect(duration).toBeLessThan(1000);
  });

  test('tooltip appears in <100ms', async ({ page }) => {
    await page.goto('/blog/article/');

    const term = page.locator('.glossary-term').first();
    const start = Date.now();
    await term.hover();
    await page.locator('.glossary-tooltip.visible').waitFor();
    const duration = Date.now() - start;

    expect(duration).toBeLessThan(100);
  });
});
```

---

## Dependencies

### npm Packages

```json
{
  "scripts": {
    "glossary:mark": "node scripts/mark-glossary-terms.mjs",
    "glossary:preview": "node scripts/mark-glossary-terms.mjs --dry-run"
  },
  "devDependencies": {
    "gray-matter": "^4.0.3",
    "fast-glob": "^3.3.2",
    "chalk": "^5.3.0",
    "yargs": "^17.7.2",
    "@playwright/test": "^1.40.0",
    "vitest": "^1.0.0"
  }
}
```

### Hugo Version

- Minimum: `0.100.0` (for goldmark attributes)
- Project uses: `0.121.1` ✅

---

## Performance Targets

| Metric | Target | Rationale |
|--------|--------|-----------|
| `glossary.json` size | < 100 KB | 100 terms × ~1KB = fast download |
| localStorage cache | 24h | Balance freshness vs performance |
| Tooltip render time | < 100ms | 60fps = 16ms/frame, 100ms feels instant |
| Build script time | < 5s for 100 files | Acceptable for pre-commit hook |
| First paint delay | < 50ms | No blocking JS on page load |

---

## Accessibility

- ✅ Semantic HTML: `<abbr>` with `title` attribute
- ✅ Keyboard navigation: Tab to term, hover shows tooltip
- ✅ Screen readers: `title` attribute provides fallback
- ✅ ARIA labels: Future enhancement (see FUTURE.md)
- ✅ Color contrast: WCAG AA compliant (4.5:1 ratio)

---

## SEO Benefits

1. **Internal linking:** Every tooltip = backlink to `/docs/`
2. **Glossary page:** Rich content page (`/docs/dict/`)
3. **Schema.org:** Future enhancement (DefinedTerm markup)
4. **Aliases:** Hugo redirects for synonyms (301 SEO-friendly)
5. **Long-tail keywords:** Definitions target search queries

**Expected impact:**
- +20% internal pageviews (tooltips → docs)
- +50% `/docs/` pages indexed (glossary page links)
- +10% search traffic (glossary page ranks for terms)

---

## Migration Plan

### Phase 1: Add frontmatter to existing docs
```bash
# Script to add glossary fields to all docs
node scripts/migrate-docs-frontmatter.mjs
```

### Phase 2: Test on sample content
- Mark 5 blog posts manually
- Test tooltips, glossary page
- Fix bugs

### Phase 3: Bulk migration
- Run `pnpm run glossary:mark --all`
- Review diff (expect 500+ insertions)
- Commit

### Phase 4: Enable pre-commit hook
- Test in manual mode
- Switch to auto mode after 1 week

---

## Constraints & Limitations

1. **Hugo limitation:** `glossary.json` not auto-regenerated in dev mode
   - **Workaround:** Manual `hugo` run or restart server

2. **Build script:** Only processes `.md` files (not `.html`, `.json`)
   - **Acceptable:** Content is in Markdown

3. **Client-side JS required:** No fallback for JS-disabled browsers
   - **Mitigation:** `<abbr title="">` provides basic tooltip

4. **Case sensitivity:** "IoT" vs "iot" vs "IOT"
   - **Solution:** Case-insensitive regex matching

5. **False positives:** "przekaźnik wiedzy" (relay of knowledge)
   - **Mitigation:** Manual `<!-- glossary:ignore -->`

---

## Rollback Plan

If production issues occur:

1. **Disable tooltips:** Comment out JS include
2. **Revert shortcodes:** Find-replace `{{< term ... >}}` → plain text
3. **Remove glossary page:** Delete `/docs/dict/`
4. **Disable pre-commit hook:** Remove `.husky/pre-commit`

**Recovery time:** < 1 hour

---

## Success Metrics

### Technical Metrics
- [ ] Build script processes 100 files in < 10s
- [ ] `glossary.json` < 100 KB
- [ ] Tooltip render < 100ms
- [ ] Zero console errors in production
- [ ] Playwright tests: 100% pass rate

### Business Metrics
- [ ] +20% clicks to `/docs/` from blog posts (Google Analytics)
- [ ] +10% time on page (tooltips engagement)
- [ ] +50% indexed docs pages (Google Search Console)
- [ ] User feedback: "tooltips helpful" > 80%

---

## References

- **Hugo Shortcodes:** https://gohugo.io/content-management/shortcodes/
- **Output Formats:** https://gohugo.io/templates/output-formats/
- **Frontmatter:** https://gohugo.io/content-management/front-matter/
- **Playwright:** https://playwright.dev/docs/intro
- **Schema.org DefinedTerm:** https://schema.org/DefinedTerm

---

## Appendix A: File Structure

```
ihome.zentala.io/
├── .claude/
│   ├── specs/
│   │   ├── 001-glossary-tooltips.md (this file)
│   │   └── 001-glossary-tooltips.FUTURE.md
│   └── tasks/
│       └── GLOSSARY_TOOLTIPS.md
├── .husky/
│   └── pre-commit
├── content/
│   └── docs/
│       ├── actuators/
│       │   ├── _index.md (category metadata)
│       │   └── przekazniki.md (glossary.enabled: true)
│       └── concepts/
│           ├── _index.md
│           └── iot.md
├── layouts/
│   ├── shortcodes/
│   │   └── term.html
│   ├── _default/
│   │   └── index.glossary.json
│   └── dict/
│       └── list.html
├── assets/
│   ├── js/
│   │   └── glossary-tooltips.js
│   └── scss/
│       └── components/
│           └── _glossary-tooltips.scss
├── scripts/
│   ├── mark-glossary-terms.mjs
│   └── migrate-docs-frontmatter.mjs
├── tests/
│   ├── unit/
│   │   └── mark-glossary-terms.test.js
│   └── e2e/
│       └── glossary-tooltips.spec.js
└── package.json
```

---

**End of Specification**
