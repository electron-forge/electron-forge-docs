---
description: How to create an Electron app with Vue 3 and Electron Forge
---

# Vue 3

Adding Vue 3 support to a basic Electron Forge template.

### Create the app

Create a standard Electron project per the [Vite](../../templates/vite.md) guide.

### Add the Vue 3 dependency

Add the Vue 3 package to your `dependencies`:

{% tabs %}
{% tab title="yarn" %}

```bash
yarn add vue
yarn add -D @vitejs/plugin-vue
```

{% endtab %}

{% tab title="pnpm" %}

```bash
pnpm add vue
pnpm add -D @vitejs/plugin-vue
```

{% endtab %}

{% tab title="npm" %}

```bash
npm install --save vue
npm install --save-dev @vitejs/plugin-vue
```

{% endtab %}
{% endtabs %}

### Integrate Vue 3 code

You should now be able to start writing and using Vue 3 components in your Electron app. The following is a very minimal example of how to start to add Vue 3 code:

{% tabs %}
{% tab title="src/index.html" %}
Add the following before the closing `</body>` tag:

```markup
<div id="app"></div>
<script type="module" src="./renderer.js"></script>
```

{% endtab %}

{% tab title="src/App.vue" %}

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

```javascript
import { createApp } from "vue";
import App from "./App.vue";

createApp(App).mount("#app");
```

{% endtab %}

{% tab title="vite.renderer.config.mjs" %}

```javascript
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config
export default defineConfig({
  plugins: [vue()],
});
```

{% endtab %}
{% endtabs %}
