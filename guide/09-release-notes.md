## Release Notes

### [0.11.8] (2021-03-12)

* **xt-build**: support copying directories as-is [#32](https://github.com/MobileFirstLLC/extension-cli/issues/32)
* **xt-build**: append '.css' at the end of name if not specified by the user [PR #36](https://github.com/MobileFirstLLC/extension-cli/pull/36)

### 0.11.7 (2021-03-02)

* **xt-docs**: make watch recursive on watched directories
* **xt-docs**: add tutorials directory to watch list (if exists)
* **xt-docs**: display error when docs command fails

### 0.11.6 (2021-02-25)

* **xt-docs:** add watch mode to docs command, see: [#23](https://github.com/mobilefirstllc/extension-cli/issues/23) 

### 0.11.5 (2021-02-24)

* **xt-test:** unit code result reporting fix, see: [#26](https://github.com/mobilefirstllc/extension-cli/issues/26) 

### 0.11.3 (2021-01-27)

* **xt-build:** file watch fix

### 0.11.2 (2021-01-08)

* **xt-build:** command path fix

### 0.11.1 (2021-01-06)

* **xt-build:** allow specifying custom build commands
* **xt-create:** fix image generation issue
* update packages


### 0.10.1 (2020-12-15)

* update test configs 
* check if gitignore exists before xt-clean
* **xt-create:** change default icon to high contrast
* update packages

### 0.9.4 (2020-11-29)

* extension-cli: fix typo
* update packages

### 0.9.3 (2020-10-31)

* xt-clean: improve xt-clean command handling of files
* change icon
* update docs

### 0.9.1 (2020-10-11)

- fix: xt-docs config keys replace when value is an array

### 0.9.0 (2020-10-05)

- xt-test: add configurable test path
- xt-create: sanitize package name
- update packages
- xt-clean: refactor command
- xt-docs: refactor docs command
- xt-sync: refactor sync command

### 0.8.16 (2020-08-09)

- update packages

### 0.8.15  (2020-08-04)

- update packages

### 0.8.14 (2020-08-01)

- update xt-create

### 0.8.13 (2020-07-26)

- updated packages

### 0.8.12 (2020-05-26)

- update build command

### 0.8.11 (2020-05-25)

- fix issue with create command docs configs
- add new/missing docs dependency

### 0.8.10 (2020-05-25)

- `xt-build` bug fixes
- Made webpack options configurable, to enable adding loaders etc.
- Upgraded project dependencies

### 0.8.9 (2020-04-10)

- Implemented command to create new extension
- Updated docs to reflect this new command

### 0.8.8 (2020-04-08)

- Upgraded project dependencies

### 0.8.7 (2020-01-17)

- Upgraded project dependencies
- Fixed scripts build step (changed webpack options)

### 0.8.6 (2019-12-21)

- Initial release for this publisher
- Migrated project from older source code
- Upgraded all packages
- Migrated build to use Gulp v4
