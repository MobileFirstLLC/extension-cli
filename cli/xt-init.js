#!/usr/bin/env node

const fs = require('fs');
const program = require('commander');
const pkg = require('../package.json');

program
    .version(pkg.version)
    .arguments('<name>')
    .action(function (name) {
        projName = name;
    }).parse(process.argv);

console.log('calling init... creating project...' + projName);
