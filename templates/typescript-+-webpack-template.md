# TypeScript + Webpack Template

To get you up and running as fast as possible with TypeScript and Webpack, we provide a template that makes use of the `@electron-forge/plugin-webpack` module.  This is by far the quickest way to getting a working  TypeScript+Webpack setup with Electron.

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

Once you've initialized the template, you'll need to run `npm install && npm start`in the generated directory. For more information about TypeScript, see: [https://www.typescriptlang.org](https://www.typescriptlang.org/). For more information on how the Webpack Plugin works and how you configure it please check out the [Webpack Plugin](../config/plugins/webpack.md) documentation.

