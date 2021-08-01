#!/usr/bin/env node

/**
 * @name extension-cli
 * @module
 * @public
 *
 * @description
 *
 *```text
 * npx extension-cli
 * ```
 *
 * This command will create a new extension project and initial code files.
 * Command takes no arguments; follow prompts on screen.
 */

const prompts = require('prompts');
const path = require('path');
const exec = require('child_process').exec;
const Spinner = require('cli-spinner').Spinner;
const spinner = new Spinner(' %s ');
const Utilities = require('./utilities').Utilities;
const texts = require('./texts').xtCreate;
const createPrompts = texts.prompts;
const defaultHomepage = 'http://chrome.google.com/webstore';
const initFilesPath = '../config/init/';

/**
 * Run the setup script
 * @private
 */
(async () => {

    const promptOptions = {onCancel: () => process.exit(0)};
    const response = await prompts(createPrompts.name, promptOptions);
    const name = response.name;
    const dirname = Utilities.generateDirectoryName(name);
    const dir = path.join(process.cwd(), `/${dirname}`);

    // create project directory
    const success = Utilities.createDir(dir);

    if (!success) {
        console.error(texts.dirError(dirname));
        return process.exit(0);
    }

    const {description, homepage} = await prompts(createPrompts.optional, promptOptions);
    const vars = {
        name, description, safeName: dirname,
        version: '0.0.1', homepage: homepage || defaultHomepage
    };
    const _file = fileName => path.resolve(__dirname, initFilesPath + fileName);
    const _readtext = path => Utilities.readAndReplaceTextFile(path, vars);
    const _readjson = path => Utilities.readAndReplaceJSONFile(path, vars);

    console.log(texts.start(dirname, name));
    spinner.start();

    // SETUP files structure and starter files
    // initialize extension image assets
    Utilities.createDir(dir + '/assets');
    Utilities.createDir(dir + '/assets/img');
    Utilities.copyFile(_file('icon.svg'), dir + '/assets/icon.svg');
    Utilities.copyFile(_file('16x16.png'), dir + '/assets/img/16x16.png');
    Utilities.copyFile(_file('24x24.png'), dir + '/assets/img/24x24.png');
    Utilities.copyFile(_file('32x32.png'), dir + '/assets/img/32x32.png');
    Utilities.copyFile(_file('128x128.png'), dir + '/assets/img/128x128.png');

    // setup locales
    Utilities.createDir(dir + '/assets/locales');
    Utilities.createDir(dir + '/assets/locales/en');
    Utilities.writeFile(dir + '/assets/locales/en/messages.json', _readjson(_file('messages.json')));

    // setup source code
    Utilities.createDir(dir + '/src');
    Utilities.writeFile(dir + '/src/manifest.json', _readjson(_file('manifest.json')));
    Utilities.copyFile(_file('background.js'), dir + '/src/index.js');

    // setup test files
    Utilities.createDir(dir + '/test');
    Utilities.copyFile(_file('test.js'), dir + '/test/sample.js');

    // create package.json
    Utilities.writeFile(dir + '/package.json', _readjson(_file('package.json')));

    // create readme
    Utilities.writeFile(dir + '/README.md', _readtext(_file('intro.md')));

    // add eslint config
    Utilities.writeFile(dir + '/.eslintrc.json', _readtext(_file('eslint.json')));

    // INSTALL packages
    spinner.stop(true);
    console.log(texts.install);
    spinner.start();

    exec('npm install', {cwd: dir})
        .on('exit', code => {
            spinner.stop(true);
            if (code !== 0) {
                console.log(texts.installError);
            }
            console.log(texts.success(dir));
            process.exit(0);
        });

    // this is just to make eslint happy
    return '';
})();
