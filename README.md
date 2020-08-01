<img src="https://raw.githubusercontent.com/MobileFirstLLC/extension-cli/master/guide/assets/images/favicon.png" width="64" alt="Extension CLI">  

# Extension CLI

[![npm](https://img.shields.io/npm/v/extension-cli)](https://www.npmjs.com/package/extension-cli)
[![travis](https://img.shields.io/travis/mobilefirstllc/extension-cli)](https://travis-ci.org/MobileFirstLLC/extension-cli)
[![david](https://img.shields.io/david/mobilefirstllc/extension-cli)](https://david-dm.org/mobilefirstllc/extension-cli)
[![Maintainability](https://api.codeclimate.com/v1/badges/abbf1b25f926d75bb9df/maintainability)](https://codeclimate.com/github/MobileFirstLLC/extension-cli/maintainability)
![Commit activity](https://img.shields.io/github/commit-activity/m/mobilefirstllc/extension-cli)
![Last commit](https://img.shields.io/github/last-commit/mobilefirstllc/extension-cli)


**Extension CLI is a command-line application that facilitates rapid chrome extension development by providing
a systematic way to build, test and document extension projects. It handles the project setup to let you focus 
on the extension you are creating.**

* * *

![feature image](https://github-production-repository-image-32fea6.s3.amazonaws.com/228303750/377f2000-228e-11ea-9d8a-a77af7765cd5)

## Features

-   **Javascript Bundling** — Compiles, bundles and minifies javascript files (supports [ES6 syntax](http://es6-features.org/))                                                                                                           

-   **CSS Bundling** — Compiles, bundles, and minifies CSS and [SASS files](https://sass-lang.com/guide)                                                                                                                                                          

-   **Linting** — Code linting using [ESLint](https://eslint.org/)                                                                                                                                                                        

-   **.zip Generation** — Generates a `.zip` file for uploading to [Chrome Web Store](https://chrome.google.com/webstore/category/extensions), [Edge Add-On Marketplace](https://microsoftedge.microsoft.com/addons/Microsoft-Edge-Extensions-Home), and other compatible marketplaces.                                                                                       

-   **Source Code Docs** — Generates code documentation using [JSDoc](https://jsdoc.app/about-getting-started.html)                                                                                                                                

-   **Unit Testing** —  Sets up a unit testing environment with [mocha](https://mochajs.org), [chai](https://www.chaijs.com/), [sinon-chrome](https://github.com/acvetkov/sinon-chrome), and [js-dom](https://github.com/rstacruz/jsdom-global) 

## Motivation

After developing multiple browser extensions, it became clear that there were several steps in the development process that stayed the same between every project. 

Instead of setting up these tasks individually for each project, it made more sense to combine everything in a utility tool that could be shared between projects. 

This approach helps with creating a common, consistent development approach between multiple projects, reduces time to get started, and makes it easier to update build tools and scripts across multiple projects as many npm packages inevitably need to be updated (frequently!).

## Getting Started & Docs

##### Create new extension project

```text
npx extension-cli
```

##### Add to an existing project

```text
npm install extension-cli
```

### Commands Reference

Command | Description
--- | ---
**xt-build** | Run builds; env flags: `-e prod` and `-e dev`
**xt-test**| Run unit tests
**xt-docs**| Generate docs
**xt-sync**| Update project config files to match the latest defaults supplied by this CLI
**xt-clean** | Remove automatically generated files

### Read the Docs!

**[View Complete User Guide →](https://oss.mobilefirst.me/extension-cli/)**

### CLI Developer Guide

If you are interested in extending this project or forking **[see this guide &rarr;](https://oss.mobilefirst.me/extension-cli/13-cli-development/)**

* * *

**Issues & Feature Requests:** [Submit on Github](https://github.com/MobileFirstLLC/extension-cli/issues/new/choose)

**Maker:** [Mobile First](https://mobilefirst.me)

**License:** [MIT](https://github.com/MobileFirstLLC/extension-cli/blob/master/LICENSE)
