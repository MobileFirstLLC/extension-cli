# Installation

### Prerequisites

Before using extension CLI, you must have the following:

- [Node.js](https://nodejs.org/en/download/)
- JavaScript IDE
- Terminal access
- Browser for debugging extensions

### Setup

Create a new extension project:

```bash
npx extension-cli
```

Add CLI to an existing project:

```bash
npm install extension-cli
```

### Default Project Organization

Before you start using the CLI, inspect your project file structure. You can override most of 
these paths in configurations, but this organization matches the CLI defaults.

If you created a new extension using the command above, your file structure already looks like this.

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

