# Getting Started

Before you start, be aware that your project is expected to have a certain file structure.

You can override most of these paths when specifying build and documentation settings, but sticking to the
default organization will make your life easier so we highly recommend its usage.
 
Eventually we will [add a command](tutorial-xt-create) that will set up this structure automatically.

### Default Project Organization

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

Before using extension CLI, you should have all of the following:

- [Node.js](https://nodejs.org/en/download/)
- Any web-friendly IDE
- Terminal/cmd access
- Chrome browser for debugging extensions

### Installation

Install latest CLI version [from NPM](https://www.npmjs.com/package/extension-cli)

```
npm install extension-cli
```

### Basic Configuration

Update extension project `package.json` with following options:


<table class='config'>
<tr>
<td>
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
<td>
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
<td>
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
Define minimum configrations for documentations if you plan to use the documentation command.<br/>
<a href='tutorial-xt-docs.html'>Learn more here</a>
</td>
</tr>
<tr>
<td>
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

<style>
td pre{background:transparent;border:none;}
@media(max-width:850px){
.config tr, .config td{display:block;border-top:none!important;}
.config td, .config pre {white-space: pre-wrap; word-break: break-word;}
</style>

### Usage

[See tutorials](https://oss.mobilefirst.me/extension-cli/list_tutorial.html) for instructions on each command.

---

[Edit this file on Github](https://github.com/MobileFirstLLC/extension-cli/blob/master/tutorials/getting-started.md)
 
