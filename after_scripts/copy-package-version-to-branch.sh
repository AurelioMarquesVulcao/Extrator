#!/bin/bash

target_branch=$1

package_version=$($VERSIONIZE_PATH/common/read-version-from-package.sh)

if [ -f "package.$target_branch.json" ]; then
  tmp=$(mktemp)
  jq ".version = \"$package_version\"" package.$target_branch.json > "$tmp" && mv "$tmp" package.$target_branch.json
fi
