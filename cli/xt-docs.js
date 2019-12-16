#!/usr/bin/env node

const util = require('util');
const program = require('commander');
const pkg = require('../package.json');
const del = require('del');
const fs = require('fs');
const jsdoc = './node_modules/.bin/jsdoc';
const tmpConfigName = 'tmpDocsconfig.json';
const tmpFile = ['.', 'node_modules', pkg.name, tmpConfigName].join('/');

program
    .version(pkg.version)
    .option('-c --config <config>', 'Path to configuration file (default: "./.xtdocs.json" or \"xtdocs\" in package.json)', /^(.*)$/i)
    .parse(process.argv);

/////////////////////////

const docFile = program.config || './.xtdocs.json';
let config = require('../config/docs.json');
// let config = require('../config/esdocs.json');
let projectConfig = null;

// try find project docs config
if (fs.existsSync(docFile)) {
    projectConfig = JSON.parse(fs.readFileSync(docFile, 'utf8'));
}
else {
    const { xtdocs } = JSON.parse(fs.readFileSync('./package.json', 'utf8'));
    projectConfig = xtdocs;
}

// recursively replace config keys
if (projectConfig) {
    let keyReplace = (src, target) => {
        for (let key in src)
            if (src.hasOwnProperty(key)) {
                if (typeof src[key] === 'object') {
                    if (!target[key]) target[key] = {};
                    keyReplace(src[key], target[key]);
                } else {
                    target[key] = src[key];
                }
            }
    };

    for (let k in projectConfig) {
        if (projectConfig.hasOwnProperty(k)) {
            if (!config[k]) config[k] = {};
            keyReplace(projectConfig[k], config[k])
        }
    }
}

// write file so we can pass path to jsdoc
fs.writeFileSync(tmpFile, JSON.stringify(config));

// exec the docs generator
const exec = require('child_process').exec;
const command = util.format('"%s" -c %s', jsdoc, tmpFile);

exec(command, function (err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);

    // remove tmp config file
    del.sync(tmpFile);
    process.exit(0);
});
