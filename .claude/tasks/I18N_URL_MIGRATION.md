# Task: i18n URL Migration & Multi-language Support

**Status:** Backlog (Future Refinement)
**Created:** 2025-10-18
**Priority:** Medium
**Complexity:** Medium (3-5 days)
**Dependencies:** Glossary Tooltips System (001)

---

## Problem Statement

**Current state:**
- Site is Polish-only (`pl-PL`)
- URLs are language-agnostic: `/docs/`, `/blog/`
- Glossary at `/docs/dict/` (mixed Polish word in English path structure)

**Future state:**
- Multi-language support (PL, EN, potentially DE)
- Language-prefixed URLs: `/pl/docs/slownik/`, `/en/docs/dictionary/`
- Smooth migration with redirects (12-month grace period)
- Glossary system works per-language

---

## Goals

1. **Language-specific URLs:**
   - PL: `/pl/docs/slownik/`, `/pl/blog/`
   - EN: `/en/docs/dictionary/`, `/en/blog/`

2. **Backwards compatibility:**
   - Old URLs redirect with 301: `/docs/dict/` → `/pl/docs/slownik/`
   - Redirect maintained for 12 months minimum

3. **Per-language glossary:**
   - `/pl/glossary.json` (Polish terms)
   - `/en/glossary.json` (English terms)

4. **Seamless UX:**
   - Language switcher in header
   - Auto-detect user language (browser preference)
   - Remember user choice (localStorage)

---

## Non-Goals

- ❌ Automatic translation (requires human translation)
- ❌ Real-time language switching (requires page reload)
- ❌ Multiple languages for same term (1 language = 1 glossary entry)

---

## Current URL Structure

```
/                          → Homepage (PL)
/blog/                     → Blog index (PL)
/blog/my-post/             → Blog post (PL)
/docs/                     → Docs index (PL)
/docs/concepts/iot/        → Doc page (PL)
/docs/dict/                → Glossary (PL)
```

**Config:** `config/_default/hugo.toml`
```toml
defaultContentLanguage = "pl"
disableLanguages = ["en", "de", "nl"]
defaultContentLanguageInSubdir = false  # No /pl/ prefix
```

---

## Proposed URL Structure

### Phase 1: Add Language Prefix (Breaking Change)

```
/                          → Language selector page or redirect to /pl/
/pl/                       → Homepage (PL)
/pl/blog/                  → Blog (PL)
/pl/docs/                  → Docs (PL)
/pl/docs/slownik/          → Glossary (PL)
/en/                       → Homepage (EN)
/en/blog/                  → Blog (EN)
/en/docs/                  → Docs (EN)
/en/docs/dictionary/       → Glossary (EN)
```

**Config changes:**
```toml
defaultContentLanguage = "pl"
defaultContentLanguageInSubdir = true  # Enable /pl/ prefix

[languages]
  [languages.pl]
    languageName = "Polski"
    weight = 1
    contentDir = "content/pl"

  [languages.en]
    languageName = "English"
    weight = 2
    contentDir = "content/en"
```

---

### Phase 2: Redirects (12 months)

**Hugo redirects:** `config/_default/hugo.toml`

```toml
[[redirects]]
  from = "/docs/dict/*"
  to = "/pl/docs/slownik/:splat"
  status = 301

[[redirects]]
  from = "/docs/*"
  to = "/pl/docs/:splat"
  status = 301

[[redirects]]
  from = "/blog/*"
  to = "/pl/blog/:splat"
  status = 301
```

**Netlify/Vercel:** Generate `_redirects` file

```bash
# public/_redirects
/docs/dict/*  /pl/docs/slownik/:splat  301
/docs/*       /pl/docs/:splat          301
/blog/*       /pl/blog/:splat          301
```

---

## Content Structure Migration

### Current

```
content/
├── blog/
│   └── my-post.md
├── docs/
│   ├── concepts/
│   │   └── iot.md
│   └── dict/
│       └── _index.md
└── _index.md
```

### Future

```
content/
├── pl/
│   ├── _index.md
│   ├── blog/
│   │   └── moj-post.md
│   └── docs/
│       ├── concepts/
│       │   └── iot.md
│       └── slownik/
│           └── _index.md
└── en/
    ├── _index.md
    ├── blog/
    │   └── my-post.md
    └── docs/
        ├── concepts/
        │   └── iot.md
        └── dictionary/
            └── _index.md
```

---

## Glossary System Changes

### 1. Per-language glossary.json

**Template:** `layouts/_default/index.glossary.json`

```go-html-template
{{- $lang := .Language.Lang -}}
{{- $glossary := dict -}}

{{- range where .Site.RegularPages "Section" "docs" -}}
  {{- if eq .Language.Lang $lang -}}
    {{- if .Params.glossary.enabled -}}
      {{- /* Build glossary for current language */ -}}
    {{- end -}}
  {{- end -}}
{{- end -}}

{{- $glossary | jsonify -}}
```

