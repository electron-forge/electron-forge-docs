# Snapcraft

The Snapcraft target publishes your `.snap` artifacts to the [Snap Store](https://snapcraft.io/store). All configuration of your package is done via the [Snapcraft maker](../makers/snapcraft.md).

This target requires that the system has the `snapcraft` utility installed.

Configuration options are documented in [`PublisherSnapConfig`](https://js.electronforge.io/interfaces/\_electron\_forge\_publisher\_snapcraft.PublisherSnapcraftConfig.html)

### Usage

```jsx title="forge.config.js"
module.exports = {
  // ...
  publishers: [
    {
      name: '@electron-forge/publisher-snapcraft',
      config: {
        release: '[latest/edge, insider/stable]'
      }
    }
  ]
};
```

