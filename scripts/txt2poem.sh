#!/usr/bin/env bash
# Convert plain-text poems into Jekyll poem posts.
#
# Usage: scripts/txt2poem.sh [options] FILE.txt [FILE.txt ...]
#
#   -d YYYY-MM-DD  Post date (default: today)
#   -l LANG        Language code (default: id)
#   -p SLUG        Make a series part of the poem with this slug
#   -n N           Part number for the first file (default: next free number)
#   --draft        Write to _drafts/ instead of publishing
#   -f             Overwrite existing files
#   -h             Show this help
#
# Title: first line if it starts with "# ", otherwise the file name
# ("hujan-sore.txt" -> "Hujan Sore"). One verse line per line, blank line
# between stanzas.

set -euo pipefail

root=$(cd "$(dirname "$0")/.." && pwd)
date=$(date +%Y-%m-%d)
lang=id
parent=""
part=""
draft=0
force=0
files=()

usage() { sed -n '2,18p' "$0" | sed 's/^# \{0,1\}//'; }
die() { printf 'txt2poem: %s\n' "$1" >&2; exit 1; }

while [ $# -gt 0 ]; do
  case "$1" in
    -d) date=${2:?-d needs a date}; shift 2 ;;
    -l) lang=${2:?-l needs a language code}; shift 2 ;;
    -p) parent=${2:?-p needs a poem slug}; shift 2 ;;
    -n) part=${2:?-n needs a number}; shift 2 ;;
    --draft) draft=1; shift ;;
    -f) force=1; shift ;;
    -h|--help) usage; exit 0 ;;
    --) shift; files+=("$@"); break ;;
    -*) die "unknown option $1 (see -h)" ;;
    *) files+=("$1"); shift ;;
  esac
done

[ ${#files[@]} -gt 0 ] || { usage; exit 1; }
[[ $date =~ ^[0-9]{4}-[0-9]{2}-[0-9]{2}$ ]] || die "date must be YYYY-MM-DD, got '$date'"
[ -z "$part" ] || [[ $part =~ ^[0-9]+$ ]] || die "part must be a number, got '$part'"
[ -n "$parent" ] || [ -z "$part" ] || die "-n needs -p"

if [ -n "$parent" ]; then
  ls "$root"/_posts/*-"$parent".md >/dev/null 2>&1 || die "no parent poem _posts/*-$parent.md"
  base="poem/$parent"
  if [ -z "$part" ]; then
    last=$(cat "$root/$base"/_posts/*.md "$root/$base"/_drafts/*.md 2>/dev/null \
      | awk '/^part:/ { if ($2 > m) m = $2 } END { print m + 0 }' || true)
    part=$((last + 1))
  fi
else
  base=""
fi
dir="$root/${base:+$base/}$([ $draft -eq 1 ] && echo _drafts || echo _posts)"

for src in "${files[@]}"; do
  [ -f "$src" ] || die "no such file: $src"

  name=$(basename "$src"); name=${name%.*}
  slug=$(printf '%s' "$name" | tr '[:upper:]' '[:lower:]' | sed -E 's/[^a-z0-9]+/-/g; s/^-+|-+$//g')
  [ -n "$slug" ] || die "can't make a slug from '$name'"

  # Normalize: CRLF -> LF, strip trailing "\" and whitespace, collapse blank runs, trim ends.
  body=$(sed -e 's/\r$//' -e 's/[[:space:]]*\\\{0,1\}[[:space:]]*$//' "$src" | awk '
    /^[[:space:]]*$/ { blank = 1; next }
    { if (started && blank) print ""; print; started = 1; blank = 0 }')

  first=$(printf '%s\n' "$body" | head -n 1)
  if [[ $first == "# "* ]]; then
    title=${first#\# }
    body=$(printf '%s\n' "$body" | tail -n +2 | awk 'NF || started { started = 1; print }')
  else
    title=$(printf '%s' "$name" | sed -E 's/[-_]+/ /g' | awk '{ for (i = 1; i <= NF; i++) $i = toupper(substr($i, 1, 1)) substr($i, 2) } 1')
  fi
  [ -n "$body" ] || die "$src has no verse"

  if [ $draft -eq 1 ]; then out="$dir/$slug.md"; else out="$dir/$date-$slug.md"; fi
  if [ -e "$out" ] && [ $force -eq 0 ]; then die "${out#$root/} exists (use -f to overwrite)"; fi
  mkdir -p "$dir"

  esc_title=$(printf '%s' "$title" | sed 's/\\/\\\\/g; s/"/\\"/g')
  {
    echo "---"
    if [ -z "$parent" ]; then echo "layout: poem"; fi
    echo "title: \"$esc_title\""
    if [ $draft -eq 1 ]; then echo "date: $date"; fi
    if [ -z "$parent" ]; then echo "categories: poem"; fi
    if [ -n "$parent" ]; then echo "part: $part"; fi
    echo "lang: $lang"
    echo "---"
    echo
    printf '%s\n' "$body"
  } > "$out"

  printf '%s -> %s\n' "$src" "${out#$root/}"
  if [ -n "$parent" ]; then part=$((part + 1)); fi
done
