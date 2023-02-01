#!/bin/bash

if [ $CI_COMMIT_BRANCH != $PRODUCTION_BRANCH ]; then

  main_version=$($VERSIONIZE_PATH/common/read-version-from-lerna.sh)

  VERSIONIZE_PATH=$VERSIONIZE_PATH npx lerna exec $VERSIONIZE_PATH/scripts/check-version-from-package.sh


  if [ main_version != "independent" ]; then
    # for root

    cp lerna.json lerna.$CI_COMMIT_BRANCH.json

    tmp=$(mktemp)
    jq ".version = \"$main_version\"" lerna.$CI_COMMIT_BRANCH.json > "$tmp" && mv "$tmp" lerna.$CI_COMMIT_BRANCH.json

    mv lerna.json _lerna.json
    cp lerna.$CI_COMMIT_BRANCH.json lerna.json
  fi

fi
