---
description: How to create an Electron app with Vue 2 and Electron Forge
---

# Vue 2

Adding Vue 2 support to a basic Electron Forge template doesn't require a complicated boilerplate to get started.

### Create the app

Create a standard Electron per the [Getting Started](../../#the-basics) guide.

### Add the Vue 2 dependency

Add the Vue 2 package to your `dependencies`:

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

### Integrate Vue 2 code

You should now be able to start writing and using Vue 2 components in your Electron app. The following is a very minimal example of how to start to add Vue 2 code:

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
// Since we declared the script as type=module in the HTML file,
// we can use ES Modules (adapted from the Vue 2 Introduction
// https://vuejs.org/v2/guide/#Declarative-Rendering

// Alternatively, omit the .min from the path for Vue debugging purposes.
import Vue from '../node_modules/vue/dist/vue.esm.browser.min.js';

const app = new Vue({
  el: '#app',
  data: {
    message: 'Hello Vue!'
  }
})
```
{% endtab %}
{% endtabs %}

### Alternative: Using Single File Components <a id="using-single-file-components"></a>

For advanced use cases such as single file components, it's recommended to use the [Webpack template](../../templates/webpack-template.md) so that the components get built correctly. You'll also need to add the appropriate Vue loader/compiler packages to the app's `devDependencies`.

Create the app with the [Webpack template](../../templates/webpack-template.md) or the [TypeScript + Webpack template](../../templates/typescript-+-webpack-template.md). Add the following packages to your `devDependencies` so that the single file components get compiled and loaded correctly:

{% tabs %}
{% tab title="NPM" %}
```text
npm install --save-dev vue-loader vue-template-compiler
```
{% endtab %}

{% tab title="Yarn" %}
```bash
yarn add --dev vue-loader vue-template-compiler
```
{% endtab %}
{% endtabs %}

Setting up the [`vue-loader` Webpack module](https://vue-loader.vuejs.org/guide/#webpack-configuration) is left as an exercise for the reader _\(hint: `vue-loader` Webpack config should go in the renderer configuration only\)_.

Add the Vue 2 package to your `dependencies`:

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

