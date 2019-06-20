# parcel-plugin-structurize

A [Parcel][parcel] plugin that lets you organize your build directory into any structure.

## Why?

Currently, Parcel builds everything in a flat structure. Sometimes, we might need a particular structure or might just prefer having a structure in the build folder.

This plugin runs in `build, watch, and serve` (determined by the `mode` config variable) and let's you organize your scripts, styles and assets into folders.

## Getting Started

Via NPM

```
npm i -D parcel-plugin-structurize
```

Via Yarn

```
yarn add --dev parcel-plugin-structurize
```

## Configuration

To configure the plugin, add `parcel-plugin-structurize` as a key to your `package.json` file:

```json
{
    "name": "my-parcel-project",
    "parcel-plugin-structurize": {
        "mode": "both",
        "scripts": {
            "match": "*.{js,js.map}",
            "folder": "js"
        },
        "styles": {
            "match": "*.{css,css.map}",
            "folder": "css"
        },
        "assets": {
            "match": "*.{png,svg,jpg,jpg2,jpeg,gif,bmp,webm}",
            "folder": "assets"
        }
    }
}
```

Right now, the plugin only supports `scripts`, `styles` and `assets`. Please feel free to raise a PR to add support for other types (example: `fonts`)!

Mode can have three options: 'production', 'development' or 'both'. Defaults to production.
Mode is determined based on NODE_ENV. If NODE_ENV is not set, it defaults to 'development'.
If mode is not set, it defaults to 'production' i.e. only during `parcel build` 
For the supported keys, you can pass a custom folder and a custom glob:

-   `assets`: Denotes ONLY images. Updates every `img` tag in all your HTML files.
-   `scripts`: Denotes ONLY JavaScript files. Updates every `script` tag in all your HTML files.
-   `styles`: Denotes ONLY stylesheets. Updates every `style` and `link` tag in all your HTML files.

Additionally, the plugin also updates paths of source-maps to match the updated folder structure.

To turn the plugin off, you can also set `"parcel-plugin-structurize": false` in your `package.json`.

[parcel]: https://parceljs.org
