---
description: How to create an Electron app with Vue and Electron Forge
---

# Vue 3

Vue 3 can be added to Electron Forge's Vite template with a few setup steps.

{% hint style="info" %}

The following guide has been tested with Vue 3 and Vite 4.

{% endhint %}

## Setting up the app

Create an Electron app using Electron Forge's [Vite](../../templates/vite.md) template.

```bash
npm init electron-app@latest my-vue-app -- --template=vite
```

## Adding dependencies

Add the `vue` npm package to your `dependencies` and the `@vitejs/plugin-vue` package to your `devDependencies`:

```bash
npm install vue
npm install --save-dev @vitejs/plugin-vue
```

## Integrating Vue 3 code

You should now be able to start using Vue components in your Electron app. The following is a very minimal example of how to start to add Vue 3 code:

{% tabs %}
{% tab title="index.html" %}

Replace the contents of `index.html` with a `<div>` element with the `#app` id attribute.

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>Hello World!</title>
  </head>
  <body>
    <div id="app"></div>
    <script type="module" src="/src/renderer.js"></script>
  </body>
</html>
```

{% endtab %}

{% tab title="src/App.vue" %}

Add the contents from the template back to `src/App.vue`.

```vue
<template>
  <h1>💖 Hello World!</h1>
  <p>Welcome to your Electron application.</p>
</template>

<script setup>
console.log('👋 This message is being logged by "App.vue", included via Vite');
</script>
```

{% endtab %}

{% tab title="src/renderer.js" %}

Mount `App.vue` into the DOM with Vue's `createApp` API.

```javascript
import { createApp } from 'vue';
import App from './App.vue';

createApp(App).mount('#app');
```

{% endtab %}

{% tab title="vite.renderer.config.mjs" %}

Configure the Vue plugin for Vite.js.

```javascript
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config
export default defineConfig({
  plugins: [vue()]
});
```

{% endtab %}
{% endtabs %}
