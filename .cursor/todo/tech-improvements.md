# Tech Improvements & Ideas

*Generated: 2025-10-18 by Claude Code*

## 🚀 Quick Wins

### ✅ 2. pnpm cache w GitHub Actions (IN PROGRESS)
**Benefit:** Build time: 50s → ~20s
**Status:** Ready to implement

---

## 📚 Need Research / Explanation

### 1. Hugo Archetypes - Content Templates
**Co to jest:**
Archetypes to templates (szablony) dla nowych treści w Hugo. Jak używasz `hugo new content/blog/my-post.md`, Hugo używa archetype do wygenerowania pliku z pre-filled metadata.

**Przykład archetype dla blog post:**
```yaml
# archetypes/blog.md
---
title: "{{ replace .File.ContentBaseName "-" " " | title }}"
date: {{ .Date }}
draft: true
authors: ["Paweł Żentała"]
categories: []
tags: []
description: ""
image: ""
toc: true
---

Wprowadzenie do artykułu...

## Nagłówek 1

Treść...
```

**Jak to pomoże:**
- ✅ Consistency - każdy blog post ma tę samą strukturę
- ✅ Szybsze tworzenie - nie musisz pamiętać wszystkich pól frontmatter
- ✅ Mniej błędów - zawsze masz required fields
- ✅ SEO - zawsze pamiętasz o description, image, etc.

**Co zrobić:**
1. Stwórz `archetypes/blog.md` (dla blog posts)
2. Stwórz `archetypes/tutorial.md` (dla tutorials)
3. Stwórz `archetypes/theory.md` (dla theory pages)
4. Użyj: `pnpm run create` lub `hugo new content/blog/my-post.md`

**Dokumentacja:** https://gohugo.io/content-management/archetypes/

---

### 3. Related Content Automation - SEO Interlinking
**Co to jest:**
Hugo ma wbudowany system do automatycznego znajdowania powiązanych artykułów (based on tags, categories, dates). To pomaga w SEO przez internal linking.

**Jak działa:**
Hugo porównuje:
- Tags (weight: 80)
- Categories (weight: 100)
- Dates (weight: 10)

I pokazuje artykuły z najwyższym score jako "Related Posts"

**Przykład użycia w template:**
```html
<!-- layouts/partials/related.html -->
{{ $related := .Site.RegularPages.Related . | first 3 }}
{{ with $related }}
<aside class="related-posts">
  <h3>Przeczytaj również:</h3>
  <ul>
    {{ range . }}
    <li><a href="{{ .RelPermalink }}">{{ .Title }}</a></li>
    {{ end }}
  </ul>
</aside>
{{ end }}
```

**Jak to pomoże:**
- ✅ **SEO boost** - internal linking to ranking factor
- ✅ **User engagement** - czytelnicy zostają dłużej na stronie
- ✅ **Automatic** - nie musisz ręcznie linkować artykułów
- ✅ **Smart** - Hugo sam wybiera najbardziej relevantne

**Config w hugo.toml (już masz!):**
```toml
[related]
  threshold = 80
  includeNewer = true
  toLower = false
  [[related.indices]]
    name = "categories"
    weight = 100
  [[related.indices]]
    name = "tags"
    weight = 80
  [[related.indices]]
    name = "date"
    weight = 10
```

**Co zrobić:**
1. Sprawdź czy Doks theme ma już `related.html` partial
2. Jeśli nie - stwórz `layouts/partials/related.html`
3. Dodaj `{{ partial "related.html" . }}` na końcu blog post layout
4. Testuj - zobacz jakie related posts pokazuje

**Dokumentacja:** https://gohugo.io/content-management/related/

---

## 🔮 Future Ideas (Medium Effort)

### 4. Lighthouse CI - Automated Performance Testing
**What:** GitHub Action który sprawdza performance każdego PR
**Benefit:** Catch performance regressions before deploy
**Docs:** https://github.com/GoogleChrome/lighthouse-ci

### 5. Dependabot - Auto Dependency Updates
**What:** GitHub bot który tworzy PR z updates dla npm packages
**Benefit:** Security patches, auto-update Hugo, pnpm, etc.
**Setup:** `.github/dependabot.yml`

### 6. ADR (Architecture Decision Records)
**What:** Folder `docs/adr/` z markdown files dokumentującymi decyzje
**Example:** "Why Hugo instead of Jekyll?", "Why pnpm instead of npm?"
**Benefit:** Onboarding nowych devs, memoria projektowa
**Template:** https://adr.github.io/

---

## 🎯 Long Term

### 7. Google Search Console Integration
**What:** Link Hugo site z GSC dla SEO metrics
**Benefit:** Track rankings, CTR, search queries, indexing issues

### 8. Content Snippets System
**What:** Reusable content blocks (np. disclaimer, CTA, produkty)
**How:** Hugo shortcodes lub data files
**Example:** `{{< disclaimer >}}` → pokazuje ten sam disclaimer wszędzie

### 9. Automated Interlinking Scripts
**What:** Script który skanuje content i sugeruje/dodaje internal links
**Tool:** Custom Node.js script lub existing Hugo plugin
**Benefit:** Massive SEO boost

---

## 📊 Priority Recommendations

| Priority | Task | Effort | Impact |
|----------|------|--------|--------|
| 🔥 HIGH | #2 pnpm cache in GH Actions | Low | High (build speed) |
| 🔥 HIGH | #1 Hugo Archetypes | Low | High (DX, consistency) |
| ⭐ MEDIUM | #3 Related Content | Medium | High (SEO) |
| ⭐ MEDIUM | #5 Dependabot | Low | Medium (security) |
| 💡 LOW | #4 Lighthouse CI | Medium | Medium |
| 💡 LOW | #6 ADR | Low | Low (but good practice) |

---

*Update this file as you implement or discover new ideas!*
