# AntimatterReactor.github.io

Personal site of Ezra Alvarion. Jekyll on GitHub Pages, with customised minima layouts and Bootstrap.

## Run locally

```bash
bundle install
./run.sh
```

## Adding poems

Write the poem as plain text, one verse line per line, blank line between stanzas. Optional first line `# Title`; otherwise the file name becomes the title.

```bash
scripts/txt2poem.sh hujan.txt
```

```bash
scripts/txt2poem.sh -d 2024-12-07 -l en poem-a.txt poem-b.txt
```

```bash
scripts/txt2poem.sh -p hujan gerimis.txt
```

`-p SLUG` adds a series part (next free part number, or `-n N`). `--draft` writes to `_drafts/`; preview with `./run.sh --drafts`. `-f` overwrites. `-h` for all options.

## Hooks

Enable once per clone. Blocks commits with files over 1 MB.

```bash
git config core.hooksPath .githooks
```

## Layout

- `_posts/`: posts and poems (`layout: poem` for verse)
- `poem/<parent-slug>/_posts/`: parts of a poem series (`part: N` in front matter)
- `_data/projects.yml`: entries for the Projects page
- `_tools/` + `assets/tools/`: browser tools at `/tools/`
- `_layouts/`, `_includes/`, `_sass/`: modified minima

See `TODO.md` for planned work.
