# Task: Content Audit & Improvement

**Status:** 📋 Planning
**Created:** 2025-10-19
**Priority:** 🔴 **HIGH** (before i18n migration)
**Complexity:** Large (1-2 weeks)
**Dependencies:** Must complete BEFORE i18n migration starts
**Related:** `.claude/tasks/I18N_URL_MIGRATION.md`, `.claude/adrs/001-multilingual-url-structure.md`

---

## Context

Before migrating to `/pl/` URL structure, we need to:
1. **Audit existing content** - understand what we have
2. **Identify gaps** - drafts, incomplete articles, missing translations
3. **Plan improvements** - content quality, engagement, value proposition
4. **Prepare for translation** - which content to translate to EN first

---

## Current Content Inventory

**Total:** 234 markdown files

**By Section:**
- 📝 **Blog:** 28 posts
- 📚 **Docs:** 174 pages (including dictionary)
- 🎓 **Tutorials:** 19 guides
- 📄 **Pages:** ~13 (homepage, services, etc.)

**Status:**
- ✅ Published: ~233 files
- 📝 Drafts: 1 file
- ❓ Incomplete: TBD (needs analysis)

**Language:**
- 🇵🇱 Polish: Most content
- 🇬🇧 English: Some docs (need translation to PL)
- 🌍 Mixed: Some pages (needs cleanup)

---

## Phases

### Phase 1: Content Analysis 📊

**Goal:** Generate complete inventory of all content with metadata

**Tasks:**
1. Generate sitemap of all URLs (current structure)
2. Extract frontmatter from all .md files:
   - Title, date, draft status, language
   - Categories, tags
   - Word count, last modified
3. Identify content types:
   - Complete & published
   - Drafts (draft: true)
   - Incomplete (started but unfinished)
   - English content needing PL translation
   - Polish content ready for EN translation
4. Create content database (CSV or JSON)

**Deliverable:** `.claude/content-inventory.json`

**Timeline:** 2-3 hours

---

### Phase 2: Quality Assessment 🎯

**Goal:** Evaluate content quality and identify improvement opportunities

**For each article, assess:**
1. **Completeness:**
   - Has introduction?
   - Has conclusion?
   - Missing sections/images?
   - Broken links?

2. **Quality:**
   - Clear value proposition?
   - Engaging writing?
   - Technical accuracy?
   - Up-to-date information?

3. **SEO:**
   - Meta description present?
   - Title optimized?
   - Headers structure (H1-H6)?
   - Internal links?

**Deliverable:** `.claude/content-quality-report.md`

**Timeline:** 1 day

---

### Phase 3: Content Editor Questionnaire 📝

**Goal:** Engage Paweł to improve key articles with his personal stories and expertise

**Process:**
1. Identify **key articles** (high-value, high-traffic potential)
2. For each article, prepare:
   - Current status summary
   - What's good / what's missing
   - Specific questions about:
     - Personal experiences to add
     - Technical details to clarify
     - Stories/examples to include
     - Lessons learned to share
3. Present questionnaire to Paweł
4. Paweł records voice responses (voice → text)
5. Integrate responses into articles

**Article Types Prioritized:**
- 🏠 **Blog posts** - highest priority (personal touch important)
- 🎓 **Tutorials** - medium priority (step-by-step clarity)
- 📚 **Docs** - lower priority (more reference material)

**Deliverable:** `.claude/content-questionnaire.md`

**Timeline:** Ongoing (1-2 articles per session)

---

### Phase 4: Draft Completion 📝

**Goal:** Finish incomplete articles or archive them

**Tasks:**
1. List all drafts and incomplete articles
2. For each draft:
   - **Option A:** Complete and publish
   - **Option B:** Archive to `.claude/archived-drafts/`
   - **Option C:** Delete if no longer relevant
3. Paweł decides which option for each draft

**Deliverable:** All drafts either published or archived

**Timeline:** 2-3 days

---

### Phase 5: Translation Plan 🌍

**Goal:** Identify content for EN translation and PL translation

**English → Polish (Priority):**
- Some docs are in English, need PL translation
- Maintain consistency - site should be primarily PL

**Polish → English (Future):**
- Select key articles for EN version
- Prioritize:
  - Most popular posts
  - Universal topics (not Poland-specific)
  - Tutorial content (how-to guides)

**Deliverable:** `.claude/translation-plan.md`

**Timeline:** 1 day

---

### Phase 6: Dictionary Redesign 📖

**Goal:** Redesign dictionary from single-page to browsable index

**Current State:**
- Dictionary at `/docs/dict/`
- Direct access to terms (no index page)
- No search, no categories

