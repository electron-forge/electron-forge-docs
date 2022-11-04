---
description: Quickly scaffold an Electron project with a full build pipeline
---

# Getting Started

## Overview

Electron Forge is an all-in-one tool for packaging and distributing Electron applications. It combines many single-purpose packages to create a full build pipeline that works out of the box, complete with code signing, installers, and artifact publishing. For advanced workflows, custom build logic can be added in the Forge lifecycle through its [Plugin API](config/plugins/). Custom build and storage targets can be handled by creating your own [Makers](config/makers/) and [Publishers](config/publishers/).

## Creating a new app

To get started with Electron Forge, we first need to initialize a new project with `create-electron-app`. This script is a convenient wrapper around Forge's [Init](cli.md#Init) command.

{% tabs %}
{% tab title="Yarn" %}
```bash
yarn create electron-app my-app
```
{% endtab %}

{% tab title="npm" %}
```bash
npm init electron-app@latest my-app
```
{% endtab %}
{% endtabs %}

{% hint style="warning" %}
If you used the `create-electron-app` script before during Forge `6.0.0-beta`, we recommend you uninstall the package globally before running the command again.

```bash
yarn global remove create-electron-app
# or
npm uninstall -g create-electron-app
```
{% endhint %}

### Using templates

Forge's initialization scripts can add additional template code with the `--template=[template-name]` flag.

{% tabs %}
{% tab title="yarn" %}
```bash
yarn create electron-app --template=webpack
```
{% endtab %}

{% tab title="npm" %}
```bash
npm init electron-app@latest my-app --template=webpack
```
{% endtab %}
{% endtabs %}

There are currently two first-party templates:

* `webpack`
* `webpack-typescript`

Both of these templates are built around the [Webpack Plugin](\(../config/plugins/webpack.md\)), which bundles your JavaScript code for production and includes a dev server to provide a better development experience. The `webpack-typescript` template also wires up your project for TypeScript support.

{% hint style="info" %}
We highly recommend using these templates when initializing your app to take advantage of modern front-end JavaScript tooling.
{% endhint %}

To learn more about authoring your own templates for Electron Forge, check out the [Writing Templates](advanced/extending-electron-forge/writing-templates/) guide!

## Starting your app

You should now have a directory called `my-app` with all the files you need for a basic Electron app.

{% tabs %}
{% tab title="Yarn" %}
```bash
cd my-app
yarn start
```
{% endtab %}

{% tab title="npm" %}
```bash
cd my-app
npm start
```
{% endtab %}
{% endtabs %}

## Building distributables

So you've got an **amazing** application there, and you want to package it all up and share it with the world. If you run the `make` script, Electron Forge will generate you platform specific distributables for you to share with everyone. For more information on what kind of distributables you can make, check out the [Makers](config/makers/) documentation.

{% tabs %}
{% tab title="yarn" %}
```bash
yarn make
```
{% endtab %}

{% tab title="npm" %}
```bash
npm run make
```
{% endtab %}
{% endtabs %}

## Publishing your app

Now you have distributables that you can share with your users. If you run the `publish` script, Electron Forge will then publish the platform-specific distributables for you, using the publishing method of your choice. For more information on what publishers we currently support, check out the [Publishers](config/publishers/) documentation.

{% tabs %}
{% tab title="yarn" %}
```bash
yarn publish
```
{% endtab %}

{% tab title="npm" %}
```bash
npm run publish
```
{% endtab %}
{% endtabs %}

## Advanced Usage

Once you've got a basic app starting, building and publishing, it's time to add your custom configuration, which can be done in the `forge.config.js` file. Configuration options are specified in the [Configuration Docs](https://www.electronforge.io/configuration).

You can also check out the documentation on some of our more advanced features like:

* [Adding plugins](config/plugins/)
* [Debugging your app](advanced/debugging.md)
* [Writing your own makers, publishers and plugins](advanced/extending-electron-forge/)
