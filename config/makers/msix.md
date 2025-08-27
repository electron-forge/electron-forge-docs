---
description: >-
  Create a MSIX package that can be shipped as a direct download or to the Microsoft Store for your Electron app, using Electron
  Forge.
---

# MSIX

The MSIX target builds `.msix` packages which can be directly distributed to end user or to the [Microsoft Store](https://apps.microsoft.com/home).

## Requirements

You can only build the MSIX target on Windows 10 or 11 machines with the [Windows SDK](https://developer.microsoft.com/en-us/windows/downloads/windows-sdk/) installed. Check the [`electron-windows-msix` docs](https://github.com/bitdisaster/electron-windows-msix) for more information on platform requirements.

## Installation

```bash
npm install --save-dev @electron-forge/maker-msix
```

## Usage

To use `@electron-forge/maker-msix`, add it to the `makers` array in your [Forge configuration](../configuration.md):

{% code title="forge.config.js" %}
```javascript
module.exports = {
  makers: [
    {
      name: '@electron-forge/maker-msix',
      config: {
        manifestVariables: {
          publisher: 'Electron Dev'
        },
      cert: 'C:\\cert.pfx'
      cert_pass: '12345'
      }
    }
  ]
};
```
{% endcode %}

Configuration options are documented in [`MakerMSIXConfig`](https://js.electronforge.io/interfaces/\_electron\_forge\_maker\_msix.MakerMSIXConfig.html).

## Debugging

For advanced debug logging for this maker, add the `DEBUG=electron-windows-msix*` environment variable or set the log level to `debug` in the config object `{logLevel = 'debug'}`.
