# xt-clean


* * *

<p style='font-size:1.3em;line-height:1.7;'><code>xt-clean</code> command removes all automatically generated files from the project directories.</p>

* * *

Clean operation iterates over files and directories listed in the
 project `.gitignore` file, and removes all ignored files and
 directories, except `node_modules/`, `.idea/`, and `.vscode/`. 

`.idea` is a collection of configuration files used by WebStorm IDE, and `.vscode`
 is the same for Visual Studio Code. The IDE will generate them automatically if they are absent.

 To remove these three directories, you must explicitly pass a flag to delete
 each directory respectively.


## Commands

Remove ignored files (default)

```
xt-clean
```

Clear ignored files, including `node_modules`

```
xt-clean -m
```

Clear ignored files, including `.idea/` directory

```
xt-clean -i
```

Clear ignored files, including `.vscode/` directory

```
xt-clean -v
```

Clear absolutely all ignored files

```
xt-clean -v -i -m
```

Get help using this command

```
xt-clean --help
``` 


After installing extension-cli, you can run these commands from a terminal using syntax `npx xt-clean`.
 
Or you can add an option to `packages.json` scripts section and then execute the command as `npm run clean` See example below. 
 
```
"scripts":{
  "clean": "xt-clean"
}
```


