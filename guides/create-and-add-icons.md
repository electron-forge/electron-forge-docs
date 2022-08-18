---
description: The purpose of this guide is to walk through the process of generating and setting an app icon, as well as setting installer and setup icons.
---

# Creating and Setting Icons

## Generating an Icon

Generating your icon can be done using conversion tools found online. The required icon formats for each platform are as follows:
- MacOS: `.icns`
- Windows: `.ico`
- Linux: `.png`

## Setting the App Icon

### Windows and MacOS

Configuring the path to your icon can be done in `package.json`, or `forge.config.js` if you have set `config.forge` to a JavaScript file path in `package.json`.

```javascript
config: {
    forge: {
      packagerConfig: {
        icon: "/path/to/icon"
      },
    }
}
```

`electron-forge` will automatically add the correct extension for each platform, thus appending `.ico` or `.icns` to the path is not required.

After the config has been updated, build your project to generate your executable with either `yarn make` or `npm run make`.



### Linux

Configuring the path to your icon must be done in both `package.json` as well as your main process.

```javascript
// In package.json, or forge.config.js if you have set config.forge to a JavaScript file path in package.json
config: {
    forge: {
        makers: [
            {
                name: "@electron-forge/maker-deb",
                config: {
                    options: {
                        icon: "/path/to/icon.png"
                    }
                }
            }
        ]
    }
}
```

The icon must be additionally loaded within the [BrowserWindow](https://www.electronjs.org/docs/latest/api/browser-window#new-browserwindowoptions).

```javascript
// In the main process.
const { BrowserWindow } = require('electron')

const win = new BrowserWindow(
    {
        // ...
        icon: "/path/to/icon.png"
    }
)
```

Once the path to the icon has been configured, build your project to generate your executable with either `yarn make` or `npm run make`.

## Configuring Installer Icons

Installers usually have icons! Don't forget to configure those in the maker specific config within the [makers section of your forge configuration](https://www.electronforge.io/config/makers).

Here is an example of how that can be done:

```javascript
// In package.json, or forge.config.js if you have set config.forge to a JavaScript file path in package.json
config: {
    forge: {
        makers: [
            {
                name: "@electron-forge/maker-squirrel",
                config: {
                    options: {
                        // An URL to an ICO file to use as the application icon (displayed in Control Panel > Programs and Features).
                        iconurl: "https://url/to/icon.ico",
                        // The ICO file to use as the icon for the generated Setup.exe
                        setupIcon: "/path/to/icon.ico"
                    }
                }
            },
            {
                // Path to a single image that will act as icon for the application
                name: "@electron-forge/maker-deb",
                config: {
                    options: {
                        icon: "/path/to/icon.png"
                    }
                }
            },
            {
                // Path to the icon to use for the app in the DMG window
                name: "@electron-forge/maker-dmg",
                config: {
                    icon: "/path/to/icon.icns"
                }
            },
        ]
    }
}
```

Once again, once you are done configuring your icons, don't forget to build your project with `yarn make` or `npm run make`.
