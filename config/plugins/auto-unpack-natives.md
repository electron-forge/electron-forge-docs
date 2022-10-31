---
description: >-
  Reduce loading times and disk consumption by unpacking native Node modules
  from your Forge app's ASAR archive.
---

# Auto Unpack Native Modules Plugin

This plugin will automatically add all native Node modules in your `node_modules` folder to the [`asar.unpack`](https://electron.github.io/electron-packager/main/interfaces/electronpackager.options.html#asar) config option in your [`packagerConfig`](../../configuration.md#packager-config). If your app uses native Node modules, you should probably use this to reduce loading times and disk consumption on your users' machines.

## Installation

{% tabs %}
{% tab title="Yarn" %}
```shell
yarn add --dev @electron-forge/plugin-auto-unpack-natives
```
{% endtab %}

{% tab title="npm" %}
```shell
npm install --save-dev @electron-forge/plugin-auto-unpack-natives
```
{% endtab %}
{% endtabs %}

## Usage

You must add this plugin to your [`plugins`](../../configuration.md#plugins) array in your Forge configuration. There are currently no configuration options available for this plugin.

{% code title="forge.config.js" %}
```javascript
module.exports = {
  packagerConfig: {
    asar: {}
  },
  plugins: [
   {
     name: '@electron-forge/plugin-auto-unpack-natives',
     config: {}
   }
  ]
}
```
{% endcode %}
