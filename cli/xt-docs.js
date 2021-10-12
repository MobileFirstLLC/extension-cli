#!/usr/bin/env node

/**
 * @name xt-docs
 * @module
 * @public
 *
 * @description
 *
 * ```text
 * xt-docs [--config filename] [--watch]
 * ```
 *
 * Docs command generates documentation for the project. This command uses
 * jsdocs syntax. See {@link https://jsdoc.app/index.html|About JSDoc} for more details,
 * including {@link https://jsdoc.app/about-configuring-jsdoc.html|configuration options here}.
 * The default template for the guide is JsDoc default template. You can override this template
 * in the project by changing `opts.template` in jsdoc config file.
 *
 * By default, this command will automatically look for configuration in the project `package.json`.
 * - use `"xtdocs"` key to define config options in `package.json,
 * - -or- add a separate configuration file `.xtdocs.json` in the project root,
 * - -or- explicitly provide a path to a config file.
 *
 * Use `-c` / `--config` flag to provide path and name of the configuration file.
 */

const fs = require('fs');
const del = require('del');
const util = require('util');
const path = require('path');
const program = require('commander');
const pkg = require('../package.json');
const exec = require('child_process').exec;
const Spinner = require('cli-spinner').Spinner;
const Utilities = require('./utilities').Utilities;
const texts = require('./texts').xtDocs;
const defaultConfig = require('../config/docs.json');
const spinner = new Spinner(' %s ');
const jsdoc = './node_modules/.bin/jsdoc';
const tmpFile = path.join(process.cwd(),
    './node_modules', pkg.name, 'tmpDocsConfig.json');

program
    .version(pkg.version)
    .option('-c --config <config>', texts.configArg, /^(.*)$/i)
    .option('-w --watch', texts.argWatch)
    .parse(process.argv);

const {config: configArg, watch} = program.opts();

const getConfig = (docFileName) => {
    const fe = Utilities.fileExists(docFileName);
    const temp = Utilities.readJSON(fe ?
        docFileName : './package.json');

    return Utilities.iterateConfigs(defaultConfig,
        fe ? temp : temp.xtdocs);
};

const buildDocs = (tmpFile, config, callback) => {
    spinner.start();
    Utilities.writeFile(tmpFile, config);

    const proc = exec(util.format('"%s" -c %s', jsdoc, tmpFile));

    proc.stdout.on('data', (data) => {
        process.stdout.write(data.toString());
    });
    proc.stderr.on('data', (data) => {
        process.stderr.write(data.toString());
    });
    proc.on('exit', err => {
        del.sync(tmpFile);
        spinner.stop(true);
        console.log(err ? texts.failure : texts.success);
        if (callback) callback();
    });
};

const startWatch = (tmpFile, watchPaths, configStr) => {
    watchPaths.map(fileOrDir => {
        fs.watch(path.join(process.cwd(), fileOrDir), {
                persistent: true, recursive: true
            },
            (curr, prev) => {
                // if spinning it is already running
                if (!spinner.isSpinning()) {
                    buildDocs(tmpFile, configStr, false);
                }
            });
    });
    console.log(texts.watching);
};

const config = getConfig(configArg || '.xtdocs.json');
const configString = JSON.stringify(config);
const watchPaths = config.source.include.concat(
    config.opts.tutorials ? [config.opts.tutorials] : []);

buildDocs(tmpFile, configString, _ => watch ?
    startWatch(tmpFile, watchPaths, configString) :
    process.exit(0));
