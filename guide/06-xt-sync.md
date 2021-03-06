# xt-sync


* * *

<p class='page-intro'><code>xt-sync</code> command is intended for upgrading configuration files of
a stale project to the latest versions</p>

* * *

When a project has not been worked on recently, it may need updates of 
various files, such as CI configuration files. 

The purpose of this command is to make that update process simple by
allowing each project to choose which configuration files to update.
The CLI will then supply the project with the most recent configuration
files.

**Note:** If the configuration files have been modified heavily for 
an individual project, it is not advisable to upgrade them in this manner. 
Instead you should upgrade such configuration files manually.

## Commands

Braces `{ }` indicate that the user must choose one — and only one — of the items inside the braces.

You must pass at least one flag with this command.


**Synchronize all configuration files**

```
xt-sync {-a|--all}
```

**Synchronize ESLint configuration file**

```
xt-sync {-e|--eslint}
```

**Synchronize Gitlab CI configuration file**

```
xt-sync {-l|--gitlab}
```

**Synchronize Travis CI configuration file**

```
xt-sync {-t|--travis}
``` 

**Synchronize .gitignore file**

```
xt-sync {-g|--gitignore}
``` 

**Get help using this command**

```
xt-sync --help
``` 

## Package.json scripts

After installing extension-cli, you can run these commands from a terminal using `npx xt-sync --all`.
 
Or you can add an option to `packages.json` scripts section and then execute the command as `npm run sync`.
See example below.
 
```
"scripts":{
  "sync": "xt-sync --all"
}
```

