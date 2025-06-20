---
description: Create a new Electron app with webpack and TypeScript.
---

# Webpack + Typescript

To get you up and running as fast as possible with [TypeScript](https://www.typescriptlang.org/) and [webpack](https://webpack.js.org/), we provide a template that makes use of the [`@electron-forge/plugin-webpack` module](../config/plugins/webpack.md) with sane TypeScript configuration defaults.

```bash
npx create-electron-app@latest my-new-app --template=webpack-typescript
```

{% hint style="warning" %}
There have been reports that using the Git Bash command line on Windows specifically with this template will prevent the Electron app from rendering (packaged apps are fine). We recommend that on Windows, you use CMD.exe, PowerShell, or [WSL2](../guides/developing-with-wsl.md).
{% endhint %}

Once you've initialized the template, you'll need to run `npm start` in the generated directory. See the [Webpack Plugin](../config/plugins/webpack.md) documentation for Electron Forge-specific configuration options.

Note: Executing `npm start` immediately after creating the app will reliably produce two errors due to [an issue with electron](https://github.com/electron/electron/issues/41614)that is currently marked as "wontfix." The appropriate solution for you depends on your specific app, but a temporary fix can be performed with two changes to `main.js`. First, comment out line 23 (`mainWindow.webContents.openDevTools()`), second, add `app.disableHardwareAcceleration()` at the end of the file.