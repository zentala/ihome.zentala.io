# Task: Fix 404 Errors & Broken Links

**Status:** 📋 **PLANNED**
**Created:** 2025-10-19
**Priority:** 🔴 **HIGH** (before i18n migration)
**Complexity:** Medium (2-3 days)
**Dependencies:** Should complete before I18N_URL_MIGRATION
**Related:** `.claude/specs/content-google-index.md`, `.claude/tasks/I18N_URL_MIGRATION.md`

---

## Problem Statement

Google Search Console shows **67 404 errors** from crawled URLs. These broken links hurt SEO and user experience.

**Impact:**
- Poor user experience (broken links)
- Negative SEO signal to Google
- Lost traffic from indexed broken URLs
- Wasted crawl budget

**Source:** `.claude/specs/content-google-index.md`

---

## 404 Errors Breakdown

### Category 1: static.zentala.io → CDN Migration (Priority 1)

**Count:** ~30 errors

**Pattern:** Old static file hosting on `static.zentala.io/*`

**Examples:**
- `https://static.zentala.io/wifi/`
- `https://static.zentala.io/framed/`
- `https://static.zentala.io/Nginxy/images/icons/`
- `https://static.zentala.io/wifi/linksys/`
- `https://static.zentala.io/gpnf/`

**Root Cause:**
- Old content was on `static.zentala.io`
- Some content moved to `cdn.zentala.io`
- No redirects setup

**Questions to Answer:**
1. Which static.zentala.io content should redirect to cdn.zentala.io?
2. Which content is obsolete and can return 410 Gone?
3. Should we setup blanket redirect: `static.zentala.io/* → cdn.zentala.io/*`?

**Proposed Solution:**
```nginx
# Option A: Blanket redirect (if CDN has same structure)
Redirect 301 /(.*)$ https://cdn.zentala.io/$1

# Option B: Specific redirects (if selective migration)
Redirect 301 /wifi/* https://cdn.zentala.io/wifi/$1
Redirect 410 /framed/* (obsolete, return 410 Gone)
```

**Decision Needed:** Paweł to confirm which approach

---

### Category 2: ideas.zentala.io Subdomain (Priority 2)

**Count:** ~25 errors

**Pattern:** Old subdomain for ideas/brainstorming

**Examples:**
- `https://ideas.zentala.io/`
- `https://ideas.zentala.io/tags/marketing-and-advertising`
- `https://ideas.zentala.io/posts/banery-do-wynajecia`
- `https://ideas.zentala.io/posts/smart-height-adjustabe-desk`
- `https://ideas.zentala.io/posts/nanoplatnosci`

**Root Cause:**
- Old subdomain that no longer exists
- Google still has it indexed
- No redirect to main site

**Questions to Answer:**
1. Should ideas.zentala.io redirect to main site?
2. If yes, to which page? Homepage or specific section?
3. Or should we return 410 Gone (content permanently removed)?

**Proposed Solution:**
```nginx
# Option A: Redirect to homepage
Redirect 301 / https://ihome.zentala.io/

# Option B: Redirect to blog (if ideas were blog-like)
Redirect 301 / https://ihome.zentala.io/blog/

# Option C: Return 410 Gone (content no longer available)
Return 410
```

**Decision Needed:** Paweł to confirm which approach

---

### Category 3: Internal Broken Links (Priority 1)

**Count:** ~5 errors

**Examples:**
- `https://ihome.zentala.io/docs/rozdzielnica/mcb-zabezpiecznie-nadpradowe/zabezpiecznie-nadpradowe` (missing `/` at end)
- `https://ihome.zentala.io/docs/electrical-elements/przekazniki/` (404)
- `https://ihome.zentala.io/docs/guides/i18n/` (404)
- `https://ihome.zentala.io/docs/drivers/bone.io/` (404)
- `https://ihome.zentala.io/docs/sensors/kontaktron/` (404)

**Root Cause:**
- Pages deleted or moved
- Internal links not updated
- URL typos (missing trailing slash)

**Solution:**
1. Check if content still exists at different URL → 301 redirect
2. If content deleted → 410 Gone
3. Find and fix internal links pointing to these URLs

**Tools:**
```bash
# Find internal links to broken URLs
grep -r "przekazniki" content/
grep -r "bone.io" content/
grep -r "kontaktron" content/
```

---

### Category 4: Other Subdomains (Priority 3)

**Count:** ~5 errors

**Examples:**
- `http://zentala.io/` (HTTP, should redirect to HTTPS ihome.zentala.io)
- `https://zentala.io/` (root domain, should redirect to subdomain?)
- `https://eu.zentala.io/` (old subdomain)
- `https://gpnf.zentala.io/games/create/` (old project)
- `http://desk.zentala.io/enclosure/...` (old project)

**Questions to Answer:**
1. Should zentala.io redirect to ihome.zentala.io?
2. Should all old subdomains (eu, gpnf, desk) redirect or return 410?

**Proposed Solution:**
```nginx
# Root domain → ihome subdomain
Redirect 301 / https://ihome.zentala.io/

# Old projects → 410 Gone
Return 410
```

---

