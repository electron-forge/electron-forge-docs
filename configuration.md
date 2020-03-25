# Configuration

Electron Forge configuration is all centralized in your "Forge Config", this can be found in your `package.json` at the `config.forge` path.  This property must either be an object containing your entire forge configuration, or for more advanced users it can be a relative path pointing at a JS file that exports your config.

{% tabs %}
{% tab title="Object" %}
{% code title="package.json" %}
```javascript
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

{% tab title="Path" %}
{% code title="package.json" %}
```javascript
{
  "name": "my-app",
  "version": "0.0.1",
  "config": {
    "forge": "./forge.config.js"
  }
}
```
{% endcode %}

{% code title="forge.config.js" %}
```javascript
module.exports = {
  packagerConfig: {},
  makers: [
    {
      name: '@electron-forge/maker-zip'
    }
  ]
}
```
{% endcode %}
{% endtab %}
{% endtabs %}

Putting the config directly in the `package.json` is by far the more simpler approach but to things like provide hook functions to Electron Forge you will need to use the JS file.

## Possible Configuration

{% code title="example.forge.config.js" %}
```text
{
  packagerConfig: { ... },
  electronRebuildConfig: { ... },
  makers: [ ... ],
  publishers: [ ... ],
  plugins: [ ... ],
  hooks: { ... },
  buildIdentifier: 'my-build'
}
```
{% endcode %}

{% hint style="success" %}
 All properties are optional
{% endhint %}

### Packager Config

The top level property `packagerConfig` on the configuration object maps directly to the options sent to [`electron-packager`](https://github.com/electron/electron-packager) during the package step of Electron Forge's build process.  The options you can put in this object are documented in the [Electron Packager API docs](https://electron.github.io/electron-packager/master/interfaces/electronpackager.options.html).

{% hint style="info" %}
Please note that you can not override the `dir`, `arch`, `platform`,`out`or `electronVersion`options as they are set by Electron Forge internally
{% endhint %}

### Rebuild Config

The top level property `electronRebuildConfig` on the configuration object maps directly to the options sent to [`electron-rebuild`](https://github.com/electron/electron-rebuild) during both the package and start step of Electron Forge's build process.  The options you can put in this object are documented in the [Electron Rebuild API docs](https://github.com/electron/electron-rebuild#how-can-i-integrate-this-into-grunt--gulp--whatever).

{% hint style="info" %}
Please note you can not override the `buildPath`, `arch`or `electronVersion` options as they are set by Electron Forge internally
{% endhint %}

### Makers

The top level property `makers` on the configuration object is an array of maker configurations.  Check out the [Makers ](config/makers/)documentation for all possible makers and their config options.

### Publishers

The top level property `publishers` on the configuration object is an array of publisher configurations.  Check out the [Publishers ](config/publishers/)documentation for all possible publishers and their config options.

### Plugins

The top level property `plugins` on the configuration object is an array of plugin configurations.  Check out the [Plugins ](config/plugins/)documentation for all possible plugins and their config options.

### Hooks

Hooks allow you to run your own logic at different points in the Electron Forge build process.  Each hook must be an asynchronous function that returns a promise.

```javascript
{
  hooks: {
    generateAssets: async () => {
      console.log('We should generate some assets here');
    }
  }
}
```

#### `generateAssets`

This hook is called before `start` launches the application and before `package` is run, you should use this hook to generate any static files or resources your app requires but aren't in source code.  For instance you could use this hook to generate a license file containing the license of all your dependencies.

#### `postStart`

This hook is called after `start` launches the application, you should use this hook to attach listeners to the spawned child process.  The spawned process is passed through as the second hook argument.

#### `prePackage`

This hook is called before the `package` step runs.

#### `packageAfterCopy`

This hook is called inside the [`afterCopy`](https://github.com/electron-userland/electron-packager/blob/master/docs/api.md#aftercopy) hook of Electron Packager.  The hook is passed all the arguments that Electron Packager provides its `afterCopy` hooks.

#### `packageAfterPrune`

This hook is called inside the [`afterPrune`](https://github.com/electron-userland/electron-packager/blob/master/docs/api.md#afterprune) hook of Electron Packager.  The hook is passed all the arguments that Electron Packager provides its `afterPrune` hooks.

#### `packageAfterExtract`

This hook is called inside the [`afterExtract`](https://github.com/electron-userland/electron-packager/blob/master/docs/api.md#afterextract) hook of Electron Packager.  The hook is passed all of the arguments that Electron Packager provides its `afterExtract` hooks.

#### `postPackage`

This hook is called after the `package` step has successfully completed.

#### `preMake`

This hook is called before the `make` step runs.

#### `postMake`

This hook is called after the `make` step has successfully completed.  It is passed a single argument which is an array of [`MakeResult`](https://js.electronforge.io/utils/types/interfaces/forgemakeresult.html) objects, if your hooks wishes to modify those make results it must return a new array of [`MakeResult`](https://js.electronforge.io/utils/types/interfaces/forgemakeresult) objects that Electron Forge can use from then on.

#### `readPackageJson`

This hook is called every time forge attempts to read your `package.json` file, you will be passed in the `package.json` object we have loaded and if you want to modify that object in any way you must do so and return the new value for Forge to use.  This is useful to set things like the `version` field at runtime.

### Build Identifier

This property can be used to identify different build configurations. Normally, this property is set to the channel the build will release to, or some other unique identifier.  For example, common values are `prod` and `beta`.  This identifier can be used in conjunction with the `fromBuildIdentifier` function to generate release channel or environment specific configuration.  For example:

{% code title="config.forge.js" %}
```javascript
const { utils: { fromBuildIdentifier } } = require('@electron-forge/core');

module.exports = {
  buildIdentifier: process.env.IS_BETA ? 'beta' : 'prod',
  packagerConfig: {
    appBundleId: fromBuildIdentifier({ beta: 'com.beta.app', prod: 'com.app' })
  }
}
```
{% endcode %}

In this example the `appBundleId` option passed to Electron Packager will be selected based on the `buildIdentifer` based on whether you are building for `prod` or `beta`.  This allows you to make shared configs incredibly easily as only the values that change need to be wrapped with this function.

