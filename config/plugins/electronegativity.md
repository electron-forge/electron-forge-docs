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
<pre class="language-shell"><code class="lang-shell"><strong>yarn add --dev @electron-forge/plugin-electronegativity</strong></code></pre>
{% endtab %}

{% tab title="npm" %}
<pre class="language-shell"><code class="lang-shell"><strong>npm install --save-dev @electron-forge/plugin-electronegativity</strong></code></pre>
{% endtab %}
{% endtabs %}

## Usage

Add this plugin to the [`plugins`](../../start-here/configuration.md#plugins) array in your Forge configuration. All [programmatic options for Electronegativity](https://github.com/doyensec/electronegativity#programmatically), except for `input` and `electronVersion`.

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
