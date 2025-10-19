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

**Status:** ⚠️ **WARNING** → ✅ **CORRECTED**
**Indexed:** Actually only 14 pages (not 31)
**404 Errors:** 67 broken links (from different site - not ihome!)

**CORRECTION:** The Google Search Console data was from a **different site**, NOT ihome.zentala.io!
- ihome.zentala.io does NOT have Search Console connected
- Actual indexed pages: 14 (confirmed by user)

**Indexed Pages (14 - confirmed):**
```
https://ihome.zentala.io/                              ✅
https://ihome.zentala.io/privacy/                      ✅
https://ihome.zentala.io/demo/                         ✅
https://ihome.zentala.io/blog/                         ✅
https://ihome.zentala.io/services/                     ✅
https://ihome.zentala.io/tutorials/                    ✅
https://ihome.zentala.io/services/consulting/          ✅
https://ihome.zentala.io/docs/connectors/lsa/          ✅
https://ihome.zentala.io/docs/connectors/patchpanele/  ✅
https://ihome.zentala.io/docs/software/openhab/        ❓
https://ihome.zentala.io/blog/projekt-wnetrza-ukonczony/ ✅
https://ihome.zentala.io/docs/systems/inteligentny-dom/ ✅
https://ihome.zentala.io/docs/rozdzielnica/mcb-zabezpiecznie-nadpradowe/ ✅
```

**404 Errors:** Not applicable to ihome (was different site)

**Tasks:**
- **URGENT:** `.claude/tasks/QUICK_PRODUCTION_PATCH.md` 🔴 **FIX NOW**
- **Backlog:** `.claude/tasks/AUTO_DETECT_INDEXED_PAGES.md` 💡 **FUTURE**

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

**🚀 NEW STRATEGY: Quick Patch First, Then Refactor**

```
PHASE 1: PRODUCTION FIX (main branch) 🔴 URGENT
├─ 1. QUICK_PRODUCTION_PATCH (1-2 hours) 🔴 DO NOW
│  ├─ Fix homepage Polish content (6 features)
│  ├─ Fix menu Polish labels (4 items)
│  ├─ Fix 14 indexed pages (ensure all work)
│  ├─ Add missing content for broken pages
│  └─ Deploy to production immediately
│
└─ 2. AUTO_DETECT_INDEXED_PAGES (backlog) 💡 FUTURE
   └─ MCP server for Google Search Console API

PHASE 2: REFACTOR (feature/content-audit branch) 📋 PLANNED
├─ 3. CONTENT_AUDIT (1-2 weeks)
│  ├─ Inventory all 234 files
│  ├─ Identify ~41 drafts
│  ├─ Content Editor Questionnaire (tailored per article)
│  ├─ Translation planning (EN→PL, PL→EN)
│  └─ Quality assessment
│
├─ 4. I18N_URL_MIGRATION (2-3 days) ⏸️ BLOCKED by audit
│  ├─ Change defaultContentLanguageInSubdir = true
│  ├─ All URLs → /pl/ prefix
│  ├─ Setup 301 redirects (only for 14 indexed pages!)
│  ├─ Update sitemap.xml
│  └─ Verify with smoke tests (expect 9/9 PASS)
│
├─ 5. DICTIONARY_REDESIGN (3-5 days) 📋 Long-term
│  ├─ Create /pl/slownik/ index page
│  ├─ A-Z navigation
│  ├─ Category view toggle
│  └─ Search functionality
│
└─ 6. CONTENT_TRANSLATION (Ongoing) 📋 Long-term
   ├─ EN docs → PL
   ├─ Select key PL articles → EN
   └─ Maintain glossary per language
```

### Priority This Week

1. ✅ **DONE:** Implement smoke tests (9 tests)
2. ✅ **DONE:** Create ADR 001 (multilingual decision)
3. ✅ **DONE:** Plan content audit & dictionary
4. ✅ **DONE:** Create QUICK_PRODUCTION_PATCH task
5. ✅ **DONE:** Create AUTO_DETECT_INDEXED_PAGES task (backlog)
6. 🔴 **NOW:** Execute QUICK_PRODUCTION_PATCH (1-2h)
7. 🔄 **NEXT:** Start content audit on feature branch
8. ⏸️ **BLOCKED:** i18n migration (wait for audit)

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

### Next Actions (UPDATED 2025-10-19)

**🔴 IMMEDIATE (Today):**
1. Execute `.claude/tasks/004-QUICK_PRODUCTION_PATCH.md`
   - Fix homepage EN placeholder → PL content
   - Create missing content for 3 broken pages:
     - `/docs/software/openhab/` (OpenHub) ← Paweł will provide AI content
     - `/blog/projekt-wnetrza-ukonczony/`
     - `/docs/rozdzielnica/mcb-zabezpiecznie-nadpradowe/`
   - Deploy to production (main branch)

**📋 THIS WEEK (After patch):**
2. Create feature branch: `git checkout -b feature/content-audit`
3. Start `.claude/tasks/002-CONTENT_AUDIT.md` Phase 1 (inventory)
4. Review ~41 draft files
5. Decide: Publish, archive, or delete each draft

**🔄 NEXT WEEK:**
6. Execute `.claude/tasks/005-I18N_URL_MIGRATION.md` (on feature branch)
7. Verify with smoke tests (expect 9/9 PASS)
8. Merge to main

---

**Last Session:** 2025-10-19 (Smoke tests, ADR, content planning, quick patch strategy)
**Next Session:** Execute quick production patch → fix 3 broken indexed pages
