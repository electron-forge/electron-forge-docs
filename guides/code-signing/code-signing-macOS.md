---
description: Code signing is a security technology that you use to certify that an app was created by you.
---

# Configure Code Signing in Forge (macOS)

Code signing is a security technology that you use to certify that an app was
created by you. You should sign your application so it does not trigger any
operating system security checks. If you intend to package and distribute your Electron app,
it should be code signed.

## Signing & notarizing macOS builds

Getting your application signed and notarized requires a few additions to your configuration.

Let's take a look at an example `package.json` configuration with all required fields. Not all of them are
required: the tools will be clever enough to automatically find a suitable `identity`, for instance,
but we recommend that you are explicit.

```json title="package.json" {7}
{
  "name": "my-app",
  "version": "0.0.1",
  "config": {
    "forge": {
      "packagerConfig": {
        "osxSign": {
          "identity": "Developer ID Application: Felix Rieseberg (LT94ZKYDCJ)",
          "hardened-runtime": true,
          "entitlements": "entitlements.plist",
          "entitlements-inherit": "entitlements.plist",
          "signature-flags": "library"
        },
        "osxNotarize": {
          "appleId": "felix@felix.fun",
          "appleIdPassword": "my-apple-id-password"
        }
      }
    }
  }
}
```

The `entitlements.plist` file referenced here needs the following macOS-specific entitlements
to assure the Apple security mechanisms that your app is doing these things
without meaning any harm:

```xml title="entitlements.plist"
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
  <dict>
    <key>com.apple.security.cs.allow-jit</key>
    <true/>
    <key>com.apple.security.cs.debugger</key>
    <true/>
  </dict>
</plist>
```

Note that up until Electron 12, the `com.apple.security.cs.allow-unsigned-executable-memory` entitlement was required
as well. However, it should not be used anymore if it can be avoided.

To see all of this in action, check out Electron Fiddle's source code,
[especially its `electron-forge` configuration
file](https://github.com/electron/fiddle/blob/master/forge.config.js).

If you plan to access the microphone or camera within your app using Electron's APIs, you'll also
need to add the following entitlements:

```xml title="entitlements.plist"
<key>com.apple.security.device.audio-input</key>
<true/>
<key>com.apple.security.device.camera</key>
<true/>
```

If these are not present in your app's entitlements when you invoke, for example:

```js title="main.js"
const { systemPreferences } = require('electron')
const microphone = systemPreferences.askForMediaAccess('microphone')
```

Your app may crash. See the Resource Access section in [Hardened Runtime](https://developer.apple.com/documentation/security/hardened_runtime) for more information and entitlements you may need.
