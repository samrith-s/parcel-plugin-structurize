yarn install --frozen-lockfile;
yarn link;
(cd __tests__/bundle && yarn link parcel-plugin-structurize);
rm -rf ./.yarn-metadata.json