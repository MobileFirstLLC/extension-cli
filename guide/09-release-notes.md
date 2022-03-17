---
disqus: "False"
---

### 1.2.5 (2021-03-16) (alpha)

**Dependency upgrades**

- @babel/preset-env: 7.16.11 ([066f782](https://github.com/MobileFirstLLC/extension-cli/commit/066f7820ce48e877cf5477ff77037c9d3a9d2fdd))
- @babel/register: 7.17.7 ([2084d42](https://github.com/MobileFirstLLC/extension-cli/commit/2084d42255e811c9f142ca77983b02aaa7dd71f0))
- chai: 4.3.6 ([2084d42](https://github.com/MobileFirstLLC/extension-cli/commit/2084d42255e811c9f142ca77983b02aaa7dd71f0))
- commander: 9.0.0 ([2084d42](https://github.com/MobileFirstLLC/extension-cli/commit/2084d42255e811c9f142ca77983b02aaa7dd71f0))
- eslint: 8.11.0 ([2084d42](https://github.com/MobileFirstLLC/extension-cli/commit/2084d42255e811c9f142ca77983b02aaa7dd71f0))
- gulp-sass: 5.1.0 ([0ac28b2](https://github.com/MobileFirstLLC/extension-cli/commit/0ac28b2eb26c998e0958ed4f98691419323b1931))
- jsdoc: 3.6.10 ([d0a09a3](https://github.com/MobileFirstLLC/extension-cli/commit/d0a09a3540580ef1d69edaaf9aa264a4674198b5))
- jsdom: 19.0.0 ([b0f290f](https://github.com/MobileFirstLLC/extension-cli/commit/b0f290fa43f76fc4e67a95ae35ca4cefb7b9db6c))
- mocha: 9.2.2 ([2084d42](https://github.com/MobileFirstLLC/extension-cli/commit/2084d42255e811c9f142ca77983b02aaa7dd71f0))
- sass: 1.49.9 ([aef9fd6](https://github.com/MobileFirstLLC/extension-cli/commit/aef9fd6142879af3bf4610c80eaca1f97aff96a4))
- sinon: 13.0.1 ([8282c0a](https://github.com/MobileFirstLLC/extension-cli/commit/8282c0a05d2702e6ec92155d8cfaba2de93c9c53))
- yargs: 17.3.1 ([add18ee](https://github.com/MobileFirstLLC/extension-cli/commit/add18ee15196d4356a74d0f76ded23d1fef1d085))

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
