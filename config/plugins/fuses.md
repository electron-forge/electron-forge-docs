---
description: Toggle Electron functionality at package-time with Electron Fuses.
---

# Fuses Plugin

> Added in version 6.1.0

This plugin allows flipping [Electron Fuses](https://www.electronjs.org/docs/latest/tutorial/fuses) when packaging your app with Electron Forge. Fuses are bits in the Electron binary that allow certain features to be enabled/disabled when your app is packaged. In most cases, if you want to change how Electron works internally, you have to grab the source files, make any changes you need, and compile it yourself, which is a major task.

Fuses are meant to simplify this process for a subset of common features: instead of compiling your own Electron binary, you can modify the existing pre-built binary at package-time using Fuses so that these features are enabled/disabled in your packaged app.

For example, by default, you can run your Electron app as a normal Node.js process if you have the `ELECTRON_RUN_AS_NODE` environment variable set to `1`. If you don't want users to be able to do this, you can disable this behavior by setting the [RunAsNode](https://www.electronjs.org/docs/latest/tutorial/fuses#runasnode) fuse to `false` at package-time.  If your app is code-signed, users can't change any Fuses you have flipped, as the operating system would detect that the binary has changed and prevent the app from running.

For an updated list of the features that can be enabled/disabled using Fuses, please refer to the [official Fuses tutorial](https://www.electronjs.org/docs/latest/tutorial/fuses) and the [@electron/fuses docs](https://www.electronjs.org/docs/latest/tutorial/fuses).

## Installation

{% hint style="info" %}
This plugin has a peer dependency on `@electron/fuses`, so don't forget to install it too!
{% endhint %}

```shell
npm install --save-dev @electron-forge/plugin-fuses @electron/fuses
```

## Usage

You can use the `FusesPlugin` constructor just like the `flipFuses` function from `@electron/fuses`, except that the plugin already takes care of the Electron path for you, so you only need to provide the configuration object.

{% tabs %}
{% tab title="forge.config.js" %}
```js
const { FusesPlugin } = require('@electron-forge/plugin-fuses');
const { FuseV1Options, FuseVersion } = require('@electron/fuses');

const forgeConfig = {
  // ...
  plugins: [
    new FusesPlugin({
      version: FuseVersion.V1,
      [FuseV1Options.RunAsNode]: false
      // ...any other options supported by @electron/fuses
    })
  ]
  // ...
};

module.exports = forgeConfig;
```

{% endtab %}
{% endtabs %}

The example above assumes you're using `@electron/fuses` v1.x, which is the latest major version as of the time of writing; however, this plugin should work with any version of `@electron/fuses`. For instance, if `@electron/fuses` v2.x is released and you want to use some new fuse that comes with it, you'll just need to upgrade your `@electron/fuses` package to v2.x and update your Forge configuration:

{% tabs %}
{% tab title="forge.config.js" %}
```js
const { FusesPlugin } = require('@electron-forge/plugin-fuses');
const { FuseV2Options, FuseVersion } = require('@electron/fuses');

const forgeConfig = {
  // ...
  plugins: [
    new FusesPlugin({
      version: FuseVersion.V2,
      [FuseV2Options.SomeV2OnlyFuse]: false
      // ...any other options supported by @electron/fuses
    })
  ]
  // ...
};

module.exports = forgeConfig;
```

{% endtab %}
{% endtabs %}