**Output:**
- `/pl/glossary.json`
- `/en/glossary.json`

---

### 2. JavaScript language detection

**File:** `assets/js/glossary-tooltips.js`

```javascript
class GlossaryTooltips {
  getGlossaryUrl() {
    const lang = document.documentElement.lang || 'pl';
    return `/${lang}/glossary.json`;
  }

  async loadGlossary() {
    const url = this.getGlossaryUrl();
    const response = await fetch(url);
    // ...
  }
}
```

---

### 3. Language-specific paths

**Polish:**
```
/pl/docs/slownik/              → Słownik pojęć
/pl/docs/pojecia/iot/          → IoT (Internet Rzeczy)
```

**English:**
```
/en/docs/dictionary/           → Glossary of Terms
/en/docs/concepts/iot/         → IoT (Internet of Things)
```

---

## Migration Strategy

### Step 1: Duplicate Content (Week 1)

```bash
# Create language directories
mkdir -p content/pl content/en

# Move current content to /pl/
mv content/blog content/pl/
mv content/docs content/pl/
mv content/_index.md content/pl/

# Copy to /en/ (for translation later)
cp -r content/pl/* content/en/
```

---

### Step 2: Update Frontmatter (Week 1)

**Polish pages stay unchanged:**
```yaml
# content/pl/docs/concepts/iot.md
---
title: "IoT (Internet Rzeczy)"
glossary:
  enabled: true
  summary: "Internet Rzeczy to sieć urządzeń..."
---
```

**English pages need translation:**
```yaml
# content/en/docs/concepts/iot.md
---
title: "IoT (Internet of Things)"
glossary:
  enabled: true
  summary: "The Internet of Things is a network of devices..."
---
```

---

### Step 3: Update Config (Week 1)

**File:** `config/_default/hugo.toml`

```toml
defaultContentLanguage = "pl"
defaultContentLanguageInSubdir = true

[languages]
  [languages.pl]
    languageName = "Polski"
    languageCode = "pl-PL"
    weight = 1
    contentDir = "content/pl"

    [languages.pl.params]
      description = "Blog o inteligentnym domu"

    [[languages.pl.menu.main]]
      name = "Blog"
      url = "/pl/blog/"
      weight = 10

    [[languages.pl.menu.main]]
      name = "Dokumentacja"
      url = "/pl/docs/"
      weight = 20

    [[languages.pl.menu.main]]
      name = "Słownik"
      url = "/pl/docs/slownik/"
      weight = 30

  [languages.en]
    languageName = "English"
    languageCode = "en-US"
    weight = 2
    contentDir = "content/en"

    [languages.en.params]
      description = "Smart Home Blog"

    [[languages.en.menu.main]]
      name = "Blog"
      url = "/en/blog/"
      weight = 10

    [[languages.en.menu.main]]
      name = "Documentation"
      url = "/en/docs/"
      weight = 20

    [[languages.en.menu.main]]
      name = "Dictionary"
      url = "/en/docs/dictionary/"
      weight = 30
```

---

### Step 4: Setup Redirects (Week 2)

**Hugo module:** `github.com/gohugoio/hugo-mod-jslibs/alpinejs`

**Or Netlify `_redirects`:**

Create `static/_redirects`:
```
# Old URLs → New PL URLs (301 permanent)
/docs/dict/*  /pl/docs/slownik/:splat  301
/docs/*       /pl/docs/:splat          301
/blog/*       /pl/blog/:splat          301
/tutorials/*  /pl/tutorials/:splat     301

# Root → Language selector or default PL
/  /pl/  302
```

---

### Step 5: Update Templates (Week 2)

**Language switcher:** `layouts/partials/header/language-switcher.html`

```html
<div class="language-switcher">
  {{ range .Site.Languages }}
    {{ if eq . $.Language }}
      <span class="active">{{ .LanguageName }}</span>
    {{ else }}
      <a href="{{ .Lang }}">{{ .LanguageName }}</a>
    {{ end }}
  {{ end }}
</div>
```

---

### Step 6: Test & Deploy (Week 3)

**Testing checklist:**
- [ ] All old URLs redirect correctly (301)
- [ ] Language switcher works
- [ ] Glossary tooltips work in both languages
- [ ] Search works per-language
- [ ] Sitemap has language annotations
- [ ] Hreflang tags in `<head>`

**Deploy:**
1. Staging environment first
2. Test all redirects
3. Production deployment
4. Monitor Google Search Console (indexing changes)

---

### Step 7: Content Translation (Ongoing)

