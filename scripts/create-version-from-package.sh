#!/bin/bash

mv package.json package.$CI_COMMIT_BRANCH.json
mv _package.json package.json
