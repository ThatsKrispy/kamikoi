#!/usr/bin/env python3
"""
Optimize approved photos for the web.

Usage:
    1. Drop approved JPG/PNG photos into  _source-photos/
       (named exactly like the target slots in IMAGES.md, e.g.
        kamikoi-signature-sushi-rolls.jpg)
    2. python3 _optimize_photos.py

Each image is resized to a max of 1600px on the long edge and saved as an
optimized WebP into assets/images/ (same basename), replacing the placeholder.
"""
import os, glob
from PIL import Image, ImageOps

SRC = "_source-photos"
OUT = "assets/images"
MAX = 1600
QUALITY = 80

os.makedirs(OUT, exist_ok=True)
files = []
for ext in ("*.jpg", "*.jpeg", "*.png", "*.JPG", "*.JPEG", "*.PNG", "*.webp"):
    files += glob.glob(os.path.join(SRC, ext))

if not files:
    print(f"No images found in {SRC}/. Add the approved photos there first (see IMAGES.md).")
    raise SystemExit(0)

for f in sorted(files):
    base = os.path.splitext(os.path.basename(f))[0]
    out = os.path.join(OUT, base + ".webp")
    im = Image.open(f)
    im = ImageOps.exif_transpose(im).convert("RGB")
    w, h = im.size
    if max(w, h) > MAX:
        scale = MAX / max(w, h)
        im = im.resize((round(w * scale), round(h * scale)), Image.LANCZOS)
    im.save(out, "WEBP", quality=QUALITY, method=6)
    kb = os.path.getsize(out) // 1024
    print(f"  {base+'.webp':48} {im.size[0]}x{im.size[1]}  {kb} KB")

print(f"\nDone — {len(files)} image(s) optimized into {OUT}/")
