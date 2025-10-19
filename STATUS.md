# Project Status - ihome.zentala.io

**Last Updated:** 2025-10-19
**Environment:** Development
**Production Status:** 🔴 **BROKEN** (multilingual issue)

---

## 🚨 Critical Issues

### 1. Production Site Broken (Hugo 0.150.1)

**Status:** 🔴 **CRITICAL**
**Since:** 2025-10-19 (Hugo upgrade)
**Impact:** Site serves English instead of Polish

**Symptoms:**
- Homepage shows `<html lang="en">` instead of `lang="pl"`
- English placeholder content instead of Polish features
- Menu missing 2 items (Tutorials, Services)
- 6 out of 9 smoke tests failing

**Root Cause:**
- Hugo 0.150.1 breaking changes in multilingual
- Theme provides `i18n/en.toml` → Hugo auto-creates EN language
- Hugo ignores `defaultContentLanguage = "pl"`
- Defaults to "en" (alphabetically first)

**Decision:** Full i18n migration to `/pl/` URL prefix
- **ADR:** `.claude/adrs/001-multilingual-url-structure.md` ✅ **ACCEPTED**
- **Task:** `.claude/tasks/I18N_URL_MIGRATION.md` ⏸️ **BLOCKED** by content audit
- **Runbook:** `.claude/runbooks/2025-10-19-smoke-tests-implementation.md`

---

### 2. Google Indexing - Low Coverage

**Status:** ⚠️ **WARNING**
**Indexed:** Only 31 pages out of ~234 markdown files
**404 Errors:** 67 broken links

**Indexed Pages (31):**
- Homepage, blog, docs, tutorials
- Last crawl: 8 Oct 2025

**404 Errors (67):**
- `static.zentala.io/*` - old static files (should redirect to CDN?)
- `ideas.zentala.io/*` - old subdomain (should redirect or remove?)
- `cdn.zentala.io/test-workflow.txt` - test file indexed (!)
- Some internal broken links

**Source:** `.claude/specs/content-google-index.md`
**Task:** `.claude/tasks/FIX_404_ERRORS.md` (to be created)

---

### 3. Content Issues

**Status:** ⚠️ **NEEDS ATTENTION**

**Drafts:** ~41 files (not just 1!)
- Files starting with `_` (Hugo ignores)
- Files with `draft: true` in frontmatter
- Incomplete articles

**Mixed Language:**
- Some docs in English (need PL translation)
- Inconsistent terminology

**Quality:**
- Many articles incomplete
- Missing images/diagrams
- No meta descriptions

**Task:** `.claude/tasks/CONTENT_AUDIT.md` 📋 **PLANNED**

---

## 📋 Current Plan & Vision

### Long-Term Vision

**Goal:** Professional, bilingual smart home blog with:
- 🇵🇱 Primary: Polish content at `/pl/`
- 🇬🇧 Secondary: English content at `/en/` (future)
- 📚 Browsable dictionary (`/pl/slownik/`)
- 🎓 High-quality tutorials with personal stories
- 📝 Well-researched blog posts
- 🔍 SEO-optimized, Google-indexed
- 🧪 Automated testing (smoke tests ready)

### Task Execution Order

```
1. CONTENT_AUDIT (1-2 weeks) 📋 PLANNED
   ├─ Inventory all 234 files
   ├─ Identify ~41 drafts
   ├─ Content Editor Questionnaire (personal stories)
   ├─ Translation planning (EN→PL, PL→EN)
   └─ Quality assessment

2. FIX_404_ERRORS (2-3 days) 📋 PLANNED
   ├─ Setup redirects: static.zentala.io → CDN
   ├─ Setup redirects: ideas.zentala.io → main site or remove
   ├─ Fix internal broken links
   └─ Update Google Search Console

3. I18N_URL_MIGRATION (2-3 days) ⏸️ BLOCKED
   ├─ Change defaultContentLanguageInSubdir = true
   ├─ All URLs → /pl/ prefix
   ├─ Setup 301 redirects
   ├─ Update sitemap.xml
   └─ Verify with smoke tests

4. DICTIONARY_REDESIGN (3-5 days) 📋 PLANNED (Long-term)
   ├─ Create /pl/slownik/ index page
   ├─ A-Z navigation
   ├─ Category view toggle
   ├─ Search functionality
   └─ Bilingual structure (PL/EN)

5. CONTENT_TRANSLATION (Ongoing) 📋 PLANNED (Long-term)
   ├─ EN docs → PL
   ├─ Select key PL articles → EN
   └─ Maintain glossary per language
```

### Priority This Week

1. ✅ **DONE:** Implement smoke tests (9 tests)
2. ✅ **DONE:** Create ADR 001 (multilingual decision)
3. ✅ **DONE:** Plan content audit & dictionary
4. 🔄 **NEXT:** Start content audit Phase 1 (inventory)
5. 🔄 **NEXT:** Create FIX_404_ERRORS task
6. ⏸️ **BLOCKED:** Wait for content audit before i18n migration

---

## 📊 Content Inventory

**Total Files:** 234 markdown

**By Section:**
- 📝 Blog: 28 posts
- 📚 Docs: 174 pages (includes dictionary ~50-100 terms)
- 🎓 Tutorials: 19 guides
- 📄 Other: ~13 (homepage, services, etc.)

**By Status:**
- ✅ Published: ~193 files
- 📝 Drafts (confirmed): ~41 files (files starting with `_` or containing `draft`)
- ❓ Incomplete: TBD (needs deep analysis)

**By Language:**
- 🇵🇱 Polish: Majority
- 🇬🇧 English: Some docs (need translation)
- 🌍 Mixed: Some pages

**Google Indexed:** 31 pages only (13% of published content!)

