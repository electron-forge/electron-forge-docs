---
description: >-
  The Bitbucket publish target allows you to publish your artifacts directly to
  Bitbucket where users will be able to download them.
---

# Bitbucket

:::warning
This publish target is for [Bitbucket Cloud](https://bitbucket.org) only and will not work with self hosted Bitbucket Server instances.
:::

Full configuration options are documented in [`PublisherBitbucketConfig`](https://js.electronforge.io/interfaces/\_electron\_forge\_publisher\_bitbucket.PublisherBitbucketConfig.html).

## Usage

```jsx title="forge.config.js"
module.exports = {
  // ...
  publishers: [
    {
      name: '@electron-forge/publisher-bitbucket',
      config: {
        repository: {
          owner: 'myusername',
          name: 'myreponame'
        },
        auth: {
          username: process.env.BITBUCKET_USERNAME, // string
          appPassword: process.env.BITBUCKET_APP_PASSWORD // string
        }
      }
    }
  ]
};
```


you can (and should) use environment variables for the authentication

```bash title="env.sh"
BITBUCKET_USERNAME="myusername"
BITBUCKET_APP_PASSWORD="mysecretapppassword"
```


```bash
$ source env.sh
```

:::info
Your artifacts can be found under the `Downloads` tab of your Bitbucket repository.
:::
