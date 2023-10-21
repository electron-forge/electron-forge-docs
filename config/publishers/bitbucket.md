---
description: >-
  The Bitbucket publish target allows you to publish your artifacts directly to
  Bitbucket where users will be able to download them.
---

# Bitbucket

{% hint style="warning" %}
This publish target is for [Bitbucket Cloud](https://bitbucket.org) only and will not work with self hosted Bitbucket Server instances.
{% endhint %}

Full configuration options are documented in [`PublisherBitbucketConfig`](https://js.electronforge.io/interfaces/\_electron\_forge\_publisher\_bitbucket.PublisherBitbucketConfig.html).

## Usage

{% code title="forge.config.js" %}
```javascript
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
{% endcode %}

you can (and should) use environment variables for the authentication

{% code title="env.sh" %}
```bash
BITBUCKET_USERNAME="myusername"
BITBUCKET_APP_PASSWORD="mysecretapppassword"
```
{% endcode %}

```bash
$ source env.sh
```

{% hint style="info" %}
Your artifacts can be found under the `Downloads` tab of your Bitbucket repository.
{% endhint %}
