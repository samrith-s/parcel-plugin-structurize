# parcel-plugin-structurize

A [Parcel][parcel] plugin that lets you organize your build directory into any structure.

## Why?

Currently, Parcel builds everything for production in a flat structure. Sometimes, we might need a particular structure or might just prefer having a structure in the build folder.

This plugin runs only in `build` and let's you organize your scripts, styles and assets into folders.

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

For every key, you can pass a custom folder and a custom glob.

-   `assets`: Denotes ONLY images. Updates every `img` tag in all your HTML files.
-   `scripts`: Denotes ONLY JavaScript files. Updates every `script` tag in all your HTML files.
-   `styles`: Denotes ONLY stylesheets. Updated every `style` and `link` tag in all your HTML files.

Additionally, the plugin also updated paths of source-maps to match the updated folder structure.

[parcel]: "https://parceljs.org"
