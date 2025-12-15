---
description: 'This is a step-by-step guide to distributing your app either inside or outside of the Mac App Store, or to the Windows Store'
---

# Mac and Windows Distribution

Follow the documentation on how to add Electron Forge to your project. This is fairly straight-forward, so I won't go into it.

Once this is done, a ```forge.config.js``` file will be in your project's root folder. You can convert this to ESM syntax if you want, but if you are creating a universal application, your project will have to be converted back into CJS for the final publishing step as this part of the Electron Forge toolchain does not yet support ESM.

```js
 const config = {
    asar: true,
    appBundleId: 'com.example.appname',
    appVersion: '1.0.0',
    buildVersion: '1.0.0',
    icon: './app'
 }
 ```

```appBundleId```: At some point, you need to sign up for an Apple Developer Account and create an app. This is where you create a bundle Id that you then provide to Forge in this field.

```buildVersion```: This needs to be incremented each time you upload the app to Apple.

```icon```: You can find templates online that provide the right dimensions for the Mac app icon. You need to create rounded corners and provide some space around the icon.

## Signing Configuration

If you want to submit your app to the Mac App Store, you will need to create the following certificates:

- Apple Development
- Apple Distribution
- Mac Installer Distribution

If you want to distribution your app outside of the App Store, you will need the following certificates:

- Developer ID Application
- Developer ID Installer

All of these certificates should be created through Xcode after you have signed up for an Apple Developer Account. If you have created them any other way, you will have to delete them.

Once you have created these certificates, you need to go to your Apple Developer Account and create provisioning profiles. If you are submiting your app to the app store, you will need a development profile and a distribution profile. If you are submiting it outside of the app store, you will need a profile for the ```Developer ID Application``` certificate.

You need to download these after creating them and double clicking them to install them on your computer. Not all of them can be installed locally, but just double-click on them anyway.

Back to the config:

```js
const osxSign = {
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
```

```binaries```: if your electron app calls any binaries, they need to be listed here so that they can be signed.

```identity```: the name of the certificate.

- App store development: Apple Development
- App store distribution: Apple Distribution: FirstName LastName (TEAMID)
- Outside distribution: Developer ID Application: FirstName LastName (TEAMID)

```platform```: for the app store it is ```mas``` and for outside the app store it is ```darwin```

```provisioningProfile```: the appropriate provisioning profile, as mentioned earlier.

```optionsForFile```: for distribution outside of the app store, you may be able to rely on the defaults if you app doesn't need any extra entitlements. For the app store, you will definitely need to provide this.

The documentation fails to mention that you need to add logic to determine which set of entitlements to use. If you specify more entitlements then your app uses, it will probably be rejected by the review process.

For submission to the app store, ```hardenedRuntime``` should be false, but for distribution outside of the app store, it should be true.

Here is an example main entitlements file. Add or remove entitlements depending on the needs of your app.

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

Here is an example child entitlements file.

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

Forge will add additional keys related to your provisioning profile. You should remove the ```app-sandbox``` key in both files when creating the set of entitlements you want to use outside of the app store, as that version does not run in a sandbox.

For distribution outside of the app store, you will need to add ```osxNotarize``` to the packager config section.

```js
const osxNotarize = {
  tool: 'notarytool',
  appleId: process.env.APPLE_ID,
  appleIdPassword: process.env.APPLE_ID_PASSWORD,
  teamId: process.env.TEAM_ID
}
```

```appleId```: usually the email address you used to create your Apple account.

```appleIdPassword```: a one-time password you can create. This is mentioned in the documentation. You create it via the Apple Developer website or something like that.

```teamId```: that set of characters inside the brackets at the end of your identity name.

## Other Packager Configuration

```js
const other = {
  platform: 'mas',
  osxUniversal: {
    x64ArchFiles: '*_mac'
  },
  extraResource: [
    './resources/bin',
    './resources/app.db'
  ],
  appCategoryType: 'public.app-category.utilities'
};
```

```platform```: same as inside the ```osxSign``` configuration.

```osxUniversal```: only necessary if you have a mixture of intel and apple silicon binary files. You can avoid this by using ```lipo``` to combine these binaries into a single file if you want.

```extraResources```: files that you want to copy across to the ```resources``` folder of the containerized environment.

```appCategoryType```: The category that is appropriate for your application.

## Other Configuration

After the packager configuration, there is the ```maker``` configuration and some types of configuration that you can just leave as they are unless you have a use for them.

I don't think you need any makers just for testing. Maybe add this if nothing is created.

```js
const makers = [
  {
    name: '@electron-forge/maker-zip',
    platforms: ['mas'],
  }
];
```

For distribution on the mac store you need to create a ```pkg``` file, so you can use this configuration:

```js
const makers = [
  {
    name: '@electron-forge/maker-pkg',
    platform: ['mas'],
    config: {
      identity: '3rd Party Mac Developer Installer: FirstName LastName (TEAMID)'
    }
  }
];
```

For distribution outside of the app store, you should create a ```dmg``` file using this configuration:

```js
const makers = [
  {
    name: '@electron-forge/maker-dmg',
    config: {
      format: 'ULFO'
    }
  }
];
```

For Windows, you don't need to do any of the above steps related to signing. You just have to add a maker like this:

```js
const makers = [
  {
    name: '@electron-forge/maker-appx',
    config: {
      publisher: 'CN=UUID',
      publisherDisplayName: 'CompanyName',
      displayName: 'AppName',
      version: '1.0.0',
      identityName: 'CompanyName.AppName'
    }
  }
];
```

The uuid in the ```publisher``` field can be found on the Microsoft website that you use to create the app listing. The only trick is that Windows doesn't like dashes in any file or folder names.

## Package Configuration

Inside your ```package.json``` you might need to add a ```productName``` field. Here are some of the fields I have added, beyond what is already in the standard file.

```json
{
  "productName": "AppName",
  "scripts": {
    "build": "./node_modules/.bin/esbuild main.js --bundle --platform=node --format=cjs --packages=external --outfile=bundle.js",
    "mac": "npm run make -- --arch=universal --platform=darwin",
    "mas": "npm run make -- --arch=universal --platform=mas"
  }
}
```

```npm run mac``` will create a ```dmg``` file for distribution outside of the app store, and ```npm run mas``` will create a ```pkg``` file for distribution inside the app store, assuming you have used the appropriate forge configuration. For testing, you don't need to use any of the ```makers``` so you can just use ```npm run package```.

## Testing and Submission

To test your application before submitting it to the app store, you need to make sure you are actually running inside an app store sandbox, and not just running like a normal mac application.

App containers are located in ```~/Library/Containers```. If there is not a folder named after your app there, then your app is not running inside a container and therefore you have messed up one of the steps in the configuration section.

Before packaging your application, you should also check that every file has user read permissions, and that every folder has user read and user execute permissions. Every binary should have user read and user execute permissions as well.

You will also need a working help section in the menu of your app. The help section can link to a website. The electron documentation provides a basic template that you can copy and paste to make sure you have the right menu items. You just need to fix up the help section.

If your app only has one window, the app should close completely when the window is closed.

Once everything is ready, you need to download Transporter from the mac app store and upload your ```pkg``` file.