**New Design:**
- Main page: `/dictionary/` (PL) or `/en/dictionary/` (EN)
- Alphabetical index: A, B, C, D...
- Category view toggle
- Search functionality
- Per-language dictionaries:
  - `/pl/dictionary/` - Polish terms
  - `/en/dictionary/` - English terms (future)

**Deliverable:** `.claude/specs/003-dictionary-redesign.md`

**Timeline:** 3-5 days implementation (separate task)

---

## Deliverables Summary

**Analysis Phase:**
- [ ] `.claude/content-inventory.json` - Complete content database
- [ ] `.claude/content-quality-report.md` - Quality assessment
- [ ] `.claude/content-sitemap.txt` - All current URLs

**Planning Phase:**
- [ ] `.claude/content-questionnaire.md` - Questions for Paweł
- [ ] `.claude/translation-plan.md` - What to translate when
- [ ] `.claude/specs/003-dictionary-redesign.md` - Dictionary redesign spec

**Action Phase:**
- [ ] Published drafts or archived
- [ ] Key articles improved with Paweł's input
- [ ] EN content translated to PL
- [ ] Content ready for i18n migration

---

## Content Editor Questions - Template

**For each key article:**

```markdown
## Article: [Title]

**Current Status:**
- Published: Yes/No
- Word count: XXX
- Last updated: YYYY-MM-DD
- Language: PL/EN

**What's Working:**
- [List strengths]

**What's Missing:**
- [List gaps]

**Questions for Paweł:**

1. **Personal Experience:**
   - What challenges did you face when [topic]?
   - What surprised you during this project?
   - What would you do differently knowing what you know now?

2. **Technical Details:**
   - Can you explain [specific concept] in more detail?
   - What tools/products did you actually use?
   - What were the exact specifications/measurements?

3. **Stories & Examples:**
   - Can you describe a specific moment/problem you encountered?
   - What mistakes did you make that readers should avoid?
   - What unexpected benefits did you discover?

4. **Lessons Learned:**
   - What's the #1 tip you'd give someone doing this?
   - What's commonly misunderstood about [topic]?
   - What resources were most helpful to you?

5. **Visual Content:**
   - Do you have photos of this project?
   - Could you sketch/diagram [concept]?
   - What would be helpful to show visually?
```

---

## Tools Recommendation

**For checking Google indexing:**
1. **Google Search Console** (już masz dostęp?)
   - Shows exactly what Google indexed
   - Identifies 404s, crawl errors
   - URL inspection tool

2. **site: search operator:**
   ```
   site:ihome.zentala.io
   ```
   Shows all indexed pages

3. **Screaming Frog SEO Spider** (free for <500 URLs)
   - Crawls entire site
   - Finds broken links
   - Exports sitemap

4. **Hugo sitemap.xml:**
   ```bash
   curl https://ihome.zentala.io/sitemap.xml
   ```
   Your current sitemap (before migration)

---

## Pre-Migration Checklist

**Before starting i18n migration, ensure:**

- [ ] Content inventory complete
- [ ] Quality issues identified
- [ ] Drafts published or archived
- [ ] Critical articles improved
- [ ] EN content translated to PL
- [ ] Broken links fixed
- [ ] Images optimized
- [ ] Meta descriptions added
- [ ] Current sitemap exported (for redirect mapping)

---

## Success Criteria

**Content Audit Complete When:**
✅ All content catalogued and analyzed
✅ Paweł has answered questions for top 10 articles
✅ All drafts resolved (published/archived)
✅ EN content translated to PL
✅ Translation plan created for PL → EN
✅ Dictionary redesign spec written
✅ Content quality improved measurably

**Metrics:**
- ✅ 0 drafts remaining
- ✅ <5% incomplete articles
- ✅ 100% Polish language consistency (except intentional EN)
- ✅ All broken links fixed
- ✅ All images have alt text

---

## Next Steps After This Task

1. **Immediate:** Start i18n migration (`.claude/tasks/I18N_URL_MIGRATION.md`)
2. **Parallel:** Ongoing content improvements (questionnaire responses)
3. **Future:** Dictionary redesign implementation
4. **Future:** EN content translation (after migration stable)

---

## Related Tasks

- `.claude/tasks/I18N_URL_MIGRATION.md` - Blocked by this audit
- `.claude/specs/003-dictionary-redesign.md` - To be created
- `.claude/tasks/CONTENT_TRANSLATION.md` - To be created (future)

---

**Status:** 📋 **READY FOR PLANNING**

Next session: Start Phase 1 - Generate content inventory
