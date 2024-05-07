# GitHub

The GitHub target publishes all your artifacts to GitHub releases, this allows your users to download the files straight from your repository or if your repository is open source you can use [update.electronjs.org](https://github.com/electron/update.electronjs.org) and get a free hosted update service.

Configuration options are documented in [`PublisherGitHubConfig`](https://js.electronforge.io/interfaces/\_electron\_forge\_publisher\_github.PublisherGitHubConfig.html)

:::info
You can use this target to publish to GitHub Enterprise using the host configuration options of `octokitOptions`. Check out the configuration options linked above.
:::

## Usage

```jsx title="forge.config.js"
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


### Auto updating from GitHub

Updating from a GitHub release for a **public** repository is as simple as adding the [`update-electron-app`](https://github.com/electron/update-electron-app) module to your app's main process.

```jsx title="main.js"
const { updateElectronApp } = require('update-electron-app');
updateElectronApp(); // additional configuration options available
```


If your GitHub release is in a private repository, you should check our [Auto Update](../../advanced/auto-update.md) guide for alternative solutions.
