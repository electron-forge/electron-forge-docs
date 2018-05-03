# Getting Started

## The Basics

Electron Forge is a super easy tool to get started with, first off we need to install the CLI utility and initialize a new project.

{% tabs %}
{% tab title="NPM" %}
```bash
npx @electron-forge/cli init my-app
# While Electron Forge 6 is in beta, you need to specify the version, too:
# npx @electron-forge/cli@^6.0.0-beta.5 init my-app
```
{% endtab %}

{% tab title="Yarn" %}
```bash
yarn create electron-app my-app
```
{% endtab %}

{% tab title="Old-style NPM" %}
```bash
# If you have npm >= 5 you should use the npx trick
npm i -g @electron-forge/cli
electron-forge init my-app
```
{% endtab %}
{% endtabs %}

You should now have a directory called `my-app` with a ulta-minimal Electron app boilerplate inside.  If you head into that directory and start up the app you'll be all set to start developing.

```bash
cd my-app
npm start
# or with yarn: yarn start
```

## Building Distributables

So you've got an **amazing** application there, and you want to package it all up and share it with the world.  If you run the `make` script Electron Forge will generate you platform specific distributables for you to share with everyone.  For more information on what kind of distributables you can make, check out the [Makers ](makers/)documentation.

```text
electron-forge make
```

## Advanced Stuff

Once you've got a basic app going and you can make distributables for it, you should check out the documentation on some of our more advanced features like:

* [Publishers](publishers/)
* [Debugging your app](debugging.md)
* [Webpack support](plugins/webpack.md)
* [Writing your own makers, publishers and plugins](extending-electron-forge/)

