# Building Stylesheets

* * *

<p class='page-intro'>Instructions for configuring stylesheet build outputs.</p>

* * *

`scss_bundles` are used to configure build settings for CSS stylesheets. The expected value is an array with 
zero or more objects where.

- `name` is the output bundle filename with file extension
- `src` specifies which files to include in each bundle; you can use 
    - a string value for a single file
    - array of files, or 
    - a path with wildcard. 
    
    You may also use `!` as a way to negate the inclusion of a file. This is the [globs syntax expected by gulp](https://gulpjs.com/docs/en/api/src) (without options).

The production build will minify style files. Dev build does not minify style files.

By default, the stylesheets are assumed to be written using [Sass](https://sass-lang.com/guide). If you are not a friend of Sass language stylesheets, you can write your style sheets using regular CSS. Any CSS you write is valid Sass as well.
 
When you name stylesheet files, use `.scss` file extension. The default CLI configuration looks for this file extension. Otherwise you must override this default configuration: `"scss": "./src/**/*.scss"` to include other file extensions in the style bundles.

**Example**

Sample project-level configuration with multiple style bundles

```json
"xtbuild": {
    "scss_bundles": [
      {
        "src": [
          "./src/**/*.scss",
          "!./src/app/styles/app.scss"
        ],
        "name": "styles.css"
      },
      {
        "src": [
          "./src/app/styles/ui.scss"
        ],
        "name": "display.css"
      }
    ]
}
```
