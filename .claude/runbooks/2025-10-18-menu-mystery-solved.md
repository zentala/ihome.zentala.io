# Mystery Solved: Why Menu Worked Before - 2025-10-18

## Discovery

**Current state (local):**
- Menu działa poprawnie - wszystkie 4 linki widoczne (Blog, Poradniki, Teoria, Usługi)
- Config: `disableLanguages = ["en", "de", "nl"]` od początku projektu

**The Question:**
Dlaczego wcześniej nie musiałeś synchronizować `menus.en.toml` z `menus.pl.toml`?

## Investigation

### Config History:
```bash
git show 124b68d:config/_default/hugo.toml
# Od samego początku:
defaultContentLanguage = "pl"
disableLanguages = ["en", "de", "nl"]
```

### Menu Files History:
```bash
git show 186ba04:config/_default/menus/menus.en.toml
# EN menu miało tylko 2 linki:
[[main]]
  name = "Docs"
  url = "/docs/concepts/smart-home"  # OLD URL
  weight = 10

[[main]]
  name = "Blog"
  url = "/blog/"
  weight = 30
```

### PL Menu (always correct):
```toml
[[main]]
  name = "Teoria"
  url = "/docs/systems/inteligentny-dom/"
  weight = 35

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
  identifier = "services"
  url = "/services/"
  weight = 40
```

## The Answer

**Hugo DOES respect `disableLanguages`!**

When `disableLanguages = ["en"]`, Hugo:
1. Ignores `menus.en.toml` entirely
2. Uses `menus.pl.toml` for ALL pages (including root `/`)
3. This is correct behavior

**What changed that broke it?**

Sprawdzamy dalej...
