#!/usr/bin/env node

/**
 * The purpose of this command is to upgrade configuration files of
 * a stale project to latest version, where this CLI tool will provide
 * updated project configuration files. If the config files have been
 * modified heavily for the project, it is not advisable to upgrade them
 * in this manner. Instead you should upgrade such configs manually.
 *
 * @example <caption>Sync all configs</caption>
 * npx xt-sync --all
 *
 * @example <caption>Sync eslint config</caption>
 * npx xt-sync --eslint
 *
 * @example <caption>Get help using this command</caption>
 * npx xt-sync --help
 *
 * @module xt-sync
 */

const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const program = require('commander');
const pkg = require('../package.json');
let counter = 0;

const files = {
    gitlab: {path: '../config/gitlab.yml', out: '.gitlab-ci.yml'},
    travis: {path: '../config/travis.yml', out: '.travis.yml'},
    eslint: {path: '../config/eslint.json', out: '.eslintrc'},
    gitignore: {path: '../config/ignore', out: '.gitignore'}
};

program
    .version(pkg.version)
    .option('-l --gitlab', 'sync gitlab-ci.yml')
    .option('-t --travis', 'sync travis.yml')
    .option('-e --eslint', 'sync eslint')
    .option('-g --gitignore', 'sync gitignore')
    .option('-a --all', 'sync everything')
    .parse(process.argv);

Object.keys(files).map(opt => {
    if (program[opt] !== undefined || program.all) {
        const relativePath = path.resolve(__dirname, files[opt].path);
        const outputFileName = files[opt].out;
        const content = fs.readFileSync(relativePath, 'utf8');

        let outPath = path.join(process.cwd(), outputFileName);
        fs.writeFileSync(outPath, content);
        console.log(chalk.bold.green(`✓ updated ${outputFileName}`));
        counter++;
    }
});

if (!counter)
    console.log(chalk.red(`(!) Specify which files to sync using flags.`+
        `\nSee --help for more details.`));

