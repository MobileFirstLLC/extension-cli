const chalk = require('chalk');

/**
 * This file contains terminal/console output for all commands.
 */

exports.xtCreate = {
    dirError: dirname => chalk.bold.red(`Cannot create directory: ${dirname}.\n` +
        'It already exists, is not empty, or is not writable.'),
    start: (dirname, name) => 'Press CTRL+C if you want to terminate process early.\n' +
        `Creating extension ${name} in directory ${chalk.bold.green(dirname)}.`,
    install: 'Installing packages - this may take a while...',
    installError: chalk.bold.yellow('ATTN! ') + 'npm install did not complete successfully\n`+' +
        '`You may have to run npm install again in project directory',
    success: (dir) => `${chalk.bold.green('DONE! ')}Your extension starter is ready.\n` +
        `${chalk.bold.green('What Next: ')} Open ${dir} in your favorite web IDE`
};

exports.xtSync = {
    argGitlab: 'sync gitlab-ci.yml',
    argTravis: 'sync travis.yml',
    argLint: 'sync eslint',
    argGitIgnore: 'sync gitignore',
    argAll: 'sync everything',
    onError: chalk.red('Specify which files to sync using flags.\nSee --help for more details.'),
    updateSuccess: (what) => chalk.bold.green(`✓ updated ${what}`)
};

exports.xtDocs = {
    success: chalk.bold.green('Docs done!'),
    failure: chalk.bold.red('Docs failed'),
    configArg: 'Path to config file; defaults to `.xtdocs.json` in project root, or `xtdocs` in package.json'
};

exports.xtClean = {
    argModules: 'Clean node_modules directory',
    argIdea: 'Clean .idea/ directory',
    argVS: 'Clean .vscode/ directory',
    onConfigError: path => chalk.yellow(`File does not exist: ${path}`),
    onCleanFile: path => `- ${path}`,
    onCleanError: (e, line) => chalk.bold.red(e) + ' ' + line,
    result: count => chalk.bold[count === 0 ? 'yellow' : 'green'](`Done. Cleaned: ${count}`)
};

exports.xtTest = {
    argPattern: 'test file/directory match pattern',
    argCoverage: 'report coverage to coveralls during builds',
    argWatch: 'enable watch',
    onRootSetup: envList => ['ENV: ',
        envList.map(entry => chalk.bold.green(` ${entry} `))
    ].join(' ') + '\n'
};

exports.xtBuild = {
    envArg: 'Build environment',
    watchArg: 'Enable watch',
    configFileArg: 'Path to configuration file, default: .xtbuild.json in root, or xtbuild in package.json)',
    onBuildSuccess: _ => chalk.bold.green('Build done!'),
    onBuildError: _ => chalk.bold.red('Build failed')
};
