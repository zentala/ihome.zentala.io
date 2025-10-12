# 📐 Technical Specification: Hugo Live Content Editor

**Project**: iHome.zentala.io - In-Browser Markdown Editor
**Version**: 1.0.0
**Audience**: Mid-Level Developers
**Author**: Solution & Software Architect
**Date**: 2025-10-12

---

## 1. Executive Summary

A development-mode inline WYSIWYG editor enabling real-time content editing directly in the browser. The system uses a microbackend architecture to persist changes to the filesystem without Git automation, allowing manual review workflow.

### ✅ Key Decisions (Post Double-Check)

| Decision | Rationale |
|----------|-----------|
| **Wrapper div** | Added `<div class="article-content">` wrapper in layouts (only in dev mode) |
| **Toggle placement** | Navbar integration (next to Draft toggle) - visible only when `hugo.IsServer` |
| **Hugo version** | Confirmed v0.150.1 - `.File.Path` works perfectly |
| **Markdown strategy** | Custom HTML→MD converter (no external deps, `tiptap-markdown` is deprecated) |
| **Save mechanism** | Manual save only (Ctrl+S) + beforeunload warning - NO auto-save to prevent Hugo rebuild conflicts |
| **Backup strategy** | Auto-backup to localStorage every 1s for recovery |
| **Tiptap version** | 3.x (latest) with native markdown support planned for free |

### 🎯 Design Philosophy

1. **No auto-save** - prevents constant Hugo rebuilds during editing
2. **Ctrl+S only** - explicit save action gives developer control
3. **Auto-backup** - localStorage backup every 1s prevents data loss
4. **Unload warning** - browser warns before closing with unsaved changes
5. **Dev-only** - all editor UI hidden in production builds
6. **Lightweight** - custom HTML→MD converter, no heavy dependencies

---

## 2. System Architecture

