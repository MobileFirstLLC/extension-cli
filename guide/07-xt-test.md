# xt-test


* * *

<p class='page-intro'><code>xt-test</code> command runs unit tests.</p>

* * *

This command will setup extension testing environment that is pre-initialized
with [mocha](https://mochajs.org/), [chai](https://www.chaijs.com/),
and expect. [nyc](https://www.npmjs.com/package/nyc) is used for computing code coverage. 
The following browser features are initialized for convenience: `window`, `chrome`, `document`. 
Window is setup using [jsdom-global](https://www.npmjs.com/package/jsdom-global) and
chrome using [sinon-chrome](https://www.npmjs.com/package/sinon-chrome).

By default this command looks for unit tests in `test/` directory, in any file ending with `.js`. 
Mocha will execute with babel, meaning you can use this test environment with modern JavaScript
 syntax.

You may extend this unit testing environment within an extension project. 
This is simply a base setup for running unit tests for web extensions. 
You may also create your very own test environment if this setup is not suitable for your project.

## Commands

Braces `{ }` indicate that the user must choose one (and only one) of the items inside the braces.


**Run unit tests (default)**

```bash
xt-test
```

**Configure custom test directory path or match pattern**

Defaults to `./test/**/*.js` if not specified

```bash
xt-test {-p|--pattern} "./test/**/*.js"
```

**Execute tests and keep watching changes**

```bash
xt-test {-w|--watch}
```

**Get help using this command**

```bash
xt-test --help
``` 

## Package.json scripts

After installing extension-cli, you can run these commands from a terminal using syntax `npx xt-test`.
 
You may also add an option to `packages.json` scripts section as shown below, then

- run unit tests from terminal: `npm run test` 
- run unit tests and save coverage to file: `npm run coverage`.

 
```json
"scripts":{
  "test": "xt-test",
  "coverage": "nyc --reporter=lcov npm run test"
}
```

## Reporting Coverage

### Coveralls

The general setup is:

1. Install [coveralls](https://www.npmjs.com/package/coveralls) as a dev dependency at project level:

    ```
    npm install coveralls --save-dev
    ```

2. Run unit tests with coverage report during CI/CD workflow, then pipe the result to coveralls:

    ``` 
    nyc --reporter=lcov npm run test | coveralls
    ```


If using Github actions, use [Coveralls Github action](https://github.com/marketplace/actions/coveralls-github-action) to report results. Example:

```yaml
- name: Execute unit tests w/ coverage
  run: nyc --reporter=lcov npm run test  # or: npm run coverage

- name: Report coverage
  uses: coverallsapp/github-action@master
  with:
    github-token: ${{ secrets.GITHUB_TOKEN }}
```



