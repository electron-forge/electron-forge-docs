# Snapcraft

The Snapcraft target builds `.snap` files, which is the packaging format created and sponsored by Canonical, the company behind Ubuntu. It is a sandboxed package format that lets users of various Linux distributions install your application in an isolated environment on their machine.

You can only build the Snapcraft target on Linux systems with the [`snapcraft`](https://snapcraft.io/) package installed.

Configuration options are documented in [`MakerSnapConfig`](https://js.electronforge.io/maker/snap/interfaces/makersnapconfig.html).

### Usage

```javascript
{
  name: '@electron-forge/maker-snap'
  config: {
    features: {
      audio: true,
      mpris: 'com.example.mpris',
      webgl: true
    },
    summary: 'Pretty Awesome'
  }
}
```

