# xt-docs


> `xt-docs` command is used for generating source code documentation for an extension project.

Extension CLI uses [JSDoc 3](https://jsdoc.app/index.html) specification to generate documentation for javascript files in an extension project. JSDoc is a flexible documentation generator, that converts your code comments to readable HTML/CSS files which you can host, for example, with github pages.

You can use any compatible template of choice to skin your docs. Learn [more about templating here](#templates).


## Commands

Default command

```
xt-docs
```
 
Command using custom configuration file path

```
xt-docs --config "/path/to/config.json"
```
 
Get help using this command

```
xt-docs --help
``` 

After installing extension-cli, you can run these commands from a terminal using syntax `npx xt-docs`.
 
 Or you can add an option to `packages.json` scripts section (see example below) and then execute the command as `npm run docs`.
 
```
"scripts":{
  "docs": "xt-docs"
}
```


  

## Configuration
 
By default the CLI will look for docs configuration in two different
places:
- in `package.json` using key `xtdocs`
- in a file named `.xtdocs.json` in project root

If these two locations cause a conflict, alternatively you can provide a path to configuration file with `--config` (`-c`) flag, followed by path to file. [See commands for an example](#commands).

<br/>

### Minimum Project-Level Configuration

Within the extension project you should define, at minimum, the following configuration options:

``` 
"xtdocs": {
  "templates": {
    "systemName": "{extension name}",
    "systemSummary": "{short description}",
    "systemColor": "{css-color}"
  }
}
```

where

| key | Description of value |
| --- | --- |
|`systemName`| Name of you project |
| `systemSummary` | Provide a short description of your project; this will be shown as a subheading |
| `systemColor` | Choose a theme color for your documentation; css hex color definition will work, e.g. `#000000`.

<br/>

### Default Configuration

The CLI uses a documentation configuration file shown below. You can override any of these key-value pairs at project level. You can also add key-value pairs that are not defined here so long as they are intelligible to [JSDoc](https://jsdoc.app/about-configuring-jsdoc.html).

```
"xtdocs": {
  "tags": {
    "allowUnknownTags": true,
    "dictionaries": [
      "jsdoc"
    ]
  },
  "source": {
    "include": [
      "src"
    ],
    "includePattern": ".js$",
    "excludePattern": "(node_modules/|docs)"
  },
  "plugins": [
    "plugins/markdown"
  ],
  "templates": {
    "footer": "",
    "copyright": "",
    "includeDate": "true",
    "dateFormat": "MMM YYYY",
    "inlineNav": "true",
    "inverseNav": "false",
    "linenums": "true",
    "showTableOfContents": "true",
    "showAccessFilter": "true",
    "collapseSymbols": "true",
    "methodHeadingReturns": "false",
    "outputSourceFiles": "true",
    "outputSourcePath": "true",
    "search": "true",
    "stylesheets": [
      "data:text/css;base64,Zm9vdGVyewogICAgZGlzcGxheTpub25lIWltcG9ydGFudDsKfQ=="
    ],
    "scripts": [],
    "favicon": "./assets/img/128x128.png"
  },
  "opts": {
    "destination": "./public/documentation",
    "encoding": "utf8",
    "private": true,
    "recurse": true,
    "template": "./node_modules/foodoc/template"
  }
}
```

## Templates

`templates` key is used specifically by the template of choice. Currently the default template is 
[Foodoc](https://github.com/steveush/foodoc#configuring-the-template) which has more configuration options than what was specified in the default configuration above. 

You can change the template by overriding `opts.template` in the project-level configuration, and by adding the template package of your choice to project-level dependencies.

[This list](https://cancerberosgx.github.io/jsdoc-templates-demo/demo/) can help you get started with picking a custom template. If you cannot find one that you like, you can always make your own.

## Source

[View latest source for this command here](/xt-docs.js.html)

---

[Edit this file on Github](https://github.com/MobileFirstLLC/extension-cli/blob/master/tutorials/xt-docs.md)
 
