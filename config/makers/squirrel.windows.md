# Squirrel.Windows

The Squirrel.Windows target builds a number of files required to distribute apps using the Squirrel.Windows framework. It generates a `{appName} Setup.exe` file which is the main installer for your application, `{appName}-full.nupkg` and a `RELEASES` file which you use to issue updates to your application.

Squirrel.Windows is a no-prompt, no-hassle, no-admin method of installing Windows applications and is therefore the most user friendly you can get. You can only build the Squirrel.Windows target on a Windows machine or on a macOS /Linux machine with `mono` and `wine` installed.

Configuration options are documented in [`MakerSquirrelConfig`](https://js.electronforge.io/maker/squirrel/interfaces/makersquirrelconfig.html).

### Usage

```javascript
{
  name: '@electron-forge/maker-squirrel'
  config: {
    certificateFile: './cert.pfx',
    certificatePassword: 'this-is-a-secret'
  }
}
```

### My app is launching multiple times during install????

When Squirrel installs your app it actually launches it a few times with some special arguments allowing you to do some work during installation or some clean up during uninstall.  You can read more about these arguments on the [Electron Windows Installer](https://github.com/electron/windows-installer#handling-squirrel-events) README.

The easiest way to handle these arguments and stop your app launching multiple times during install is to use [`electron-squirrel-startup`](https://github.com/mongodb-js/electron-squirrel-startup) as one of the first things your app does.  E.g.

{% code title="main.js" %}
```javascript
const { app } = require('electron');

if (require('electron-squirrel-startup')) return app.quit();

```
{% endcode %}

