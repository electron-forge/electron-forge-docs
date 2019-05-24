# Auto Update

Setting up Auto Updates in your app with Electron Forge is mostly the same process [as described in the Electron docs](https://electronjs.org/docs/tutorial/updates).  Forge enhances your workflow by publishing your app to the right place for you.  There are two main ways you can do auto updates.

## Open Source Apps - update.electronjs.org

Open Source apps hosted on [github.com](https://github.com) can use a free auto update service from the Electron team, `update.electronjs.org`. To use this with Forge, set up the [GitHub](../config/publishers/github.md) publisher and add the [`update-electron-app`](https://github.com/electron/update-electron-app) module to your app.

This setup is going to be around 2 lines of code and a few lines of configuration, by far the easiest way to set up auto updates if you're an open source app.

## Host your own update server

If you're not open source or you want slightly more control over your update service you can host your own update server such as [`nucleus`](https://github.com/atlassian/nucleus) or [`nuts`](https://github.com/GitbookIO/nuts).  See the full list of known Electron update servers in the [Electron's Updating Applications docs](https://electronjs.org/docs/tutorial/updates#deploying-an-update-server).

Each update server will have their own configuration for your actual app, but publishing should be done from Forge for most of them:

* `nucleus` - Use the [Nucleus](../config/publishers/nucleus.md) publish target
* `nuts` - Use the [GitHub](../config/publishers/github.md) publish target
* `electron-release-server` - Use the [Electron Release Server](../config/publishers/electron-release-server.md) publish target
* `hazel` - Use the [GitHub](../config/publishers/github.md) publish target

