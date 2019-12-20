#!/usr/bin/env node

const chalk = require('chalk');
const program = require('commander');
const pkg = require('../package.json');

function displayLogo() {
    const blue = c => chalk.hex('#009DDC').bold(c);
    const green = c => chalk.hex('#A4C639').bold(c);
    const c = '▉▉▉', s = '   ', d = '※', divChars = 40;

    const commonLines = (spaces) => `    ${blue(`${c}${s}${c}`)}${green(`${spaces}${c}`)}`;

    console.log('');
    console.log(`${d.repeat(divChars)}\n`);
    console.log(`    ${blue(`${s}${c}${c}`)}`);
    console.log(commonLines(c));
    console.log(commonLines(s) + '   C O M I N G');
    console.log(commonLines(s) + '     S O O N !');
    console.log(`    ${blue(`${c}${s}${c}`)} `);
    console.log(`    ${blue(`${c}`)}`);
    console.log('');
    console.log(`${d.repeat(divChars)}\n`);
}

program
    .version(pkg.version)
    .arguments('<name>')
    .action(function (name) {
        // projName = name;
    }).parse(process.argv);

// console.log('calling init... creating project...' + projName);

displayLogo();
