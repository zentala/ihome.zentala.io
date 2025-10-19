# Task: Glossary Tooltips System Implementation

**Status:** Ready for Development
**Created:** 2025-10-18
**Spec:** `.claude/specs/001-glossary-tooltips.md`
**Future:** `.claude/specs/001-glossary-tooltips.FUTURE.md`
**Complexity:** Medium (5-7 days for MVP)

---

## Objective

Implement an interactive glossary tooltips system that:
- Automatically detects technical terms in content
- Shows inline definitions on hover
- Creates SEO-optimized glossary page
- Uses single source of truth (frontmatter)

---

## Pre-requisites

- [ ] Hugo 0.121.1 Extended installed ✅
- [ ] pnpm 8.12.0+ installed ✅
- [ ] Node.js 18.14.1+ installed ✅
- [ ] Git configured with user.name and user.email
- [ ] Playwright installed (for E2E tests)

---

## Phase 1: Foundation (Day 1-2)

### 1.1 Setup Dependencies

**File:** `package.json`

```bash
pnpm add -D gray-matter fast-glob chalk yargs
pnpm add -D @playwright/test vitest
```

**Acceptance criteria:**
- [ ] All dependencies installed successfully
- [ ] `pnpm run test` command works (even if no tests yet)

---

### 1.2 Create Frontmatter Schema

**Files to update:**
- `content/docs/actuators/_index.md` (category example)
- `content/docs/concepts/iot.md` (term example)

**Category frontmatter (_index.md):**
```yaml
---
title: "Actuators"
weight: 10
category_icon: "switch-3"  # Tabler icon (future use)
category_color: "#ff6b6b"
---
```

**Term frontmatter (any docs page):**
```yaml
---
title: "IoT (Internet of Things)"
date: 2023-09-07
contributors: ['Paweł Żentała']
draft: false

glossary:
  enabled: true
  summary: |
    **Internet Rzeczy (IoT)** to sieć urządzeń codziennego użytku połączonych z internetem.
  aliases:
    - "Internet Rzeczy"
    - "Internet of Things"
    - "IoT"

aliases:
  - /internet-of-things/
  - /internet-rzeczy/

seo:
  title: "IoT | Dokumentacja"
  description: "..."
---
```

**Acceptance criteria:**
- [ ] 3+ categories have updated `_index.md` with `category_icon`
- [ ] 5+ docs pages have `glossary.enabled: true`
- [ ] All summaries are markdown-formatted
- [ ] All summaries are 1-3 sentences max
- [ ] Aliases are lowercase slugs (no `/docs/` prefix)

---

### 1.3 Create Hugo Shortcode

**File:** `layouts/shortcodes/term.html`

```go-html-template
{{- $slug := .Get 0 -}}
<abbr class="glossary-term" data-term="{{ $slug }}" title="{{ $slug }}">
  {{- .Inner -}}
</abbr>
```

**Test manually:**

Edit any markdown file:
```markdown
This is a test: {{< term "iot" >}}IoT{{< /term >}} is cool.
```

Run `pnpm run dev`, check HTML output:
```html
This is a test: <abbr class="glossary-term" data-term="iot" title="iot">IoT</abbr> is cool.
```

**Acceptance criteria:**
- [ ] Shortcode file created
- [ ] Test page renders `<abbr>` correctly
- [ ] No Hugo build errors

---

## Phase 2: Build Script (Day 2-3)

### 2.1 Create Mark Glossary Script

**File:** `scripts/mark-glossary-terms.mjs`

**Key functions:**
1. `parseGlossary()` - Read all docs frontmatter
2. `buildTermsIndex()` - Create { slug: { title, aliases } } map
3. `markFile()` - Process single file
4. `markTerms()` - Insert shortcodes
5. `skipPatterns()` - Ignore code blocks, links, etc.

