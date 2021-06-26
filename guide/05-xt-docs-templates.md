# Documentation Templates

* * *

<p class='page-intro'>Use templates to customize the look and feel of 
source code documentation.</p>

* * *

Extension CLI uses [JsDoc](https://jsdoc.app) to document extension projects.
You can then apply templates to customize the look and feel of these docs.

## Customizing Default Template

If you are using the default template see: [Configuring JSDoc's default template](https://jsdoc.app/about-configuring-default-template.html).

<a href="https://jsdoc.app/about-configuring-default-template.html" 
   class="preview" target="_blank" rel="noreferrer nofollow">
  <span class="bar">
      <span class="red"></span>
      <span class="yellow"></span>
      <span class="green"></span>
  </span><img src="/assets/images/jsdoc-default.jpg" alt="default template"/>
</a>

## Alternative Templates

To use an alternative template:

1. Choose a suitable template and use npm to install it at project level
2. In the [documentation configuration](/05-xt-docs/#default-configuration):
    1. Specify `"opts.template"` to indicate which template to use    
    2. Customize the template options under `"templates"` 

* * *

### Braintree JSDoc Template

[Source and configuration](https://github.com/braintree/jsdoc-template)

![GitHub last commit](https://img.shields.io/github/last-commit/braintree/jsdoc-template)

<a href="https://github.com/braintree/jsdoc-template" 
   class="preview" target="_blank" rel="noreferrer nofollow">
  <span class="bar">
      <span class="red"></span>
      <span class="yellow"></span>
      <span class="green"></span>
  </span><img src="/assets/images/braintree.jpg" alt="braintree"/>
</a>

* * *

### clean-jsdoc-theme

[Source and configuration](https://github.com/ankitskvmdam/clean-jsdoc-theme)

![GitHub last commit](https://img.shields.io/github/last-commit/ankitskvmdam/clean-jsdoc-theme)

_Light mode_

<a href="https://github.com/ankitskvmdam/clean-jsdoc-theme" 
   class="preview" target="_blank" rel="noreferrer nofollow">
  <span class="bar">
      <span class="red"></span>
      <span class="yellow"></span>
      <span class="green"></span>
  </span><img src="/assets/images/clean-jsdoc-light.jpg" alt="light mode"/>
</a>

_Dark mode_

<a href="https://github.com/ankitskvmdam/clean-jsdoc-theme" 
   class="preview" target="_blank" rel="noreferrer nofollow">
  <span class="bar">
      <span class="red"></span>
      <span class="yellow"></span>
      <span class="green"></span>
  </span><img src="/assets/images/clean-jsdoc-dark.jpg" alt="dark mode"/>
</a>

* * *

### Foodoc

[Source and configuration](https://github.com/steveush/foodoc)

![GitHub last commit](https://img.shields.io/github/last-commit/steveush/foodoc)


<a href="https://github.com/steveush/foodoc" 
   class="preview" target="_blank" rel="noreferrer nofollow">
  <span class="bar">
      <span class="red"></span>
      <span class="yellow"></span>
      <span class="green"></span>
  </span><img src="/assets/images/foodoc.jpg" alt="foodoc"/>
</a>

* * *

### JsDoc Template

[Source and configuration](https://github.com/AlexisPuga/jsdoc-template)

![GitHub last commit](https://img.shields.io/github/last-commit/AlexisPuga/jsdoc-template)

<a href="https://github.com/AlexisPuga/jsdoc-template" 
   class="preview" target="_blank" rel="noreferrer nofollow">
  <span class="bar">
      <span class="red"></span>
      <span class="yellow"></span>
      <span class="green"></span>
  </span><img src="/assets/images/jsdoc-template.jpg" alt="JsDoc Template"/>
</a>

* * *

### Tidy JsDoc

[Source and configuration](https://github.com/julie-ng/tidy-jsdoc)

![GitHub last commit](https://img.shields.io/github/last-commit/julie-ng/tidy-jsdoc)

<a href="https://github.com/julie-ng/tidy-jsdoc" 
   class="preview" target="_blank" rel="noreferrer nofollow">
  <span class="bar">
      <span class="red"></span>
      <span class="yellow"></span>
      <span class="green"></span>
  </span><img src="/assets/images/tidy-jsdoc.jpg" alt="Tidy JsDoc"/>
</a>

* * *

<!-- style the preview views -->
<style>
article a.preview {
  display: block;
  margin: 2rem auto;
  width:1000px; max-width: calc(100% - 42px); 
  box-shadow: 0 12px 42px rgba(0,0,0,.22), 0 4px 6px rgba(0,0,0,0.4);
  border-radius: 4px;
  overflow: hidden;
  position: relative;
}
article a.preview img{
  width: 100%;
  background: #222;
  display: block;
  position: relative;
  margin:0;
}
article a.preview .bar{
  padding:10px 12px; width:100%;
  background: #e4e4e4;
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  margin:0;
}
article a.preview .bar > span{
  height: 10px; width:10px;
  border-radius: 50%;
  background: #9997;
  margin-right: 8px;
}
article a.preview .bar .red{
    background:#FF5952;
}
article a.preview .bar .yellow{
    background:#E6C029;
}
article a.preview .bar .green{
    background:#54C22B;
}
</style>
