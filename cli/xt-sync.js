#!/usr/bin/env node

/**
 * @name xt-sync
 * @module
 * @public
 *
 * @description
 *
 * ```text
 * xt-sync [--gitignore] [--eslint] [--gitlab] [--travis] [--all]
 * ```
 *
 * The purpose of this command is to upgrade configuration files of
 * a stale project to latest version, where this CLI tool will provide
 * updated project configuration files. If the config files have been
 * modified heavily for the project, it is not advisable to upgrade them
 * in this manner. Instead you should upgrade such configs manually.
 */

const path = require('path');
const program = require('commander');
const pkg = require('../package.json');
const texts = require('../config/texts').xtSync;
const Utilities = require('./utilities').Utilities;

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

let counter = 0;

Object.keys(files).map(opt => {
    if (program[opt] !== undefined || program.all) {
        const relativePath = path.resolve(__dirname, files[opt].path);
        const outputFileName = files[opt].out;
        const content = Utilities.readFile(relativePath, 'utf8');
        const outPath = path.join(process.cwd(), outputFileName);

        Utilities.writeFile(outPath, content);
        console.log(texts.updateSuccess(outputFileName));
        counter++;
    }
});

if (!counter) console.log(texts.onError);
