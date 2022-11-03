---
description: Create a new Electron app with Webpack
---

# Webpack

To get you up and running as fast as possible with the [webpack](https://webpack.js.org) bundler, we provide a template that makes use of the [`@electron-forge/plugin-webpack` module](../config/plugins/webpack.md), plus some preset webpack configuration options.  This is by far the quickest way to getting a working webpack setup with Electron.

{% tabs %}
{% tab title="NPM" %}
```
npx create-electron-app my-new-app --template=webpack
```
{% endtab %}

{% tab title="Yarn" %}
```
yarn create electron-app my-new-app --template=webpack
```
{% endtab %}
{% endtabs %}

Once you've initialized the template, you'll need to run `npm start`in the generated directory. See the [Webpack Plugin](../config/plugins/webpack.md) documentation for Electron Forge-specific configuration options.
