yarn install;
yarn link;
(cd tests/bundle-html && yarn link parcel-plugin-structurize && yarn install);
(cd tests/bundle-vue && yarn link parcel-plugin-structurize && yarn install);
rm -rf .yarn-metadata.json