### 2.1 High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        Browser (Client)                      │
│  ┌────────────────────────────────────────────────────────┐ │
│  │  Hugo Site (http://localhost:1313)                     │ │
│  │  ┌──────────────┐  ┌─────────────────────────────┐    │ │
│  │  │ Edit Toggle  │  │  Article Content Area       │    │ │
│  │  │   Button     │  │  (contentEditable regions)  │    │ │
│  │  └──────────────┘  └─────────────────────────────┘    │ │
│  │           │                    │                        │ │
│  │           └────────┬───────────┘                        │ │
│  │                    │                                    │ │
│  │         ┌──────────▼──────────────┐                    │ │
│  │         │  Editor Controller JS   │                    │ │
│  │         │  - Event handlers       │                    │ │
│  │         │  - Auto-save (debounce) │                    │ │
│  │         │  - State management     │                    │ │
│  │         └──────────┬──────────────┘                    │ │
│  └────────────────────┼───────────────────────────────────┘ │
│                       │ HTTP (Fetch API)                    │
└───────────────────────┼─────────────────────────────────────┘
                        │
                        │ POST /api/content/save
                        │ GET  /api/content/meta
                        │
┌───────────────────────▼─────────────────────────────────────┐
│               Microbackend (Node.js + Express)              │
│  ┌────────────────────────────────────────────────────────┐ │
│  │  API Routes                                            │ │
│  │  - POST /api/content/save                              │ │
│  │  - GET  /api/content/meta                              │ │
│  │  - GET  /api/health                                    │ │
│  └─────────────────────────┬──────────────────────────────┘ │
│                            │                                │
│  ┌─────────────────────────▼──────────────────────────────┐ │
│  │  Services Layer                                        │ │
│  │  - ContentService (read/write .md files)               │ │
│  │  - ValidationService (sanitize, validate)              │ │
│  │  - ParserService (frontmatter extraction)              │ │
│  └─────────────────────────┬──────────────────────────────┘ │
│                            │                                │
└────────────────────────────┼────────────────────────────────┘
                             │
                             │ File I/O
                             │
┌────────────────────────────▼────────────────────────────────┐
│                      File System                            │
│  content/                                                   │
│  ├── blog/                                                  │
│  │   ├── article-name/                                     │
│  │   │   └── index.md  ◄─── Direct write                   │
│  │   └── another.md    ◄─── Direct write                   │
│  └── tutorials/                                             │
│      └── tutorial-name/                                     │
│          └── index.md   ◄─── Direct write                   │
└─────────────────────────────────────────────────────────────┘
                             │
                             │ File Watch
                             │
┌────────────────────────────▼────────────────────────────────┐
│              Hugo Server (--buildDrafts)                    │
│              Auto-rebuilds on file changes                  │
└─────────────────────────────────────────────────────────────┘
```

### 2.2 Technology Stack

| Layer | Technology | Rationale |
|-------|-----------|-----------|
| **Frontend** | Vanilla JavaScript | Already in use, no additional dependencies |
| **WYSIWYG Editor** | [Tiptap 3.x](https://next.tiptap.dev/) with StarterKit | Industry-standard, future markdown support planned |
| **HTML→MD Converter** | Custom lightweight converter | Simple, no external deps, handles Hugo's HTML output |
| **Backend** | Node.js + Express | Lightweight, fast startup, same ecosystem as Hugo tooling |
| **Markdown Parser** | [gray-matter](https://github.com/jonschlinkert/gray-matter) | Reliable frontmatter parsing, widely adopted |
| **File I/O** | Node.js `fs/promises` | Native, async, sufficient for dev use |
| **Validation** | [sanitize-html](https://github.com/apostrophecms/sanitize-html) (server) | XSS prevention, HTML sanitization |

**Note on Markdown**: Original `tiptap-markdown` is deprecated. Tiptap 3.x has native markdown support planned (free). We use a lightweight custom converter for now, easy to swap later.

---

## 3. Component Specification

### 3.1 Frontend Components

#### 3.1.1 Edit Mode Toggle (`EditToggle.js`)

**Purpose**: Global edit mode state controller
**Location**: `assets/js/edit-toggle.js`

**Responsibilities**:
- Render toggle button in header
- Manage global edit state (on/off)
- Persist state to `sessionStorage`
- Emit custom events: `editModeEnabled`, `editModeDisabled`

**Interface**:
```javascript
class EditToggle {
  constructor(options = {})
  init(): void
  enable(): void
  disable(): void
  isEnabled(): boolean
  destroy(): void
}
```

**HTML Structure**:
```html
<button id="edit-mode-toggle" class="btn-edit-toggle" aria-label="Toggle Edit Mode">
  <span class="icon-edit"></span>
  <span class="label">Edit Mode: <strong class="status">OFF</strong></span>
</button>
```

---

#### 3.1.2 Content Editor (`ContentEditor.js`)

**Purpose**: WYSIWYG markdown editor controller
**Location**: `assets/js/content-editor.js`

**Responsibilities**:
- Initialize Tiptap editor on article content
- Handle click-to-edit activation
- Save only on Ctrl+S (NO auto-save to prevent Hugo rebuild conflicts)
- Convert HTML → Markdown on save
- Handle keyboard shortcuts (Ctrl+S, Esc)
- Show save status indicators
- Warn before page unload if unsaved changes
- Backup to localStorage on every change

**Interface**:
```javascript
class ContentEditor {
  constructor(element, options = {})

  // Lifecycle
  init(): Promise<void>
  destroy(): void

  // State
  enable(): void
  disable(): void
  isEnabled(): boolean
  isDirty(): boolean

  // Content
  getContent(): string          // Returns markdown
  setContent(markdown): void
  getMetadata(): object         // Returns { path, title, section }

  // Persistence
  save(): Promise<SaveResult>
  autoSave(): void              // Debounced

  // Events
  on(event, handler): void
  off(event, handler): void
}
```

**Events**:
- `content:changed` - Fired on every edit
- `content:saved` - Fired after successful save
- `content:error` - Fired on save failure
- `editor:activated` - Fired when edit starts
- `editor:deactivated` - Fired when edit ends

---

#### 3.1.3 API Client (`EditorAPI.js`)

**Purpose**: Backend communication layer
**Location**: `assets/js/editor-api.js`

**Interface**:
```javascript
class EditorAPI {
  constructor(baseURL = 'http://localhost:3030')

  async saveContent(payload: SavePayload): Promise<SaveResponse>
  async getMetadata(filePath: string): Promise<Metadata>
  async healthCheck(): Promise<boolean>
}

// Types
interface SavePayload {
  filePath: string      // Relative to content/, e.g., "blog/my-post/index.md"
  content: string       // Markdown content (body only)
  section: string       // "blog" | "tutorials"
}

interface SaveResponse {
  success: boolean
  message: string
  savedAt: string       // ISO timestamp
  filePath: string
}

interface Metadata {
  title: string
  date: string
  draft: boolean
  // ... other frontmatter fields
}
```

---

### 3.2 Backend Components

#### 3.2.1 Express Server (`server.js`)

**Purpose**: Main backend entry point
**Location**: `dev-tools/editor-backend/server.js`

**Configuration**:
```javascript
{
  port: 3030,
  cors: {
    origin: 'http://localhost:1313',
    methods: ['GET', 'POST'],
    credentials: true
  },
  contentRoot: path.resolve(__dirname, '../../content'),
  allowedSections: ['blog', 'tutorials'],
  autoSave: {
    debounce: 2000,  // ms
    maxRetries: 3
  }
}
```

**Endpoints**:
```
POST   /api/content/save
GET    /api/content/meta?path=blog/my-post/index.md
GET    /api/health
```

---

#### 3.2.2 Content Service (`ContentService.js`)

**Purpose**: File system operations for markdown files
**Location**: `dev-tools/editor-backend/services/ContentService.js`

**Interface**:
```javascript
class ContentService {
  constructor(contentRoot, allowedSections)

  // Read
  async readFile(relativePath): Promise<FileContent>
  async getMetadata(relativePath): Promise<object>

  // Write
  async saveContent(relativePath, newContent): Promise<WriteResult>

  // Validation
  validatePath(relativePath): ValidationResult
  isAllowedSection(section): boolean

  // Utilities
  getAbsolutePath(relativePath): string
  extractFrontmatter(markdown): { frontmatter, body }
  reassembleMarkdown(frontmatter, body): string
}

interface FileContent {
  frontmatter: object
  body: string
  fullPath: string
}

interface WriteResult {
  success: boolean
  filePath: string
  bytesWritten: number
  timestamp: string
}

interface ValidationResult {
  valid: boolean
  error?: string
  sanitizedPath?: string
}
```

**Security Rules**:
1. **Path Traversal Prevention**: Block `..`, absolute paths, symlinks
2. **Section Whitelist**: Only `blog/` and `tutorials/` allowed
3. **Extension Check**: Only `.md` files
4. **Existence Verification**: File must exist (no creation)

---

#### 3.2.3 Validation Service (`ValidationService.js`)

**Purpose**: Input sanitization and validation
**Location**: `dev-tools/editor-backend/services/ValidationService.js`

**Interface**:
```javascript
class ValidationService {
  // Content validation
  static sanitizeMarkdown(markdown): string
  static sanitizeHTML(html): string
  static validateMarkdown(markdown): ValidationResult

  // Path validation
  static sanitizePath(path): string
  static isPathSafe(path): boolean

  // Size limits
  static checkContentSize(content, maxBytes = 5MB): boolean
}
```

**Validation Rules**:
- Max content size: 5MB
- No script tags in markdown
- No dangerous HTML attributes (`onerror`, `onload`, etc.)
- UTF-8 encoding only
- Preserve frontmatter integrity

---

## 4. Data Flow

### 4.1 Edit Flow

```
User clicks text → EditToggle.isEnabled() → YES
                      ↓
            ContentEditor.enable()
                      ↓
            Tiptap editor activates on element
                      ↓
            User types → content:changed event
                      ↓
            Debounced autoSave() triggered (2s)
                      ↓
            EditorAPI.saveContent({
              filePath: "blog/my-post/index.md",
              content: "# New Content...",
              section: "blog"
            })
                      ↓
            Backend receives POST /api/content/save
                      ↓
            ValidationService.sanitizePath()
            ValidationService.sanitizeMarkdown()
                      ↓
            ContentService.validatePath()
                      ↓
            ContentService.readFile() → extract frontmatter
                      ↓
            ContentService.reassembleMarkdown(frontmatter, newBody)
                      ↓
            fs.writeFile(absolutePath, fullMarkdown)
                      ↓
            Return { success: true, savedAt: "..." }
                      ↓
            Frontend shows "✓ Saved" indicator
                      ↓
            Hugo detects file change → rebuilds → browser auto-refreshes
```

### 4.2 Error Handling Flow

```
Save fails
    ↓
Backend returns { success: false, message: "Error details" }
    ↓
Frontend fires content:error event
    ↓
Show error notification (toast/banner)
    ↓
Optionally: Store content in localStorage as backup
    ↓
Retry mechanism (max 3 attempts with exponential backoff)
```

---

## 5. File Structure

```
ihome.zentala.io/
├── assets/
│   └── js/
│       ├── edit-toggle.js          ← New
│       ├── content-editor.js       ← New
│       └── editor-api.js           ← New
│
├── dev-tools/                      ← New directory
│   └── editor-backend/
│       ├── package.json
│       ├── server.js
│       ├── config.js
│       ├── routes/
│       │   └── content.routes.js
│       ├── services/
│       │   ├── ContentService.js
│       │   └── ValidationService.js
│       ├── middleware/
│       │   ├── errorHandler.js
│       │   └── devModeOnly.js
│       └── utils/
│           └── logger.js
│
├── layouts/
│   └── partials/
│       └── header/
│           └── header.html         ← Modify (add toggle)
│
└── package.json                     ← Update scripts
```

---

## 6. API Specification

### 6.1 POST /api/content/save

**Purpose**: Save edited markdown content

**Request**:
```http
POST /api/content/save HTTP/1.1
Content-Type: application/json

{
  "filePath": "blog/my-post/index.md",
  "content": "# New Title\n\nNew content here...",
  "section": "blog"
}
```

**Response (Success)**:
```json
{
  "success": true,
  "message": "Content saved successfully",
  "savedAt": "2025-10-12T14:30:00.000Z",
  "filePath": "blog/my-post/index.md"
}
```

**Response (Error)**:
```json
{
  "success": false,
  "message": "Path traversal attempt detected",
  "error": "INVALID_PATH"
}
```

**Error Codes**:
- `INVALID_PATH` - Path validation failed
- `SECTION_NOT_ALLOWED` - Section not in whitelist
- `FILE_NOT_FOUND` - File doesn't exist
- `WRITE_ERROR` - Filesystem error
- `CONTENT_TOO_LARGE` - Exceeds 5MB limit
- `INVALID_MARKDOWN` - Malformed content

---

### 6.2 GET /api/content/meta

**Purpose**: Retrieve frontmatter metadata

**Request**:
```http
GET /api/content/meta?path=blog/my-post/index.md HTTP/1.1
```

**Response**:
```json
{
  "success": true,
  "metadata": {
    "title": "My Blog Post",
    "date": "2025-10-01",
    "draft": false,
    "tags": ["hugo", "markdown"],
    "author": "Paweł Zentala"
  },
  "filePath": "blog/my-post/index.md"
}
```

---

### 6.3 GET /api/health

**Purpose**: Backend health check

**Response**:
```json
{
  "status": "ok",
  "uptime": 12345,
  "version": "1.0.0"
}
```

---

## 7. Frontend Implementation Details

### 7.1 Tiptap Configuration

**Extensions**:
```javascript
import { Editor } from '@tiptap/core'
import StarterKit from '@tiptap/starter-kit'
import Markdown from 'tiptap-markdown'
import Link from '@tiptap/extension-link'
import Image from '@tiptap/extension-image'
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'
import { lowlight } from 'lowlight'

const editor = new Editor({
  element: document.querySelector('.article-content'),
  extensions: [
    StarterKit.configure({
      heading: { levels: [1, 2, 3, 4, 5, 6] },
      codeBlock: false  // Using lowlight instead
    }),
    Markdown.configure({
      html: false,
      transformPastedText: true
    }),
    Link.configure({
      openOnClick: false,
      HTMLAttributes: { target: '_blank', rel: 'noopener noreferrer' }
    }),
    Image.configure({
      inline: true,
      allowBase64: false
    }),
    CodeBlockLowlight.configure({
      lowlight,
      defaultLanguage: 'plaintext'
    })
  ],
  content: markdownContent,
  editable: false,  // Enabled only when edit mode is on
  onUpdate: ({ editor }) => {
    contentEditor.autoSave()
  }
})
```

### 7.2 Auto-Save Implementation

```javascript
class ContentEditor {
  constructor(element, options) {
    this.saveTimeout = null
    this.saveDelay = options.saveDelay || 2000
    this.lastSavedContent = null
  }

  autoSave() {
    clearTimeout(this.saveTimeout)

    this.saveTimeout = setTimeout(async () => {
      const currentContent = this.getContent()

      // Skip if no changes
      if (currentContent === this.lastSavedContent) {
        return
      }

      try {
        this.showSaveIndicator('saving')

        const result = await this.api.saveContent({
          filePath: this.getFilePath(),
          content: currentContent,
          section: this.getSection()
        })

        if (result.success) {
          this.lastSavedContent = currentContent
          this.showSaveIndicator('saved')
          this.emit('content:saved', result)
        } else {
          throw new Error(result.message)
        }
      } catch (error) {
        this.showSaveIndicator('error')
        this.emit('content:error', error)
        this.backupToLocalStorage(currentContent)
      }
    }, this.saveDelay)
  }

  showSaveIndicator(state) {
    const indicator = document.querySelector('.save-indicator')
    indicator.dataset.state = state
    indicator.textContent = {
      'saving': '💾 Saving...',
      'saved': '✓ Saved',
      'error': '⚠ Error'
    }[state]
  }

  backupToLocalStorage(content) {
    const key = `backup_${this.getFilePath()}`
    localStorage.setItem(key, JSON.stringify({
      content,
      timestamp: new Date().toISOString()
    }))
  }
}
```

---

## 8. Security Considerations

### 8.1 Threat Model

| Threat | Mitigation |
|--------|-----------|
| **Path Traversal** | Whitelist sections, sanitize paths, block `..` |
| **XSS via Markdown** | Sanitize HTML output, DOMPurify on client |
| **File Overwrite** | Only allow existing files, validate before write |
| **DoS via Large Files** | 5MB content limit, rate limiting (future) |
| **Unauthorized Access** | Dev mode only, localhost binding, no auth needed |

### 8.2 Path Validation Algorithm

```javascript
function validatePath(inputPath) {
  // 1. Normalize
  const normalized = path.normalize(inputPath)

  // 2. Block dangerous patterns
  if (normalized.includes('..') || path.isAbsolute(normalized)) {
    return { valid: false, error: 'Path traversal detected' }
  }

  // 3. Extract section
  const parts = normalized.split(path.sep)
  const section = parts[0]

  // 4. Whitelist check
  if (!['blog', 'tutorials'].includes(section)) {
    return { valid: false, error: 'Section not allowed' }
  }

  // 5. Extension check
  if (!normalized.endsWith('.md')) {
    return { valid: false, error: 'Only .md files allowed' }
  }

  // 6. Existence check
  const fullPath = path.join(contentRoot, normalized)
  if (!fs.existsSync(fullPath)) {
    return { valid: false, error: 'File does not exist' }
  }

  return { valid: true, sanitizedPath: normalized }
}
```

---

## 9. Implementation Plan - Agile Breakdown

### 🎯 Sprint 0: Setup & Preparation (2 Story Points)
**Goal**: Prepare project structure and dependencies
**Duration**: 1-2 hours
**No dependencies - can start immediately**

#### Task 0.1: Backend Project Initialization ⚡ (1 SP)
**Owner**: Backend Dev
**Effort**: 30 min
**Dependencies**: None

**Steps**:
```bash
mkdir -p dev-tools/editor-backend/{routes,services,middleware,utils}
cd dev-tools/editor-backend
npm init -y
npm install express cors gray-matter sanitize-html helmet
npm install -D nodemon jest supertest
```

**Create**: `dev-tools/editor-backend/package.json`
```json
{
  "name": "hugo-editor-backend",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js",
    "test": "jest"
  }
}
```

**Acceptance Criteria**:
- [x] Directory structure created
- [x] Dependencies installed
- [x] `npm start` runs without errors (even if no server.js yet)

**Definition of Done**: Run `npm install` successfully, commit structure to Git

---

#### Task 0.2: Frontend Dependencies Installation ⚡ (1 SP)
**Owner**: Frontend Dev
**Effort**: 30 min
**Dependencies**: None (parallel with 0.1)

**Steps**:
```bash
# In project root
npm install @tiptap/core @tiptap/starter-kit
npm install @tiptap/extension-link @tiptap/extension-image
npm install @tiptap/extension-code-block-lowlight lowlight
# Note: No markdown converter needed - we use custom lightweight HTML→MD
```

**Create placeholder files**:
```bash
touch assets/js/edit-toggle.js
touch assets/js/content-editor.js
touch assets/js/editor-api.js
```

**Acceptance Criteria**:
- [x] All npm packages installed
- [x] Placeholder JS files created
- [x] Hugo still builds successfully

**Definition of Done**: Run `npm install`, verify Hugo build works

---

### 🏗️ Sprint 1: Core Backend (13 Story Points)
**Goal**: Working API that can save content
**Duration**: 1 day
**Parallel work possible**

#### Task 1.1: Validation Service (Standalone) 🔐 (3 SP)
**Owner**: Backend Dev 1
**Effort**: 2 hours
**Dependencies**: Task 0.1 only
**Can work in parallel with other tasks**

**Create**: `dev-tools/editor-backend/services/ValidationService.js`

**Complete Implementation** (copy-paste ready):
```javascript
import sanitizeHtml from 'sanitize-html';
import path from 'path';

