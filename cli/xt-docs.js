#!/usr/bin/env node

/**
 * @name xt-docs
 * @module
 * @public
 *
 *
 * @description Docs command generates documentation for the project. This command uses
 * jsdocs syntax. See {@link https://jsdoc.app/index.html|About JSDoc} for more details,
 * including {@link https://jsdoc.app/about-configuring-jsdoc.html|configuration options here}.
 *
 * The default template for the guide is {@link https://github.com/steveush/foodoc#readme|FooDoc}.
 * You can override this theme in the project by changing `opts.template` in jsdoc config file.
 *
 * By default, this command will automatically look for configuration in the project `package.json`.
 * Use `"xtdocs"` key to define config options in `package.json`. Alternatively add a separate
 * configuration file `.xtdocs.json` in the project root; or explicitly provide a path to a config file.
 * If you want to define configuration in some other location, use -c/--config flag
 * to provide path and name of the configuration file.
 */

const fs = require('fs');
const del = require('del');
const path = require('path');
const util = require('util');
const chalk = require('chalk');
const program = require('commander');
const pkg = require('../package.json');
const jsdoc = './node_modules/.bin/jsdoc';
const exec = require('child_process').exec;
const Spinner = require('cli-spinner').Spinner;
const tmpFile = path.join(process.cwd(), './node_modules', pkg.name, 'tmpDocsconfig.json');

let defaultConfig = require('../config/docs.json');

program
    .version(pkg.version)
    .option('-c --config <config>',
        'Path to config file; defaults to `.xtdocs.json` ' +
        'in project root, or `xtdocs` in package.json',
        /^(.*)$/i)
    .parse(process.argv);

const spinner = new Spinner(' %s ').start();

spinner.start();

const docFile = program.config || '.xtdocs.json';

const keyReplace = (src, target) => {
    for (let key in src) {
        if (!src.hasOwnProperty(key)) continue;
        if (typeof src[key] !== 'object') {
            target[key] = src[key];
            continue;
        }
        if (!target[key]) target[key] = {};
        keyReplace(src[key], target[key]);
    }
};

const iterateConfigs = projectConfig => {
    for (let k in projectConfig) {
        if (!projectConfig.hasOwnProperty(k)) continue;
        if (!defaultConfig[k]) defaultConfig[k] = {};
        keyReplace(projectConfig[k], defaultConfig[k]);
    }
};

const projectConfig = fs.existsSync(docFile) ?
    JSON.parse(fs.readFileSync(docFile, 'utf8')) :
    (JSON.parse(fs.readFileSync('./package.json', 'utf8'))).xtdocs;

if (projectConfig) {
    iterateConfigs(projectConfig);
}

fs.writeFileSync(tmpFile, JSON.stringify(defaultConfig));

const bat = exec(util.format('"%s" -c %s', jsdoc, tmpFile),
    (_, stdout, stderr) => {

        // console.log(stdout);
        // console.log(stderr);

        del.sync(tmpFile);
        process.exit(0);
    });

bat.on('exit', (code) => {
    spinner.stop(true);
    if (!code) {
        console.log(chalk.bold.green('Docs done!'));
    } else {
        console.log(chalk.bold.red('Docs failed'));
    }
});

