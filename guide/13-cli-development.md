# Developing Extension CLI

This CLI is built with numerous tools (see Tech Stack) and written in Javascript. 

The source code is available on [Github](https://github.com/MobileFirstLLC/extension-cli).


## Project Organization

Path | Description
--- | ---
└ **.github** | Github markdown files
└ **cli** |  all commands are defined here
└ **config** | Static resources used by the commands in `cli`
└ **guide** | Docs
└ `/*` | Application root; various project config files


## Debugging and Extending the CLI Locally

1. [Fork the repo](https://github.com/MobileFirstLLC/extension-cli/fork)

2. Clone the forked repo and launch your favorite web IDE

3. Install packages `npm install`

4. [Link the local package](https://docs.npmjs.com/cli/link.html) `npm link` (prepend `sudo` if necessary)

5. You can now run any commands against the local source; you will need an extension project for this to make any sense though. You can create a new starter project by running `npx extension-cli`.

6. When debugging the build command, you may need to go into `./config/build.json` and change value of `projectRootDir` as it assumes it is running from `node_modules` of the extension project. This may not be true if you are using a locally linked package.

7. When you are done unlink the package: 

    1. run `npm unlink --no-save extension-cli` on your extension project's directory to remove the local symlink. 
    
    2. Run `npm unlink` on the extension-cli root directory to remove the global symlink.

## Editing These Docs

If you are not interested in the layout of this documentation site, just edit the markdown directly.
There is a pen icon linking to the markdown source on each page of these docs.

## Debugging & Extending CLI Documentation Locally

When you want to edit the layout and theme of these docs:

1. [Fork the repo](https://github.com/MobileFirstLLC/extension-cli/fork)

2. Clone the forked repo and launch your favorite markdown editor + terminal.

3. The docs use Python package called `mkdocs`. You need to have python and `mkdocs` installed if you want to preview your changes (or skip this step if you are not interested in previewing the changes!)

    1. Create a virtual environment: `python3 -m venv env`
    2. Activate the environment: `source env/bin/activate`
       <br/>(Win: `env\Scripts\activate.bat`)
    3. Install requirements `pip install -r requirements.txt`
    4. Run the docs locally: `mkdocs serve`

4. All written docs are in the `guide` directory. These are the files you want to edit to make changes to the documentation. 

5. After editing the docs, commit your changes. Travis CI is used to compile and publish the docs automatically.
