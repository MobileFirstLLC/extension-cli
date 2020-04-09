#!/usr/bin/env node

/**
 * @name xt-test
 * @module
 * @public
 *
 *
 * @description This command will run project unit tests located in test/ directory.
 *
 * This command will setup extension testing environment that is pre-initialized
 * with [mocha](https://mochajs.org/), [chai](https://www.chaijs.com/) (including chai-as-promised)
 * and expect. [nyc](https://www.npmjs.com/package/nyc) is used for computing code coverage.
 * The following browser APIs are also initialized: `window`, `chrome`. Window
 * is setup using [jsdom-global](https://www.npmjs.com/package/jsdom-global) and
 * chrome using [sinon-chrome](https://www.npmjs.com/package/sinon-chrome).
 *
 * Mocha will execute with babel, meaning you can use this test environment to
 * test ES6 modules with imports, arrows, and classes.
 *
 * You may extend this test environment with a single project; this is simply the base setup
 * for running unit tests. Or you may create your own test environment if this is not suitable.
 */

const util = require('util');
const path = require('path');
const program = require('commander');
const pkg = require('../package.json');
const exec = require('child_process').exec;

process.chdir(process.cwd());

const rootSuite = path.resolve(process.cwd(), 'node_modules', pkg.name, 'config', 'rootSuite.js');

program
    .version(pkg.version)
    .option('-c --coverage', 'pipe coverage')
    .option('-w --watch', 'enable watch')
    .parse(process.argv);

const args = [

    // use nyc && mocha
    'nyc mocha',

    // where to look for tests
    './test/**/*.js',

    // setup test environment
    util.format('--file "%s"', rootSuite),

    // enable watch
    program.watch ? '--watch' : '',

    // babel
    ' --require @babel/register ',

    // output colors
    '--colors',

    // lastly: pipe to coveralls -->
    // this has to happen last after all tests have run
    program.coveralls ? '&& nyc report --reporter=text-lcov | coveralls' : ''

].join(' ');

const bat = exec(args);

bat.stdout.on('data', data => {
    process.stdout.write(data.toString());
});

bat.stderr.on('data', data => {
    process.stdout.write(data.toString());
});
