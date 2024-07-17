# Snapcraft

The Snapcraft target publishes your `.snap` artifacts to the [Snap Store](https://snapcraft.io/store). All configuration of your package is done via the [snapcraft.md](../makers/snapcraft.md "mention") maker.

## Requirements

You can only publish to the Snap Store on Linux systems with the [`snapcraft`](https://snapcraft.io/) package installed.

## Installation

```bash
npm install --save-dev @electron-forge/publisher-snapcraft
```

## Usage

To use `@electron-forge/publisher-snapcraft`, add it to the `publishers` array in your [Forge configuration](../configuration.md):

{% code title="forge.config.js" %}
```javascript
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
{% endcode %}

Configuration options are documented in [`PublisherSnapConfig`](https://js.electronforge.io/interfaces/\_electron\_forge\_publisher\_snapcraft.PublisherSnapcraftConfig.html).
