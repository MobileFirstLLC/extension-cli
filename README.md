# [Extension CLI](https://github.com/MobileFirstLLC/extension-cli)

[![npm](https://img.shields.io/npm/v/extension-cli)](https://www.npmjs.com/package/extension-cli)
[![travis](https://img.shields.io/travis/mobilefirstllc/extension-cli)](https://travis-ci.org/MobileFirstLLC/extension-cli)
![david](https://img.shields.io/david/mobilefirstllc/extension-cli)
[![Maintainability](https://api.codeclimate.com/v1/badges/abbf1b25f926d75bb9df/maintainability)](https://codeclimate.com/github/MobileFirstLLC/extension-cli/maintainability)

> This application includes command-line build tools that facilitate rapid chrome extension development by providing
systematic way to build, test and document extension projects.


## Motivation

After developing multiple browser extension, it became clear that there were several steps in the development process that stayed the same between every project. 

Instead of setting up these tasks individually for each project, it made more sense to wrap everything in a utility tool that could be shared between projects. 

This approach helps with creating a common, consistent development approach between multiple projects, reduces time to get started, and makes it easier to update build tools and scripts across multiple projects as many npm packages inevitably need to be updated (frequently!).

<br/>

|  | CORE FEATURES |
| --- | :--- | 
| ➊ | Compiles and bundles javascript files (including [ES6 syntax](http://es6-features.org/) w/ babel and webpack) |
| ➋ | Compiles and bundles [SASS files](https://sass-lang.com/guide) |
| ➌ | Code linting using [ESLint](https://eslint.org/) |
| ➍ | Generates distributable `.zip` file for uploading to [Chrome Web Store](https://chrome.google.com/webstore/category/extensions) |
| ➎ | Generates code documentation using [JSDoc](https://jsdoc.app/about-getting-started.html) |     
| ➏ | Sets up a unit testing environment with [mocha](https://mochajs.org), [chai](https://www.chaijs.com/), [sinon-chrome](https://github.com/acvetkov/sinon-chrome), and [js-dom](https://github.com/rstacruz/jsdom-global) | 

<br/>

<img src='https://github-production-repository-image-32fea6.s3.amazonaws.com/228303750/377f2000-228e-11ea-9d8a-a77af7765cd5' alt='extension-cli' width="100%" /> 

<br/>

 
## Getting Started & Docs

Basic install:

```
npm install extension-cli
```

**[See here for more details!](https://mobilefirstllc.github.io/extension-cli/tutorial-getting-started.html)**

<br/>

## Quick Command Reference

[See tutorials](https://mobilefirstllc.github.io/extension-cli/list_tutorial.html) for more details on each command.

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

<br/>

## Issues and Feature Requests

[Submit on Github](https://github.com/MobileFirstLLC/extension-cli/issues/new/choose)

## Author

This is an [open source](https://github.com/MobileFirstLLC/extension-cli) project by [Mobile First](https://mobilefirst.me).

## License 

[MIT](https://github.com/MobileFirstLLC/extension-cli/blob/master/LICENSE)
