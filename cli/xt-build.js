#!/usr/bin/env node

const util = require('util');
const pkg = require('../package.json');
const program = require('commander');
const env = { prod: 'prod', dev: 'dev' };
const chalk = require('chalk');
var Spinner = require('cli-spinner').Spinner;

program
    .version(pkg.version)
    .option('-e --env <env>', 'Environment', /^(dev|prod)$/i, env.prod)
    .option('-c --config <config>', 'Path to configuration file  (default: "./.xtbuild.json" or \"xtbuild\" in package.json)', /^(.*)$/i)
    .option('-w --watch', 'Enable watch')
    .parse(process.argv);

const args = [
    program.watch ? "gulp watch" : "gulp",
    util.format('--gulpfile "%s"', './node_modules/extension-cli/config/gulpfile.js'),
    util.format('--config "%s"', program.config || './.xtbuild.json'),
    util.format('--%s', program.env),
    '--colors'
];

const spinner = (!program.watch) ? new Spinner(' %s ') : null;
const { exec } = require('child_process');
const bat = exec(args.join(' '));

if (spinner) spinner.start();

if (program.watch)
    bat.stdout.on('data', (data) => {
        process.stdout.write(data.toString());
    });

bat.stderr.on('data', (data) => {
    if (spinner) spinner.stop(true);
    process.stdout.write(data.toString());
});

bat.on('exit', (code) => {
    if (spinner) spinner.stop(true);
    if (code === 0)
        console.log(chalk.bold.bgGreen('SUCCESS'));
    else
        console.log(chalk.bold.bgRed('FAILED'));
});

