---
description: How to configure Electron Forge
---

# Overview

Electron Forge configuration is centralized in a single configuration object. You can specify this config in your package.json on the `config.forge` property. This property can be in one of two forms:

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
  buildIdentifier: 'my-build',
  outDir: 'desired/outpath'
};
```
{% endtab %}

{% tab title="package.json" %}
```json
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
      "buildIdentifier": "my-build",
      "outDir": "desired/outpath"
    }
  }
}
```
{% endtab %}
{% endtabs %}

{% hint style="success" %}
All properties in your Forge configuration are optional. Initializing your project with one of the built-in templates will include some default recommended config options.
{% endhint %}

### Electron Packager config

The top level property `packagerConfig` on the configuration object maps directly to the options sent to [`@electron/packager`](https://github.com/electron/packager) during the [#package](../cli.md#package "mention") step of Electron Forge's build process

This configuration allows you customize how `@electron/packager` bundles your Electron-based application source code into a packaged application ready for distribution.

{% code title="forge.config.js" %}
```javascript
module.exports = {
  packagerConfig: {
    name: 'My Electron App',
    asar: true,
    osxSign: {},
    appCategoryType: 'public.app-category.developer-tools'
  }
};
```
{% endcode %}

The options you can put in this object are documented in the [Electron Packager API docs](https://electron.github.io/packager/main/interfaces/Options.html).

{% hint style="info" %}
You can not override the `dir`, `arch`, `platform`, `out` or `electronVersion` options as they are set by Electron Forge internally.

If you want to specify a platform/architecture combination for any build command (Package, Make, or Publish), you can specify `--arch` and `--platform` flags using the Forge CLI (e.g. `npm run make --arch=arm64`).

See the [#build-commands](../cli.md#build-commands "mention") documentation for more details.
{% endhint %}

### Electron Rebuild config

The top level property `rebuildConfig` on the configuration object maps directly to the options sent to [`@electron/rebuild`](https://github.com/electron/rebuild) during both the [#package](../cli.md#package "mention") and [#start](../cli.md#start "mention") commands in Electron Forge.

This configuration allows you to customize how Electron Forge rebuilds your project's [native Node.js modules](https://www.electronjs.org/docs/latest/tutorial/using-native-node-modules) against the Node.js version bundled in your app's Electron version.

{% code title="forge.config.js" %}
```javascript
module.exports = {
  rebuildConfig: {
    force: true
  }
};
```
{% endcode %}

The options you can put in this object are documented in the [Electron Rebuild API docs](https://github.com/electron/electron-rebuild#how-can-i-integrate-this-into-grunt--gulp--whatever).

{% hint style="info" %}
The required `buildPath` and `electronVersion` options for `@electron/rebuild` are preconfigured by Forge. The optional `arch` option will also be overridden by Forge internally.
{% endhint %}

### Makers

The top-level `makers` property on the configuration object is an array of maker configurations. Each maker will generate a distributable artifact for your packaged application in the [#make](../cli.md#make "mention") step (e.g. [squirrel.windows.md](makers/squirrel.windows.md "mention") on Windows or [dmg.md](makers/dmg.md "mention") on macOS).

Check out the [makers](makers/ "mention") documentation for all official makers and their config options, and the[writing-makers.md](../advanced/extending-electron-forge/writing-makers.md "mention") guide for implementing your own Make step build targets.

{% code title="forge.config.js" %}
```javascript
module.exports = {
  makers: [
    {
      name: '@electron-forge/maker-zip',
      platforms: ['darwin']
    }
  ]
};
```
{% endcode %}

### Publishers

The top level property `publishers` on the configuration object is an array of publisher configurations. Each publisher provides a publish target for your distributable (e.g. [github.md](publishers/github.md "mention") or [s3.md](publishers/s3.md "mention")).

Check out the [publishers](publishers/ "mention") documentation for all official publishers and their config options, and the [writing-publishers.md](../advanced/extending-electron-forge/writing-publishers.md "mention") guide for implementing your own custom Publish targets.

{% code title="forge.config.js" %}
```javascript
module.exports = {
  publishers: [
    {
      name: '@electron-forge/publisher-github',
      config: {
        repository: {
          owner: 'electron',
          name: 'fiddle'
        },
        draft: true,
        prerelease: false,
        generateReleaseNotes: true
      }
    }
  ]
};
```
{% endcode %}

### Plugins

The top level property `plugins` on the configuration object is an array of plugin configurations. Electron Forge plugins can hook into any point in its lifecycle and provide additional functionality (e.g. the [webpack.md](plugins/webpack.md "mention") will integrate webpack bundling into the build lifecycle, and the [electronegativity.md](plugins/electronegativity.md "mention") will identify security anti-patterns in your app).

Check out the [plugins](plugins/ "mention") documentation for all possible plugins and their config options, and the [writing-plugins.md](../advanced/extending-electron-forge/writing-plugins.md "mention") guide for implementing your own custom Forge plugins.

### Hooks

The top level property `hooks` on the configuration object is an object containing hooks that can be used to insert custom logic during the [build-lifecycle.md](../core-concepts/build-lifecycle.md "mention").

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

In this example the `appBundleId` option passed to Electron Packager will be selected based on the `buildIdentifier` based on whether you are building for `prod` or `beta`. This allows you to make shared configs incredibly easily as only the values that change need to be wrapped with this function.
