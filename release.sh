#!/bin/bash
now=$(date +"%d%m%y_%H%M%s")
git tag release-$now
git push origin release-$now
