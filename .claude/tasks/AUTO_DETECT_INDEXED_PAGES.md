# Task: Auto-Detect Google Indexed Pages (Backlog)

**Status:** 💡 **IDEA** (Backlog - Future Enhancement)
**Created:** 2025-10-19
**Priority:** 🔵 **LOW** (Nice to have)
**Complexity:** Medium (4-6 hours)
**Related:** `.claude/tasks/FIX_404_ERRORS.md`, `.claude/tasks/QUICK_PRODUCTION_PATCH.md`

---

## Problem Statement

**Currently:** Manual process to find which pages Google has indexed
- Use `site:ihome.zentala.io` in Google Search
- Manually copy URLs from results
- Update lists manually
- No automation, error-prone

**Impact:**
- Losing traffic from 404s (we don't know what's indexed)
- Can't prioritize fixes (no data on what matters to Google)
- Manual updates are tedious and outdated quickly

---

## Goal

**Automate detection of Google-indexed pages** to:
1. Know which URLs Google sees
2. Automatically create redirects for indexed pages
3. Prioritize content fixes (indexed pages first)
4. Track indexing changes over time

---

## Proposed Solutions

### Option 1: MCP Server for Google Search API ⭐ RECOMMENDED

**How it works:**
- Create or use existing MCP server
- Call Google Custom Search API
- Query: `site:ihome.zentala.io`
- Parse results → list of indexed URLs
- Store in `.claude/indexed-pages.json`
- Run weekly via cron/GitHub Actions

**Pros:**
- ✅ Official Google API
- ✅ Can integrate with Claude Code via MCP
- ✅ Reliable, structured data
- ✅ Can paginate (get all results)

**Cons:**
- ❌ Requires Google API key (100 free queries/day)
- ❌ Custom Search API setup needed

**Implementation:**

**1. Create MCP Server:**

`mcp-servers/google-search/index.js`:
```javascript
import { MCPServer } from '@anthropic/mcp-sdk';
import fetch from 'node-fetch';

const server = new MCPServer({
  name: 'google-search',
  version: '1.0.0',
});

server.addTool({
  name: 'search_indexed_pages',
  description: 'Find all pages indexed by Google for a domain',
  parameters: {
    domain: {
      type: 'string',
      description: 'Domain to search (e.g., ihome.zentala.io)',
    },
  },
  async handler({ domain }) {
    const apiKey = process.env.GOOGLE_API_KEY;
    const cx = process.env.GOOGLE_SEARCH_ENGINE_ID;

    const results = [];
    let startIndex = 1;

    // Google allows max 100 results (10 per page, 10 pages)
    while (startIndex <= 100) {
      const url = `https://www.googleapis.com/customsearch/v1?key=${apiKey}&cx=${cx}&q=site:${domain}&start=${startIndex}`;
      const response = await fetch(url);
      const data = await response.json();

      if (!data.items) break;

      results.push(...data.items.map(item => ({
        url: item.link,
        title: item.title,
        snippet: item.snippet,
      })));

      startIndex += 10;
    }

    return { indexed_pages: results, total: results.length };
  },
});

server.start();
```

**2. Configure MCP in Claude Code:**

`.claude/mcp.json`:
```json
{
  "mcpServers": {
    "google-search": {
      "command": "node",
      "args": ["mcp-servers/google-search/index.js"],
      "env": {
        "GOOGLE_API_KEY": "${GOOGLE_API_KEY}",
        "GOOGLE_SEARCH_ENGINE_ID": "${GOOGLE_SEARCH_ENGINE_ID}"
      }
    }
  }
}
```

**3. Usage in Claude Code:**

```
User: "Find all indexed pages for ihome.zentala.io"
Claude: [calls mcp__google_search__search_indexed_pages]
Result: { indexed_pages: [...], total: 14 }
```

**4. Store Results:**

`.claude/indexed-pages.json`:
```json
{
  "last_updated": "2025-10-19T10:30:00Z",
  "domain": "ihome.zentala.io",
  "total_indexed": 14,
  "pages": [
    {
      "url": "https://ihome.zentala.io/",
      "title": "Inteligentny Dom - Praktyczny przewodnik",
      "snippet": "Blog o inteligentnym domu...",
      "first_seen": "2025-10-19",
      "status": "active"
    },
    ...
  ]
}
```

---

### Option 2: Web Scraping Google Search

**How it works:**
- Use Playwright/Puppeteer
- Navigate to `google.com/search?q=site:ihome.zentala.io`
- Scrape result URLs
- Parse and store

**Pros:**
- ✅ No API key needed
- ✅ Free

**Cons:**
- ❌ Against Google ToS (risky)
- ❌ Unreliable (Google changes HTML)
- ❌ Rate limiting / CAPTCHA
- ❌ Not recommended

**Implementation (if you really want):**

```javascript
import { chromium } from 'playwright';

