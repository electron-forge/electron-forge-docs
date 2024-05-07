---
description: Quickly scaffold an Electron project with a full build pipeline
---

# Getting Started

## Overview

Electron Forge is an all-in-one tool for packaging and distributing Electron applications. It combines many single-purpose packages to create a full build pipeline that works out of the box, complete with code signing, installers, and artifact publishing. For advanced workflows, custom build logic can be added in the Forge lifecycle through its [Plugin API](config/plugins/). Custom build and storage targets can be handled by creating your own [Makers](config/makers/) and [Publishers](config/publishers/).

## Creating a new app

To get started with Electron Forge, we first need to initialize a new project with `create-electron-app`. This script is a convenient wrapper around Forge's [Init](cli.md#Init) command.

:::warning
Electron Forge currently only supports npm and Yarn Classic. If you are using Yarn >=2, please use the `nodeLinker: node-modules` install mode.
:::

```bash
npm init electron-app@latest my-app
```

### Using templates

Forge's initialization scripts can add additional template code with the `--template=[template-name]` flag.

```bash
npm init electron-app@latest my-app -- --template=webpack
```

There are currently four first-party templates:

* `webpack`
* `webpack-typescript`
* `vite`
* `vite-typescript`

Both of these templates are built around plugins that bundle your JavaScript code for production and includes a dev server to provide a better developer experience.

:::info
We highly recommend using these templates when initializing your app to take advantage of modern front-end JavaScript tooling.
:::

To learn more about authoring your own templates for Electron Forge, check out the [Writing Templates](advanced/extending-electron-forge/writing-templates.md) guide!

## Starting your app

You should now have a directory called `my-app` with all the files you need for a basic Electron app.

```bash
cd my-app
npm start
```

## Building distributables

So you've got an **amazing** application there, and you want to package it all up and share it with the world. If you run the `make` script, Electron Forge will generate you platform specific distributables for you to share with everyone. For more information on what kind of distributables you can make, check out the [Makers](config/makers/) documentation.

```bash
npm run make
```

## Publishing your app

Now you have distributables that you can share with your users. If you run the `publish` script, Electron Forge will then publish the platform-specific distributables for you, using the publishing method of your choice. For example, if you want to publish your assets to GitHub, you can install the GitHub publisher dependency using:

```bash
npm install --save-dev @electron-forge/publisher-github
```

Once you have [configured the publisher according to the documentation](config/publishers/github), run the following command to upload your distributables:

```bash
npm run publish
```

For more information on what publishers we currently support, check out the [Publishers](config/publishers/) documentation.

## Advanced Usage

Once you've got a basic app starting, building and publishing, it's time to add your custom configuration, which can be done in the `forge.config.js` file. Configuration options are specified in the [Configuration Docs](https://www.electronforge.io/configuration).

You can also check out the documentation on some of our more advanced features like:

* [Adding plugins](config/plugins/)
* [Debugging your app](advanced/debugging.md)
* [Writing your own makers, publishers and plugins](advanced/extending-electron-forge/)
