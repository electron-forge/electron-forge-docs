---
description: >-
  The Bitbucket publish target allows you to publish your artefacts directly to
  Bitbucket where users will be able to download them.
---

# Bitbucket

{% hint style="warning" %}
This publish target is for [Bitbucket Cloud](https://bitbucket.org) only and will not work with self hosted Bitbucket Server instances.
{% endhint %}

Full configuration options are documented in [`PublisherBitbucketConfig`](https://js.electronforge.io/publisher/bitbucket/classes/publisherbitbucket).

### Usage

```javascript
{
  "name": "@electron-forge/publisher-bitbucket",
  "config": {
    "repository": {
      "owner": "myusername",
      "name": "myreponame"
    },
    "auth": {
      "username": "myusername",
      "appPassword": "mysecretapppassword"
    }
}
```

Alternatively you can \(and should\) use environment variables for the authentication

{% code-tabs %}
{% code-tabs-item title="env.sh" %}
```bash
BITBUCKET_USERNAME="myusername"
BITBUCKET_APP_PASSWORD="mysecretapppassword"
```
{% endcode-tabs-item %}
{% endcode-tabs %}

```bash
$ source env.sh
```