**Pseudo-code structure:**
```javascript
#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import glob from 'fast-glob';
import chalk from 'chalk';
import yargs from 'yargs';

const argv = yargs(process.argv.slice(2))
  .option('all', { type: 'boolean', description: 'Mark all content files' })
  .option('dirty', { type: 'boolean', description: 'Mark uncommitted files only' })
  .option('staged', { type: 'boolean', description: 'Mark staged files only' })
  .option('dry-run', { type: 'boolean', description: 'Preview without writing' })
  .option('verbose', { type: 'boolean', description: 'Verbose output' })
  .argv;

// Main flow
async function main() {
  console.log(chalk.blue('📚 Building glossary index...'));
  const glossary = await parseGlossary();

  console.log(chalk.blue(`Found ${Object.keys(glossary).length} terms\n`));

  const files = await getTargetFiles(argv);

  let marked = 0, skipped = 0;

  for (const file of files) {
    const result = await markFile(file, glossary, argv);
    if (result.success) marked++;
    else skipped++;
  }

  console.log(chalk.green(`\n✓ Marked ${marked} files`));
  if (skipped > 0) {
    console.log(chalk.yellow(`⚠ Skipped ${skipped} files`));
  }
}

main().catch(console.error);
```

**Acceptance criteria:**
- [ ] Script runs without errors: `node scripts/mark-glossary-terms.mjs --help`
- [ ] `--dry-run` shows preview without writing files
- [ ] `--all` processes all content/**/*.md files
- [ ] `--dirty` processes only git uncommitted files
- [ ] `--staged` processes only git staged files
- [ ] Script skips code blocks, existing links, <!-- glossary:ignore -->
- [ ] Script marks only first occurrence of each term per file
- [ ] Script handles merge conflicts gracefully (skips with warning)
- [ ] Verbose mode shows detailed progress

---

### 2.2 Add npm Scripts

**File:** `package.json`

```json
{
  "scripts": {
    "glossary:mark": "node scripts/mark-glossary-terms.mjs",
    "glossary:preview": "node scripts/mark-glossary-terms.mjs --dry-run",
    "glossary:all": "node scripts/mark-glossary-terms.mjs --all"
  }
}
```

**Test:**
```bash
pnpm run glossary:preview  # Should show what would be marked
pnpm run glossary:mark --all  # Mark all files
```

**Acceptance criteria:**
- [ ] All npm scripts work
- [ ] `glossary:preview` shows diff without writing
- [ ] `glossary:all` marks all content files

---

### 2.3 Create Unit Tests

**File:** `tests/unit/mark-glossary-terms.test.js`

```javascript
import { describe, it, expect } from 'vitest';
import { markTerms, skipPatterns } from '../../scripts/mark-glossary-terms.mjs';

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
    expect(output).toContain('{{< term "iot" >}}IoT{{< /term >}}');
    expect(output.split('{{< term').length).toBe(2); // Only 1 occurrence marked
  });

  it('skips code blocks', () => {
    const input = 'Use `IoT` in code.';
    const output = markTerms(input, glossary);
    expect(output).toBe(input); // Unchanged
  });

  it('skips existing links', () => {
    const input = '[IoT](https://example.com)';
    const output = markTerms(input, glossary);
    expect(output).toBe(input);
  });

  it('respects ignore comments', () => {
    const input = '<!-- glossary:ignore -->IoT relay<!-- /glossary:ignore -->';
    const output = markTerms(input, glossary);
    expect(output).toBe(input);
  });

  it('is case-insensitive', () => {
    const input = 'iot, IoT, IOT are all marked once.';
    const output = markTerms(input, glossary);
    expect(output.split('{{< term').length).toBe(2); // Only first marked
  });
});
```

**Run tests:**
```bash
pnpm run test
```

**Acceptance criteria:**
- [ ] All unit tests pass
- [ ] Test coverage > 80%
- [ ] Tests run in < 1 second

---

## Phase 3: Hugo Integration (Day 3-4)

### 3.1 Create glossary.json Output Format

**File:** `config/_default/hugo.toml`

```toml
[outputs]
  home = ["HTML", "RSS", "searchIndex", "glossary"]

[outputFormats.glossary]
  mediaType = "application/json"
  baseName = "glossary"
  isPlainText = true
  notAlternative = true
```

**File:** `layouts/_default/index.glossary.json`

