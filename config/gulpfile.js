const fs = require('fs');
const gulp = require('gulp');
const del = require('del');
const chalk = require('chalk');
const gulpChange = require('gulp-change');
const paths = require('./build.json');
const plugins = require('gulp-load-plugins')();
const webpack = require('webpack-stream');
const argv = require('yargs').argv;
const isProd = argv.prod;
const isFirefox = argv.firefox;

/** switch to project working directory **/
process.chdir(paths.projectRootDir);

/** helper method to ensure array type */
const getArray = path => Array.isArray(path) ? path : [path];

/** read project package.json **/
const pkg = JSON.parse(fs.readFileSync(argv.pkg, 'utf8'));

/** read project's config file, if specified **/
let customPaths = null;
if (fs.existsSync(argv.config)) {
    // if config is a file
    customPaths = JSON.parse(fs.readFileSync(argv.config, 'utf8'));
} else if (pkg.xtbuild !== undefined) {
    // if config is specified in package.json
    customPaths = pkg.xtbuild;
}

/** replace default configs with project-level configs **/
if (customPaths) {
    for (let key in customPaths) {
        if (customPaths.hasOwnProperty(key)) {
            paths[key] = customPaths[key];
        }
    }
}

const clean = () => del([paths.dist + '/*']);

const scripts = done => {
    const _bundles = (Array.isArray(paths.js_bundles) ? paths.js_bundles : [paths.js_bundles]);

    let bundles = [..._bundles];
    const webpackOptions = {
        mode: isProd ? "production" : "development",
        devtool: 'source-map'
    };

    const buildScript = () => {
        if (!bundles.length) {
            return typeof done !== 'function' || done();
        }

        const b = bundles.pop();

        console.log(chalk.bold.yellow(b.src));
        return gulp.src(b.src)
            .pipe(webpack(webpackOptions))
            .on('error', (err) => {
                console.log(err.toString());
                this.emit('end');
            })
            .pipe(plugins.rename(function (path) {
                path.dirname = '';
                path.basename = b.name;
            }))
            .pipe(gulp.dest(paths.dist))
            .on('end', buildScript);
    };

    buildScript();
};

const styles = done => {
    let bundles = Array.isArray(paths.scss_bundles) ?
        paths.scss_bundles : [{src: paths.scss, name: 'styles.css'}],
        count = bundles.length,
        isDone = false;

    return !count ? done() :
        bundles.map(b => {
            gulp.src(b.src)
                .pipe(plugins.sass())
                .pipe(plugins.cleanCss())
                .pipe(plugins.rename(function (path) {
                    path.dirname = '';
                    path.basename = b.name;
                }))
                .pipe(gulp.dest(paths.dist))
                .on('end', function () {
                    if ((--count === 0) && !isDone) {
                        isDone = true;
                        return typeof done !== 'function' || done();
                    }
                    return true;
                });
        });
};

const copyAs = done => {

    const _filesToCopy = (Array.isArray(paths.copyAsIs) ?
        paths.copyAsIs : [paths.copyAsIs]);

    let copyList = [..._filesToCopy];

    const doCopy = (src, callback) => {
        if (!src || !src.length) {
            callback();
        } else if (src.endsWith('*')) {
            gulp.src(src, {base: 'src'})
                .pipe(gulp.dest(paths.dist))
                .on('end', callback);
        } else {
            gulp.src(src)
                .pipe(plugins.rename(path => {
                    path.dirname = '';
                }))
                .pipe(gulp.dest(paths.dist))
                .on('end', callback);
        }
    };

    (function processList() {
        if (!copyList.length) {
            done();
        } else {
            doCopy(copyList.pop(), processList);
        }
    }());
};

const copyManifest = () => {

    const {version} = pkg;

    const performChange = (content) => {
        let mft = JSON.parse(content);

        if (isFirefox && mft.firefox) mft = {...mft, ...mft.firefox};
        else if (!isFirefox && mft.chrome) mft = {...mft, ...mft.chrome};
        delete mft.chrome;
        delete mft.firefox;

        return JSON.stringify(mft);
    }

    return gulp.src(paths.manifest)
        .pipe(plugins.jsonEditor({version}))
        .pipe(gulpChange(performChange))
        .pipe(plugins.jsonminify())
        .pipe(gulp.dest(paths.dist));
};

const copyAssets = () => {
    return gulp.src(paths.assets)
        .pipe(gulp.dest(paths.dist + '/assets'));
};

const locales = done => {
    let bundles = Array.isArray(paths.locales_list) ?
        paths.locales_list : [],
        onDone = () => typeof done !== 'function' || done(),
        count = bundles.length,
        isDone = false;

    return !count ? onDone() : paths.locales_list.map(language => {
        let root = paths.locales_dir + language;

        if (fs.existsSync(root)) {
            return gulp.src(root + '/**/*.json')
                .pipe(plugins.mergeJson({fileName: 'messages.json'}))
                .pipe(plugins.jsonminify())
                .pipe(gulp.dest(paths.dist + '/_locales/' + language))
                .on('end', function () {
                    if ((--count === 0) && !isDone) {
                        isDone = true;
                        return onDone();
                    }
                    return true;
                });
        }

        return true;
    });
};

const buildHtml = () => {
    return gulp.src(paths.html)
        .pipe(plugins.htmlmin({collapseWhitespace: true}))
        .pipe(plugins.rename(path => {
            path.dirname = '';
        }))
        .pipe(gulp.dest(paths.dist));
};

const custom_commands = done => {
    return (!paths.commands.length) ?
        done() :
        require('child_process')
            .exec(paths.commands, () => {
                done();
            });
};

const release = done => {
    return isProd ?
        gulp.src(paths.dist + '/**/*')
            .pipe(plugins.zip(
                `${paths.release_name || 'release'}.zip`
            ))
            .pipe(gulp.dest(paths.releases))
            .on('end', done) :
        done();
};

const watch = () => {
    console.log('watching...');
    gulp.watch(getArray(paths.js), scripts);
    gulp.watch(getArray(paths.scss), styles);
    gulp.watch(getArray(paths.html), buildHtml);
    gulp.watch(getArray(paths.assets), copyAssets);
    gulp.watch([paths.locales_dir + '**/*.json'], locales);
    gulp.watch(paths.manifest, copyManifest);
    gulp.watch(getArray(paths.copyAsIs), copyAs);
    gulp.watch(getArray(paths.commands_watch_path || ''), custom_commands);
};

const build = gulp.series(
    clean,
    gulp.series(
        scripts,
        styles,
        copyAs,
        copyManifest,
        copyAssets,
        locales,
        buildHtml,
        custom_commands
    ),
    release
);

/*
 * Define default task that can be called by just running `gulp` from cli
 */
exports.default = build;

/*
 * If watch flag is defined, run build and keep watching
 */
exports.watch = gulp.series(build, watch);
