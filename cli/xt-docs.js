#!/usr/bin/env node

/**
 * @name xt-docs
 * @module
 * @public
 *
 *
 * @description
 *
 * ```text
 * xt-docs [--config filename]
 * ```
 *
 * Docs command generates documentation for the project. This command uses
 * jsdocs syntax. See {@link https://jsdoc.app/index.html|About JSDoc} for more details,
 * including {@link https://jsdoc.app/about-configuring-jsdoc.html|configuration options here}.
 * The default template for the guide is {@link https://github.com/steveush/foodoc#readme|FooDoc}.
 * You can override this theme in the project by changing `opts.template` in jsdoc config file.
 *
 * By default, this command will automatically look for configuration in the project `package.json`.
 * Use `"xtdocs"` key to define config options in `package.json`. Alternatively add a separate
 * configuration file `.xtdocs.json` in the project root; or explicitly provide a path to a config file.
 * If you want to define configuration in some other location, use `-c` / `--config` flag
 * to provide path and name of the configuration file.
 */

const del = require('del');
const path = require('path');
const util = require('util');
const program = require('commander');
const pkg = require('../package.json');
const jsdoc = './node_modules/.bin/jsdoc';
const exec = require('child_process').exec;
const Spinner = require('cli-spinner').Spinner;
const spinner = new Spinner(' %s ');
const Utilities = require('./utilities').Utilities;
const texts = require('../config/texts').xtDocs;
const defaultConfig = require('../config/docs.json');

program
    .version(pkg.version)
    .option('-c --config <config>', texts.configArg, /^(.*)$/i)
    .parse(process.argv);

const tmpFile = path.join(process.cwd(), './node_modules', pkg.name, 'tmpDocsconfig.json');
const docFile = program.config || '.xtdocs.json';
const projectConfig = Utilities.fileExists(docFile) ?
    Utilities.readJSON(docFile) :
    Utilities.readJSON('./package.json').xtdocs;
const config = Utilities.iterateConfigs(defaultConfig, projectConfig);

spinner.start();
Utilities.writeFile(tmpFile, JSON.stringify(config));

exec(util.format('"%s" -c %s', jsdoc, tmpFile),
    (_, stdout, stderr) => {
        console.log(stdout);
        console.log(stderr);
        del.sync(tmpFile);
        process.exit(0);
    }).on('exit', (code) => {
    spinner.stop(true);
    console.log(!code ? texts.success : texts.failure);
});
