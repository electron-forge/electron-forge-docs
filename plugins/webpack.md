# Webpack

{% hint style="danger" %}
The API of this plugin is not stable could change at any time without following semver.

Please do not use this plugin until this warning has been removed
{% endhint %}

{% hint style="info" %}
These docs are incomplete
{% endhint %}

The Webpack plugin allows you to use standard Webpack tooling to compile both your main process code and your renderer process code with built in support forHot Module Reloading in the renderer process and support for multiple renderers.

### Installation

```bash
yarn add @electron-forge/plugin-webpack --dev
```

### Basic Usage

You must provide two webpack config files, one for the main process in `mainConfig` and one for the renderer process' in `renderer.config`. See an example below:

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



