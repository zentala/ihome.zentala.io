# Runbook - 2025-10-18 - Glossary Tooltips System

**Related:** [2025-10-18.md](2025-10-18.md) (main daily runbook)

---

## Session Summary

Designed and documented comprehensive glossary tooltips system for automatic term detection and interactive tooltips in blog/tutorial content.

**Roles used:** Business Analyst, QA, Software Architect, Content Architect, Task Manager

**Time spent:** ~3 hours (analysis + architecture + documentation)

---

## Context

**Problem:**
- Knowledge base in `/content/docs/` has 100+ technical terms across multiple categories
- Readers encounter terms like "IoT", "przekaźnik", "MQTT" in blog posts without context
- No automatic linking to documentation
- Poor SEO internal linking
- Low engagement with `/docs/` content

**User request:**
> "Podoba mi się idea z tech-improvements.md punkt 9 - automated interlinking scripts. Chcę system tooltipów dla pojęć z bazy wiedzy /docs/. Przy pierwszym wystąpieniu pojęcia w tekście pokazuje się tooltip z definicją i linkiem 'czytaj więcej'. Z czasem może dodamy ikony, obrazki."

---

## Approach

### 1. Business Analysis & QA Phase

**Asked critical questions:**

**Q1: Shortcode syntax?**
- Option A: `{{< term "slug" >}}text{{< /term >}}` (Hugo shortcode)
- Option B: `[text]{.term data-key="slug"}` (markdown attribute)
- Option C: `<abbr data-term="slug">text</abbr>` (raw HTML)

**Decision:** Option C (raw HTML) for simplicity, but discussed Option A advantages (future-proof for icons/metadata)

**Q2: Build script - when to run?**
- Scenario A: Pre-build (2-stage Hugo build)
- Scenario B: Direct frontmatter parse (no Hugo dependency)
- Scenario C: Cached glossary.json

**Decision:** Option B (direct parse) for speed and pre-commit hook compatibility

**Q3: False positives handling?**
- Proposed syntax: `<!-- glossary:ignore -->text<!-- /glossary:ignore -->`
- Multi-layer: Auto-skip code blocks, links + manual ignore comments

**Q4: Glossary page structure?**
- Layout: Alphabetical (A-Z) with category badges
- URL: `/docs/dict/` (English "dictionary" to avoid Polish "słownik" in URL)
- i18n future: `/pl/docs/slownik/`, `/en/docs/dictionary/`

**Q5: Pre-commit hook workflow?**
- Option A: Manual preview, abort commit, user applies changes
- Option B: Auto-mark and commit
- Option C: Flexible (env var switches between A/B)

**Decision:** Option C for flexibility

**Identified issues:**
1. **Performance risk:** 500+ terms × regex = potential lag
   - Mitigation: Build-time processing, localStorage cache
2. **Link conflicts:** Might overwrite manual links
   - Mitigation: Skip existing `<a>` tags
3. **i18n complexity:** Multiple languages need separate planning
   - Mitigation: Backlog task for future

---

### 2. Software Architecture Phase

**Key architectural decisions:**

**Data Model:**
```yaml
# Term frontmatter (content/docs/concepts/iot.md)
glossary:
  enabled: true  # Flag to include in glossary
  summary: |     # Markdown definition (1-3 sentences)
    **Internet Rzeczy (IoT)** to sieć urządzeń...
  aliases:       # Synonyms for detection
    - "Internet Rzeczy"
    - "IoT"
  category: "concepts"  # Auto-detected from folder
  term_image: ""        # Future: square thumbnail

# Category metadata (content/docs/concepts/_index.md)
category_icon: "bulb"   # Tabler icon (future)
category_color: "#4ecdc4"
```

**Build-time flow:**
```
1. Script parses all docs/**/*.md frontmatter
2. Builds glossary index: { slug: { title, aliases, summary } }
3. Scans content files for term occurrences
4. Inserts <abbr data-term="slug">text</abbr>
5. Marks only first occurrence per file
6. Skips: code blocks, existing links, <!-- glossary:ignore -->
```

**Runtime flow:**
```
1. Page loads
2. JS fetches /glossary.json (cached 24h in localStorage)
3. Finds all <abbr data-term="...">
4. Attaches hover listeners
5. On hover: Creates tooltip with summary + "Czytaj więcej" link
6. Smart positioning (above/below based on viewport space)
```

