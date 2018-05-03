# RPM

The RPM target builds `.rpm` files, which is the standard package format for RedHat-based Linux distributions such as Fedora.

You can only build the RPM target on Linux machines with the `rpm` or `rpm-build` packages installed.

Configuration options are documented in [`MakerRpmConfig`](https://js.electronforge.io/maker/rpm/interfaces/makerrpmconfig.html).

### Usage

```javascript
{
  name: '@electron-forge/maker-rpm',
  config: {
    options: {
      maintainer: 'Joe Bloggs',
      homepage: 'http://example.com'
    }
  }
}
```

