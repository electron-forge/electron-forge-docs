# Debugging

## Debugging on the Command Line

If you're using Electron 1.8 or later, you can specify the `--inspect-electron` flag when running `electron-forge start`, which will set the [Electron `--inspect`flag](http://electronjs.org/docs/tutorial/debugging-main-process#--inspectport) with the default debugger port.

```bash
electron-forge start --inspect-electron
```

This will allow you to open `chrome://inspect` in Google Chrome and attach a debugger to the main process of your app.

## Debugging with VS Code

Debugging your Electron main process through VS Code is ridiculously easy with Forge. Simply add this as a launch config in VSCode and you're good to go.

{% hint style="info" %}
You need to be using Electron 1.8 or later for this launch config to work.

If you are using &lt; 1.8 you should really be updating Electron anyway.
{% endhint %}

{% code title="launch.config" %}
```jsonc
{
  "type": "node",
  "request": "launch",
  "name": "Electron Main",
  "runtimeExecutable": "${workspaceFolder}/node_modules/.bin/electron-forge-vscode-nix",
  "windows": {
    "runtimeExecutable": "${workspaceFolder}/node_modules/.bin/electron-forge-vscode-win.cmd"
  },
  // runtimeArgs will be passed directly to your Electron application
  "runtimeArgs": [
    "foo",
    "bar"
  ],
  "cwd": "${workspaceFolder}",
  "console": "integratedTerminal"
}
```
{% endcode %}

## Debugging with WebStorm or Other Jetbrains IDEs

{% hint style="info" %}
This assumes your `package.json` has a `"start": "electron-forge start"` script.
{% endhint %}

1. Access the `Run > Debug...` menu and select the `Edit Configurations...` option to open the `Run/Debug Configurations` window.
2. Click on the `Add new configuration` button (the `+` icon) in the upper-left corner and select the `npm` template.
3. In the `Scripts` dropdown menu, select `start`.
4. Click on `Debug` to start debugging your app.
