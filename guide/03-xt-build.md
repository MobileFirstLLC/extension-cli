# xt-build

* * *

<p class='page-intro'><code>xt-build</code> command is used for generating a debuggable, development version of an extension project. It is also used to create a production-ready, minified .zip file that can be uploaded to the extension marketplace for distribution.</p>

* * *

Successful build command always generates an extension `dist/` directory that can be debugged in the browser.  The underlying build system
uses [gulp](https://github.com/gulpjs/gulp), [babel](https://github.com/babel/gulp-babel) and [webpack](https://github.com/webpack/webpack) to compile scripts (among other plugins).

### Dev Build Artifacts

When specifying`dev` build flag, the build will complete using development settings. The output of a successful dev build is  a `dist/` directory which can be debugged using the chrome browser. The build command will always compile scripts using production settings, because extension scripts must be compiled prior to debugging (`eval` is not allowed).

### Prod Build Artifacts

When specifying `prod` build flag, the build will run a production build. Successful production build will generate a `dist/` directory of extension files which can be debugged in the browser. It will also generate a `release.zip` file in the project root strictly based on the files in the `dist` directory. This zip file can be uploaded directly to extension/add-on marketplace such as Chrome Web Store or Firefox add-ons. When running a production build, all code files (js, sass, html, json) will be minified.

## Commands

Braces `{ }` indicate that the user must choose one — and only one — of the items inside the braces.


**Run production build (default)**

```bash
xt-build
```

**Run production build using explicit flag `-e` or `--env`**

```bash
xt-build {-e|--env} prod
```

**Run development build**

```bash
xt-build {-e|--env} dev
```

**Run command using custom configuration file path**

```bash
xt-build {-c|--config} "/path/to/config.json"
```

**Run development build and keep watching changes**

```bash
xt-build {-e|--env} dev {-w|--watch}
```

**Get help using this command**

```bash
xt-build --help
``` 

## Package.json scripts

After adding Extension CLI to your project, you can run these commands from a terminal using syntax `npx xt-build`. 
Or you can add an option to `packages.json` scripts section as shown below, and then execute the command as `npm run build` or `npm run start`.
 
```json
"scripts":{
    "start": "xt-build -e dev -w",
    "build": "xt-build -e prod",
}
```

## Default Configuration

By default the CLI will look for build configuration in two different
places:

- in `package.json` using key `xtbuild`

- in a file named `.xtbuild.json` in project root

If these two locations cause a conflict, alternatively you can provide a path 
to configuration file with `-c` or `--config` flag, followed by path to file. 
[See commands for an example of how to configure this behavior](#commands).

The CLI uses a default build configuration file shown below. This tells 
extension CLI where to look for input files, how to process them, and where 
to output files. You can override any of these key-value pairs at project level. 

Explanations for each of these keys is given below.

```json
{
  "projectRootDir": "../../../",
  "dist": "./dist",
  "source": "./src",
  "releases": "./",
  "release_name": "release",
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
  "locales_list": [
    "en"
  ],
  "commands": "",
  "commands_watch_path": null
}
```

### Configuration Keys

Key | Description | Guide 
--- | --- | ---
`"projectRootDir"` | Path to project from the to CLI location ||
`"dist"` | Build output directory ||
`"source"` | Source code directory ||
`"releases"` | Directory for outputting releases ||
`"release_name"` | name of release zip file ||
`"manifest"` | Extension manifest file with path ||
`"js"` | Javascript watch pattern during dev builds ||
`"js_bundles"` | Javascript bundles configuration | [Guide](03-xt-build-scripts.md)
`"html"` | location and watch pattern of HTML files ||
`"scss"` | Stylesheets watch pattern during dev builds ||
`"scss_bundles"` | Stylesheets bundles configuration | [Guide](03-xt-build-styles.md)
`"icons"` | Image assets configuration | [Guide](03-xt-build-images.md) 
`"copyAsIs"` | File and directories to copy without modification | [Guide](03-xt-build-copy.md)
`"locales_dir"` | Localizations directory | [Guide](03-xt-build-locales.md) 
`"locales_list"` | List of locales | [Guide](03-xt-build-locales.md)
`"commands"` | Custom commands | [Guide](03-xt-build-cmds.md)
`"commands_watch_path"` | Commands watch pattern during dev builds | [Guide](03-xt-build-cmds.md)
