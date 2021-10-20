---
disqus: "False"
---

### 1.2.4 (2021-10-19)

- Update devtools sourcemap config [PR #119](https://github.com/MobileFirstLLC/extension-cli/pull/119)
- New extension now initialized with MV3 [#86](https://github.com/MobileFirstLLC/extension-cli/pull/111)

**Dependency updates**

- update @babel/preset-env to v7.15.8 ([a341965](https://github.com/mobilefirstllc/extension-cli/commit/a3419659b3ac2427f1134f8c6cfb2bb38c29f009))
- update commander to v8.2.0 ([5226669](https://github.com/mobilefirstllc/extension-cli/commit/52266695f15cace4cc422e229afe5555d30ff0e4))
- update eslint to v8 ([d5549a8](https://github.com/mobilefirstllc/extension-cli/commit/d5549a8730256f61edbd36ab7cabbac95db5000e))
- update jsdom to v18 ([681db6b](https://github.com/mobilefirstllc/extension-cli/commit/681db6bafeedda989471235ff6f14ad9edff1885))
- update mocha to v9.1.2 ([d7cecc6](https://github.com/mobilefirstllc/extension-cli/commit/d7cecc60a2aa918559bea17b2531b3e331500cce))
- update prompts to v2.4.2 ([f99cb60](https://github.com/mobilefirstllc/extension-cli/commit/f99cb608f43414ecbb8f9309ce2d32453b11b0d5))
- update sass to v1.43.2 ([32eb148](https://github.com/mobilefirstllc/extension-cli/commit/32eb148d81318f115942df2682270ded3c061652))
- update webpack-stream to v7 ([#94](https://github.com/mobilefirstllc/extension-cli/issues/94)) ([a19b448](https://github.com/mobilefirstllc/extension-cli/commit/a19b4488cc7f9a31474904e58b2920bf67f0619a))
- update yargs to v17.2.1 ([9a06f44](https://github.com/mobilefirstllc/extension-cli/commit/9a06f44b878d178dbd15fbae490470082b99221a))

### 1.2.2 (2021-07-28)

- update dependencies

### 1.2.0 (2021-07-28)

**Changes to build**

- enable using custom filenames for manifests pre-build [PR #66](https://github.com/MobileFirstLLC/extension-cli/pull/66)
- run build tasks in parallel [PR #70](https://github.com/MobileFirstLLC/extension-cli/pull/70)
- make sourcemap basename match js file name [PR #70](https://github.com/MobileFirstLLC/extension-cli/pull/70)
- dynamically determine project path; remove build config key [PR #71](https://github.com/MobileFirstLLC/extension-cli/pull/71)

**Other changes**

- docs: make JsDoc default template the default documentation template for CLI [#62](https://github.com/MobileFirstLLC/extension-cli/issues/62)
- sync: add CI configuration starter for Github actions [#65](https://github.com/MobileFirstLLC/extension-cli/issues/65)
- sync: eslint config file will now have file extension `.json` [PR #78](https://github.com/MobileFirstLLC/extension-cli/pull/78)
- update dependencies

### 1.1.0 (2021-06-12)

- sync: changed command to prompt with options [PR #57](https://github.com/MobileFirstLLC/extension-cli/pull/57), [#59](https://github.com/MobileFirstLLC/extension-cli/pull/59)
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
