# Table of contents

* [Getting Started](README.md)
* [Importing an Existing Project](import-existing-project.md)
* [CLI](cli.md)

## Configuration <a href="#config" id="config"></a>

* [Overview](config/configuration.md)
* [Plugins](config/plugins/README.md)
  * [Webpack Plugin](config/plugins/webpack.md)
  * [Vite Plugin](config/plugins/vite.md)
  * [Electronegativity Plugin](config/plugins/electronegativity.md)
  * [Auto Unpack Native Modules Plugin](config/plugins/auto-unpack-natives.md)
  * [Local Electron Plugin](config/plugins/local-electron.md)
  * [Fuses Plugin](config/plugins/fuses.md)
* [Makers](config/makers/README.md)
  * [AppX](config/makers/appx.md)
  * [deb](config/makers/deb.md)
  * [DMG](config/makers/dmg.md)
  * [Flatpak](config/makers/flatpak.md)
  * [Pkg](config/makers/pkg.md)
  * [RPM](config/makers/rpm.md)
  * [Snapcraft](config/makers/snapcraft.md)
  * [Squirrel.Windows](config/makers/squirrel.windows.md)
  * [WiX MSI](config/makers/wix-msi.md)
  * [Zip](config/makers/zip.md)
* [Publishers](config/publishers/README.md)
  * [Bitbucket](config/publishers/bitbucket.md)
  * [Electron Release Server](config/publishers/electron-release-server.md)
  * [GitHub](config/publishers/github.md)
  * [Google Cloud Storage](config/publishers/gcs.md)
  * [Nucleus](config/publishers/nucleus.md)
  * [S3](config/publishers/s3.md)
  * [Snapcraft](config/publishers/snapcraft.md)
* [Hooks](config/hooks.md)

## Core Concepts

* [Why Electron Forge](core-concepts/why-electron-forge.md)
* [Build Lifecycle](core-concepts/build-lifecycle.md)

## Built-in Templates <a href="#templates" id="templates"></a>

* [Vite](templates/vite.md)
* [Vite + TypeScript](templates/vite-+-typescript.md)
* [Webpack](templates/webpack-template.md)
* [Webpack + Typescript](templates/typescript-+-webpack-template.md)

## Guides

* [Code Signing](guides/code-signing/README.md)
  * [Signing a Windows app](guides/code-signing/code-signing-windows.md)
  * [Signing a macOS app](guides/code-signing/code-signing-macos.md)
* [Custom App Icons](guides/create-and-add-icons.md)
* [Framework Integration](guides/framework-integration/README.md)
  * [Parcel](guides/framework-integration/parcel.md)
  * [React](guides/framework-integration/react.md)
  * [React with TypeScript](guides/framework-integration/react-with-typescript.md)
  * [Vue 3](guides/framework-integration/vue-3.md)
* [Developing with WSL](guides/developing-with-wsl.md)

## Advanced

* [Auto Update](advanced/auto-update.md)
* [Debugging](advanced/debugging.md)
* [Extending Electron Forge](advanced/extending-electron-forge/README.md)
  * [Writing Plugins](advanced/extending-electron-forge/writing-plugins.md)
  * [Writing Templates](advanced/extending-electron-forge/writing-templates.md)
  * [Writing Makers](advanced/extending-electron-forge/writing-makers.md)
  * [Writing Publishers](advanced/extending-electron-forge/writing-publishers.md)
* [API Docs](https://js.electronforge.io/modules/\_electron\_forge\_core.html)
