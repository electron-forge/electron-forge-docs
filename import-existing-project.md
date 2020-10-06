---
description: Import an existing Electron project to use Electron Forge.
---

# Import Existing Project

Importing an existing Electron app into the Electron Forge workflow is very straightforward:

{% tabs %}
{% tab title="Yarn 2" %}
```bash
cd my-app
yarn dlx @electron-forge/cli import
```
{% endtab %}

{% tab title="Yarn 1" %}
```
cd my-app
yarn add --dev @electron-forge/cli
yarn electron-forge import
```
{% endtab %}

{% tab title="NPM" %}
```bash
cd my-app
npx @electron-forge/cli import
```
{% endtab %}
{% endtabs %}

{% hint style="info" %}
If you're already using other Electron tooling \(including migrating from Electron Forge v5\), it will try to automatically migrate the settings as much as possible, but some of it may need to be migrated manually.
{% endhint %}



