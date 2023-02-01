#!/bin/bash

execProcess() {
  target_branch=$1

  echo "##################################################################"
  echo "##### MERGING $CI_COMMIT_BRANCH INTO $target_branch ####"
  echo "##################################################################"

  git checkout $target_branch 
  git pull --ff-only


  git merge --no-ff -X theirs $CI_COMMIT_BRANCH

  $VERSIONIZE_PATH/after_scripts/replace-changelog.sh $target_branch
  npx lerna exec $VERSIONIZE_PATH/after_scripts/replace-changelog.sh $target_branch
  VERSIONIZE_PATH=$VERSIONIZE_PATH $VERSIONIZE_PATH/after_scripts/copy-version-to-branch.sh $target_branch
  
  git add .
  git commit -m "chore(versionize): Merge $CI_COMMIT_BRANCH on $target_branch"
  git push -o --follow-tags https://VersionToken:$VERSION_ACCESS_TOKEN@$CI_SERVER_HOST/$CI_PROJECT_PATH.git $target_branch:$target_branch
}

cd project

git checkout $CI_COMMIT_BRANCH
git fetch --all --tags
git reset --hard HEAD
git pull --ff-only

if [ $CI_COMMIT_BRANCH == $PRODUCTION_BRANCH ]; then
  git for-each-ref 'refs/remotes/origin/*' | \
    while read rev type ref; do
    branch=$(expr "$ref" : 'refs/remotes/origin/\(.*\)' )
    revs=$(git rev-list $rev..$CI_COMMIT_BRANCH)
    if [ -n "$revs" ]; then
      if [ $branch == $STAGING_BRANCH ] || [ $branch == $DEVELOP_BRANCH ]; then
        execProcess $branch
      fi
    fi
  done
fi

# if [ $CI_COMMIT_BRANCH == $STAGING_BRANCH ]; then
#   execProcess $DEVELOP_BRANCH
# fi
