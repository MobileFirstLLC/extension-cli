# xt-sync


* * *

<p class='page-intro'><code>xt-sync</code> is intended for copying and updating 
configuration files.</p>

* * *

When adding more features to an extension project, it is helpful
to \*not\* start from scratch. `xt-sync` command enables extension projects
to pull in starter configuration files for the purposes of linting, 
setting up automated CI builds, and for setting up git VCS.

The configuration files are intended as a starting point. If you
end up modifying them heavily at a project level, you should continue
to maintain them manually instead of using this command.

If you do not modify these configuration files, you can sync the 
latest version periodically, to update to the latest version supplied
by this CLI.

## Commands

**Sync configuration files**

This command will guide you through the available options. 

```bash
xt-sync
```


## Package.json scripts

After installing extension-cli, you can run these commands from a terminal by calling
 
```bash
npx xt-sync
```

Alternatively you can add an option to `packages.json` scripts section as shown below
 
```json
"scripts" : {
  "sync": "xt-sync"
}
```

and then execute the command by running 

```bash
npm run sync
```