**Hugo integration:**
```
- Shortcode: layouts/shortcodes/term.html (if using Option A)
- Output format: layouts/_default/index.glossary.json
- Glossary page: layouts/dict/list.html
- Config: hugo.toml (output formats, pagination)
```

**Pre-commit hook:**
```bash
# Manual mode (default)
git commit → Hook aborts → Shows instructions → User runs:
  pnpm run glossary:mark --dry-run  # Preview
  pnpm run glossary:mark --staged   # Apply
  git commit                        # Success

# Auto mode
GLOSSARY_AUTO_MARK=true git commit → Auto-marks → Success
```

---

### 3. Content Architecture Phase

**Frontmatter structure designed:**

**Wiki-style with markdown summary:**
```yaml
---
title: "IoT (Internet of Things)"
glossary:
  enabled: true
  summary: |
    **Internet Rzeczy (IoT)** to sieć urządzeń codziennego użytku
    połączonych z internetem, które wymieniają dane i automatycznie
    wykonują zadania.

    Obejmuje urządzenia od prostych {{< term "czujniki" >}}czujników{{< /term >}}
    i smart home, po zaawansowane systemy przemysłowe.
  aliases:
    - "Internet Rzeczy"
    - "Internet of Things"
    - "IoT"
  category: "concepts"
  term_image: "iot-thumb.jpg"  # Optional, future
  related_terms:               # Optional, future
    - "mqtt"
    - "zigbee"

# Hugo aliases for SEO redirects (synonyms)
aliases:
  - /internet-of-things/
  - /internet-rzeczy/

seo:
  title: "IoT | Dokumentacja"
  description: "..."
---
```

**Glossary page mockup:**
```
═══════════════════════════════════════
         📖 SŁOWNIK POJĘĆ
═══════════════════════════════════════

[A] [B] [C] [D] [E] ... [Z]

───────────────────────────────────────
I
───────────────────────────────────────

┌─────────────────────────────────────┐
│ IoT (Internet of Things) [concepts] │
├─────────────────────────────────────┤
│ Internet Rzeczy (IoT) to sieć       │
│ urządzeń połączonych z internetem...│
│                                      │
│ Znane też jako: Internet Rzeczy, IoT│
│ Zobacz też: MQTT, Zigbee             │
│                                      │
│                  [Czytaj więcej →]  │
└─────────────────────────────────────┘
```

**Synonimy handling:**
1. Hugo aliases (301 redirects): `/internet-of-things/` → `/docs/concepts/iot/`
2. Visible in glossary: "Znane też jako: ..."
3. Search index includes aliases

---

### 4. Task Management Phase

**Broke down into 7 phases (5-7 days MVP):**

| Phase | Tasks | Time |
|-------|-------|------|
| 1. Foundation | Dependencies, frontmatter schema, shortcode | 1-2 days |
| 2. Build Script | `mark-glossary-terms.mjs`, CLI, unit tests | 1 day |
| 3. Hugo Integration | `glossary.json`, dict page layout | 1 day |
| 4. Frontend | JavaScript tooltips, SCSS styles | 1 day |
| 5. Pre-commit Hook | `.husky/pre-commit`, workflow testing | 0.5 days |
| 6. Testing | Playwright E2E, performance tests | 1 day |
| 7. Documentation | README, runbook, end-to-end test | 0.5 days |

**Rollout plan (4 weeks):**
- Week 1: Staging, 10-20 terms, team feedback
- Week 2: Migration (add `glossary.enabled: true` to all docs)
- Week 3: Production deploy, enable pre-commit hook
- Week 4: Optimization, collect metrics, implement P1 enhancements

---

## Documentation Created

### 1. `.claude/CLAUDE.md` (Updated)

**Added section:** Specs & Tasks Protocol

**Naming convention:**
- Specs: `.claude/specs/NNN-feature-name.md`
- Future: `.claude/specs/NNN-feature-name.FUTURE.md`
- Tasks: `.claude/tasks/FEATURE_NAME.md`

**Example:**
- `.claude/specs/001-glossary-tooltips.md`
- `.claude/specs/001-glossary-tooltips.FUTURE.md`
- `.claude/tasks/GLOSSARY_TOOLTIPS.md`

---

### 2. `.claude/specs/001-glossary-tooltips.md` (NEW - 550 lines)

**Main technical specification**

