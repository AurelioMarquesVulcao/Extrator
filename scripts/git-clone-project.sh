#!/bin/bash

git clone https://VersionToken:$VERSION_ACCESS_TOKEN@$CI_SERVER_HOST/$CI_PROJECT_PATH.git project
cd project
git checkout $CI_COMMIT_BRANCH
