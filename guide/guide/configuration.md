# Configuration

Before you start using Extension CLI, you have to add some configuration options to your `package.json`.

If your project does not contain `package.json`, first run

```text
npm init
```

And follow the on-screen setup.

Then, update extension project `package.json` with following options:

### Babel Presets

Needed to compile projects written in ES6.

```text
  "babel": {
    "presets": [
      "@babel/preset-env"
    ]
  }
```

### ESLint Ignore

Exclude test files from being linted. If your project includes compiled 3rd party libraries, you should exclude them also.

```text
  "eslintIgnore": [
    "test/**/*"
  ]
```

### Add Scripts

Add these scripts to `package.json` then you can run, for example, `npm run start`.

```text
  "scripts": {
      "start": "xt-build -e dev -w",
      "build": "xt-build -e prod",
      "clean": "xt-clean",
      "docs": "xt-docs",
      "test": "xt-test"
    }
```

