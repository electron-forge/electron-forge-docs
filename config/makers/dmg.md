---
description: Generate a DMG with Electron Forge to distribute your Electron app on macOS.
---

# DMG

The DMG target builds Apple Disk Image (`.dmg`) files, which are the standard format for sharing macOS apps. The DMG acts like a ZIP file, but provides an easy way for users to take the app and put it in the `/Applications` directory.

## Requirements

You can only build the DMG target on macOS machines.

## Installation

```sh
npm install --save-dev @electron-forge/maker-dmg
```

## Usage

To use `@electron-forge/maker-dmg`, add it to the `makers` array in your [Forge configuration](../configuration.md):

{% code title="forge.config.js" %}
```javascript
module.exports = {
  makers: [
    {
      name: '@electron-forge/maker-dmg',
      config: {
        background: './assets/dmg-background.png',
        format: 'ULFO'
      }
    }
  ]
};
```
{% endcode %}

Configuration options are documented in [`MakerDMGConfig`](https://js.electronforge.io/interfaces/\_electron\_forge\_maker\_dmg.MakerDMGConfig.html).

## Debugging

For advanced debug logging for this maker, add the `DEBUG=electron-installer-dmg*` environment variable.
