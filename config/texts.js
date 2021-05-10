/** * * * * * * * * * * * * * * * * * * * *
 * Extension-CLI
 * Command line build tool for building
 * browser extensions
 *
 * Author: Mobile First LLC
 * Website: https://mobilefirst.me
 *
 * @description
 * This module specifies terminal/console
 * output for all commands
 * * * * * * * * * * * * * * * * * * * * */

const chalk = require('chalk');

/**
 * xt-create outputs
 */
exports.xtCreate = {

    promptName: 'What do you want to call the extension?',

    promptNameError: 'You must choose a name',

    prompDescription: 'What does it do?',

    promptHomepage: 'Homepage URL (leave blank if you do not have one yet)',

    dirError: (dirname) => (
        chalk.bold.red(`Cannot create directory: ${dirname}.\n` +
            'It already exists, is not empty, or is not writable.')
    ),

    start: (dirname, name) => (
        'Press CTRL+C if you want to terminate process early.\n' +
        `Creating extension ${name} in directory ${chalk.bold.green(dirname)}.`
    ),

    install: 'Installing packages - this may take a while...',

    installError: (
        chalk.bold.yellow('ATTN! ') +
        'npm install did not complete successfully\n' +
        'You may have to run npm install again in project directory.'
    ),

    success: (dir) => (
        `${chalk.bold.green('DONE! ')}Your extension starter is ready.\n` +
        `${chalk.bold.green('What Next: ')} Open ${dir} in your favorite web IDE`
    )
};

/**
 * xt-sync outputs
 */
exports.xtSync = {

    argGitlab: 'gitlab CI config',

    argTravis: 'travis CI config',

    argLint: 'eslint config',

    argGitIgnore: 'gitignore',

    instructions: 'choose the files you want to sync:',

    updateSuccess: (what) => (
        chalk.bold.green(`✓ updated ${what}`)
    )
};

/**
 * xt-docs outputs
 */
exports.xtDocs = {

    argWatch: 'enable watch',

    watching: 'watching...',

    success: chalk.bold.green('Docs done!'),

    failure: chalk.bold.red('Docs failed'),

    configArg: 'Path to config file; defaults to `.xtdocs.json` in project root, or `xtdocs` in package.json'
};

/**
 * xt-clean outputs
 */
exports.xtClean = {

    argModules: 'Clean node_modules directory',

    argIdea: 'Clean .idea/ directory',

    argVS: 'Clean .vscode/ directory',

    onConfigError: (path) => (
        chalk.yellow(`File does not exist: ${path}`)
    ),

    onCleanFile: (path) => (
        `- ${path}`
    ),

    onCleanError: (e, line) => (
        chalk.bold.red(e) + ' ' + line
    ),

    result: count => (
        chalk.bold[count === 0 ? 'yellow' : 'green'](`Done. Cleaned: ${count}`)
    )
};

/**
 * xt-test outputs
 */
exports.xtTest = {

    argPattern: 'test file/directory match pattern',

    argCoverage: 'report coverage to coveralls during builds',

    argWatch: 'enable watch',

    onRootSetup: (envList) => (
        ['ENV: ',
            envList.map(entry => chalk.bold.green(` ${entry} `))
        ].join(' ') + '\n'
    )
};

/**
 * xt-build outputs
 */
exports.xtBuild = {

    envArg: 'Build environment',

    watchArg: 'Enable watch',

    platformArg: 'Platform',

    configFileArg: 'Path to configuration file, default: .xtbuild.json in root, or xtbuild in package.json)',

    onBuildSuccess: _ => (
        chalk.bold.green('Build done!')
    ),

    onBuildError: _ => (
        chalk.bold.red('Build failed')
    )
};
