---
description: >-
  Code signing is a security technology that you use to certify that an app was
  created by you.
---

# Signing a macOS app

On macOS, there are two layers of security technology for application distribution: **code signing** and **notarization**.

* **Code Signing** is the act of certifying the identity of the app's author and ensuring it was not tampered with before distribution.
* **Notarization** is an extra verification step where the app is sent to Apple servers for an automated malware scan.

{% hint style="info" %}
From macOS 10.15 (Catalina) onwards, your application needs to be **both code signed and notarized** to run on a user's machine without disabling additional operating system security checks.

The exception is for Mac App Store (MAS) apps, where notarization is not required because the MAS submission process involves a similar automated check.
{% endhint %}

## Prerequisites

### Installing Xcode

[Xcode](https://developer.apple.com/xcode/) is Apple's integrated development environment (IDE) for development on macOS, iOS, and other platforms.

Although Electron does not integrate tightly with the IDE itself, Xcode is a helpful tool for installing code signing certificates (see next section) and is **required** for notarization.

### Obtaining signing certificates

Code signing certificates for macOS apps can only be obtained through Apple by purchasing a membership to the [Apple Developer Program](https://developer.apple.com/programs/).

If you want to submit your app to the Mac App Store, you will need to create the following certificates:

- Apple Development
- Apple Distribution
- Mac Installer Distribution

If you want to distribution your app outside of the App Store, you will need the following certificates:

- Developer ID Application
- Developer ID Installer

All of these certificates should be created through Xcode after you have signed up for an Apple Developer Account. If you have created them any other way, you will have to delete them.

{% hint style="success" %}
**Verifying your certificate is installed**

Once you have installed your certificate, you can check available code signing certificates in your terminal using the following shell command:

```shell
security find-identity -p codesigning -v
```
{% endhint %}

### Creating provisioning profiles

Once you have created the certificates, you need to go to your Apple Developer Account and create provisioning profiles. If you are submiting your app to the app store, you will need a development profile and a distribution profile. If you are submiting it outside of the app store, you will need a profile for the ```Developer ID Application``` certificate.

You need to download these after creating them and double clicking them to install them on your computer. Not all of them can be installed locally, but just double-click on them anyway.

## Configuring Forge

In Electron Forge, macOS apps are signed and notarized at the **Package** step by the `electron-packager` library. There is a separate option within your Forge `packagerConfig` for each one of these settings.

### osxSign options

{% hint style="info" %}
Under the hood, Electron Forge uses the [`@electron/osx-sign`](https://github.com/electron/osx-sign) tool to sign your macOS application.
{% endhint %}

To enable code signing on macOS, ensure that `packagerConfig.osxSign` exists in your Forge configuration.

{% code title="forge.config.js" %}
```javascript
module.exports = {
  packagerConfig: {
    osxSign: {
        binaries: [
        './resources/bin/ffmpeg_intel_mac',
        './resources/bin/ffmpeg_mac'
      ],
      identity: 'Apple Development',
      platform: 'mas',
      type: 'development',
      provisioningProfile: 'development.provisionprofile',
      optionsForFile: (filePath) => {
        const entitlements = filePath.includes('.app/') ? 'entitlements.child.plist' : 'entitlements.plist';
        return {
          hardenedRuntime: false,
          entitlements
        }
      }
    }
  }
};
```
{% endcode %}

```binaries```: if your electron app calls any binaries, they need to be listed here so that they can be signed.

```identity```: the name of the certificate.

- App store development: Apple Development
- App store distribution: Apple Distribution: FirstName LastName (TEAMID)
- Outside distribution: Developer ID Application: FirstName LastName (TEAMID)

```platform```: for the app store it is ```mas``` and for outside the app store it is ```darwin```

```provisioningProfile```: the appropriate provisioning profile, as mentioned earlier.

```optionsForFile```: for distribution outside of the app store, you may be able to rely on the defaults if you app doesn't need any extra entitlements. For the app store, you will definitely need to provide this.

You need to add logic to determine which set of entitlements to use. If you specify more entitlements then your app uses, it will probably be rejected by the review process.

For submission to the app store, ```hardenedRuntime``` should be false, but for distribution outside of the app store, it should be true.

For a full list of configuration options, see the [`OsxSignOptions`](https://js.electronforge.io/modules/\_electron\_forge\_shared\_types.InternalOptions.html#OsxSignOptions) type in the Forge API docs. For more detailed information on how to configure these options, see the [`@electron/osx-sign` documentation](https://github.com/electron/osx-sign).

#### Entitlements

In macOS, **entitlements** are privileges that grant apps certain capabilities (e.g. access to the camera, microphone, or USB devices). These are stored within the code signature in an app's executable file.

Here is an example main entitlements file. Add or remove entitlements depending on the needs of your app.

{% code title="entitlements.plist" %}
```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
  <dict>
    <key>com.apple.security.app-sandbox</key>
    <true/>
    <key>com.apple.security.files.user-selected.read-write</key>
    <true/>
    <key>com.apple.security.files.bookmarks.app-scope</key>
    <true/>
    <key>com.apple.security.network.client</key>
    <true/>
    <key>com.apple.security.print</key>
    <true/>
    <key>com.apple.security.device.usb</key>
    <true/>
    <key>com.apple.security.files.downloads.read-write</key>
    <true />
  </dict>
</plist>
```
{% endcode %}

Here is an example child entitlements file.

{% code title="entitlements.child.plist" %}
```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
  <dict>
    <key>com.apple.security.app-sandbox</key>
    <true/>
    <key>com.apple.security.inherit</key>
    <true/>
  </dict>
</plist>
```
{% endcode %}

Forge will add additional keys related to your provisioning profile. You should remove the ```app-sandbox``` key in both files when creating the set of entitlements you want to use outside of the app store, as that version does not run in a sandbox.

For further reading on entitlements, see the following pages in Apple developer documentation:

* [Entitlements](https://developer.apple.com/documentation/bundleresources/entitlements)
* [Hardened Runtime](https://developer.apple.com/documentation/security/hardened\_runtime)

### osxNotarize options

{% hint style="info" %}
Under the hood, Electron Forge uses the [`@electron/notarize`](https://github.com/electron/notarize) tool to notarize your macOS application.
{% endhint %}

The `notarytool` command has three authentication options, which are detailed below. Note that you will want to use a `forge.config.js` configuration so that you can load environment variables into your Forge config.

{% hint style="danger" %}
**Keep your authentication details private**

You should never store authentication info in plaintext in your configuration. In the examples below, credentials are stored as environment variables and accessed via the Node.js [`process.env`](https://nodejs.org/dist/latest-v16.x/docs/api/process.html#processenv) object.
{% endhint %}

#### Option 1: Using an app-specific password

You can generate an [app-specific password](https://support.apple.com/en-us/HT204397) from Apple to provide your credentials to `notarytool`. This password will need to be regenerated if you change your Apple ID password.

There are two mandatory fields for `osxNotarize` if you are using this strategy:

| Field             | Type   | Description                                                                                                                                                                                                   |
| ----------------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `appleId`         | string | Usually the email address you used to create your Apple Developer account.                                                                                                                                                         |
| `appleIdPassword` | string | A one-time password that can be create via the Apple Developer website.                                                                                                                                                                                       |
| `teamId`          | string | The Apple Team ID you want to notarize under. It is the set of characters inside the brackets at the end of your identity name. |

{% code title="forge.config.js" %}
```javascript
module.exports = {
  // ...
  packagerConfig: {
    // ...
    osxNotarize: {
      tool: 'notarytool',
      appleId: process.env.APPLE_ID,
      appleIdPassword: process.env.APPLE_PASSWORD,
      teamId: process.env.APPLE_TEAM_ID
    }
  }
  // ...
};
```
{% endcode %}

{% hint style="warning" %}
Despite the name, `appleIdPassword` is **not** the password for your Apple ID account.
{% endhint %}

#### Option 2: Using an App Store Connect API key

You can generate an App Store Connect API key to authenticate `notarytool` by going to the [App Store Connect access page](https://appstoreconnect.apple.com/access/integrations/api) and using the "Team Keys" tab. This API key will look something like `AuthKey_ABCD123456.p8` and can only be downloaded once.

There are three mandatory fields for `osxNotarize` if you are using this strategy:

| Field            | Type   | Description                                                                                                        |
| ---------------- | ------ | ------------------------------------------------------------------------------------------------------------------ |
| `appleApiKey`    | string | Filesystem path string to your API key file.                                                                       |
| `appleApiKeyId`  | string | 10-character alphanumeric ID string. In the previous `AuthKey_ABCD123456.p8` example, this would be `ABCD123456`.  |
| `appleApiIssuer` | string | UUID that identifies the API key issuer. You will find this ID in the "Keys" tab where you generated your API key. |

{% code title="forge.config.js" %}
```javascript
module.exports = {
  // ...
  packagerConfig: {
    // ...
    osxNotarize: {
      appleApiKey: process.env.APPLE_API_KEY,
      appleApiKeyId: process.env.APPLE_API_KEY_ID,
      appleApiIssuer: process.env.APPLE_API_ISSUER
    }
  }
  // ...
};
```
{% endcode %}

#### Option 3: Using a keychain

Instead of providing environment variables to the Forge config passed to `notarytool`, you can choose to use a macOS [keychain](https://support.apple.com/en-ca/guide/keychain-access/welcome/mac) containing either set of credentials (either Option 1 or Option 2 above).

You can do this directly in your terminal via the `notarytool store-credentials` command. For usage information, you can refer to the man page for `notarytool`:

```bash
man notarytool
```

There are two available fields for `osxNotarize` if you are using this strategy:

| Field                 | Type   | Description                                                                     |
| --------------------- | ------ | ------------------------------------------------------------------------------- |
| `keychainProfile`     | string | Name of the keychain profile containing your notarization credentials.          |
| `keychain` (optional) | string | Name of (or path to) the keychain containing the profile with your credentials. |

Note that if you use `notarytool store-credentials`, the `keychain` parameter can be auto-detected.

{% code title="forge.config.js" %}
```javascript
module.exports = {
  // ...
  packagerConfig: {
    // ...
    osxNotarize: {
      keychainProfile: 'my-keychain-profile'
    }
  }
  // ...
};
```
{% endcode %}

### Example configuration

Below is a minimal Forge configuration for `osxSign` and `osxNotarize`.

{% code title="forge.config.js" %}
```javascript
module.exports = {
  packagerConfig: {
    osxSign: {},
    osxNotarize: {
      tool: 'notarytool',
      appleId: process.env.APPLE_ID,
      appleIdPassword: process.env.APPLE_PASSWORD,
      teamId: process.env.APPLE_TEAM_ID
    }
  }
};
```
{% endcode %}
