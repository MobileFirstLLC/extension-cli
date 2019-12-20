# Getting Started

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

You can override most of these file paths when specifying build and documentation settings.
This structure is the default organization and its usage will make your life easier.

### Prerequisites

Before using this program, you should have all of the following installed:

- [Node.js](https://nodejs.org/en/download/)
- Any web-friendly IDE
- Terminal/cmd access
- Chrome browser for debugging extensions

### Installation & Basic Configuration

#### 1. Install latest CLI version [from NPM](https://www.npmjs.com/package/extension-cli)

```
npm install extension-cli
```

#### 2. Update extension project `package.json`

with following options:

<table width="100%" cellpadding="0" cellspacing="0">
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
Exclude test files from being linted. If your project includes compiled 3rd party libraries, you should exclude them also.
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
<strong>Build Config</strong><br/><br/>
Define javacsript bundles to build, where<br/>
- <code>name</code> is the output filename without file extension and<br/>
- <code>src</code> indicates which files to include in each bundle; can be a single file path, an array or files, or wildcard path. See examples on left.
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






---

[Edit this file on Github](https://github.com/MobileFirstLLC/extension-cli/blob/master/tutorials/getting-started.md)
 
