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
    - prefix `!` as a way to negate the inclusion of a file
    
See [globs syntax guide](https://gulpjs.com/docs/en/api/src) for more details.

Dev build does not minify style files. The production build will minify style files.

By default, the stylesheets are assumed to be written using [Sass](https://sass-lang.com/guide). When naming stylesheet files, use `.scss` file extension because default configuration looks for style files with this file extension. 

If you are not a friend of Sass, you can write style sheets using CSS. In the build configuration override the default configuration: `"scss": "./src/**/*.scss"` to treat other file extensions as style files, and use `"scss_bundles"` key to specify how to generate stylesheets, as shown in the example below.

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
        "name": "styles"
      },
      {
        "src": [
          "./src/app/styles/ui.scss"
        ],
        "name": "display"
      }
    ]
}
```
