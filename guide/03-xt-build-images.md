# Images

* * *

<p class='page-intro'>Specify how image assets will be handled during builds.</p>

* * *

By default, extension CLI will look for image assets using these configurations:

```json
"icons": [
    "./assets/img/**/*.png",
    "./assets/img/**/*.gif",
    "./assets/img/**/*.jpg",
    "./assets/img/**/*.svg"
],
```

You may change this configuration if the project image assets are located elsewhere or
if you want to support additional image file extensions.

After the build step, all image assets will be located in the `/dist/icons` directory.

In your extension `manifest.json` refer to images as follows:

```json
"browser_action": {
    "default_icon": {
      "16": "icons/16x16.png",
      "24": "icons/24x24.png",
      "32": "icons/32x32.png"
    }
}
```

In javascript, stylesheets or HTML files refer to images by `icons/myImage.jpeg`
