# Squirrel.Windows

The Squirrel.Windows target builds a number of files required to distribute apps using the Squirrel.Windows framework. It generates a `{appName} Setup.exe` file which is the main installer for your application, `{appName}-full.nupkg` and a `RELEASES` file which you use to issue updates to your application.

Squirrel.Windows is a no-prompt, no-hassle, no-admin method of installingWindows applications and is therefore the most user friendly you can get. You can only build the Squirrel.Windows target on a Windows machine or on a macOS /Linux machine with `mono` and `wine` installed.

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

