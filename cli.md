---
description: How to use the command line interface (CLI) commands for Electron Forge
---

# CLI

## Overview

Forge's CLI is the main way to run Electron Forge commands. It consists of a thin wrapper for its core API. Configuration for these commands is done through your [Forge configuration](configuration.md) object.

If you want to use the core API programmatically, see the [#undefined](cli.md#undefined "mention") section below.

## Installation

To use the Forge CLI, install the `@electron-forge/cli` module into your project as a devDependency. If you're using the `create-electron-app` script, this module will already be installed for you.

{% tabs %}
{% tab title="Yarn" %}

```bash
yarn add --dev @electron-forge/cli
```

{% endtab %}

{% tab title="npm" %}

```bash
npm install --save-dev @electron-forge/cli
```

{% endtab %}
{% endtabs %}

## Bootstrap commands

These commands help you get started with Forge. If you're just getting started with Electron Forge, we recommend you follow the [.](./ "mention") or [import-existing-project.md](import-existing-project.md "mention") guides.

### Init

{% hint style="info" %}
We recommend using the `create-electron-app` script (which uses this command) to get started rather than running Init directly.
{% endhint %}

This command will initialize a new Forge-powered application in the given directory (defaults to `.`, the current directory).

Please note if you want to use a non-builtin template, it must be installed globally before running the `init` command.

#### Options

All flags are optional.

| Flag              | Value         | Description                                                |
| ----------------- | ------------- | ---------------------------------------------------------- |
| `--template`      | Template Name | Name of the template to use to make this new app           |
| `--copy-ci-files` | N/A           | Set if you want to copy templated CI files _(coming soon)_ |

#### Usage

{% tabs %}
{% tab title="Yarn" %}

```bash
yarn electron-forge init --template=webpack
```

{% endtab %}

{% tab title="npm" %}

```bash
npx electron-forge init --template=webpack
```

{% endtab %}
{% endtabs %}

### Import

This command will attempt to take an existing Electron app and make it compatible with Forge. Normally, this just creates a base Electron Forge configuration and adds the required dependencies.

#### Options

There are no options for the Import command.

#### Usage

{% tabs %}
{% tab title="Yarn" %}

```bash
yarn electron-forge import
```

{% endtab %}

{% tab title="npm" %}

```bash
npx electron-forge import
```

{% endtab %}
{% endtabs %}

## Build commands

The Package, Make, and Publish commands are the three main steps of the Electron Forge build pipeline. Each step relies on the output of the previous one, so they are cascading by default (e.g. running `publish` will first run `package` then `make`.

{% hint style="info" %}
For more conceptual details, see the [build-lifecycle.md](core-concepts/build-lifecycle.md "mention") guide.
{% endhint %}

### Package

This command will package your application into a platform-specific executable bundle and put the result in a folder. Please note that this does not make a distributable format. To make proper distributables, please use the Make command.

#### Options

All flags are optional.

| Flag         | Value                    | Description                                                    |
| ------------ | ------------------------ | -------------------------------------------------------------- |
| `--arch`     | Architecture, e.g. `x64` | Target architecture to package for. Defaults to the host arch. |
| `--platform` | Platform, e.g. `mas`     | Target platform to package for. Defaults to the host platform. |

#### Usage

{% tabs %}
{% tab title="Yarn" %}

```bash
# By default, the package command corresponds to a package npm script:
yarn package --arch=ia32
# If there is no package script:
yarn electron-forge package --arch=ia32
```

{% endtab %}

{% tab title="npm" %}

```bash
# By default, the package command corresponds to a package npm script:
npm run package -- --arch=ia32
# If there is no package script:
npx electron-forge package --arch=ia32
```

{% endtab %}
{% endtabs %}

### Make

This command will make distributables for your application based on your Forge config and the parameters you pass in.

If you do not need to repackage your application between Make runs, use the `--skip-package` flag.

#### Options

All flags are optional.

| Flag             | Value                               | Description                                                                                                                                                                                                                  |
| ---------------- | ----------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `--arch`         | Architecture, e.g. `x64`            | Target architecture to make for. Defaults to the arch that you're running on (the "host" arch). Allowed values are: "ia32", "x64", "armv7l", "arm64", "universal", or "mips64el". Multiple values should be comma-separated. |
| `--platform`     | Platform, e.g. `mas`                | Target platform to make for, please note you normally can only target platform X from platform X. This defaults to the platform you're running on (the "host" platform).                                                     |
| `--targets`      | Comma separated list of maker names | Override your make targets for this run. The maker name is the full node module name, e.g. `@electron-forge/maker-deb`. By default, the make targets used are the ones available and configured for the given platform.      |
| `--skip-package` | N/A                                 | Set if you want to skip the packaging step, useful if you are running sequential makes and want to save time. By default, packaging is **not** skipped.                                                                      |

#### Usage

{% tabs %}
{% tab title="Yarn" %}

```bash
# By default, the make command corresponds to a make npm script:
yarn make --arch=ia32
# If there is no make script:
yarn electron-forge make --arch=ia32
```

{% endtab %}

{% tab title="npm" %}

```bash
# By default, the make command corresponds to a make npm script:
npm run make -- --arch=ia32
# If there is no make script:
npx electron-forge make --arch=ia32
```

{% endtab %}
{% endtabs %}

### Publish

This command will attempt to package, make, and publish the Forge application to the publish targets defined in your Forge config.

If you want to verify artifacts from the Make step before publishing, you can use the Dry Run options explained below.

#### Options

All flags are optional.

| Flag             | Value                                   | Description                                                              |
| ---------------- | --------------------------------------- | ------------------------------------------------------------------------ |
| `--target`       | Comma separated list of publisher names | Override your publish targets for this run                               |
| `--dry-run`      | N/A                                     | Triggers a publish dry run which saves state and doesn't upload anything |
| `--from-dry-run` | N/A                                     | Attempts to publish artifacts from any dry runs saved on disk            |

#### Usage

{% tabs %}
{% tab title="Yarn" %}

<pre class="language-bash"><code class="lang-bash"><strong># By default, the publish command corresponds to a publish npm script:
</strong>yarn run publish --from-dry-run
# If there is no publish script:
yarn electron-forge publish --from-dry-run</code></pre>

{% endtab %}

{% tab title="npm" %}

<pre class="language-bash"><code class="lang-bash"><strong># By default, the publish command corresponds to a publish npm script:
</strong>npm run publish -- --from-dry-run
# If there is no publish script:
npx electron-forge publish -- --from-dry-run</code></pre>

{% endtab %}
{% endtabs %}

## Dev commands

### Start

This command will launch your app in dev mode with the `electron` binary in the given directory (defaults to `.`).

If you type `rs` (and hit enter) in the same terminal where you ran the start command, the running app will be terminated and restarted.

Forge plugins can override this command to run custom development logic. For example, the [webpack.md](config/plugins/webpack.md "mention") runs a webpack-dev-server instance to provide live reloading and HMR.

#### Options

All flags are optional.

| Flag                 | Value                                       | Description                                                                                         |
| -------------------- | ------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| `--app-path`         | Path to your app from the working directory | Override the path to the Electron app to launch (defaults to `.`)                                   |
| `--enable-logging`   | N/A                                         | Enable advanced logging. This will log internal Electron things                                     |
| `--run-as-node`      | N/A                                         | Run the Electron app as a Node.JS script                                                            |
| `--inspect-electron` | N/A                                         | Triggers inspect mode on Electron to allow debugging the main process                               |
| `--`                 | extra arguments                             | Any additional arguments to pass to Electron or the app itself. For example: `-- --my-app-argument` |

#### Usage

{% tabs %}
{% tab title="Yarn" %}

```bash
# By default, the start command corresponds to a start npm script:
yarn start --enable-logging
# if there is no start script
yarn electron-forge start --enable-logging
```

{% endtab %}

{% tab title="npm" %}

```bash
# By default, the start command corresponds to a start npm script:
npm start --enable-logging
# if there is no start script
npx electron-forge start --enable-logging
```

{% endtab %}
{% endtabs %}

## Programmatic usage

The Forge CLI should suit most use cases, but we do expose the `@electron-forge/core` package for programmatic command usage.

```javascript
const { api } = require("@electron-forge/core");

const main = async () => {
  await api.package({
    // add package command options here
  });
};

main();
```

For more information, see the [API documentation](https://js.electronforge.io/classes/_electron_forge_core.ForgeAPI.html).
