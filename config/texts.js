const chalk = require('chalk');

exports.xtCreate = {
    dirError: dirname => chalk.bold.red(`Cannot create directory: ${dirname}.\n` +
        'It already exists, is not empty, or is not writable.'),
    start: (dirname, name) => 'Press CTRL+C if you want to terminate process early.\n' +
        `Creating extension ${name} in directory ${chalk.bold.green(dirname)}...`,
    install: 'Installing packages - this may take a while...',
    installError: chalk.bold.yellow('ATTN! ') + 'npm install did not complete successfully\n`+' +
        '`You may have to run npm install again in project directory',
    success: (dir) => `${chalk.bold.green('DONE! ')}Your extension starter is ready.\n` +
        `${chalk.bold.green('What Next: ')} Open ${dir} in your favorite web IDE\``
}
