/**
 * @description
 * This rootsuite sets up unit testing environment
 */

const sinon = require('sinon');
const chrome = require('sinon-chrome');
const chai = require('chai');
const argv = require('yargs').argv;
const texts = require('./texts').xtTest;

/**
 * Create sinon sandbox
 *
 * Sandboxes removes the need to keep track of
 * every fake created, which greatly simplifies cleanup.
 *
 * @see {@link https://sinonjs.org/releases/latest/sandbox/}
 */
const sandbox = sinon.createSandbox();

/**
 * Setup global DOM
 */
global.jsdom = require('jsdom-global')();

/**
 * Before running any tests -
 * setup the test environment
 */
before(function () {
    process.env.NODE_ENV = 'test';
    global.sinon = sinon;
    global.chrome = chrome;
    global.chai = chai;
    global.expect = chai.expect;
    global.sandbox = sandbox;
    window.sandbox = sandbox;
    window.chrome = chrome;

    // output list of namespaces that
    // are available in test environment
    console.log(texts.onRootSetup(
        'window,chrome,chai,expect,sandbox(sinon)'
            .split(',')));
});

/**
 * After each test -
 * reset chrome and sandbox
 */
// eslint-disable-next-line no-undef
afterEach(function () {
    // noinspection JSUnresolvedFunction
    chrome.flush();
    sandbox.restore();
});

/**
 * After all tests -
 * Clean up everything that was initially set up
 */
// eslint-disable-next-line no-undef
after(function () {
    // important!
    // do not clean when running in watch mode
    if (argv.watch) return;

    delete global.jsdom;
    delete global.sinon;
    delete global.chrome;
    delete global.chai;
    delete global.expect;
    delete global.sandbox;
    delete window.sandbox;
    delete window.chrome;
    delete global.mouseEvent;
    delete global.dispatchEvent;
});

/**
 * Enable mouse events globally during unit testing
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent}
 *
 * @param {String} type - event type
 * @param {number} sx - screen X coordinate
 * @param {number} sy - screen Y coordinate
 * @param {number} cx - client X coordinate
 * @param {number} cy - client Y coordinate
 * @return {Event} - the event
 */
global.mouseEvent = function (type, sx, sy, cx, cy) {
    let _event;

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
        _event = document.createEvent('MouseEvents');
        _event.initMouseEvent(type,
            e.bubbles, e.cancelable, e.view, e.detail,
            e.screenX, e.screenY, e.clientX, e.clientY,
            e.ctrlKey, e.altKey, e.shiftKey, e.metaKey,
            e.button, document.body.parentNode);
    } else {
        // noinspection JSUnresolvedVariable
        if (document.createEventObject) {
            _event = document.createEventObject();
            for (const prop in e) {
                _event[prop] = e[prop];
            }
            _event.button = {0: 1, 1: 4, 2: 2}[_event.button] ||
                _event.button;
        }
    }
    return _event;
};

// noinspection JSValidateTypes
/**
 * Enable dispatching an event on some DOM element during unit testing
 *
 * @param {EventTarget} target - element on which to dispatch event
 * @param {Event} event - the event to dispatch
 * @return {Event} - the event
 */
global.dispatchEvent = function (target, event) {
    if (target.dispatchEvent) {
        target.dispatchEvent(event);
    } else {
        // noinspection JSUnresolvedVariable
        if (target.fireEvent) {
            target.fireEvent('on' + event.type, event);
        }
    }
    return event;
};
