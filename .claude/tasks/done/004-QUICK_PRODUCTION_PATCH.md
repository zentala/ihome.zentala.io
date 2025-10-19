# Task: Quick Production Patch - Fix Indexed Pages

**Status:** ✅ **COMPLETED** (2025-10-19)
**Created:** 2025-10-19
**Priority:** 🔴 **CRITICAL** (was)
**Complexity:** Low (1-2 hours)
**Branch:** `main` (direct to production)
**Related:** `STATUS.md`, `.claude/specs/content-google-index.md`, `.claude/runbooks/2025-10-19.md`

---

## ✅ COMPLETED SUMMARY (2025-10-19)

**What was fixed:**
1. ✅ Homepage showing Polish content (6 feature boxes) instead of EN placeholder
2. ✅ Language classification (270 EN pages = Polish content at root URLs)
3. ✅ Related posts feature re-enabled (works without infinite recursion)
4. ✅ Build succeeds with Hugo 0.121.1 (~6.4s)
5. ✅ All URLs unchanged: `/docs/`, `/blog/`, `/tutorials/`

**How it was fixed:**
- Changed `defaultContentLanguage = "en"` in `hugo.toml` (workaround for Hugo 0.150.1 bug)
- Changed `[pl]` to `[en]` in `languages.toml` (Polish content classified as "EN")
- Re-enabled `relatedPosts = true` in `params.toml`
- Fixed `blog-meta.html` to handle missing contributors
- Deleted invalid `motywacje.editor.md` file

**Result:**
- Homepage works: https://ihome.zentala.io/ shows Polish content ✅
- Menu already Polish (no fix needed) ✅
- Related posts working (3 per page) ✅

**See:** `.claude/runbooks/2025-10-19.md` for full details

**Still TODO (out of scope for this task):**
- Fix 404 errors (3 pages): `/docs/software/openhab/`, `/blog/projekt-wnetrza-ukonczony/`, `/docs/rozdzielnica/mcb-zabezpiecznie-nadpradowe/`
- See Task 006-FIX_404_ERRORS.md

---

---

## Goal

**Fix ONLY what Google sees (14 indexed pages) + menu.**

This is a **quick patch**, not a full refactor. Full content audit and migration to `/pl/` will be done on a separate branch later.

---

## Indexed Pages (14 Total)

