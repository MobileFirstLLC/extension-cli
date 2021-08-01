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

Extension CLI is built with the following dependencies:

| # | Package name | Purpose |
| --- | --- | --- | 
| 1. | `@babel/preset-env` | for modern JavaScript syntax |
| 2. | `@babel/register` | for unit testing |
| 3. | `chai` | BDD/TDD assertion library for unit testing |
| 4. | `chalk` | Add color to terminal output | 
| 5. | `cli-spinner` | Terminal spinner to indicated progress |
| 6. | `commander` | handle CLI input arguments |
| 7. | `del` | for clearing generated files |
| 8. | `eslint` | for linting JavaScript |
| 9. | `gulp` | for running build script |
| 10. | `gulp-change` | JSON file content manipulations |
| 11. | `gulp-clean-css` | Minify CSS |
| 12. | `gulp-concat` | Concatenates files (used for CSS) |
| 13. | `gulp-htmlmin` | Removes whitespace from HTML |
| 14. | `gulp-jsonminify` | minify JSON files (manifest, locales) |
| 15. | `gulp-load-plugins` | to load various gulp plugins |
| 16. | `gulp-merge-json` | merge locales files |
| 17. | `gulp-rename` | rename files during builds |
| 18. | `gulp-sass` | process SASS files during builds |
| 19. | `gulp-zip` | generate zip files |
| 20. | `jsdoc` | generate docs |
| 21. | `jsdom` | mock DOM in Node.js env |
| 22. | `jsdom-global` | adds window, document to unit testing env |
| 23. | `mocha` | unit testing framework |
| 24. | `nyc` | unit testing code coverage tool  |
| 25. | `prompts` | create CLI prompts with interactive selectors |
| 26. | `sass` | compile SASS files during builds |
| 27. | `sinon` | JavaScript test spies, stubs and mocks |
| 28. | `sinon-chrome` | unit testing for extensions |
| 29. | `webpack-stream` | build javascript files |
| 30. | `yargs` | parse keyword args |
