# Writing Plugins

An Electron Forge Plugin has to export a single class that extends our base plugin. The base plugin can be depended on by installing`@electron-forge/plugin-base`. It can implement two methods, neither are required.

### `getHook(hookName: string): Function`

If implemented this method will be called every time a hook fires inside Forge and you must look at the `hookName` and either return a function to run for that hook or return a falsey value to indicate you have no hook to run.  If you wish to run multiple hooks you should compose them into a single function yourself and return that composition.

The possible `hookName` values and the parameters passed to the hook function you return are documented over in the [Configuration](../../configuration.md) section of the docs.

```javascript
export default class MyPlugin extends PluginBase {
  getHook(hookName) {
    switch (hookName) {
      case 'prePackage':
        return this.prePackage;
    }
  }
  
  prePackage() {
    console.log('running prePackage hook');
  }
}
```

### `startLogic(startOpts: StartOptions): Promise<ChildProcess | false>`

If implemented, this method will be called every time the user runs `electron-forge start`, if you return a `ChildProcess` you can override the built in start logic and Electron Forge will not spawn it's own process, rather it will watch the one you returned. If you return `false` forge will spawn Electron itself but you could still run custom logic such as started compilation for code or downloading certain binaries before the app starts.

Please note that overriding the start logic here only works in **development** if you want to change how an app runs once packaged you will need to use a build hook to inject code into the packaged app.

{% hint style="info" %}
`StartOptions`is explained further [in the API docs](https://js.electronforge.io/utils/types/interfaces/startoptions).
{% endhint %}

```javascript
export default class MyPlugin extends Pluginbase {
  async startLogic(opts) {
    await this.compileMainProcess();
    return null;
  }
  
  compileMainProcess() { ... }
}
```

