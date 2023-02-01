#!/bin/bash

target_branch=$1

cp CHANGELOG-$CI_COMMIT_BRANCH.md CHANGELOG-$target_branch.md
