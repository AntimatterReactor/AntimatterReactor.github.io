# Design review: Factual Obelisk

Reviewed 2026-11-02 against Apple's Human Interface Guidelines via [apple-design-skill](https://github.com/dickwu/apple-design-skill). Web site, so principles and foundations apply (accessibility, color, typography, layout, writing); Apple platform conventions don't. Checked at 1280 and 375 px, light and dark.

Status: **Fixed** in this pass, **Open** needs your content or decision.

## Summary

Rating before fixes: **Critical issues**. After: **Good**.

Thesis: a personal site where an absurdist poet and a mobile developer share one roof. The script wordmark was the only thing it would be remembered by; the rest was stock Bootstrap blue on white. Monsoon palette and a reading serif for poems now carry the subject. Remaining gaps are content: Résumé and Now are empty headings.

## Critical

### Mobile menu unreachable by keyboard — Fixed
- **What**: menu checkbox was `display: none`, so it left the tab order. Keyboard and switch users on narrow screens couldn't open navigation.
- **Why**: `accessibility.md › Speech`: "Let people use the keyboard alone to navigate and interact with your app."
- **Fix**: checkbox visually hidden but focusable, carries `aria-label="Menu"`, focus ring drawn on the icon. Skip link added before the header.

## Improvements

### Poem language not declared — High, Fixed
- **What**: Hujan is Indonesian, page declared `lang="en"`. Screen readers read it with English pronunciation.
- **Why**: `voiceover.md`: "VoiceOver reads elements in the same order people read content in the their active language and locale."
- **Fix**: `lang: id` in Hujan's front matter; poem layout applies it to the article.

### Two competing H1s on Home — Medium, Fixed
- **What**: "Home" heading above "The Absurd". Navigation label repeated as content.
- **Why**: `layout.md › Visual hierarchy`: "Order content by relative importance."
- **Fix**: page title hidden on Home; post list labelled "Latest".

### Camus quote rendered as a bullet list — Medium, Fixed
- **What**: attribution line parsed as a list item inside the blockquote, with minima's `letter-spacing: -1px` squeezing the quote.
- **Fix**: `<figure>` with `<blockquote>` and `<figcaption>`, accent rule, normal tracking.

### Inconsistent date formats — Medium, Fixed
- **What**: "Sat, 2024-12-07" on poems, "Dec 7, 2024" on lists.
- **Why**: `writing.md › Best practices`: "Build language patterns. Consistency builds familiarity."
- **Fix**: one format, `%b %-d, %Y`, set in `_config.yml`.

### SoundCloud icon invisible in dark mode — Medium, Fixed
- **What**: inline SVG had no fill, rendered black on `#111A1D`.
- **Why**: `color.md › Best practices`: "Make sure all your app's colors work well in light, dark, and increased contrast contexts."
- **Fix**: `fill="currentColor"`. All footer icons `aria-hidden` since the link text names them.

### Duplicate Twitter and X icons — Low, Fixed
- **Fix**: X icon only.

### Site name repeated in footer — Low, Fixed
- **Why**: `branding.md › Best practices`: "Resist the temptation to display your logo throughout your app or game unless it's essential for providing context."
- **Fix**: footer opens with "© 2026 Ezra Alvarion".

### Unstyled lists indented — Low, Fixed
- **What**: minima's `ul { margin-left: 30px }` overrode Bootstrap's `.list-unstyled`, misaligning footer columns and the Writing list.
- **Why**: `layout.md › Visual hierarchy`: "Align elements to make them easier to scan."

### 404 page dead end — Medium, Fixed
- **What**: "Page not found :(" with no way forward; its inline `h1` style leaked to every heading on the page.
- **Why**: `writing.md › Best practices`: "Provide clear next steps on any blank screens."
- **Fix**: links to Home and Writing, scoped styles.

### Justified post text — Low, Fixed
- **What**: `text-justify` on posts opens rivers on narrow screens.
- **Fix**: left-aligned serif body.

### Broken `datetime` on posts — Low, Fixed
- **What**: `date_to: xmlschema` isn't a Liquid filter; `datetime` attribute rendered wrong.
- **Fix**: `date_to_xmlschema`.

### Résumé and Now are empty headings — Medium, Open
- **What**: "Education", "Experience", "Now", "Uses" with nothing under them. Reads unfinished.
- **Why**: `writing.md › Best practices`: "Provide clear next steps on any blank screens."
- **Fix**: fill them, or drop `resume.md` and `now.md` from `header_pages` until filled.

### About page copy — Low, Open
- **What**: fragments ("I'm still a student", "Indonesia"), trailing comma after "Twitter/X". Covered by TODO.md "redesign the textual content".

## Craft notes

### Palette — High, Fixed
- **What**: Bootstrap default blue `#0D6EFD` on near-white. No relation to the subject.
- **Fix**: Monsoon (`PALETTES.md`), taken from Hujan: rain slate surfaces, teal for links and focus only, amber reserved for project status. One color, one meaning (`color.md › Best practices`: "Avoid using the same color to mean different things."). Every text token ≥ 4.5:1 in both modes: body 13.5 / 13.7, muted 5.3 / 6.8, accent 5.8 / 7.7.

### Typography — Medium, Fixed
- **Verdict**: keep Lavishly Yours for the wordmark only. At 32 px it stays legible (`typography.md › Using custom fonts`: "Make sure custom fonts are legible.") and it is the site's signature. Keep system sans for navigation and UI.
- **Added**: Literata for poems, posts, and the epigraph. A text serif with optical sizes, not a display face. Three families total, each with one job (`typography.md › Conveying hierarchy`: "Minimize the number of typefaces you use, even in a highly customized interface.").
- **Poems**: each verse line is a block with a hanging indent, so a wrapped line on a phone reads as one line, not two.
- Fonts load via `<link>` with preconnect instead of a CSS `@import` chain.

### Signature
The script wordmark, quiet everywhere else. Nothing to remove.

## What works
- Navigation: six one-word sections, current page marked bold and `aria-current`.
- 44 px targets for the menu and theme buttons on mobile.
- Projects empty state points to GitHub.
- Poems need no markup: one line per line, blank line per stanza.

## Platform notes

### Theme toggle vs. Apple guidance — trade-off, kept
`dark-mode.md › Best practices`: "Avoid offering an app-specific appearance setting." Apple's reasoning is that people set appearance once, system-wide. The toggle stays because you asked for it, and it follows the OS setting until clicked, so people who never touch it get Apple's behavior.
