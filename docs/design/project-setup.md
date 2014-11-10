# Initialisation du projet

## <a name="scratch"></a>1. Depuis un répertoire vide

### Configuration NPM
Create a `package.json` file:
```sh
npm init
```
Here is an example output:
```json
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

### Plugins Brunch
```sh
npm i --save css-brunch
npm i --save javascript-brunch

npm i --save uglify-js-brunch
npm i --save clean-css-brunch

npm i --save coffee-script-brunch
npm i --save stylus-brunch
npm i --save jshint-brunch
npm i --save coffeelint-brunch
```
Once all command executed, dependencies in `package.json` file looks like:
```json
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

### Configuration Bower
Create a `bower.json` file:
```sh
bower init
```
Here is an example output:
```json
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

### Dépendances
Install dependencies used in the project:
```sh
bower install -S angular
bower install -S normalize.css
bower install -S semantic-ui
```
Dependencies in `bower.json` file shall looks like:
```json
  "dependencies": {
    "angular": "~1.3.1",
    "normalize.css": "~3.0.2",
    "semantic-ui": "~0.19.3"
  }
```

### Configuration Brunch
Create a `brunch-config.coffee` file in the project root directory with this content:
```coffee
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

### Configuration fb-flo
Create a `flo.js` file in the project root directory for the front synchronization server, with this content:
```javascript
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

### Configuration Git
Add the following folders to a `.gitignore` file in the project root director:
```
/build/
/bower_components/
/node_modules/
```

## <a name="template"></a>1. Depuis un modèle
### Modèle d'application Brunch
Create a new application with a "dead simple" skeleton project for brunch:
```sh
brunch n gh:brunch/dead-simple
npm install & bower install
```

### Plugins Brunch
Install plugins:
```sh
npm i --save uglify-js-brunch
npm i --save clean-css-brunch

npm i --save coffee-script-brunch
npm i --save stylus-brunch
npm i --save jshint-brunch
npm i --save coffeelint-brunch
```
Remove useless _auto-reload-brunch_ plugin in `package.json` file and in `node_modules` folder.
We use _fb-flo_ in place of it.

### Dépendances
Install dependencies:
```sh
bower install -S angular
bower install -S normalize.css
bower install -S semantic-ui
```
Dependencies in the `bower.json` file shall looks like:
```json
  "dependencies": {
    "angular": "~1.3.1",
    "normalize.css": "~3.0.2",
    "semantic-ui": "~0.19.3"
  }
```

__Note__: il peut être nécessaire
Run the following command on Mac to resolve access rights during installation with `npm`:
```sh
chown -R `whoami` ~/.npm
```
