# Localization

* * *

<p class='page-intro'>Localization enables translating extension to different languages.</p>

* * *

If the extension supports multiple languages, you can customize 
extension localization by specifying two build keys: `locales_dir` and `locales_list`.

## Locales directory

`locales_dir` key specifies where in project directory to look for locales files.
The default `locales_dir` is `./assets/locales/`.
If you prefer a different directory structure, override this default value.


## Locales list

`locales_list` is an array that  lists all supported languages, and such that
 the values of this array correspond to subdirectories under `locales_dir`. Only
 locales directories specified in this array will be included in the build, which
 allows excluding incomplete translations from build until they are  ready to be
 included. 
 
 The default value of `locales_list` is `["en"]`. 

 Refer [to this list of language codes](https://developers.google.com/admin-sdk/directory/v1/languages)
 when specifying value for this configuration.

You may split localization files into multiple `.json` files within the 
language-specific directory to improve maintainability. During builds
all files within a language directory will be automatically combined into a single 
`messages.json` which is expected from a browser extensions.

Recommended reading: [learn how to internationalize extensions](https://developer.chrome.com/extensions/i18n).

## Example

This configuration shows build configuration with custom path and multiple language
outputs.

Build configuration

```json
"xtbuild": {
  "locales_list": ["en","fr","pl"],
  "locales_dir": "./my/custom/locales/path/"
}
```

Corresponding project level file structure: 

File Path | Description
--- | ---
└ **`/my/custom/locales/path/`** |  locales directory
&nbsp; &nbsp; &nbsp; &nbsp; └─ `en`/messages.json |  English dictionary
&nbsp; &nbsp; &nbsp; &nbsp; └─ `fr`/myFile.json | French dictionary
&nbsp; &nbsp; &nbsp; &nbsp; └─ `pl/` | 
&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; └─ app.json | Polish dictionary, part 1
&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; └─ options.json | Polish dictionary, part 2
&nbsp; &nbsp; &nbsp; &nbsp; └─ `de`/messages.json | German dictionary

Build behavior:

- `myFile.json` will be renamed to `messages.json` 
- `app.json` and `options.json` will me concatenated and renamed to `messages.json`
- extension will be available in 3 languages; `dist/` directory will contain:
    - `_locales/en/messages.json`
    - `_locales/fr/messages.json`
    - `_locales/pl/messages.json`
- German dictionary is excluded from build output because it is not included in `locales_list`
