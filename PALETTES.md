# Palettes

Contrast ratios against `bg`. All text and accent tokens meet WCAG AA (4.5:1).

## Monsoon

Rain slate, teal, street-lamp amber. From *Hujan*.

| Token | Light | Dark | Role |
| --- | --- | --- | --- |
| bg | `#F5F7F6` | `#111A1D` | Page |
| surface | `#DFE6E4` | `#1D2A2E` | Code, table stripes, hover |
| border | `#B4C0BE` | `#3A4C52` | Rules, outlines |
| ink | `#1C2629` (14.4) | `#DDE4E2` (13.7) | Body text |
| strong | `#0F1719` (16.9) | `#F2F5F4` (16.1) | Headings, wordmark |
| muted | `#56656A` (5.6) | `#93A3A6` (6.8) | Dates, captions |
| accent | `#23656A` (6.2) | `#73B7B3` (7.7) | Links, focus |
| accent-hover | `#174A4E` (9.2) | `#A3D4D1` (10.8) | Link hover |
| signal | `#8A500E` (6.0) | `#E2A955` (8.4) | Status only |
| frame | `#1C2629` | `#2A3B41` | Top line, footer, overscroll |

Text on frame, both modes: ink `#DDE4E2`, muted `#9FAFB2`, accent `#7FC2BE`, accent-hover `#A3D4D1`. All ≥ 5:1 on either frame.

## Batik

Indigo wedel, sogan brown. Javanese batik.

| Token | Light | Dark |
| --- | --- | --- |
| bg | `#F1F0EC` | `#141826` |
| ink | `#1B2238` (13.8) | `#E6E3DA` (13.8) |
| muted | `#5A5F6E` (5.6) | `#A3A3AA` (7.0) |
| accent | `#7A4A1E` (6.5) | `#D49A5E` (7.2) |
| signal | `#2E4C8C` (7.3) | `#8FAEE8` (7.9) |

## Handheld (in use)

Olive LCD greens, brick red. Early handheld consoles.

| Token | Light | Dark |
| --- | --- | --- |
| bg | `#E8EBDF` | `#141A12` |
| ink | `#1F2A1A` (12.4) | `#DCE3CF` (13.4) |
| muted | `#55604A` (5.5) | `#9AA68C` (6.9) |
| accent | `#3E6B1F` (5.2) | `#A7C46A` (9.1) |
| signal | `#8C3B2E` (6.3) | `#E08A74` (6.8) |

Handheld as deployed, full tokens:

| Token | Light | Dark |
| --- | --- | --- |
| bg | `#E8EBDF` | `#141A12` |
| surface | `#DCE1CF` | `#1E271B` |
| border | `#A9B496` | `#3A4733` |
| ink | `#1F2A1A` (12.4) | `#DCE3CF` (13.4) |
| strong | `#121A0E` (14.7) | `#EEF2E6` (15.6) |
| muted | `#4F5A44` (6.0) | `#9AA68C` (6.9) |
| accent | `#3B661D` (5.6) | `#A7C46A` (9.1) |
| accent-hover | `#2A4A14` (8.3) | `#C6DC93` (11.9) |
| signal | `#8C3B2E` (6.3) | `#E08A74` (6.8) |
| frame | `#4E5D39` | `#22301C` |
| frame ink | `#F1F4EA` (6.4) | `#DCE3CF` (10.6) |
| frame muted | `#D2DABF` (4.9) | `#9AA68C` (5.4) |
| frame accent | `#DDEFAE` (5.8) | `#A7C46A` (7.1) |

Swap palettes in `_sass/minima/_theme.scss`.
