yarn install;
yarn link;
(cd bundles/bundle-html && yarn link parcel-plugin-structurize && yarn install);
(cd bundles/bundle-vue && yarn link parcel-plugin-structurize && yarn install);
rm -rf .yarn-metadata.json