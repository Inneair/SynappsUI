#https://github.com/trunkclub/brunch-with-panache/tree/master/test

{config} = require('../brunch-config')
path = require('path')

module.exports = (karmaConfig) ->
  karmaConfig.set(
    autoWatch: true,
    frameworks: ['mocha', 'chai', 'sinon-chai', 'detectBrowsers']
    files: [
      '../node_modules/mocha-as-promised/mocha-as-promised.js'
      path.join('../', config.paths.public, 'scripts/vendor.js')
      path.join('../', config.paths.public, 'scripts/app.js')
      './code/**/*'
    ]
    preprocessors:
      '**/*.coffee': ['coffee']
  )