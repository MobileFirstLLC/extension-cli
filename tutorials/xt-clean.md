# xt-clean


> `xt-clean` command removes all automatically generated files from the project directories.


Clean operation iterates over files and directories listed in the
 project `.gitignore` file, and removes all ignored files and
 directories, except `node_modules/`, `.idea/`, and `.vscode/`. 

 (.idea is a collection of configuration files used by WebStorm IDE, and .vscode
 is the same for Visual Studio Code. The IDE will generate them automatically if they are absent.)

 To remove these directories, you must explicitly pass a flag to delete
 each directory respectively.


## Commands

Default command: removes ignored files

```
xt-clean
```

Clear ignored files, including `node_modules`

```
xt-clean -m
```

Clear ignored files, including `.idea/` directory

```
xt-clean -m -i
```

Clear ignored files, including `.vscode/` directory

```
xt-clean -m -v
```

Get help using this command

```
xt-clean --help
``` 


After installing extension-cli, you can run these commands from a terminal using syntax `npx xt-clean`.
 
Or you can add an option to `packages.json` scripts section (see example below) and then execute the command as `npm run clean`.
 
```
"scripts":{
  "clean": "xt-clean"
}
```


## Source

[View latest source for this command here](xt-clean.js.html)

---

[Edit this file on Github](https://github.com/MobileFirstLLC/extension-cli/blob/master/tutorials/xt-clean.md)
 
