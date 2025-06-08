#!/usr/bin/env bash
set -euo pipefail

# Quality level for WebP (0–100)
QUALITY=80
# Directory where your source images live
SRC_DIR="images"

# List of “basename widths…” entries
IMAGES=(
  "comm_soccer             400 800"
)

# Ensure cwebp is installed
if ! command -v cwebp &>/dev/null; then
  echo "❌ cwebp not found – please install the WebP tools first" >&2
  exit 1
fi

echo "🔄 Generating WebP variants…"

for entry in "${IMAGES[@]}"; do
  # split the line into $name and the widths
  set -- $entry
  name=$1
  shift

  # choose file extension based on prefix
  case "$name" in
    comm_*) ext=jpg ;;
    *)       ext=png ;;
  esac

  for w in "$@"; do
    in="$SRC_DIR/${name}.${ext}"
    out="$SRC_DIR/${name}-${w}w.webp"
    echo "  • Converting ${in} → ${out} (${w}px wide)"
    cwebp -q "$QUALITY" -resize "$w" 0 "$in" -o "$out"
  done
done

echo "✅ WebP generation complete."
