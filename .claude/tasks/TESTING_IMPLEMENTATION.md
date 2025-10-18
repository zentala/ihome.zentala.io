# Task: Testing Implementation & Multilingual Fix

**Created:** 2025-10-18
**Status:** Ready to implement
**Priority:** 🔴 **CRITICAL** (blocks production fixes)
**Blocked by:** None
**Blocks:** Multilingual fix verification, future development

---

## Context

On 2025-10-18, production site broke with multiple issues:
- Homepage showing English placeholder instead of Polish content
- Menu missing 2 items (Tutorials, Services)
- Docs link pointing to old 404 URL
- Missing related posts section

**Root cause:** Language configuration mismatch (`contentDir = "content/pl"` but directory doesn't exist)

**Fix applied but NOT tested** due to technical issues (too many background processes preventing curl tests).

**Decision:** Implement automated smoke tests FIRST, then use them to verify the fix.

---

## Why Tests First?

1. **Prevent regression** - Catch issues before deployment
2. **Fast feedback** - Know immediately if fix works
3. **Future safety** - Prevent similar issues
4. **Development speed** - Faster than manual testing

**Estimated time saved:** 30 minutes per deployment check

---

## Phase 1: Implement Smoke Tests (Priority 1)

### Objectives

Implement minimal smoke tests that would have caught the 2025-10-18 incident.

**Timeline:** 1-2 hours
**Dependencies:** None
**Specs:** `.claude/specs/000-testing-architecture.md`, `.claude/specs/002-smoke-tests.md`

### Tasks

#### 1.1 Setup Playwright

```bash
# Install Playwright
pnpm add -D @playwright/test

# Install browsers
pnpm exec playwright install chromium

# Create directory structure
mkdir -p tests/e2e/smoke
```

**Files to create:**
- `playwright.config.js` (from spec 000)

#### 1.2 Implement Test: Homepage Content

**File:** `tests/e2e/smoke/homepage-content.spec.js`

**What to test:**
- ✅ Homepage shows 6 Polish feature boxes ("Wymiana elektryki", etc.)
- ✅ NO English placeholder ("Update content", "Add new content")
- ✅ "Latest Posts" section visible
- ✅ At least 1 post in latest posts

**Acceptance criteria:**
- Test fails if placeholder content appears
- Test passes when Polish content loads

#### 1.3 Implement Test: Navigation Menu

**File:** `tests/e2e/smoke/navigation-menu.spec.js`

**What to test:**
- ✅ Main menu has exactly 4 items (Teoria, Blog, Poradniki, Usługi)
- ✅ Teoria link points to `/docs/systems/inteligentny-dom/` (not old URL)
- ✅ All menu items clickable and navigate correctly
- ✅ NO broken links (404)

**Acceptance criteria:**
- Test fails if menu has <4 items
- Test fails if Teoria points to old URL
- Test passes when all 4 items present with correct URLs

#### 1.4 Implement Test: Multilingual Config

**File:** `tests/e2e/smoke/multilingual-config.spec.js`

**What to test:**
- ✅ Site uses Polish as default language (`<html lang="pl">`)
- ✅ Menu labels are Polish (not English)
- ✅ Content directory correctly configured (blog posts load)

**Acceptance criteria:**
- Test fails if HTML lang != "pl"
- Test fails if English menu labels appear
- Test passes when Polish language active

#### 1.5 Run Tests Locally

```bash
# Start Hugo dev server (if not running)
pnpm run dev

# Run smoke tests
pnpm exec playwright test tests/e2e/smoke/

# View HTML report
pnpm exec playwright show-report
```

**Expected results:**
- If current fix works: All tests PASS ✅
- If fix doesn't work: Tests FAIL with specific errors ❌
- This tells us exactly what to fix next

---

## Phase 2: Verify & Fix Multilingual Issue

**Prerequisite:** Phase 1 tests implemented and running

### 2.1 Run Smoke Tests Against Current Fix

```bash
# Ensure latest changes applied
git status

# Run tests
pnpm exec playwright test tests/e2e/smoke/
```

### 2.2 Interpret Results

#### Scenario A: All Tests Pass ✅

**Actions:**
1. Commit the language configuration fix
2. Deploy to production
3. Mark issue as RESOLVED
4. Update `.claude/CLAUDE.md` - remove BLOCKED status

#### Scenario B: Some/All Tests Fail ❌

**Actions:**
1. Analyze which tests failed
2. Read test output for specific errors
3. Fix issues based on test failures
4. Re-run tests
5. Repeat until all pass

**Common failure scenarios:**

**Test: Homepage Content FAILS**
- **Symptom:** Still showing "Update content"
- **Likely cause:** Hugo still falling back to English
- **Fix:** Check `languages.toml` syntax, verify contentDir path

**Test: Navigation Menu FAILS**
- **Symptom:** Still only 2 menu items
- **Likely cause:** Using wrong menu file
- **Fix:** Check which `menus.*.toml` is being used, sync both files

**Test: Multilingual Config FAILS**
- **Symptom:** HTML lang="en" instead of "pl"
- **Likely cause:** Hugo not recognizing Polish as default
- **Fix:** Verify `defaultContentLanguage = "pl"` in hugo.toml

### 2.3 Document Findings

Update `.claude/runbooks/2025-10-18-multilingual-analysis.md` with:
- Test results
- Fixes applied
- Final working configuration

---

## Phase 3: CI/CD Integration (Optional, but Recommended)

**Timeline:** 30 minutes
**When:** After Phase 1 & 2 complete

### 3.1 Add GitHub Actions Workflow

**File:** `.github/workflows/smoke-tests.yml`

```yaml
name: Smoke Tests

on:
  pull_request:
    branches: [main]
  push:
    branches: [main]

jobs:
  smoke-tests:
    runs-on: ubuntu-latest
    timeout-minutes: 5

    steps:
      - uses: actions/checkout@v4

      - uses: pnpm/action-setup@v2
        with:
          version: 8.12.0

      - uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: 'pnpm'

      - name: Install dependencies
        run: pnpm install

      - name: Install Playwright
        run: pnpm exec playwright install --with-deps chromium

      - name: Build Hugo site
        run: pnpm run build

      - name: Run smoke tests
        run: pnpm exec playwright test tests/e2e/smoke/

      - name: Upload report on failure
        if: failure()
        uses: actions/upload-artifact@v4
        with:
          name: smoke-test-report
          path: playwright-report/
```

**Result:** Every PR/push runs smoke tests automatically. Deploy blocked if tests fail.

---

## Phase 4: Decide Multilingual Strategy

**Prerequisite:** Site working correctly (all tests pass)

### Decision Point

**Option 1: Polish-Only (Current Direction)**
- Remove EN language completely
- Delete `menus.en.toml`
- Simplest solution
- Can add i18n later if needed

**Option 2: Full Multilingual with `/pl/` Prefix**
- Change `defaultContentLanguageInSubdir = true`
- Setup redirect rules (`/` → `/pl/`)
- Prepare for future English content
- More complex setup

**See:** `.claude/runbooks/2025-10-18-multilingual-analysis.md` for detailed comparison

### 4.1 If Option 1 (Polish-Only)

**Tasks:**
1. Delete `menus.en.toml`
2. Confirm only `[pl]` in `languages.toml`
3. Update `.claude/CLAUDE.md` with decision
4. Mark multilingual issue as RESOLVED

**Timeline:** 10 minutes

### 4.2 If Option 2 (Multilingual `/pl/`)

**Tasks:**
1. Create new task: `.claude/tasks/I18N_URL_MIGRATION.md`
2. Spec out redirect strategy
3. Plan URL migration timeline
4. Keep current fix as temporary

**Timeline:** Future task (3-5 days)

---

## Deliverables

### Must Have (Phase 1)

- [ ] Playwright installed and configured
- [ ] `tests/e2e/smoke/homepage-content.spec.js` implemented
- [ ] `tests/e2e/smoke/navigation-menu.spec.js` implemented
- [ ] `tests/e2e/smoke/multilingual-config.spec.js` implemented
- [ ] All 3 tests running and passing
- [ ] `.claude/CLAUDE.md` updated with test status

### Should Have (Phase 2)

- [ ] Multilingual fix verified with tests
- [ ] Production deployment successful
- [ ] Issue marked RESOLVED in `.claude/CLAUDE.md`
- [ ] Runbook updated with final resolution

### Nice to Have (Phase 3)

- [ ] GitHub Actions workflow for smoke tests
- [ ] PR checks enabled (tests must pass)
- [ ] Team notified about new testing workflow

### Future (Phase 4)

- [ ] Multilingual strategy decided and documented
- [ ] Either: Polish-only confirmed OR i18n migration task created

---

## Success Criteria

### Phase 1 Success

✅ **Tests implemented:**
- 3 smoke test files created
- Tests run without errors
- Tests can be executed with `pnpm exec playwright test`

✅ **Tests provide value:**
- Test failures clearly indicate what's broken
- Test passes confirm fix works
- Tests prevent future regressions

### Phase 2 Success

✅ **Issue resolved:**
- All smoke tests pass
- Homepage shows Polish content (6 feature boxes)
- Menu has all 4 items
- No placeholder content

✅ **Production working:**
- Site deployed successfully
- Manual verification confirms fix
- No new issues introduced

### Overall Success

✅ **Testing infrastructure:** Ready for future development
✅ **Production stability:** Site working correctly
✅ **Team confidence:** Tests prevent regressions
✅ **Documentation:** Clear path forward for multilingual

---

## Next Steps After This Task

**Immediate (< 1 day):**
1. Decide multilingual strategy (Polish-only vs `/pl/` prefix)
2. Update project documentation
3. Mark issue as resolved

**Short-term (< 1 week):**
1. Add more smoke tests (search, theme switcher, responsive)
2. Implement Feature tests for critical flows
3. Add visual regression tests (optional)

**Long-term (> 1 month):**
1. Implement full i18n if Option 2 chosen
2. Add performance budget tests
3. Expand test coverage to 80%+ of features

---

## Related Documentation

- **Architecture:** `.claude/specs/000-testing-architecture.md`
- **Smoke Tests Spec:** `.claude/specs/002-smoke-tests.md`
- **Incident Analysis:** `.claude/runbooks/2025-10-18-multilingual-analysis.md`
- **Project Instructions:** `.claude/CLAUDE.md`

---

## Questions & Answers

**Q: Why implement tests before fixing the bug?**
A: Tests tell us if the fix works. Without tests, we're guessing. Tests are faster than manual verification.

**Q: Can't we just manually test?**
A: Manual testing works once. Automated tests work forever. They prevent regression.

**Q: What if tests take too long to write?**
A: Phase 1 tests take 1-2 hours. They save 30min per deployment. ROI after 3-4 deployments.

**Q: Do we need all these phases?**
A: Phase 1 is CRITICAL. Phase 2 is required. Phase 3 & 4 can wait if needed.

---

**End of Testing Implementation Task**