export class ValidationService {
  static MAX_CONTENT_SIZE = 5 * 1024 * 1024; // 5MB

  /**
   * Sanitize markdown content
   */
  static sanitizeMarkdown(markdown) {
    if (typeof markdown !== 'string') {
      throw new Error('Content must be a string');
    }

    // Remove dangerous HTML
    const sanitized = sanitizeHtml(markdown, {
      allowedTags: [], // No HTML tags in markdown
      allowedAttributes: {},
      disallowedTagsMode: 'escape'
    });

    return sanitized.trim();
  }

  /**
   * Sanitize file path
   */
  static sanitizePath(inputPath) {
    if (!inputPath || typeof inputPath !== 'string') {
      return null;
    }

    // Remove whitespace, normalize
    let sanitized = inputPath.trim();
    sanitized = path.normalize(sanitized);

    // Convert backslashes to forward slashes (Windows compatibility)
    sanitized = sanitized.replace(/\\/g, '/');

    return sanitized;
  }

  /**
   * Check if path is safe (no traversal)
   */
  static isPathSafe(inputPath) {
    const sanitized = this.sanitizePath(inputPath);

    if (!sanitized) return false;

    // Block dangerous patterns
    if (sanitized.includes('..')) return false;
    if (path.isAbsolute(sanitized)) return false;
    if (sanitized.startsWith('/')) return false;
    if (sanitized.startsWith('\\')) return false;

    return true;
  }

  /**
   * Check content size
   */
  static checkContentSize(content, maxBytes = this.MAX_CONTENT_SIZE) {
    const size = Buffer.byteLength(content, 'utf8');
    return size <= maxBytes;
  }

  /**
   * Validate markdown content
   */
  static validateMarkdown(markdown) {
    // Check type
    if (typeof markdown !== 'string') {
      return { valid: false, error: 'Content must be a string' };
    }

    // Check size
    if (!this.checkContentSize(markdown)) {
      return { valid: false, error: 'Content exceeds 5MB limit' };
    }

    // Check encoding (should be UTF-8)
    try {
      Buffer.from(markdown, 'utf8');
    } catch (e) {
      return { valid: false, error: 'Invalid UTF-8 encoding' };
    }

    return { valid: true };
  }
}
```

**Create test file**: `dev-tools/editor-backend/services/ValidationService.test.js`
```javascript
import { ValidationService } from './ValidationService.js';

describe('ValidationService', () => {
  test('should reject path traversal', () => {
    expect(ValidationService.isPathSafe('../../../etc/passwd')).toBe(false);
  });

  test('should accept valid paths', () => {
    expect(ValidationService.isPathSafe('blog/post/index.md')).toBe(true);
  });

  test('should reject absolute paths', () => {
    expect(ValidationService.isPathSafe('/etc/passwd')).toBe(false);
  });

  test('should sanitize markdown', () => {
    const dangerous = '<script>alert("xss")</script>Hello';
    const sanitized = ValidationService.sanitizeMarkdown(dangerous);
    expect(sanitized).not.toContain('<script>');
  });
});
```

**Test locally**:
```bash
npm test -- ValidationService.test.js
```

**Acceptance Criteria**:
- [x] All 4 methods implemented
- [x] Unit tests pass
- [x] Can import in other files
- [x] No dependencies on other services

**Definition of Done**: Tests pass, file committed, other devs can import it

---

#### Task 1.2: Content Service (Standalone) 📁 (5 SP)
**Owner**: Backend Dev 2
**Effort**: 3 hours
**Dependencies**: Task 0.1 only
**Can work in parallel with Task 1.1**

**Create**: `dev-tools/editor-backend/services/ContentService.js`

**Complete Implementation**:
```javascript
import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';
import { ValidationService } from './ValidationService.js';

export class ContentService {
  constructor(contentRoot, allowedSections = ['blog', 'tutorials']) {
    this.contentRoot = path.resolve(contentRoot);
    this.allowedSections = allowedSections;
  }

  /**
   * Validate file path
   */
  validatePath(relativePath) {
    // Sanitize
    const sanitized = ValidationService.sanitizePath(relativePath);

    if (!sanitized) {
      return { valid: false, error: 'Invalid path format' };
    }

    // Safety check
    if (!ValidationService.isPathSafe(sanitized)) {
      return { valid: false, error: 'Path traversal detected' };
    }

    // Extract section
    const parts = sanitized.split('/');
    const section = parts[0];

    // Whitelist check
    if (!this.allowedSections.includes(section)) {
      return {
        valid: false,
        error: `Section '${section}' not allowed. Allowed: ${this.allowedSections.join(', ')}`
      };
    }

    // Extension check
    if (!sanitized.endsWith('.md')) {
      return { valid: false, error: 'Only .md files allowed' };
    }

    return { valid: true, sanitizedPath: sanitized };
  }

  /**
   * Get absolute path
   */
  getAbsolutePath(relativePath) {
    return path.join(this.contentRoot, relativePath);
  }

  /**
   * Check if section is allowed
   */
  isAllowedSection(section) {
    return this.allowedSections.includes(section);
  }

  /**
   * Extract frontmatter from markdown
   */
  extractFrontmatter(markdown) {
    try {
      const parsed = matter(markdown);
      return {
        frontmatter: parsed.data,
        body: parsed.content
      };
    } catch (error) {
      throw new Error(`Failed to parse frontmatter: ${error.message}`);
    }
  }

  /**
   * Reassemble markdown with frontmatter
   */
  reassembleMarkdown(frontmatter, body) {
    const fm = matter.stringify(body, frontmatter);
    return fm;
  }

  /**
   * Read file content
   */
  async readFile(relativePath) {
    const validation = this.validatePath(relativePath);

    if (!validation.valid) {
      throw new Error(validation.error);
    }

    const absolutePath = this.getAbsolutePath(validation.sanitizedPath);

    // Check existence
    try {
      await fs.access(absolutePath);
    } catch {
      throw new Error('File does not exist');
    }

    // Read file
    const content = await fs.readFile(absolutePath, 'utf-8');
    const { frontmatter, body } = this.extractFrontmatter(content);

    return {
      frontmatter,
      body,
      fullPath: absolutePath
    };
  }

  /**
   * Get metadata only
   */
  async getMetadata(relativePath) {
    const { frontmatter } = await this.readFile(relativePath);
    return frontmatter;
  }

  /**
   * Save content (preserving frontmatter)
   */
  async saveContent(relativePath, newBody) {
    // Validate markdown
    const contentValidation = ValidationService.validateMarkdown(newBody);
    if (!contentValidation.valid) {
      throw new Error(contentValidation.error);
    }

    // Read existing file (to get frontmatter)
    const { frontmatter, fullPath } = await this.readFile(relativePath);

    // Sanitize new body
    const sanitizedBody = ValidationService.sanitizeMarkdown(newBody);

    // Reassemble
    const fullMarkdown = this.reassembleMarkdown(frontmatter, sanitizedBody);

    // Write atomically (write to temp, then rename)
    const tempPath = `${fullPath}.tmp`;

    try {
      await fs.writeFile(tempPath, fullMarkdown, 'utf-8');
      await fs.rename(tempPath, fullPath);

      const stats = await fs.stat(fullPath);

      return {
        success: true,
        filePath: relativePath,
        bytesWritten: stats.size,
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      // Cleanup temp file if exists
      try {
        await fs.unlink(tempPath);
      } catch {}

      throw new Error(`Failed to write file: ${error.message}`);
    }
  }
}
```

**Create test**:
```javascript
// ContentService.test.js
import { ContentService } from './ContentService.js';
import path from 'path';

const testContentRoot = path.resolve(process.cwd(), '../../content');
const service = new ContentService(testContentRoot);

describe('ContentService', () => {
  test('should validate correct paths', () => {
    const result = service.validatePath('blog/test/index.md');
    expect(result.valid).toBe(true);
  });

  test('should reject invalid sections', () => {
    const result = service.validatePath('docs/test.md');
    expect(result.valid).toBe(false);
  });

  test('should extract frontmatter', () => {
    const md = '---\ntitle: Test\n---\n\nBody content';
    const { frontmatter, body } = service.extractFrontmatter(md);
    expect(frontmatter.title).toBe('Test');
    expect(body.trim()).toBe('Body content');
  });
});
```

**Acceptance Criteria**:
- [x] All methods implemented
- [x] Unit tests pass
- [x] Handles frontmatter correctly
- [x] Atomic writes (temp file → rename)

**Definition of Done**: Tests pass, can read/write real markdown files

---

#### Task 1.3: Config & Logger (Utilities) 🔧 (2 SP)
**Owner**: Backend Dev 1 or 2
**Effort**: 1 hour
**Dependencies**: Task 0.1 only
**Can work in parallel**

**Create**: `dev-tools/editor-backend/config.js`
```javascript
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
  port: process.env.PORT || 3030,

