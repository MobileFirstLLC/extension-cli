# Copying Files

* * *

<p class='page-intro'>Copying enables including files in the output without modifying them during build.
This includes use case where you want to skip compilation and linting of scripts or stylesheets.</p>

* * *

!!! info "Copying static assets"
    By default, all static assets under `assets/` directory will be automatically
    copied to output directory during builds.
 

`copyAsIs` allows you to specify an array of files and/or directories which should be included in build output
without modification. Files to copy can be located anywhere in your project. The directories to copy are expected to be inside `/src` directory.
  
The build command will copy: 

- specified **files** without any modification and add them to the root of the output directory;
  directory path for files will be flattened.

- specified **directories** and their contents without modification and without flattening the path

If the copy command fails to locate the specified file or directory, it will not
raise an issue, the copy will simply not occur.

## Example 1: File copy

Sample configuration for skipping compilation of pre-compiled files.

This configuration will copy material theme directly from `node_modules` 
and include it in the `dist` directory. It will also copy a project level `special.js` 
script into the output directory. No modification will occur to these files during the build step.  

After the build `dist/` directory root will include `material.min.js` and `special.js`.

```json
"xtbuild": {
    "copyAsIs": [
      "./node_modules/material-design-lite/material.min.js",
      "./some/path/special.js"
    ]
}
```


## Example 2: Directory copy

When copying directories, directory will maintain its structure. Directory to copy must be 
inside `src` directory. When specifying a directory use a match pattern, either `*` or `**/*`:

This build configuration will perform following copy operations:

- `/src/directory/*` copies all files under `/src/directory/`  to `dist/` root (excludes nested directories).

- `/src/nested/directory/**/*` recursively copies all files and nested directories to `dist/` root without flattening path.
 

```json
"xtbuild": {
    "copyAsIs": [
      "/src/directory/*",
      "/src/nested/directory/**/*"
    ]
}
```

## Disable Linting

When including precompiled javascript files to an extension project, you should also 
disable linting for those files to avoid unnecessary warnings. In `package.json`, 
add the file paths to the list of ignored files to prevent them from being linted:

```json
  {  
      "eslintIgnore": [
        "test/**/*",
        "./some/path/special.js"
      ]
  }
```
