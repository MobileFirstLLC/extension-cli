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
<strong>Documentation Config</strong><br/><br/>
Define minimum configrations for documentations if you plan to use the documentation command.
[Learn more here](tutorial-xt-docs.html)
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
 
