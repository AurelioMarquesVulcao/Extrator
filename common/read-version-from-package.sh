#!/bin/bash

if [ -f "package.$CI_COMMIT_BRANCH.json" ]; then
  echo $(jq -r .version package.$CI_COMMIT_BRANCH.json)
else
  echo $(jq -r .version package.json)
fi