**Priority order:**
1. Homepage, About, Contact (week 4)
2. Top 10 most-visited blog posts (week 5-6)
3. All docs pages (week 7-10)
4. Remaining blog posts (ongoing)

**Translation tools:**
- Human translation (preferred)
- AI-assisted (GPT-4) + human review
- Community contributions (GitHub PRs)

---

## Hreflang Implementation

**Template:** `layouts/partials/head/seo.html`

```html
{{ range .Translations }}
  <link rel="alternate" hreflang="{{ .Language.Lang }}" href="{{ .Permalink }}" />
{{ end }}
<link rel="alternate" hreflang="{{ .Language.Lang }}" href="{{ .Permalink }}" />
<link rel="alternate" hreflang="x-default" href="{{ .Site.Home.Permalink }}" />
```

**Output example:**
```html
<link rel="alternate" hreflang="pl" href="https://ihome.zentala.io/pl/blog/my-post/" />
<link rel="alternate" hreflang="en" href="https://ihome.zentala.io/en/blog/my-post/" />
<link rel="alternate" hreflang="x-default" href="https://ihome.zentala.io/pl/" />
```

---

## SEO Considerations

### Positive impacts:
- ✅ Broader audience (EN speakers)
- ✅ Hreflang signals to Google
- ✅ Per-language sitemaps
- ✅ Better UX for international users

### Risks:
- ⚠️ Duplicate content (mitigated by hreflang)
- ⚠️ 301 redirects may temporarily drop rankings
- ⚠️ Incomplete EN content may hurt UX

### Mitigation:
1. Implement redirects correctly (301, not 302)
2. Submit updated sitemap to Google Search Console
3. Monitor rankings weekly (first month)
4. Use `noindex` on incomplete EN pages until translated

---

## Rollback Plan

If severe issues occur:

1. **Revert config:**
   ```toml
   defaultContentLanguageInSubdir = false
   disableLanguages = ["en"]
   ```

2. **Move content back:**
   ```bash
   mv content/pl/* content/
   rm -rf content/pl content/en
   ```

3. **Remove redirects:**
   Delete `static/_redirects`

4. **Rebuild and deploy**

**Recovery time:** < 2 hours

---

## Success Metrics

### Technical (Week 1-2)
- [ ] All old URLs return 301 redirects
- [ ] Glossary tooltips work in both languages
- [ ] No broken links (check with link checker)
- [ ] Sitemap has `<xhtml:link>` annotations
- [ ] Hreflang tags present on all pages

### Business (Month 1-3)
- [ ] English traffic > 5% (from ~0%)
- [ ] No PL traffic drop > 10%
- [ ] Bounce rate stable or improved
- [ ] Average session duration stable

### Content (Month 1-6)
- [ ] 50% of docs pages translated to EN
- [ ] 10% of blog posts translated to EN
- [ ] English glossary has 30+ terms

---

## Estimated Effort

| Phase | Tasks | Time | Owner |
|-------|-------|------|-------|
| 1. Planning | Research, spec review | 1 day | Architect |
| 2. Content migration | Move to /pl/, copy to /en/ | 1 day | Developer |
| 3. Config setup | hugo.toml, redirects | 1 day | Developer |
| 4. Template updates | Language switcher, hreflang | 1 day | Developer |
| 5. Testing | E2E tests, redirect tests | 1 day | QA |
| 6. Translation (Phase 1) | Homepage, top pages | 3 days | Content writer |
| **Total MVP** | | **5 days** | Team |
| **Total with translation** | | **8 days** | Team |

---

## Related Documentation

- **Hugo i18n:** https://gohugo.io/content-management/multilingual/
- **Hreflang best practices:** https://developers.google.com/search/docs/specialty/international/localized-versions
- **Glossary spec:** `.claude/specs/001-glossary-tooltips.md`
- **Future enhancements:** `.claude/specs/001-glossary-tooltips.FUTURE.md` (section 6.1-6.2)

---

## Open Questions

1. **Which language to prioritize for translation?**
   - EN (broader audience) vs DE (local market)?

2. **Auto-detect user language or show selector?**
   - Option A: Redirect based on `Accept-Language` header
   - Option B: Show language selector page at `/`

3. **Translation workflow:**
   - In-house vs outsource?
   - AI-assisted + review or fully manual?

4. **URL slugs - translate or keep English?**
   - `/pl/docs/concepts/` vs `/pl/docs/koncepcje/`
   - Recommendation: Keep English for consistency

---

**Task Status:** 📋 Backlog (Not started)

**Next Steps:**
1. Validate business case (expected EN traffic %)
2. Get approval for translation budget
3. Schedule for Q2 2025 (after glossary MVP stable)

**Blocked By:** None (can start anytime)

**Blocks:** None (independent task)
