#!/bin/bash
set -e

# Ask release or release candidate
read -p "Release next version or release candidate? (r/c): " choice

is_rc=false
# Ignore case
case "$choice" in
  r|R ) ;;
  c|C ) is_rc=true ;;
  * ) echo "Invalid choice. Please enter 'r' for release or 'c' for release candidate."; exit 1 ;;
esac

if [ "$is_rc" = true ]; then
  # Check if the last tag is a release candidate
  # --prerelease only increments patch version for rc regardless of commit messages
  last_tag=$(git describe --tags --abbrev=0)
  if [[ $last_tag != *"-rc."* ]]; then
    read -p "Release type? (major/minor/patch): " release_type
    case "$release_type" in
      major|minor|patch ) ;;
      * ) echo "Invalid choice. Please enter 'major', 'minor', or 'patch'."; exit 1 ;;
    esac
    npx changelogen --clean --release --pre${release_type} rc
  else
      npx changelogen --clean --release --prerelease rc
  fi
else
  npx changelogen --clean --release
fi
