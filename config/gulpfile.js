const webpack = require('webpack-stream');
const webpackConfig = require('./webpack.config.js');
const plugins = require('gulp-load-plugins')();
const argv = require('yargs').argv;
const gulp = require('gulp');
const del = require('del');
const fs = require('fs');
const isProd = argv.prod;
let paths = require('./build.json');

// switch to caller dir
process.chdir(paths.projectRootDir);  // try process.cwd()
const pkg = JSON.parse(fs.readFileSync('./package.json', 'utf8'));

// override default paths
let customPaths = null;
if (fs.existsSync(argv.config)) {
    customPaths = JSON.parse(fs.readFileSync(argv.config, 'utf8'));
} else if (pkg.xtbuild !== undefined) {
    customPaths = pkg.xtbuild;
}
if (customPaths) {
    for (let key in customPaths) {
        if (customPaths.hasOwnProperty(key))
            paths[key] = customPaths[key];
    }
}

///////////////////////////////

gulp.task('default', [
    'clean',
    'build-js',
    'build-css',
    'copyAsIs',
    'copy-manifest',
    'copy-images',
    'copy-locales',
    'build-html',
    'release'
]);

gulp.task('watch', ['default'], () => {
    console.log('watching...');
    gulp.watch(paths.js, ['build-js']);
    gulp.watch([paths.scss], ['build-css']);
    gulp.watch(paths.manifest, ['copy-manifest']);
    gulp.watch(paths.icons, ['copy-images']);
    gulp.watch(paths.locales + '**/*.json', ['copy-locales']);
    gulp.watch(paths.html, ['build-html']);
});

///////////////////////////////

gulp.task('clean', () => {
    return del.sync(paths.dist + '/*');
});

gulp.task('build-js', (done) => {
    let bundles = Array.isArray(paths.js_bundles) ? paths.js_bundles : [];
    let count = bundles.length;
    let isDone = false;
    let onEnd = () => {
        if ((--count === 0) && !isDone) {
            isDone = true;
            return typeof done !== 'function' || done();
        }
    };
    if (!count) return done();
    return bundles.map(bdl => {
        gulp.src(bdl.src)
            .pipe(webpack(webpackConfig), require("webpack"))
            .pipe(plugins.rename(function (path) {
                path.dirname = "";
                path.basename = bdl.name
            }))
            .pipe(gulp.dest(paths.dist))
            .on('end', onEnd);
    });
});

gulp.task('build-css', (done) => {
    let bundles = Array.isArray(paths.scss_bundles) ?
        paths.scss_bundles :
        [{ src: paths.scss, name: 'styles.css' }];
    let count = bundles.length;
    let isDone = false;
    let onEnd = () => {
        if ((--count === 0) && !isDone) {
            isDone = true;
            return typeof done !== 'function' || done();
        }
    };
    if (!count) return done();
    return bundles.map(scss => {
        gulp.src(scss.src)
            .pipe(plugins.sass())
            .pipe(plugins.if(isProd, plugins.cleanCss()))
            .pipe(plugins.concat(scss.name))
            .pipe(gulp.dest(paths.dist + '/css'))
            .on('end', onEnd);
    });
});

gulp.task('copy-manifest', () => {
    const { version } = pkg;
    const manifest_dir = require('path').dirname(paths.manifest);

    return gulp.src(paths.manifest)
        .pipe(plugins.jsonEditor({
            'version': version,
            'version_name': version,
        }))
        .pipe(gulp.dest(manifest_dir))
        .pipe(plugins.jsonminify())
        .pipe(gulp.dest(paths.dist));
});

gulp.task('copyAsIs', () => {
    return gulp.src(paths.copyAsIs)
        .pipe(plugins.rename((path) => {
            path.dirname = "";
        }))
        .pipe(gulp.dest(paths.dist));
});

gulp.task('copy-images', () => {
    return gulp.src(paths.icons)
        .pipe(gulp.dest(paths.dist + "/icons"));
});

gulp.task('copy-locales', (done) => {
    let bundles = Array.isArray(paths.locales_list) ?
        paths.locales_list : [];
    let count = bundles.length;
    let isDone = false;
    let onEnd = () => {
        if ((--count === 0) && !isDone) {
            isDone = true;
            return typeof done !== 'function' || done();
        }
    };
    if (!count) return done();

    paths.locales_list.map(language => {
        let root = paths.locales_dir + language;
        if (fs.existsSync(root)) {
            return gulp.src(root + "/**/*.json")
                .pipe(plugins.mergeJson({ fileName: 'messages.json' }))
                .pipe(plugins.jsonminify())
                .pipe(gulp.dest(paths.dist + "/_locales/" + language))
                .on('end', onEnd);
        }
    });
});

gulp.task('build-html', () => {
    return gulp.src(paths.html)
        .pipe(plugins.htmlmin({ collapseWhitespace: true }))
        .pipe(plugins.rename((path) => {
            path.dirname = "";
        }))
        .pipe(gulp.dest(paths.dist));
});

gulp.task('release', [
    'clean',
    'build-js',
    'build-css',
    'copyAsIs',
    'copy-manifest',
    'copy-images',
    'copy-locales',
    'build-html'], () => {
        return isProd ? gulp.src(paths.dist + '/**/*')
            .pipe(plugins.zip('release.zip'))
            .pipe(gulp.dest(paths.releases)) : true;
    });
