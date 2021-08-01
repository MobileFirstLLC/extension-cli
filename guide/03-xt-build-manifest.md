# Manifest

* * *

<p class='page-intro'>Customize build behavior for extension manifest.</p>

* * *

In your build configuration specify path to the manifest file:

```json
"xtbuild": {
   "manifest": "./src/manifest.json",
} 
```

The file will be renamed to `manifest.json` during build regardless of its original name.

## Customizing manifests for different target browsers

There are two strategies for customizing the manifest contents per target browser:

1. Specify browser-specific keys in single manifest file
2. Specify multiple build configurations, each with different manifest file.

### Browser specific keys in single manifest

Using this strategy, the project contains single manifest. In manifest.json:

```json
{
  "name": "__MSG_appname__",
  "description": "__MSG_description__",
  "chrome":{
       
     ... chrome-specific manifest keys here
      
  },
  "firefox":{

     ... firefox-specific manifest keys here

  }
}
```

Then run the build command specifying the target platform:

```
xt-build --platform chrome  
xt-build --platform firefox
```

The build will then combine all common manifest elements with those
specified for the target platform. 

When building cross-browser extensions, most browsers can reuse the 
same manifest. Therefore, these two targets are typically sufficient to generate the desired
 manifests for multiple target browsers. However, if this strategy
is insufficient, see the next option.  


### Multiple build configurations

Create multiple build configuration files:

chrome-config.json:

```json
{
  "manifest": "./manifests/chrome.json"
} 
```

firefox-config.json:

```json
{
  "manifest": "./manifests/firefox.json"
} 
```

Using this strategy, run the build command specifying path to config file explicitly:

```
xt-build --config chrome-config.json  
xt-build --config firefox-config.json
```
