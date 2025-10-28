---
description: Transform and bundle code for your Electron Forge app with Vite.
---

# Vite Plugin

{% hint style="info" %}
As of Electron Forge v7.5.0, Vite support for Electron Forge has been marked as **experimental** in order to reflect its stage in development and to provide maintainers with the ability to release fixes and improvements rapidly. Future minor releases may contain breaking changes, but migration steps will be listed in release notes.\
\
For more context, see the Electron Forge [v7.5.0 release notes](https://github.com/electron/forge/releases/tag/v7.5.0).
{% endhint %}

This plugin makes it easy to set up standard Vite tooling to compile both your main process code and your renderer process code.

## Installation

```shell
npm install --save-dev @electron-forge/plugin-vite
```

## Usage

### Plugin configuration

You must provide two Vite configuration files: one for the main process in `vite.main.config.js`, and one for the renderer process in `vite.renderer.config.js`.

For example, this is the [configuration](../configuration.md) taken from Forge's [Vite template](../../templates/vite.md):

{% tabs %}
{% tab title="forge.config.js" %}
```javascript
module.exports = {
  plugins: [
    {
      name: '@electron-forge/plugin-vite',
      config: {
        // `build` can specify multiple entry builds, which can be
        // Main process, Preload scripts, Worker process, etc.
        build: [
          {
            // `entry` is an alias for `build.lib.entry`
            // in the corresponding file of `config`.
            entry: 'src/main.js',
            config: 'vite.main.config.mjs'
          },
          {
            entry: 'src/preload.js',
            config: 'vite.preload.config.mjs'
          }
        ],
        renderer: [
          {
            name: 'main_window',
            config: 'vite.renderer.config.mjs'
          }
        ]
      }
    }
  ]
};
```
{% endtab %}

{% tab title="package.json" %}
```json
{
  // ...
  "config": {
    "forge": {
      "plugins": [
        {
          "name": "@electron-forge/plugin-vite",
          "config": {
            "build": [
              {
                "entry": "src/main.js",
                "config": "vite.main.config.mjs"
              },
              {
                "entry": "src/preload.js",
                "config": "vite.preload.config.mjs"
              }
            ],
            "renderer": [
              {
                "name": "main_window",
                "config": "vite.renderer.config.mjs"
              }
            ]
          }
        }
      ]
    }
  }
  // ...
}
```
{% endtab %}
{% endtabs %}

Config options will largely follow the same standards as non-Electron Vite projects. You can reference [Vite's documentation here](https://vitejs.dev/config/) for more examples of how to configure each of your entry point's config files.

### Project files

Vite's build config generates a separate entry for the main process and preload script, as well as each renderer process.

Your `main` entry in your `package.json` file needs to point at `".vite/build/main"`, like so:

{% code title="package.json" %}
```json
{
  "name": "my-vite-app",
  "main": ".vite/build/main.js",
  // ...
}
```
{% endcode %}

If using the Vite template, this should be automatically set up for you.

## Advanced configuration

### Build concurrency

Under the hood, the Vite plugin spawns a separate Vite build for each target. These builds first run in parallel for all renderer targets, then for all main and preload targets. Vite can sometimes use a lot of memory, and having many builds simultaneously can cause Out of Memory issues (see [vitejs/vite#2433](https://github.com/vitejs/vite/issues/2433)).

Starting from Forge v7.9.0, you can pass a boolean or integer value to the plugin's `concurrent` option to limit how many build jobs run at once to alleviate memory issues.

{% code title="forge.config.js" %}
```javascript
module.exports = {
  plugins: {
    name: '@electron-forge/plugin-vite',
    config: {
      build: [/* ... */],
      renderer: [/* ... */],
      concurrent: false // accepts a boolean or positive integer
    }
  }
};
```
{% endcode %}

### Custom root for renderer

Under the hood, the Vite plugin merge user based config with own config.
{% code title="packages/plugin/vite/src/config/vite.renderer.config.ts" %}
```typescript
const config: UserConfig = {
    root,
    mode,
    base: './',
    build: {
      copyPublicDir: true,
      outDir: `.vite/renderer/${name}`,
    },
    plugins: [pluginExposeRenderer(name)],
    resolve: {
      preserveSymlinks: true,
    },
    clearScreen: false,
  };
```
{% endcode %}

Here, root is the absolute path to the root directory.

If root is overridden in the user configuration, the resulting path before the build is incorrect, and the renderer files are not moved to the `out` directory.

To avoid this behavior, you also need to update the relative path in the `build.outDir` field. See the example for more details.

{% code title="vite.renderer.config.ts" %}
```typescript
import path from 'node:path';
import { defineConfig } from 'vite';

export default defineConfig({
  base: './',
  root: path.join(__dirname, 'src', 'renderer', 'MainWindow'),
  build: {
    copyPublicDir: true,
    outDir: path.join('..', '..', '..', '.vite', 'renderer', 'main_window'),
  },
});

```
{% endcode %}

### Native Node modules

If you used the [Vite](../../templates/vite.md) template to create your application, native modules will mostly work out of the box. However, to avoid possible build issues, we recommend instructing Vite to load them as external packages:

{% code title="vite.main.config.js" %}
```javascript
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    rollupOptions: {
      external: [
        'serialport',
        'sqlite3'
      ]
    }
  }
});
```
{% endcode %}

### Hot Module Replacement (HMR)

In order to use Vite's [Hot Module Replacement (HMR)](https://vitejs.dev/guide/features.html#hot-module-replacement), all `loadURL` paths need to reference the global variables that the Vite plugin will define for you:

* The dev server will be suffixed with `_DEV_SERVER_URL`
* The static file path will be suffixed with `_VITE_NAME`

In the case of the `main_window`, the global variables will be named `MAIN_WINDOW_VITE_DEV_SERVER_URL` and `MAIN_WINDOW_VITE_NAME`. An example of how to use them is given below:

{% code title="main.js" %}
```javascript
const mainWindow = new BrowserWindow({ /* ... */ });

if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
  mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
} else {
  mainWindow.loadFile(path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`));
};
```
{% endcode %}

{% hint style="info" %}
If using TypeScript, the variables can be defined as such:

<pre class="language-typescript" data-title="main.js (Main Process)"><code class="lang-typescript"><strong>declare const MAIN_WINDOW_VITE_DEV_SERVER_URL: string;
</strong>declare const MAIN_WINDOW_VITE_NAME: string;
</code></pre>
{% endhint %}
