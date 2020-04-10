# Getting Started

### Prerequisites

Before using extension CLI, you should have all of the following:

- [Node.js](https://nodejs.org/en/download/)
- Any web-friendly IDE
- Terminal/cmd access
- Chrome browser for debugging extensions

### Setup

Create a new extension project:

```text
npx extension-cli
```

Add CLI to an existing project:

```
npm install extension-cli
```

### Default Project Organization

Before you start using the CLI, inspect your project file structure. You can override most of 
these paths when specifying build and documentation settings, but this organization matches the CLI defaults.

If you created an extension using the command above, your file structure will look like this.

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
