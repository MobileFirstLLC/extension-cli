const sinon = require('sinon');
const chrome = require('sinon-chrome');
const chai = require('chai');
const chalk = require('chalk');
const sandbox = sinon.createSandbox();
const argv = require('yargs').argv;
const chaiAsPromised = require('chai-as-promised');
const jsdom = require('jsdom-global')();

before(function () {
    process.env.NODE_ENV = 'test';
    chai.use(chaiAsPromised);
    global.sinon = sinon;
    global.chrome = chrome;
    window.chrome = chrome;
    global.chai = chai;
    global.expect = chai.expect;
    global.sandbox = sandbox;
    window.sandbox = sandbox;
    console.log(["ENV: ",
        chalk.bold.bgGreen(" window "),
        chalk.bold.bgGreen(" chrome "),
        chalk.bold.bgGreen(" chai "),
        chalk.bold.bgGreen(" expect "),
        chalk.bold.bgGreen(" sandbox[sinon] ")
    ].join(" ") + "\n")
});

beforeEach(function () {
    chrome.flush();
    sandbox.restore();
});

afterEach(function () {
    chrome.flush();
    sandbox.restore();
});

after(function () {
    if (argv.watch) return;
    delete global.sinon;
    delete global.chrome;
    delete window.chrome;
    delete global.jsdom;
    delete global.chai;
    delete global.expect;
    delete global.mouseEvent;
    delete global.dispatchEvent;
});

global.mouseEvent = function (type, sx, sy, cx, cy) {
    var evt;
    var e = {
        bubbles: true,
        cancelable: (type != "mousemove"),
        view: window,
        detail: 0,
        screenX: sx,
        screenY: sy,
        clientX: cx,
        clientY: cy,
        ctrlKey: false,
        altKey: false,
        shiftKey: false,
        metaKey: false,
        button: 0,
        relatedTarget: undefined
    };
    if (typeof (document.createEvent) == "function") {
        evt = document.createEvent("MouseEvents");
        evt.initMouseEvent(type,
            e.bubbles, e.cancelable, e.view, e.detail,
            e.screenX, e.screenY, e.clientX, e.clientY,
            e.ctrlKey, e.altKey, e.shiftKey, e.metaKey,
            e.button, document.body.parentNode);
    } else if (document.createEventObject) {
        evt = document.createEventObject();
        for (prop in e) {
            evt[prop] = e[prop];
        }
        evt.button = {0: 1, 1: 4, 2: 2}[evt.button] || evt.button;
    }
    return evt;
};

global.dispatchEvent = function (el, evt) {
    if (el.dispatchEvent) {
        el.dispatchEvent(evt);
    } else if (el.fireEvent) {
        el.fireEvent('on' + type, evt);
    }
    return evt;
};
