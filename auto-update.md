# Auto Update

Setting up Auto Updates in your Electron Forge app is pretty much the same process as documented in the Electron docs.  Electron Forge will publish your app to the right place for you though.  There are two main ways you can do auto updates.

## Open Source Apps - update.electronjs.org

Open Source apps hosted on [github.com](https://github.com) can get a free auto update service using update.electronjs.org, setting this up with Forge is as simple as setting up the [GitHub](publishers/github.md) publisher and using the [`update-electron-app`](https://github.com/electron/update-electron-app) module in your app.

This setup is going to be around 2 lines of code and a few lines of configuration, by far the easiest way to set up auto updates if you're an open source app.

## Host your own update server

If you're not open source or you want slightly more control over your update service you can host your own update server such as [`nucleus`](https://github.com/atlassian/nucleus) or [`nuts`](https://github.com/GitbookIO/nuts).  See the full list of known electron update servers in the [electron update docs](https://github.com/electron/electron/blob/master/docs/tutorial/updates.md#deploying-an-update-server).

Each update server will have their own configuration for your actual app but publishing should be done from Forge for most of them.  E.g.

* `nucleus` - Use the `@electron-forge/publisher-nucleus` publish target
* `nuts` - Use the `@electron-forge/publisher-github` publish target
* `electron-release-server` - Use the `@electron-forge/publisher-electron-release-server` publish target
* `hazel` - Use the `@electron-forge/publisher-github` target

