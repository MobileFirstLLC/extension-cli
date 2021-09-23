/**
 * @description
 * This module specifies terminal/console output for all commands
 */

const chalk = require('chalk');

/**
 * xt-create outputs
 */
exports.xtCreate = {

    prompts: {
        name: {
            type: 'text',
            name: 'name',
            message: 'What do you want to call the extension?',
            validate: value =>
                // basic null check is sufficient
                !value || value.trim().length < 1 ?
                    'You must choose a name' : true
        },
        optional: [
            {
                type: 'text',
                name: 'description',
                message: 'What does it do?'
            }, {
                type: 'text',
                name: 'homepage',
                message: 'Homepage URL (leave blank if you do not have one yet)'
            }
        ]
    },

    dirError: (dirname) => (
        chalk.bold.red(`Cannot create directory: ${dirname}.\n` +
            'It already exists, is not empty, or is not writable.')
    ),

    start: (dirname, name) => (
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

    argGitlab: 'Gitlab CI config',

    argTravis: 'Travis CI config',

    argLint: 'eslint config',

    argGitIgnore: 'gitignore',

    argActions: 'Github actions workflow config',

    instructions: 'choose the files you want to sync:',

    updateSuccess: (what) => chalk.bold.green(`✓ updated ${what}`)
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

    onConfigError: (path) => chalk.yellow(`File does not exist: ${path}`),

    onCleanFile: (path) => `- ${path}`,

    onCleanError: (e, line) => chalk.bold.red(e) + ' ' + line,

    result: count => chalk.bold[count === 0 ? 'yellow' : 'green'](`Done. Cleaned: ${count}`)
};

/**
 * xt-test outputs
 */
exports.xtTest = {

    argPattern: 'test file/directory match pattern',

    argCoverage: 'deprecated! see docs on how to report coverage: https://bit.ly/3j5Zrn2',

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

    onBuildSuccess: _ => chalk.bold.green('Build done!'),

    onBuildError: _ => chalk.bold.red('Build failed')
};
