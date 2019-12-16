#!/usr/bin/env node


/**
 * This command will run project unit tests located in test/ directory.
 *
 * This command will setup extension testing environment using sinon-chrome,
 * mocha, chai, chai-as-promised, and headless jsdom.
 *
 * @namespace xt-test
 *
 * @example <caption>Default test command</caption>
 * npx xt-test
 *
 * @example <caption>Execute tests and keep watching changes</caption>
 * npx xt-test --watch
 *
 * @example <caption>Execute tests and pipe result to coveralls</caption>
 * npx xt-test --coveralls
 *
 * @example <caption>Get help using this command</caption>
 * npx xt-test --help
 *
 */

const util = require('util');
const path = require('path');
const program = require('commander');
const pkg = require('../package.json');
const exec = require('child_process').exec;
const rootSuite = path.join(process.cwd(), './node_modules', pkg.name, 'config/rootSuite.js');

program
    .version(pkg.version)
    .option('-l --coveralls', 'pipe coverage')
    .option('-w --watch', 'enable watch')
    .parse(process.argv);

const args = [

    // use nyc && mocha
    'nyc mocha', './test/**/*.js',

    // setup test environment
    util.format('--file "%s"', rootSuite),

    // enable watch
    program.watch ? '--watch' : '',

    // babel + chalk
    '--require babel-core/register --colors',

    // lastly: pipe to coveralls -->
    // this has to happen last after all tests have run
    program.coveralls ? '&& nyc report --reporter=text-lcov | coveralls' : ''

].join(' ');

/** execute test runner in project working dir **/
process.chdir(process.cwd());

const bat = exec(args);

/** display all test output on screen **/
bat.stdout.on('data', data => {
    process.stdout.write(data.toString());
});

bat.stderr.on('data', data => {
    process.stdout.write(data.toString());
});
