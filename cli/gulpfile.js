const gulp = require('gulp');
const del = require('del');
const chalk = require('chalk');
const gulpChange = require('gulp-change');
const paths = require('../config/build.json');
const plugins = require('gulp-load-plugins')();
const webpack = require('webpack-stream');
const sass = require('gulp-sass')(require('sass'));
const Utilities = require('./utilities').Utilities;
const argv = require('yargs').argv;
const {prod: isProd, firefox: isFirefox, pkg: pkgPath, config} = argv;

/** helper method to ensure array type */
const ensureArray = path => Array.isArray(path) ? path : [path];

/** read project package.json **/
const pkg = Utilities.readJSON(pkgPath);

/** read project's config file, if specified **/
let customPaths = null;

if (Utilities.fileExists(config)) {
    // if config is a file
    customPaths = Utilities.readJSON(config);
} else if (pkg.xtbuild !== undefined) {
    // otherwise config should be specified in package.json
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

const script = ({src, name, mode}, done = _ => true) => {

    const webpackOptions = {
        // use mode if specified explicitly; otherwise choose by --env
        mode: mode || (isProd ? 'production' : 'development'),
        // match sourcemap name with configured js file name
        output: {filename: `${name}.js`},
        // use source map with dev builds only
        devtool: isProd ? undefined : 'cheap-source-map'
    };

    return gulp.src(src)
        .pipe(webpack(webpackOptions))
        .on('error', (err) => {
            console.log(err.toString());
            this.emit('end');
        })
        .pipe(plugins.rename(path => {
            path.dirname = '';
            path.basename = name;
        }))
        .pipe(gulp.dest(paths.dist))
        .on('end', done);
};

const style = ({src, name}, done = _ => true) => {
    return gulp.src(src)
        // convert to css
        .pipe(sass().on('error', sass.logError))
        // concatenate multiple src files
        .pipe(plugins.concat(`${name}.css`))
        // minify
        .pipe(plugins.cleanCss())
        // rename to user-specified name
        .pipe(plugins.rename((path) => {
            path.dirname = '';
            path.basename = name;
        }))
        .pipe(gulp.dest(paths.dist))
        .on('end', done);
};

const copy = (src, done = _ => true) => {
    // nested copy specified using glob pattern
    if (src.endsWith('*')) {
        return gulp.src(src, {base: 'src'})
            .pipe(gulp.dest(paths.dist))
            .on('end', done);
    }

    // copy single file or directory
    return gulp.src(src)
        .pipe(plugins.rename(path => {
            path.dirname = '';
        }))
        .pipe(gulp.dest(paths.dist))
        .on('end', done);
};

const locale = (language, done = _ => true) => {
    return gulp.src(paths.locales_dir + language + '/**/*.json')
        .pipe(plugins.mergeJson({fileName: 'messages.json'}))
        .pipe(plugins.jsonminify())
        .pipe(gulp.dest(paths.dist + '/_locales/' + language))
        .on('end', done);
};

const copyManifest = done => {

    const {version} = pkg;

    const performChange = (content) => {
        let mft = JSON.parse(content);

        mft.version = version; // use version from package

        if (isFirefox && mft.firefox) mft = {...mft, ...mft.firefox};
        else if (!isFirefox && mft.chrome) mft = {...mft, ...mft.chrome};
        delete mft.chrome;
        delete mft.firefox;

        return JSON.stringify(mft);
    };

    return gulp.src(paths.manifest)
        .pipe(gulpChange(performChange))
        .pipe(plugins.jsonminify())
        .pipe(plugins.rename(path => {
            path.dirname = '';
            path.basename = 'manifest';
            path.extname = '.json';
        }))
        .pipe(gulp.dest(paths.dist))
        .on('end', done);
};

const copyAssets = done => {
    return gulp.src(paths.assets)
        .pipe(gulp.dest(paths.dist + '/assets'))
        .on('end', done);
};

const buildHtml = done => {
    return gulp.src(paths.html)
        .pipe(plugins.htmlmin({collapseWhitespace: true}))
        .pipe(plugins.rename(path => {
            path.dirname = '';
        }))
        .pipe(gulp.dest(paths.dist))
        .on('end', done);
};

const customCommands = done => {
    if (!paths.commands || !paths.commands.length) {
        return done();
    }

    return require('child_process')
        .exec(paths.commands, done);
};

const release = done => {
    if (!isProd) return done();

    return gulp.src(paths.dist + '/**/*')
        .pipe(plugins.zip(`${paths.release_name || 'release'}.zip`))
        .pipe(gulp.dest(paths.releases))
        .on('end', done);
};

const dynamicFunc = (action, name) => {
    const f = action;

    Object.defineProperty(f, 'name', {
        value: name,
        writable: false
    });
    return f;
};

const scripts = paths.js_bundles.map(obj =>
    dynamicFunc(_ => script(obj), `${obj.name}.js`));

const styles = paths.scss_bundles.map(obj =>
    dynamicFunc(_ => style(obj), `${obj.name}.css`));

const locales = paths.locales_list.map(lang =>
    dynamicFunc(_ => locale(lang), `locale ${lang}`));

const copies = ensureArray(paths.copyAsIs).map(obj =>
    dynamicFunc(_ => copy(obj), `copy ${obj}`));

const watch = () => {
    console.log(chalk.bold.yellow('watching...'));
    if (scripts.length) {
        gulp.watch(ensureArray(paths.js), gulp.parallel(...scripts));
    }
    if (styles.length) {
        gulp.watch(ensureArray(paths.scss), gulp.parallel(...styles));
    }
    if (copies.length) {
        gulp.watch(ensureArray(paths.copyAsIs), gulp.parallel(...copies));
    }
    if (paths.locales_list.length) {
        gulp.watch(paths.locales_dir + '**/*.json', gulp.parallel(...locales));
    }
    gulp.watch(paths.manifest, copyManifest);
    gulp.watch(ensureArray(paths.html), buildHtml);
    gulp.watch(ensureArray(paths.assets), copyAssets);
    // gulp.watch(paths.commands_watch_path || '', customCommands);
};

const build = gulp.series(
    clean,
    gulp.parallel(
        ...scripts,
        ...styles,
        ...copies,
        ...locales,
        copyManifest,
        copyAssets,
        buildHtml
    ),
    customCommands,
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
