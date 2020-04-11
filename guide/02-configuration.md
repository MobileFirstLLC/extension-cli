# Configuration for Existing Applications

**If you created the extension with Extension CLI, this setup is already done for you, and you may skip this step.**

For an existing application, before using Extension CLI, add these configuration options to `package.json`:

### Babel Presets

This is needed to compile projects written in ES6.

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

