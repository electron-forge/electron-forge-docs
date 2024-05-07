---
description: >-
  Code signing is a security technology that you use to certify that an app was
  created by you.
---

# Signing a Windows app

:::warning
Starting June 1, 2023 at 00:00 UTC, private keys for code signing certificates need to be stored on a hardware storage module compliant with FIPS 140 Level 2, Common Criteria EAL 4+ or equivalent.\
\
In practice, this means that software-based OV certificates used in the steps below will no longer be available for purchase. For instructions on how to sign applications with newer token-based certificates, consult your Certificate Authority's documentation.
:::

## Prerequisites

### Installing Visual Studio

On Windows, apps are signed using [Sign Tool](https://learn.microsoft.com/en-us/dotnet/framework/tools/signtool-exe), which is included in Visual Studio. Install Visual Studio to get the signing utility (the free [Community Edition](https://visualstudio.microsoft.com/vs/community/) is enough).

### Acquiring a certificate

You can get a [Windows Authenticode](https://learn.microsoft.com/en-us/windows-hardware/drivers/install/authenticode) code signing certificate from many vendors. Prices vary, so it may be worth your time to shop around. Popular vendors include:

* [digicert](https://www.digicert.com/dc/code-signing/microsoft-authenticode.htm)
* [Sectigo](https://sectigo.com/ssl-certificates-tls/code-signing)
* Amongst others, please shop around to find one that suits your needs! 😄

:::danger
**Keep your certificate password private**

Your certificate password should be a **secret**. Do not share it publicly or commit it to your source code.
:::

## Configuring Electron Forge

On Windows, Electron apps are signed on the installer level at the **Make** step.

Once you have a Personal Information Exchange (`.pfx`) file for your certificate, you can sign [Squirrel.Windows](../../config/makers/squirrel.windows.md) and [MSI](../../config/makers/wix-msi.md) installers in Electron Forge with the `certificateFile` and `certificatePassword` fields in their respective configuration objects.

For example, if you are creating a Squirrel.Windows installer:

```jsx title="forge.config.js"
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
};
```

