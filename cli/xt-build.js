#!/usr/bin/env node

/**
 * @name xt-build
 * @module
 * @public
 *
 * @description
 *
 * ```text
 * xt-build --env {prod|dev} --platform {chrome|firefox} [--config filename] [--watch]
 * ```
 *
 * Build command generates a dist/ directory that can be
 * debugged in the browser. When called with production env flag, `-e prod`,
 * this command will minify and compile a `release.zip` file that can be
 * uploaded to extension marketplace for distribution.
 */

const util = require('util');
const path = require('path');
const program = require('commander');
const Spinner = require('cli-spinner').Spinner;
const exec = require('child_process').exec;
const pkg = require('../package.json');
const env = {prod: 'prod', dev: 'dev'};
const platform = {chrome: 'chrome', firefox: 'firefox'};
const texts = require('./texts').xtBuild;
const gulpfile = path.resolve(__dirname, './gulpfile.js');

program
    .version(pkg.version)
    .option('-e --env <env>', texts.envArg, /^(dev|prod)$/i, env.prod)
    .option('-p --platform <platform>', texts.platformArg, /^(chrome|firefox)$/i, platform.chrome)
    .option('-c --config <config>', texts.configFileArg, /^(.*)$/i)
    .option('-w --watch', texts.watchArg)
    .parse(process.argv);

const {watch, env: programEnv, config, platform: platformEnv} = program.opts();

const args = [
    watch ? 'gulp watch' : 'gulp',
    util.format('--gulpfile "%s"', gulpfile),
    util.format('--config "%s"', path.resolve(process.cwd(), config || './.xtbuild.json')),
    util.format('--pkg', path.resolve(process.cwd(), './package.json')),
    util.format('--cwd', path.resolve(process.cwd())),
    util.format('--%s', programEnv),
    util.format('--%s', platformEnv),
    '--colors'
].join(' ');

const spinner = new Spinner(' %s ');
spinner.start();

const bat = exec(args);

bat.stdout.on('data', (data) => {
    if (data && data.indexOf('Using gulpfile') === 0) return;
    spinner.stop(true);
    process.stdout.write(data.toString());
});

bat.stderr.on('data', (data) => {
    spinner.stop(true);
    process.stdout.write(data.toString());
});

bat.on('exit', (err) => {
    spinner.stop(true);
    console.log(!err ?
        texts.onBuildSuccess() :
        texts.onBuildError());
});
