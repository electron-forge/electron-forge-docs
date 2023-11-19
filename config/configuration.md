---
description: How to configure Electron Forge
---

# Overview

Electron Forge configuration is centralized in a single configuration object. You can specify this config in your package.json on the `config.forge` property. This property can have be in one of two forms:

* An object containing your entire Forge configuration.
* A relative path pointing at a JavaScript file that exports your config.

If you do not have `config.forge` set in your package.json file, Forge will attempt to find a `forge.config.js` file in your project root.

{% tabs %}
{% tab title="forge.config.js" %}
{% code title="forge.config.js" %}
```javascript
module.exports = {
  packagerConfig: {},
  makers: [
    {
      name: '@electron-forge/maker-zip'
    }
  ]
};
```
{% endcode %}
{% endtab %}

{% tab title="package.json" %}
{% code title="package.json" %}
```json
{
  "name": "my-app",
  "version": "0.0.1",
  "config": {
    "forge": {
      "packagerConfig": {},
      "makers": [
        {
          "name": "@electron-forge/maker-zip"
        }
      ]
    }
  }
}
```
{% endcode %}
{% endtab %}
{% endtabs %}

{% hint style="info" %}
We recommend using JavaScript for your config file since it enables conditional logic within your configuration.
{% endhint %}

## Configuration options

{% tabs %}
{% tab title="forge.config.js" %}
```javascript
module.exports = {
  packagerConfig: { /* ... */ },
  rebuildConfig: { /* ... */ },
  makers: [],
  publishers: [],
  plugins: [],
  hooks: { /* ... */ },
  buildIdentifier: 'my-build'
};
```
{% endtab %}

{% tab title="package.json" %}
```jsonc
// Only the relevant section of package.json is shown, for brevity.
{
  "config": {
    "forge": {
      "packagerConfig": { ... },
      "rebuildConfig": { ... },
      "makers": [ ... ],
      "publishers": [ ... ],
      "plugins": [ ... ],
      "hooks": { ... },
      "buildIdentifier": "my-build"
    }
  }
}
```
{% endtab %}
{% endtabs %}

{% hint style="success" %}
All properties are optional
{% endhint %}

### Electron Packager config

The top level property `packagerConfig` on the configuration object maps directly to the options sent to [`electron-packager`](https://github.com/electron/electron-packager) during the package step of Electron Forge's build process.

The options you can put in this object are documented in the [Electron Packager API docs](https://electron.github.io/packager/master/interfaces/electronpackager.options.html).

{% hint style="warning" %}
You can not override the `dir`, `arch`, `platform, out` or `electronVersion` options as they are set by Electron Forge internally.
{% endhint %}

### Electron Rebuild config

The top level property `rebuildConfig` on the configuration object maps directly to the options sent to [`electron-rebuild`](https://github.com/electron/electron-rebuild) during both the package and start step of Electron Forge's build process.

The options you can put in this object are documented in the [Electron Rebuild API docs](https://github.com/electron/electron-rebuild#how-can-i-integrate-this-into-grunt--gulp--whatever).

{% hint style="warning" %}
You can not override the `buildPath`, `arch`, or `electronVersion` options as they are set by Electron Forge internally
{% endhint %}

### Makers

The top level property `makers` on the configuration object is an array of maker configurations. Check out the [Makers](makers/) documentation for all possible makers and their config options.

### Publishers

The top level property `publishers` on the configuration object is an array of publisher configurations. Check out the [Publishers](publishers/) documentation for all possible publishers and their config options.

### Plugins

The top level property `plugins` on the configuration object is an array of plugin configurations. Check out the [Plugins](plugins/) documentation for all possible plugins and their config options.

### Hooks

The top level property `hooks` on the configuration object is an object containing hooks that can be used to insert custom logic during the build lifecycle.

Check out the [hooks.md](hooks.md "mention") documentation for all possible hooks and their config options.

### Build identifiers

This property can be used to identify different build configurations. Normally, this property is set to the channel the build will release to, or some other unique identifier. For example, common values are `prod` and `beta`. This identifier can be used in conjunction with the `fromBuildIdentifier` function to generate release channel or environment specific configuration. For example:

{% code title="forge.config.js" %}
```javascript
const { utils: { fromBuildIdentifier } } = require('@electron-forge/core');

module.exports = {
  buildIdentifier: process.env.IS_BETA ? 'beta' : 'prod',
  packagerConfig: {
    appBundleId: fromBuildIdentifier({ beta: 'com.beta.app', prod: 'com.app' })
  }
};
```
{% endcode %}

In this example the `appBundleId` option passed to Electron Packager will be selected based on the `buildIdentifer` based on whether you are building for `prod` or `beta`. This allows you to make shared configs incredibly easily as only the values that change need to be wrapped with this function.
