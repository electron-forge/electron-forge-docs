# Auto Unpack Native Modules

This plugin will automatically add all native modules in your `node_modules` folder to the [`asar.unpack`](https://github.com/electron-userland/electron-packager/blob/master/docs/api.md#asar) config option in your [`packagerConfig`](../../configuration.md#packager-config).  If you have any native modules at all you should probably use this to reduce loading times and disk consumption on your users' machines.

## Installation

```bash
yarn add @electron-forge/plugin-auto-unpack-natives --dev
```

## Usage

You must add this plugin to your [`plugins`](../../configuration.md#plugins) array in your forge config

The complete config options are available at [`AutoUnpackNativesConfig`](https://js.electronforge.io/plugin/auto-unpack-natives/interfaces/autounpacknativesconfig.html). 

{% code title="forge.config.js" %}
```javascript
module.exports = {
  plugins: [
    ['@electron-forge/plugin-auto-unpack-natives']
  ]
}
```
{% endcode %}