**Sections:**
1. Problem Statement
2. Goals & Non-Goals
3. Architecture Overview (build-time + runtime diagrams)
4. Data Model (frontmatter schemas)
5. Component Specifications (7 components)
   - Build script (`mark-glossary-terms.mjs`)
   - Hugo shortcode (or raw HTML)
   - Hugo output format (`glossary.json`)
   - JavaScript module (`glossary-tooltips.js`)
   - SCSS styles
   - Glossary page layout
   - Pre-commit hook
6. Testing Strategy (unit + E2E + performance)
7. Dependencies (npm packages, Hugo version)
8. Performance Targets
9. Accessibility (semantic HTML, ARIA)
10. SEO Benefits
11. Migration Plan
12. Constraints & Limitations
13. Rollback Plan
14. Success Metrics
15. References
16. Appendix (file structure)

**Key specs:**

**Build script CLI:**
```bash
pnpm run glossary:mark --all         # All files
pnpm run glossary:mark --dirty       # Uncommitted
pnpm run glossary:mark --staged      # Staged only
pnpm run glossary:mark --dry-run     # Preview
pnpm run glossary:mark --verbose     # Debug
pnpm run glossary:mark file1.md file2.md  # Specific files
```

**Performance targets:**
- `glossary.json` size: < 100 KB
- Tooltip render time: < 100ms
- Build script: < 10s for 100 files
- localStorage cache: 24h expiry

**Skip patterns:**
```javascript
const skipPatterns = [
  /<code[^>]*>.*?<\/code>/gs,         // Code blocks
  /<pre[^>]*>.*?<\/pre>/gs,           // Pre blocks
  /`[^`]+`/g,                          // Inline code
  /<a[^>]*>.*?<\/a>/gs,                // Existing links
  /<!--\s*glossary:ignore\s*-->.*?<!--\s*\/glossary:ignore\s*-->/gs,
  /\{\{<.*?>\}\}/gs,                   // Existing shortcodes
];
```

---

### 3. `.claude/specs/001-glossary-tooltips.FUTURE.md` (NEW - 300 lines)

**Future enhancements backlog**

**Priority breakdown:**

**🔥 P1 (High priority - 7 days):**
1. Dark mode colors (1 day)
2. ARIA labels (1 day)
3. Keyboard navigation (1 day)
4. Intersection Observer for lazy loading (1 day)
5. i18n URL aliasing (`/pl/docs/slownik/`) (2 days)

**⭐ P2 (Medium priority - 11 days):**
1. Category & term icons (3 days)
2. Search integration (Algolia/Pagefind) (4 days)
3. Schema.org markup (DefinedTerm) (2 days)
4. Related terms sidebar (2 days)

**💡 P3 (Nice-to-have - 15+ days):**
1. Analytics tracking (hover/click events) (2 days)
2. Animations (1 day)
3. Trie data structure for faster matching (3 days)
4. Difficulty levels (beginner/intermediate/advanced) (2 days)
5. AI-generated icons (1 week)
6. Visual regression tests (Percy) (2 days)

**Recommended Phase 2 (after MVP):**
- Dark mode + A11y (ARIA + keyboard) = 3 days
- Intersection Observer = 1 day
- Category icons = 3 days
- Search integration = 4 days
- **Total: ~11 days**

**Notable enhancements:**

**4.4 Category Icons:**
```yaml
# content/docs/actuators/_index.md
category_icon: "switch-3"  # Tabler icon

# content/docs/actuators/przekazniki.md
glossary:
  term_icon: "relay.svg"      # Optional per-term
  term_image: "thumb.jpg"     # Square thumbnail
```

**4.3 Search Integration:**
```json
// Algolia/Pagefind index entry
{
  "objectID": "glossary-iot",
  "title": "IoT (Internet of Things)",
  "type": "glossary",
  "category": "concepts",
  "summary": "...",
  "url": "/docs/concepts/iot/",
  "aliases": ["Internet Rzeczy", "IoT"]
}
```

**8.1 Schema.org Markup:**
```html
<abbr itemscope itemtype="https://schema.org/DefinedTerm">
  <span itemprop="name">IoT</span>
  <meta itemprop="description" content="Internet Rzeczy to...">
  <link itemprop="url" href="/docs/concepts/iot/">
