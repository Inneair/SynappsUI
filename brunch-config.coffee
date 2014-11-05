exports.config =
  files:
    javascripts:
      joinTo:
        'js/app.js': /^app/
        'js/vendor.js': /^(bower_components|vendor)/
    stylesheets:
      joinTo:
        'css/app.css': /^app/
        'css/vendor.css': /^(?!app)/
    templates:
      joinTo: 'js/app.js'