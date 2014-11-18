exports.config =
    modules:
        definition: false
        wrapper: false
    files:
        javascripts:
            joinTo:
                'js/app-1.0.0.js': /^app/
                'js/vendor.js': /^(bower_components|vendor)/
            order:
                before: []
        stylesheets:
            joinTo:
                'css/app-1.0.0.css': /^app/
                'css/vendor.css': /^(?!app)/
        templates:
            joinTo: 'js/app-1.0.0.js'
