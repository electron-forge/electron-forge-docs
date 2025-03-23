---
description: Modules to extend Forge's core functionality
---

# Plugins

Electron Forge has a plugin system which allows you to extend its core functionality.

By default, Forge takes a vanilla JS application and packages, makes and publishes it (see the [build-lifecycle.md](../../core-concepts/build-lifecycle.md "mention") document for more details). Plugins can execute custom logic during any of the Forge [hooks.md](../hooks.md "mention") during the build process, and can also override the [#start](../../cli.md#start "mention") command in development.

{% hint style="info" %}
If you want to write your own Forge plugin, check out the [writing-plugins.md](../../advanced/extending-electron-forge/writing-plugins.md "mention") guide.
{% endhint %}

## Bundler plugins

<table data-view="cards"><thead><tr><th data-type="content-ref"></th><th></th><th data-hidden data-type="content-ref"></th><th data-hidden data-card-cover data-type="files"></th><th data-hidden data-card-target data-type="content-ref"></th></tr></thead><tbody><tr><td><a href="webpack.md">webpack.md</a></td><td>Build your Electron app with webpack</td><td><a href="webpack.md">webpack.md</a></td><td></td><td><a href="webpack.md">webpack.md</a></td></tr><tr><td><a href="vite.md">vite.md</a></td><td>Build your Electron app with Vite</td><td><a href="vite.md">vite.md</a></td><td></td><td><a href="vite.md">vite.md</a></td></tr></tbody></table>

## Utility plugins

<table data-view="cards"><thead><tr><th data-type="content-ref"></th><th></th><th data-hidden data-card-target data-type="content-ref"></th></tr></thead><tbody><tr><td><a href="auto-unpack-natives.md">auto-unpack-natives.md</a></td><td>Unpack native Node.js modules from your Forge app's ASAR archive.</td><td><a href="auto-unpack-natives.md">auto-unpack-natives.md</a></td></tr><tr><td><a href="local-electron.md">local-electron.md</a></td><td>Integrate a local build of Electron into your Forge app.</td><td><a href="local-electron.md">local-electron.md</a></td></tr><tr><td><a href="fuses.md">fuses.md</a></td><td>Toggle Electron functionality at package-time with Electron Fuses.</td><td><a href="fuses.md">fuses.md</a></td></tr><tr><td><a href="electronegativity.md">electronegativity.md</a></td><td>Check for misconfigurations and security anti-patterns with the Electronegativity tool.</td><td></td></tr></tbody></table>