### Category 5: Test Files Indexed (Priority 2)

**Count:** 1 error

**Example:**
- `https://cdn.zentala.io/test-workflow.txt` (indexed by Google!)

**Root Cause:**
- Test file committed to production CDN
- No robots.txt or noindex

**Solution:**
1. Delete test file from CDN
2. Return 404 or 410
3. Add robots.txt to CDN: `User-agent: * Disallow: /test-*`

---

### Category 6: Duplicate URLs (Priority 4)

**Count:** 4 duplicates

**Examples:**
- `https://id.zentala.io/?ref=https://codemonkey.link`
- `https://id.zentala.io/?ref=https://coder.social`
- `http://desk.zentala.io/` vs `https://desk.zentala.io/`

**Root Cause:**
- Query parameters creating duplicate URLs
- HTTP vs HTTPS variants

**Solution:**
- Setup canonical URLs
- Force HTTPS redirect
- Ignore query parameters in sitemap

---

## Implementation Plan

### Phase 1: Audit & Decision (Day 1, Morning)

**Tasks:**
1. **Inventory current CDN content:**
   ```bash
   # List all files on cdn.zentala.io
   curl -s https://cdn.zentala.io/ | grep href
   ```

2. **Check if static.zentala.io content exists on CDN:**
   - Compare file structure
   - Identify missing files
   - Identify obsolete files

3. **Paweł decisions needed:**
   - [ ] static.zentala.io → Redirect to CDN or return 410?
   - [ ] ideas.zentala.io → Redirect to main site or return 410?
   - [ ] zentala.io root → Redirect to ihome.zentala.io?
   - [ ] Old projects (eu, gpnf, desk) → Redirect or 410?

**Deliverable:** Decision matrix (redirect vs 410 vs ignore)

---

### Phase 2: Fix Internal Broken Links (Day 1, Afternoon)

**Tasks:**
1. **Find content for broken URLs:**
   ```bash
   # Check if pages exist elsewhere
   find content -name "*przekazniki*"
   find content -name "*kontaktron*"
   find content -name "*bone.io*"
   ```

2. **For each broken URL:**
   - If content exists → Create 301 redirect
   - If content deleted → Return 410 Gone
   - If typo → Fix in source content

3. **Search and replace internal links:**
   ```bash
   # Find all markdown files linking to broken URLs
   grep -r "docs/electrical-elements/przekazniki" content/
   # Replace with correct URL or remove link
   ```

**Deliverable:** All internal broken links fixed

---

### Phase 3: Setup Redirects (Day 2)

**Option A: Netlify/Vercel `_redirects` file**

Create `static/_redirects`:
```
# Internal redirects (if content moved)
/docs/electrical-elements/przekazniki/*  /docs/NEW_URL/:splat  301
/docs/guides/i18n/*  /docs/NEW_URL/:splat  301

# External domain redirects
https://static.zentala.io/*  https://cdn.zentala.io/:splat  301
https://ideas.zentala.io/*  https://ihome.zentala.io/  301
http://zentala.io/*  https://ihome.zentala.io/:splat  301
https://zentala.io/*  https://ihome.zentala.io/:splat  301

# Return 410 Gone for obsolete content
/showcase  /  410
/demo  /  410
```

**Option B: Hugo aliases in frontmatter**

For moved content:
```yaml
---
title: "Przekaźniki"
aliases:
  - /docs/electrical-elements/przekazniki/
---
```

**Option C: Cloudflare Workers (if using Cloudflare)**

