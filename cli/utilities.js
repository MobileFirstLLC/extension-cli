const fs = require('fs');
const path = require('path');

class Utilities {

    /**
     * Given some string value, generate another string
     * from it, such that the generated string can be
     * used as a directory name. This function will
     * normalize the input and remove special characters.
     *
     * @param name - suggested directory name
     * @param defaultName - value to return if
     *      no characters in name can be used
     * @return {string} directory name
     */
    generateDirectoryName(name, defaultName = 'extension-1') {
        return ((name || '').toLowerCase()
            .replace(/[\W_]+/g, ' ')
            .replace(/ /g, '-')
            .replace(/-$/, '')) || defaultName;
    };

    /**
     * Replace string interpolation expressions in
     * a content string.
     *
     * @param content - string with placeholder values,
     *  @example "sample ${key}"
     * @param vars - dictionary of <K,V> pairs
     *  @example { key : "value" }
     * @return {string} -
     *  @example "sample value"
     */
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

    /**
     * Given two objects
     * - add all keys from parent to child
     * - override parent keys with child keys
     *
     * in other words: a union of child and
     * parent with child values overriding
     * all shared keys.
     *
     * This operation happens in place and
     * result will be stored in parent object.
     *
     * @example
     * let child = {a:1, b:5, c:{x:1}}
     * let parent = {b:8, c:{y:9}}

     * // expected result (parent):
     * // {a:1, b:8, c:{x:1, y:9}}
     *
     * @param child - source object
     * @param parent - parent object
     */
    keyReplace(child, parent) {
        for (let key in child) {
            if (!child.hasOwnProperty(key)) continue;
            if (Array.isArray(child[key])) {
                parent[key] = child[key];
                continue;
            }
            if (typeof child[key] !== 'object') {
                parent[key] = child[key];
                continue;
            }
            if (!parent[key]) parent[key] = {};
            this.keyReplace(child[key], parent[key]);
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
