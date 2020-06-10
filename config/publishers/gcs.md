# Google Cloud Storage

The Google Cloud Storage (GCS) target publishes all your artifacts to a [Google Cloud Storage bucket](https://cloud.google.com/storage/docs), nothing fancy here, literally just puts all your artifacts straight into the bucket.

{% hint style="warning" %}
If you run publish twice with the same version on the same platform it is possible for your old artifacts to get overwritten in Storage.  It is your responsibility to ensure that you don't overwrite your own releases.
{% endhint %}

By default all files are positioned at the following key:  
  
`${config.folder || version}/${artifactName}`

Configuration options are documented in [`PublisherGCSConfig`](https://js.electronforge.io/publisher/gcs/interfaces/publishergcsconfig.html)

### Usage

```javascript
{
  name: '@electron-forge/publisher-gcs',
  config: {
    bucket: 'my-bucket',
    public: true
  }
}
```

It is recommended to authenticate by providing path to JSON file that contains your Google service account credentials by environment variable `GOOGLE_APPLICATION_CREDENTIALS`.
