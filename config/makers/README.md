# Makers

Makers are Electron Forge's way of taking your packaged application and making platform specific distributables like DMG, EXE, or Flatpak files \(amongst others\).

Each maker has to be configured in the `makers` section of your forge configuration with which platforms to run for and the maker specific config. E.g.

{% code-tabs %}
{% code-tabs-item title="forge.config.js" %}
```javascript
module.exports = {
    makers: [
        {
            name: '@electron-forge/maker-zip',
            platforms: ['darwin', 'linux'],
            config: {
                // Config here
            }
        }
    ]
}
```
{% endcode-tabs-item %}
{% endcode-tabs %}

Please note that all makers have logical defaults for the `platforms` value so you normally don't need to specify that property.

