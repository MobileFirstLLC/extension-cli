---
disqus: "False"
---

### 1.2.0 (pre-release)

- **xt-build** enable using custom filenames for manifests pre-build [PR #66](https://github.com/MobileFirstLLC/extension-cli/pull/66)
- **xt-build** run build tasks in parallel [PR #70](https://github.com/MobileFirstLLC/extension-cli/pull/70)
- **xt-build** make sourcemap basename match js file name [PR #70](https://github.com/MobileFirstLLC/extension-cli/pull/70)
- **xt-build** dynamically determine project path; remove build config key [PR #71](https://github.com/MobileFirstLLC/extension-cli/pull/71)
- **xt-docs** make JsDoc default template the default for CLI [#62](https://github.com/MobileFirstLLC/extension-cli/issues/62)
- **xt-sync** add CI configuration starter for Github actions [#65](https://github.com/MobileFirstLLC/extension-cli/issues/65)
- **xt-sync** eslint config file will now have file extension `.json` [PR #78](https://github.com/MobileFirstLLC/extension-cli/pull/78)
- update dependencies

### 1.1.0 (2021-06-12)

- **xt-sync**: changed command to prompt with options and updated relevant docs [PR #57](https://github.com/MobileFirstLLC/extension-cli/pull/57), [#59](https://github.com/MobileFirstLLC/extension-cli/pull/59)
- updated dependencies

### 1.0.3 (2021-04-27)

**Changes to build**

- Make webpack mode configurable [#51](https://github.com/MobileFirstLLC/extension-cli/issues/51), [PR #55](https://github.com/MobileFirstLLC/extension-cli/pull/55)
- use `cheap-source-map` [PR #49](https://github.com/MobileFirstLLC/extension-cli/pull/49)
- remove devtool in prod config [PR #50](https://github.com/MobileFirstLLC/extension-cli/pull/50)

### 1.0.2 (2021-04-11)

**Changes to build**

- Custom folders for scss bundles and always minify css [PR #47](https://github.com/MobileFirstLLC/extension-cli/pull/47)
- Default style bundle name without extension [PR #48](https://github.com/MobileFirstLLC/extension-cli/pull/48)

### 1.0.0 (2021-04-11)

**Changes to build**

- automatically copy from `assets/` to output directory `assets/` [PR #43](https://github.com/MobileFirstLLC/extension-cli/pull/43)
- add target platform for manifests: `chrome/firefox` [PR #43](https://github.com/MobileFirstLLC/extension-cli/pull/43)
- improved build outputs [PR #42](https://github.com/MobileFirstLLC/extension-cli/pull/42)

**Other changes**

- Updated dependencies [PR #44](https://github.com/MobileFirstLLC/extension-cli/pull/44)