  cors: {
    origin: process.env.CORS_ORIGIN || 'http://localhost:1313',
    methods: ['GET', 'POST'],
    credentials: true
  },

  contentRoot: path.resolve(__dirname, '../../content'),

  allowedSections: ['blog', 'tutorials'],

  autoSave: {
    debounce: 2000,
    maxRetries: 3
  }
};
```

**Create**: `dev-tools/editor-backend/utils/logger.js`
```javascript
export class Logger {
  static log(message, ...args) {
    console.log(`[${new Date().toISOString()}] [INFO]`, message, ...args);
  }

  static error(message, ...args) {
    console.error(`[${new Date().toISOString()}] [ERROR]`, message, ...args);
  }

  static warn(message, ...args) {
    console.warn(`[${new Date().toISOString()}] [WARN]`, message, ...args);
  }

  static success(message, ...args) {
    console.log(`[${new Date().toISOString()}] [✓]`, message, ...args);
  }
}
```

**Acceptance Criteria**:
- [x] Config exports all needed values
- [x] Logger has 4 methods
- [x] Can import in other files

**Definition of Done**: Files created, imports work

---

#### Task 1.4: Error Handler Middleware 🛡️ (1 SP)
**Owner**: Backend Dev (any)
**Effort**: 30 min
**Dependencies**: Task 1.3
**Can start after config is ready**

**Create**: `dev-tools/editor-backend/middleware/errorHandler.js`
```javascript
import { Logger } from '../utils/logger.js';

export const errorHandler = (err, req, res, next) => {
  Logger.error('Error:', err.message);

  // Determine error type
  let statusCode = 500;
  let errorCode = 'INTERNAL_ERROR';

  if (err.message.includes('Path traversal')) {
    statusCode = 400;
    errorCode = 'INVALID_PATH';
  } else if (err.message.includes('not allowed')) {
    statusCode = 400;
    errorCode = 'SECTION_NOT_ALLOWED';
  } else if (err.message.includes('does not exist')) {
    statusCode = 404;
    errorCode = 'FILE_NOT_FOUND';
  } else if (err.message.includes('Failed to write')) {
    statusCode = 500;
    errorCode = 'WRITE_ERROR';
  } else if (err.message.includes('exceeds')) {
    statusCode = 413;
    errorCode = 'CONTENT_TOO_LARGE';
  }

  res.status(statusCode).json({
    success: false,
    message: err.message,
    error: errorCode
  });
};
```

**Acceptance Criteria**:
- [x] Catches all errors
- [x] Returns proper status codes
- [x] Returns error codes from spec

**Definition of Done**: File created, ready to use in Express

---

#### Task 1.5: API Routes 🛣️ (2 SP)
**Owner**: Backend Dev (any)
**Effort**: 1 hour
**Dependencies**: Tasks 1.1, 1.2, 1.3
**Start after services are ready**

**Create**: `dev-tools/editor-backend/routes/content.routes.js`
```javascript
import express from 'express';
import { ContentService } from '../services/ContentService.js';
import config from '../config.js';

const router = express.Router();
const contentService = new ContentService(config.contentRoot, config.allowedSections);

/**
 * POST /api/content/save
 */
router.post('/save', async (req, res, next) => {
  try {
    const { filePath, content, section } = req.body;

    // Validate input
    if (!filePath || !content || !section) {
      throw new Error('Missing required fields: filePath, content, section');
    }

    if (!contentService.isAllowedSection(section)) {
      throw new Error(`Section '${section}' not allowed`);
    }

    // Save
    const result = await contentService.saveContent(filePath, content);

    res.json({
      success: true,
      message: 'Content saved successfully',
      savedAt: result.timestamp,
      filePath: result.filePath
    });
  } catch (error) {
    next(error);
  }
});

/**
 * GET /api/content/meta?path=blog/post/index.md
 */
router.get('/meta', async (req, res, next) => {
  try {
    const { path } = req.query;

    if (!path) {
      throw new Error('Missing query parameter: path');
    }

    const metadata = await contentService.getMetadata(path);

    res.json({
      success: true,
      metadata,
      filePath: path
    });
  } catch (error) {
    next(error);
  }
});

export default router;
```

**Acceptance Criteria**:
- [x] POST /save endpoint works
- [x] GET /meta endpoint works
- [x] Error handling via next()

**Definition of Done**: Routes file created, exports router

---

#### Task 1.6: Express Server Assembly 🚀 (3 SP)
**Owner**: Backend Dev (any)
**Effort**: 1 hour
**Dependencies**: Tasks 1.4, 1.5
**Final backend task**

**Create**: `dev-tools/editor-backend/server.js`
```javascript
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import config from './config.js';
import contentRoutes from './routes/content.routes.js';
import { errorHandler } from './middleware/errorHandler.js';
import { Logger } from './utils/logger.js';

const app = express();

// Middleware
app.use(helmet());
app.use(cors(config.cors));
app.use(express.json({ limit: '10mb' }));

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    uptime: process.uptime(),
    version: '1.0.0'
  });
});

// Routes
app.use('/api/content', contentRoutes);

// Error handling
app.use(errorHandler);

// Start server
app.listen(config.port, () => {
  Logger.success(`🚀 Editor backend running on http://localhost:${config.port}`);
  Logger.log(`📁 Content root: ${config.contentRoot}`);
  Logger.log(`✅ Allowed sections: ${config.allowedSections.join(', ')}`);
});
```

**Test manually**:
```bash
cd dev-tools/editor-backend
npm start
```

Then in another terminal:
```bash
# Health check
curl http://localhost:3030/api/health

# Test save (adjust path to real file)
curl -X POST http://localhost:3030/api/content/save \
  -H "Content-Type: application/json" \
  -d '{
    "filePath": "blog/flat/pierwszy-post.md",
    "content": "# Test Edit\n\nThis is a test.",
    "section": "blog"
  }'
```

**Acceptance Criteria**:
- [x] Server starts without errors
- [x] Health endpoint returns 200
- [x] Save endpoint works with real file
- [x] CORS allows localhost:1313

**Definition of Done**: Backend fully functional, can save content via API

---

### 🎨 Sprint 2: Core Frontend (13 Story Points)
**Goal**: Working edit mode with save functionality
**Duration**: 1 day
**Can start in parallel with Sprint 1**

#### Task 2.1: API Client (Standalone) 🔌 (2 SP)
**Owner**: Frontend Dev 1
**Effort**: 1 hour
**Dependencies**: Task 0.2 only
**No backend needed yet - just interface**

**Create**: `assets/js/editor-api.js`
```javascript
/**
 * API Client for Editor Backend
 */
export class EditorAPI {
  constructor(baseURL = 'http://localhost:3030') {
    this.baseURL = baseURL;
  }

  /**
   * Save content
   */
  async saveContent(payload) {
    try {
      const response = await fetch(`${this.baseURL}/api/content/save`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Save failed');
      }

      return data;
    } catch (error) {
      console.error('[EditorAPI] Save error:', error);
      throw error;
    }
  }

  /**
   * Get metadata
   */
  async getMetadata(filePath) {
    try {
      const response = await fetch(
        `${this.baseURL}/api/content/meta?path=${encodeURIComponent(filePath)}`
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to get metadata');
      }

      return data;
    } catch (error) {
      console.error('[EditorAPI] Get metadata error:', error);
      throw error;
    }
  }

  /**
   * Health check
   */
  async healthCheck() {
    try {
      const response = await fetch(`${this.baseURL}/api/health`);
      return response.ok;
    } catch {
      return false;
    }
  }
}
```

**Test in browser console** (mock):
```javascript
const api = new EditorAPI();
console.log('API client created:', api);
```

**Acceptance Criteria**:
- [x] All 3 methods implemented
- [x] Proper error handling
- [x] Can import in other files

**Definition of Done**: File created, imports work in browser

---

#### Task 2.2: Edit Toggle Component 🎚️ (3 SP)
**Owner**: Frontend Dev 2
**Effort**: 1.5 hours
**Dependencies**: Task 0.2 only
**Can work in parallel with 2.1**

**Create**: `assets/js/edit-toggle.js`
```javascript
/**
 * Edit Mode Toggle Component
 */
export class EditToggle {
  constructor(options = {}) {
    this.enabled = false;
    this.storageKey = 'editor_mode_enabled';
    this.container = options.container || document.body;
    this.onEnable = options.onEnable || (() => {});
    this.onDisable = options.onDisable || (() => {});

    this.button = null;
  }

  /**
   * Initialize toggle
   */
  init() {
    // Restore state from sessionStorage
    const saved = sessionStorage.getItem(this.storageKey);
    this.enabled = saved === 'true';

    // Create button
    this.render();

    // Apply initial state
    if (this.enabled) {
      this.enable();
    }

    console.log('[EditToggle] Initialized, enabled:', this.enabled);
  }

  /**
   * Render button
   */
  render() {
    this.button = document.createElement('button');
    this.button.id = 'edit-mode-toggle';
    this.button.className = 'btn-edit-toggle';
    this.button.setAttribute('aria-label', 'Toggle Edit Mode');
    this.button.innerHTML = `
      <span class="icon-edit">✏️</span>
      <span class="label">Edit Mode: <strong class="status">${this.enabled ? 'ON' : 'OFF'}</strong></span>
    `;

    this.button.addEventListener('click', () => this.toggle());

    // Add to container
    this.container.appendChild(this.button);
  }

