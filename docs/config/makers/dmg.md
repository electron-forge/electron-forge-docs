---
description: Generate a DMG with Electron Forge to distribute your Electron app on macOS.
---

# DMG

The DMG target builds `.dmg` files, which are the standard format for sharing macOS apps.  The DMG acts like a zip file, but provides an easy way for users to take the app and put it in the `/Applications` directory.

:::warning
You can only build the DMG target on macOS machines.
:::

Configuration options are documented in [`MakerDMGConfig`](https://js.electronforge.io/interfaces/_electron_forge_maker_dmg.MakerDMGConfig.html).

### Usage

```jsx
{
  name: '@electron-forge/maker-dmg',
  config: {
    background: './assets/dmg-background.png',
    format: 'ULFO'
  }
}
```