```javascript
addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  const url = new URL(request.url)

  // static.zentala.io → cdn.zentala.io
  if (url.hostname === 'static.zentala.io') {
    return Response.redirect(`https://cdn.zentala.io${url.pathname}`, 301)
  }

  // ideas.zentala.io → ihome.zentala.io
  if (url.hostname === 'ideas.zentala.io') {
    return Response.redirect('https://ihome.zentala.io/', 301)
  }

  // ... other redirects
}
```

**Deliverable:** Redirect configuration deployed

---

### Phase 4: Cleanup & Verification (Day 3)

**Tasks:**
1. **Delete test files from CDN:**
   ```bash
   # Remove test-workflow.txt
   rm /path/to/cdn/test-workflow.txt
   ```

2. **Add robots.txt to CDN:**
   ```
   User-agent: *
   Disallow: /test-*
   Disallow: /*.txt$
   ```

3. **Test all redirects:**
   ```bash
   # Test static.zentala.io redirects
   curl -I https://static.zentala.io/wifi/
   # Should return: HTTP/1.1 301 Moved Permanently
   # Location: https://cdn.zentala.io/wifi/

   # Test ideas.zentala.io redirect
   curl -I https://ideas.zentala.io/
   # Should return: HTTP/1.1 301 or 410

   # Test internal redirects
   curl -I https://ihome.zentala.io/docs/electrical-elements/przekazniki/
   # Should return: HTTP/1.1 301 or 410
   ```

4. **Verify broken links fixed:**
   ```bash
   # Use link checker
   pnpm add -D broken-link-checker
   npx blc https://ihome.zentala.io -ro
   ```

5. **Submit to Google Search Console:**
   - Request re-crawl of fixed URLs
   - Monitor 404 errors decrease

**Deliverable:** All redirects verified, 404 count decreasing

---

## Decision Matrix Template

| URL | Current Status | Content Exists? | Action | Redirect To | Priority |
|-----|----------------|-----------------|--------|-------------|----------|
| static.zentala.io/wifi/ | 404 | Yes (on CDN?) | 301 | cdn.zentala.io/wifi/ | P1 |
| ideas.zentala.io/ | 404 | No | 410 | N/A | P2 |
| /docs/electrical-elements/przekazniki/ | 404 | Yes (/docs/NEW) | 301 | /docs/NEW | P1 |
| cdn.zentala.io/test-workflow.txt | 200 (indexed!) | Yes (delete) | 410 | N/A | P2 |
| zentala.io/ | 404 | No | 301 | ihome.zentala.io/ | P3 |

**Fill out before implementation!**

---

## Redirect Strategy Considerations

### Should We Redirect Unindexed Pages?

**Question from Paweł:** Should we redirect pages Google never indexed?

**Analysis:**
- **Pros of redirecting:**
  - Better user experience if someone has old bookmarks
  - Preserves link equity from external sites (even if not indexed)
  - Future-proof (in case Google indexes later)

- **Cons of redirecting:**
  - More maintenance overhead
  - Clutters redirect file
  - Wastes server resources on unused URLs

**Recommendation:**
- **YES redirect:** If content moved but still valuable
- **NO (410 Gone):** If content permanently removed
- **Ignore:** If obscure test URL never shared externally

---

## Monitoring & Success Criteria

### Pre-Implementation Metrics

**Current state:**
- Google 404 errors: 67
- Google indexed pages: 31
- Broken internal links: TBD (need to find)

### Post-Implementation Goals

**Week 1 after deployment:**
- [ ] All internal broken links fixed (0 remaining)
- [ ] All critical redirects tested and working
- [ ] Google Search Console re-crawl requested

**Month 1 after deployment:**
- [ ] Google 404 errors < 10 (down from 67)
- [ ] No increase in bounce rate from redirects
- [ ] Google indexed pages stable or increasing

**Month 3 after deployment:**
- [ ] Google 404 errors < 5
- [ ] All old URLs removed from Google index
- [ ] Redirect access logs show decreasing traffic (users learning new URLs)

---

## Tools & Resources

### Link Checking
- **Broken Link Checker:** `npx broken-link-checker https://ihome.zentala.io`
- **Screaming Frog SEO Spider:** Free for <500 URLs
- **Google Search Console:** URL Inspection Tool

### Redirect Testing
```bash
# Test redirect chain
curl -L -I https://static.zentala.io/wifi/

# Test redirect status code
curl -s -o /dev/null -w "%{http_code}" https://ideas.zentala.io/

# Test multiple URLs from file
while read url; do
  echo "$url: $(curl -s -o /dev/null -w "%{http_code}" $url)"
done < urls.txt
```

### Google Search Console
1. Submit sitemap: https://ihome.zentala.io/sitemap.xml
2. Request indexing for fixed URLs
3. Monitor "Coverage" report (404 errors should decrease)

---

## Risks & Mitigation

### Risk 1: Breaking Working Links
**Mitigation:** Test redirects on staging first, verify with link checker

### Risk 2: SEO Impact from 301 Redirects
**Mitigation:** 301 redirects pass ~90-99% of link equity, better than 404

### Risk 3: Redirect Chains (301 → 301 → 200)
**Mitigation:** Ensure redirects point to final URL, not intermediate

### Risk 4: Missing Redirects After i18n Migration
**Mitigation:** Document all redirects, will need updating when URLs change to `/pl/`

---

## Post-Migration Redirect Update

**IMPORTANT:** After I18N_URL_MIGRATION completes, update redirects:

**Current (pre-migration):**
```
/docs/concepts/iot/  →  /docs/systems/inteligentny-dom/  301
```

**After migration:**
```
/docs/concepts/iot/  →  /pl/docs/systems/inteligentny-dom/  301
/docs/systems/inteligentny-dom/  →  /pl/docs/systems/inteligentny-dom/  301
```

**See:** `.claude/tasks/I18N_URL_MIGRATION.md` for full redirect plan

---

## Related Documentation

- **Google index data:** `.claude/specs/content-google-index.md`
- **i18n migration task:** `.claude/tasks/I18N_URL_MIGRATION.md`
- **Project status:** `STATUS.md`

---

## Next Steps

1. **Paweł to answer decision questions:**
   - [ ] static.zentala.io strategy?
   - [ ] ideas.zentala.io strategy?
   - [ ] zentala.io root domain strategy?
   - [ ] Old projects strategy?

2. **Start Phase 1:** Audit CDN content

3. **Create decision matrix:** Fill out table above

4. **Implement Phase 2-4:** Fix internal links, setup redirects, verify

---

**Status:** 📋 **READY TO START** (waiting for Paweł's decisions)

**Estimated Timeline:** 2-3 days (after decisions made)

**Blocks:** I18N_URL_MIGRATION (should fix 404s first to avoid double redirect updates)
