# xt-build


> `xt-build` command is used for generating a debuggable dev version of and extension, and a production ready, minified .zip file
that can be uploaded to the chrome store.


Successful build command always generates an extension `dist/` directory that can be debugged in the browser.  The underlying build system
uses [gulp](https://github.com/gulpjs/gulp), [babel](https://github.com/babel/gulp-babel) and [webpack](https://github.com/webpack/webpack) to compile scripts (among other plugins).

### Dev Build Artifacts

When you specify `dev` build flag, the build will complete using development settings. The output of a successful dev
build is  a `dist/` directory which can be debugged using the chrome browser. The build command will always compile scripts using production settings, because extension scripts must be compiled prior to debugging.

### Prod Build Artifacts

When specifying `prod` build flag (of not specifying any flag at all) will run a production build. Successful production build
will generate a `dist/` directory of extension files which can be debugged in the browser. It will also generate a 
`release.zip` file in the project root strictly based on the files in the `dist` directory. 
This zip file can be uploaded directly to the Chrome Web Store. When running a production build, all code files (js, sass, html, json) will be minified automatically.

## Commands

Default command: run production build

```
xt-build
```

Run production build using explicit flag

```
xt-build -e prod
```

Run development build

```
xt-build -e dev
```

Command using custom configuration file path

```
xt-build --config "/path/to/config.json"
```

Run development build and keep watching changes

```
xt-build -e dev --watch
```

Get help using this command

```
xt-build --help
``` 


After installing extension-cli, you can run these commands from a terminal using syntax `npx xt-build`.
 
Or you can add an option to `packages.json` scripts section (see example below) and then execute the command as `npm run build` or `npm run start`.
 
```
"scripts":{
    "start": "xt-build -e dev -w",
    "build": "xt-build -e prod",
}
```

## Configuration

By default the CLI will look for build configuration in two different
places:
- in `package.json` using key `xtbuild`
- in a file named `.xtbuild.json` in project root

If these two locations cause a conflict, alternatively you can provide a path to configuration file with `--config` (`-c`) flag,
 followed by path to file. [See commands for an example](#commands).

<br/>

### Default Configuration

The CLI uses a build configuration file shown below. You can override any of these key-value pairs at project level.  

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
  "icons": [
    "./assets/img/**/*.png",
    "./assets/img/**/*.gif",
    "./assets/img/**/*.jpg",
    "./assets/img/**/*.svg"
  ],
  "copyAsIs": [],
  "locales_dir": "./assets/locales/",
  "locales_list": ["en"]
}
```

### Customizing Build Configurations

#### Script and Style bundles

`js_bundles` and `scss_bundles` are used to configure build settings for js files and scss files respectively.
The expected value is an array with one or more items as shown in the example below.

The property value `name` is the output bundle filename without file extension.

Property value `src` specifies which files to include in each bundle; you can use a string value for a single file, 
array of files, or a path with wildcard. You may also use `!` as a way to negate the inclusion of a file. This
syntax is directly expected by gulp. See example below.

*sample project-level configuration with js and style bundles*

```
  "xtbuild": {
    "js_bundles": [
      {
        "name": "background",
        "src": "./src/background.js"
      },
      {
        "name": "inbox",
        "src": "./src/app/inbox/**/*.js"
      },
      {
        "name": "message",
        "src": "./src/app/message/**/*.js"
      }
    ],
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

#### CSS Support

If you are not a friend of SASS stylesheets, you can write your style sheets using regular CSS.
However name your files using `.scss` file extension, or override the default configuration, since the 
CLI will, by default, look only for `.scss` style files.

#### Skip compiling

Use `copyAsIs` key to specify which files should not be compiled. These files can be located anywhere in your
project. The build will copy them literally without any modification to the output directory root. Any path will
be flattened.

*Example of skipping compilation of pre-compiled files*

```
  "xtbuild": {
    "copyAsIs": [
      "./node_modules/material-design-lite/material.min.js",
      "./assets/ga.js"
    ]
  }
```


#### Supporting multiple and/or non-English languages

Browser extensions can support multiple languages. If the extension supports multiple languages, specify all
supported languages using key `locales_list`. The default language value is `["en"]`. This entry should be an array. 

This configuration assumes that under specified `locales_dir` exists a subdirectory named `en`. The default
`locales_dir` is `./assets/locales/`, which you may change if you want.

You can break down your locales files into multiple json files within the language-specific directory
which may make the maintenance a bit easier if your files contain multiple entries. The build step will combine 
all files within a language directory into a single `messages.json` which is expected by the browser.

Refer, for example, [to this list for a full list of language codes](https://developers.google.com/admin-sdk/directory/v1/languages).

**Multiple locales example**

```
  "xtbuild": {
      "locales_dir": "./my/custom/locales/path/",
      "locales_list": ["en","en-GB","pl"]
  }
```

Given the configuration above, the following project-level files are expected. Within a directory you can have
any number of json files and the filenames can be anything; they will be bundled during build.

File Path | Description
--- | ---
└ **`/my/custom/locales/path/`** |  path to locales
&nbsp; &nbsp; &nbsp; &nbsp; └─ `en`/`messages.json` | Default English dictionary
&nbsp; &nbsp; &nbsp; &nbsp; └─ `en-GB`/`messages.json` | British dictionary
&nbsp; &nbsp; &nbsp; &nbsp; └─ `pl/` | Polish language dictionaries
&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; └─ `app.json` | Polish language dictionaries
&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; └─ `options.json` | Polish language dictionaries


## Source

[View latest source for this command here](/xt-build.js.html)

---

[Edit this file on Github](https://github.com/MobileFirstLLC/extension-cli/blob/master/tutorials/xt-build.md)
 
