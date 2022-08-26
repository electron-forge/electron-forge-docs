---
description: 'To distribute your app with Electron, you need to package it and create installers.'
---
# Packaging Your Application

## Learning goals

In this tutorial, we'll be going over the basics of packaging and distributing
your app with Electron Forge.

## Using Electron Forge

Electron does not have any tooling for packaging and distribution bundled into its core
modules. Once you have a working Electron app in dev mode, you need to use
additional tooling to create a packaged app you can distribute to your users (also known
as a **distributable**). Distributables can be either installers (e.g. MSI on Windows) or
portable executable files (e.g. `.app` on macOS).

### Importing your project into Forge

You can install Electron Forge's CLI in your project's `devDependencies` and import your
existing project with a handy conversion script.

```sh npm2yarn
cd my-app
npm install --save-dev @electron-forge/cli
npx electron-forge import
```

Once the conversion script is done, Forge should have added a few scripts
to your `package.json` file.

```json title='package.json'
  //...
  "scripts": {
    "start": "electron-forge start",
    "package": "electron-forge package",
    "make": "electron-forge make"
  },
  //...
```

{% hint style='info' %}
CLI documentation:

For more information on `make` and other Forge APIs, check out
the [Electron Forge CLI documentation].
{% endhint %}

You should also notice that your package.json now has a few more packages installed
under your `devDependencies`, and contains an added `config.forge` field with an array
of makers configured. **Makers** are Forge plugins that create distributables from
your source code. You should see multiple makers in the pre-populated configuration,
one for each target platform.

### Creating a distributable

To create a distributable, use your project's new `make` script, which runs the
`electron-forge make` command.

```sh npm2yarn
npm run make
```

This `make` command contains two steps:

1. It will first run `electron-forge package` under the hood, which bundles your app
   code together with the Electron binary. The packaged code is generated into a folder.
1. It will then use this packaged app folder to create a separate distributable for each
   configured maker.

After the script runs, you should see an `out` folder containing both the distributable
and a folder containing the packaged application code.

```plain title='macOS output example'
out/
├── out/make/zip/darwin/x64/my-electron-app-darwin-x64-1.0.0.zip
├── ...
└── out/my-electron-app-darwin-x64/my-electron-app.app/Contents/MacOS/my-electron-app
```

The distributable in the `out/make` folder should be ready to launch! You have now
created your first bundled Electron application.

{% hint style='tip' %}
Distributable formats:

Electron Forge can be configured to create distributables in different OS-specific formats
(e.g. DMG, deb, MSI, etc.). See Forge's [Makers] documentation for all configuration options.
{% endhint %}

{% hint style='tip' %}
Packaging without Electron Forge:

If you want to manually package your code, or if you're just interested understanding the
mechanics behind packaging an Electron app, check out the full [Application Packaging]
documentation.
{% endhint %}


{% hint style='tip' %}
Creating and Adding Application Icons:

For a guide on how to configure your application so that it doesn't use the default Electron icons,
visit the guide on [creating and adding icons].
{% endhint %}
## Important: signing your code

In order to distribute desktop applications to end users, we _highly recommended_ for you
to **code sign** your Electron app. Code signing is an important part of shipping
desktop applications, and is mandatory for the auto-update step in the final part
of the tutorial.

Code signing is a security technology that you use to certify that a desktop app was
created by a known source. Windows and macOS have their own OS-specific code signing
systems that will make it difficult for users to download or launch unsigned applications.

If you already have code signing certificates for Windows and macOS, you can set your
credentials in your Forge configuration. Otherwise, please refer to the full
[Code Signing] documentation to learn how to purchase a certificate and for more information
on the desktop app code signing process.

On macOS, code signing is done at the app packaging level. On Windows, distributable installers
are signed instead.

<Tabs>
  <TabItem value="macos" label="macOS" default>

```json title='package.json' {6-18}
{
  //...
  "config": {
    "forge": {
      //...
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
          "appleIdPassword": "this-is-a-secret"
        }
      }
      //...
    }
  }
  //...
}
```

  </TabItem>
  <TabItem value="windows" label="Windows">

```json title='package.json'  {6-14}
{
  //...
  "config": {
    "forge": {
      //...
      "makers": [
        {
          "name": "@electron-forge/maker-squirrel",
          "config": {
            "certificateFile": "./cert.pfx",
            "certificatePassword": "this-is-a-secret"
          }
        }
      ]
      //...
    }
  }
  //...
}
```

  </TabItem>
</Tabs>

## Summary

Electron applications need to be packaged to be distributed to users. In this tutorial,
you imported your app into Electron Forge and configured it to package your app and
generate installers.

In order for your application to be trusted by the user's system, you need to digitally
certify that the distributable is authentic and untampered by code signing it. Your app
can be signed through Forge once you configure it to use your code signing certificate
information.

[`@electron/osx-sign`]: https://github.com/electron/osx-sign
[application packaging]: https://www.electronjs.org/docs/latest/tutorial/application-distribution
[code signing]: ./code-signing/README.md
[`electron-packager`]: https://github.com/electron/electron-packager
[`electron-winstaller`]: https://github.com/electron/windows-installer
[electron forge]: https://www.electronforge.io
[electron forge cli documentation]: https://www.electronforge.io/cli#commands
[makers]: https://www.electronforge.io/config/makers
[creating and adding icons]: ./create-and-add-icons.md