---
description: >-
  Electron Forge is a complete tool for packaging and distributing modern
  Electron applications.
---

# Getting Started

## Creating a new app

To get started with Electron Forge, we first need to initialize a new project.

{% tabs %}
{% tab title="Yarn 1" %}
```bash
yarn create electron-app my-app
```
{% endtab %}

{% tab title="npm" %}
```bash
npx create-electron-app@latest my-app
```
{% endtab %}
{% endtabs %}

You should now have a directory called `my-app` with an ultra-minimal Electron app boilerplate inside.  If you head into that directory and start up the app, you'll be all set to start developing.

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

## Building Distributables

So you've got an **amazing** application there, and you want to package it all up and share it with the world.  If you run the `make` script Electron Forge will generate you platform specific distributables for you to share with everyone.  For more information on what kind of distributables you can make, check out the [Makers ](../config/makers/)documentation.

{% tabs %}
{% tab title="Yarn" %}
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

## Advanced Usage

Once you've got a basic app going and you can make distributables for it, you should check out the documentation on some of our more advanced features like:

* [Publishers](../config/publishers/)
* [Debugging your app](../advanced/debugging.md)
* [Webpack support](../config/plugins/webpack.md)
* [Writing your own makers, publishers and plugins](../advanced/extending-electron-forge/)