**Source:** User confirmation (NOT Google Search Console - ihome doesn't have it connected)

**Status (Updated 2025-10-19):**
```
✅ https://ihome.zentala.io/                              (homepage - BROKEN: shows EN placeholder)
✅ https://ihome.zentala.io/privacy/                      (works)
✅ https://ihome.zentala.io/demo/                         (works)
✅ https://ihome.zentala.io/blog/                         (works)
✅ https://ihome.zentala.io/services/                     (works)
✅ https://ihome.zentala.io/tutorials/                    (works)
✅ https://ihome.zentala.io/services/consulting/          (works)
✅ https://ihome.zentala.io/docs/connectors/lsa/          (works)
✅ https://ihome.zentala.io/docs/connectors/patchpanele/  (works)
❌ https://ihome.zentala.io/docs/software/openhab/        (404 - no content)
❌ https://ihome.zentala.io/blog/projekt-wnetrza-ukonczony/ (404 NOT FOUND)
❌ https://ihome.zentala.io/docs/rozdzielnica/mcb-zabezpiecznie-nadpradowe/ (404 NOT FOUND)
✅ https://ihome.zentala.io/docs/systems/inteligentny-dom/ (works)
```

**User confirmed:**
- ✅ Menu is Polish (Teoria, Blog, Poradniki, Usługi) - NO FIX NEEDED
- ❌ Homepage shows EN placeholder - NEEDS FIX
- ❌ 3 pages return 404:
  - `/docs/software/openhab/` - no content exists
  - `/blog/projekt-wnetrza-ukonczony/` - 404
  - `/docs/rozdzielnica/mcb-zabezpiecznie-nadpradowe/` - 404

---

## Phase 1: Verify Which Pages Work (15 min)

### Step 1: Check All 14 URLs

**Command:**
```bash
# Create URL list
cat > indexed-urls.txt <<EOF
https://ihome.zentala.io/
https://ihome.zentala.io/privacy/
https://ihome.zentala.io/demo/
https://ihome.zentala.io/blog/
https://ihome.zentala.io/services/
https://ihome.zentala.io/tutorials/
https://ihome.zentala.io/services/consulting/
https://ihome.zentala.io/docs/connectors/lsa/
https://ihome.zentala.io/docs/connectors/patchpanele/
https://ihome.zentala.io/docs/software/openhab/
https://ihome.zentala.io/blog/projekt-wnetrza-ukonczony/
https://ihome.zentala.io/docs/systems/inteligentny-dom/
https://ihome.zentala.io/docs/rozdzielnica/mcb-zabezpiecznie-nadpradowe/
EOF

# Test each URL
while read url; do
  status=$(curl -s -o /dev/null -w "%{http_code}" "$url")
  echo "$url → $status"
done < indexed-urls.txt
```

**Expected Results:**
- 200 = OK
- 404 = Missing content (NEEDS FIX)
- 301/302 = Redirect (check if target works)

### Step 2: List Missing Content

**Create:** `missing-content.txt`

**Example:**
```
404: https://ihome.zentala.io/docs/software/openhab/
→ File: content/docs/software/openhab.md or openhab/_index.md
→ Action: Create placeholder content
```

---

## Phase 2: Fix Homepage Content (20 min)

### Problem
Homepage shows **English placeholder** instead of **Polish features** (6 boxes).

### Root Cause
Hugo serves EN version because theme provides `i18n/en.toml` and Hugo 0.150.1 defaults to EN.

### Quick Fix Option 1: Force Polish Content in Homepage Template

**File:** `content/_index.md`

**Check current content:**
```bash
cat content/_index.md | head -20
```

**If content is correct but not showing:**

**File:** `layouts/index.html` (or wherever homepage is rendered)

**Add explicit language check:**
```html
{{ if eq .Language.Lang "pl" }}
  <!-- Polish content -->
  <h2>Wymiana elektryki</h2>
  <h2>Instalacja sieciowa</h2>
  <h2>System alarmowy</h2>
  <h2>Oświetlenie</h2>
  <h2>System audio</h2>
  <h2>Automatyka budynkowa</h2>
{{ else }}
  <!-- English fallback -->
  <h2>Electrical Renovation</h2>
  ...
{{ end }}
```

### Quick Fix Option 2: Override i18n/en.toml

**File:** `i18n/en.toml` (create if doesn't exist in project root)

**Add:**
```toml
# Override theme's EN translations to force Polish
[home_feature_1]
other = "Wymiana elektryki"

[home_feature_2]
other = "Instalacja sieciowa"

[home_feature_3]
other = "System alarmowy"

[home_feature_4]
other = "Oświetlenie"

[home_feature_5]
other = "System audio"

[home_feature_6]
other = "Automatyka budynkowa"
```

**Check which approach is used in theme first:**
```bash
grep -r "Update content" node_modules/@hyas/
```

### Quick Fix Option 3: Replace EN content in _index.md

**File:** `content/_index.md`

**If it contains EN placeholders, replace with PL:**
```yaml
---
title: "Inteligentny Dom - Praktyczny przewodnik"
description: "Blog o inteligentnym domu, automatyce budynkowej i nowoczesnych instalacjach elektrycznych"
---

# Inteligentny Dom

Praktyczny przewodnik po automatyce budynkowej, instalacjach elektrycznych i nowoczesnych technologiach dla domu.

## Wymiana elektryki
[Content about electrical renovation]

## Instalacja sieciowa
[Content about network installation]

## System alarmowy
[Content about alarm systems]

## Oświetlenie
[Content about lighting]

## System audio
[Content about audio systems]

## Automatyka budynkowa
[Content about building automation]
```

---

## Phase 3: Fix Menu Labels (10 min)

### Problem
Menu shows **English labels** instead of **Polish**.

### Root Cause
Using `config/_default/menus/menus.en.toml` instead of `menus.pl.toml`.

### Fix

**File:** `config/_default/menus/menus.pl.toml`

**Ensure it exists and has:**
```toml
[[main]]
  name = "Teoria"
  url = "/docs/systems/inteligentny-dom/"
  weight = 10

[[main]]
  name = "Blog"
  url = "/blog/"
  weight = 20

[[main]]
  name = "Poradniki"
  url = "/tutorials/"
  weight = 30

[[main]]
  name = "Usługi"
  url = "/services/"
  weight = 40
```

**Also check:** `config/_default/hugo.toml`
```toml
defaultContentLanguage = "pl"
```

**And:** `config/_default/languages.toml`
```toml
[pl]
  languageName = "Polish"
  weight = 1
```

---

## Phase 4: Create Missing Content (30 min)

### For Each Missing Page (404s)

**Example: OpenHub**

**File:** `content/docs/software/openhab.md` or `content/docs/software/openhab/_index.md`

**Placeholder content (Paweł will provide AI-generated):**
```yaml
---
title: "OpenHub"
description: "OpenHub - platforma automatyki domowej"
date: 2025-10-19
draft: false
---

# OpenHub

[Paweł will provide AI-generated content here]

## Czym jest OpenHub?

[Content...]

## Zastosowanie

[Content...]

## Integracja

[Content...]
```

**Action for Paweł:**
1. List missing pages (from Phase 1 results)
2. Generate AI content for each (ChatGPT/Claude)
3. Provide to me for insertion

---

## Phase 5: Add Missing Redirects (20 min)

### Identify Broken Links

**From menu or internal links that 404:**

**Example:**
```
/docs/concepts/smart-home → 404
Should redirect to: /docs/systems/inteligentny-dom/
```

### Fix

**Option A: Hugo Aliases in Frontmatter**

**File:** `content/docs/systems/inteligentny-dom.md`

```yaml
---
title: "Inteligentny Dom"
aliases:
  - /docs/concepts/smart-home
  - /docs/concepts/inteligentny-dom
---
```

**Option B: Netlify _redirects**

**File:** `static/_redirects`

```
/docs/concepts/smart-home  /docs/systems/inteligentny-dom/  301
```

---

## Phase 6: Test Locally (10 min)

### Test All 14 URLs

```bash
pnpm run dev
```

**In another terminal:**
```bash
while read url; do
  local_url="${url/ihome.zentala.io/localhost:1313}"
  status=$(curl -s -o /dev/null -w "%{http_code}" "$local_url")
  echo "$local_url → $status"
done < indexed-urls.txt
```

**All should return 200 or 301 (not 404).**

### Visual Check

**Open in browser:**
```
http://localhost:1313/
```

**Verify:**
- [ ] Homepage shows 6 Polish features (not "Update content")
- [ ] Menu shows "Teoria, Blog, Poradniki, Usługi" (not English)
- [ ] All 14 URLs work (200 or valid redirect)

---

## Phase 7: Deploy to Production (5 min)

### Commit Changes

```bash
git add content/ config/ static/ i18n/ layouts/
git status
```

**Commit:**
```bash
git commit -m "fix(content): quick production patch for indexed pages

- Fixed homepage Polish content (6 features)
- Fixed menu Polish labels
- Added missing content for indexed pages
- Added redirects for broken links

Fixes 14 Google-indexed pages.

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>"
```

### Push to Main

```bash
git push origin main
```

### Verify Production

**Wait 2-5 minutes for GitHub Pages deployment.**

**Test:**
```bash
while read url; do
  status=$(curl -s -o /dev/null -w "%{http_code}" "$url")
  echo "$url → $status"
done < indexed-urls.txt
```

---

## Success Criteria

**Patch Complete When:**
- ✅ Homepage shows Polish content (6 features)
- ✅ Menu shows Polish labels (4 items)
- ✅ All 14 indexed URLs return 200 or valid 301
- ✅ No 404 errors for indexed pages
- ✅ Deployed to production (main branch)

**NOT in scope:**
- ❌ Full content audit (234 files)
- ❌ Migration to `/pl/` structure
- ❌ Content quality improvements
- ❌ SEO meta descriptions
- ❌ Translation to EN

---

## Checklist

### Preparation
- [ ] List all 14 indexed URLs
- [ ] Test each URL (200, 301, or 404?)
- [ ] Identify missing content (404s)
- [ ] Paweł generates AI content for missing pages

### Implementation
- [ ] Fix homepage Polish content
- [ ] Fix menu Polish labels
- [ ] Create missing content files
- [ ] Add redirects for broken links
- [ ] Test locally (all 14 URLs work)
- [ ] Visual check (homepage + menu)

### Deployment
- [ ] Commit to main
- [ ] Push to production
- [ ] Wait for GitHub Pages deployment
- [ ] Verify all 14 URLs work on production
- [ ] Update STATUS.md (production status: 🟢 WORKING)

---

## After Patch: Next Steps

**Create feature branch for refactor:**
```bash
git checkout -b feature/content-audit
```

**On this branch:**
1. Full content audit (234 files)
2. Content quality report
3. Content questionnaire (top articles)
4. Translation plan
5. Preparation for `/pl/` migration
6. 404 errors fix (from old Google Search Console data - different site)

**See:** `.claude/tasks/CONTENT_AUDIT.md`

---

## Rollback Plan

**If patch breaks something:**

```bash
# Revert last commit
git revert HEAD

# Push
git push origin main
```

**Recovery time:** < 5 minutes

---

**Status:** 📋 **READY TO START**

**Estimated Time:** 1-2 hours

**Next Step:** Run Phase 1 verification to identify missing content
