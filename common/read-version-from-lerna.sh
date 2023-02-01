#!/bin/bash

if [ -f "lerna.$CI_COMMIT_BRANCH.json" ]; then
  echo $(jq -r .version lerna.$CI_COMMIT_BRANCH.json)
else
  echo $(jq -r .version lerna.json)
fi
