# xt-docs

* * *

<p class='page-intro'><code>xt-docs</code> command generates source
 code documentation for an extension project.</p>

* * *

Extension CLI uses [JSDoc](https://jsdoc.app/index.html) specification to 
generate documentation for javascript files in an extension project. JSDoc is 
a flexible documentation generator that converts javascript code comments to 
readable HTML/CSS files which you can be hosted for example with github pages.

## Commands

Braces `{ }` indicate that the user must choose one (and only one) of the 
items inside the braces.

**Default command**

```bash
xt-docs
```
 
**Command using custom configuration file path**

```bash
xt-docs {-c|--config} "/path/to/config.json"
```

**Build docs and keep watching changes**

```bash
xt-docs {-w|--watch}
```

**Get help using this command**

```bash
xt-docs --help
``` 

## Package.json scripts

After installing extension-cli, you can run these commands from a terminal 
using syntax `npx xt-docs`.
 
 Or you can add an option to `packages.json` scripts section and then execute 
 the command as `npm run docs`. See example below.
 
```json
"scripts":{
  "docs": "xt-docs"
}
```
  
## Configuration
 
By default the CLI will look for docs configuration in two different
places:

- in `package.json` using key `xtdocs`

- in a file named `.xtdocs.json` in project root

If these two locations cause a conflict, alternatively you can provide a path 
to configuration file with `-c` (`--config`) flag, followed by path to file. 
[See commands for an example](#commands).

You can use any compatible template of choice to style your docs. You can find 
some [templating options here](05-xt-docs-templates.md).

### Default Configuration

The CLI uses a documentation configuration file shown below. You can override any of these key-value pairs at project level. You can also add key-value pairs that are not defined here so long as they follow to [JSDoc guidelines](https://jsdoc.app/about-configuring-jsdoc.html).

```json
--8<--
./config/docs.json
--8<--
```


