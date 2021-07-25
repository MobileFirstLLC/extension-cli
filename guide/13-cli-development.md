---
disqus: "False"
---

# Extension CLI Development

- This CLI is built with Node.Js, written in JavaScript, and uses numerous packages listed below. 
- The source code is available on [Github](https://github.com/MobileFirstLLC/extension-cli).
- Releases are published on [NPM](https://www.npmjs.com/package/extension-cli).
- This user guide is built with [MkDocs](https://www.mkdocs.org/) and  [MkDocs material theme](https://squidfunk.github.io/mkdocs-material/).
- CI/CD by [Travis CI](https://travis-ci.org/MobileFirstLLC/extension-cli) and documentation served by [Github Pages](https://pages.github.com/).


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

* * * 

## Dependencies

Extension CLI is built with the following:

| Package name | Purpose |
| --- | --- | 
| <strike>@babel/core</strike> | _to be removed_ |
| <strike>`chai-as-promised`</strike> | _to be removed_ |
| <strike>`coveralls`</strike>  |  _to be removed_ |
| <strike>`globby`</strike> | _to be removed_ |
| <strike>`gulp-if`</strike> | _to be removed_ |
| <strike>`gulp-uglify`</strike> | _to be removed_ |
| <strike>`gulp-json-editor`</strike> | _to be removed_ (duplicate of gulp-change) |
| `@babel/preset-env` | to compile projects using ES6/ES2021 |
| `@babel/register` | for unit testing |
| `chai` | BDD/TDD assertion library for unit testing |
| `chalk` | Add color to terminal output | 
| `cli-spinner` | Terminal spinner to indicated progress with slower commands |
| `commander` | handle CLI input arguments |
| `del` | for clearing generated files |
| `eslint` | JavaScript linting |
| `gulp` | for running build script |
| `gulp-change` | file content manipulations (manifest key switching) |
| `gulp-clean-css` | Minify CSS |
| `gulp-concat` | Concatenates files (used for CSS) |
| `gulp-htmlmin` | Removes whitespace from HTML |
| `gulp-jsonminify` | minify JSON files (manifest, locales) |
| `gulp-load-plugins` | to load plugins |
| `gulp-merge-json` | merge locales files |
| `gulp-rename` | rename filename |
| `gulp-sass` | process SASS files during builds |
| `gulp-zip` | make zip files |
| `jsdoc` | generate docs |
| `jsdom` | mock dom during unit testing |
| `jsdom-global` | add DOM to Node.js env |
| `mocha` | unit testing framework |
| `nyc` | unit testing code coverage tool  |
| `prompts` | create CLI prompts with interactive selectors etc. |
| `sass` | compile SASS files during builds |
| `sinon` | JavaScript test spies, stubs and mocks |
| `sinon-chrome` | unit testing for chrome extensions |
| `webpack-stream` | build javascript files |
| `yargs` | parse keyword args (build, tests) |
