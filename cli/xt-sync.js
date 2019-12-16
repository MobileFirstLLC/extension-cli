#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const program = require('commander');
const pkg = require('../package.json');
const chalk = require('chalk');
const files = {
    ci: { path: '../config/gitlab.yml', out: '.gitlab-ci.yml' },
    lint: { path: '../config/eslint.json', out: '.eslintrc' },
    gitignore: { path: '../config/ignore', out: '.gitignore' }
};

program
    .version(pkg.version)
    .option('-c --ci', 'sync ci configs')
    .option('-l --lint', 'sync lint')
    .option('-g --gitignore', 'sync .gitignore')
    .option('-a --all', 'sync everything')
    .parse(process.argv);

Object.keys(files).map(opt => {
    if (program[opt] !== undefined || program.all) {
        const relativePath = path.resolve(__dirname, files[opt].path);
        const outputFileName = files[opt].out;
        const content = fs.readFileSync(relativePath, 'utf8');

        let outPath = path.join(process.cwd(), outputFileName);
        fs.writeFileSync(outPath, content);
        console.log(chalk.bold.bgGreen('updated'), outputFileName);
    }
});
