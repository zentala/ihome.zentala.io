# ADR 001: Multilingual URL Structure with Language Prefix

**Date:** 2025-10-19
**Status:** ✅ **ACCEPTED**
**Deciders:** Paweł Żentała, Claude Code
**Related:** [`.claude/tasks/I18N_URL_MIGRATION.md`](../tasks/I18N_URL_MIGRATION.md), [`.claude/runbooks/2025-10-19-smoke-tests-implementation.md`](../runbooks/2025-10-19-smoke-tests-implementation.md)

---

## Context

### Current Situation (2025-10-19)

**Production site broken** after Hugo upgrade from v0.121.1 → v0.150.1:
- Homepage shows English placeholder instead of Polish content
- Menu missing 2 items (Tutorials, Services)
- Hugo serves site as `<html lang="en">` instead of `lang="pl"`
- 6 out of 9 smoke tests failing

**Root cause:**
- Hugo 0.150.1 has breaking changes in multilingual handling
- Theme (`@hyas/doks-core`) provides i18n files for EN, DE, NL, ES in `node_modules`
- Hugo auto-creates languages for every `i18n/*.toml` file found
- Hugo ignores `defaultContentLanguage = "pl"` configuration
- Hugo ignores `disableLanguages = ["en", ...]` configuration
- Hugo defaults to "en" (first alphabetically) when multiple languages detected

**Current config (broken):**
```toml
# config/_default/hugo.toml
defaultContentLanguage = "pl"
defaultContentLanguageInSubdir = false  # PL at /, not /pl/
disableLanguages = ["en", "de", "nl", "es"]

# config/_default/languages.toml
[pl]
  languageName = "Polish"
  contentDir = "content"  # No language subdirectory
  weight = 10
```

**Attempted fixes (all failed):**
1. ❌ Remove `[en]` from `languages.toml` → Hugo creates EN from theme's `i18n/en.toml`
2. ❌ Add `disableLanguages = ["en", ...]` → Ignored in Hugo 0.150.1
3. ❌ Change `weight = 1` (higher priority) → Caused infinite recursion in templates
4. ❌ Remove global Hugo → Local Hugo has same issue
5. ❌ Clean cache multiple times → Not a cache problem

**Diagnostic evidence:**
```bash
Hugo output:
                   | EN  | PL
-------------------+-----+-----
  Pages            | 267 | 10
```
Hugo builds 267 EN pages + 10 PL pages, but serves EN as default.

---

## Decision

**We will migrate to full multilingual setup with language prefixes in URLs.**

**New URL structure:**
- Polish (default): `/pl/`
  - `/pl/docs/`
  - `/pl/blog/`
  - `/pl/tutorials/`
- English (future): `/en/`
  - `/en/docs/`
  - `/en/blog/`
  - `/en/tutorials/`

**Configuration:**
```toml
# config/_default/hugo.toml
defaultContentLanguage = "pl"
defaultContentLanguageInSubdir = true  # ← CHANGED: PL now at /pl/

# config/_default/languages.toml
[pl]
  languageName = "Polish"
  contentDir = "content"
  weight = 1

[en]
  languageName = "English"
  contentDir = "content"  # Same content, different frontmatter
  weight = 2
  disabled = false  # Will be enabled when EN content ready
```

**Redirects (301 Permanent):**
```
/                    → /pl/
/docs/*              → /pl/docs/*
/blog/*              → /pl/blog/*
/tutorials/*         → /pl/tutorials/*
/services/           → /pl/services/
```

---

## Rationale

### Why This Decision?

**1. Hugo 0.150+ Requires It**
- Breaking changes in multilingual handling
- No workaround exists that is:
  - ✅ Maintainable long-term
  - ✅ Doesn't require hacks
  - ✅ Works with theme updates

**2. Future-Proof**
- Enables adding English version later
- Aligns with Hugo best practices
- Proper i18n structure for SEO

**3. Better Than Alternatives**
- **Alternative A:** Delete theme's i18n files
  - ❌ Must do after every `pnpm install`
  - ❌ Breaks theme updates
  - ❌ Hacky solution

- **Alternative B:** Fork `@hyas/doks-core` theme
  - ❌ Hard to maintain
  - ❌ Must merge upstream updates manually
  - ❌ Overkill for this problem

- **Alternative C:** Downgrade Hugo to 0.121.1
  - ❌ Security vulnerabilities
  - ❌ Missing new features
  - ❌ Eventually must upgrade anyway
  - ❌ Kicks can down the road

**4. Smoke Tests Ready**
- We have 9 automated tests to verify migration
- Can test each step incrementally
- Prevents breaking site again

---

## Consequences

### Positive

✅ **Site works with Hugo 0.150+**
- Production site functional again
- Can use latest Hugo features
- Security updates available

✅ **Proper i18n foundation**
- Easy to add English version later
- Language switcher ready to implement
- SEO-friendly hreflang tags

✅ **Maintainable**
- No hacks or workarounds
- Follows Hugo best practices
- Works with theme updates

✅ **Tested**
- Smoke tests verify each step
- Automated regression prevention
- Confidence in deployment

### Negative

⚠️ **All URLs change**
- Every page URL gets `/pl/` prefix
- Must setup redirects
- Risk to Google rankings (temporary)

⚠️ **2-3 days of work**
- Update all internal links
- Test redirects thoroughly
- Update sitemap.xml
- Update Google Search Console

⚠️ **SEO impact (short-term)**
- Google must reindex all pages
- Possible ranking fluctuation for 2-4 weeks
- Mitigated by 301 redirects

⚠️ **Increased complexity**
- Language-aware templates needed
- Must maintain i18n files
- More moving parts

