# AntimatterReactor.github.io

Personal site of Ezra Alvarion. Jekyll on GitHub Pages, with customised minima layouts and Bootstrap.

## Run locally

```bash
bundle install
./run.sh
```

## Hooks

Enable once per clone. Blocks commits with files over 1 MB.

```bash
git config core.hooksPath .githooks
```

## Layout

- `_posts/`: posts and poems (`layout: poem` for verse)
- `poem/<parent-slug>/_posts/`: parts of a poem series (`part: N` in front matter)
- `_data/projects.yml`: entries for the Projects page
- `_layouts/`, `_includes/`, `_sass/`: modified minima

See `TODO.md` for planned work.
