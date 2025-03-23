---
description: >-
  Generate platform specific distributables for Electron apps using Electron
  Forge.
---

# Makers

Makers are Electron Forge's way of taking your packaged application and generating platform-specific distributable formats like [dmg.md](dmg.md "mention"), [appx.md](appx.md "mention"), or [flatpak.md](flatpak.md "mention") files (amongst others).

Each maker has to be configured in the `makers` section of your Forge configuration. For example:

{% tabs %}
{% tab title="forge.config.js" %}
```javascript
module.exports = {
  makers: [
    {
      name: '@electron-forge/maker-zip',
      platforms: ['darwin', 'linux'],
      config: {
        // the config can be an object
      }
    },
    {
      name: '@electron-forge/maker-dmg',
      config: (arch) => ({
        // it can also be a function taking the currently built arch
        // as a parameter and returning a config object, e.g.
      })
    }
  ]
};
```
{% endtab %}

{% tab title="package.json" %}
```json
// Only showing the relevant configuration for brevity
{
  "config": {
    "forge": {
      "makers": [
        {
          "name": "@electron-forge/maker-zip",
          "platforms": ["darwin", "linux"], // optional
          "config": {
              // Config here
          }
        }
      ]
    }
  }
}
```
{% endtab %}
{% endtabs %}

{% hint style="info" %}
If a Maker supports multiple platforms, you may specify which platforms you want to target. Note that all Makers have logical defaults for the `platforms` value so you normally don't need to specify that property.
{% endhint %}

