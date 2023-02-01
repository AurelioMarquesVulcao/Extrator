#!/bin/bash

main_version=$($VERSIONIZE_PATH/common/read-version-from-lerna.sh)

git add .
git commit -n -m "chore(release): publish $main_version [ci skip]"

if [ main_version == "independent" ]; then
  # for each package
  VERSIONIZE_PATH=$VERSIONIZE_PATH npx lerna exec $VERSIONIZE_PATH/common/git-create-tag-from-package.sh
else
  # for root
  git tag -a v$main_version -m "chore(release): v$main_version [ci skip]"
fi

git push -o ci-skip --follow-tags https://VersionToken:$VERSION_ACCESS_TOKEN@$CI_SERVER_HOST/$CI_PROJECT_PATH.git HEAD:$CI_COMMIT_BRANCH
