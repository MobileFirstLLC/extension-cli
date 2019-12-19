# [Extension CLI](https://github.com/MobileFirstLLC/extension-cli)

[![npm](https://img.shields.io/npm/v/extension-cli)](https://www.npmjs.com/package/extension-cli)
[![travis](https://img.shields.io/travis/mobilefirstllc/extension-cli)](https://travis-ci.org/MobileFirstLLC/extension-cli)

> This application includes command-line build tools that facilitate rapid chrome extension development by providing
systematic way to build, test and document extension projects.


## Motivation

After developing multiple browser extension, it became clear that there were several steps in the development process that stayed the same between every project. 

Instead of setting up these tasks individually for each project, it made more sense to wrap everything in a utility tool that could be shared between projects. 

This approach helps with creating a common, consistent development approach between multiple projects, reduces time to get started, and makes it easier to update build tools and scripts across multiple projects as many npm packages inevitably need to be updated (frequently!).

<br/>

| # | CORE FEATURES |
| --- | :--- | 
| ➊ | Compiles and bundles javascript files (including [ES6 syntax](http://es6-features.org/) w/ babel and webpack) |
| ➋ | Compiles and bundles [SASS files](https://sass-lang.com/guide) |
| ➌ | Code linting scripts using [ESLint](https://eslint.org/) |
| ➍ | Generates distributable `.zip` file for uploading to [Chrome Web Store](https://chrome.google.com/webstore/category/extensions) |
| ➎ | Generates code documentation using [JSDoc](https://jsdoc.app/about-getting-started.html) |     
| ➏ | Sets up a unit testing environment with [mocha](https://mochajs.org), [chai](https://www.chaijs.com/), [sinon-chrome](https://github.com/acvetkov/sinon-chrome), and [js-dom](https://github.com/rstacruz/jsdom-global) | 

<br/>

<img src='https://raw.githubusercontent.com/MobileFirstLLC/extension-cli/master/img.jpg' alt='extension-cli' /> 


## Command Reference


Command | Description
--- | ---
`xt-build` | Run builds; env flags: `-e prod` and `-e dev`
`xt-test` | Run unit tests
`xt-docs` | Generate docs
`xt-sync` | Update project config files to match the latest defaults supplied by this CLI
`xt-clean` | Remove automatically generated files

Note that for each command `--help` and `--version` flags are also valid

**Planned**

- [ ] `xt-create` -- create new extension project
- [ ] `xt-eject` -- remove CLI dependency

**Documentation**

[More detailed usage instructions for each command are available here](https://mobilefirstllc.github.io/extension-cli/list_namespace.html).

---

## Getting Started

Before you start, be aware that your project needs to have an expected file structure. If you are migrating an existing project, this may require substantial effort and perhaps not worthwhile. When starting a new project, follow the provided organization. Eventually we will add a command that will set this up automatically.

### File Organization

The following project structure is expected:

Path | Description
--- | ---
└ **`assets`** |  static assets
&nbsp; &nbsp; └─ `img` | Extension icons
&nbsp; &nbsp; └─ `locales` | Localized string resources
&nbsp; &nbsp; &nbsp; &nbsp; └─ `en`/`messages.json` | English dictionary
└ **`src`** | Source code: put js, scss, html, json files here
&nbsp; &nbsp; └─ `manifest.json` | Extension manifest 
└ **`test`** | Unit tests
└ `package.json` | Application root

### Prerequisites

Before using this program, you should have all of the following installed:

- [NodeJs](https://nodejs.org/en/download/)
- Any web-friendly IDE
- Terminal/cmd
- Chrome browser for debugging extension

### Installation & basic configuration

**1. Install latest version** [from NPM](https://www.npmjs.com/package/extension-cli)

**2. Update `package.json`** with following options:


<table>
<tr>
<td style="padding:0">
<pre>
  "babel": {
    "presets": [
      "@babel/preset-env"
    ]
  }
</pre>
</td>
<td valign='top'>
<strong>Babel presets</strong><br/><br/>
Needed to compile projects written in ES6.
</td>
</tr>
<tr>
<td style="padding:0">
<pre>
  "eslintIgnore": [
    "test/**/*"
  ]
</pre>
</td>
<td valign='top'>
<strong>ESLint ignore</strong><br/><br/>
Add this so test files will not be linted.If your project includes compiled 3rd party libs (not imported from npm but literally `.js` files, you should exclude them also).
</td>
</tr>
<tr>
<td style="padding:0">
<pre>
  "xtdocs": {
    "templates": {
      "systemName": "Extension name",
      "systemSummary": 
        "Write a short description here!",
      "systemColor": "#000000"
    }
  }
</pre>
</td>
<td valign='top'>
<strong>Documentation Config</strong><br/><br/>
Basic options for generating docs using the default template
</td>
</tr>
<tr>
<td style="padding:0">
<pre>
  "xtbuild": {
    "js_bundles": [
      {
        "name": "background-script",
        "src": "./src/bg/**/*.js"
      }, {
          "name": "content-script",
          "src": [
            "./src/ct/index.js", 
            "./src/ct/helper.js"
          ]
      }, {
         "name": "coptions",
         "src": "./src/options.js"
     }
    ]
  }
</pre>
</td>
<td valign='top'>
<strong>Build Config</strong><br/><br/>
Define javacsript bundles to build, where<br/>
- <code>name</code> is the output filename without file extension and<br/>
- <code>src</code> indicates which files to include in this bundle can be a single file path, an array or files, or use wildcard.
</td>
</tr>
<tr>
<td style="padding:0">
<pre>
  "scripts": {
      "start": "xt-build -e dev -w",
      "build": "xt-build -e prod",
      "clean": "xt-clean",
      "docs": "xt-docs",
      "test": "xt-test"
    }
</pre>
</td>
<td valign='top'>
<strong>Finally, add following scripts</strong><br/><br/>
After adding scripts, you can execute commands by running 
<code>npm run start</code>, <code>npm run docs</code>, etc.</td>
</tr>
</table>



### License 

MIT
