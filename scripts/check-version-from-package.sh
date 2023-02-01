#!/bin/bash

package_version=$($VERSIONIZE_PATH/common/read-version-from-package.sh)
  
cp package.json package.$CI_COMMIT_BRANCH.json

tmp=$(mktemp)
jq ".version = \"$package_version\"" package.$CI_COMMIT_BRANCH.json > "$tmp" && mv "$tmp" package.$CI_COMMIT_BRANCH.json

mv package.json _package.json
mv package.$CI_COMMIT_BRANCH.json package.json
