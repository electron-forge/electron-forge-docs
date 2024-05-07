---
description: >-
  Create a package for the Windows Store for your Electron app, using Electron
  Forge.
---

# AppX

The AppX target builds `.appx` packages which are designed to target the Windows Store.  You can only build the AppX target on Windows machines with the Windows 10 SDK installed.  Check the [`electron-windows-store` docs](https://github.com/felixrieseberg/electron-windows-store#readme) for more information on platform requirements.

Configuration options are documented in [`MakerAppXConfig`](https://js.electronforge.io/interfaces/_electron_forge_maker_appx.MakerAppXConfig.html).

### Usage

```jsx
{
  name: '@electron-forge/maker-appx',
  config: {
    publisher: 'CN=developmentca',
    devCert: 'C:\\devcert.pfx',
    certPass: 'abcd'
  }
}
```

