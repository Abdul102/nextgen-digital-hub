#!/bin/bash
# Run this ONCE after migrating to Next.js to remove old static files.
# Usage:
#   chmod +x cleanup-old-files.sh
#   ./cleanup-old-files.sh
#   git add -A && git commit -m "Clean up old static files" && git push

set -e

echo "Removing old static HTML files..."
rm -f index.html services.html about.html projects.html blog.html contact.html

echo "Removing old CSS/JS folders (now in app/globals.css and React components)..."
rm -rf css js

echo "Removing old static api folder (now in app/api/)..."
rm -rf api

echo "Removing legacy netlify.toml (Next.js doesn't need it)..."
rm -f netlify.toml

echo ""
echo "Done. Now run:"
echo "  git add -A"
echo "  git commit -m 'Migrate to Next.js MERN stack'"
echo "  git push"
