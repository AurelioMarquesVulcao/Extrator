#!/bin/bash

target_branch=$1

main_version=$($VERSIONIZE_PATH/common/read-version-from-lerna.sh)

npx lerna exec VERSIONIZE_PATH=$VERSIONIZE_PATH $VERSIONIZE_PATH/after_scripts/copy-package-version-to-branch.sh $target_branch

if [ main_version != "independent" ]; then
  # for root
  
  if [ -f "lerna.$target_branch.json" ]; then
    tmp=$(mktemp)
    jq ".version = \"$main_version\"" lerna.$target_branch.json > "$tmp" && mv "$tmp" lerna.$target_branch.json
  fi
fi
