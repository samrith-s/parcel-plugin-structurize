# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [2.4.4](https://github.com/samrith-s/parcel-plugin-structurize/compare/v2.4.3...v2.4.4) (2021-05-28)

### [2.4.3](https://github.com/samrith-s/parcel-plugin-structurize/compare/v2.4.0...v2.4.3) (2021-04-26)


### Bug Fixes

* relative paths result in ENOENT ([7999314](https://github.com/samrith-s/parcel-plugin-structurize/commit/79993147e7b8c9a04c1d59284bc23c428b0b12b2))
* replace paths to assets globally ([609365b](https://github.com/samrith-s/parcel-plugin-structurize/commit/609365bad2615171ede9843a06b5065a95abee5f))

### [2.4.2](https://github.com/samrith-s/parcel-plugin-structurize/compare/v2.4.0...v2.4.2) (2021-04-25)


### Bug Fixes

* relative paths result in ENOENT ([7999314](https://github.com/samrith-s/parcel-plugin-structurize/commit/79993147e7b8c9a04c1d59284bc23c428b0b12b2))

### [2.4.1](https://github.com/samrith-s/parcel-plugin-structurize/compare/v2.4.0...v2.4.1) (2021-04-25)


### Bug Fixes

* relative paths result in ENOENT ([#31](https://github.com/samrith-s/parcel-plugin-structurize/issues/31)) ([c32ed84](https://github.com/samrith-s/parcel-plugin-structurize/commit/c32ed84ecfefe9e1d39c1aa6e24e2d74145b3387))

## [2.4.0](https://github.com/samrith-s/parcel-plugin-structurize/compare/v2.3.5...v2.4.0) (2021-03-15)


### Features

* add `flatten` option to structurizer ([4550c18](https://github.com/samrith-s/parcel-plugin-structurize/commit/4550c18c8001c165338247c54ea9216df0c1f433))
* implement `flatten` and fix [#31](https://github.com/samrith-s/parcel-plugin-structurize/issues/31) ([cea6eea](https://github.com/samrith-s/parcel-plugin-structurize/commit/cea6eeaf75d582dd3d0680597a64359cd8573091))

### [2.3.5](https://github.com/samrith-s/parcel-plugin-structurize/compare/v2.3.4...v2.3.5) (2021-03-15)


### Bug Fixes

* [#31](https://github.com/samrith-s/parcel-plugin-structurize/issues/31) ([e507bb2](https://github.com/samrith-s/parcel-plugin-structurize/commit/e507bb2c03a62ca65c6161ba686f48889b449d55))

### [2.3.4](https://github.com/samrith-s/parcel-plugin-structurize/compare/v2.3.3...v2.3.4) (2021-03-13)

### [2.3.3](https://github.com/samrith-s/parcel-plugin-structurize/compare/v2.3.2...v2.3.3) (2021-03-13)


### Bug Fixes

* [#34](https://github.com/samrith-s/parcel-plugin-structurize/issues/34) ([c9b1a17](https://github.com/samrith-s/parcel-plugin-structurize/commit/c9b1a1763b1ef8e5a21442098e26054e1916df3a))

### [2.3.2](https://github.com/samrith-s/parcel-plugin-structurize/compare/v2.3.1...v2.3.2) (2021-01-06)

### [2.3.1](https://github.com/samrith-s/parcel-plugin-structurize/compare/v2.3.0...v2.3.1) (2020-12-14)

## 2.3.0 (2020-12-05)


### Features

* **config:** added default config ([4b56d5a](https://github.com/samrith-s/parcel-plugin-structurize/commit/4b56d5a236f9e042e45d166e3007e6db51d12f09))
* **config:** added verbose logging function ([26d1c69](https://github.com/samrith-s/parcel-plugin-structurize/commit/26d1c69c77a689c0ad7e2643138995e66b8a8978))
* **config:** updated default config with fixed values and type ([ab95472](https://github.com/samrith-s/parcel-plugin-structurize/commit/ab954727aa36d1d658abea2e886bf3f71ccaf2e8))
* **core:** added checks for config rules ([52d3430](https://github.com/samrith-s/parcel-plugin-structurize/commit/52d3430251535d9fbda50490f21511bf002a0664))
* **core:** enabled support for nested directories ([2150f9e](https://github.com/samrith-s/parcel-plugin-structurize/commit/2150f9e1869bccf299489260170eacbec3a24497))
* **core:** implemented `AssetMap` ([1483bb6](https://github.com/samrith-s/parcel-plugin-structurize/commit/1483bb6d88de810f36be5844da3baf7511bf1459))
* **core:** implemented `FileManager` ([208983f](https://github.com/samrith-s/parcel-plugin-structurize/commit/208983f266b65bc7b85c031943e0a50ed5dbd6f2))
* **providers:** added `Bundler` provider ([2bd66ee](https://github.com/samrith-s/parcel-plugin-structurize/commit/2bd66ee3d2f7e96378c0ab038c0ac73c36c04a02))
* **providers:** added `Config` provider ([0c62618](https://github.com/samrith-s/parcel-plugin-structurize/commit/0c62618472c3ba6f38e955d32474f80506459835))
* **providers:** added `Package` provider ([b781911](https://github.com/samrith-s/parcel-plugin-structurize/commit/b781911fdeefb34c464de0aeae906ed951cd82b1))
* **scripts:** added prepare-test script ([e97df12](https://github.com/samrith-s/parcel-plugin-structurize/commit/e97df1271c79146d6188311efe016bc98849edd1))
* **scripts:** added run-build script for tests ([3a537fc](https://github.com/samrith-s/parcel-plugin-structurize/commit/3a537fc6e7cb166a7a2c9040ffbee3c912580dd7))
* added console information and exception handling ([f5ed3e0](https://github.com/samrith-s/parcel-plugin-structurize/commit/f5ed3e07e1cc0cf194d2394f17c84f47e3e2348e))
* updated default config and added logs util ([1bac5c6](https://github.com/samrith-s/parcel-plugin-structurize/commit/1bac5c620f28d138009721699d3a552801be1610))


### Bug Fixes

* **core:** ignored rewrite of image files ([86abecb](https://github.com/samrith-s/parcel-plugin-structurize/commit/86abecb0eb389fd5b3f7bf450b6e6c45b8212ff4))
* fixed invalid or unexpected values errors for rules ([d96e48d](https://github.com/samrith-s/parcel-plugin-structurize/commit/d96e48df8e49af255ba1b6c8c198434cda13faff))
* updated logs to fix chalk error and better display ([ef8eae4](https://github.com/samrith-s/parcel-plugin-structurize/commit/ef8eae4101265d346aa5ded4bd2b153daa699045))
* **core:** added proper path information to `AssetMap` ([d941386](https://github.com/samrith-s/parcel-plugin-structurize/commit/d94138633a92ddce5898cdb9f1425d1f471cb572))
* **core:** fixed issue with config finder in `AssetMap` ([5bd6f58](https://github.com/samrith-s/parcel-plugin-structurize/commit/5bd6f58a9c367ed8256cb08f1282f9159430b069))
* **lint:** fixed linting issues ([1568892](https://github.com/samrith-s/parcel-plugin-structurize/commit/1568892cefcb1c23da36b49dc922eb7e4f033586))
* **providers:** fixed `publicUrl` error in bundler config ([c0a85d8](https://github.com/samrith-s/parcel-plugin-structurize/commit/c0a85d86c4980697cec637a623f7cd699fb6565e))
* **providers:** Removed `Package` provider and added `Config.init` function ([9de7493](https://github.com/samrith-s/parcel-plugin-structurize/commit/9de74931eb448e87fe99aed4faa14b9f31129188))
* fixed issue with versioning ([be4ecf4](https://github.com/samrith-s/parcel-plugin-structurize/commit/be4ecf49e39bb96bbcedfe7ef3125bc8fc00f42e))
* updated prepare-bundles to reflect updated paths ([0a39192](https://github.com/samrith-s/parcel-plugin-structurize/commit/0a391928cc95514ef980dd984b3123cdcb397be4))
