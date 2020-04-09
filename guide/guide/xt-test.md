# xt-test


* * *

<p style='font-size:1.3em;line-height:1.7;'><code>xt-test</code> command will run unit tests located in <code>test/</code> directory.</p>

* * *

This command will setup extension testing environment that is pre-initialized
with [mocha](https://mochajs.org/), [chai](https://www.chaijs.com/) (including chai-as-promised),
and expect. [nyc](https://www.npmjs.com/package/nyc) is used for computing code coverage. 
Also the following browser features are initialized: window, chrome. Window
is setup using [jsdom-global](https://www.npmjs.com/package/jsdom-global) and
chrome using [sinon-chrome](https://www.npmjs.com/package/sinon-chrome).

This command will look for tests in `test/` directory, in any file ending with `.js`.

Mocha will execute with babel, meaning you can use this test environment with ES6 modules.

You may extend this test environment within an extension project; this is simply the base setup
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
 
Or you can add an option to `packages.json` scripts section and then execute the command as `npm run test`. 
See example below.
 
```
"scripts":{
  "test": "xt-test"
}
```