async function getIndexedPages(domain) {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  const results = [];
  let pageNum = 0;

  while (pageNum < 10) { // Max 10 pages
    await page.goto(`https://www.google.com/search?q=site:${domain}&start=${pageNum * 10}`);

    const links = await page.$$eval('a[href^="https://ihome.zentala.io"]', els =>
      els.map(el => el.href)
    );

    if (links.length === 0) break;
    results.push(...links);
    pageNum++;
  }

  await browser.close();
  return [...new Set(results)]; // Deduplicate
}
```

---

### Option 3: Google Search Console API ⭐⭐ BEST (if available)

**How it works:**
- Connect ihome.zentala.io to Google Search Console
- Use Search Console API
- Query indexed pages, clicks, impressions
- Much more data than Custom Search API

**Pros:**
- ✅ Official API for site owners
- ✅ Complete data (all indexed pages)
- ✅ Additional metrics (clicks, impressions, position)
- ✅ Free (no quota limits)

**Cons:**
- ❌ Requires Search Console setup (domain verification)
- ❌ More complex API

**Setup:**

**1. Verify domain in Google Search Console:**
- Go to https://search.google.com/search-console
- Add property: `ihome.zentala.io`
- Verify ownership (DNS TXT record or HTML file)

**2. Enable Search Console API:**
- Go to Google Cloud Console
- Enable "Search Console API"
- Create credentials (OAuth 2.0 or Service Account)

**3. Query indexed pages:**

```javascript
import { google } from 'googleapis';

const searchconsole = google.searchconsole('v1');

async function getIndexedPages(siteUrl) {
  const auth = new google.auth.GoogleAuth({
    keyFile: 'service-account-key.json',
    scopes: ['https://www.googleapis.com/auth/webmasters.readonly'],
  });

  const authClient = await auth.getClient();
  google.options({ auth: authClient });

  // Get all URLs
  const res = await searchconsole.urlInspection.index.inspect({
    requestBody: {
      inspectionUrl: siteUrl,
      siteUrl: siteUrl,
    },
  });

  return res.data;
}
```

**4. Get detailed stats:**

```javascript
async function getPageStats(siteUrl, startDate, endDate) {
  const res = await searchconsole.searchanalytics.query({
    siteUrl: siteUrl,
    requestBody: {
      startDate: startDate,
      endDate: endDate,
      dimensions: ['page'],
      rowLimit: 25000,
    },
  });

  return res.data.rows; // { keys: [url], clicks, impressions, ctr, position }
}
```

---

### Option 4: Sitemap Cross-Check

**How it works:**
- Generate sitemap.xml
- Use Google Search Console "Coverage" report
- See which URLs from sitemap are indexed/not indexed

**Pros:**
- ✅ Visual in Search Console UI
- ✅ Shows indexing issues

**Cons:**
- ❌ Manual check (not automated)
- ❌ Requires Search Console setup

---

## Recommended Approach

**Phase 1: Setup Google Search Console** ⭐
1. Verify ihome.zentala.io domain
2. Submit sitemap.xml
3. Wait 1-2 weeks for data

**Phase 2: Create MCP Server for Search Console API** ⭐⭐
1. Enable API in Google Cloud
2. Create MCP server
3. Query indexed pages + stats
4. Store in `.claude/indexed-pages.json`

**Phase 3: Automate via GitHub Actions**
1. Run weekly cron job
2. Update `.claude/indexed-pages.json`
3. Create PR if changes detected
4. Alert if new 404s appear

---

## Automation Workflow

### Weekly Check (GitHub Actions)

`.github/workflows/check-indexed-pages.yml`:
```yaml
name: Check Indexed Pages

