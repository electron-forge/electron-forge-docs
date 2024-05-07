---
description: Create an MSI file for your Electron app on Windows using Electron Forge.
---

# WiX MSI

The WiX MSI target builds `.msi` files, which are "traditional" Windows installer files. Please note we recommend using the [Squirrel.Windows](squirrel.windows.md) target over using this one. These MSI files are a worse user experience for installation but sometimes it is necessary to build MSI files to appease large scale enterprise companies with internal application distribution policies. For more info, check out "[Should I use WiX MSI?](https://github.com/felixrieseberg/electron-wix-msi#should-i-use-this)".

You can only build the WiX MSI target on machines with [`light` and `candle` installed from the WiX toolkit](https://github.com/felixrieseberg/electron-wix-msi#prerequisites).

Configuration options are documented in [`MakerWixConfig`](https://js.electronforge.io/interfaces/_electron_forge_maker_wix.MakerWixConfig.html).

### Usage

```jsx
{
  name: '@electron-forge/maker-wix',
  config: {
    language: 1033,
    manufacturer: 'My Awesome Company'
  }
}
```

