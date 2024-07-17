# GitHub

The GitHub target publishes all your artifacts to GitHub releases, this allows your users to download the files straight from your repository. If your repository is open source you can use [update.electronjs.org](https://github.com/electron/update.electronjs.org) and get a free hosted update service.

## Installation

```bash
npm install --save-dev @electron-forge/publisher-github
```

## Usage

To use `@electron-forge/publisher-github`, add it to the `publishers` array in your [Forge configuration](../configuration.md):

{% code title="forge.config.js" %}
```javascript
module.exports = {
  // ...
  publishers: [
    {
      name: '@electron-forge/publisher-github',
      config: {
        repository: {
          owner: 'me',
          name: 'awesome-thing'
        },
        prerelease: true
      }
    }
  ]
};
```
{% endcode %}

Configuration options are documented in [`PublisherGitHubConfig`](https://js.electronforge.io/interfaces/\_electron\_forge\_publisher\_github.PublisherGitHubConfig.html).

### Uploading to GitHub Enterprise instances

You can use this target to publish to GitHub Enterprise using the host configuration options of `octokitOptions`. Check out the configuration options linked above.

### Auto updating from GitHub

Updating from a GitHub release for a **public** repository is as simple as adding the [`update-electron-app`](https://github.com/electron/update-electron-app) module to your app's main process.

{% code title="main.js" %}
```javascript
const { updateElectronApp } = require('update-electron-app');
updateElectronApp(); // additional configuration options available
```
{% endcode %}

If your GitHub release is in a private repository, you should check our [Auto Update](../../advanced/auto-update.md) guide for alternative solutions.
