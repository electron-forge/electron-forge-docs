# Flatpak

The Flatpak target builds [`.flatpak` files](http://flatpak.org/), which is a packaging format for Linux distributions that allows for sandboxed installation of applications in isolation from the rest of their system. In contrast, typical deb or RPM installation methods are not sandboxed.

You can only build the Flatpak target if you have `flatpak`, `flatpak-builder`, and `eu-strip` _\(usually part of the `elfutils` package\)_ installed on your system.

Configuration options are documented in [`MakerFlatpakConfig`](https://js.electronforge.io/maker/flatpak/interfaces/makerflatpakconfig.html).

### Usage

```javascript
{
  name: '@electron-forge/maker-flatpak',
  config: {
    options: {
      categories: ['Video'],
      mimeType: ['video/h264']
    }
  }
}
```

