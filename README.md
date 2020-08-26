# parcel-plugin-structurize

[![npm (tag)](https://img.shields.io/npm/v/parcel-plugin-structurize)](https://npmjs.com/package/parcel-plugin-structurize)
[![Donations Badge](https://yourdonation.rocks/images/badge.svg)](https://www.patreon.com/samrith) ![checks](https://github.com/samrith-s/parcel-plugin-structurize/workflows/checks/badge.svg?branch=master)

A [Parcel][parcel] plugin that lets you customize your output (`dist`) directory.

## Table of Contents

-   [Why?](#why)
-   [Installation](#installation)
-   [Usage](#usage)
-   [Configuration](#configuration)
    -   [rules](#rules)
    -   [verbose](#verbose)
    -   [displayAssetsMap](#displayAssetsMap)
    -   [Disable plugin](#disable-plugin)
-   [Structurizer](#structurizer)
    -   [match](#match)
    -   [folder](#folder)
-   [Gotchas](#gotchas)
-   [Migration from 1.x](#migrating-from-1.x)
-   [Contributing](#contributing)
    -   [Bundling](#bundling)
    -   [Testing](#testing)
    -   [Bugs and issues](#bugs-and-issues)

## Why?

When building for production, Parcel outputs the build in a flat structure. In some cases, we might need a particular structure for the built output.

This plugin lets you organize every file output by Parcel by matching and moving assets into your desired structure. It also updates all references in every file to ensure that the output is ready for consumption with your custom structure.

Advantages of using the plugin:

-   Supports excellent and fine-grained configuration for all use cases out of the box using [glob pattern][glob] matching
-   Super fast and rapid restructuring means you do not need to worry about a massive overload in build times.
-   Respects `--publicUrl` passed to Parcel bundler while restructuring the folder.
-   Sensible defaults to get you up and running quickly.

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

The configuration includes the following attributes:

-   ### rules

    `Structurizer`

    An array of objects which are called Structurizers.

-   ### verbose

    `boolean`

    Whether to enable verbose logging or not.

-   ### displayAssetsMap

    `boolean`

    Whether to display the generated assets map or not. This only comes into effect if `verbose` is `true`.

### Disable plugin

You can disable the plugin by two means:

-   Set `rules` attribute in your config to `false`.
-   Set environment variable `PARCEL_PLUGIN_STRUCTURIZE` to `false`. Ex:

```bash
PARCEL_PLUGIN_STRUCTURIZE=false parcel build src/index.html
```

---

## Structurizer

Structurizer is a rule that contains match patterns and the target.

```ts
{
    "match": string
    "folder": string
}
```

-   ### match

    `string`

    A glob pattern to match file names and group them to a folder.

-   #### folder

    `string`

    The folder to place the files in. Can contain nested folders (ex: `scripts/vendors`, `images/vectors/user/avatar`)

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

## Migrating from 1.x

Migrating from `v1` to `v2 of the plugin is super simple

In your project, first upgrade the plugin:

```
yarn upgrade parcel-plugin-structurize@2.x
```

Then upgrade the configuration in `package.json`:

```diff jsonc
{
    "parcel-plugin-structurize": {
-        "scripts": {
-            "match": "*.{js,js.map}",
-            "folder": "js"
-        },
-        "styles": {
-            "match": "*.{css,css.map}",
-            "folder": "css"
-        },
-        "assets": {
-            "match": "*.{png,svg,jpg,jpg2,jpeg,gif,bmp,webm}",
-            "folder": "assets"
-        }
+        "rules": [
+            {
+                "match": "*.js",
+                "folder": "js",
+            },
+            {
+                "match": "*.css",
+                "folder": "css",
+            },
+            {
+                "match": "*.{png,svg,jpg,jpg2,jpeg,gif,bmp,webm}",
+                "folder": "assets",
+            },
+        ],
    }
}
```

## Contributing

To get the project up and running, clone it and then run the following command:

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

### Bundling

Bundles watch for changes to the plugin and rebuild with Parcel bundler, causing the plugin to trigger. Once you have the plugin running in dev mode, you can run the following command for the bundles:

```shell
(cd __tests__/bundle && yarn dev)
```

### Testing

To test you can run:

```shell
yarn test:watch
```

### Bugs and issues

Please report any bugs [here][issue]. For any questions feel free to [create an issue][question].

[parcel]: https://parceljs.org
[glob]: https://en.wikipedia.org/wiki/Glob_(programming)
[issue]: https://github.com/samrith-s/parcel-plugin-structurize/issues/new?assignees=&labels=bug%2C+v2&template=bug-report--v2-.md&title=%5B%F0%9F%90%9B%5D+Bug%3A+
[question]: https://github.com/samrith-s/parcel-plugin-structurize/issues/new?assignees=&labels=question%2C+v2&template=question.md&title=%5B%E2%9D%94%5D+Question%3A+
