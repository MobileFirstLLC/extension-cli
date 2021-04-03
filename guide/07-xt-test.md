# xt-test


* * *

<p class='page-intro'><code>xt-test</code> command will run unit tests</p>

* * *

This command will setup extension testing environment that is pre-initialized
with [mocha](https://mochajs.org/), [chai](https://www.chaijs.com/) (including chai-as-promised),
and expect. [nyc](https://www.npmjs.com/package/nyc) is used for computing code coverage. 
Also the following browser features are initialized: window, chrome. Window
is setup using [jsdom-global](https://www.npmjs.com/package/jsdom-global) and
chrome using [sinon-chrome](https://www.npmjs.com/package/sinon-chrome).

By default this command will look for tests in `test/` directory, in any file ending with `.js`, but you can change this default value.

Mocha will execute with babel, meaning you can use this test environment with ES6 modules.

You may extend this test environment within an extension project; this is simply the base setup
for running unit tests. Or you may create your own test environment if this is not suitable.

## Commands

Braces `{ }` indicate that the user must choose one — and only one — of the items inside the braces.


**Run unit tests (default)**

```bash
xt-test
```

**Configure custom test directory path or match pattern**

Defaults to `./test/**/*.js` if not specified

```bash
xt-test {-p|--pattern}
```

**Execute tests and keep watching changes**

```bash
xt-test {-w|--watch}
```

**Execute tests then pipe result to [coveralls.io](https://coveralls.io)**

The default command will display coverage. Use this command explicitly to publish your coverage stats and track progress over time, for example during automated build.

```bash
xt-test {-c|--coverage}
```

**Get help using this command**

```bash
xt-test --help
``` 

## Package.json scripts

After installing extension-cli, you can run these commands from a terminal using syntax `npx xt-test`.
 
Or you can add an option to `packages.json` scripts section and then execute the command as `npm run test`. 
See example below.
 
```json
"scripts":{
  "test": "xt-test"
}
```


