---
description: >-
  Create a package for Debian-based Linux distributions for your Electron app,
  using Electron Forge.
---

# deb

The deb target builds [`.deb` packages](https://en.wikipedia.org/wiki/Deb_%28file_format%29), which are the standard package format for Debian-based Linux distributions such as Ubuntu.  You can only build the deb target on Linux or macOS machines with the `fakeroot` and `dpkg` packages installed.

Configuration options are documented in [`MakerDebConfig`](https://js.electronforge.io/interfaces/_electron_forge_maker_deb.MakerDebConfig.html).

### Usage

```jsx
{
  name: '@electron-forge/maker-deb',
  config: {
    options: {
      maintainer: 'Joe Bloggs',
      homepage: 'https://example.com'
    }
  }
}
```

