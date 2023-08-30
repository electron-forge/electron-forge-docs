---
description: How to create an Electron app with React and Electron Forge
---

# React

Adding React support to the Webpack template doesn't require a complicated boilerplate to get started.

{% hint style="info" %}
The following guide has been tested with React 17, Babel 7, and Webpack 5.
{% endhint %}

### Create the app and setup the Webpack config

Create the app with the [Webpack template](../../templates/webpack-template.md). Add the following packages to your `devDependencies` so that JSX and other React features can be used properly:

{% tabs %}
{% tab title="Yarn" %}
```bash
yarn add --dev @babel/core @babel/preset-react babel-loader
```
{% endtab %}

{% tab title="NPM" %}
```text
npm install --save-dev @babel/core @babel/preset-react babel-loader
```
{% endtab %}

{% tab title="Bun" %}
```text
bun add --dev @babel/core @babel/preset-react babel-loader
```
{% endtab %}
{% endtabs %}

Set up the [`babel-loader`](https://www.npmjs.com/package/babel-loader)module with the [React preset](https://babeljs.io/docs/en/babel-preset-react) in `webpack.rules.js`:

{% code title="webpack.rules.js" %}
```javascript
module.exports = [
  // ... existing loader config ...
  {
    test: /\.jsx?$/,
    use: {
      loader: 'babel-loader',
      options: {
        exclude: /node_modules/,
        presets: ['@babel/preset-react']
      }
    }
  }
  // ... existing loader config ...
];
```
{% endcode %}

### Add the React dependencies

Add the basic React packages to your `dependencies`:

{% tabs %}
{% tab title="Yarn" %}
```bash
yarn add react react-dom
```
{% endtab %}

{% tab title="NPM" %}
```bash
npm install --save react react-dom
```
{% endtab %}

{% tab title="Bun" %}
```bash
bun add react react-dom
```
{% endtab %}
{% endtabs %}

### Integrate React code

You should now be able to start writing and using React components in your Electron app. The following is a very minimal example of how to start to add React code:

{% tabs %}
{% tab title="src/app.jsx" %}
```jsx
import * as React from 'react';
import * as ReactDOM from 'react-dom';

function render() {
  ReactDOM.render(<h2>Hello from React!</h2>, document.body);
}

render();
```
{% endtab %}

{% tab title="src/renderer.js" %}
```javascript
// Add this to the end of the existing file
import './app.jsx';
```
{% endtab %}
{% endtabs %}

For more about React, see [their documentation](https://reactjs.org/docs/hello-world.html).

