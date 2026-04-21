#!/usr/bin/env python3
"""
build.py — Scans each image subfolder and writes a manifest.json
so the gallery pages can auto-load all images without manual listing.

Usage:
    python build.py

Run this once locally before pushing, OR let the GitHub Action do it
automatically on every push (see .github/workflows/build.yml).
"""

import json
import os

# Image file extensions to include
IMAGE_EXTENSIONS = {'.jpg', '.jpeg', '.png', '.gif', '.webp', '.avif'}

# Folders to scan (relative to this script)
SCAN_FOLDERS = [
    'images/work',
    'images/digital',
    'images/sketchbook-april-ongoing',
    'images/sketchbook-jan-feb',
    'images/sketchbook-nov-jan',
    'images/sketchbook-feb-april',
    'images/sketchbook-april4th-april12th'
]

def scan_folder(folder_path):
    """Return a sorted list of image filenames in the given folder."""
    if not os.path.isdir(folder_path):
        print(f"  [skip] {folder_path} — folder does not exist yet")
        return []

    files = []
    for f in sorted(os.listdir(folder_path)):
        ext = os.path.splitext(f)[1].lower()
        if ext in IMAGE_EXTENSIONS:
            # Store as a relative path from the site root
            files.append(f'{folder_path}/{f}')

    return files

def main():
    print("Building image manifests…\n")
    total = 0

    for folder in SCAN_FOLDERS:
        images = scan_folder(folder)
        manifest_path = os.path.join(folder, 'manifest.json')

        # Always write the manifest (even if empty, so fetch doesn't 404)
        os.makedirs(folder, exist_ok=True)
        with open(manifest_path, 'w') as f:
            json.dump(images, f, indent=2)

        print(f"  {folder}/manifest.json  →  {len(images)} image(s)")
        total += len(images)

    print(f"\nDone. {total} image(s) across {len(SCAN_FOLDERS)} folder(s).")

if __name__ == '__main__':
    main()
