# xt-build

* * *

<p class='page-intro'><code>xt-build</code> command is used for generating a debuggable, development version of an extension project. It is also used to create a production-ready, minified .zip file that can be uploaded to the chrome web store.</p>

* * *

Successful build command always generates an extension `dist/` directory that can be debugged in the browser.  The underlying build system
uses [gulp](https://github.com/gulpjs/gulp), [babel](https://github.com/babel/gulp-babel) and [webpack](https://github.com/webpack/webpack) to compile scripts (among other plugins).

### Dev Build Artifacts

When specifying`dev` build flag, the build will complete using development settings. The output of a successful dev build is  a `dist/` directory which can be debugged using the chrome browser. The build command will always compile scripts using production settings, because extension scripts must be compiled prior to debugging (`eval` is not allowed).

### Prod Build Artifacts

When specifying `prod` build flag, the build will run a production build. Successful production build will generate a `dist/` directory of extension files which can be debugged in the browser. It will also generate a `release.zip` file in the project root strictly based on the files in the `dist` directory. This zip file can be uploaded directly to the Chrome Web Store. When running a production build, all code files (js, sass, html, json) will be minified.

## Commands

Braces `{ }` indicate that the user must choose one — and only one — of the items inside the braces.


**Run production build (default)**

```
xt-build
```

**Run production build using explicit flag `-e` or `--env`**

```
xt-build {-e|--env} prod
```

**Run development build**

```
xt-build {-e|--env} dev
```

**Run command using custom configuration file path**

```
xt-build {-c|--config} "/path/to/config.json"
```

**Run development build and keep watching changes**

```
xt-build {-e|--env} dev {-w|--watch}
```

**Get help using this command**

```
xt-build --help
``` 

## Package.json scripts

After adding Extension CLI to your project, you can run these commands from a terminal using syntax `npx xt-build`. 
Or you can add an option to `packages.json` scripts section as shown below, and then execute the command as `npm run build` or `npm run start`.
 
```
"scripts":{
    "start": "xt-build -e dev -w",
    "build": "xt-build -e prod",
}
```

<br/>

## Build Configuration

By default the CLI will look for build configuration in two different
places:

- in `package.json` using key `xtbuild`

- in a file named `.xtbuild.json` in project root

If these two locations cause a conflict, alternatively you can provide a path to configuration file with `-c` or `--config` flag,
 followed by path to file. [See commands for an example](#commands).

The CLI uses a default build configuration file shown below. This tells the extension CLI where to look for files and where to output files. You can override any of these key-value pairs at project level. You can find more detailed explanations of usage of some of these keys [below](#custom-configurations).

```json
{
  "projectRootDir": "../../../",
  "dist": "./dist",
  "source": "./src",
  "releases": "./",
  "manifest": "./src/manifest.json",
  "js": "./src/**/*.js",
  "js_bundles": null,
  "html": "./src/**/*.html",
  "scss": "./src/**/*.scss",
  "scss_bundles": null,
  "icons":[
    images,
    images,
    images,
    images
  ],
  "copyAsIs": [],
  "locales_dir": "./assets/locales/",
  "locales_list": ["en"]
}
```

<br/>

## Custom Configurations

### Script Bundles

`js_bundles` key used to configure build settings for javascript bundles. You will need to configure
bundles when your compiled extension contains more than 1 javascript file. 

The expected value for `js_bundles` is an array with one or more items as shown in the example below.

- `name` is the output bundle filename without file extension
- `src` specifies which files to include in each bundle; you can use a string value for a single file,  array of files, or a path with wildcard. You may also use `!` as a way to negate the inclusion of a file. This is the [globs syntax expected by gulp](https://gulpjs.com/docs/en/api/src) (without options).


**Example**

Sample project-level configuration with multiple javascript bundles. 

This configuration will produce two javascript files in the `/dist` directory. 

- One file contains exactly `src/background.js` and 
- One file contains all `.js` files under `scr/app/dir1` and `scr/app/dir2`

```
  "xtbuild": {
    "js_bundles": [
      {
        "name": "background",
        "src": "./src/background.js"
      },
      {
        "name": "app",
        "src": [
            "./src/app/dir1/**/*.js",
            "./src/app/dir2/**/*.js"
         ]
      }
    ]
  }
```

### Skip Javascript Compilation and Linting

Use `copyAsIs` key to specify an array of files which should not be compiled. These files can be located anywhere in your project, but probably best to store them somewhere outside `/src` directory. The build command will copy specified files exactly without any modification to the root of the output directory. Directory path will be flattened.

**Example**

Sample configuration for skipping compilation of pre-compiled files.

This configuration will copy material theme directly from node modules and include it in the `dist` directory. It will also copy a project level `ga.js` script in the `dist` directory. No modification will occur to these files during the build step.  

```
  "xtbuild": {
    "copyAsIs": [
      "./node_modules/material-design-lite/material.min.js",
      "./assets/ga.js"
    ]
  }
```

Note that when you include precompiled javascript files to your extension project, you should also disable linting for those files.
In the project-level `package.json`, add the file paths to the list of ignored files
to prevent them from being linted.

```json
  {  
      "eslintIgnore": [
        "test/**/*",
        "./assets/ga.js"
      ]
  }
```

### Style bundles

`scss_bundles` are used to configure build settings for css-style files. The expected value is an array with one or more items as shown in the example below.

- The property value `name` is the output bundle filename with file extension
- `src` specifies which files to include in each bundle; you can use a string value for a single file,  array of files, or a path with wildcard. You may also use `!` as a way to negate the inclusion of a file. This is the [globs syntax expected by gulp](https://gulpjs.com/docs/en/api/src) (without options).

The production build will minify style files. Dev build does not minify style files.

By default, the stylesheets are assumed to be written using [Sass](https://sass-lang.com/guide). If you are not a friend of Sass language stylesheets, you can write your style sheets using regular CSS. Any CSS you write is valid Sass as well.
 
When you name stylesheet files, use `.scss` file extension. The default CLI configuration looks for this file extension. Otherwise you must override this default configuration: `"scss": "./src/**/*.scss"` to include other file extensions in the style bundles.

**Example**

Sample project-level configuration with multiple style bundles

```
  "xtbuild": {
    "scss_bundles": [
      {
        "src": [
          "./src/**/*.scss",
          "!./src/app/styles/message.scss"
        ],
        "name": "styles.css"
      },
      {
        "src": [
          "./src/app/styles/message.scss"
        ],
        "name": "display.css"
      }
    ]
  }
```

### Text Localization

If the extension supports multiple languages, specify all supported languages using key `locales_list`. The default language value is `["en"]`. 

This `locales_list` should be an array that corresponds to a list of subdirectories under `locales_dir` in the extension project. The default `locales_dir` is `./assets/locales/`, which you may change if you want.

Refer [to this list of language codes](https://developers.google.com/admin-sdk/directory/v1/languages) when naming individual language directories.

Also read this guide [to learn how to internationalize extensions](https://developer.chrome.com/extensions/i18n).

**Example** 

Multiple locales example with custom path to locales files

```
  "xtbuild": {
      "locales_dir": "./my/custom/locales/path/",
      "locales_list": ["en","en-GB","pl"]
  }
```

The configuration above translates to the following project-level directory structure: 

File Path | Description
--- | ---
└ **`/my/custom/locales/path/`** |  path to locales
&nbsp; &nbsp; &nbsp; &nbsp; └─ `en`/messages.json | Default English dictionary
&nbsp; &nbsp; &nbsp; &nbsp; └─ `en-GB`/myFile.json | British dictionary
&nbsp; &nbsp; &nbsp; &nbsp; └─ `pl/` | Polish language dictionaries
&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; └─ app.json | Polish language dictionaries
&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; └─ options.json | Polish language dictionaries


You can break down your locales files into multiple `.json` files within the language-specific directory as shown in the example above for `pl/`. This may make the maintenance locales files easier if the files contain multiple entries. The build step will automatically combine all files within a language directory into a single `messages.json` which is expected from a browser extensions.

### Image Assets

By default extension CLI will look for image assets using these configurations:

```
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
Therefore, in your extension project `manifest.json` you would refer to them as follows:

```
  "browser_action": {
    "default_icon": {
      "16": "icons/16x16.png",
      "24": "icons/24x24.png",
      "32": "icons/32x32.png"
    }
  }
```

