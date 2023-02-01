#!/bin/bash

if [ $CI_COMMIT_BRANCH != $PRODUCTION_BRANCH ]; then

  main_version=$($VERSIONIZE_PATH/common/read-version-from-lerna.sh)

  npx lerna exec $VERSIONIZE_PATH/scripts/create-version-from-package.sh

  if [ main_version != "independent" ]; then
    # for root
    mv lerna.json lerna.$CI_COMMIT_BRANCH.json
    mv _lerna.json lerna.json
  fi

fi
