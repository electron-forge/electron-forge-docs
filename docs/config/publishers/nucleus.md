# Nucleus

The Nucleus target publishes all your artifacts to an instance of Nucleus Update Server, this update service supports all three platforms. Check out the README at [`atlassian/nucleus`](https://github.com/atlassian/nucleus) for more information on this project.

Configuration options are documented in [`PublisherNucleusConfig`](https://js.electronforge.io/interfaces/_electron_forge_publisher_nucleus.PublisherNucleusConfig.html)

:::warning
We recommend you set the `token` option using an environment variable, don't hard code it into your config
:::

## Usage

```jsx title="forge.config.js"
module.exports = {
  // ...
  publishers: [
    {
      name: '@electron-forge/publisher-nucleus',
      config: {
        host: 'https://my-nucleus.mysite.com',
        appId: 1,
        channelId: 'abcdefg',
        token: process.env.TOKEN // string
      }
    }
  ]
};
```

