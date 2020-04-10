#!/usr/bin/env node

/**
 * @name xt-create
 * @module
 * @public
 *
 * @description
 *
 *```text
 * xt-create
 * ```
 */

const chalk = require('chalk');
const prompts = require('prompts');
// const images = require('../config/images.json');
const exec = require('child_process').exec;
const Spinner = require('cli-spinner').Spinner;
const fs = require("fs");
const path = require('path');
const spinner = new Spinner(' %s ');

const questions = [
    {
        type: 'text',
        name: 'name',
        message: 'What do you want to call the extension?',
        validate: value => !value || value.length < 2 ? `You need to choose a name` : true
    },
    {
        type: 'text',
        name: 'description',
        message: 'What does it do?',
    },
    {
        type: 'text',
        name: 'homepage',
        message: 'Homepage URL (if any)',
    }
];

const images = {
    "svg": "<?xml version=\"1.0\" encoding=\"UTF-8\"?><!DOCTYPE svg PUBLIC \"-//W3C//DTD SVG 1.1//EN\" \"http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd\"><svg xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" version=\"1.1\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\"><path d=\"M20.5,11H19V7C19,5.89 18.1,5 17,5H13V3.5A2.5,2.5 0 0,0 10.5,1A2.5,2.5 0 0,0 8,3.5V5H4A2,2 0 0,0 2,7V10.8H3.5C5,10.8 6.2,12 6.2,13.5C6.2,15 5,16.2 3.5,16.2H2V20A2,2 0 0,0 4,22H7.8V20.5C7.8,19 9,17.8 10.5,17.8C12,17.8 13.2,19 13.2,20.5V22H17A2,2 0 0,0 19,20V16H20.5A2.5,2.5 0 0,0 23,13.5A2.5,2.5 0 0,0 20.5,11Z\" /></svg>",
    "pngs": {
        "128": "data:image/png;base64,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",
        "32": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAWfwAAFn8BpBO6vwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAF7SURBVFiF7Za/SsRAEIc/YzwUCwVFEK3Ot1DwRWzsLUTBVsE/b6AgKJ6NhWCvYK2FpYWFGDiwUJtTEIvI3Wmxe03ITDYm2Wv8wUBgdna+neywA+6aBS6AT+ADaAATOeILaQp4A34S9giM+gA4TEnes80iGweO6+YV34IPgGHFN+IDoDINWFsBloG6sG4MGbaN6YykuphLegCcaRAbyBesLFvSAJoeAG41gK4HgBcpeYC5A31T37vgHyAE3u13DU8Pi6Y6cET5XRAD19augC0yDrtbAUTaUy7OEzVM71YNcaJV4dwDQEvrgo5GV5JCCWCQgoOGoy4lxzp+3oeZZOJxYA9T/jKTtYHI2j2wD0yCeYgimzzAjN5hRtn+oldgOs0RIk9BXpT3tE3gxsYtIpwqr1z+YQdYxXRHTzVgxzFeHEhcAbaV+OOqAWLMVCxprijAc0bwkxZs9ZWxx50UGACnGZt/OwDEGf6G5hzCXCapEg8OAC0hNgLWUAbfX5c7Xbog6LCbAAAAAElFTkSuQmCC",
        "24": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAQ3wAAEN8BdFVeMAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAE9SURBVEiJ1dU7SgRBEAbgj1UMFVR8YGYooolgIgiCsWKoiZGhF1AQD+ABBD2CmSYKYmKwiY/EwD2AJoKoGCi7azC7sDY9Mww7Bv5QNFRV/39XP6rJxhhO8IoHrObkF8Ylmh32hdmyyIcC8rbtFSGpZMQGC/qj6G2NC5gKYiMpc6axFfjecYa32IRd8a0oajX0xwReShJoYj0kryi4pzkYjgn8Kf6/QA9OcYQrTGK8C74BzGNO0l6ew4Q+3CjnRn1jpScQqOMDa11U0UYFM7EzeCqBvI2JmMBiiQLnoWMZn8o5gwuMwiGOUUWjS9J9yU381R3K6kNNbIdbkvfQPiUfzBI2cJuTH0Xaahot4k7kvZNoBY0U4arkT+7EFw4yFluPCdynJNdS/I8ZAncxgU1J2WElaZXF/C/YwXUY+AG1rqwFMTDOiwAAAABJRU5ErkJggg==",
        "16": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAALQAAAC0ABGxbo1gAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAADZSURBVDiNldIxTsNAEAXQpwRFSPQgKkRBLsMFOEHScYBIXCDHgA5RcBJqKGjoICRIkCh2mqRYIy2DsfGXptj9f/7sfg2/McAdlrhGv0bTiAtsszpvEvdq7g7D+aht4gRvWFS1Ci9YZdwrLqPBOjS01Sx+Yb/tiQE/9HUZdEIfBR5whoN/9GylzI7xnBNDbHTL4ya6P3U0+MybT1F2NLjdw0halrG0xm0opV34wP13KLEKPP6RyVd0jIIXnFTcUEq80aAIgqvATwP/npO9SlBmd4tgMA/Dpjm5A0zncdXNyOYbAAAAAElFTkSuQmCC"
    }
};

