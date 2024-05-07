---
description: >-
  Create an RPM package for RedHat-based Linux distributions for your Electron
  app, using Electron Forge.
---

# RPM

The RPM target builds `.rpm` files, which is the standard package format for Red Hat-based Linux distributions such as Fedora and Red Hat Enterprise Linux (RHEL).

## Requirements

You can only build the RPM target on Linux machines with the `rpm` or `rpm-build` packages installed.

On Fedora you can do something like this:

```shell
sudo dnf install rpm-build
```

While on Debian or Ubuntu you'll need to do this:

```shell
sudo apt-get install rpm
```

## Usage

Configuration options are documented in [`MakerRpmConfig`](https://js.electronforge.io/interfaces/\_electron\_forge\_maker\_rpm.MakerRpmConfig.html).

```jsx
{
  name: '@electron-forge/maker-rpm',
  config: {
    options: {
      homepage: 'http://example.com'
    }
  }
}
```
