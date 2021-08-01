#!/usr/bin/env node

/**
 * @name xt-sync
 * @module
 * @public
 *
 * @description
 *
 * ```text
 * xt-sync
 * ```
 *
 * The purpose of this command is to upgrade configuration files of
 * a stale project to latest version, where this CLI tool will provide
 * updated project configuration files. If the config files have been
 * modified heavily for the project, it is not advisable to upgrade them
 * in this manner. Instead you should upgrade such configs manually.
 */

const path = require('path');
const prompts = require('prompts');
const program = require('commander');
const pkg = require('../package.json');
const texts = require('./texts').xtSync;
const Utilities = require('./utilities').Utilities;

// list available options
const files = {
    actions: {title: texts.argActions, path: '../config/actions.yml', out: 'build.yml', dir: '.github/workflows'},
    gitlab: {title: texts.argGitlab, path: '../config/gitlab.yml', out: '.gitlab-ci.yml'},
    travis: {title: texts.argTravis, path: '../config/travis.yml', out: '.travis.yml'},
    eslint: {title: texts.argLint, path: '../config/init/eslint.json', out: '.eslintrc.json'},
    gitignore: {title: texts.gitignore, path: '../config/ignore', out: '.gitignore'}
};

// generate the options to display to user
const options = [{
    type: 'multiselect',
    name: 'options',
    message: texts.instructions,
    choices: Object.entries(files).map(
        ([key, {title}]) => ({title, value: key}))
}];

program
    .name('xt-sync')
    .option('-a --all', 'deprecated: call xt-sync without flags')
    .version(pkg.version)
    .parse(process.argv);

(async () => {

    const onCancel = () => process.exit(0);
    // noinspection JSUnresolvedVariable
    const response = (await prompts(options, {onCancel})).options;

    // copy selected options from config -> project
    Object.entries(files).map(([key, value]) => {

        if (response.indexOf(key) > -1) {
            const relativePath = path.resolve(__dirname, value.path);
            const content = Utilities.readFile(relativePath);
            const outPath = path.join(process.cwd(),
                (value.dir ? path.join(value.dir, value.out) : value.out));

            if (value.dir) Utilities.createDir(path.join(process.cwd(), value.dir));
            Utilities.writeFile(outPath, content);
            console.log(texts.updateSuccess(value.out));
        }
    });
})();
