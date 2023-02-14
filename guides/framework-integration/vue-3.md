---
description: How to create an Electron app with Vue 3 and Electron Forge
---

# Vue 3

Adding Vue 3 support to a basic Electron Forge template doesn't require a complicated boilerplate to get started.

### Create the app

Create a standard Electron per the [Getting Started](../../#the-basics) guide.

### Add the Vue 3 dependency

Add the Vue 3 package to your `dependencies`:

{% tabs %}
{% tab title="NPM" %}

```bash
npm install --save vue
```

{% endtab %}

{% tab title="Yarn" %}

```bash
yarn add vue
```

{% endtab %}
{% endtabs %}

### Integrate Vue 3 code

You should now be able to start writing and using Vue 3 components in your Electron app. The following is a very minimal example of how to start to add Vue 3 code:

{% tabs %}
{% tab title="src/index.html" %}
Add the following before the closing `</body>` tag:

```markup
<div id="app">
  {{ message }}
</div>
<script type="module" src="./renderer.js"></script>
```

{% endtab %}

{% tab title="src/renderer.js" %}

```javascript
import { createApp } from "../node_modules/vue/dist/vue.esm-browser.js";

createApp({
  data() {
    return {
      message: 2,
    };
  },
}).mount("#app");
```

{% endtab %}
{% endtabs %}

### Alternative: Using Single File Components <a href="#using-single-file-components" id="using-single-file-components"></a>

For advanced use cases such as single file components, it's recommended to use the [Webpack plugin](../../config/plugins/webpack.md) so that the components get built correctly. You'll also need to add the appropriate Vue loader/compiler packages to the app's `devDependencies`.

Create the app with the [Webpack template](../../templates/webpack-template.md) or the [TypeScript + Webpack template](../../templates/typescript-+-webpack-template.md). Add the following packages to your `devDependencies` so that the single file components get compiled and loaded correctly:

{% tabs %}
{% tab title="NPM" %}

```
npm install --save-dev vue-loader @vue/compiler-sfc
```

{% endtab %}

{% tab title="Yarn" %}

```bash
yarn add --dev vue-loader @vue/compiler-sfc
```

{% endtab %}
{% endtabs %}

Setting up the [`vue-loader` Webpack module](https://vue-loader.vuejs.org/guide/#webpack-configuration) is left as an exercise for the reader _(hint: `vue-loader` Webpack config should ideally go in the renderer configuration only)_.

Add the Vue 3 package to your `dependencies`:

{% tabs %}
{% tab title="NPM" %}

```bash
npm install --save vue
```

{% endtab %}

{% tab title="Yarn" %}

```bash
yarn add vue
```

{% endtab %}
{% endtabs %}

You should now be able to add single file components to your app, the same as you would for a "regular" web app.
