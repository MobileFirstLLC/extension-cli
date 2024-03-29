# Building Scripts

* * *

<p class='page-intro'>Instructions for configuring javascript build outputs.</p>

* * *

`js_bundles` key is used to configure build settings for javascript bundles. 

It allows you to specify: 

1. name of each generated script file
2. what to included in each script
3. how many scripts will be generated by build command

By default `js_bundles` looks for .js files in source directory and generates
a single script.js as output.

## Configuration options

`js_bundles` value is an array of objects, where each object specifies the following keys:

| Key | Value |
--- | ---
| **`name`** | Output filename without file extension |
| **`src`** | Glob pattern for specifying which files to include in the bundle | 
| **`mode`** (optional) | webpack build mode; by default same as `--env` flag |  

!!! info
    Internally JavaScript bundles are built using webpack where mode is determined
    by build `--env` flag. If you want to override this behavior and always use a 
    specific webpack mode configuration, explicitly specify `"mode"` in the build 
    configuration. 

### Specifying source files

For specifying value of `src` you can use any valid glob pattern: 

- a string value for a single file, example: `"src/index.js"`
- array of files, example: `["src/index.js", "src/popup.js"]` 
- a path with wildcard, for example: `"src/*.js"`
- You may also use `!` as a way to negate inclusion of file(s)

See ["Explaining Globs"](https://gulpjs.com/docs/en/getting-started/explaining-globs) for detailed reference. 


## Example

Below is a sample build configuration that will generate two JavaScript files: 

- First one contains exactly `src/background.js`  
- Second one contains all `.js` files under directories `scr/app/dir1` and `scr/app/dir2`

After running build command `dist/` will contain `background.js` and `app.js`.

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
