# TypeScript + Webpack Template

To get you up and running as fast as possible with [TypeScript](https://www.typescriptlang.org/) and [Webpack](https://webpack.js.org/), we provide a template that makes use of the [`@electron-forge/plugin-webpack` module](../config/plugins/webpack.md) with sane TypeScript configuration defaults.

{% tabs %}
{% tab title="npm" %}
```text
npx create-electron-app my-new-app --template=typescript-webpack
```
{% endtab %}

{% tab title="Yarn" %}
```
yarn create electron-app my-new-app --template=typescript-webpack
```
{% endtab %}
{% endtabs %}

Once you've initialized the template, you'll need to run `npm start`in the generated directory. See the [Webpack Plugin](../config/plugins/webpack.md) documentation for Electron Forge-specific configuration options.

