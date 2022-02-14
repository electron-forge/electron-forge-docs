---
description: Create a new Electron app with TypeScript and Webpack.
---

# TypeScript + Webpack

To get you up and running as fast as possible with [TypeScript](https://www.typescriptlang.org/) and [Webpack](https://webpack.js.org/), we provide a template that makes use of the [`@electron-forge/plugin-webpack` module](../config/plugins/webpack.md) with same TypeScript configuration defaults.

{% tabs %}
{% tab title="NPM" %}
```text
npx create-electron-app my-new-app --template=typescript-webpack
```
{% endtab %}

{% tab title="Yarn" %}
```
yarn create electron-app my-new-app --template=typescript-webpack
```
{% endtab %}
{% endtabs %}

{% hint style="warning" %}
There have been reports that using the Git Bash command line on Windows specifically with this template will prevent the Electron app from rendering \(packaged apps are fine\). We recommend that on Windows, you use CMD.exe, PowerShell, or [WSL2](../guides/developing-with-wsl.md).
{% endhint %}

Once you've initialized the template, you'll need to run `npm start`in the generated directory. See the [Webpack Plugin](../config/plugins/webpack.md) documentation for Electron Forge-specific configuration options.

