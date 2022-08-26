---
description: Code signing is a security technology that you use to certify that an app was created by you.
---

# Configure Code Signing in Forge (Windows)

Code signing is a security technology that you use to certify that an app was
created by you. You should sign your application so it does not trigger any
operating system security checks.

On Windows, the system assigns a trust level to your code signing certificate
which if you don't have, or if your trust level is low, will cause security
dialogs to appear when users start using your application. Trust level builds
over time so it's better to start code signing as early as possible.

While it is possible to distribute unsigned apps, it is not recommended.
Windows will, by default, prevent either the download or the execution
of unsigned applications.

If you are building an Electron app that you intend to package and distribute,
it should be code signed.

## Signing Windows builds

Before signing Windows builds, you must do the following:

1. Get a Windows Authenticode code signing certificate (requires an annual fee)
2. Install Visual Studio to get the signing utility (the free [Community
   Edition](https://visualstudio.microsoft.com/vs/community/) is enough)

You can get a code signing certificate from a lot of resellers. Prices vary, so
it may be worth your time to shop around. Popular resellers include:

- [digicert](https://www.digicert.com/code-signing/microsoft-authenticode.htm)
- [Sectigo](https://sectigo.com/ssl-certificates-tls/code-signing)
- Amongst others, please shop around to find one that suits your needs! 😄

:::caution Keep your certificate password private
Your certificate password should be a **secret**. Do not share it publicly or
commit it to your source code.
:::

### Using Electron Forge

Once you have a code signing certificate file (`.pfx`), you can sign
[Squirrel.Windows][maker-squirrel] and [MSI][maker-msi] installers in Electron Forge
with the `certificateFile` and `certificatePassword` fields in their respective
configuration objects.

For example, if you keep your Forge config in your `package.json` file and are
creating a Squirrel.Windows installer:

```json {9-15} title='package.json'
{
  "name": "my-app",
  "version": "0.0.1",
  //...
  "config": {
    "forge": {
      "packagerConfig": {},
      "makers": [
        {
          "name": "@electron-forge/maker-squirrel",
          "config": {
            "certificateFile": "./cert.pfx",
            "certificatePassword": "this-is-a-secret"
          }
        }
      ]
    }
  }
  //...
}
```