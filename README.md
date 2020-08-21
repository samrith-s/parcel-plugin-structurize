# parcel-plugin-structurize

> 🚨 These are the docs for v2 of parcel-plugin-structurize and still in beta. For v1, check the [old branch](https://github.com/samrith-s/parcel-plugin-structurize/tree/master).

![npm (tag)](https://img.shields.io/npm/v/parcel-plugin-structurize/next)
[![Donations Badge](https://yourdonation.rocks/images/badge.svg)](https://www.patreon.com/samrith)

A [Parcel][parcel] plugin that lets you organize your build directory into any structure.

## Why?

Currently, Parcel builds everything for production in a flat structure. Sometimes, we might need a particular structure or might just prefer having a structure in the build folder.

This plugin runs only in `build` and let's you organize your scripts, styles and assets into folders.

## Installation

Installation is straight forward using NPM or Yarn:

```bash
# Using NPM
npm install --save-dev parcel-plugin-structurize@next

#Using Yanrn
yarn add -D parcel-plugin-structurize@next
```

Please note the use of `@next`. Without that, you will end up with the older version of the plugin.

## Usage

There are two ways to configure the plugin:

-   Adding the `parcel-plugin-structurize` key to `package.json`.

```jsonc
// package.json
{
    // other package.json entries
    "parcel-plugin-structurize": [
        {
            "match": "*.js",
            "folder": "scripts"
        },
        {
            "match": "*.{jpg,png,gif,svg}",
            "folder": "images"
        }
    ]
}
```

-   Via a `parcel-plugin-structurize.json` file in your project root (right next to your `package.json`).

```jsonc
// parcel-plugin-structurize.json
[
    {
        "match": "*.js",
        "folder": "scripts"
    },
    {
        "match": "*.{jpg,png,gif,svg}",
        "folder": "images"
    }
]
```

## Configuration

The configuration is an array of objects which are called Structurizers. Each Structurizer container the following:

-   `match`: A [glob][glob] pattern to match file names and group them to a folder.
-   `folder`: The folder to place the files in. Can contain nested folders (ex: `scripts/vendors`, `images/vectors/user/avatar`)

You can provide as many Structurizers in your configuration file. The plugin ships with sensible defaults.

```jsonc
// default config
[
    {
        "match": "*.js",
        "folder": "js"
    },
    {
        "match": "*.css",
        "folder": "css"
    },
    {
        "match": "*.{jpg,jpeg,jpeg2,png,gif,svg,bmp,webp}",
        "folder": "assets"
    }
]
```

## Gotchas

The order of the Structurizers matter if you want to target a glob and a file ending with the same extension. To better illustrate this, let's consider the following files in your output directory:

-   `index.html`
-   `contact.html`
-   `about.html`

If you want to move all HTML files into a folder called `app`, except the `index.html` then you need to keep in mind the order of the Structurizers. The following is will produce the desired results:

```diff
+ Correct
[
    {
        "match": "index.html",
        "folder": "."
    },
    {
        "match": "*.html",
        "folder": "app"
    }
]
```

And the following will result in your `index.html` moved inside the `app` directory as well:

```diff
- Incorrect
[
    {
        "match": "*.html",
        "folder": "app"
    },
    {
        "match": "index.html",
        "folder": "."
    }
]
```

## Running locally

To get the repo up and running, clone it and then run the following command:

```shell
yarn bootstrap
```

This should set everything up for you. To start the dev server:

```shell
yarn dev
```

### For bundles

Bundles watch for changes to the plugin and rebuild accordingly. Once you have the plugin running in dev mode, you can run the following command for the bundles:

```shell
# Replace <bundle-name> with the name of the bundle
(cd bundles/bundle-<bundle-name> && yarn dev)
```

[parcel]: https://parceljs.org
[glob]: https://en.wikipedia.org/wiki/Glob_(programming)
[v2]: https://github.com/samrith-s/parcel-plugin-structurize/issues/25
