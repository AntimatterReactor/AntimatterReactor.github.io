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
- Repo-only files (README.md, TODO.md, CLAUDE.md) are excluded from the build.
