---
description: Create a new Electron app with Vite.
---

# Vite

To get you up and running as fast as possible with [Vite](https://vitejs.dev/), we provide a template that makes use of the [`@electron-forge/plugin-vite` module](../config/plugins/vite.md), plus some preset Vite configuration options.

{% tabs %}
{% tab title="Yarn" %}
```bash
yarn create electron-app my-new-app --template=vite
```
{% endtab %}

{% tab title="npm" %}
```bash
npm init electron-app@latest my-new-app -- --template=vite
```
{% endtab %}
{% endtabs %}

Once you've initialized the template, you'll need to run `npm start` in the generated directory.

See the [Vite Plugin](../config/plugins/vite.md) documentation for Electron Forge-specific configuration options.