```go-html-template
{{- $glossary := dict -}}

{{- range where .Site.RegularPages "Section" "docs" -}}
  {{- if .Params.glossary.enabled -}}
    {{- $slug := path.Base .File.Dir -}}
    {{- if eq $slug "." -}}
      {{- $slug = .File.TranslationBaseName -}}
    {{- end -}}

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

**Test:**
```bash
pnpm run build
cat public/glossary.json
```

**Acceptance criteria:**
- [ ] `public/glossary.json` is generated
- [ ] JSON is valid (no syntax errors)
- [ ] Contains all terms with `glossary.enabled: true`
- [ ] Summary is HTML (markdown rendered)
- [ ] Category icon is included
- [ ] File size < 100 KB

---

### 3.2 Create Glossary Page Layout

**File:** `layouts/dict/list.html`

```go-html-template
{{ define "main" }}
<div class="container glossary-page">
  <header class="page-header">
    <h1>{{ .Title }}</h1>
    <p class="lead">{{ .Description }}</p>
  </header>

  <!-- Alphabet navigation -->
  <nav class="alphabet-nav" aria-label="Alfabetyczny index">
    {{ range $letter := slice "A" "B" "C" "D" "E" "F" "G" "H" "I" "J" "K" "L" "M" "N" "O" "P" "Q" "R" "S" "T" "U" "V" "W" "X" "Y" "Z" }}
      <a href="#{{ $letter }}">{{ $letter }}</a>
    {{ end }}
  </nav>

  <!-- Terms grouped alphabetically -->
  {{- $terms := where .Site.RegularPages "Section" "docs" -}}
  {{- $terms = where $terms "Params.glossary.enabled" true -}}

  {{- range $letter := slice "A" "B" "C" "D" "E" "F" "G" "H" "I" "J" "K" "L" "M" "N" "O" "P" "Q" "R" "S" "T" "U" "V" "W" "X" "Y" "Z" -}}
    {{- $letterTerms := where $terms ".Title" "^" $letter -}}
    {{- if $letterTerms -}}
    <section id="{{ $letter }}" class="letter-group">
      <h2>{{ $letter }}</h2>

      <div class="glossary-grid">
        {{- range $letterTerms -}}
        <article class="glossary-card">
          <div class="glossary-card__header">
            <h3>
              <a href="{{ .RelPermalink }}">{{ .Title }}</a>
            </h3>
            <span class="badge badge-{{ .Params.glossary.category }}">
              {{ .CurrentSection.Title }}
            </span>
          </div>

          <div class="glossary-card__summary">
            {{ .Params.glossary.summary | markdownify }}
          </div>

          {{- with .Params.glossary.aliases -}}
          <div class="glossary-card__aliases">
            <strong>Znane też jako:</strong> {{ delimit . ", " }}
          </div>
          {{- end -}}

          <a href="{{ .RelPermalink }}" class="btn-read-more">
            Czytaj więcej →
          </a>
        </article>
        {{- end -}}
      </div>
    </section>
    {{- end -}}
  {{- end -}}
</div>
{{ end }}
```

**Create glossary index page:**

**File:** `content/docs/dict/_index.md`

```yaml
---
title: "Słownik Pojęć"
description: "Kompletny słownik terminów związanych ze smart home, automatyką i instalacjami elektrycznymi."
layout: "dict"
---
```

**Acceptance criteria:**
- [ ] `/docs/dict/` page renders without errors
- [ ] Alphabet navigation works
- [ ] All terms are grouped by first letter
- [ ] Category badges show correctly
- [ ] Aliases are displayed
- [ ] "Czytaj więcej" links work

---

## Phase 4: Frontend (Day 4-5)

### 4.1 Create JavaScript Module

**File:** `assets/js/glossary-tooltips.js`

```javascript
/**
 * Glossary Tooltips System
 * Loads glossary.json and attaches interactive tooltips to marked terms
 */

class GlossaryTooltips {
  constructor() {
    this.glossary = {};
    this.cacheKey = 'glossary_cache';
    this.cacheTimeKey = 'glossary_cache_time';
    this.cacheExpiry = 24 * 60 * 60 * 1000; // 24 hours
  }

  async init() {
    try {
      this.glossary = await this.loadGlossary();
      this.attachTooltips();
    } catch (error) {
      console.error('Failed to initialize glossary tooltips:', error);
    }
  }

  async loadGlossary() {
    // Check localStorage cache
    const cached = localStorage.getItem(this.cacheKey);
    const cacheTime = localStorage.getItem(this.cacheTimeKey);

    if (cached && cacheTime && Date.now() - parseInt(cacheTime) < this.cacheExpiry) {
      return JSON.parse(cached);
    }

    // Fetch fresh data
    const response = await fetch('/glossary.json');
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const data = await response.json();

    // Cache for 24h
    localStorage.setItem(this.cacheKey, JSON.stringify(data));
    localStorage.setItem(this.cacheTimeKey, Date.now().toString());

    return data;
  }

