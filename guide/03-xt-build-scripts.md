# Building Scripts

* * *

<p class='page-intro'>Instructions for configuring javascript build outputs.</p>

* * *

`js_bundles` key is used to configure build settings for javascript bundles. 

It allows you to specify: 

1. name of each generated js file
2. which input files to included in each bundle
3. how many js files to generate during build

The expected value for `js_bundles` is an array of objects where: 

- `name` is the output filename without file extension
- `src` specifies which files to include in each bundle. You can use 
    - a string value for a single file, 
    - array of files, 
    - a path with wildcard. 
    
    You may also use `!` as a way to negate the inclusion of a file. This is the [globs syntax expected by gulp](https://gulpjs.com/docs/en/api/src) (without options).

The number of objects in the array determines the number of output files.

By default `js_bundles` value is `null`. This means no javascript files will be generated.

## Example

Build configuration that will generate two javascript files in the `/dist` directory. 

- One file contain exactly `src/background.js` and 
- One file contains all `.js` files under `scr/app/dir1` and `scr/app/dir2`

```json
"xtbuild": {
    "js_bundles": [
      {
        "name": "background",
        "src": "./src/background.js"
      },
      {
        "name": "app",
        "src": [
            "./src/app/dir1/**/*.js",
            "./src/app/dir2/**/*.js"
         ]
      }
    ]
}
```

After running build command, `dist/` will contain `background.js` and `app.js`.
