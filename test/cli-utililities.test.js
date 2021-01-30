const Utilities = require('../cli/utilities').Utilities;
const sinon = require('sinon');
const expect = require('chai').expect;
const fs = require('fs');

describe('Test utility functions', () => {

    /**
     * Stub Node.js IO methods
     */
    // eslint-disable-next-line no-undef
    beforeEach(() => {
        sinon.stub(fs, 'readFileSync');
        sinon.stub(fs, 'existsSync');
        sinon.stub(fs, 'mkdirSync');
        sinon.stub(fs, 'readdirSync');
        sinon.stub(fs, 'writeFileSync');
        sinon.stub(fs, 'createReadStream');
        sinon.stub(fs, 'createWriteStream');
        sinon.stub(fs, 'lstatSync');
        sinon.stub(fs, 'copyFileSync');
        sinon.stub(fs, 'symlinkSync');
        sinon.stub(fs, 'readlinkSync');

        fs.createReadStream.returns({
            pipe: () => true
        });
    });

    /**
     * Restore stubbed IO methods
     */
    // eslint-disable-next-line no-undef
    afterEach(() => {
        fs.existsSync.restore();
        fs.mkdirSync.restore();
        fs.readdirSync.restore();
        fs.readFileSync.restore();
        fs.writeFileSync.restore();
        fs.createReadStream.restore();
        fs.createWriteStream.restore();
        fs.lstatSync.restore();
        fs.copyFileSync.restore();
        fs.symlinkSync.restore();
        fs.readlinkSync.restore();
    });

    describe('generateDirectoryName...', () => {

        it('...returns lowercase name', () => {
            expect(Utilities.generateDirectoryName('HELLO WORLD'))
                .to.equal('hello-world');
            expect(Utilities.generateDirectoryName('my app name'))
                .to.equal('my-app-name');
            expect(Utilities.generateDirectoryName('APP-APP'))
                .to.equal('app-app');
            expect(Utilities.generateDirectoryName('test789'))
                .to.equal('test789');
        });

        it('...replaces special characters with hyphen', () => {
            expect(Utilities.generateDirectoryName('MyAwesome#@Thing'))
                .to.equal('myawesome-thing');
            expect(Utilities.generateDirectoryName('````', 'xyz'))
                .to.equal('xyz');
        });

        it('...removes trailing hyphen', () => {
            expect(Utilities.generateDirectoryName('Hello World!!!'))
                .to.equal('hello-world');
            expect(Utilities.generateDirectoryName('awesom-o app#$%%'))
                .to.equal('awesom-o-app');
        });

        it('...returns default name instead of empty string', () => {
            expect(Utilities.generateDirectoryName('', 'foobar'))
                .to.equal('foobar');
            expect(Utilities.generateDirectoryName(null).length)
                .to.be.greaterThan(0);
        });
    });

    describe('replaceVars', () => {
        it('...replaces one variable', () => {
            expect(Utilities.replaceVars(
                'your ${myVar}?', {myVar: 'name'}))
                .to.equal('your name?');
        });
        it('...replace two variables', () => {
            expect(Utilities.replaceVars(
                'test ${x} ${y}', {x: '1', y: 'z'}))
                .to.equal('test 1 z');
        });
        it('...ignores non-matching keys', () => {
            expect(Utilities.replaceVars(
                'no ${match} for this', {}))
                .to.equal('no ${match} for this');
        });
        it('...returns input if it contains no variables', () => {
            expect(Utilities.replaceVars(
                'return me', {me: 'test'}))
                .to.equal('return me');
        });
        it('...interpolation syntax must match', () => {
            expect(Utilities.replaceVars(
                'return {me}', {me: 'test'}))
                .to.equal('return {me}');
            expect(Utilities.replaceVars(
                'return $me2', {me2: 'test'}))
                .to.equal('return $me2');
        });
    });

    describe('keyReplace', () => {
        it('...simple override', () => {
            let b = {x: 10};

            Utilities.keyReplace({x: 8}, b);
            expect(b.x).to.equal(8);
        });
        it('...performs union', () => {
            let b = {y: 10};

            Utilities.keyReplace({x: 8}, b);
            expect(b).to.have.keys(['x', 'y']);
        });
        it('...replaces array', () => {
            let b = {arr: [1, 2, 3]};

            Utilities.keyReplace({arr: [4, 5]}, b);
            expect(b.arr).to.have.length(2)
                .and.to.contain(4).and.to.contain(5);
        });
        it('...replaces nested properties', () => {
            let b = {c: {d: 8, e: 10}};

            Utilities.keyReplace({c: {e: 11}}, b);
            expect(b.c.d).to.equal(8);
            expect(b.c.e).to.equal(11);
        });

        it('...nested replace with addition', () => {
            let b = {b: 8, c: {y: 9}};

            Utilities.keyReplace({a: 1, b: 5, c: {x: 1}}, b);
            expect(b.a).to.equal(1);
            expect(b.b).to.equal(5);
            expect(b.c.x).to.equal(1);
            expect(b.c.y).to.equal(9);
        });
    });

    describe('iterateConfigs', () => {
        const defaultConfig = {name: 'my app', version: '0.0.1'};

        it('...returns default if project config is undefined', () => {
            const result = Utilities.iterateConfigs(defaultConfig, undefined);

            expect(result.name).to.equal(defaultConfig.name);
            expect(result.version).to.equal(defaultConfig.version);
            expect(Object.keys(result)).to.have.length(2);
        });

        it('...overrides defaults when override is specified', () => {
            let projectConfig = {name: 'my awesome app', version: '1.0.0'};
            const result = Utilities.iterateConfigs(defaultConfig, projectConfig);

            expect(result.name).to.equal(projectConfig.name);
            expect(result.version).to.equal(projectConfig.version);
            expect(Object.keys(result)).to.have.length(2);
        });

        it('...appends new keys when not specified in default', () => {
            let projectConfig = {special: {value: 5}};
            const result = Utilities.iterateConfigs(defaultConfig, projectConfig);

            expect(result.special.value).to.equal(projectConfig.special.value);
            expect(Object.keys(result)).to.have.length(3);
        });
    });

    describe('copyFolderSync', () => {

        it('...copies directory with files to new location', () => {
            fs.readdirSync.returns(['file1.txt', 'file2.txt']);
            fs.lstatSync.returns({isFile: () => true});
            Utilities.copyFolderSync('./test_dir', './test_dir_2');
            expect(fs.mkdirSync.calledOnce).to.equal(true);
            expect(fs.copyFileSync.calledTwice).to.equal(true);
        });

        it('...iterates nested directories recursively', () => {
            fs.readdirSync.returns(['test']);
            fs.lstatSync.onCall(0).returns({
                isFile: () => false,
                isSymbolicLink: () => false,
                isDirectory: () => true
            });
            fs.lstatSync.onCall(1).returns({
                isFile: () => false,
                isSymbolicLink: () => true
            });
            Utilities.copyFolderSync('./test_dir', './test_dir2');
            expect(fs.readdirSync.callCount).to.equal(2);
        });

        it('...does nothing when not file/dir/symlink', () => {
            sinon.spy(Utilities, 'copyFolderSync');
            fs.readdirSync.returns(['invalid']);
            fs.lstatSync.onCall(0).returns({
                isFile: () => false,
                isSymbolicLink: () => false,
                isDirectory: () => false
            });
            Utilities.copyFolderSync('a', 'b');
            expect(fs.copyFileSync.callCount).to.equal(0);
            expect(fs.symlinkSync.callCount).to.equal(0);
            expect(Utilities.copyFolderSync.callCount).to.equal(1);
        });

    });

    describe('copyFile', () => {

        it('...copies file from old location to new location', () => {
            Utilities.copyFile('./test1', './test2');
            expect(fs.createReadStream.calledOnce).to.equal(true);
            expect(fs.createWriteStream.calledOnce).to.equal(true);
        });

    });

    describe('readFile', () => {

        it('...calls read file', () => {
            Utilities.readFile('xyz');
            expect(fs.readFileSync.calledOnce).to.equal(true);
        });
    });

    describe('writeFile', () => {

        it('...calls write file', () => {
            Utilities.writeFile('xyz', 'text content...');
            expect(fs.writeFileSync.calledOnce).to.equal(true);
        });

    });

    describe('fileExists', () => {

        it('...returns true for existing file', () => {
            fs.existsSync.returns(true);
            expect(Utilities.fileExists('im_here')).to.equal(true);
        });

        it('...returns false when file does not exist', () => {
            fs.existsSync.returns(false);
            expect(Utilities.fileExists('nope')).to.equal(false);
        });

    });

    describe('createDir', () => {

        it('...will create a directory when it doesn\'t exist', () => {
            fs.existsSync.returns(false);
            const result = Utilities.createDir('my_dir');

            expect(fs.mkdirSync.calledOnce).to.equal(true);
            expect(result).to.equal(true);
        });

        it('...returns true for empty folder', () => {
            fs.existsSync.returns(true);
            fs.readdirSync.returns({length: 0});
            const result = Utilities.createDir('empty_dir');

            expect(fs.mkdirSync.notCalled).to.equal(true);
            expect(result).to.equal(true);
        });

        it('...returns false for non-empty folder', () => {
            fs.existsSync.returns(true);
            fs.readdirSync.returns({length: 1});
            expect(Utilities.createDir('non_empty_dir')).to.equal(false);
        });

    });

    describe('readJSON', () => {

        it('...returns a parsed JSON object', () => {
            fs.readFileSync.returns('{ "title" : "test" }');
            const obj = Utilities.readJSON('xyz');

            expect(obj.title).to.equal('test');
        });

        it('...throws error for non-JSON format file content', () => {
            fs.readFileSync.returns('this is some plain text');
            expect(() => Utilities.readJSON('xyz')).to
                .throw('Unexpected token');
        });

    });

    describe('readAndReplaceTextFile', () => {

        it('...replaces single variable', () => {
            fs.readFileSync.returns('Text with ${variable} in the middle!');
            const variables = {variable: 'find me'};
            const result = Utilities.readAndReplaceTextFile('some_file', variables);

            expect(result).to.contain(variables.variable);
        });

        it('...replaces multiple variables', () => {
            fs.readFileSync.returns('Some math ${a} + ${b} = ${c}');
            const math = {a: 1, b: 2, c: 3};
            const result = Utilities.readAndReplaceTextFile('my_file', math);

            expect(result).to.contain('1 + 2 = 3');
        });

    });

    describe('readAndReplaceJSONFile', () => {

        it('...replaces variables in an object', () => {
            fs.readFileSync.returns('{ "name":"${name}", "version" : "v-${version}" }');
            const values = {name: 'my_app', version: '1.0.0'};
            const jsonString = Utilities.readAndReplaceJSONFile('manifest', values);
            const obj = JSON.parse(jsonString);

            expect(obj.name).to.equal(values.name);
            expect(obj.version).to.equal('v-1.0.0');
        });

        it('...replaces nested variables', () => {
            fs.readFileSync.returns('{ "config": { "count" : "${n}" }}');
            const values = {n: 10};
            const result = Utilities.readAndReplaceJSONFile('manifest', values);

            expect(result).to.contain('10');
        });

    });
});
