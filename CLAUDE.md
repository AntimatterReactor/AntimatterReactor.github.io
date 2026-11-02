# CLAUDE.md

## Working style

- **AFWF = Ask First, Work Fast.** Ask every question up front: clarifications, scope, choices. Once answered, work autonomously without further check-ins. Weigh ultracode usage yourself.
- Cut useless subtext. No explanatory asides, hedges, or restated context in copy, comments, commits, or replies. It reads as an AI tell.

## Repo

- Jekyll site on GitHub Pages (`github-pages` gem), customised minima layouts + Bootstrap.
- Serve locally: `./run.sh`.
- Poems: `layout: poem` in front matter. One verse line per source line, blank line between stanzas.
- Projects: edit `_data/projects.yml`.
- Nav order: `header_pages` in `_config.yml`.
- Colors: Monsoon tokens in `_sass/minima/_theme.scss`; alternatives in PALETTES.md. `--frame` colors top line, footer, and canvas (overscroll). Footer uses its own `$frame-*` text tokens.
- Theme: `data-bs-theme` on `<html>`, set inline in `head.html` before paint, toggled by `assets/theme.js`.
- Design reviews: apple-design-skill (github.com/dickwu/apple-design-skill). Findings and status in REVIEW.md.
- Local build needs a UTF-8 locale: `LANG=C.UTF-8 ./run.sh`.
- Avoid Bootstrap class names for custom components (`.page-link` clashed with pagination).
- Decided against: custom JS rubber-band overscroll (Safari already native; scroll-jacking).
- Repo-only files (README.md, TODO.md, CLAUDE.md, PALETTES.md, REVIEW.md) are excluded from the build.
