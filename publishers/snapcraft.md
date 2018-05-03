# Snapcraft

The Snapcraft target publishes your `.snap` artifacts to the [Snap Store](https://snapcraft.io/store). All configuration of your package is done via the [Snapcraft maker](../makers/snapcraft.md).

This target requires the system has the `snapcraft` utility installed.

Configuration options are documented in [`PublisherSnapConfig`](https://js.electronforge.io/publisher/snapcraft/interfaces/publishersnapcraftconfig.html)

### Usage

```javascript
{
  name: '@electron-forge/publisher-snapcraft'
}
```

