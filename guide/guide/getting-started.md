# Getting Started

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

### Default Project Organization

Before you start using the CLI, inspect your project file structure. You can override most of 
these paths when specifying build and documentation settings, but if you are starting a new project, this organization
 matches the CLI defaults:

Path | Description
--- | ---
└ **assets** |  static assets
&nbsp; &nbsp; └─ img | Extension icons
&nbsp; &nbsp; └─ locales | Localized string resources
&nbsp; &nbsp; &nbsp; &nbsp; └─ en/messages.json | English dictionary
└ **src** | Source code: put js, scss, html, json files here
&nbsp; &nbsp; └─ manifest.json | Extension manifest 
└ **test** | Unit tests
└ package.json | Application root

<br/>
