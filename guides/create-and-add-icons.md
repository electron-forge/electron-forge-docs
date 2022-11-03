---
description: >-
  The purpose of this guide is to walk through the process of generating and
  setting an app icon, as well as setting installer and setup icons.
---

# Creating and Setting App Icons

## Generating an Icon

Generating your icon can be done using conversion tools found online- it is recommended to start with a 1024px x 1024px image before converting it to various sizes.

On platforms that have high-DPI support such as Apple retina displays, you can append `@2x` after the image's base filename to mark it as a high resolution image. For example, if `icon.png` is a normal image with standard resolution, then `icon@2x.png` will be treated as a high resolution image that has double the DPI intensity.

If you want to support different displays with different DPI densities at the same time, you can put images with different sizes in the same folder, and use the filename without DPI suffixes. For example:

```
images/
├── icon.png
├── icon@2x.png
└── icon@3x.png
```

The following suffixes for DPI are also supported:

@1x, @1.25x, @1.33x, @1.4x, @1.5x, @1.8x, @2x, @2.5x, @3x, @4x, and @5x.

The recommended file formats and icon sizes for each platform are as follows:

* MacOS: `.icns`
  * 512px x 512px
  * for retina displays: 1024px x 1024px
* Windows: `.ico`
  * 256px x 256px
* Linux: `.png`
  * 512px x 512px

## Setting the App Icon

### Windows and MacOS

Configuring the path to your icon can be done in `forge.config.js`

```javascript
// forge.config.js
module.exports = {
    // ...
    config: {
        forge: {
            packagerConfig: {
                icon: '/path/to/icon'
            }
        }
    }
}
```

`electron-forge` will automatically add the correct extension for each platform, thus appending `.ico` or `.icns` to the path is not required.

After the config has been updated, build your project to generate your executable with either `yarn make` or `npm run make`.

### Linux

Configuring the path to your icon must be done in both `package.json` as well as your main process.

<pre class="language-javascript"><code class="lang-javascript">// forge.config.js
module.exports = {
    // ...
    config: {
        forge: {
            makers: [
                {
                    name: '@electron-forge/maker-deb',
                    config: {
                        options: {
                            icon: '/path/to/icon.png'
                        }
                    }
                }
            ]
        }
    }
<strong>}</strong></code></pre>

The icon must be additionally loaded within the [BrowserWindow](https://www.electronjs.org/docs/latest/api/browser-window#new-browserwindowoptions).

```javascript
// In the main process.
const { BrowserWindow } = require('electron')

const win = new BrowserWindow(
    {
        // ...
        icon: '/path/to/icon.png'
    }
)
```

Once the path to the icon has been configured, build your project to generate your executable with either `yarn make` or `npm run make`.

## Configuring Installer Icons

Installers usually have icons! Don't forget to configure those in the maker specific config within the [makers section of your forge configuration](https://www.electronforge.io/config/makers).

Here is an example of how that can be done:

<pre class="language-javascript"><code class="lang-javascript">// forge.config.js
module.export = {
    // ...
    config: {
        forge: {
            makers: [
                {
                    name: '@electron-forge/maker-squirrel',
                    config: {
                        // An URL to an ICO file to use as the application icon (displayed in Control Panel > Programs and Features).
                        iconUrl: 'https://url/to/icon.ico',
                        // The ICO file to use as the icon for the generated Setup.exe
                        setupIcon: '/path/to/icon.ico'
                    }
                },
                {
                    // Path to a single image that will act as icon for the application
                    name: '@electron-forge/maker-deb',
                    config: {
                        options: {
                            icon: '/path/to/icon.png'
                        }
                    }
                },
                {
                    // Path to the icon to use for the app in the DMG window
                    name: '@electron-forge/maker-dmg',
                    config: {
                        icon: '/path/to/icon.icns'
                    }
                },
                {
                    name: '@electron-forge/maker-wix',
                    config: {
                        icon: '/path/to/icon.ico'
                    }
                }
            ]
        }
<strong>    }
</strong>}</code></pre>

Once again, once you are done configuring your icons, don't forget to build your project with `yarn make` or `npm run make`.
