---
description: How to configure Webpack with Electron Forge using its first-party plugin.
---

# Webpack

The Webpack plugin allows you to use standard Webpack tooling to compile both your main process code and your renderer process code, with built in support for Hot Module Reloading in the renderer process and support for multiple renderers.

## Installation

{% tabs %}
{% tab title="Yarn 1" %}
```bash
yarn add --dev @electron-forge/plugin-webpack
```
{% endtab %}

{% tab title="NPM" %}
```
npm install --save-dev @electron-forge/plugin-webpack
```
{% endtab %}
{% endtabs %}

## Basic Usage

### Configuration

You must provide two Webpack config files: one for the main process in `mainConfig`, and one for the renderer process in `renderer.config`. The complete config options are available at [`WebpackPluginConfig`](https://js.electronforge.io/plugin/webpack/interfaces/webpackpluginconfig.html). For example, in your [Forge configuration](../../configuration.md):

{% tabs %}
{% tab title="package.json" %}
```javascript
// If your config is only in package.json:
// Only showing the relevant configuration for brevity
{
  "config": {
    "forge": {
      "plugins": [
        ["@electron-forge/plugin-webpack", {
          "mainConfig": "./webpack.main.config.js",
          "renderer": {
            "config": "./webpack.renderer.config.js",
            "entryPoints": [{
              "name": "main_window",
              "html": "./src/renderer/index.html",
              "js": "./src/renderer/index.js"
            }]
          }
        }]
      ]
    }
  }
}
```
{% endtab %}

{% tab title="forge.config.js" %}
```javascript
// If you have set config.forge to a JavaScript file path in package.json:
// Only showing the relevant configuration for brevity
module.exports = {
  plugins: [
    ['@electron-forge/plugin-webpack', {
      mainConfig: './webpack.main.config.js',
      renderer: {
        config: './webpack.renderer.config.js',
        entryPoints: [{
          name: 'main_window',
          html: './src/renderer/index.html',
          js: './src/renderer/index.js'
        }]
      }
    }]
  ]
}
```
{% endtab %}
{% endtabs %}

The above configuration is the default for the [Webpack template](../../templates/webpack-template.md).

#### Node integration

{% hint style="info" %}
The following configuration option is available in Electron Forge version 6.0.0 beta 58 and above.
{% endhint %}

`nodeIntegration` adjusts the Webpack config for all renderer entries based on whether `nodeIntegration` for the `BrowserWindow` is enabled.

If you set `nodeIntegration` to `true` in a given renderer's `BrowserWindow` constructor, you'll need to set the same `nodeIntegration` value in the corresponding Webpack plugin renderer's configuration:

{% tabs %}
{% tab title="package.json" %}
```javascript
// If your config is only in package.json:
// Only showing the relevant configuration for brevity
{
  "config": {
    "forge": {
      "plugins": [
        ["@electron-forge/plugin-webpack", {
          "mainConfig": "./webpack.main.config.js",
          "renderer": {
            "nodeIntegration": true, // defaults to false
            "config": "./webpack.renderer.config.js",
            "entryPoints": [/* entry point config */]
          }
        }]
      ]
    }
  }
}
```
{% endtab %}

{% tab title="forge.config.js" %}
```javascript
// If you have set config.forge to a JavaScript file path in package.json:
// Only showing the relevant configuration for brevity
module.exports = {
  plugins: [
    ['@electron-forge/plugin-webpack', {
      renderer: {
        nodeIntegration: true, // defaults to false
        config: './webpack.renderer.config.js',
        entryPoints: [/* entry point config */]
      },
      mainConfig: './webpack.main.config.js',
      // other Webpack plugin config...
    }]
  ]
}
```
{% endtab %}
{% endtabs %}

There is an additional `nodeIntegration` property within the entry point config. This overrides the Webpack config for this renderer based on whether the `nodeIntegration` for the `BrowserWindow` is enabled. Namely, for Webpack's `target` option:

- when `nodeIntegration` is true, the `target` is `electron-renderer`.
- when `nodeIntegration` is false, the `target` is `web`.

This value defaults to false or the value set for all entries (in the renderer-level config).

```javascript
plugins: [
    [
      '@electron-forge/plugin-webpack',
      {
        mainConfig: './webpack.main.config.js',
        renderer: {
          config: './webpack.renderer.config.js',
          nodeIntegration: true, // Implies `target: 'electron-renderer'` for all entrypoints
          entryPoints: [
            {
              html: './src/app/app.html',
              js: './src/app/app.tsx',
              name: 'app'
            },
            {
              html: './src/mediaPlayer/index.html',
              js: './src/mediaPlayer/index.tsx',
              name: 'media_player',
              nodeIntegration: false // Overrides the default nodeIntegration set in the Renderer Config
            }
          ]
        }
      ]
    ]
```

#### Content Security Policy

{% hint style="info" %}
The following configuration option is available in Electron Forge version 6.0.0 beta 58 and above.
{% endhint %}

In development mode, you can set a [content security policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP) by setting `devContentSecurityPolicy` in your Forge Webpack plugin configuration _(note that it is separate from the main and renderer configuration)_:

{% tabs %}
{% tab title="package.json" %}
```javascript
// If your config is only in package.json:
// Only showing the relevant configuration for brevity
{
  "config": {
    "forge": {
      "plugins": [
        ["@electron-forge/plugin-webpack", {
          // other Webpack plugin config...
          "devContentSecurityPolicy": "default-src 'self' 'unsafe-inline' data:; script-src 'self' 'unsafe-eval' 'unsafe-inline' data:",
          // other Webpack plugin config...
          "mainConfig": "./webpack.main.config.js",
          "renderer": { /* renderer config here, see above section */ }
        }]
      ]
    }
  }
}
```
{% endtab %}

{% tab title="forge.config.js" %}
```javascript
// If you have set config.forge to a JavaScript file path in package.json:
// Only showing the relevant configuration for brevity
module.exports = {
  plugins: [
    ['@electron-forge/plugin-webpack', {
      // other Webpack plugin config...
      devContentSecurityPolicy: `default-src 'self' 'unsafe-inline' data:; script-src 'self' 'unsafe-eval' 'unsafe-inline' data:`,
      // other Webpack plugin config...
      mainConfig: './webpack.main.config.js',
      renderer: { /* renderer config here, see above section */ },
    }]
  ]
}
```
{% endtab %}
{% endtabs %}

Please note that if you wish to use source maps in development, you'll need to set `'unsafe-eval'` for the `script-src` directive. Using `'unsafe-eval'` will cause Electron itself to trigger a warning in the DevTools console about having that value enabled, which is usually fine so long as you **do not set that value in production**.

#### Dev server

{% hint style="info" %}
The following configuration option is available in Electron Forge version 6.0.0 beta 60 and above.
{% endhint %}

In development mode, you can change most [`webpack-dev-server` options](https://webpack.js.org/configuration/dev-server/) by setting `devServer`in your Forge Webpack plugin configuration _(note that it is separate from the main and renderer configuration)_:

{% tabs %}
{% tab title="package.json" %}
```javascript
// If your config is only in package.json:
// Only showing the relevant configuration for brevity
{
  "config": {
    "forge": {
      "plugins": [
        ["@electron-forge/plugin-webpack", {
          // other Webpack plugin config...
          "devServer": {
            "stats": "verbose"
          },
          // other Webpack plugin config...
          "mainConfig": "./webpack.main.config.js",
          "renderer": { /* renderer config here, see above section */ }
        }]
      ]
    }
  }
}
```
{% endtab %}

{% tab title="forge.config.js" %}
```javascript
// If you have set config.forge to a JavaScript file path in package.json:
// Only showing the relevant configuration for brevity
module.exports = {
  plugins: [
    ['@electron-forge/plugin-webpack', {
      // other Webpack plugin config...
      devServer: {
        stats: 'verbose'
      },
      // other Webpack plugin config...
      mainConfig: './webpack.main.config.js',
      renderer: { /* renderer config here, see above section */ }
    }]
  ]
}
```
{% endtab %}
{% endtabs %}

### Project Setup

You need to do two things in your project files as well in order to make this plugin work.

First, your `main` entry in your `package.json` file needs to point at `"./.webpack/main"` like so:

{% code title="package.json" %}
```javascript
{
  "name": "my-app",
  "main": "./.webpack/main",
  ...
}
```
{% endcode %}

Second, all `loadURL` and `preload` paths need to reference the entry points' magic global variables that this plugin will define for you. Each entry point has two globals defined: one suffixed with `_WEBPACK_ENTRY`, and the other suffixed with `_PRELOAD_WEBPACK_ENTRY`. These point to the paths for your renderer entry point and your preload script path, respectively. In the case of the `main_window` entry point in the earlier example, the global variables will be named `MAIN_WINDOW_WEBPACK_ENTRY` and `MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY`. An example of how to use them is given below:

{% code title="main.js" %}
```javascript
const mainWindow = new BrowserWindow({
  webPreferences: {
    preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
  }
});

mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);
```
{% endcode %}

## Native Modules

{% hint style="info" %}
The following instructions are for Electron Forge version 6.0.0 beta 58 and above.
{% endhint %}

If you used the [Webpack](../../templates/webpack-template.md) or [TypeScript + Webpack](../../templates/typescript-+-webpack-template.md) templates to create your application, native modules will mostly work out of the box. If you are setting up the plugin manually, you can make native modules work by adding the following two loaders to your `module.rules` configuration in your Webpack config. Ensure you install both `node-loader` and `@vercel/webpack-asset-relocator-loader` as development dependencies.

{% hint style="warning" %}
Warning: Electron Forge needs to monkeypatch the asset relocator loader in order for it to work with Electron properly, so the version has been pinned to ensure compatibility. If you upgrade that version, you do so at your own risk.
{% endhint %}

{% code title="webpack.main.config.js" %}
```javascript
module.exports = {
  module: {
    rules: [
      {
        // We're specifying native_modules in the test because the asset
        // relocator loader generates a "fake" .node file which is really
        // a cjs file.
        test: /native_modules\/.+\.node$/,
        use: 'node-loader',
      },
      {
        test: /\.(m?js|node)$/,
        parser: { amd: false },
        use: {
          loader: '@vercel/webpack-asset-relocator-loader',
          options: {
            outputAssetBase: 'native_modules',
          },
        },
      },
    ]
  }
}
```
{% endcode %}

If the asset relocator loader does not work for your native module, you may want to consider using the [externals configuration](https://webpack.js.org/configuration/externals/).

{% hint style="warning" %}
In v6 beta versions before beta 58, the Webpack templates used a fork of the asset relocator, `@marshallofsound/webpack-asset-relocator-loader`. **It is recommended to remove the fork and migrate to `@vercel/webpack-asset-relocator-loader`**.
{% endhint %}

## Hot Reloading

All your renderer processes in development will have hot reloading enabled by default. It is unfortunately impossible to do hot module reloading inside a renderer preload script, WebWorkers, and the main process itself. However, Webpack is constantly watching and recompiling those files so to get updates for preload scripts simply reload the window. For the main process, just type `rs` in the console you launched `electron-forge` from and we will restart your app for you with the new main process code.

## What happens in production?

In theory, you shouldn't need to care. In development we spin up `webpack-dev-server` instances to power your renderer processes, in prod we just build the static files. Assuming you use the globals we explained in [Project Setup](webpack.md#project-setup), everything should Just Work™ when your app is packaged.

## How do I do virtual routing?

If you want to use something like [`react-router`](https://github.com/ReactTraining/react-router) to do virtual routing in your app, you will need to ensure you use a history method that is not based on the browser history APIs. Browser history will work in development but not in production, as your code will be loaded from the filesystem, not a webserver. In the `react-router` case, you should use the [`MemoryRouter`](https://github.com/ReactTraining/react-router/blob/master/packages/react-router/docs/api/MemoryRouter.md) to make everything work.
