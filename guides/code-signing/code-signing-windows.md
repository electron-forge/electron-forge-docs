---
description: >-
  Code signing is a security technology that you use to certify that an app was
  created by you.
---

# Signing a Windows app

## Prerequisites

### Installing Visual Studio

On Windows, apps are signed using [Sign Tool](https://learn.microsoft.com/en-us/dotnet/framework/tools/signtool-exe), which is included in Visual Studio. Install Visual Studio to get the signing utility (the free [Community Edition](https://visualstudio.microsoft.com/vs/community/) is enough).

### Acquiring a certificate

You can get a [Windows Authenticode](https://learn.microsoft.com/en-us/windows-hardware/drivers/install/authenticode) code signing certificate from many vendors. Prices vary, so it may be worth your time to shop around. Popular vendors include:

* [digicert](https://www.digicert.com/dc/code-signing/microsoft-authenticode.htm)
* [Sectigo](https://sectigo.com/ssl-certificates-tls/code-signing)
* Amongst others, please shop around to find one that suits your needs! 😄

{% hint style="danger" %}
**Keep your certificate password private**

Your certificate password should be a **secret**. Do not share it publicly or commit it to your source code.
{% endhint %}

## Configuring Electron Forge

On Windows, Electron apps are signed on the installer level at the **Make** step.

Once you have a Personal Information Exchange (`.pfx`) file for your certificate, you can sign [Squirrel.Windows](../../config/makers/squirrel.windows.md) and [MSI](../../config/makers/wix-msi.md) installers in Electron Forge with the `certificateFile` and `certificatePassword` fields in their respective configuration objects.

For example, if you are creating a Squirrel.Windows installer:

{% code title="forge.config.js" %}
```javascript
module.exports = {
  packagerConfig: {},
  makers: [
    {
      name: '@electron-forge/maker-squirrel',
      config: {
        certificateFile: './cert.pfx',
        certificatePassword: process.env.CERTIFICATE_PASSWORD
      }
    }
  ]
}
```
{% endcode %}