---

## Implementation Plan

**See:** `.claude/tasks/I18N_URL_MIGRATION.md` for detailed implementation steps.

**High-level phases:**

### Phase 1: Configuration (Day 1, morning)
1. Update `defaultContentLanguageInSubdir = true`
2. Verify Hugo builds correctly
3. Run smoke tests locally
4. Check all pages accessible at `/pl/*`

### Phase 2: Redirects (Day 1, afternoon)
1. Create redirect rules (Netlify/Vercel/GitHub Pages)
2. Test redirects locally
3. Verify old URLs → new URLs (301)

### Phase 3: Internal Links (Day 2)
1. Update all `[link](...)` in content
2. Update menu configurations
3. Update footer links
4. Verify no broken links

### Phase 4: SEO & Deployment (Day 3)
1. Update sitemap.xml
2. Add hreflang tags
3. Deploy to production
4. Submit new sitemap to Google Search Console
5. Monitor Google Analytics

### Phase 5: Verification (Day 3+)
1. Run smoke tests on production
2. Monitor 404 errors
3. Check Google Search Console
4. Verify redirects working

---

## Verification

**Smoke tests must pass:**
```bash
pnpm run test:smoke
# Expected: 9/9 tests PASS ✅
```

**Manual checks:**
- [ ] Homepage loads at `/pl/` (not `/`)
- [ ] All menu items visible and correct
- [ ] Polish content shows (not English placeholder)
- [ ] Old URLs redirect to `/pl/*` with 301
- [ ] `<html lang="pl">` in source
- [ ] No 404 errors in browser console

**SEO checks:**
- [ ] `robots.txt` allows `/pl/`
- [ ] Sitemap includes `/pl/*` URLs
- [ ] Hreflang tags present: `<link rel="alternate" hreflang="pl" href="/pl/..." />`
- [ ] Google Search Console sees new sitemap

---

## Alternatives Considered

### Alternative 1: Polish-Only Hack (Delete i18n files)

**Approach:** Delete `node_modules/@hyas/doks-core/i18n/en.toml` after every install

**Pros:**
- Quick fix (5 minutes)
- No URL changes
- Site works immediately

**Cons:**
- ❌ Breaks on every `pnpm install`
- ❌ Requires custom postinstall script
- ❌ Breaks theme updates
- ❌ Not maintainable
- ❌ Hacky solution

**Decision:** ❌ Rejected - not sustainable

---

### Alternative 2: Fork Doks Theme

**Approach:** Create fork of `@hyas/doks-core`, remove unwanted languages

**Pros:**
- Full control over i18n files
- Permanent solution
- No need to delete files repeatedly

**Cons:**
- ❌ Hard to maintain fork
- ❌ Must manually merge theme updates
- ❌ Overkill for this problem
- ❌ Adds maintenance burden

**Decision:** ❌ Rejected - too much overhead

---

### Alternative 3: Downgrade Hugo to 0.121.1

**Approach:** Pin Hugo version in package.json, never upgrade

**Pros:**
- Site works immediately
- No URL changes
- Minimal effort

**Cons:**
- ❌ Missing security updates
- ❌ Missing new Hugo features
- ❌ Eventually must upgrade anyway
- ❌ Technical debt accumulates
- ❌ Kicks problem down the road

**Decision:** ❌ Rejected - not future-proof

---

### Alternative 4: Wait for Hugo Fix

**Approach:** Hope Hugo team fixes multilingual behavior in future release

**Pros:**
- No work required
- Might get better solution

**Cons:**
- ❌ No timeline for fix
- ❌ Site broken in meantime
- ❌ May never be fixed (might be intentional)
- ❌ Can't wait indefinitely

**Decision:** ❌ Rejected - too uncertain

---

## References

### Documentation
- Hugo Multilingual: https://gohugo.io/content-management/multilingual/
- Hugo 0.150.1 Release Notes: https://github.com/gohugoio/hugo/releases/tag/v0.150.1
- Theme docs: https://getdoks.org/

### Project Files
- **Task:** `.claude/tasks/I18N_URL_MIGRATION.md`
- **Runbook:** `.claude/runbooks/2025-10-19-smoke-tests-implementation.md`
- **Tests:** `tests/e2e/smoke/*.spec.js`
- **Config:** `config/_default/hugo.toml`, `config/_default/languages.toml`

### Related Issues
- Production incident: 2025-10-18 (documented in `.claude/runbooks/2025-10-18-multilingual-analysis.md`)
- Smoke tests implementation: 2025-10-19 (this runbook)

---

## Notes

### Why "ACCEPTED" not "PROPOSED"?

This decision was made after:
1. ✅ Extensive investigation (2 days)
2. ✅ Multiple fix attempts (all failed)
3. ✅ Technical analysis (Hugo version upgrade breaking change)
4. ✅ Smoke tests implemented (ready to verify)
5. ✅ No viable alternatives found

The decision is **ACCEPTED** because:
- Production is broken (urgent)
- All alternatives exhausted
- Clear implementation path exists
- Tests ready to verify success

### Timeline

- **2025-10-18:** Production breaks after Hugo upgrade
- **2025-10-19:** Investigation, smoke tests implementation, ADR created
- **2025-10-19+:** Migration implementation begins

### Success Criteria

Migration considered successful when:
- ✅ All 9 smoke tests pass
- ✅ Production site functional
- ✅ No 404 errors in Google Search Console (after 1 week)
- ✅ Old URLs redirect correctly (301)
- ✅ Google reindexes new URLs (within 2 weeks)

---

**Status:** ✅ **ACCEPTED** - Ready for implementation
