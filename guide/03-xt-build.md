# xt-build

* * *

<p class='page-intro'><code>xt-build</code> command is used for generating a debuggable, development version of an extension project. It is also used to create a production-ready, minified .zip file that can be uploaded to an extension/add-on marketplace for distribution.</p>

* * *

Successful build command always generates an extension in build output directory that can be debugged in the browser.  The underlying build system uses gulp, babel and webpack to compile scripts (among other plugins).

### Dev Build Artifacts

When specifying`dev` build flag, the build will complete using development settings. Successful dev build generates extension source code in the specified build output directory (`dist/` by default), which can be debugged using a chromium browser.

### Prod Build Artifacts

When specifying `prod` build flag, the build will run a production build. Successful production build generates extension source code in build output directory (`dist/` by default), which can be debugged in the browser. It also generates a `release.zip` file in the project root. This zip file can be uploaded to extension/add-on marketplace such as Chrome Web Store or Firefox add-ons. When running a production build, all code files (js, css, HTML, json) will be optimized.

## Commands

Braces `{ }` indicate that the user must choose one (and only one) of the items inside the braces.


**Run build with default options**

Default is production build for chrome

```bash
xt-build
```

**Run production build using explicit environment flag `-e` or `--env`**

```bash
xt-build {-e|--env} dev
```

```bash
xt-build {-e|--env} prod
```

**Run build for specific target browser**

```bash
xt-build {-p|--platform} chrome 
```

```bash
xt-build {-p|--platform} firefox
```

**Run build using custom configuration file path**

```bash
xt-build {-c|--config} /path/to/config.json
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
to configuration file with `-c` or `--config` flag, followed by path to configuration file. 

The CLI uses a default build configuration shown below. This tells 
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
  "assets": [
    "./assets/**/*",
    "!./assets/locales",
    "!./assets/locales/**/*"
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
`"releases"` | Directory for outputting release zip file ||
`"release_name"` | name of release zip file ||
`"manifest"` | Extension manifest file with path ||
`"js"` | Javascript watch pattern during dev builds ||
`"js_bundles"` | Javascript bundles configuration | [Guide](03-xt-build-scripts.md)
`"html"` | location and watch pattern of HTML files ||
`"scss"` | Stylesheets watch pattern during dev builds ||
`"scss_bundles"` | Stylesheets bundles configuration | [Guide](03-xt-build-styles.md)
`"assets"` | Static assets configuration match pattern | [Guide](03-xt-build-assets.md) 
`"copyAsIs"` | Files and directories to copy without modification | [Guide](03-xt-build-copy.md)
`"locales_dir"` | Localizations directory | [Guide](03-xt-build-locales.md) 
`"locales_list"` | List of locales | [Guide](03-xt-build-locales.md)
`"commands"` | Custom commands | [Guide](03-xt-build-cmds.md)
`"commands_watch_path"` | Commands watch pattern during dev builds | [Guide](03-xt-build-cmds.md)
