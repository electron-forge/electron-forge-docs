---
description: 'This is a step-by-step guide to distributing your app via the Mac App Store'
---

# App Store

Follow the documentation on how to add Electron Forge to your project. This is fairly straight-forward, so I won't go into it.

Once this is done, a ```forge.config.js``` file will be in your project's root folder. You can convert this to ESM syntax if you want, but if you are creating a universal application, your project will have to be converted back into CJS for the final publishing step as this part of the Electron Forge toolchain does not yet support ESM.

{% code title="forge.config.js" %}
```js
module.exports = {
  packagerConfig: {
    asar: true,
    appBundleId: 'com.example.appname',
    appVersion: '1.0.0',
    buildVersion: '1.0.0',
    icon: './app',
    osxSign: {},
    platform: 'mas',
    osxUniversal: {
      x64ArchFiles: '*_mac'
    },
    extraResource: [
      './resources/bin',
      './resources/app.db'
    ],
    appCategoryType: 'public.app-category.utilities'
  }
}
 ```
{% endcode %}

```appBundleId```: At some point, you need to sign up for an Apple Developer Account and create an app. This is where you create a bundle Id that you then provide to Forge in this field.

```buildVersion```: This needs to be incremented each time you upload the app to Apple.

```icon```: You can find templates online that provide the right dimensions for the Mac app icon. You need to create rounded corners and provide some space around the icon.

```osxSign```: The code signing configuration. Following the instructions [here](code-signing/code-signing-macos.md)

```platform```: same as inside the ```osxSign``` configuration.

```osxUniversal```: only necessary if you have a mixture of intel and apple silicon binary files. You can avoid this by using ```lipo``` to combine these binaries into a single file if you want.

```extraResources```: files that you want to copy across to the ```resources``` folder of the containerized environment.

```appCategoryType```: The category that is appropriate for your application.

## Other Configuration

After the packager configuration, there is the ```maker``` configuration and some types of configuration that you can just leave as they are unless you have a use for them.

I don't think you need any makers just for testing. Maybe add the ```zip``` maker if nothing is created. For distribution on the Mac store you need to create a ```pkg``` file.

{% code title="forge.config.js" %}
```js
module.exports = {
  packagerConfig: {},
  makers: [
    {
      name: '@electron-forge/maker-pkg',
      platform: ['mas'],
      config: {
        identity: '3rd Party Mac Developer Installer: FirstName LastName (TEAMID)'
      }
    }
  ]
}
 ```
{% endcode %}

## Package Configuration

Inside your ```package.json``` you might need to add a ```productName``` field. The scripts mentioned below can help you bundle and package your code.

{% code title="package.json" %}
```json
{
  "productName": "AppName",
  "scripts": {
    "build": "./node_modules/.bin/esbuild main.js --bundle --platform=node --format=cjs --packages=external --outfile=bundle.js",
    "mas": "npm run make -- --arch=universal --platform=mas"
  }
}
```
{% endcode %}

```npm run mas``` will create a ```pkg``` file for distribution inside the app store, assuming you have used the appropriate forge configuration. For testing, you don't need to use any of the ```makers``` so you can just use ```npm run package```.

## Testing and Submission

To test your application before submitting it to the app store, you need to make sure you are actually running inside an app store sandbox, and not just running like a normal mac application.

App containers are located in ```~/Library/Containers```. If there is not a folder named after your app there, then your app is not running inside a container and therefore you have messed up one of the steps in the configuration section.

Before packaging your application, you should also check that every file has user read permissions, and that every folder has user read and user execute permissions. Every binary should have user read and user execute permissions as well.

You will also need a working help section in the menu of your app. The help section can link to a website. The electron documentation provides a basic template that you can copy and paste to make sure you have the right menu items. You just need to fix up the help section.

If your app only has one window, the app should close completely when the window is closed.

Once everything is ready, you need to download Transporter from the Mac App Store and upload your ```pkg``` file.
