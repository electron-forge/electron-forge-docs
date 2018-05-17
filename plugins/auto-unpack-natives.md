# Auto Unpack Natives

This plugin will automatically add all native modules in your `node_modules` folder to the `asar.unpack` config option in your `packagerConfig`.  If you have any native modules as all you should probably use this to reduce loading times and disk consumption on your users machines

## Installation

```bash
yarn add @electron-forge/plugin-auto-unpack-natives --dev
```

## Usage

You must add this plugin to your `plugins` array in your forge config

The complete config options are available at `AutoUnpackNativesConfig`. 

{% code-tabs %}
{% code-tabs-item title="forge.config.js" %}
```javascript
module.exports = {
  plugins: [
    ['@electron-forge/plugin-auto-unpack-natives', {
      extensions: ['.node']
    }]
  ]
}
```
{% endcode-tabs-item %}
{% endcode-tabs %}

The `extensions` configuration option in the example above is completely optional, the default is `.node` .

