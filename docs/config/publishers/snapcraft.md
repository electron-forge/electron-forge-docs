# Snapcraft

The Snapcraft target publishes your `.snap` artifacts to the
[Snap Store](https://snapcraft.io/store). All configuration of your package is
done via the [snapcraft.md](../makers/snapcraft.md 'mention') maker.

## Requirements

You can only publish to the Snap Store on Linux systems with the
[`snapcraft`](https://snapcraft.io/) package installed.

## Installation

```bash
npm install --save-dev @electron-forge/publisher-snapcraft
```

## Usage

To use `@electron-forge/publisher-snapcraft`, add it to the `publishers` array
in your [Forge configuration](../configuration.md):

```

```js
module.exports = {
  // ...
  publishers: [
    {
      name: '@electron-forge/publisher-snapcraft',
      config: {
        release: '[latest/edge, insider/stable]',
      },
    },
  ],
}
```

```

Configuration options are documented in
[`PublisherSnapConfig`](https://js.electronforge.io/interfaces/_electron_forge_publisher_snapcraft.PublisherSnapcraftConfig.html).
