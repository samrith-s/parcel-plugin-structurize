yarn install;
yarn link;
(cd __tests__/bundle && yarn link parcel-plugin-structurize && yarn install);
rm -rf ./.yarn-metadata.json