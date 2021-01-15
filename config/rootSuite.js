const sinon = require('sinon');
const chrome = require('sinon-chrome');
const chai = require('chai');
const sandbox = sinon.createSandbox();
const argv = require('yargs').argv;
const chaiAsPromised = require('chai-as-promised');
const texts = require('../config/texts').xtTest;

require('jsdom-global')();

/**
 * Setup unit test environment
 * and simulate window
 */
before(function () {
    process.env.NODE_ENV = 'test';
    chai.use(chaiAsPromised);
    global.sinon = sinon;
    global.chrome = chrome;
    global.chai = chai;
    global.expect = chai.expect;
    global.sandbox = sandbox;
    window.sandbox = sandbox;
    window.chrome = chrome;
    console.log(texts.onRootSetup(
        'window,chrome,chai,expect,sandbox(sinon)'
            .split(',')));
});

/**
 * Clean up after every test
 */
// eslint-disable-next-line no-undef
afterEach(function () {
    chrome.flush();
    sandbox.restore();
});

/**
 * Clean up after all tests
 */
// eslint-disable-next-line no-undef
after(function () {
    if (argv.watch) return;
    delete window.chrome;
    delete global.sinon;
    delete global.chrome;
    delete global.jsdom;
    delete global.chai;
    delete global.expect;
    delete global.mouseEvent;
    delete global.dispatchEvent;
});

/**
 * Simulate window mouse event so mouse events
 * can be fired during unit testing.
 */
global.mouseEvent = function (type, sx, sy, cx, cy) {
    let evt;

    const e = {
        bubbles: true,
        cancelable: (type !== 'mousemove'),
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

    if (typeof (document.createEvent) === 'function') {
        evt = document.createEvent('MouseEvents');
        evt.initMouseEvent(type,
            e.bubbles, e.cancelable, e.view, e.detail,
            e.screenX, e.screenY, e.clientX, e.clientY,
            e.ctrlKey, e.altKey, e.shiftKey, e.metaKey,
            e.button, document.body.parentNode);
    } else if (document.createEventObject) {
        evt = document.createEventObject();
        for (const prop in e) {
            evt[prop] = e[prop];
        }
        evt.button = {0: 1, 1: 4, 2: 2}[evt.button] || evt.button;
    }
    return evt;
};

/**
 * Simulate dispatching an event on some DOM element
 * @param elem - element to dispatch event on
 * @param evt - Event to dispatch
 */
global.dispatchEvent = function (elem, evt) {
    if (elem.dispatchEvent) {
        elem.dispatchEvent(evt);
    } else if (elem.fireEvent) {
        elem.fireEvent('on' + evt.type, evt);
    }
    return evt;
};