</abbr>
```

---

### 4. `.claude/tasks/GLOSSARY_TOOLTIPS.md` (NEW - 700 lines)

**Complete implementation roadmap**

**7 Phases with detailed acceptance criteria:**

**Phase 1: Foundation (Day 1-2)**
- [ ] Install dependencies: `pnpm add -D gray-matter fast-glob chalk yargs @playwright/test vitest`
- [ ] Update 3+ category `_index.md` with `category_icon`
- [ ] Add `glossary.enabled: true` to 5+ docs pages
- [ ] Create Hugo shortcode `layouts/shortcodes/term.html`
- [ ] Test shortcode renders `<abbr>` correctly

**Phase 2: Build Script (Day 2-3)**
- [ ] Create `scripts/mark-glossary-terms.mjs`
- [ ] Implement CLI: `--all`, `--dirty`, `--staged`, `--dry-run`, `--verbose`
- [ ] Skip logic: code blocks, links, ignore comments
- [ ] Mark only first occurrence per file
- [ ] Handle merge conflicts gracefully
- [ ] Write unit tests (Vitest): 80%+ coverage
- [ ] Add npm scripts to `package.json`

**Phase 3: Hugo Integration (Day 3-4)**
- [ ] Add `glossary` output format to `hugo.toml`
- [ ] Create `layouts/_default/index.glossary.json`
- [ ] Verify `public/glossary.json` generated (< 100 KB)
- [ ] Create `layouts/dict/list.html` (glossary page)
- [ ] Create `content/docs/dict/_index.md`
- [ ] Test `/docs/dict/` renders without errors

**Phase 4: Frontend (Day 4-5)**
- [ ] Create `assets/js/glossary-tooltips.js`
- [ ] Implement localStorage cache (24h expiry)
- [ ] Smart positioning (above/below viewport)
- [ ] Create `assets/scss/components/_glossary-tooltips.scss`
- [ ] Include in main SCSS
- [ ] Add to Hugo footer partial
- [ ] Test tooltips appear on hover
- [ ] Verify no layout shifts

**Phase 5: Pre-commit Hook (Day 5)**
- [ ] Create `.husky/pre-commit`
- [ ] Implement manual mode (abort + show instructions)
- [ ] Implement auto mode (`GLOSSARY_AUTO_MARK=true`)
- [ ] Test 4 scenarios: manual, preview, apply, auto
- [ ] Verify hook skips when no content changes

**Phase 6: Testing (Day 6)**
- [ ] Create `playwright.config.js`
- [ ] Write E2E tests: tooltip show/hide, navigation, glossary page
- [ ] Run: `pnpm exec playwright test`
- [ ] Performance tests: JSON size, tooltip render, build time
- [ ] All tests pass (100%)

**Phase 7: Documentation & Launch (Day 7)**
- [ ] Update runbook with implementation notes
- [ ] Create `scripts/README.md`
- [ ] End-to-end workflow test
- [ ] Deploy to staging
- [ ] Production rollout plan

**Success Criteria (MVP):**

**Technical:**
- [ ] Build script: 100 files in < 10s
- [ ] `glossary.json`: < 100 KB
- [ ] Tooltip render: < 100ms
- [ ] Zero console errors
- [ ] All tests pass (100%)

**Functional:**
- [ ] Tooltips appear on hover
- [ ] Smart positioning works
- [ ] LocalStorage cache works (24h)
- [ ] Glossary page renders
- [ ] Pre-commit hook works (both modes)

**Content:**
- [ ] 50+ terms with `glossary.enabled: true`
- [ ] All categories have `category_icon`
- [ ] All summaries 1-3 sentences
- [ ] 100+ pages with marked terms

**Business (post-launch):**
- [ ] +20% clicks to /docs/ from blog (1 month)
- [ ] +50% indexed /docs/ pages (GSC)
- [ ] User feedback: "helpful" > 80%

**Troubleshooting section included** for common issues

---

### 5. `.claude/tasks/I18N_URL_MIGRATION.md` (NEW - 400 lines)

**Future task: Multi-language support**

**Status:** Backlog (not started)

**Goal:** Migrate from language-agnostic URLs to language-prefixed:
- Current: `/docs/dict/`, `/blog/`
- Future: `/pl/docs/slownik/`, `/en/docs/dictionary/`

**Key steps:**
1. Duplicate content to `/pl/` and `/en/` folders
2. Update `hugo.toml` with `[languages]` config
3. Setup 301 redirects (12-month grace period)
4. Update templates (language switcher, hreflang tags)
5. Per-language `glossary.json`
6. Content translation (ongoing)

**Migration strategy:**
```toml
# Hugo redirects
[[redirects]]
  from = "/docs/dict/*"
  to = "/pl/docs/slownik/:splat"
  status = 301
