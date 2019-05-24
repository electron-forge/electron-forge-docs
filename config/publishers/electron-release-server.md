# Electron Release Server

The Electron Release Server target publishes all your artifacts to a hosted instance of [Electron Release Server](https://github.com/ArekSredzki/electron-release-server).

Please note that Electron Release Server is a community powered project and is not associated with Electron Forge or the Electron project directly.

Configuration options are documented in [`PublisherERSConfig`](https://js.electronforge.io/publisher/electron-release-server/interfaces/publisherersconfig.html) 

### Usage

```javascript
{
  name: '@electron-forge/publisher-electron-release-server',
  config: {
    baseUrl: 'https://update.server.com',
    username: 'admin',
    password: 'admin'
  }
}
```

