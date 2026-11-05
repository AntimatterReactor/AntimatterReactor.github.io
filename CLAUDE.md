# CLAUDE.md

## Working style

- **AFWF = Ask First, Work Fast.** Ask every question up front: clarifications, scope, choices. Once answered, work autonomously without further check-ins. Weigh ultracode usage yourself.
- Cut useless subtext. No explanatory asides, hedges, or restated context in copy, comments, commits, or replies. It reads as an AI tell.

## Repo

- Jekyll site on GitHub Pages (`github-pages` gem), customised minima layouts + Bootstrap.
- Serve locally: `./run.sh`.
- Poems: `layout: poem` in front matter. One verse line per source line, blank line between stanzas.
- Poem series: parts go in `poem/<parent-slug>/_posts/YYYY-MM-DD-slug.md` with `title` and `part: N`. `_config.yml` defaults give them `layout: poem`, `series_child: true`, URL `/poem/<parent-slug>/<slug>/`. Parent slug comes from the folder (`categories[1]`). `_includes/series.html` resolves parent, parts, index. Parts are hidden from the Writing grid; the parent tile shows the part count.
- Projects: edit `_data/projects.yml`.
- Nav order: `header_pages` in `_config.yml`.
- Colors: Handheld tokens in `_sass/minima/_theme.scss` (`theme` and `frame` mixins per mode); alternatives in PALETTES.md. `--frame` colors top line, footer, and canvas (overscroll); footer reads `--frame-*` text tokens.
- Theme: `data-bs-theme` on `<html>`, set inline in `head.html` before paint, toggled by `assets/theme.js`.
- Design skill: frontend-design (github.com/anthropics/skills/tree/main/skills/frontend-design). REVIEW.md is an older apple-design-skill review, kept for history.
- Wordmark: Jacquard 24 at 48px (24px grid), `.site-title` in `_layout.scss`, loaded in `head.html`.
- Home: oracle line, random poem line from inline JSON built in `_layouts/home.html`, picked by `assets/oracle.js`.
- Writing: tile grid; All/Posts/Poems filter is CSS-only via `:has()` and `data-has-post`/`data-has-poem` on year groups.
- Sass is old Ruby Sass (github-pages): no `:not(:has())` (mangled), wrap `clamp()`/`min()` math in `unquote()`. Never search for `}` to find block ends in SCSS (`#{}` interpolation).
- Local build needs a UTF-8 locale: `LANG=C.UTF-8 ./run.sh`.
- `.githooks/pre-commit` blocks staged files over 1 MB (`MAX_FILE_BYTES` overrides). Enable per clone: `git config core.hooksPath .githooks`.
- Icons: `favicon.ico` (16/32/48), `assets/apple-touch-icon.png` (180), `assets/icon-512.png`, linked in `head.html`. Keep images quantized/optimized.
- Avoid Bootstrap class names for custom components (`.page-link` clashed with pagination).
- Decided against: custom JS rubber-band overscroll (Safari already native; scroll-jacking).
- Repo-only files (README.md, TODO.md, CLAUDE.md, PALETTES.md, REVIEW.md) are excluded from the build.