  /**
   * Toggle state
   */
  toggle() {
    if (this.enabled) {
      this.disable();
    } else {
      this.enable();
    }
  }

  /**
   * Enable edit mode
   */
  enable() {
    this.enabled = true;
    sessionStorage.setItem(this.storageKey, 'true');

    if (this.button) {
      this.button.querySelector('.status').textContent = 'ON';
      this.button.classList.add('active');
    }

    document.body.classList.add('edit-mode-enabled');

    // Emit custom event
    window.dispatchEvent(new CustomEvent('editModeEnabled'));

    this.onEnable();
    console.log('[EditToggle] Edit mode enabled');
  }

  /**
   * Disable edit mode
   */
  disable() {
    this.enabled = false;
    sessionStorage.setItem(this.storageKey, 'false');

    if (this.button) {
      this.button.querySelector('.status').textContent = 'OFF';
      this.button.classList.remove('active');
    }

    document.body.classList.remove('edit-mode-enabled');

    // Emit custom event
    window.dispatchEvent(new CustomEvent('editModeDisabled'));

    this.onDisable();
    console.log('[EditToggle] Edit mode disabled');
  }

  /**
   * Check if enabled
   */
  isEnabled() {
    return this.enabled;
  }

  /**
   * Destroy toggle
   */
  destroy() {
    if (this.button) {
      this.button.remove();
    }
    sessionStorage.removeItem(this.storageKey);
  }
}
```

**Add to header**: `layouts/partials/header/header.html`
Find the Draft toggle section (around line 165) and add after it:
```html
<!-- Draft toggle -->
<button type="button" id="draftToggle"...>
</button>

<!-- Edit Mode toggle (dev only) -->
{{- if hugo.IsServer -}}
<button type="button" id="editModeToggle" class="btn btn-link nav-link p-2 d-none d-lg-block edit-toggle" aria-label="Edit mode toggle">
  <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-pencil" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
    <path d="M4 20h4l10.5 -10.5a2.828 2.828 0 1 0 -4 -4l-10.5 10.5v4"></path>
    <path d="M13.5 6.5l4 4"></path>
  </svg>
</button>
{{- end -}}
```

**Add CSS**: `assets/scss/custom/custom.scss` (append):
```scss
// Edit Mode Toggle (in navbar)
.edit-toggle {
  transition: color 0.3s, background 0.3s;

  &.active {
    color: #28a745 !important;
    background: rgba(40, 167, 69, 0.1);
    border-radius: 4px;
  }

  &:hover {
    color: #28a745 !important;
  }
}

// Edit mode body class
body.edit-mode-enabled {
  .article-content {
    cursor: text;
    outline: 2px dashed #ffc107;
    outline-offset: 4px;
    transition: outline 0.3s;

    &:hover {
      outline-color: #ff9800;
    }
  }
}
```

**Acceptance Criteria**:
- [x] Button renders in top-right
- [x] Click toggles ON/OFF
- [x] State persists in sessionStorage
- [x] Emits custom events

**Definition of Done**: Button works, styling applied

---

#### Task 2.3: Content Editor Core (No Tiptap Yet) 📝 (4 SP)
**Owner**: Frontend Dev 1
**Effort**: 2 hours
**Dependencies**: Task 2.1
**Basic editor without WYSIWYG first**

**Create**: `assets/js/content-editor.js`
```javascript
import { EditorAPI } from './editor-api.js';

/**
 * Content Editor Controller
 */
export class ContentEditor {
  constructor(element, options = {}) {
    this.element = element;
    this.api = new EditorAPI(options.apiURL);
    this.saveDelay = options.saveDelay || 2000;
    this.saveTimeout = null;
    this.lastSavedContent = null;
    this.isActive = false;

    // Get file metadata from element
    this.filePath = element.dataset.filePath || null;
    this.section = element.dataset.section || null;

    this.eventHandlers = {};
  }

  /**
   * Initialize editor
   */
  async init() {
    if (!this.filePath || !this.section) {
      console.error('[ContentEditor] Missing filePath or section in data attributes');
      return;
    }

    // Store original content
    this.lastSavedContent = this.getContent();

    // Setup beforeunload warning
    this.setupUnloadWarning();

    // Add click listener
    this.element.addEventListener('click', (e) => {
      if (document.body.classList.contains('edit-mode-enabled')) {
        this.activate();
      }
    });

    // Listen to edit mode events
    window.addEventListener('editModeDisabled', () => {
      this.deactivate();
    });

    console.log('[ContentEditor] Initialized for:', this.filePath);
  }

  /**
   * Convert HTML to Markdown (lightweight converter)
   */
  htmlToMarkdown(html) {
    let md = html;

    // Headings
    md = md.replace(/<h1[^>]*>(.*?)<\/h1>/gi, '\n# $1\n\n');
    md = md.replace(/<h2[^>]*>(.*?)<\/h2>/gi, '\n## $1\n\n');
    md = md.replace(/<h3[^>]*>(.*?)<\/h3>/gi, '\n### $1\n\n');
    md = md.replace(/<h4[^>]*>(.*?)<\/h4>/gi, '\n#### $1\n\n');
    md = md.replace(/<h5[^>]*>(.*?)<\/h5>/gi, '\n##### $1\n\n');
    md = md.replace(/<h6[^>]*>(.*?)<\/h6>/gi, '\n###### $1\n\n');

    // Bold/Italic (before paragraphs)
    md = md.replace(/<strong[^>]*>(.*?)<\/strong>/gi, '**$1**');
    md = md.replace(/<b[^>]*>(.*?)<\/b>/gi, '**$1**');
    md = md.replace(/<em[^>]*>(.*?)<\/em>/gi, '*$1*');
    md = md.replace(/<i[^>]*>(.*?)<\/i>/gi, '*$1*');

    // Code blocks (before inline code)
    md = md.replace(/<pre[^>]*><code[^>]*>(.*?)<\/code><\/pre>/gis, '\n```\n$1\n```\n\n');

    // Inline code
    md = md.replace(/<code[^>]*>(.*?)<\/code>/gi, '`$1`');

    // Links
    md = md.replace(/<a[^>]*href=["']([^"']*)["'][^>]*>(.*?)<\/a>/gi, '[$2]($1)');

    // Images
    md = md.replace(/<img[^>]*src=["']([^"']*)["'][^>]*alt=["']([^"']*)["'][^>]*>/gi, '![$2]($1)');

    // Lists - Unordered
    md = md.replace(/<ul[^>]*>(.*?)<\/ul>/gis, (match, content) => {
      const items = content.match(/<li[^>]*>(.*?)<\/li>/gi) || [];
      return '\n' + items.map(li => '- ' + li.replace(/<\/?li[^>]*>/gi, '').trim()).join('\n') + '\n\n';
    });

    // Lists - Ordered
    md = md.replace(/<ol[^>]*>(.*?)<\/ol>/gis, (match, content) => {
      const items = content.match(/<li[^>]*>(.*?)<\/li>/gi) || [];
      let counter = 1;
      return '\n' + items.map(li => `${counter++}. ` + li.replace(/<\/?li[^>]*>/gi, '').trim()).join('\n') + '\n\n';
    });

    // Blockquotes
    md = md.replace(/<blockquote[^>]*>(.*?)<\/blockquote>/gis, (match, content) => {
      const lines = content.trim().split('\n');
      return '\n' + lines.map(line => '> ' + line.trim()).join('\n') + '\n\n';
    });

    // Horizontal rules
    md = md.replace(/<hr[^>]*>/gi, '\n---\n\n');

    // Paragraphs
    md = md.replace(/<p[^>]*>(.*?)<\/p>/gi, '$1\n\n');

    // Line breaks
    md = md.replace(/<br[^>]*>/gi, '  \n');

    // Remove remaining HTML tags
    md = md.replace(/<[^>]*>/g, '');

    // Decode HTML entities
    md = md.replace(/&nbsp;/g, ' ');
    md = md.replace(/&amp;/g, '&');
    md = md.replace(/&lt;/g, '<');
    md = md.replace(/&gt;/g, '>');
    md = md.replace(/&quot;/g, '"');
    md = md.replace(/&#39;/g, "'");

    // Clean up excessive newlines
    md = md.replace(/\n{3,}/g, '\n\n');

    return md.trim();
  }

  /**
   * Activate editor
   */
  activate() {
    if (this.isActive) return;

    this.isActive = true;
    this.element.contentEditable = true;
    this.element.focus();
    this.element.classList.add('editor-active');

    // Listen for changes
    this.element.addEventListener('input', () => this.handleInput());
    this.element.addEventListener('keydown', (e) => this.handleKeydown(e));

    this.emit('editor:activated');
    console.log('[ContentEditor] Activated');
  }

  /**
   * Deactivate editor
   */
  deactivate() {
    if (!this.isActive) return;

    this.isActive = false;
    this.element.contentEditable = false;
    this.element.classList.remove('editor-active');

    // Save any pending changes
    if (this.isDirty()) {
      this.save();
    }

    this.emit('editor:deactivated');
    console.log('[ContentEditor] Deactivated');
  }

  /**
   * Handle input changes
   */
  handleInput() {
    this.emit('content:changed');
    this.autoBackup(); // Backup to localStorage, NOT save to file
  }

  /**
   * Setup beforeunload warning
   */
  setupUnloadWarning() {
    window.addEventListener('beforeunload', (e) => {
      if (this.isDirty()) {
        e.preventDefault();
        e.returnValue = 'Masz niezapisane zmiany. Czy na pewno chcesz wyjść?';
        return e.returnValue;
      }
    });
  }

  /**
   * Handle keyboard shortcuts
   */
  handleKeydown(e) {
    // Ctrl+S or Cmd+S = Save
    if ((e.ctrlKey || e.metaKey) && e.key === 's') {
      e.preventDefault();
      this.save();
    }

    // Escape = Deactivate
    if (e.key === 'Escape') {
      this.deactivate();
    }
  }

  /**
   * Auto-backup to localStorage (NOT auto-save to prevent Hugo rebuild)
   */
  autoBackup() {
    clearTimeout(this.saveTimeout);

    this.saveTimeout = setTimeout(() => {
      const currentContent = this.getContent();
      this.backupToLocalStorage(currentContent);
      console.log('[ContentEditor] Auto-backed up to localStorage');
    }, 1000); // Backup every 1s
  }

  /**
   * Save content
   */
  async save() {
    const currentContent = this.getContent();

    // Skip if no changes
    if (currentContent === this.lastSavedContent) {
      console.log('[ContentEditor] No changes to save');
      return;
    }

    try {
      this.showSaveIndicator('saving');

      const result = await this.api.saveContent({
        filePath: this.filePath,
        content: currentContent,
        section: this.section
      });

      if (result.success) {
        this.lastSavedContent = currentContent;
        this.showSaveIndicator('saved');
        this.emit('content:saved', result);
        console.log('[ContentEditor] Saved successfully');
      }
    } catch (error) {
      this.showSaveIndicator('error');
      this.emit('content:error', error);
      this.backupToLocalStorage(currentContent);
      console.error('[ContentEditor] Save error:', error);
    }
  }

  /**
   * Get current content as Markdown
   */
  getContent() {
    // Get HTML from element
    const html = this.element.innerHTML;
    // Convert to Markdown
    return this.htmlToMarkdown(html);
  }

  /**
   * Check if content changed
   */
  isDirty() {
    return this.getContent() !== this.lastSavedContent;
  }

  /**
   * Show save indicator
   */
  showSaveIndicator(state) {
    // Create indicator if doesn't exist
    let indicator = document.querySelector('.save-indicator');

    if (!indicator) {
      indicator = document.createElement('div');
      indicator.className = 'save-indicator';
      document.body.appendChild(indicator);
    }

    indicator.dataset.state = state;
    indicator.textContent = {
      'saving': '💾 Saving...',
      'saved': '✓ Saved',
      'error': '⚠️ Error'
    }[state];

    // Hide "saved" after 2s
    if (state === 'saved') {
      setTimeout(() => {
        indicator.style.opacity = '0';
      }, 2000);
    } else {
      indicator.style.opacity = '1';
    }
  }

  /**
   * Backup to localStorage
   */
  backupToLocalStorage(content) {
    const key = `backup_${this.filePath}`;
    localStorage.setItem(key, JSON.stringify({
      content,
      timestamp: new Date().toISOString()
    }));
    console.log('[ContentEditor] Backed up to localStorage');
  }

  /**
   * Event emitter
   */
  on(event, handler) {
    if (!this.eventHandlers[event]) {
      this.eventHandlers[event] = [];
    }
    this.eventHandlers[event].push(handler);
  }

  off(event, handler) {
    if (this.eventHandlers[event]) {
      this.eventHandlers[event] = this.eventHandlers[event].filter(h => h !== handler);
    }
  }

  emit(event, data) {
    if (this.eventHandlers[event]) {
      this.eventHandlers[event].forEach(handler => handler(data));
    }
  }

  /**
   * Destroy editor
   */
  destroy() {
    this.deactivate();
    clearTimeout(this.saveTimeout);
    this.eventHandlers = {};
  }
}
```

**Add CSS** (append to custom.scss):
```scss
// Save Indicator
.save-indicator {
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 9998;
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  transition: opacity 0.3s;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);

