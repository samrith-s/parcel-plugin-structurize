yarn install --forzen-lockfile;
yarn build;
yarn link;
(cd __tests__/bundle && yarn link parcel-plugin-structurize);