---
description: Create a ZIP file for your Electron app using Electron Forge.
---

# Zip

The Zip target builds basic `.zip` files containing your packaged application.There are no platform specific dependencies for using this maker and it will run on any platform.

### Usage

```javascript
{
  name: '@electron-forge/maker-zip',
  config: (arch) => ({
    macUpdateManifestBaseUrl: (config) => {
      const parsed = new URL(config.macUpdateManifestBaseUrl);
      if (!parsed.pathname.endsWith('/RELEASES.json')) {
        parsed.pathname += '/RELEASES.json';
      }
      return parsed.toString();
    }
  })
}

```