  &[data-state="saving"] {
    background: #fff3cd;
    color: #856404;
  }

  &[data-state="saved"] {
    background: #d4edda;
    color: #155724;
  }

  &[data-state="error"] {
    background: #f8d7da;
    color: #721c24;
  }
}

// Editor active state
.editor-active {
  outline: 2px solid #007bff !important;
  outline-offset: 4px;
  min-height: 100px;
}
```

**Acceptance Criteria**:
- [x] Click activates contentEditable
- [x] Auto-saves after 2s
- [x] Ctrl+S saves immediately
- [x] Esc deactivates
- [x] Shows save indicator

**Definition of Done**: Basic editing works (plain text), can save

---

#### Task 2.4: Main App Integration 🔗 (2 SP)
**Owner**: Frontend Dev (any)
**Effort**: 1 hour
**Dependencies**: Tasks 2.2, 2.3
**Wire everything together**

**Create**: `assets/js/app-editor.js`
```javascript
import { EditToggle } from './edit-toggle.js';
import { ContentEditor } from './content-editor.js';

/**
 * Initialize Editor System
 */
function initEditor() {
  console.log('[App] Initializing editor system...');

  // 1. Create toggle
  const toggle = new EditToggle({
    container: document.querySelector('.navbar') || document.body
  });
  toggle.init();

  // 2. Find all editable content
  const editableElements = document.querySAll('.article-content[data-file-path]');

  if (editableElements.length === 0) {
    console.warn('[App] No editable elements found with data-file-path');
    return;
  }

  // 3. Create editor for each element
  const editors = [];
  editableElements.forEach(element => {
    const editor = new ContentEditor(element, {
      apiURL: 'http://localhost:3030',
      saveDelay: 2000
    });
    editor.init();
    editors.push(editor);
  });

  console.log(`[App] Initialized ${editors.length} editor(s)`);

  // 4. Global error handler
  window.addEventListener('unhandledrejection', (event) => {
    console.error('[App] Unhandled promise rejection:', event.reason);
  });
}

// Auto-init when DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initEditor);
} else {
  initEditor();
}
```

**Update**: `layouts/partials/footer/script-footer.html`
Add before closing `</body>`:
```html
{{- if hugo.IsServer -}}
<script type="module" src="{{ "js/app-editor.js" | relURL }}"></script>
{{- end -}}
```

**Acceptance Criteria**:
- [x] Editor initializes on page load
- [x] Toggle button appears
- [x] Only loads in dev mode (hugo.IsServer)

**Definition of Done**: Editor system auto-starts in dev mode

---

#### Task 2.5: Template Modifications (Add Data Attributes) 🏷️ (2 SP)
**Owner**: Frontend Dev (any)
**Effort**: 30 min
**Dependencies**: None (can do anytime)
**Add metadata to content areas**

**Update**: `layouts/blog/single.html`
Find line 13 where `{{ .Content }}` is and wrap it:
```html
<!-- Before (line 13): -->
{{ .Content }}

<!-- After: -->
{{- if hugo.IsServer -}}
<div class="article-content"
     data-file-path="{{ .File.Path }}"
     data-section="blog">
  {{ .Content }}
</div>
{{- else -}}
  {{ .Content }}
{{- end -}}
```

**Update**: `layouts/tutorials/single.html`
Same change at line 13:
```html
<!-- Before (line 13): -->
{{ .Content }}

<!-- After: -->
{{- if hugo.IsServer -}}
<div class="article-content"
     data-file-path="{{ .File.Path }}"
     data-section="tutorials">
  {{ .Content }}
</div>
{{- else -}}
  {{ .Content }}
{{- end -}}
```

**Acceptance Criteria**:
- [x] data-file-path added to blog singles
- [x] data-file-path added to tutorial singles
- [x] data-section attribute present

**Definition of Done**: Attributes visible in browser inspector

---

### 🎨 Sprint 3: WYSIWYG Integration (8 Story Points)
**Goal**: Add Tiptap for true WYSIWYG editing
**Duration**: 0.5 day
**Dependencies**: Sprint 2 completed**

#### Task 3.1: Tiptap Integration 🎭 (5 SP)
**Owner**: Frontend Dev 1
**Effort**: 3 hours
**Dependencies**: Task 2.3
**Replace contentEditable with Tiptap**

**Update**: `assets/js/content-editor.js`
Replace `activate()` and `deactivate()` methods:

```javascript
// Add imports at top
import { Editor } from '@tiptap/core';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';

// In ContentEditor class, add property:
this.tiptapEditor = null;

// Replace activate() method:
activate() {
  if (this.isActive) return;

  this.isActive = true;
  this.element.classList.add('editor-active');

  // Initialize Tiptap WYSIWYG editor
  this.tiptapEditor = new Editor({
    element: this.element,
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3, 4, 5, 6] }
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: { target: '_blank', rel: 'noopener noreferrer' }
      }),
      Image.configure({
        inline: true,
        allowBase64: false
      })
    ],
    content: this.element.innerHTML,
    editable: true,
    onUpdate: () => {
      this.handleInput();
    }
  });

  this.element.addEventListener('keydown', (e) => this.handleKeydown(e));

  this.emit('editor:activated');
  console.log('[ContentEditor] Activated with Tiptap');
}

// Replace deactivate() method:
deactivate() {
  if (!this.isActive) return;

  // Destroy Tiptap first (don't save here - only on Ctrl+S)
  if (this.tiptapEditor) {
    this.tiptapEditor.destroy();
    this.tiptapEditor = null;
  }

  this.isActive = false;
  this.element.classList.remove('editor-active');

  this.emit('editor:deactivated');
  console.log('[ContentEditor] Deactivated');
}

