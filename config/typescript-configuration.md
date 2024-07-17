---
description: Set up your Forge configuration to use TypeScript
---

# TypeScript Configuration

By default, Electron Forge's [configuration](./configuration.md) only supports JavaScript and JSON files as inputs.

Forge also supports configuration files in other languages that transpile down to JavaScript as long as a transpiler is installed locally in your project's `devDependencies`. These configuration files follow the same format as `forge.config.js`.

## Installation

For TypeScript, we recommend installing [`ts-node`](https://github.com/TypeStrong/ts-node). Upon installation, it will automatically be registered as a module loader for `.ts` files.

```bash
npm install --save-dev ts-node
```

## Configuration file

Once you have `ts-node` installed, Forge will be able to load a `forge.config.ts` file from your project's root directory.

This config format is functionally identical to `forge.config.js`.

{% code title="forge.config.ts" %}
```typescript
import type { ForgeConfig } from '@electron-forge/shared-types';

const config: ForgeConfig = {
  packagerConfig: {
    asar: true,
    osxSign: {}
  }
  makers: [
    {
      name: '@electron-forge/maker-squirrel',
      platforms: ['win32'],
      config: {
        authors: "Electron contributors"
      }
    },
    {
      name: '@electron-forge/maker-zip',
      platforms: ['darwin'],
      config: {}
    },
    {
      name: '@electron-forge/maker-deb',
      platforms: ['linux'],
      config: {}
    },
  ]
};

export default config;
```
{% endcode %}

## Using module constructor syntax

When using a TypeScript configuration file, you may want to have stronger type validation around the individual options for each Maker, Publisher, or Plugin.

To achieve this, you can import each module's constructor, which accepts its config object as the first parameter and the list of target platforms as the second parameter.

For example, the below configuration is equivalent to the `makers` array from the example above:

{% code title="forge.config.ts" %}
```typescript
import type { ForgeConfig } from '@electron-forge/shared-types';
import { MakerDeb } from '@electron-forge/maker-deb';
import { MakerSquirrel } from '@electron-forge/maker-squirrel';
import { MakerZIP } from '@electron-forge/maker-zip';

const config: ForgeConfig = {
  makers: [
    new MakerSquirrel({
      authors: 'Electron contributors'
    }, ['win32']),
    new MakerZIP({}, ['darwin']),
    new MakerDeb({}, ['linux']),
    new MakerRpm({}, ['linux']),
  ]
};

export default config;
```
{% endcode %}
