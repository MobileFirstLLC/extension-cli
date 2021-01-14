const Utilities = require('../cli/utilities').Utilities;

const expect = require('chai').expect;

describe('Test utility functions', () => {

    describe('generateDirectoryName...', () => {

        it('...returns lowercase name', async () => {
            expect(Utilities.generateDirectoryName('HELLO WORLD'))
                .to.equal('hello-world');
            expect(Utilities.generateDirectoryName('my app name'))
                .to.equal('my-app-name');
            expect(Utilities.generateDirectoryName('APP-APP'))
                .to.equal('app-app');
            expect(Utilities.generateDirectoryName('test789'))
                .to.equal('test789');
        });

        it('...replaces special characters with hyphen', async () => {
            expect(Utilities.generateDirectoryName('MyAwesome#@Thing'))
                .to.equal('myawesome-thing');
            expect(Utilities.generateDirectoryName('````', 'xyz'))
                .to.equal('xyz');
        });

        it('...removes trailing hyphen', async () => {
            expect(Utilities.generateDirectoryName('Hello World!!!'))
                .to.equal('hello-world');
            expect(Utilities.generateDirectoryName('awesom-o app#$%%'))
                .to.equal('awesom-o-app');
        });

        it('...returns default name instead of empty string', async () => {
            expect(Utilities.generateDirectoryName('', 'foobar'))
                .to.equal('foobar');
            expect(Utilities.generateDirectoryName(null).length)
                .to.be.greaterThan(0);
        });
    });

    describe('replaceVars', () => {
        it('...replaces one variable', async () => {
            expect(Utilities.replaceVars(
                'your ${myVar}?', {myVar: 'name'}))
                .to.equal('your name?');
        });
        it('...replace two variables', async () => {
            expect(Utilities.replaceVars(
                'test ${x} ${y}', {x: '1', y: 'z'}))
                .to.equal('test 1 z');
        });
        it('...ignores non-matching keys', async () => {
            expect(Utilities.replaceVars(
                'no ${match} for this', {}))
                .to.equal('no ${match} for this');
        });
        it('...returns input if it contains no variables', async () => {
            expect(Utilities.replaceVars(
                'return me', {me: 'test'}))
                .to.equal('return me');
        });
        it('...interpolation syntax must match', async () => {
            expect(Utilities.replaceVars(
                'return {me}', {me: 'test'}))
                .to.equal('return {me}');
            expect(Utilities.replaceVars(
                'return $me2', {me2: 'test'}))
                .to.equal('return $me2');
        });
    });

    describe('keyReplace', () => {
        it('...simple override', async () => {
            let b = {x: 10};
            Utilities.keyReplace({x: 8}, b);
            expect(b.x).to.equal(8);
        });
        it('...performs union', async () => {
            let b = {y: 10};
            Utilities.keyReplace({x: 8}, b);
            expect(b).to.have.keys(['x', 'y']);
        });
        it('...replaces array', async () => {
            let b = {arr: [1, 2, 3]};
            Utilities.keyReplace({arr: [1, 2]}, b);
            expect(b.arr).to.have.length(2);
        });
        it('...replaces nested properties', async () => {
            let b = {c: {d: 8, e: 10}};
            Utilities.keyReplace({c: {e: 11}}, b);
            expect(b.c.d).to.equal(8);
            expect(b.c.e).to.equal(11);
        });
    });
});
