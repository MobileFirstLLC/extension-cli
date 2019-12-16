# Extension CLI 

![npm](https://img.shields.io/npm/v/extension-cli)

This is a command-line utility package that helps chrome extension development by providing
systematic way to build, test and document an extension project.


## Quickstart

Note that for each command `--help` or `--version` are also valid

Command | Description
--- | ---
`xt-build` | run builds; use `-e prod` for production build (minified) and `-e dev` for development build 
`xt-test` | Run unit tests
`xt-docs` | generate docs; generated using [jsdoc](https://jsdoc.app/index.html) syntax.
`xt-sync` | Update configuration files to current defaults supplied by this CLI
`xt-clean` | Removes automatically generated files; include --modules flag to remove node_modules

**Planned**

- [ ] `xt-init` -- create new project





---

### License 

MIT