  attachTooltips() {
    const terms = document.querySelectorAll('.glossary-term');

    terms.forEach(abbr => {
      const slug = abbr.dataset.term;
      const data = this.glossary[slug];

      if (!data) {
        console.warn(`Glossary term not found: ${slug}`);
        return;
      }

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
      <div class="glossary-tooltip__content">
        <h4 class="glossary-tooltip__title">${data.title}</h4>
        <div class="glossary-tooltip__summary">${data.summary}</div>
        <a href="${data.url}" class="glossary-tooltip__link">
          Czytaj więcej →
        </a>
      </div>
    `;
    return tooltip;
  }

  showTooltip(tooltip) {
    const rect = tooltip.parentElement.getBoundingClientRect();
    const spaceAbove = rect.top;
    const spaceBelow = window.innerHeight - rect.bottom;

    // Smart positioning
    if (spaceAbove > 200 && spaceAbove > spaceBelow) {
      tooltip.classList.add('glossary-tooltip--above');
      tooltip.classList.remove('glossary-tooltip--below');
    } else {
      tooltip.classList.add('glossary-tooltip--below');
      tooltip.classList.remove('glossary-tooltip--above');
    }

    tooltip.classList.add('visible');
  }

  hideTooltip(tooltip) {
    tooltip.classList.remove('visible');
  }
}

// Initialize on DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => new GlossaryTooltips().init());
} else {
  new GlossaryTooltips().init();
}
```

**Acceptance criteria:**
- [ ] Script loads without errors
- [ ] `glossary.json` is fetched successfully
- [ ] localStorage caching works (check DevTools → Application)
- [ ] Tooltips appear on hover
- [ ] Smart positioning works (above/below)
- [ ] "Czytaj więcej" link navigates correctly

---

### 4.2 Create SCSS Styles

**File:** `assets/scss/components/_glossary-tooltips.scss`

```scss
// Glossary term styling
.glossary-term {
  position: relative;
  text-decoration: none;
  border-bottom: 1px dotted var(--bs-primary);
  cursor: help;
  color: var(--bs-primary);
  transition: all 0.2s ease;

  &:hover {
    border-bottom-style: solid;
    color: var(--bs-primary-dark, var(--bs-primary));
  }
}

// Tooltip container
.glossary-tooltip {
  display: none;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  width: 320px;
  max-width: 90vw;
  z-index: 1000;
  pointer-events: none;

  &.visible {
    display: block;
    pointer-events: auto;
  }

  &--above {
    bottom: calc(100% + 12px);
  }

  &--below {
    top: calc(100% + 12px);
  }
}

// Tooltip content
.glossary-tooltip__content {
  background: var(--bs-gray-900, #1a1a1a);
  color: var(--bs-white, #ffffff);
  padding: 1rem 1.25rem;
  border-radius: 0.75rem;
  box-shadow:
    0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06),
    0 0 0 1px rgba(255, 255, 255, 0.1);

  // Arrow
  &::before {
    content: '';
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    border: 8px solid transparent;

    .glossary-tooltip--above & {
      bottom: -16px;
      border-top-color: var(--bs-gray-900, #1a1a1a);
    }

    .glossary-tooltip--below & {
      top: -16px;
      border-bottom-color: var(--bs-gray-900, #1a1a1a);
    }
  }
}

.glossary-tooltip__title {
  margin: 0 0 0.5rem;
  font-size: 1rem;
  font-weight: 600;
  color: var(--bs-white, #ffffff);
}

.glossary-tooltip__summary {
  margin: 0 0 0.75rem;
  font-size: 0.875rem;
  line-height: 1.5;
  color: var(--bs-gray-300, #d1d5db);

  // Markdown content styling
  p {
    margin: 0 0 0.5rem;

    &:last-child {
      margin-bottom: 0;
    }
  }

  strong {
    font-weight: 600;
  }

  a {
    color: var(--bs-primary-light, var(--bs-primary));
    text-decoration: underline;
  }
}

.glossary-tooltip__link {
  display: inline-flex;
  align-items: center;
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--bs-primary-light, var(--bs-primary));
  text-decoration: none;
  transition: color 0.2s ease;

  &:hover {
    color: var(--bs-primary, #007bff);
  }

  &::after {
    content: '→';
    margin-left: 0.25rem;
  }
}

// Glossary page styles
.glossary-page {
  .alphabet-nav {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin: 2rem 0;
    padding: 1rem;
    background: var(--bs-gray-100, #f3f4f6);
    border-radius: 0.5rem;

    a {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 2rem;
      height: 2rem;
      font-weight: 600;
      color: var(--bs-gray-700, #374151);
      text-decoration: none;
      transition: all 0.2s ease;

      &:hover {
        color: var(--bs-primary);
        background: var(--bs-white, #ffffff);
        border-radius: 0.25rem;
      }
    }
  }

  .letter-group {
    margin: 3rem 0;

    h2 {
      font-size: 2rem;
      font-weight: 700;
      color: var(--bs-gray-900, #111827);
      margin-bottom: 1.5rem;
      padding-bottom: 0.5rem;
      border-bottom: 2px solid var(--bs-primary);
    }
  }

  .glossary-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 1.5rem;
  }

  .glossary-card {
    padding: 1.5rem;
    background: var(--bs-white, #ffffff);
    border: 1px solid var(--bs-gray-200, #e5e7eb);
    border-radius: 0.75rem;
    transition: all 0.2s ease;

    &:hover {
      border-color: var(--bs-primary);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }
  }

  .glossary-card__header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 1rem;

    h3 {
      margin: 0;
      font-size: 1.25rem;
      font-weight: 600;

      a {
        color: var(--bs-gray-900, #111827);
        text-decoration: none;

        &:hover {
          color: var(--bs-primary);
        }
      }
    }

    .badge {
      font-size: 0.75rem;
      padding: 0.25rem 0.5rem;
      border-radius: 0.25rem;
      background: var(--bs-gray-200, #e5e7eb);
      color: var(--bs-gray-700, #374151);
    }
  }

  .glossary-card__summary {
    font-size: 0.875rem;
    line-height: 1.6;
    color: var(--bs-gray-600, #4b5563);
    margin-bottom: 1rem;
  }

  .glossary-card__aliases {
    font-size: 0.875rem;
    color: var(--bs-gray-500, #6b7280);
    margin-bottom: 1rem;

    strong {
      font-weight: 600;
    }
  }

  .btn-read-more {
    display: inline-flex;
    align-items: center;
    font-size: 0.875rem;
    font-weight: 500;
    color: var(--bs-primary);
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }

    &::after {
      content: '→';
      margin-left: 0.25rem;
    }
  }
}
```

**Include in main SCSS:**

**File:** `assets/scss/app.scss` (or wherever main styles are)

```scss
@import "components/glossary-tooltips";
```

**Acceptance criteria:**
- [ ] Tooltips styled correctly (dark background, white text)
- [ ] Arrows point to term
- [ ] Positioning works (above/below)
- [ ] Glossary page grid layout works
- [ ] Responsive on mobile
- [ ] No layout shifts on hover

---

### 4.3 Integrate JavaScript into Hugo

**File:** `layouts/partials/footer/custom-footer.html`

```go-html-template
<!-- Glossary tooltips -->
{{- if .IsPage -}}
  {{- $glossary := resources.Get "js/glossary-tooltips.js" -}}
  {{- $glossary := $glossary | js.Build (dict "minify" hugo.IsProduction) -}}
  <script src="{{ $glossary.RelPermalink }}" defer></script>
{{- end -}}
```

**Acceptance criteria:**
- [ ] JavaScript loads on all content pages
- [ ] JavaScript minified in production build
- [ ] No console errors
- [ ] Script defers (doesn't block page load)

---

## Phase 5: Pre-commit Hook (Day 5)

### 5.1 Create Pre-commit Hook

**File:** `.husky/pre-commit` (or `.git/hooks/pre-commit`)

```bash
#!/bin/sh

# Detect changed content files
CHANGED=$(git diff --cached --name-only --diff-filter=ACM | grep '^content/.*\.md$')

if [ -z "$CHANGED" ]; then
  exit 0  # No content changes, skip
fi

# Check for auto-mark mode
if [ "$GLOSSARY_AUTO_MARK" = "true" ]; then
  echo "🔄 Auto-marking glossary terms..."
  pnpm run glossary:mark --staged
  git add $CHANGED
  exit 0
fi

# Manual mode: show instructions and abort
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📝 Glossary terms detected in changed files:"
echo ""
echo "$CHANGED" | sed 's/^/  /'
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "Preview changes:"
echo "  pnpm run glossary:mark --dry-run --staged"
echo ""
echo "Apply changes:"
echo "  pnpm run glossary:mark --staged"
echo "  git add ."
echo "  git commit"
echo ""
echo "Auto-mark and commit:"
echo "  GLOSSARY_AUTO_MARK=true git commit"
echo ""
echo "Skip hook:"
echo "  git commit --no-verify"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

exit 1  # Abort commit
```

**Make executable:**
```bash
chmod +x .husky/pre-commit
# or
chmod +x .git/hooks/pre-commit
```

**Acceptance criteria:**
- [ ] Hook runs when committing content files
- [ ] Hook skips when no content changes
- [ ] Manual mode shows instructions and aborts
- [ ] Auto mode (`GLOSSARY_AUTO_MARK=true`) marks and commits
- [ ] `--no-verify` flag skips hook

---

### 5.2 Test Pre-commit Workflow

**Test scenarios:**

**1. Manual mode:**
```bash
echo "Test IoT content" >> content/blog/test.md
git add content/blog/test.md
git commit -m "Test commit"
# → Should abort with instructions
```

**2. Preview:**
```bash
pnpm run glossary:mark --dry-run --staged
# → Should show what would be marked
```

**3. Apply:**
```bash
pnpm run glossary:mark --staged
git diff  # Review changes
git commit -m "Test commit"  # Now succeeds
```

**4. Auto mode:**
```bash
echo "Test IoT content" >> content/blog/test2.md
git add content/blog/test2.md
GLOSSARY_AUTO_MARK=true git commit -m "Auto test"
# → Should auto-mark and commit
```

**Acceptance criteria:**
- [ ] All 4 scenarios work as expected
- [ ] No false positives (marking wrong occurrences)
- [ ] Git diff is readable
- [ ] Hook doesn't break regular commits (non-content files)

---

## Phase 6: Testing (Day 6)

### 6.1 Playwright E2E Tests

**File:** `playwright.config.js`

```javascript
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:1313',
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  webServer: {
    command: 'pnpm run dev',
    url: 'http://localhost:1313',
    reuseExistingServer: !process.env.CI,
  },
});
```

**File:** `tests/e2e/glossary-tooltips.spec.js`

```javascript
import { test, expect } from '@playwright/test';

test.describe('Glossary Tooltips', () => {
  test('should show tooltip on hover', async ({ page }) => {
    // Assuming you have a test page with glossary terms
    await page.goto('/blog/test-article/');

    const term = page.locator('.glossary-term').first();
    await term.hover();

    const tooltip = page.locator('.glossary-tooltip.visible');
    await expect(tooltip).toBeVisible();
  });

  test('tooltip contains correct content', async ({ page }) => {
    await page.goto('/blog/test-article/');

    const term = page.locator('.glossary-term[data-term="iot"]');
    await term.hover();

    const tooltip = page.locator('.glossary-tooltip');
    await expect(tooltip.locator('.glossary-tooltip__title')).toContainText('IoT');
    await expect(tooltip.locator('.glossary-tooltip__summary')).toBeVisible();
    await expect(tooltip.locator('.glossary-tooltip__link')).toHaveAttribute('href', /\/docs\/concepts\/iot/);
  });

  test('clicking link navigates to docs', async ({ page }) => {
    await page.goto('/blog/test-article/');

    await page.locator('.glossary-term').first().hover();
    await page.locator('.glossary-tooltip__link').click();

    await expect(page).toHaveURL(/\/docs\//);
  });
});

test.describe('Glossary Page', () => {
  test('shows all terms alphabetically', async ({ page }) => {
    await page.goto('/docs/dict/');

    const nav = page.locator('.alphabet-nav');
    await expect(nav).toBeVisible();

    const cards = page.locator('.glossary-card');
    await expect(cards).toHaveCount.greaterThan(0);
  });

  test('term card has all elements', async ({ page }) => {
    await page.goto('/docs/dict/');

    const card = page.locator('.glossary-card').first();
    await expect(card.locator('h3')).toBeVisible();
    await expect(card.locator('.badge')).toBeVisible();
    await expect(card.locator('.glossary-card__summary')).toBeVisible();
    await expect(card.locator('.btn-read-more')).toBeVisible();
  });
});
```

**Run tests:**
```bash
pnpm exec playwright test
pnpm exec playwright show-report
```

**Acceptance criteria:**
- [ ] All Playwright tests pass
- [ ] Tests cover tooltip show/hide
- [ ] Tests cover navigation
- [ ] Tests cover glossary page
- [ ] Test report generated

---

### 6.2 Performance Testing

**Manual checks:**

1. **glossary.json size:**
```bash
ls -lh public/glossary.json
# Should be < 100 KB
```

2. **Tooltip render time:**
   - Open DevTools → Performance
   - Record while hovering tooltip
   - Check: Time to visible < 100ms

3. **Build time:**
```bash
time pnpm run build
# Should complete in < 30 seconds
```

4. **Script execution time:**
```bash
time pnpm run glossary:mark --all
# Should process 100 files in < 10 seconds
```

**Acceptance criteria:**
- [ ] `glossary.json` < 100 KB
- [ ] Tooltip render < 100ms
- [ ] Build time < 30s
- [ ] Script time < 10s for 100 files

---

## Phase 7: Documentation & Launch (Day 7)

### 7.1 Update Runbook

**File:** `.claude/runbooks/2025-10-18.md`

Add section:
```markdown
## Glossary Tooltips System - Implementation Complete

### What was built:
- Automatic term detection and marking script
- Hugo shortcode for term markup
- Interactive tooltips with localStorage caching
- SEO-optimized glossary page at /docs/dict/
- Pre-commit hook for automatic marking
- Comprehensive test suite (unit + E2E)

### Files created:
- scripts/mark-glossary-terms.mjs
- layouts/shortcodes/term.html
- layouts/_default/index.glossary.json
- layouts/dict/list.html
- assets/js/glossary-tooltips.js
- assets/scss/components/_glossary-tooltips.scss
- .husky/pre-commit
- tests/unit/mark-glossary-terms.test.js
- tests/e2e/glossary-tooltips.spec.js

### How to use:
1. Add glossary metadata to docs pages
2. Run: pnpm run glossary:mark --all
3. Commit changes
4. Build: pnpm run build
5. Tooltips appear automatically

### Next steps:
- See .claude/specs/001-glossary-tooltips.FUTURE.md for enhancements
```

---

### 7.2 Create README for Scripts

**File:** `scripts/README.md`

```markdown
# Scripts

## mark-glossary-terms.mjs

Automatically marks glossary terms in markdown content files.

### Usage

```bash
# Mark all content files
pnpm run glossary:mark --all

# Mark only uncommitted changes
pnpm run glossary:mark --dirty

# Mark only staged files
pnpm run glossary:mark --staged

# Preview without writing
pnpm run glossary:mark --dry-run

# Verbose output
pnpm run glossary:mark --verbose
```

### How it works

1. Parses frontmatter from all `content/docs/**/*.md` files
2. Builds glossary index with terms and aliases
3. Scans target files for term occurrences
4. Inserts `{{< term "slug" >}}text{{< /term >}}` shortcodes
5. Marks only first occurrence per file
6. Skips code blocks, links, and ignored sections

### Ignore syntax

To prevent marking:
```markdown
<!-- glossary:ignore -->
This IoT relay won't be marked
<!-- /glossary:ignore -->
```

Or use code backticks: `IoT`
```

---

### 7.3 Test End-to-End

**Complete workflow test:**

1. **Create new docs page:**
```bash
cat > content/docs/concepts/mqtt.md <<EOF
---
title: "MQTT Protocol"
glossary:
  enabled: true
  summary: |
    **MQTT** to lekki protokół komunikacyjny typu publish-subscribe, idealny dla {{< term "iot" >}}IoT{{< /term >}}.
  aliases: ["MQTT", "Message Queue Telemetry Transport"]
aliases:
  - /mqtt-protocol/
---

## Co to jest MQTT?

MQTT (Message Queue Telemetry Transport) to protokół...
EOF
```

2. **Mark all content:**
```bash
pnpm run glossary:mark --all
```

3. **Build site:**
```bash
pnpm run build
```

4. **Verify outputs:**
```bash
# Check glossary.json includes MQTT
cat public/glossary.json | grep -i mqtt

# Check /docs/dict/ includes MQTT
curl -s http://localhost:1313/docs/dict/ | grep -i mqtt
```

5. **Test in browser:**
   - Navigate to any blog post with "MQTT" or "IoT"
   - Hover over marked term
   - Verify tooltip appears
   - Click "Czytaj więcej" → navigates to docs page
   - Visit `/docs/dict/` → verify MQTT listed

**Acceptance criteria:**
- [ ] New docs page appears in glossary.json
- [ ] Tooltip works for new term
- [ ] Glossary page lists new term
- [ ] Aliases redirect correctly
- [ ] No console errors
- [ ] No layout shifts

---

## Rollout Plan

### Week 1: Soft Launch
- [ ] Deploy to staging environment
- [ ] Test with 10-20 marked terms
- [ ] Collect team feedback
- [ ] Fix critical bugs

### Week 2: Migration
- [ ] Add `glossary.enabled: true` to all docs pages
- [ ] Run `pnpm run glossary:mark --all`
- [ ] Review diff (expect 500+ insertions)
- [ ] Commit in batches (per category)

### Week 3: Production
- [ ] Deploy to production
- [ ] Enable pre-commit hook (manual mode)
- [ ] Monitor analytics (tooltip clicks)
- [ ] Create /docs/dict/ backlinks

### Week 4: Optimization
- [ ] Switch pre-commit to auto mode (if stable)
- [ ] Review performance metrics
- [ ] Implement P1 enhancements from FUTURE.md
- [ ] Collect user feedback

---

## Success Criteria (MVP)

### Technical
- [ ] Build script processes 100 files in < 10s
- [ ] `glossary.json` < 100 KB
- [ ] Tooltip render < 100ms
- [ ] Zero console errors
- [ ] All Playwright tests pass (100%)
- [ ] All unit tests pass (100%)

### Functional
- [ ] Tooltips appear on hover
- [ ] Smart positioning works (above/below)
- [ ] LocalStorage caching works (24h)
- [ ] Glossary page renders correctly
- [ ] Alphabet navigation works
- [ ] Pre-commit hook works (manual + auto modes)
- [ ] Aliases redirect correctly

### Content
- [ ] 50+ terms with `glossary.enabled: true`
- [ ] All categories have `category_icon` (even if empty)
- [ ] All summaries are 1-3 sentences
- [ ] All summaries use markdown (bold, links)
- [ ] 100+ blog/tutorial pages have marked terms

### Business (post-launch)
- [ ] +20% clicks to /docs/ from blog (within 1 month)
- [ ] +50% indexed /docs/ pages (Google Search Console)
- [ ] User feedback: "tooltips helpful" > 80%

---

## Troubleshooting

### Tooltips don't appear
1. Check console for JS errors
2. Verify `glossary.json` exists: `curl http://localhost:1313/glossary.json`
3. Check term has `data-term` attribute: Inspect HTML
4. Clear localStorage cache: DevTools → Application → Clear

### Wrong terms marked
1. Review skip patterns in script
2. Add `<!-- glossary:ignore -->` around false positives
3. Re-run `pnpm run glossary:mark --all`

### Build fails
1. Check Hugo version: `hugo version` (need 0.121.1+)
2. Verify output format config in `hugo.toml`
3. Check template syntax in `index.glossary.json`

### Pre-commit hook not running
1. Check hook exists: `ls -la .husky/pre-commit` or `.git/hooks/pre-commit`
2. Check executable: `chmod +x .husky/pre-commit`
3. Test manually: `.husky/pre-commit`

---

## Related Documentation

- **Spec:** `.claude/specs/001-glossary-tooltips.md`
- **Future:** `.claude/specs/001-glossary-tooltips.FUTURE.md`
- **Hugo Shortcodes:** https://gohugo.io/content-management/shortcodes/
- **Playwright Docs:** https://playwright.dev/docs/intro

---

**Task Status:** ✅ Ready for Implementation

**Estimated Time:** 5-7 days for MVP

**Next Task:** See `.claude/tasks/I18N_URL_MIGRATION.md` (future refinement)
