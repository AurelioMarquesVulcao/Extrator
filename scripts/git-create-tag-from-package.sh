#!/bin/bash

package_version=$($VERSIONIZE_PATH/common/read-version-from-package.sh)
package_name=$($VERSIONIZE_PATH/common/read-name-from-package.sh)
git tag -a "$package_name@v$package_version" -m "chore(release): $package_name@v$package_version [ci skip]"
