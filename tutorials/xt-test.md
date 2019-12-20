# xt-test


> `xt-test` command will run unit tests located in `test/` directory.


This command will setup extension testing environment that is pre-initialized
with [mocha](https://mochajs.org/), [chai](https://www.chaijs.com/) (including chai-as-promised),
and expect. [nyc](https://www.npmjs.com/package/nyc) is used for computing code coverage.

Also the following browser API's are initialized: window, chrome. Window
is setup using [jsdom-global](https://www.npmjs.com/package/jsdom-global) and
chrome using [sinon-chrome](https://www.npmjs.com/package/sinon-chrome).

This command will look for tests in `test/` directory, in any file ending with `.js`.

Mocha will execute with babel, meaning you can use this test environment to
test ES6 modules with imports, arrows, and classes.

You may extend this test environment with a single project; this is simply the base setup
for running unit tests. Or you may create your own test environment if this is not suitable.

## Commands

Default command: run unit tests

```
xt-test
```

Execute tests and keep watching changes

```
xt-test --watch
```

Execute tests and pipe result to [coveralls.io](https://coveralls.io)

```
xt-test --coverage
```

Get help using this command

```
xt-test --help
``` 


After installing extension-cli, you can run these commands from a terminal using syntax `npx xt-test`.
 
Or you can add an option to `packages.json` scripts section (see example below) and then execute the command as `npm run test`.
 
```
"scripts":{
  "test": "xt-test"
}
```


## Source

[View latest source for this command here](/xt-test.js.html)

---

[Edit this file on Github](https://github.com/MobileFirstLLC/extension-cli/blob/master/tutorials/xt-test.md)
 
