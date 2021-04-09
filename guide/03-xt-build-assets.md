# Static assets

* * *

<p class='page-intro'>Specify how static assets will be handled during builds.</p>

* * *

By default, extension CLI will look for static assets matching this configuration:

```json
"assets": [
    "./assets/**/*",
    "!./assets/locales",
    "!./assets/locales/**/*"
  ],
```

You may change this configuration if the project's static assets are located elsewhere or
if you want to include or exclude additional files/directories.

After the build step, all static assets will be located in the `/dist/assets` directory.

For example, to refer to images in extension manifest, would be as follows:

```json
"browser_action": {
    "default_icon": {
      "16": "assets/img/16x16.png",
      "24": "assets/img/24x24.png",
      "32": "assets/img/32x32.png"
    }
}
```
