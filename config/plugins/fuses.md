---
description: Toggle Electron functionality at package-time with Electron Fuses.
---

> Added in version 6.1.0

# Fuses Plugin

This plugin allows flipping [Electron Fuses](https://github.com/electron/fuses) when packaging your app with Electron Forge. Fuses are bits in the Electron binary that allow certain features to be enabled/disabled when your app is packaged.

## Installation

{% hint style="info" %}
This plugin has a peer dependency on `@electron/fuses`, so don't forget to install it too!
{% endhint %}

{% tabs %}
{% tab title="yarn" %}
```shell
yarn add --dev @electron-forge/plugin-fuses @electron/fuses
```
{% endtab %}

{% tab title="npm" %}
```shell
npm install --save-dev @electron-forge/plugin-fuses @electron/fuses
```
{% endtab %}
{% endtabs %}

## Usage

### Plugin configuration

You can use the `FusesPlugin` constructor just like the `flipFuses` function from `@electron/fuses`, except that the plugin already takes care of the Electron path for you, so you only need to provide the configuration object. Please refer to the [`@electron/fuses` docs](https://github.com/electron/fuses#usage) to learn more about supported fuses.

{% tabs %}
{% tab title="forge.config.js" %}
```js
const { FusesPlugin } = require('@electron-forge/plugin-fuses')
const { FuseV1Options, FuseVersion } = require('@electron/fuses')

const forgeConfig = {
  // ...
  plugins: [
    new FusesPlugin({
      version: FuseVersion.V1,
      [FuseV1Options.RunAsNode]: false,
      // ...any other options supported by @electron/fuses
    }),
  ],
  // ...
}

module.exports = forgeConfig
```

{% endtab %}
{% endtabs %}

