---
disqus: "False"
---

# Extension CLI

<p class='page-intro'>is a command-line build tool for developing 
chromium browser extensions fast and in a standardized way. It provides a systematic way 
to organize, build, test and document extension projects.</p>

* * *

## Features

🖥️ &nbsp; **Javascript Bundling** 
<br/>&nbsp;&nbsp; &nbsp; &nbsp; Compiles, bundles and minifies javascript files (supports [ES6 syntax](http://es6-features.org/)) <br/>

🎨 &nbsp; **CSS Bundling**
<br/>&nbsp;&nbsp; &nbsp; &nbsp; Compiles, bundles, and minifies CSS and [SASS](https://sass-lang.com/guide) files <br/>

💄 &nbsp; **Linting**
<br/>&nbsp;&nbsp; &nbsp; &nbsp; lint JavaScript using [ESLint](https://eslint.org/) <br/>

📦 &nbsp; **ZIP Generation**
<br/>&nbsp;&nbsp; &nbsp; &nbsp; Generates a `.zip` file for uploading to extension marketplaces<br/>

📝 &nbsp; **Document Source Code**
<br/>&nbsp;&nbsp; &nbsp; &nbsp; Generates source code documentation using [JSDoc](https://jsdoc.app/about-getting-started.html) <br/>

⚗️ &nbsp; **Unit Testing** 
<br/>&nbsp;&nbsp; &nbsp; &nbsp; Sets up a unit testing environment with [mocha](https://mochajs.org), [chai](https://www.chaijs.com/), [sinon-chrome](https://github.com/acvetkov/sinon-chrome) and [js-dom](https://github.com/rstacruz/jsdom-global) <br/>

⚔️ &nbsp; **Cross-Browser Compatibility**
<br/>&nbsp;&nbsp; &nbsp; &nbsp; develop extensions for Chrome, Edge, Firefox or Opera. <br/>

* * *

## Getting Started

**Note:** Using this CLI assumes you have Node.js installed. If you do not, you can [install it here](https://nodejs.org/en/download/).

Create a new extension project:

```bash
npx extension-cli
```

Add CLI to an existing project:

```bash
npm install extension-cli
```

More detailed [getting started guide here &rarr;](https://oss.mobilefirst.me/extension-cli/01-getting-started/)

* * *

## Command Reference

Command | Description
--- | ---
**xt-build** | Run builds; env flags: `-e prod` and `-e dev`
**xt-test**| Run unit tests
**xt-docs**| Generate docs
**xt-clean** | Remove generated files
**xt-sync**| Update project config files to match the latest defaults supplied by this CLI

More detailed [command instructions and configuration options here &rarr;](https://oss.mobilefirst.me/extension-cli/03-xt-build/) 

---

<p align="center" style="margin-bottom:4em;">

Extension CLI is made by
<a href="https://github.com/MobileFirstLLC/extension-cli/graphs/contributors" target="_blank" rel="noreferrer noopener">open source contributors</a> 
behind several popular extensions!

<br/><br/> 
<a class="github-button" href="https://github.com/mobilefirstllc/extension-cli" data-icon="octicon-star" data-size="large" aria-label="Star mobilefirstllc/extension-cli on GitHub">Star</a> &nbsp; <a class="github-button" href="https://github.com/mobilefirstllc/extension-cli/fork" data-icon="octicon-repo-forked" data-size="large" aria-label="Fork mobilefirstllc/extension-cli on GitHub">Fork</a> &nbsp; <a class="github-button" href="https://github.com/mobilefirstllc/extension-cli/issues" data-icon="octicon-issue-opened" data-size="large" aria-label="Issue mobilefirstllc/extension-cli on GitHub">Issue</a> &nbsp; <a class="github-button" href="https://github.com/mobilefirstllc/extension-cli/subscription" data-icon="octicon-eye" data-size="large" aria-label="Watch mobilefirstllc/extension-cli on GitHub">Watch</a>
</p>
