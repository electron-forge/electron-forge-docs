---
description: Create a Windows installer for your Electron app using Electron Forge.
---

# Squirrel.Windows

The Squirrel.Windows target builds your application using the [Squirrel.Windows](https://github.com/Squirrel/Squirrel.Windows) framework. It generates three files:

| File                   | Description                                           |
| ---------------------- | ----------------------------------------------------- |
| `{appName} Setup.exe`  | The main executable installer for your application    |
| `{appName}-full.nupkg` | The NuGet package file used for updates               |
| `RELEASES`             | Metadata file used to check if an update is available |

Squirrel.Windows is a no-prompt, no-hassle, no-admin method of installing Windows applications, and is therefore the most user friendly you can get.

You can only build the Squirrel.Windows target on a Windows machine or on a macOS or Linux machine with `mono` and `wine` installed.

## Usage

Add this module to the [makers](./) section of your [Forge configuration](../../configuration.md):

{% code title="forge.config.js" %}
```javascript
module.exports = {
  makers: [
    {
      name: '@electron-forge/maker-squirrel',
      config: {
        certificateFile: './cert.pfx',
        certificatePassword: process.env.CERTIFICATE_PASSWORD,
      },
    },
  ],
};
```
{% endcode %}

## Configuration

The Squirrel.Windows maker inherits all of its config options from the [`electron-winstaller`](https://github.com/electron/windows-installer) module, _except_ for `appDirectory` and `outputDirectory`, which are set by the maker.

Complete configuration options are documented in the [`MakerSquirrelConfig`](https://js.electronforge.io/modules/\_electron\_forge\_maker\_squirrel.html#MakerSquirrelConfig) types.

## Handling startup events

When first running your app, updating it, and uninstalling it, Squirrel.Windows will spawn your app an additional time with some special arguments. You can read more about these arguments on the [`electron-winstaller`](https://github.com/electron/windows-installer)  README.

The easiest way to handle these arguments and stop your app launching multiple times during these events is to use the [`electron-squirrel-startup`](https://github.com/mongodb-js/electron-squirrel-startup) module as one of the first things your app does.

{% code title="main.js" %}
```javascript
const { app } = require('electron');

// run this as early in the main process as possible
if (require('electron-squirrel-startup')) app.quit();
```
{% endcode %}