```

**Effort estimate:** 5-8 days (setup + Phase 1 translation)

**Dependencies:** Glossary tooltips MVP must be stable

**Open questions:**
1. Which language to prioritize? (EN vs DE)
2. Auto-detect or show selector?
3. Translation workflow? (in-house vs outsource)
4. Translate URL slugs or keep English?

---

## Key Decisions Summary

| Decision | Options Considered | Chosen | Rationale |
|----------|-------------------|--------|-----------|
| **Syntax** | Shortcode vs Markdown attr vs Raw HTML | Raw HTML `<abbr>` | Simplicity, but noted shortcode benefits |
| **Build flow** | 2-stage Hugo vs Direct parse vs Cache | Direct frontmatter parse | Fast, no Hugo dependency |
| **Category metadata** | `_index.md` vs `data/categories.yaml` | `_index.md` | Hugo-native, per-category git history |
| **Aliases** | With `/docs/` prefix vs relative | Relative only | Future-proof for URL changes |
| **Pre-commit** | Manual vs Auto vs Flexible | Flexible (env var) | Balance safety + convenience |
| **Glossary URL** | `/slownik/` vs `/dict/` | `/dict/` | Avoid Polish in URL (i18n later) |
| **Term detection** | Client-side vs Build-time | Build-time (script) | Performance (no runtime regex) |
| **Cache strategy** | Session vs LocalStorage vs None | LocalStorage 24h | Balance freshness + speed |

---

## Technical Highlights

**Build Script Features:**
- Multi-mode: `--all`, `--dirty`, `--staged`, `--dry-run`, `--verbose`
- Smart skip: code blocks, links, existing shortcodes, ignore comments
- Conflict detection: Skips files with merge conflict markers
- First occurrence only: Prevents over-linking
- Case-insensitive: Matches "IoT", "iot", "IOT"

**Frontend Features:**
- LocalStorage cache (24h expiry)
- Smart positioning (above/below based on viewport)
- Lazy loading (future: Intersection Observer)
- Responsive design
- Dark mode ready (future enhancement)

**SEO Benefits:**
- Internal linking (every tooltip = backlink)
- Glossary page (`/docs/dict/`) with rich content
- Hugo aliases (301 redirects for synonyms)
- Future: Schema.org DefinedTerm markup
- Future: Hreflang tags for i18n

**Accessibility:**
- Semantic HTML (`<abbr>` with `title`)
- Keyboard navigation (future: Tab/Enter/Esc)
- ARIA labels (future enhancement)
- WCAG AA color contrast

---

## Files Created

**Documentation:**
- `.claude/CLAUDE.md` (updated - Specs & Tasks Protocol section)
- `.claude/specs/001-glossary-tooltips.md` (550 lines)
- `.claude/specs/001-glossary-tooltips.FUTURE.md` (300 lines)
- `.claude/tasks/GLOSSARY_TOOLTIPS.md` (700 lines)
- `.claude/tasks/I18N_URL_MIGRATION.md` (400 lines)
- `.claude/runbooks/2025-10-18-glossary-tooltips.md` (this file)

**Total documentation:** ~2000 lines

---

## Next Steps

**Awaiting approval to start implementation:**

1. **Review specs** - User reviews documentation
2. **Get approval** - Confirm approach, priorities
3. **Start Phase 1** - Install dependencies, create frontmatter schema
4. **Iterate** - Implement phases 1-7 over 5-7 days

**Questions for user:**
- ✅ Syntax confirmed: Raw HTML `<abbr data-term="slug">`
- ✅ Category icons: In `_index.md` (not central file)
- ✅ Aliases: Relative paths only (no `/docs/` prefix)
- ✅ Pre-commit: Flexible (manual preview OR auto via env var)
- ✅ All decisions approved

**Ready to start:** YES - All requirements clarified, specs complete

---

## Learnings

1. **Requirements clarity is critical** - Spent 1+ hour as BA/QA asking questions before writing code
2. **Multiple perspectives help** - Using BA, Architect, Content roles caught edge cases
3. **Documentation investment pays off** - 2000 lines of specs = clear roadmap for implementation
4. **Future-proofing matters** - Designed for icons, images, i18n even though not MVP
5. **Performance should be spec'd upfront** - Defined targets: < 100KB, < 100ms, < 10s
6. **Testing is part of architecture** - E2E tests designed alongside features
7. **Rollback plans reduce risk** - Documented how to revert if issues occur

---

**Session completed:** 2025-10-18
**Status:** Specification complete, ready for implementation
**Next session:** Begin Phase 1 (Foundation)
