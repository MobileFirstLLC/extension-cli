const chalk = require('chalk');
const fs = require('fs');
const path = require('path');

class Utilities {

    constructor() {

    }

    generateDirectoryName(name) {
        return name.toLowerCase()
            .replace(/[\W_]+/g, ' ')
            .replace(/ /g, '-');
    };

    replaceVars(content, vars) {
        let temp = content.toString();

        Object.keys(vars).map(key => {
            const re = new RegExp('\\$\{' + key + '\}', 'gi');

            temp = temp.replace(re, vars[key]);
            return true;
        });
        return temp;
    };

    copyFolderSync(from, to) {
        try {
            fs.mkdirSync(to);
        } catch (e) {
        }
        fs.readdirSync(from).forEach((element) => {
            const stat = fs.lstatSync(path.join(from, element));

            if (stat.isFile()) {
                fs.copyFileSync(path.join(from, element), path.join(to, element));
            } else if (stat.isSymbolicLink()) {
                fs.symlinkSync(fs.readlinkSync(path.join(from, element)), path.join(to, element));
            } else if (stat.isDirectory()) {
                this.copyFolderSync(path.join(from, element), path.join(to, element));
            }
        });
    }

    createDir(dirPath, terminateOnError = false) {
        // doesn't exist
        if (!fs.existsSync(dirPath)) {
            fs.mkdirSync(dirPath);
            return true;
        }
        // check if empty
        const success = !fs.readdirSync(dirPath).length;

        // handle error
        if (!success && terminateOnError) {
            return this.onError(`Cannot create directory: ${dirPath} ` +
                'because it already exists, is not empty, or is not writable.');
        }

        return success;
    };

    readFile(filePath) {
        return fs.readFileSync(filePath, 'utf8');
    }

    writeFile(filePath, content) {
        fs.writeFileSync(filePath, content);
    }

    copyFile(from, to) {
        fs.createReadStream(from)
            .pipe(fs.createWriteStream(to));
    }

    readAndReplaceTextFile(path, vars) {
        return this.replaceVars(this.readFile(path), vars);
    }

    readAndReplaceJSONFile(path, vars) {
        return JSON.stringify(JSON.parse(this.readAndReplaceTextFile(path, vars)), null, 4);
    }

    onError(msg) {
        console.error(chalk.bold.red(`${msg || 'Terminating'}`));
        process.exit(1);
    };

}

exports.Utilities = new Utilities();
