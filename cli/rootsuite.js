/**
 * @description
 * This rootsuite sets up unit testing environment
 */

const sinon = require('sinon');
const chrome = require('sinon-chrome');
const chai = require('chai');
const argv = require('yargs').argv;
const texts = require('./texts').xtTest;
const enableWatch = argv.watch;

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
    global.chai = chai;
    global.expect = chai.expect;
    global.sandbox = sandbox;
    window.sandbox = sandbox;
    global.chrome = chrome;
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
afterEach(function () {
    chrome.flush();
    sandbox.restore();
});

/**
 * After all tests -
 * Clean up everything that was initially set up
 */
after(function () {
    // important! do not clean when running in watch mode
    if (enableWatch) return;

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
 * @param {Object} props - optional properties
 *  @see {@link https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/MouseEvent}
 * @return {Event} - the event
 */
global.mouseEvent = function (type, props) {
    return new MouseEvent(type, {...props});
};

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
    } else if (target.fireEvent) {
        target.fireEvent('on' + event.type, event);
    }
    return event;
};
