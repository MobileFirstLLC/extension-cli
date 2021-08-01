# Configuration for Existing Applications

!!! info
    **If you created the extension with Extension CLI, this setup is already done for you, and you may skip this step.**
 

Before using Extension CLI with an existing application, add these configuration options to project's `package.json`:

### Babel Presets

This is needed to compile projects written in modern JavaScript syntax.

```json
"babel": {
  "presets": [
    "@babel/preset-env"
  ]
}
```

### ESLint Ignore

Exclude test files from being linted. If your project includes compiled 3rd party libraries, you should exclude them also.

```json
"eslintIgnore": [
    "test/**/*"
]
```

### Add Scripts

Add these to `package.json` `scripts` section:

```json
"scripts": {
  "start": "xt-build -e dev -w",
  "build": "xt-build -e prod",
  "clean": "xt-clean",
  "docs": "xt-docs",
  "test": "xt-test",
  "coverage": "nyc --reporter=lcov npm run test"
}
```

