# Editing User Guide

If you are interested in editing the content (and not layout) of this user guide, 
simply edit the markdown directly in any markdown editor or on Github.
There is a pen icon linking to the markdown source on each page of these docs,
which takes you directly to the source document.

## Developing User Guide

When you want to edit the layout, organization and/or theme of these docs, you 
will need to run these project docs locally. This user guide is built with Python. 
You will need Python 3.x before proceeding.

1. If you are not a maintainer, [fork the repo](https://github.com/MobileFirstLLC/extension-cli/fork)

2. Clone the forked repo and launch your favorite markdown editor and terminal.

3. Setup Python development env as follows: 

    ```Python
    # 1. create virtual env for packages
    python3 -m venv env         
    
    # 2. activate virtual env 
    source env/bin/activate     # macOS/Linux
    env\Scripts\activate.bat    # Windows
    
    # 3. install requirements:
    pip install -r requirements.txt
    
    # 4. run the docs:
    mkdocs serve
    ```

4. Relevant files:

    - all written documents are under `guide` directory
    - `mkdocs.yml` at project root is a configuration file for Mkdocs
    - `guide/assets` includes static assets for these docs

5. After editing the docs, commit your changes and open a PR as
   necessary. Travis CI is used to compile and publish the docs automatically
   after merged to master branch.
