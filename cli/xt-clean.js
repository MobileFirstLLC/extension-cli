#!/usr/bin/env node

/**
 * @name xt-clean
 * @module
 * @public
 *
 * @description
 *
 *```text
 * xt-clean [--modules] [--idea] [--vscode]
 * ```
 *
 * Clean operation iterates over files and directories listed in the
 * project `.gitignore` file, and removes all ignored files and
 * directories, except `node_modules`, `.idea/`, and `.vscode`. To remove these
 * directories, you must explicitly pass a flag to delete each one of them.
 */

const fs = require('fs');
const del = require('del');
const path = require('path');
const readline = require('readline');
const program = require('commander');
const pkg = require('../package.json');
const ignore = path.join(process.cwd(), '.gitignore');
const Utilities = require('./utilities').Utilities;
const texts = require('./texts').xtClean;

let counter = 0;

program
    .version(pkg.version)
    .option('-m --modules', texts.argModules)
    .option('-i --idea', texts.argIdea)
    .option('-v --vscode', texts.argVS)
    .parse(process.argv);

if (!Utilities.fileExists(ignore)) {
    console.log(texts.onConfigError(ignore));
    process.exit(0);
}

const {modules, idea, vscode} = program.opts();

readline.createInterface({input: fs.createReadStream(ignore)})
    .on('line', function (line) {

        // never clean these
        if (line.trim().indexOf('#') === 0 ||
            line.trim().indexOf('.env') === 0 ||
            !(line || '').trim().length) {
            return false;
        }

        // clean these only if flagged
        if ((line.indexOf('.idea') > -1 && !idea) ||
            (line.indexOf('.vscode') > -1 && !vscode) ||
            (line.indexOf('node_modules') > -1 && !modules)) {
            return false;
        }

        // otherwise clean if exists
        const basePath = path.join(process.cwd(), line);

        if (fs.existsSync(basePath)) {
            try {
                if (fs.lstatSync(basePath).isDirectory()) {
                    del.sync(path.join(basePath, '/*'));
                }
                if (fs.existsSync(basePath)) {
                    del.sync(basePath);
                }
                console.log(texts.onCleanFile(line));
                counter++;
            } catch (e) {
                console.log(texts.onCleanError(e, line));
            }
        }
        return true;
    })
    .on('close', () => {
        console.log(texts.result(counter));
        process.exit(0);
    });
