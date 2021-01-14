const Utilities = require('../cli/utilities').Utilities;

const expect = require('chai').expect;

describe('Test utility functions', () => {

    describe('generateDirectoryName...', () => {

        it('...returns lowercase name without special characters', async () => {
            expect(Utilities.generateDirectoryName('Hello World')).to.equal('hello-world');
            expect(Utilities.generateDirectoryName('Hello World!!!')).to.equal('hello-world');
            expect(Utilities.generateDirectoryName('MyAwesome#@Thing')).to.equal('myawesome-thing');
            expect(Utilities.generateDirectoryName('````', 'foobar')).to.equal('foobar');
        });

        it('...returns default name on fallthrough', async () => {
            expect(Utilities.generateDirectoryName('', 'foobar')).to.equal('foobar');
            expect(Utilities.generateDirectoryName(null).length).to.be.greaterThan(0);
        });
    });

    describe('replaceVars', () => {
        it('...replaces string interpolation with actual values', async () => {
            expect(Utilities.replaceVars('test ${x} ${y}', {x: '1', y: 'z'})).to.equal('test 1 z');
        });
    });

});
