# Technologies

## <a name="from-scratch"></a>1. From scratch
1. First create _package.json_ file with `npm init` command.
Here is an example output:
```
{
  "name": "SynappsUI",
  "version": "1.0.0",
  "description": "Application starter",
  "main": "public/index.html",
  "scripts": {
    "test": "brunch test",
    "brunch": "brunch w -s",
    "flo": "node flo.js"
  },
  "repository": {
    "type": "git",
    "url": "https://github.com/Inneair/SynappsUI.git"
  },
  "author": "Vincent Clair",
  "license": "MIT",
  "bugs": {
    "url": "https://github.com/Inneair/SynappsUI/issues"
  },
  "homepage": "https://github.com/Inneair/SynappsUI"
}
```

1. Then install following Brunch plugins:
```
npm i --save css-brunch
npm i --save javascript-brunch

npm i --save uglify-js-brunch
npm i --save clean-css-brunch

npm i --save coffee-script-brunch
npm i --save stylus-brunch
npm i --save jshint-brunch
npm i --save coffeelint-brunch
```
Once all command executed, dependencies in _package.json_ file looks like:
```
  "dependencies": {
    "clean-css-brunch": "^1.7.1",
    "coffee-script-brunch": "^1.8.1",
    "coffeelint-brunch": "^1.7.0",
    "css-brunch": "^1.7.0",
    "javascript-brunch": "^1.7.1",
    "jshint-brunch": "^1.7.0",
    "stylus-brunch": "^1.8.1",
    "uglify-js-brunch": "^1.7.7"
  }
```
See also _imageoptmizer-brunch_ and _retina-brunch_ plugins, if needed.

1. Init the _bower.json_ file, with the `bower init` command.
Here is an example output:
```
{
  "name": "SynappsUi",
  "version": "1.0.0",
  "homepage": "https://github.com/Inneair/SynappsUI",
  "main": "public/index.html",
  "authors": [
    "Vincent Clair"
  ],
  "license": "MIT",
  "private": true,
  "ignore": [
    "**/.*",
    "node_modules",
    "bower_components",
    "test",
    "tests"
  ]
}
```

1. Install project dependencies:
```
bower install -S angular
bower install -S normalize.css
bower install -S semantic-ui
```
Once all command executed, dependencies in _bower.json_ file looks like:
```
  "dependencies": {
    "angular": "~1.3.1",
    "normalize.css": "~3.0.2",
    "semantic-ui": "~0.19.3"
  }
```

1. Create _bunch-config.coffee_ file:
```
exports.config =
  files:
    javascripts:
      joinTo:
        'js/app.js': /^app/
        'js/vendor.js': /^(bower_components|vendor)/
    stylesheets:
      joinTo:
        'css/app.css': /^app/
        'css/vendor.css': /^(bower_components|vendor)/
    templates:
      joinTo: 'js/app.js'
```

1. Create _flo.js_ file, config to launch flo server:
```
'use strict';

var flo = require('fb-flo'),
    fs = require('fs'),
    path = require('path');

var dir = path.resolve(__dirname, 'public');
var server = flo(dir, { glob: ['**/*.js', '**/*.css'] }, resolver);

server.once('ready', function() {
    console.log('fb-flo server ready');
});

function resolver(filepath, callback) {
    console.log(filepath + ' modified');

    var fullPath = path.resolve(dir, filepath);
    callback({
        resourceURL: filepath,
        contents: fs.readFileSync(fullPath).toString()
    });
}
```

1. Add the following folders to _.gitignore_ file:
> _build_
> _bower\_components_
> _node\_modules_


## <a name="with-skeleton"></a>2. With skeleton
1. Create new app with a « dead simple » skeleton project for brunch
```
brunch n gh:brunch/dead-simple
npm install & bower install
```

1. Install following Brunch plugins:
```
npm i --save uglify-js-brunch
npm i --save clean-css-brunch

npm i --save coffee-script-brunch
npm i --save stylus-brunch
npm i --save jshint-brunch
npm i --save coffeelint-brunch
```
Remove useless _auto-reload-brunch_ plugin in _package.json_ file and in _node\_modules_ folder.
We use _fb-flo_ in place of it.

1. Install project dependencies:
```
bower install -S angular
bower install -S normalize.css
bower install -S semantic-ui
```
Once all command executed, dependencies in _bower.json_ file looks like:
```
  "dependencies": {
    "angular": "~1.3.1",
    "normalize.css": "~3.0.2",
    "semantic-ui": "~0.19.3"
  }
```


## <a name="development"></a>3. Development
- `public/` dir is fully auto-generated and served by HTTP server.  Write your code in `app/` dir.
- Place static files you want to be copied from `app/assets/` to `public/`.


## Note: Rights execution bug
Run following command on Mac to resolve access rights during installation with `npm` :
```
sudo chown -R `whoami` ~/.npm
```
