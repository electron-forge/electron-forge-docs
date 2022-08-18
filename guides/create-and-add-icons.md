---
description: How to create and set an app icon
---

# Creating and Setting App Icons

## Generating an Icon

Generating your icon can be done using conversion tools found online. The required icon formats for each platform are as follows:
- MacOS: `.icns`
- Windows: `.ico`
- Linux: `.png`

## Setting the Icon

### Windows and MacOS

Configuring the path to your icon can be done in `package.json`. 

```json
"config": {
    "forge": {
      "packagerConfig": {
        "icon": "/path/to/icon"
      },
    }
}
```

`electron-forge` will automatically add the correct extension for each platform, thus appending `.ico` or `.icns` to the path is not required.

After the config has been updated, build your project to generate your executable with either `yarn make` or `npm run make`.



### Linux

Configuring the path to your icon must be done in both `package.json` as well as your main process.

```json
// in package.json
"config": {
    "forge": {
        "makers": [{
            "name": "@electron-forge/maker-deb",
            "config": {
                "options": {
                    "icon": "/path/to/icon.png"
                }
            }
        }]
    }
}
```

The icon must be additionally loaded within the [BrowserWindow](https://www.electronjs.org/docs/latest/api/browser-window#new-browserwindowoptions).

```ts
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