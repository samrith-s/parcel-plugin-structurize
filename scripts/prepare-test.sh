rm -rf yarn.lock
yarn install;
yarn link;
(cd __tests__/bundle && rm -rf yarn.lock && yarn link parcel-plugin-structurize && yarn install);
rm -rf ./.yarn-metadata.json