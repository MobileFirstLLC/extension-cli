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
 * Command takes no arguments; just follow prompts on screen.
 */

const chalk = require('chalk');
const prompts = require('prompts');
const path = require('path');
const exec = require('child_process').exec;
const Spinner = require('cli-spinner').Spinner;
const spinner = new Spinner(' %s ');
const Utilities = require('./utilities').Utilities;
const questions = require('../config/createPrompts');
const defaultHomepage = 'http://chrome.google.com/webstore'
const initFilesPath = '../config/init/';

/**
 * Run the setup script
 * @private
 */
(async () => {

    const {name, description, homepage = defaultHomepage} = await prompts(questions);
    if (!name) process.exit(1);

    const dirname = Utilities.generateDirectoryName(name);
    const dir = path.join(process.cwd(), `/${dirname}`);
    const vars = {name, description, homepage, safeName: dirname, version: '0.0.1'}

    const fn = fileName => path.resolve(__dirname, initFilesPath + fileName);
    const rv = path => Utilities.readAndReplaceTextFile(path, vars);
    const rvj = path => Utilities.readAndReplaceJSONFile(path, vars);

    // create project directory
    Utilities.createDir(dir, true);

    console.log(`Press CTRL+C if you want to terminate process early`);
    console.log(`Creating extension ${name} in directory ${chalk.bold.green(dirname)}...`);
    spinner.start();

    // SETUP files structure and starter files
    // initialize extension image assets
    Utilities.createDir(dir + '/assets');
    Utilities.createDir(dir + '/assets/img');
    Utilities.copyFolderSync(fn('assets'), dir + '/assets')

    // setup locales
    Utilities.createDir(dir + '/assets/locales');
    Utilities.createDir(dir + '/assets/locales/en');
    Utilities.writeFile(dir + '/assets/locales/en/messages.json', rvj(fn('messages.json')));

    // setup source code
    Utilities.createDir(dir + '/src');
    Utilities.writeFile(dir + '/src/manifest.json', rvj(fn('manifest.json')));
    Utilities.copyFile(fn('background.js'), dir + '/src/index.js');

    // setup test files
    Utilities.createDir(dir + '/test');
    Utilities.copyFile(fn('test.js'), dir + '/test/sample.js');

    // create package.json
    Utilities.writeFile(dir + '/package.json', rvj(fn('package.json')));

    // create readme
    Utilities.writeFile(dir + '/README.md', rv(fn('intro.md')));

    // INSTALL packages
    spinner.stop(true);
    console.log("Installing packages - this may take a while...");
    spinner.start();

    exec('npm install', {cwd: dir},
        (error, stdout, stderr) => {
            stdout.write(data.toString());
            stderr.write(data.toString());
        })
        .on('exit', code => {
            spinner.stop(true);
            if (code !== 0) {
                console.log(chalk.bold.yellow('ATTN! ') + `npm install did not complete successfully`);
                console.log('You may have to run npm install again in project directory');
            }
            console.log(`${chalk.bold.green('DONE! ')}Your extension starter is ready.`);
            console.log(chalk.bold.green('What Next: ') + `Open ${dir} in your favorite web IDE`);
            process.exit(0);
        });
})();
