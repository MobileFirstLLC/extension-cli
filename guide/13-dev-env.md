# Environment Setup


To build extension CLI locally you will need [Node.js](https://nodejs.org/en/download/)
and any web IDE of your choice.

Developing the CLI requires two projects open at the same time:

1. the CLI source code, which you are developing
2. a driver project that is used to execute the CLI commands

The following instructions explain how to set up this environment.

## Instructions

### 1. Setup the CLI

1. [Fork the extension-CLI repo](https://github.com/MobileFirstLLC/extension-cli/fork)

2. Clone the forked repo and then open it in your favorite web IDE

3. Run the following command in terminal 

```bash
npm install   
```

### 2. Setup driver project

Next you will need a project to drive the CLI to be able to execute its commands.
You can use any existing extension project that is using extension-cli.

If you do not have an existing project, create a new project. In the directory where you want to create the driver project run:

```bash
npx extension-cli
```

then follow the on-screen instructions. Once you have the project ready, open it in a web IDE. 
At this point you should have two IDE windows open.   

### 3. Link driver and CLI


1. In **CLI project** terminal run this command (use `sudo npm link` if necessary):

    ```bash
    npm link  
    ```
    
    <br/>

2. In the **driver project** terminal run this command:    
    
    ```bash
    npm link extension-cli
    ``` 
   
* * * 

**<center>Your dev environment should now be ready to use.</center>**
 
* * * 

## Clean up

Unlink CLI and driver project to remove all local links.

In the **driver project** terminal run:    
    
```bash
npm unlink --no-save extension-cli
``` 

to unlink project from the local CLI version. Note that this may remove
extension-cli from the project completely, and you may need to run `install extension-cli`
to add back the version from NPM registry. This is relevant only if you used
an existing project as a driver.

In **CLI project** terminal run:

```bash
npm r extension-cli -g
```

to remove the CLI symlink.
