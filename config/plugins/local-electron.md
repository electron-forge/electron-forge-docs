# Local Electron

{% hint style="info" %}
This plugin should only be used by people who are building Electron locally themselves, if you want to use a fork of Electron check out the [environment variables](https://github.com/electron-userland/electron-download#usage) you can use to configure `electron-download`.
{% endhint %}

This plugin allows you to both run and package/make your app using a **local** build of Electron, this is incredibly useful if you want to test a feature or a bugfix in your app before making a PR up to the Electron repository.  If you want to set up a local build of Electron you should check out the build instructions for your platform \([Windows](https://electronjs.org/docs/development/build-instructions-windows), [macOS](https://electronjs.org/docs/development/build-instructions-osx) or [Linux](https://electronjs.org/docs/development/build-instructions-linux)\).

### Usage

{% code title="forge.config.js" %}
```javascript
{
  plugins: [
    ['@electron-forge/plugin-local-electron', {
      electronPath: '/Users/me/projects/electron/out/D'
    }]
  ]
}
```
{% endcode %}

### Configuration

All possible configuration options are documented in [`LocalElectronPluginConfig`](https://js.electronforge.io/interfaces/_electron_forge_plugin_local_electron.LocalElectronPluginConfig.html).  Please note that all paths must be absolute, you should use `path.resolve()` to make things deterministic.

