#!/bin/bash

if [ $CI_COMMIT_BRANCH == $PRODUCTION_BRANCH ]; then
  npx lerna version --no-push --no-git-tag-version --yes
fi


if [ $CI_COMMIT_BRANCH == $STAGING_BRANCH ] || [ $CI_COMMIT_BRANCH == $DEVELOP_BRANCH ]; then
  npx lerna version --conventional-prerelease --preid $CI_COMMIT_BRANCH --no-push --no-git-tag-version --yes
fi
