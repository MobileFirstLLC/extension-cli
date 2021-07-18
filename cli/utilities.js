const fs = require('fs');
const path = require('path');

/**
 * @class
 * @classdesc Utility class provides helper methods
 * for performing commonly recurring operations such
 * as IO; and reading, writing, merging objects.
 *
 * When performing these operations, it is preferable
 * to use these utility methods to ensure same behavior
 * for these operations everywhere, and to establish one
 * place of change, should these operations change in the
 * future.
 */
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
            const re = new RegExp('\\${' + key + '}', 'gi');

            temp = temp.replace(re, vars[key]);
            return true;
        });
        return temp;
    };

    /**
     * a union of two objects, child and parent,
     * with child values overriding all shared keys.
     *
     * This operation happens in place and
     * result will be stored in parent object.
     *
     * @example
     * let child = {a:1, b:5, c:{x:1}}
     * let parent = {b:8, c:{y:9}}

     * // expected result (parent):
     * // {a:1, b:5, c:{x:1, y:9}}
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

    /**
     * Given defaultConfig and project-level config
     * replace default configs with project-specific
     * configuration.
     *
     * Any property that is specified at project level
     * but not in default config, will be added to
     * the result configuration.
     *
     * Any property that exists in default config that
     * is not overwritten at project level, will hold
     * default value in the result configuration.
     *
     * @param defaultConfig
     * @param projectConfig
     * @return {Object}
     */
    iterateConfigs(defaultConfig, projectConfig) {
        if (!projectConfig) return defaultConfig;
        let temp = Object.assign({}, defaultConfig);

        for (let k in projectConfig) {
            if (!projectConfig.hasOwnProperty(k)) continue;
            if (typeof projectConfig[k] === 'object') {
                if (!temp[k]) temp[k] = {};
                this.keyReplace(projectConfig[k], temp[k]);
            } else {
                temp[k] = projectConfig[k];
            }
        }
        return temp;
    }

    /**
     * Recursively copy a directory and all its files to a new location
     * @param from - path to current location
     * @param to - target location path
     */
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

    /**
     * Copy single file from one location to another (synchronous).
     *
     * @param from - source file path
     * @param to - target file path
     */
    copyFile(from, to) {
        fs.createReadStream(from).pipe(fs.createWriteStream(to));
    }

    /**
     * Read utf-8 encoded file (synchronous)
     * @param filePath - path to file
     * @return {string} - file contents
     */
    readFile(filePath) {
        return fs.readFileSync(filePath, 'utf8');
    }

    /**
     * Write file to disk (syncronous)
     * @param filePath - path to file
     * @param content - file contents
     */
    writeFile(filePath, content) {
        fs.writeFileSync(filePath, content);
    }

    /**
     * Check if file exists
     * @param filePath - path to file
     * @return {boolean} - true/false
     */
    fileExists(filePath) {
        return fs.existsSync(filePath);
    }

    /**
     * Create empty directory.
     *
     * @param dirPath - path to directory
     * @return {boolean} - true if exists and empty (should be
     *   writable) and false otherwise
     */
    createDir(dirPath) {
        // doesn't exist
        if (!fs.existsSync(dirPath)) {
            fs.mkdirSync(dirPath, { recursive: true });
            return true;
        }
        // check if empty
        return !fs.readdirSync(dirPath).length;
    };

    /**
     * Read JSON file
     * @param filePath - path to file
     * @return {any} - Object
     */
    readJSON(filePath) {
        return JSON.parse(this.readFile(filePath));
    }

    /**
     * Reads text file then replaces all variable placeholders, e.g. ${var1}
     * @param path - path to file
     * @param vars - variables Object <K, V>
     * @return {string} - file contents with all matched variables replaced
     */
    readAndReplaceTextFile(path, vars) {
        return this.replaceVars(this.readFile(path), vars);
    }

    /**
     * Reads JSON file then replaces all variable placeholders, e.g. ${var1}
     * @param path - path to file
     * @param vars - variables Object <K, V>
     * @return {string} - file contents with all matched variables replaced
     */
    readAndReplaceJSONFile(path, vars) {
        return JSON.stringify(JSON.parse(this.readAndReplaceTextFile(path, vars)), null, 4);
    }
}

exports.Utilities = new Utilities();
