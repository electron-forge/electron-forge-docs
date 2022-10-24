# Snapcraft

The Snapcraft target publishes your `.snap` artifacts to the [Snap Store](https://snapcraft.io/store). All configuration of your package is done via the [Snapcraft maker](../makers/snapcraft.md).

This target requires that the system has the `snapcraft` utility installed.

Configuration options are documented in [`PublisherSnapConfig`](https://js.electronforge.io/interfaces/_electron_forge_publisher_snapcraft.PublisherSnapcraftConfig.html)

### Usage

```javascript
{
  name: '@electron-forge/publisher-snapcraft',
  config: {
    release: "1"
  }
}
```

