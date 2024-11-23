# parcel-plugin-structurize

> [!CAUTION]
> This package is no longer actively maintained and only supports Parcel v1. There are many other alternatives and configurations provided, which you can use.

[![npm (tag)](https://img.shields.io/npm/v/parcel-plugin-structurize)](https://npmjs.com/package/parcel-plugin-structurize)
![checks](https://github.com/samrith-s/parcel-plugin-structurize/workflows/checks/badge.svg?branch=main)

A [Parcel][parcel] plugin that lets you customize your output (`dist`) directory folder structure.

If you ❤️ this plugin and want to support, you can buy me a coffee!

<a href="https://www.buymeacoffee.com/Sz4V6TJlU" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" width="125" /></a>

## 🗃 Table of Contents

-   [Why?](#-why)
-   [Installation](#-installation)
-   [Migration from 1.x](#-migrating-from-1x)
-   [Usage](#-usage)
-   [Configuration](#-configuration)
    -   [Options](#options)
        -   [`rules`](#rules)
        -   [`verbose`](#verbose)
        -   [`displayAssetsMap`](#displayAssetsMap)
    -   [Disable plugin](#disable-plugin)
-   [Structurizer](#-structurizer)
    -   [`match`](#match)
    -   [`folder`](#folder)
    -   [`flatten`](#flatten)
-   [Gotchas](#-gotchas)
-   [Contributing](#-contributing)
    -   [Bundling](#bundling)
    -   [Testing](#testing)
    -   [Bugs and issues](#bugs-and-issues)

## 🤔 Why?

When building for production, Parcel outputs the build in a flat structure. In some cases, we might need a particular structure for the built output.

This plugin lets you organize every file output by Parcel by matching and moving assets into your desired structure. It also updates all references in every file to ensure that the output is ready for consumption with your custom structure.

Advantages of using the plugin:

-   Supports excellent and fine-grained configuration for all use cases out of the box using [glob pattern][glob] matching
-   Super fast and rapid restructuring means you do not need to worry about a massive overload in build times.
-   Respects `publicUrl` passed to Parcel bundler while restructuring the folder.
-   Respects the `outDir` passed to Parcel bundler and only restructures files within.
-   Sensible defaults to get you up and running quickly.

---

## 🔌 Installation

Installation is straight forward using NPM or Yarn:

```bash
# Using NPM
npm install --save-dev parcel-plugin-structurize

# Using Yarn
yarn add -D parcel-plugin-structurize
```

---

## 🚛 Migrating from 1.x

Migrating from `v1` to `v2` of the plugin is super simple.

In your project, first upgrade the plugin:

```
yarn upgrade parcel-plugin-structurize@2.x
```

Then upgrade the configuration in `package.json`:

```diff jsonc
# package.json file
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

---

## 🏃‍♀️ Usage

There are two ways to configure the plugin:

-   Adding the `parcel-plugin-structurize` key to `package.json`.

```jsonc
// package.json
{
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

> **Note:** This plugin runs **ONLY** in `parcel build` or when `NODE_ENV=production`, since the use-case of running it in `watch`, `serve` or `NODE_ENV=development` is not compelling enough.

---

## 🛠 Configuration

The plugin allows for fine-grained configuration options to ensure proper customization of the output directory.

### Options

The configuration includes the following options:

-   #### `rules`

    `Structurizer`

    An array of objects which are called Structurizers.

-   #### `verbose`

    `boolean`

    Whether to enable verbose logging or not.

-   #### `displayAssetsMap`

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

## 🧱 Structurizer

Structurizer is a rule that contains match patterns and the target.

```ts
type Config = {
    match: string;
    folder: string;
    flatten?: boolean;
};
```

-   #### `match`

    `string`

    A glob pattern to match file names and group them to a folder.

-   #### `folder`

    `string`

    The folder to place the files in. Can contain nested folders (ex: `scripts/vendors`, `images/vectors/user/avatar`)

-   #### `flatten`

    `boolean`

    For nested files, whether to flatten them to the output folder or not.

You can provide as many Structurizers in your configuration file. The plugin ships with sensible defaults.

```jsonc
// default config
{
    "verbose": false,
    "rules": [
        {
            "match": "*.js",
            "folder": "js",
            "flatten": false
        },
        {
            "match": "*.css",
            "folder": "css",
            "flatten": false
        },
        {
            "match": "*.{jpg,jpeg,jpeg2,png,gif,svg,bmp,webp}",
            "folder": "assets",
            "flatten": false
        }
    ]
}
```

---

## ❗️ Gotchas

1. The order of the Structurizers matter if you want to target a glob and a file ending with the same extension. To better illustrate this, let's consider the following files in your output directory:

    - `index.html`
    - `contact.html`
    - `about.html`

    If you want to move all HTML files into a folder called `app`, except the `index.html` then you need to keep in mind the order of the Structurizers.

```diff
# The following will produce the desired results
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

# And the following will result in your `index.html` to be placed inside the `app` directory as well
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

2.  You should **NOT** add any structurizer rules for `.map` files as the plugin automatically resolves and restructures the sourcemap files to reside in the same directory as its parent. This can cause unintended side-effects.

---

## 🐠 Contributing

To get the project up and running, clone it and then run the following command:

```shell
yarn bootstrap
```

It will install all packages, link dependencies and set everything up. To start the dev server:

```shell
yarn dev
```

To build the bundle, simply run:

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