on:
  schedule:
    - cron: '0 0 * * 0' # Every Sunday at midnight
  workflow_dispatch: # Manual trigger

jobs:
  check-indexed:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'

      - name: Install dependencies
        run: npm install googleapis

      - name: Fetch indexed pages
        env:
          GOOGLE_API_KEY: ${{ secrets.GOOGLE_API_KEY }}
          GOOGLE_SEARCH_ENGINE_ID: ${{ secrets.GOOGLE_SEARCH_ENGINE_ID }}
        run: |
          node scripts/fetch-indexed-pages.js > .claude/indexed-pages.json

      - name: Check for changes
        id: check
        run: |
          git diff --exit-code .claude/indexed-pages.json || echo "changed=true" >> $GITHUB_OUTPUT

      - name: Create PR if changed
        if: steps.check.outputs.changed == 'true'
        uses: peter-evans/create-pull-request@v5
        with:
          title: "chore: update indexed pages list"
          body: "Automated update of Google-indexed pages"
          branch: "automated/indexed-pages-update"
```

---

## Auto-Generate Redirects

**Based on indexed pages:**

`scripts/generate-redirects.js`:
```javascript
import fs from 'fs';

const indexedPages = JSON.parse(fs.readFileSync('.claude/indexed-pages.json'));
const redirects = [];

indexedPages.pages.forEach(page => {
  const currentUrl = new URL(page.url).pathname;
  const newUrl = `/pl${currentUrl}`;

  redirects.push(`${currentUrl}  ${newUrl}  301`);
});

fs.writeFileSync('static/_redirects', redirects.join('\n'));
console.log(`Generated ${redirects.length} redirects`);
```

**Usage:**
```bash
node scripts/generate-redirects.js
# Creates static/_redirects with 301 redirects for all indexed pages
```

---

## Success Metrics

**After Implementation:**
- ✅ Automated list of indexed pages (updated weekly)
- ✅ No manual Google searches needed
- ✅ Redirects auto-generated for indexed pages
- ✅ Alert if new 404s appear
- ✅ Track indexing growth over time

**Metrics to Track:**
```json
{
  "2025-10-19": { "total": 14, "new": 0, "removed": 0 },
  "2025-10-26": { "total": 18, "new": 4, "removed": 0 },
  "2025-11-02": { "total": 25, "new": 7, "removed": 0 }
}
```

---

## Estimated Effort

| Phase | Tasks | Time |
|-------|-------|------|
| Setup Search Console | Verify domain, submit sitemap | 30 min |
| Create MCP server | Write API integration | 2-3 hours |
| GitHub Actions workflow | Automate weekly checks | 1 hour |
| Redirect generation script | Auto-create _redirects | 1 hour |
| **Total** | | **4-6 hours** |

---

## Alternatives (Simpler)

**If MCP/API is too complex:**

**Manual but Structured:**
1. Monthly: Search `site:ihome.zentala.io` in Google
2. Copy all URLs to `.claude/indexed-pages.txt`
3. Run script to compare with previous month
4. Generate redirects for new indexed pages

**Script:**
```bash
#!/bin/bash
# Save current indexed pages
curl "https://www.google.com/search?q=site:ihome.zentala.io&num=100" \
  | grep -oP 'https://ihome\.zentala\.io/[^"]+' \
  | sort -u > .claude/indexed-pages-new.txt

# Compare with previous
diff .claude/indexed-pages.txt .claude/indexed-pages-new.txt

# Update
mv .claude/indexed-pages-new.txt .claude/indexed-pages.txt
```

---

## Related Tasks

- `.claude/tasks/QUICK_PRODUCTION_PATCH.md` - Uses indexed pages list
- `.claude/tasks/FIX_404_ERRORS.md` - Needs indexed pages data
- `.claude/tasks/I18N_URL_MIGRATION.md` - Will need redirects for indexed pages

---

**Status:** 💡 **BACKLOG** (Good idea, implement after migration)

**Priority After Migration:** Medium-High (automate to prevent future issues)
