# GitHub

The GitHub target publishes all your artifacts to GitHub releases, this allows you your users to download the files straight from your repository or if your repository is open source you can use [update.electronjs.org](https://github.com/electron/update.electronjs.org) and get a free hosted update service.

Configuration options are documented in [`PublisherGitHubConfig`](https://js.electronforge.io/publisher/github/interfaces/publishergithubconfig.html)

{% hint style="info" %}
You can use this target to publish to GitHub Enterprise using the host configuration options of `octokitOptions`. Check out the configuration options linked above.
{% endhint %}

### Usage

```javascript
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
```

