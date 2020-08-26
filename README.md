# parcel-plugin-structurize

> 📢 These are the docs for v2 of parcel-plugin-structurize. For v1, check the [old branch](https://github.com/samrith-s/parcel-plugin-structurize/tree/v1).

[![npm (tag)](https://img.shields.io/npm/v/parcel-plugin-structurize)](https://npmjs.com/package/parcel-plugin-structurize)
[![Donations Badge](https://yourdonation.rocks/images/badge.svg)](https://www.patreon.com/samrith) ![checks](https://github.com/samrith-s/parcel-plugin-structurize/workflows/checks/badge.svg?branch=master)

A [Parcel][parcel] plugin that lets you organize your output directory.

## Why?

When building for production, Parcel outputs the build in a flat structure. In some cases, we might need a particular structure for the built output.

This plugin lets you organize every file output by Parcel by matching and moving assets into your desired structure. It also updates all references in every file to ensure that the output is ready for consumption with your custom structure.

Advantages of using the plugin:

-   Supports excellent and fine-grained configuration for all use cases out of the box using the universally accepted glob matching patterns.
-   Super fast and rapid restructuring means you do not need to worry about a massive overload in build times.
-   Respects `--publicUrl` passed to Parcel bundler while restructuring the folder.

---

## Installation

Installation is straight forward using NPM or Yarn:

```bash
# Using NPM
npm install --save-dev parcel-plugin-structurize

# Using Yarn
yarn add -D parcel-plugin-structurize
```

---

## Usage

There are two ways to configure the plugin:

-   Adding the `parcel-plugin-structurize` key to `package.json`.

```jsonc
// package.json
{
    // other package.json entries
    "parcel-plugin-structurize": {
        "rules": [
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
}
```

-   Via a `parcel-plugin-structurize.json` file in your project root (right next to your `package.json`).

```jsonc
// parcel-plugin-structurize.json
{
    "rules": [
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

> **Note:** This plugin runs **ONLY in build** since the use-case of running it in watch or serve is not compelling enough.

---

## Configuration

The configuration includes two attributes:

-   `rules: Structurizer`: An array of objects which are called Structurizers.
-   `verbose: boolean`: Whether to enable verbose logging or not.

A Structurizer has the following attributes:

-   `match: string`: A [glob][glob] pattern to match file names and group them to a folder.
-   `folder: string`: The folder to place the files in. Can contain nested folders (ex: `scripts/vendors`, `images/vectors/user/avatar`)

You can provide as many Structurizers in your configuration file. The plugin ships with sensible defaults.

```jsonc
// default config
{
    "verbose": false,
    "rules": [
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
}
```

### Turning off the plugin

You can turn off the plugin by two means:

-   Set `rules` attribute in your config to `false`.
-   Set environment variable `PARCEL_PLUGIN_STRUCTURIZE` to `false`. Ex:

```bash
PARCEL_PLUGIN_STRUCTURIZE=false parcel build src/index.html
```

---

## Gotchas

1. The order of the Structurizers matter if you want to target a glob and a file ending with the same extension. To better illustrate this, let's consider the following files in your output directory:

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

2.  You should **NOT** add any structurizer rules for `.map` files as the plugin automatically resolves and restructures the sourcemap files to reside in the same directory as its parent. This can cause unintended side-effects and may cause the plugin to crash.

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

---

## Running locally

To get the repo up and running, clone it and then run the following command:

```shell
yarn bootstrap
```

It will install all packages, link dependencies and set everything up. To start the dev server:

```shell
yarn dev
```

To build the bundle, simple run:

```shell
yarn build
```

### For bundles

Bundles watch for changes to the plugin and rebuild accordingly. Once you have the plugin running in dev mode, you can run the following command for the bundles:

```shell
# Replace <bundle-name> with the name of the bundle
(cd __tests__/bundle && yarn dev)
```

[parcel]: https://parceljs.org
[glob]: https://en.wikipedia.org/wiki/Glob_(programming)
[v2]: https://github.com/samrith-s/parcel-plugin-structurize/issues/25