// Update getContent() to use Tiptap HTML:
getContent() {
  if (this.tiptapEditor) {
    // Get HTML from Tiptap, then convert to Markdown
    const html = this.tiptapEditor.getHTML();
    return this.htmlToMarkdown(html);
  } else {
    // Fallback: get from element
    const html = this.element.innerHTML;
    return this.htmlToMarkdown(html);
  }
}
```

**Note**: We're NOT using `tiptap-markdown` (deprecated). Instead:
1. Tiptap edits as HTML (WYSIWYG)
2. On save (Ctrl+S), we convert HTML → Markdown using our custom converter
3. This keeps things simple and future-proof for Tiptap 3.x native markdown support

**Acceptance Criteria**:
- [x] Tiptap initializes on click
- [x] WYSIWYG editing works
- [x] Converts to markdown on save
- [x] Formatting preserved

**Definition of Done**: Can edit with formatting, markdown saved correctly

---

#### Task 3.2: Editor Styling 💅 (2 SP)
**Owner**: Frontend Dev 2
**Effort**: 1 hour
**Dependencies**: Task 3.1
**Make editor look good**

**Add to**: `assets/scss/custom/custom.scss`
```scss
// Tiptap Editor Styles
.ProseMirror {
  outline: none;
  min-height: 200px;
  padding: 20px;

  &:focus {
    outline: none;
  }

  // Headings
  h1, h2, h3, h4, h5, h6 {
    margin-top: 1.5rem;
    margin-bottom: 1rem;
    font-weight: 600;
  }

  h1 { font-size: 2.5rem; }
  h2 { font-size: 2rem; }
  h3 { font-size: 1.75rem; }
  h4 { font-size: 1.5rem; }
  h5 { font-size: 1.25rem; }
  h6 { font-size: 1rem; }

  // Paragraphs
  p {
    margin-bottom: 1rem;
    line-height: 1.6;
  }

  // Code
  code {
    background: #f4f4f4;
    padding: 0.2em 0.4em;
    border-radius: 3px;
    font-family: 'Courier New', monospace;
  }

  pre {
    background: #282c34;
    color: #abb2bf;
    padding: 1rem;
    border-radius: 5px;
    overflow-x: auto;

    code {
      background: none;
      color: inherit;
      padding: 0;
    }
  }

  // Lists
  ul, ol {
    padding-left: 1.5rem;
    margin-bottom: 1rem;
  }

  li {
    margin-bottom: 0.5rem;
  }

  // Blockquotes
  blockquote {
    border-left: 4px solid #ddd;
    padding-left: 1rem;
    margin: 1rem 0;
    color: #666;
    font-style: italic;
  }

  // Links
  a {
    color: #007bff;
    text-decoration: underline;

    &:hover {
      color: #0056b3;
    }
  }

  // Selection
  ::selection {
    background: #b3d4fc;
  }
}

// Editor toolbar (for future)
.editor-toolbar {
  display: none; // For now, markdown shortcuts only
}
```

**Acceptance Criteria**:
- [x] Editor looks like regular content
- [x] Formatting is clear
- [x] Readable fonts and spacing

**Definition of Done**: Editor styling matches site design

---

#### Task 3.3: Keyboard Shortcuts Guide 📋 (1 SP)
**Owner**: Any Dev
**Effort**: 30 min
**Dependencies**: None
**Add help overlay**

**Add to** `assets/js/app-editor.js`:
```javascript
// Add after toggle init:
document.addEventListener('keydown', (e) => {
  // Ctrl+/ or Cmd+/ = Show shortcuts
  if ((e.ctrlKey || e.metaKey) && e.key === '/') {
    e.preventDefault();
    showShortcutsModal();
  }
});

