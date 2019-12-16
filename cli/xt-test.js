#!/usr/bin/env node

const util = require('util');
const program = require('commander');
const pkg = require('../package.json');
const path = require('path');
const rootSuite = path.resolve(process.cwd(), 'node_modules', pkg.name, 'config/rootSuite.js');

program
    .version(pkg.version)
    .option('-l --coveralls', 'pipe coverage')
    .option('-w --watch', 'enable watch')
    .parse(process.argv);

const args = [
    // use nyc && mocha
    'nyc mocha',
    './test/**/*.js',
    // setup test environment
    util.format('--file "%s"', rootSuite),
    // enable watch
    program.watch ? '--watch' : '',
    // babel + chalk
    '--require babel-core/register --colors',

    // lastly: pipe to coveralls -->
    // this has to happen last after all tests have run
    program.coveralls ? '&& nyc report --reporter=text-lcov | coveralls' : ''
];

// exec test runner in current working dir
process.chdir(process.cwd());
// console.log(args.join(' '));

const {exec} = require('child_process');
const bat = exec(args.join(' '));
bat.stdout.on('data', (data) => {
    process.stdout.write(data.toString());
});
bat.stderr.on('data', (data) => {
    process.stdout.write(data.toString());
});
