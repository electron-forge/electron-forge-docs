# Electronegativity

The Electronegativity plugin integrates the [Electronegativity tool](https://github.com/doyensec/electronegativity#electronegativity)
into the Electron Forge workflow. After packaging your Electron app, it identifies any known
misconfigurations and security anti-patterns.

## Installation

```bash
yarn add --dev @electron-forge/plugin-electronegativity
```

## Usage

Add this plugin to the [`plugins`](../../configuration.md#plugins) array in your Forge config. The
configuration options are the same as the [programmatic options for Electronegativity](https://github.com/doyensec/electronegativity#programmatically),
except for `input` and `electronVersion`.

### Example

{% code title="forge.config.js" %}
```javascript
{
  plugins: [
    [
      '@electron-forge/plugin-electronegativity',
      {
        isSarif: true
      }
    ]
  ]
}
```
{% endcode %}
