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
