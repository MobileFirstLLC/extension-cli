#!/usr/bin/env node

const path = require('path');
const fs = require('fs');
const program = require('commander');
const pkg = require('../package.json');
const ignore = path.join(process.cwd(), '.gitignore');
const del = require('del');
const chalk = require('chalk');

program
    .version(pkg.version)
    .option('-m --modules', 'Clean node_modules')
    .option('-i --idea', 'Clean .idea')
    .parse(process.argv);


let lineReader = require('readline').createInterface({
    input: fs.createReadStream(ignore)
});

lineReader.on('line', line => {
    if ((line.indexOf('.idea/') > -1 && !program.idea) ||
        (line.indexOf('node_modules/') > -1 && !program.modules)) {
        return false;
    }
    let basePath = path.join(process.cwd(), line);
    if (fs.existsSync(basePath)) {
        try {
            if (fs.lstatSync(basePath).isDirectory()) {
                del.sync(path.join(basePath, '/*'));
            }
            if (fs.existsSync(basePath)) {
                del.sync(basePath);
            }
            console.log(chalk.bold.green('cleaned'), line);
        } catch (e) {
            console.log(chalk.bold.red(e), line);
        }
    }
});

