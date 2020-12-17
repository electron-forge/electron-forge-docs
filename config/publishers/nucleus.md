# Nucleus

The Nucleus target publishes all your artifacts to an instance of Nucleus Update Server, this update service supports all three platforms. Check out the README at [`atlassian/nucleus`](https://github.com/atlassian/nucleus) for more information on this project.

Configuration options are documented in [`PublisherNucleusConfig`](https://js.electronforge.io/publisher/nucleus/interfaces/publishernucleusconfig.html)

{% hint style="warning" %}
We recommend you set the `token` option using an environment variable, don't hard code it into your config
{% endhint %}

## Usage

```javascript
{
  name: '@electron-forge/publisher-nucleus',
  config: {
    host: 'https://my-nucleus.mysite.com',
    appId: 1,
    channelId: 'abcdefg',
    token: 'my-token'
  }
}
```

