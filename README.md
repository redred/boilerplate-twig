Boilerplate-Twig
================

Overview
--------
This is a front-end template system written in [Twig](http://twig.sensiolabs.org) and [Bootstrap 3](http://getbootstrap.com).

1. CSS is generated using the Bower package [bootstrap-sass](https://github.com/twbs/bootstrap-sass) (see `bower.json`)
2. CSS and JavaScript compiling is handled by Grunt (see `Gruntfile.js`)
3. CSS follows the block__element--modifier pattern (BEM)
4. Templates are written in [Twig](http://twig.sensiolabs.org) (see `composer.json`)
5. To view the templates, drop this entire directory in any PHP-enabled web server and view the PHP files at the root level (`/webroot`)

## Setup
1. Place the entire project directory in a PHP-enabled web server
1. Install the Sass GEM (`gem install sass`) if needed
2. Install NPM modules
3. Install Bower modules
4. Install [Grunt CLI](http://gruntjs.com/using-the-cli)
5. In your terminal, run the command `grunt` at the root level

## Notes

### Front-end framework
* [Bootstrap 3](http://getbootstrap.com) with [Bootstrap Sass](https://github.com/twbs/bootstrap-sass)
* Custom JavaScript modules

### Task runner
* [Grunt](http://gruntjs.com) - Used to compile and minify CSS and JS

### Package Managers
* [Bower](http://bower.io) - For Bootstrap, jQuery
* [NPM](https://www.npmjs.com) - For CSS and JS compiling, minification, etc.
* [Composer](https://getcomposer.org) - For Twig

### Directory structure
```
.
├──.sass-cache
├──bower_modules/
├──composer_modules/
├──node_modules/
├──source/
│  ├──fonts/
│  ├──img/
│  │  ├──common/
│  │  └──temp/              Temporary images
│  ├──js/
│  │  ├──lib/
│  │  │  ├──modernizr/
│  │  │  └──respond/
│  │  └──modules/           Modules
│  └──scss
│     ├──base               Global elements
│     ├──bootstrap          Bootstrap overrides
│     └──site               Modules
└──webroot/                 Only edit HTML, PHP
   ├──css/                  Do not edit
   ├──img/                  Do not edit
   ├──js/                   Do not edit
   └──templates/            Only edit HTML
      └──content/           Placeholder content
   .bowerrc
   bower.json
   composer.json
   composer.lock
   Gruntfile.js
   package.json
   README.md
```