const onError = msg => {
    console.error(chalk.bold.red(`${msg || 'Terminating'}`));
    process.exit(1);
};

const onDone = dir => {
    spinner.stop(true);
    console.log(chalk.bold.green(`DONE! `) + "Your extension starter is ready.");
    console.log(chalk.bold.green('What Next: ') + `Open ${dir} in your favorite web IDE`);
    process.exit(0);
};

const createDir = path => {
    // doesn't exist
    if (!fs.existsSync(path)) {
        fs.mkdirSync(path);
        return true;
    }
    // check if empty
    return !fs.readdirSync(path).length;
};

const generateDirectoryName = name => {
    return name.toLowerCase()
        .replace(/[\u{0080}-\u{FFFF}]/gu, "")
        .replace(/ /g, "-");
}

const writeImage = (filename, data) => {
    fs.writeFileSync(filename, data.replace(/^data:image\/png;base64,/, ""), 'base64');
};

const generateFiles = ({name, description, homepage, version}) => {
    return {
        messages: {
            "appName": {"message": name},
            "appShortName": {"message": name},
            "appDescription": {"message": description},
        },
        manifest: {
            "name": "__MSG_appName__",
            "short_name": "__MSG_appShortName__",
            "description": "__MSG_appDescription__",
            "homepage_url": homepage || "https://chrome.google.com/webstore/",
            "version": version,
            "version_name": version,
            "manifest_version": 2,
            "default_locale": "en",
            "minimum_chrome_version": "31",
            "incognito": "split",
            "permissions": [],
            "icons": {
                "128": "icons/128x128.png"
            },
            "background": {
                "scripts": ["background.js"],
                "persistent": false
            },
            "browser_action": {
                "default_icon": {
                    "16": "icons/16x16.png",
                    "24": "icons/24x24.png",
                    "32": "icons/32x32.png"
                },
                "default_title": "__MSG_appName__"
            }
        },
        pkg: {
            name, description, version, homepage,
            author: "ENTER NAME HERE",
            repository: {type: "git", url: "ENTER GIT REPO URL"},
            "scripts": {
                "start": "xt-build -e dev -w",
                "build": "xt-build -e prod",
                "clean": "xt-clean",
                "docs": "xt-docs",
                "test": "xt-test",
            },
            "babel": {
                "presets": [
                    "env"
                ]
            },
            "eslintIgnore": [
                "test/**/*"
            ],
            "devDependencies": {
                "extension-cli": "latest",
            },
            "xtdocs": {
                "source": {"include": ["README.md", "src"]},
                "templates": {
                    "systemName": {name},
                    "systemSummary": {description},
                    "systemColor": "#4CAF50"
                }
            },
            "xtbuild": {
                "js_bundles": [
                    {
                        "name": "background",
                        "src": "./src/**/*.js"
                    }
                ]
            }
        },
        background: {code: "window.alert('Greetings from background!\nEdit Me!');"}
    }
};

/**
 * Run the setup script
 */
(async () => {

    const {name, description, homepage} = await prompts(questions);
    const dirname = generateDirectoryName(name);
    const dir = path.join(process.cwd(), `/${dirname}`);

    if (!createDir(dir)) {
        return onError(`Cannot create directory: ${dirname} ` +
            'because it already exists, is not empty, or is not writable.');
    }

    console.log(`Creating extension ${name} in directory ${chalk.bold.green(dirname)}...`);
    const {messages, manifest, pkg, background} = generateFiles({...{name, description, homepage}, version: '0.0.1'});

    spinner.start();

    // SETUP files structure and generate starter files
    createDir(dir + '/assets');
    createDir(dir + '/assets/img');
    fs.writeFileSync(dir + '/assets/icon.svg', images.svg);
    Object.keys(images.pngs).map(size => {
        writeImage(`${dir}/assets/img/${size}x${size}.png`, images.pngs[size])
    });
    createDir(dir + '/assets/locales');
    createDir(dir + '/assets/locales/en');
    fs.writeFileSync(
        dir + '/assets/locales/en/messages.json',
        JSON.stringify(messages, null, 4));
    createDir(dir + '/src');
    fs.writeFileSync(
        dir + '/src/manifest.json',
        JSON.stringify(manifest, null, 4));
    fs.writeFileSync(
        dir + '/src/index.js',
        background.code);
    createDir(dir + '/test');
    fs.writeFileSync(
        dir + '/package.json',
        JSON.stringify(pkg, null, 4));

    spinner.stop(true);
    console.log("Installing packages - this may take a while...");

    // RUN NPM install
    spinner.start();
    exec('npm install', {cwd: dir},
        (error, stdout, stderr) => {
            stdout.write(data.toString());
            stderr.write(data.toString());
        }).on('exit', code => {
        onDone(dir)
    });
})();
