---
description: Create a new Electron app with TypeScript.
---

# TypeScript

To get you up and running as fast as possible with [TypeScript](https://www.typescriptlang.org/) and Electron, we have provided a basic template that utilizes `tsc` and `eslint`.

{% hint style="warning" %}
If you need to use `import` or `export` statements, it's recommended to use the [TypeScript + Webpack template](typescript-+-webpack-template.md) instead.
{% endhint %}

{% tabs %}
{% tab title="NPM" %}
```text
npx create-electron-app my-new-app --template=typescript
```
{% endtab %}

{% tab title="Yarn" %}
```text
yarn create electron-app my-new-app --template=typescript
```
{% endtab %}
{% endtabs %}

Once you've initialized the template, you'll need to run `npm start` \(or `yarn start`, respectively\) in the generated directory.

