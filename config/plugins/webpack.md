# Webpack

The Webpack plugin allows you to use standard Webpack tooling to compile both your main process code and your renderer process code, with built in support for Hot Module Reloading in the renderer process and support for multiple renderers.

## Installation

```bash
yarn add @electron-forge/plugin-webpack --dev
```

## Basic Usage

### Configuration

You must provide two Webpack config files: one for the main process in `mainConfig`, and one for the renderer process in `renderer.config`. The complete config options are available at [`WebpackPluginConfig`](https://js.electronforge.io/plugin/webpack/interfaces/webpackpluginconfig.html). See an example below:

```javascript
{
  plugins: [
    ['@electron-forge/plugin-webpack', {
      mainConfig: './webpack.main.config.js',
      renderer: {
        config: './webpack.renderer.config.js',
        entryPoints: [{
          html: './src/renderer/index.html',
          js: './src/renderer/index.js',
          name: 'main_window'
        }]
      }
    }]
  ]
}
```

### Project Setup

You need to do two things in your project files as well in order to make this plugin work.

First, your `main` entry in your `package.json` file needs to point at `"./.webpack/main"` like so:

{% code-tabs %}
{% code-tabs-item title="package.json" %}
```javascript
{
  "name": "my-app",
  "main": "./.webpack/main",
  ...
}
```
{% endcode-tabs-item %}
{% endcode-tabs %}

Second, all `loadUrl` and `preload` paths need to reference the magical globals that this plugin will define for you for each of your entry points.  For an entry point with the name `main_window`, two variables will be defined: `MAIN_WINDOW_WEBPACK_ENTRY` and `MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY`. These point to the paths for your renderer entry point and your preload script path, respectively.  An example is given below:

{% code-tabs %}
{% code-tabs-item title="main.js" %}
```javascript
const mainWindow = new BrowserWindow({
  webPreferences: {
    preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
  }
});

mainWindow.loadUrl(MAIN_WINDOW_WEBPACK_ENTRY);
```
{% endcode-tabs-item %}
{% endcode-tabs %}

## Native Modules

If you used the Webpack Template to create your application, native modules will work out of the box. If you are setting up the plugin manually, you can make native modules work by adding the following two loaders to your `module.rules` configuration in your Webpack config.  Ensure you install both `node-loader` and `@marshallofsound/webpack-asset-relocator-loader` as development dependencies.

{% code-tabs %}
{% code-tabs-item title="webpack.main.config.js" %}
```javascript
module.exports = {
  modules: {
    rules: [
      {
        test: /\.node$/,
        use: 'node-loader',
      },
      {
        test: /\.(m?js|node)$/,
        parser: { amd: false },
        use: {
          loader: '@marshallofsound/webpack-asset-relocator-loader',
          options: {
            outputAssetBase: 'native_modules',
          },
        },
      },
    ]
  }
}
```
{% endcode-tabs-item %}
{% endcode-tabs %}

## Hot Reloading

All your renderer processes in development will have hot reloading enabled by default. It is unfortunately impossible to do hot module reloading inside a renderer preload script, WebWorkers, and the main process itself.  However, Webpack is constantly watching and recompiling those files so to get updates for preload scripts simply reload the window. For the main process, just type `rs` in the console you launched `electron-forge` from and we will restart your app for you with the new main process code.

## What happens in production?

In theory, you shouldn't need to care.  In development we spin up `webpack-dev-server` instances to power your renderer processes, in prod we just build the static files.  Assuming you use the globals we explained in [Project Setup](webpack.md#project-setup), everything should Just Work™ when your app is packaged.

## How do I do virtual routing?

If you want to use something like [`react-router`](https://github.com/ReactTraining/react-router) to do virtual routing in your app you will need to ensure you use a history method that is not based on the browser history APIs.  Browser history will work in development but not in production as your code will be loaded from the filesystem not a webserver.  In the `react-router` case you should use the [`MemoryRouter`](https://github.com/ReactTraining/react-router/blob/master/packages/react-router/docs/api/MemoryRouter.md) to make everything work.

