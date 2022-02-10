---
description: How to use the command line interface (CLI) for Electron Forge
---

# CLI

## Installation

Electron forge's command line interface \(CLI\) is separate from the core module. To use it you will have to install the `@electron-forge/cli` module from NPM into your project.

{% tabs %}
{% tab title="Yarn" %}
```bash
yarn add --dev @electron-forge/cli
```
{% endtab %}

{% tab title="NPM" %}
```bash
npm install --save-dev @electron-forge/cli
```
{% endtab %}
{% endtabs %}

## Overview

At a high level the CLI module is just a proxy to the raw [API](https://js.electronforge.io) commands.  Almost all the configuration is still done in your [Forge configuration](configuration.md), the CLI just provides a handy way to trigger all the core functionality of Electron Forge.

## Commands

{% hint style="info" %}
These commands are sorted in alphabetical order. The most commonly used are [start](cli.md#start), [package](cli.md#package), [make](cli.md#make), and [publish](cli.md#publish). 
{% endhint %}

### Import

Maps to `electronForge.import`. It will attempt to take an existing Electron app and make it Forge compatible. Normally this just creates a base Electron Forge configuration and adds the required dependencies.

> There are no flags for the Import command

### Init

Maps to `electronForge.init`, will initialize a new Forge powered application in the given directory \(defaults to `.`, the current directory\).

Please note if you want to use a non-built-in template, it must be installed globally before running the `init` command.

| Flag | Value | Required | Description |
| :--- | :--- | :--- | :--- |
| `--template` | Template Name | No | Name of the template to use to make this new app |
| `--copy-ci-files` | N/A | No | Set if you want to copy templated CI files for Travis CI and Appveyor |

Example:

{% tabs %}
{% tab title="Yarn" %}
```bash
yarn electron-forge init --template=webpack
```
{% endtab %}

{% tab title="NPM" %}
```bash
npx electron-forge init --template=webpack
```
{% endtab %}
{% endtabs %}

### Install

Maps to `electronForge.install`, will attempt to install the Electron app that is published at the given GitHub repository. This command is just a helper for installing other applications quickly.  For example:

```bash
npx electron-forge install atom/atom
```

### Lint

Maps to `electronForge.lint`, will run the `lint` command that your `package.json` exposes. If the exit code is `0`, no output is shown, otherwise the error output will be displayed.

> There are no flags for the Lint command

### Make

Maps to `electronForge.make`, will make distributables for your application based on your Forge config and the parameters you pass in.

| Flag | Value | Required | Description |
| :--- | :--- | :--- | :--- |
| `--arch` | Architecture, e.g. `x64` | No | Target architecture to make for. Defaults to the arch that you're running on \(the "host" arch\). Allowed values are: "ia32", "x64", "armv7l", "arm64", or "mips64el". Multiple values should be comma-separated. |
| `--platform` | Platform, e.g. `mas` | No | Target platform to make for, please note you normally can only target platform X from platform X. This defaults to the platform you're running on \(the "host" platform\). |
| `--targets` | Comma separated list of maker names | No | Override your make targets for this run. The maker name is the full node module name, e.g. `@electron-forge/maker-deb`. By default, the make targets used are the ones available and configured for the given platform. |
| `--skip-package` | N/A | No | Set if you want to skip the packaging step, useful if you are running sequential makes and want to save time. By default, packaging is **not** skipped. |

Example:

{% tabs %}
{% tab title="Yarn" %}
```bash
# By default, the make command corresponds to a make npm script:
yarn make --arch=ia32
# If there is no make script:
yarn electron-forge make --arch=ia32
```
{% endtab %}

{% tab title="NPM" %}
```bash
# By default, the make command corresponds to a make npm script:
npm run make -- --arch=ia32
# If there is no make script:
npx electron-forge make --arch=ia32
```
{% endtab %}
{% endtabs %}

### Package

Maps to `electronForge.package`, will package your application into a platform specific format and put the result in a folder. Please note that this does not make a distributable format. To make proper distributables, please use the [make](cli.md#make) command.

| Flag | Value | Required | Description |
| :--- | :--- | :--- | :--- |
| `--arch` | Architecture, e.g. `x64` | No | Target architecture to package for. Defaults to the host arch. |
| `--platform` | Platform, e.g. `mas` | No | Target platform to package for. Defaults to the host platform. |

Example:

{% tabs %}
{% tab title="Yarn" %}
```bash
# By default, the package command corresponds to a package npm script:
yarn package --arch=ia32
# If there is no make script:
yarn electron-forge package --arch=ia32
```
{% endtab %}

{% tab title="NPM" %}
```bash
# By default, the package command corresponds to a package npm script:
npm run package -- --arch=ia32
# If there is no make script:
npx electron-forge package --arch=ia32
```
{% endtab %}
{% endtabs %}

### Publish

Maps to `electronForge.publish`, will attempt to make the forge application and then publish it to the publish targets defined in your forge config.

If you want to publish previously created `make` artifacts you will have to use the `dry-run` options explained below.

| Flag | Value | Required | Description |
| :--- | :--- | :--- | :--- |
| `--target` | Comma separated list of publisher names | No | Override your publish targets for this run |
| `--dry-run` | N/A | No | Triggers a publish dry run which saves state and doesn't upload anything |
| `--from-dry-run` | N/A | No | Attempts to publish artifacts from any dry runs saved on disk |

Example:

{% tabs %}
{% tab title="Yarn" %}
```bash
# By default, the package command corresponds to a package npm script:
yarn run publish --from-dry-run
# If there is no make script:
yarn electron-forge publish --from-dry-run
```
{% endtab %}

{% tab title="NPM" %}
```bash
# By default, the package command corresponds to a package npm script:
npm run publish -- --from-dry-run
# If there is no make script:
npx electron-forge package --arch=ia32
```
{% endtab %}
{% endtabs %}

### Start

Maps to `electronForge.start`, will launch the Forge powered application in the given directory \(defaults to `.`\).

If you type `rs` \(and hit enter\) in the same terminal where you ran the start command, the running app will be terminated and restarted.

| Flag | Value | Required | Description |
| :--- | :--- | :--- | :--- |
| `--app-path` | Path to your app from CWD | No | Override the path to the Electron app to launch \(defaults to `.`\) |
| `--enable-logging` | N/A | No | Enable advanced logging. This will log internal Electron things |
| `--run-as-node` | N/A | No | Run the Electron app as a Node.JS script |
| `--inspect-electron` | N/A | No | Triggers inspect mode on Electron to allow debugging the main process |
| `--` | extra arguments | No | Any additional arguments to pass to Electron or the app itself. For example: `-- --my-app-argument` |

Example:

{% tabs %}
{% tab title="Yarn" %}
```
yarn start --enable-logging
```
{% endtab %}

{% tab title="NPM" %}
```bash
npm start -- --enable-logging
```
{% endtab %}
{% endtabs %}

