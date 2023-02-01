#!/bin/bash

if [ -f "CHANGELOG-$CI_COMMIT_BRANCH.md" ]; then
  mv CHANGELOG-$CI_COMMIT_BRANCH.md CHANGELOG.md
fi
