<img src='https://raw.githubusercontent.com/MobileFirstLLC/extension-cli/master/assets/img/128x128.png' alt='' width="40" /> 

# [Extension CLI](https://github.com/MobileFirstLLC/extension-cli)

[![npm](https://img.shields.io/npm/v/extension-cli)](https://www.npmjs.com/package/extension-cli)
[![travis](https://img.shields.io/travis/mobilefirstllc/extension-cli)](https://travis-ci.org/MobileFirstLLC/extension-cli)

> This application includes command-line build tools that facilitate rapid chrome extension development by providing
systematic way to build, test and document extension projects.


### Motivation

After developing multiple browser extension, it became clear that there were several steps in the development process that stayed the same between every project. Instead of setting up these tasks individually for each project, it made more sense to wrap everything in a utility tool that could be shared between projects. This approach helps with creating a common, consistent approach between multiple projects, reduces time to get started, and makes it easier to update build tools and scripts across multiple projects. However, this strategy of shared responsibility requires certain assumptions about [project structure](#file-organization) and how things are organized.


**This program provides following functionality:**

- Compiles and bundles javascript files (including [ES6 syntax](http://es6-features.org/) w/ babel and webpack)
- Compiles and bundles [SASS files](https://sass-lang.com/guide)
    - note: if you don't like using sass, just write basic css. Name your style files using extension `.scss`
- Lint scripts using [eslint](https://eslint.org/)    
- Generates a distributable `.zip` file for uploading to Chrome Web Store
- Generates code documentation using [JSdoc 3](https://jsdoc.app/about-getting-started.html)     
- Sets up a unit testing environment with mocha, chai (with promises), chrome-sinon, and js-dom.

---


## Command Reference

Note that for each command `--help` and `--version` flags are also valid

Command | Description
--- | ---
`xt-build` | Run builds; env flags: `-e prod` and `-e dev`
`xt-test` | Run unit tests
`xt-docs` | Generate docs
`xt-sync` | Update project config files to match the latest defaults supplied by this CLI
`xt-clean` | Remove automatically generated files

**Planned**

- [ ] `xt-create` -- create new extension project
- [ ] `xt-eject` -- remove CLi dependency

**Documentation**

[More detailed usage instructions for each command available here](https://mobilefirstllc.github.io/extension-cli/list_namespace.html).

---

## Getting Started

### File Organization

Note that before you start, your project needs to have an expected file structure. If you are migrating an existing project, this may require substantial effort and perhaps not worthwhile. When starting a new project, follow this described organization. Eventually we will add a command that will set this up automatically.

**The following project structure is expected:**

Path | Description
--- | ---
└ **assets** |  static assets
&nbsp; &nbsp; └─ `img` | Extension icons
&nbsp; &nbsp; └─ `locales` | Localized string resources
&nbsp; &nbsp; &nbsp; &nbsp; └─ `en`/`messages.json` | Basic en dictionary
└ **src** | Source code: js, scss, html, json files
&nbsp; &nbsp; └─ `manifest.json` | Extension manifest 
└ **test** | Unit tests
└ `package.json` | Application root

### Installation

**1. Install latest version** [from NPM](https://www.npmjs.com/package/extension-cli)

**2. Update `package.json`** with following options:

*Needed to compile projects written in ES6* 

```json
  "babel": {
    "presets": [
      "@babel/preset-env"
    ]
  }
```

*Add this so test files will not be linted*

If your project includes compiled 3rd party libs (not imported from npm but literally `.js` files, you should exclude them also).

```  
  "eslintIgnore": [
    "test/**/*"
  ]
```

*Basic options for generating docs using the default template*

```  
  "xtdocs": {
    "templates": {
      "systemName": "Extension name",
      "systemSummary": "Write a short description here!",
      "systemColor": "#000000"
    }
  }
```

*Define javacsript bundles to build*, where 
- `name` is the output filename without file extension and 
- `src` indicates which files to include in this bundle can be a single file path, an array or files, or use wildcard.

```
  "xtbuild": {
    "js_bundles": [
      {
        "name": "background-script",
        "src": "./src/bg/**/*.js"
      }, {
          "name": "content-script",
          "src": ["./src/ct/index.js", "./src/ct/helper.js"]
      }, {
         "name": "coptions",
         "src": "./src/options.js"
     }
    ]
  }
```

*Finally, add following scripts* 

After adding scripts, you can execute commands by running `npm run start`, `npm run docs`, etc.

```json
"scripts": {
    "start": "xt-build -e dev -w",
    "build": "xt-build -e prod",
    "clean": "xt-clean",
    "docs": "xt-docs",
    "test": "xt-test"
  }
```


### License 

MIT
