---
description: Create a Flatpak app for your Electron app using Electron Forge.
---

# Flatpak

The Flatpak target builds [`.flatpak` files](http://flatpak.org/), which is a
packaging format for Linux distributions that allows for sandboxed installation
of applications in isolation from the rest of their system. In contrast, typical
[deb.md](deb.md 'mention') or [rpm.md](rpm.md 'mention') installation methods
are not sandboxed.

## Requirements

You can only build the Flatpak target if you have
[`flatpak`](https://docs.flatpak.org/en/latest/flatpak-command-reference.html#flatpak),
[`flatpak-builder`](https://docs.flatpak.org/en/latest/flatpak-builder-command-reference.html#flatpak-builder),
and `eu-strip` _(usually part of the_
[_`elfutils`_](https://sourceware.org/elfutils/) _package)_ installed on your
system.

## Installation

```sh
npm install --save-dev @electron-forge/maker-flatpak
```

## Usage

To use `@electron-forge/maker-flatpak`, add it to the `makers` array in your
[Forge configuration](../configuration.md):

```js
module.exports = {
  makers: [
    {
      name: '@electron-forge/maker-flatpak',
      config: {
        options: {
          categories: ['Video'],
          mimeType: ['video/h264'],
        },
      },
    },
  ],
}
```

Configuration options are documented in
[`MakerFlatpakConfig`](https://js.electronforge.io/classes/_electron_forge_maker_flatpak.MakerFlatpak-1.html#config).

## Debugging

For advanced debug logging for this maker, add the
`DEBUG=electron-installer-flatpak*` environment variable.
