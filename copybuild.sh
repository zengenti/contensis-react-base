npm run roll:lib
PROJECT_PATH='/Users/jackwalden/Documents/GitLab/on-crops-main/node_modules/zengenti-isomorphic-base'
cp package.json $PROJECT_PATH
cp package-lock.json $PROJECT_PATH
rm -rf $PROJECT_PATH/cjs
cp -rv cjs $PROJECT_PATH/cjs
rm -rf $PROJECT_PATH/esm
cp -rv esm $PROJECT_PATH/esm
