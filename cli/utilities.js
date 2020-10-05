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

    createDir(dirPath) {
        // doesn't exist
        if (!fs.existsSync(dirPath)) {
            fs.mkdirSync(dirPath);
            return true;
        }
        // check if empty
        return !fs.readdirSync(dirPath).length;
    };

    readFile(filePath) {
        return fs.readFileSync(filePath, 'utf8');
    }

    readJSON(filePath) {
        return JSON.parse(this.readFile(filePath));
    }

    fileExists(filePath) {
        return fs.existsSync(filePath);
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

    keyReplace(src, target) {
        for (let key in src) {
            if (!src.hasOwnProperty(key)) continue;
            if (typeof src[key] !== 'object') {
                target[key] = src[key];
                continue;
            }
            if (!target[key]) target[key] = {};
            this.keyReplace(src[key], target[key]);
        }
    }

    iterateConfigs(defaultConfig, projectConfig) {
        if (!projectConfig) return defaultConfig;
        let temp = Object.assign({}, defaultConfig);

        for (let k in projectConfig) {
            if (!projectConfig.hasOwnProperty(k)) continue;
            if (!temp[k]) temp[k] = {};
            this.keyReplace(projectConfig[k], temp[k]);
        }
        return temp;
    }
}

exports.Utilities = new Utilities();
