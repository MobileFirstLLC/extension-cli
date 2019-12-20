#!/usr/bin/env node

/**
 * @description Docs command generates documentation for the project. This command uses
 * jsdocs syntax. See {@link https://jsdoc.app/index.html} for more details,
 * including configuration options: {@link https://jsdoc.app/about-configuring-jsdoc.html}.
 *
 * The default template for the docs is [foodoc](https://github.com/steveush/foodoc#readme).
 * You can override this theme in the project by changing opts.template in jsdoc config file.
 *
 * This command will automatically look for configuration in the project package.json.
 * Use "xtdocs" to define config options in package.json.
 *
 * This command will also automatically look for a configuration file .xtdocs.json in
 * the project root.
 *
 * If you want to define configuration in some other location, use -c/--config flag
 * to provide path and name of the configuration file.
 *
 * @namespace xt-docs
 *
 * @example <caption>Default docs generation command</caption>
 * npx xt-docs
 *
 * @example <caption>Example using custom config path</caption>
 * npx xt-docs --config "/path/to/config.json"
 *
 * @example <caption>Get help using this command</caption>
 * npx xt-docs --help
 *
 *
 * @example <caption>Configuring docs in package.json - In the configuration file, or in the the project package.json, you should define at least the following properties when using the default theme:</caption>
 *
 * "xtdocs": {
 *   "templates": {
 *     "systemName": "{extension name}",
 *     "systemSummary": "{short description}",
 *     "systemColor": "{css-color}"
 *   }
 * }
 *
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
        if (src.hasOwnProperty(key)) {
            if (typeof src[key] === 'object') {
                if (!target[key]) target[key] = {};
                keyReplace(src[key], target[key]);
            } else {
                target[key] = src[key];
            }
        }
    }
};

/** recursively overwrite default config options with project's own configs **/
const iterateConfigs = projectConfig => {
    for (let k in projectConfig) {
        if (projectConfig.hasOwnProperty(k)) {
            if (!defaultConfig[k]) defaultConfig[k] = {};
            keyReplace(projectConfig[k], defaultConfig[k]);
        }
    }
};

/** locate & initialize project docs configuration **/
if (fs.existsSync(docFile)) {

    const projectConfig = fs.existsSync(docFile) ?
        JSON.parse(fs.readFileSync(docFile, 'utf8')) :
        (JSON.parse(fs.readFileSync('./package.json', 'utf8'))).xtdocs;

    if (projectConfig) {
        iterateConfigs(projectConfig);
    }
}

/** write config to file so we can pass path to jsdoc **/
fs.writeFileSync(tmpFile, JSON.stringify(defaultConfig));

/** generate the docs **/
const bat = exec(util.format('"%s" -c %s', jsdoc, tmpFile),
    (_, stdout, stderr) => {

        // console.log(stdout);
        // console.log(stderr);

        /** remove configuration file **/
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

