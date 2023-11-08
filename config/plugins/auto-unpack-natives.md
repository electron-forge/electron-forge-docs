---
description: >-
  Reduce loading times and disk consumption by unpacking native Node modules
  from your Forge app's ASAR archive.
---

# Auto Unpack Native Modules Plugin

This plugin will automatically add all native Node modules in your `node_modules` folder to the [`asar.unpack`](https://electron.github.io/electron-packager/main/interfaces/electronpackager.options.html#asar) config option in your [`packagerConfig`](../configuration.md#electron-packager-config). If your app uses native Node modules, you should probably use this to reduce loading times and disk consumption on your users' machines.

## Installation

```shell
npm install --save-dev @electron-forge/plugin-auto-unpack-natives
```

## Usage

You must add this plugin to your [`plugins`](../configuration.md#plugins) array in your Forge configuration. There are currently no configuration options available for this plugin.

{% hint style="info" %}
Asar archives are disabled by default with Electron Packager. Make sure you set your `packagerConfig.asar` value accordingly. This option also supports advanced configuration if you pass it an object. See the [API documentation for this option](https://js.electronforge.io/modules/\_electron\_forge\_shared\_types.InternalOptions.html#CreateOptions) for more information.
{% endhint %}

{% code title="forge.config.js" %}
```javascript
module.exports = {
  packagerConfig: {
    asar: true // or an object containing your asar options
  },
  plugins: [
    {
      name: '@electron-forge/plugin-auto-unpack-natives',
      config: {}
    }
  ]
};
```
{% endcode %}
