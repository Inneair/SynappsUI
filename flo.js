'use strict';

var flo = require('fb-flo'),
    fs = require('fs'),
    path = require('path');

var dir = path.resolve(__dirname, 'public');
var server = flo(
    dir,
    {
        host: 'localhost',
        port: 65000,
        verbose: false,
        glob: ['**/*.js', '**/*.css']
    },
    resolver
);

server.once('ready', function() {
    console.log('fb-flo server ready');
});

function resolver(filepath, callback) {
    console.log(filepath + ' modified');

    var fullPath = path.resolve(dir, filepath);
    callback({
        resourceURL: filepath,
        reload: !filepath.match(/^.*\.(js|css)$/),
        contents: fs.readFileSync(fullPath).toString()
    });
}
