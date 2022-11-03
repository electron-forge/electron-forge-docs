---
description: >-
  Check for misconfigurations and security anti-patterns with the
  Electronegativity tool.
---

# Electronegativity Plugin

The Electronegativity plugin integrates Doyensec's [Electronegativity tool](https://github.com/doyensec/electronegativity#electronegativity) into the Electron Forge workflow. After packaging your Electron app, it identifies any known misconfigurations and security anti-patterns.

## Installation

{% tabs %}
{% tab title="Yarn" %}
```shell
yarn add --dev @electron-forge/plugin-electronegativity
```
{% endtab %}

{% tab title="npm" %}
```shell
npm install --save-dev @electron-forge/plugin-electronegativity
```
{% endtab %}
{% endtabs %}

## Usage

Add this plugin to the [`plugins`](../../configuration.md#plugins) array in your Forge configuration. All [programmatic options for Electronegativity](https://github.com/doyensec/electronegativity#programmatically), except for `input` and `electronVersion`.

### Example

{% code title="forge.config.js" %}
```javascript
module.exports = {
  //...
  {
    plugins: [
      {
        name: '@electron-forge/plugin-electronegativity',
        config: {
          isSarif: true
        }
      }
    ]
  }
  //...
}
```
{% endcode %}