---

## 🧪 Testing Status

**Smoke Tests:** ✅ **IMPLEMENTED**
- **Files:** `tests/e2e/smoke/*.spec.js` (3 files, 9 tests)
- **Framework:** Playwright v1.56.1
- **Config:** `playwright.config.js`
- **Scripts:** `pnpm run test:smoke`

**Current Results:** 6 FAIL ❌, 3 PASS ✅
- ❌ Homepage shows English content
- ❌ HTML lang="en" (not "pl")
- ❌ Menu missing Polish labels
- ✅ Navigation URLs correct
- ✅ contentDir works
- ✅ Blog posts load

**After Migration:** Expect all 9 tests PASS ✅

---

## 🏗️ Technical Stack

**Static Site Generator:**
- Hugo v0.121.1 Extended (project-local)
- ~~Hugo v0.150.1~~ (was global, removed by user)

**Theme:**
- Hyas + Doks
- Issue: Theme provides i18n files for EN, DE, NL, ES

**Package Manager:**
- pnpm 8.12.0

**Node.js:**
- v18.14.1+ (specified in .nvmrc: v22.11.0)

**Testing:**
- Playwright (E2E smoke tests)

**CI/CD:**
- GitHub Actions (deployment)
- Smoke tests ready for CI integration

---

## 🐛 Known Issues

### High Priority

1. **Hugo multilingual broken** (Hugo 0.150.1 breaking changes)
   - Status: 🔴 CRITICAL
   - Fix: i18n migration to `/pl/`

2. **67 Google 404 errors**
   - `static.zentala.io/*` links broken
   - `ideas.zentala.io/*` links broken
   - Internal broken links

3. **~41 draft articles** incomplete
   - Need review: complete or archive
   - User input needed for personal stories

### Medium Priority

4. **Low Google indexing** (31/234 pages)
   - After migration: resubmit sitemap
   - Add meta descriptions
   - Internal linking

5. **EN content in PL site**
   - Some docs are English-only
   - Need translation to Polish

6. **Dictionary not browsable**
   - No index page (`/docs/dict/` direct access only)
   - No A-Z navigation
   - No search

### Low Priority

7. **cdn.zentala.io test file indexed**
   - `cdn.zentala.io/test-workflow.txt` in Google
   - Should be removed or noindex

8. **Missing images/diagrams**
   - Many articles text-only
   - Need visuals for engagement

---

## 📝 Documentation

### Specs
- ✅ `000-testing-architecture.md` - Playwright setup
- ✅ `001-glossary-tooltips.md` - Future feature (after migration)
- ✅ `002-smoke-tests.md` - Implemented tests
- ✅ `003-dictionary-redesign.md` - Planned redesign
- ✅ `content-google-index.md` - Google Search Console data

### Tasks
- ✅ `TESTING_IMPLEMENTATION.md` - Completed (smoke tests)
- ✅ `CONTENT_AUDIT.md` - Planned (1-2 weeks)
- ✅ `I18N_URL_MIGRATION.md` - Blocked by content audit
- 📋 `FIX_404_ERRORS.md` - To be created
- 📋 `GLOSSARY_TOOLTIPS.md` - Future (low priority)

### ADRs
- ✅ `001-multilingual-url-structure.md` - ACCEPTED decision

### Runbooks
- ✅ `2025-10-18-multilingual-analysis.md` - Initial investigation
- ✅ `2025-10-19-smoke-tests-implementation.md` - Current session

---

## 🎯 Success Criteria

### Short-term (This Week)
- ✅ Smoke tests implemented
- ✅ ADR documented
- ✅ Content audit planned
- 🔄 Content inventory generated
- 🔄 404 errors catalogued

### Medium-term (2 Weeks)
- ✅ Content audit complete
- ✅ 404 errors fixed
- ✅ Drafts resolved (published or archived)
- ✅ i18n migration complete
- ✅ All smoke tests passing
- ✅ Production site working

### Long-term (1-2 Months)
- ✅ Dictionary redesigned (/pl/slownik/)
- ✅ Top 10 articles improved with personal stories
- ✅ EN content translated to PL
- ✅ Google indexing >100 pages
- ✅ 0 404 errors
- ✅ Key articles ready for EN translation

---

## 🛠️ Tools & Resources

### Google Indexing Check
1. **Google Search Console:** https://search.google.com/search-console
2. **site: operator:** `site:ihome.zentala.io`
3. **Screaming Frog SEO Spider:** Free for <500 URLs
4. **Current sitemap:** https://ihome.zentala.io/sitemap.xml

### Development
- **Local dev server:** `pnpm run dev`
- **Run smoke tests:** `pnpm run test:smoke`
- **View test report:** `pnpm run test:report`
- **Build production:** `pnpm run build`

### Git Workflow
- **Recent commits:**
  - `76556c8` - Smoke tests implementation
  - `c247107` - ADR 001 for multilingual
  - `b17e435` - Content audit & dictionary tasks

---

## 🔗 Quick Links

### Critical Documents
- **This file:** `STATUS.md` (always current!)
- **Project instructions:** `.claude/CLAUDE.md`
- **Current runbook:** `.claude/runbooks/2025-10-19-smoke-tests-implementation.md`
- **Migration ADR:** `.claude/adrs/001-multilingual-url-structure.md`

### Next Actions
1. Read: `.claude/tasks/CONTENT_AUDIT.md`
2. Create: `.claude/tasks/FIX_404_ERRORS.md`
3. Start: Content inventory (Phase 1)
4. Review: ~41 draft files
5. Decide: Publish, archive, or delete each draft

---

**Last Session:** 2025-10-19 (Smoke tests, ADR, content planning)
**Next Session:** Content audit Phase 1 - Generate inventory
