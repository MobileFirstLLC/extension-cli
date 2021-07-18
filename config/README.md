# CLI configuration files

This directory contains various files that are used by the available CLI commands. Below is a short summary of each to explain their purpose.

### `config/` directory

Path | Description
:--- | :---
**`build.json`** |  default file paths used by the build script
**`docs.json`** | JSDoc documentation template
**`eslint.json`** | default eslint configuration
**`gitlab.yml`** | gitlab ci starter configuration
**`ignore`** | gitignore starter
**`travis.yml`** | Travis CI starter configuration

**Notes**

eslint, CI configuration files, (git)ignore can be pulled into a project through `xt-sync` command, or a project can specify these files independently.
The idea is not having to start from scratch at project level unless it is by choice. 

### `init/` directory

Path | Description
:--- | :---
**`init`** | Files for bootstrapping a new extension project 
 &nbsp; **`└── NNxNN.png`** | icons
 &nbsp; **`└── background.js`** | background script
 &nbsp; **`└── icon.svg`** | vector icon
 &nbsp; **`└── intro.md`** | new extension readme
 &nbsp; **`└── manifest.json`** | manifest template
 &nbsp; **`└── messages.json`** | message dictionary template
 &nbsp; **`└── package.json`** | package.json template
 &nbsp; **`└── test.js`** | unit test starter

**Notes**

- All files in this directory are included in a new extension project
  - files that should not be included in a newly generated project go in `/config` directory
- keep this directory flat on purpose to keep things simple &mdash; create command will generate
  the necessary structure     
    
