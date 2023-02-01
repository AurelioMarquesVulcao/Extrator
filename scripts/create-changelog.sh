#!/bin/bash

if [ -f "CHANGELOG.md" ]; then
  mv CHANGELOG.md CHANGELOG-$CI_COMMIT_BRANCH.md
fi
