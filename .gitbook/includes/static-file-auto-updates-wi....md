---
title: Static file auto-updates wi...
---

{% hint style="success" %}
**Static file auto-updates with DMG distributions**

The [Squirrel.Mac](https://github.com/Squirrel/Squirrel.mac) implementation behind Electron's `autoUpdater` module on macOS supports static file auto-updates from the ZIP artifacts uploaded to your cloud storage [publishers](../../config/publishers/ "mention").

If you want to distribute a DMG that supports static file auto-updates, make sure to also make a [zip.md](../../config/makers/zip.md "mention") target and follow the [#auto-updating-from-s3](../../config/publishers/s3.md#auto-updating-from-s3 "mention") instructions to configure updates.
{% endhint %}