function showShortcutsModal() {
  const modal = document.createElement('div');
  modal.className = 'shortcuts-modal';
  modal.innerHTML = `
    <div class="shortcuts-content">
      <h3>⌨️ Editor Shortcuts</h3>
      <table>
        <tr><td><kbd>Ctrl/Cmd + S</kbd></td><td>Save immediately</td></tr>
        <tr><td><kbd>Esc</kbd></td><td>Exit editor</td></tr>
        <tr><td><kbd>Ctrl/Cmd + /</kbd></td><td>Show this help</td></tr>
        <tr><td><kbd># + Space</kbd></td><td>Heading 1</td></tr>
        <tr><td><kbd>## + Space</kbd></td><td>Heading 2</td></tr>
        <tr><td><kbd>### + Space</kbd></td><td>Heading 3</td></tr>
        <tr><td><kbd>- + Space</kbd></td><td>Bullet list</td></tr>
        <tr><td><kbd>1. + Space</kbd></td><td>Numbered list</td></tr>
        <tr><td><kbd>` + text + `</kbd></td><td>Inline code</td></tr>
        <tr><td><kbd>``` + Enter</kbd></td><td>Code block</td></tr>
      </table>
      <button onclick="this.closest('.shortcuts-modal').remove()">Close</button>
    </div>
  `;

  document.body.appendChild(modal);
}
```

**Add CSS**:
```scss
.shortcuts-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10000;

  .shortcuts-content {
    background: white;
    padding: 2rem;
    border-radius: 12px;
    max-width: 500px;
    box-shadow: 0 8px 32px rgba(0,0,0,0.3);

    h3 {
      margin-top: 0;
      margin-bottom: 1.5rem;
    }

    table {
      width: 100%;
      margin-bottom: 1.5rem;

      tr {
        border-bottom: 1px solid #eee;
      }

      td {
        padding: 0.5rem;

        &:first-child {
          font-weight: 600;
        }
      }

      kbd {
        background: #f4f4f4;
        padding: 0.2em 0.5em;
        border-radius: 3px;
        border: 1px solid #ccc;
        font-size: 0.9em;
      }
    }

    button {
      width: 100%;
      padding: 0.75rem;
      background: #007bff;
      color: white;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      font-size: 1rem;

      &:hover {
        background: #0056b3;
      }
    }
  }
}
```

**Acceptance Criteria**:
- [x] Ctrl+/ shows modal
- [x] Lists all shortcuts
- [x] Close button works

**Definition of Done**: Help modal functional

---

### ✅ Sprint 4: Testing & Polish (5 Story Points)
**Goal**: Ensure everything works reliably
**Duration**: 0.5 day

#### Task 4.1: End-to-End Testing 🧪 (3 SP)
**Owner**: QA/Any Dev
**Effort**: 2 hours
**Manual testing checklist**

**Create**: `dev-tools/TESTING.md`
```markdown
# Manual Testing Checklist

## Backend Tests
- [ ] Server starts: `cd dev-tools/editor-backend && npm start`
- [ ] Health check: `curl http://localhost:3030/api/health`
- [ ] Save content (copy real file path):
  ```bash
  curl -X POST http://localhost:3030/api/content/save \
    -H "Content-Type: application/json" \
    -d '{"filePath":"blog/flat/pierwszy-post.md","content":"# Test","section":"blog"}'
  ```
- [ ] Check file was updated: `git diff content/blog/flat/pierwszy-post.md`
- [ ] Frontmatter preserved
- [ ] Rejects invalid path: `../../../etc/passwd`
- [ ] Rejects invalid section: `docs/test.md`

## Frontend Tests
- [ ] Hugo running: `npm run start`
- [ ] Toggle button visible in top-right
- [ ] Click toggle → status changes to ON
- [ ] Yellow dashed outline appears on content
- [ ] Click content → blue solid outline (editor active)
- [ ] Type text → formatting appears
- [ ] Type `### Test` → becomes H3
- [ ] Type `- Item` → becomes bullet list
- [ ] Wait 2 seconds → "💾 Saving..." → "✓ Saved"
- [ ] Check backend logs → POST /api/content/save [200]
- [ ] Press Ctrl+S → immediate save
- [ ] Press Esc → editor deactivates
- [ ] Refresh page → changes persisted
- [ ] Press Ctrl+/ → shortcuts modal appears

## Edge Cases
- [ ] Edit very long content (>1000 lines)
- [ ] Special characters: `<script>alert('xss')</script>`
- [ ] Unicode: Emoji 🎉, Polish: ąćęłńóśźż
- [ ] Stop backend mid-edit → error indicator
- [ ] localStorage backup created
- [ ] Multiple quick edits → only 1 save (debounce)

## Cross-Browser
- [ ] Chrome/Edge
- [ ] Firefox
- [ ] Safari (if available)
```

**Run through entire checklist**

**Definition of Done**: All tests pass, issues documented

---

#### Task 4.2: README Documentation 📚 (1 SP)
**Owner**: Tech Lead/Any Dev
**Effort**: 30 min

**Create**: `dev-tools/README.md`
```markdown
# 📝 Hugo Live Content Editor

In-browser markdown editor for development mode.

## 🚀 Quick Start

### 1. Start Backend
```bash
cd dev-tools/editor-backend
npm install  # First time only
npm start
```

Backend runs on `http://localhost:3030`

### 2. Start Hugo
```bash
npm run start
```

Hugo runs on `http://localhost:1313`

### 3. Use Editor
1. Open any blog post or tutorial
2. Click **Edit Mode: OFF** button (top-right) → becomes ON
3. Click on content to start editing
4. Type naturally - markdown formatting works live
5. Changes auto-save every 2 seconds
6. Press `Ctrl+/` for keyboard shortcuts

## ⌨️ Keyboard Shortcuts

- `Ctrl/Cmd + S` - Save immediately
- `Esc` - Exit editor
- `Ctrl/Cmd + /` - Show shortcuts
- `### + Space` - Create heading
- `- + Space` - Bullet list
- \` + text + \` - Inline code

## 🔧 Configuration

Edit `dev-tools/editor-backend/config.js`:
- Port (default: 3030)
- Allowed sections (default: blog, tutorials)
- Auto-save delay (default: 2000ms)

## 🐛 Troubleshooting

**"Connection refused"**
→ Backend not running. Start with `npm start` in editor-backend/

**"Section not allowed"**
→ Only blog/ and tutorials/ are editable by default

**Changes not saving**
→ Check browser console (F12) for errors
→ Check backend terminal for logs

**Frontmatter corrupted**
→ Restore from Git: `git checkout -- content/path/to/file.md`

## 📁 File Structure

```
dev-tools/editor-backend/
├── server.js              # Main entry point
├── config.js              # Configuration
├── routes/
│   └── content.routes.js  # API endpoints
├── services/
│   ├── ContentService.js  # File operations
│   └── ValidationService.js # Security
└── middleware/
    └── errorHandler.js    # Error handling
```

## 🔐 Security

- Only works on localhost
- Path traversal protection
- Section whitelist
- File existence validation
- Content size limits (5MB)
- XSS sanitization

## 💡 Tips

- Review changes with `git diff` before committing
- Use `Ctrl+S` frequently for peace of mind
- Backups stored in localStorage if save fails
- Only body content editable (frontmatter preserved)

## 📝 License

Part of iHome.zentala.io project
```

**Definition of Done**: README complete, clear instructions

---

#### Task 4.3: Package.json Scripts (1 SP)
**Owner**: Any Dev
**Effort**: 15 min

**Update**: Root `package.json`
```json
{
  "scripts": {
    "start": "hugo server --buildDrafts --disableFastRender",
    "start:backend": "cd dev-tools/editor-backend && npm start",
    "start:editor": "npm-run-all --parallel start start:backend",
    "build": "hugo --minify",
    "editor:install": "cd dev-tools/editor-backend && npm install"
  },
  "devDependencies": {
    "npm-run-all": "^4.1.5"
  }
}
```

**Install concurrently**:
```bash
npm install -D npm-run-all
```

**Now one command starts everything**:
```bash
npm run start:editor
```

**Definition of Done**: Single command starts both servers

---

## 📊 Summary

### Total Story Points: 41 SP
### Total Duration: ~2.5-3 days (1 developer) or ~1-1.5 days (2 developers in parallel)

### Dependency-Free Parallel Work:

**Can Start Immediately (Parallel)**:
- Sprint 0: Both tasks (0.1 + 0.2)
- Sprint 1: Tasks 1.1, 1.2, 1.3 (all independent)
- Sprint 2: Tasks 2.1, 2.2 (while backend is building)

**Sequential Dependencies**:
- Task 1.4 needs 1.3 (config)
- Task 1.5 needs 1.1, 1.2 (services)
- Task 1.6 needs 1.4, 1.5 (assembly)
- Task 2.3 needs 2.1 (API client)
- Task 2.4 needs 2.2, 2.3 (integration)
- Sprint 3 needs Sprint 2 (Tiptap on top of basic editor)

### Recommended Team Split:

**Backend Developer**:
- Sprint 0: Task 0.1
- Sprint 1: Tasks 1.1 → 1.3 → 1.4 → 1.5 → 1.6

**Frontend Developer**:
- Sprint 0: Task 0.2
- Sprint 1: Help with testing
- Sprint 2: Tasks 2.1 → 2.2 → 2.3 → 2.4 → 2.5
- Sprint 3: All tasks

**Both in Sprint 4**: Testing and documentation

---

## ✅ Definition of Done (DoD) - Project Level

A task is **DONE** when:
1. ✅ Code written and working locally
2. ✅ No console errors
3. ✅ Acceptance criteria met
4. ✅ Code committed to Git
5. ✅ Documented in code comments
6. ✅ Tested manually (no unit tests required for v1)
7. ✅ Other devs can use it (if it's a shared component)

---

## 10. Testing Strategy

### 10.1 Backend Tests

**ContentService Unit Tests**:
```javascript
describe('ContentService', () => {
  describe('validatePath', () => {
    it('should reject path traversal attempts', () => {
      expect(service.validatePath('../../../etc/passwd').valid).toBe(false)
    })

    it('should accept valid blog paths', () => {
      expect(service.validatePath('blog/post/index.md').valid).toBe(true)
    })

    it('should reject non-whitelisted sections', () => {
      expect(service.validatePath('docs/file.md').valid).toBe(false)
    })
  })

  describe('saveContent', () => {
    it('should preserve frontmatter when saving', async () => {
      const result = await service.saveContent('blog/test/index.md', '# New body')
      const content = await fs.readFile(result.filePath, 'utf-8')
      expect(content).toContain('---')
      expect(content).toContain('title:')
      expect(content).toContain('# New body')
    })
  })
})
```

**API Integration Tests**:
```javascript
describe('POST /api/content/save', () => {
  it('should save valid content', async () => {
    const response = await request(app)
      .post('/api/content/save')
      .send({
        filePath: 'blog/test/index.md',
        content: '# Test',
        section: 'blog'
      })

    expect(response.status).toBe(200)
    expect(response.body.success).toBe(true)
  })

  it('should reject malicious paths', async () => {
    const response = await request(app)
      .post('/api/content/save')
      .send({
        filePath: '../../../etc/passwd',
        content: 'hack',
        section: 'blog'
      })

    expect(response.status).toBe(400)
    expect(response.body.error).toBe('INVALID_PATH')
  })
})
```

### 10.2 Frontend Tests

**ContentEditor Unit Tests**:
```javascript
describe('ContentEditor', () => {
  it('should debounce auto-save', async () => {
    const saveSpy = jest.spyOn(editor.api, 'saveContent')

    editor.setContent('a')
    editor.setContent('ab')
    editor.setContent('abc')

    await wait(2100)

    expect(saveSpy).toHaveBeenCalledTimes(1)
  })

  it('should not save if content unchanged', async () => {
    editor.setContent('test')
    await editor.save()

    const saveSpy = jest.spyOn(editor.api, 'saveContent')
    await editor.save()

    expect(saveSpy).not.toHaveBeenCalled()
  })
})
```

### 10.3 Manual Test Cases

| Test | Steps | Expected |
|------|-------|----------|
| **Basic Edit** | 1. Toggle edit mode<br>2. Click article<br>3. Type text<br>4. Wait 2s | Content saved, indicator shows "✓ Saved" |
| **Markdown Formatting** | 1. Type `### Heading`<br>2. Press Enter | Renders as H3, file contains `###` |
| **Auto-Save** | 1. Edit content<br>2. Wait 2s<br>3. Check file | File updated with new content |
| **Error Recovery** | 1. Stop backend<br>2. Edit content<br>3. Wait 2s | Error indicator, content in localStorage |
| **Escape Key** | 1. Start editing<br>2. Press Esc | Editor deactivates, changes discarded |

---

## 11. Configuration Files

### 11.1 Backend `package.json`

```json
{
  "name": "hugo-editor-backend",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js",
    "test": "jest"
  },
  "dependencies": {
    "express": "^4.18.2",
    "cors": "^2.8.5",
    "gray-matter": "^4.0.3",
    "sanitize-html": "^2.11.0",
    "helmet": "^7.1.0"
  },
  "devDependencies": {
    "nodemon": "^3.0.1",
    "jest": "^29.7.0",
    "supertest": "^6.3.3"
  }
}
```

### 11.2 Root `package.json` (updated)

```json
{
  "scripts": {
    "start": "hugo server --buildDrafts --disableFastRender",
    "start:editor": "npm run start & npm run backend",
    "backend": "cd dev-tools/editor-backend && npm start",
    "build": "hugo --minify"
  },
  "devDependencies": {
    "@tiptap/core": "^3.0.0",
    "@tiptap/starter-kit": "^3.0.0",
    "@tiptap/extension-link": "^3.0.0",
    "@tiptap/extension-image": "^3.0.0",
    "@tiptap/extension-code-block-lowlight": "^3.0.0",
    "lowlight": "^3.1.0"
  }
}
```

**Note**:
- Using Tiptap 3.x (latest)
- No markdown extension needed (using custom HTML→MD converter)
- No DOMPurify needed (server-side sanitization sufficient)

---

## 12. Development Workflow

### 12.1 Startup

```bash
# Terminal 1: Start Hugo
npm run start

# Terminal 2: Start backend
npm run backend

# Or combined (if using concurrently)
npm run start:editor
```

### 12.2 Daily Usage

1. Open browser to `http://localhost:1313`
2. Click pencil icon (✏️) in navbar → Edit Mode activates (green)
3. Click any article text → Tiptap editor activates (blue outline)
4. Type naturally, formatting appears live (WYSIWYG)
5. **Press Ctrl+S to save** (changes auto-backup to localStorage every 1s)
6. Backend saves file → Hugo rebuilds → page refreshes
7. Continue editing or press Esc to exit editor
8. Review changes with `git diff`
9. Commit when satisfied

**Important**:
- ⚠️ **NO auto-save** - only saves on Ctrl+S (prevents constant Hugo rebuilds)
- ✅ **Auto-backup** - changes backed up to localStorage every 1s
- 🔔 **Unload warning** - browser warns if you try to leave with unsaved changes

---

## 13. Future Enhancements (Out of Scope for v1.0)

### Phase 2 Features
- [ ] Frontmatter editing (modal dialog)
- [ ] Image upload & management
- [ ] Multi-language support
- [ ] Docs section support
- [ ] Version history (local Git integration for viewing)

### Phase 3 Features
- [ ] Collaborative editing (WebSockets)
- [ ] AI-assisted writing (OpenAI integration)
- [ ] SEO suggestions panel
- [ ] Content analytics (word count, reading time)

---

## 14. Risks & Mitigations

| Risk | Impact | Likelihood | Mitigation |
|------|--------|------------|------------|
| Tiptap bundle size | High | Medium | Use tree-shaking, lazy load |
| File corruption | Critical | Low | Atomic writes, backups |
| Hugo rebuild slowness | Medium | Medium | Use `--disableFastRender` only when editing |
| Browser compatibility | Medium | Low | Test in Chrome/Firefox/Edge, use polyfills |
| Concurrent edits | Low | Low | Single user (dev mode), lock files if needed |

---

## 15. Success Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| **Save Latency** | < 200ms | API response time |
| **Auto-save Reliability** | > 99% | Error rate monitoring |
| **Markdown Fidelity** | 100% | Round-trip tests (save → read → compare) |
| **Editor Activation Time** | < 500ms | Time to interactive |
| **Bundle Size** | < 300KB | Webpack bundle analyzer |

---

## 16. Glossary

- **Content Body**: Markdown content below frontmatter
- **Frontmatter**: YAML/TOML metadata at top of .md files
- **WYSIWYG**: What You See Is What You Get
- **Debouncing**: Delaying function execution until after input stops
- **Path Traversal**: Security attack using `../` to access unauthorized files
- **Hot Reload**: Automatic browser refresh on file changes

---

## 17. References

- [Tiptap Documentation](https://tiptap.dev/introduction)
- [Hugo Content Management](https://gohugo.io/content-management/)
- [OWASP Path Traversal](https://owasp.org/www-community/attacks/Path_Traversal)
- [Express.js Best Practices](https://expressjs.com/en/advanced/best-practice-security.html)

