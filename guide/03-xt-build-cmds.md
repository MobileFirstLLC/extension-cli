# Custom commands

* * *

<p class='page-intro'>Custom commands enables running any custom actions after build and before generating a release.</p>

* * *

Custom commands will be executed: 

- _after_ script, styles, HTML and other bundles have been built, and
- _before_ a release `.zip` file is generated

Custom commands are run for both `dev` and `prod` builds. 

To configure custom commands specify `commands` build configuration key. For example:

```json
"xtbuild": {
  "commands": "python do_something.py",
} 
```

This configuration would first build the extension, then run a custom Python script, 
then for a production build, generate the extension zip file.

## Watching changes

For `dev` builds, you can specify a watch pattern, such that changes matching the 
pattern will re-run custom commands.

Specify watch path using `commands_watch_path` configuration key, for example:

```json
"xtbuild": {
  "commands_watch_path": "./src"
}
```

then run build in `dev` mode with `--watch` flag. 

Any changes under `./src` directory will cause custom commands to re-run.
