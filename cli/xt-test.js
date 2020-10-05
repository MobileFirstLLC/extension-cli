#!/usr/bin/env node

/**
 * @name xt-test
 * @module
 * @public
 *
 *
 * @description
 *
 * ```text
 * xt-test [--pattern] [--coverage] [--watch]
 * ```
 *
 * This command will run project unit tests located in `./test` directory.
 *
 * Command sets up extension unit testing environment with ES6 syntax support that is pre-initialized
 * with [mocha](https://mochajs.org/), [chai](https://www.chaijs.com/) (including chai-as-promised)
 * and expect. [nyc](https://www.npmjs.com/package/nyc) is used for computing code coverage.
 * The following browser APIs are also initialized: `window`, `chrome`. Window
 * is setup using [jsdom-global](https://www.npmjs.com/package/jsdom-global) and
 * chrome using [sinon-chrome](https://www.npmjs.com/package/sinon-chrome).
 *
 * You may extend this test environment within a single project. This is simply the base setup
 * for running unit tests. Or create your own testing environment at project level if this is not suitable.
 */

const util = require('util');
const path = require('path');
const program = require('commander');
const pkg = require('../package.json');
const exec = require('child_process').exec;

process.chdir(process.cwd());
program
    .version(pkg.version)
    .option('-p --pattern <string>', 'test file/directory match pattern')
    .option('-c --coverage', 'display coverage')
    .option('-w --watch', 'enable watch');

program.parse(process.argv);

exec([

    // use nyc && mocha
    'nyc mocha',

    // where to look for tests
    program.pattern ? program.pattern : './test/**/*.js',

    // setup test environment
    util.format('--file "%s"',
        path.resolve(process.cwd(), 'node_modules',
            pkg.name, 'config', 'rootSuite.js')),

    // enable watch
    program.watch ? '--watch' : '',

    // babel
    ' --require @babel/register ',

    // output colors
    '--colors',

    // lastly: pipe to coveralls -->
    // this has to happen last after all tests have run
    program.coverage ? '&& nyc report --reporter=text-lcov | coveralls' : ''

].join(' ')).then(({stdout, stderr}) => {
    stdout.on('data', data => {
        process.stdout.write(data.toString());
    });
    stderr.on('data', data => {
        process.stdout.write(data.toString());
    });
});
