#!/bin/bash
package_dir=chatwork-replace-icons-extension
mkdir $package_dir
cp -r src/css $package_dir
cp -r src/js $package_dir
cp src/manifest.json $package_dir
cp src/options.html $package_dir
