---
description: Create a Windows installer for your Electron app using Electron Forge.
---

# Squirrel.Windows

The Squirrel.Windows target builds your application using the [Squirrel.Windows](https://github.com/Squirrel/Squirrel.Windows) framework. It generates three files:

<table><thead><tr><th width="258">File</th><th>Description</th></tr></thead><tbody><tr><td><code>\{appName\} Setup.exe</code></td><td>The main executable installer for your application</td></tr><tr><td><code>\{appName\}-full.nupkg</code></td><td>The NuGet package file used for updates</td></tr><tr><td><code>RELEASES</code></td><td>Metadata file used to check if an update is available</td></tr></tbody></table>

Squirrel.Windows is a no-prompt, no-hassle, no-admin method of installing Windows applications, and is therefore the most user friendly you can get.

You can only build the Squirrel.Windows target on a Windows machine or on a Linux machine with `mono` and `wine` installed.

## Usage

Add this module to the [makers](./) section of your [Forge configuration](../configuration.mdx):

```jsx title="forge.config.js" 
module.exports = {
  makers: [
    {
      name: '@electron-forge/maker-squirrel',
      config: {
        certificateFile: './cert.pfx',
        certificatePassword: process.env.CERTIFICATE_PASSWORD
      }
    }
  ]
};
```


## Configuration

The Squirrel.Windows maker inherits all of its config options from the [`electron-winstaller`](https://github.com/electron/windows-installer) module, _except_ for `appDirectory` and `outputDirectory`, which are set by the maker.

Complete configuration options are documented in the [`MakerSquirrelConfig`](https://js.electronforge.io/modules/\_electron\_forge\_maker\_squirrel.html#MakerSquirrelConfig) types.

### Mandatory metadata

Squirrel.Windows requires mandatory package metadata to satisfy the [`.nuspec`](https://learn.microsoft.com/en-us/nuget/reference/nuspec) manifest format. There are two ways to specify this information in Electron Forge.

#### In package.json

By default, the Squirrel.Windows maker fetches the `author` and `description` fields in the  project's package.json file.

```json title="package.json"
{
  // ...
  "author": "Alice and Bob",
  "description": "An example Electron app"
  // ...
}
```


#### In your Forge config

Alternatively, you can also override these values directly in your Squirrel.Windows maker config.

```jsx title="forge.config.js"
module.exports = {
  makers: [
    {
      name: '@electron-forge/maker-squirrel',
      config: {
        authors: 'Alice and Bob',
        description: 'An example Electron app'
      }
    }
  ]
};
```


:::warning
Note that the Forge config field is **"authors"** while the package.json field is called **"author".**
:::

## Handling startup events

When first running your app, updating it, and uninstalling it, Squirrel.Windows will spawn your app an additional time with some special arguments. You can read more about these arguments on the [`electron-winstaller`](https://github.com/electron/windows-installer)  README.

The easiest way to handle these arguments and stop your app launching multiple times during these events is to use the [`electron-squirrel-startup`](https://github.com/mongodb-js/electron-squirrel-startup) module as one of the first things your app does.

```jsx title="main.js"
const { app } = require('electron');

// run this as early in the main process as possible
if (require('electron-squirrel-startup')) app.quit();
```

