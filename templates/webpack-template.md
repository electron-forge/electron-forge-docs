# Webpack Template

To get you up and running as fast as possible we provide a Webpack template that makes use of the `@electron-forge/plugin-webpack` module.  This is by far the quickest way to getting a working webpack setup with Electron.

{% tabs %}
{% tab title="NPM" %}
```
npx create-electron-app my-new-app --template=webpack
```
{% endtab %}

{% tab title="Yarn" %}
```
yarn create electron-app my-new-app --template=webpack
```
{% endtab %}
{% endtabs %}

Once you've initialized the template it's as easy as running `npm start` in the generated directory.  For more information on how the Webpack Plugin works and how you configure it please check out the [Webpack Plugin](../config/plugins/webpack.md) documentation.

