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


## Debugging the CLI Locally

1. [Fork the repo](https://github.com/MobileFirstLLC/extension-cli/fork)

2. Clone the forked repo and launch your favorite web IDE

3. Install packages `npm install`

4. [Link the local package](https://docs.npmjs.com/cli/link.html) `npm link extension-cli`

5. You can now run any commands against the local source; you will need an extension project for this to make any sense though. You can create a new starter project by running `npx extension-cli`.

6. When debugging the build command, you may need to go into `./config/build.json` and change value of `projectRootDir` as it assumes it is running from `node_modules` of the extension project. This may not be true if you are using a locally linked package.

7. When you are done, unlink the package: run `npm unlink --no-save extension-cli` on your project's directory to remove the local symlink. Run `npm unlink` on the module's directory to remove the global symlink.

## Debugging & Extending Documentation

1. [Fork the repo](https://github.com/MobileFirstLLC/extension-cli/fork)

2. Clone the forked repo and launch your favorite markdown editor + terminal.

3. The docs use Python package called `mkdocs`. You need to have that installed.

    1. Create a virtual environment: `python3 -m venv tutorial-env`
    2. Activate the environment: `source tutorial-env/bin/activate`
       <br/>(Win: `tutorial-env\Scripts\activate.bat`)
    3. Install requirements `pip install -r requirements.txt`

4. Run the docs locally: `mkdocs serve`

5. All written docs are in the `guide` directory. The configs are in `mkdocs.yml` in the root. These are the files you want to edit to make changes to the documentation.
