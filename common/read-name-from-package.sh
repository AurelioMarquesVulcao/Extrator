#!/bin/bash

if [ -f "package.$CI_COMMIT_BRANCH.json" ]; then
  echo $(jq -r .name package.$CI_COMMIT_BRANCH.json)
else
  echo $(jq -r .name package.json)
fi
