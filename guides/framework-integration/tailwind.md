---
description: How to create an Electron app with Tailwind and Electron Forge
---

# Tailwind CSS

Adding Tailwind CSS support to the Webpack template involves adding postcss support to the webpack configuration.

{% hint style="info" %}
The following guide has been tested with Tailwind 3, and Webpack 5.
{% endhint %}

### Create the app and install Tailwind CSS

Create the app with the [Webpack template](../../templates/webpack-template.md).

Install Tailwind CSS using the [`postcss instructions`](https://tailwindcss.com/docs/installation/using-postcss).

### Configure Webpack to use postcss

Install the postcss-loader component:

{% tabs %}
{% tab title="Yarn" %}
```bash
yarn add --dev postcss-loader
```
{% endtab %}

{% tab title="NPM" %}
```text
npm install --save-dev postcss-loader
```
{% endtab %}
{% endtabs %}

Modify the renderer webpack configuration to include the postcss-loader for its css rules in `webpack.renderer.config.js`:

{% code title="webpack.renderer.config.js" %}
```javascript
rules.push({
  test: /\.css$/,
  // This is the line that needs modified - by adding the postcss-loader to the list of css rules
  use: [{ loader: 'style-loader' }, { loader: 'css-loader' }, { loader: 'postcss-loader'}],
});
```
{% endcode %}

### Integrate Tailwind CSS styling

You should now be able to start writing and using Tailwind CSS styling in your Electron app. To confirm, add the Tailwind CSS classes to the default `src/index.html`:

{% code title="src/index.html" %}
```html
  <body>
    <h1 class="text-3xl font-bold underline text-green-500">💖 Hello World!</h1>
    <p>Welcome to your Electron application.</p>
  </body>
```
{% endcode %}

For more about Tailwind CSS, see [their documentation](https://tailwindcss.com/docs).

### Using with React and Typescript

These instructions also work for react, typescript, and react + typescript projects. Follow these instructions after confirming that react and typescript are configured and rendering properly. 

