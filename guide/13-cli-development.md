---
disqus: "False"
---

# Extension CLI Development

- This CLI is built with numerous tools listed below and written in JavaScript. 
- The source code is available on [Github](https://github.com/MobileFirstLLC/extension-cli).
- Releases are published on [NPM](https://www.npmjs.com/package/extension-cli).

## Tech Stack

Extension CLI is built with the following:

[Node.js][0]  [Gulp][1]  [Chalk][2]  [Commander][3]  [Babel][4]  [Chai][5] [Mocha][6]  [ESLint][7]  [jsdom][8]  [JSDoc][9]  [prompts][10]  [Sinon][11] [Sinon-chrome][16]  [NYC][12]  [Webpack][13] [CLI Spinner][14]  [yargs][15]   

This user guide is built with [MkDocs](https://www.mkdocs.org/) and  [MkDocs material theme](https://squidfunk.github.io/mkdocs-material/).

CI builds by [Travis CI](https://travis-ci.org/MobileFirstLLC/extension-cli) and documentation served by [Github Pages](https://pages.github.com/).

## Project Organization

Path | Description
--- | ---
└ **.github** | Github config files and markdown
└ **cli** |  all available commands are defined here
└ **config** | Resources and config files used by the commands in `cli`
└ **guide** | User guide
└ **test** | CLI unit tests
└ `/*` | Application root; various project config files

* * *

To setup a local dev environment and develop the CLI application, see
 
[Environment Setup &rarr;](13-dev-env.md)


[0]: https://nodejs.org/en/
[1]: https://gulpjs.com/
[2]: https://www.npmjs.com/package/chalk
[3]: https://www.npmjs.com/package/commander
[4]: https://babeljs.io/
[5]: https://www.chaijs.com/
[6]: https://mochajs.org/
[7]: https://eslint.org/
[8]: https://github.com/jsdom/jsdom
[9]: https://jsdoc.app/
[10]: https://www.npmjs.com/package/prompts
[11]: https://sinonjs.org/
[12]: https://www.npmjs.com/package/nyc
[13]: https://webpack.js.org/
[14]: https://www.npmjs.com/package/cli-spinner
[15]: https://www.npmjs.com/package/yargs
[16]: https://github.com/acvetkov/sinon-chrome
