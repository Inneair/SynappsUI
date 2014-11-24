exports.config =
    modules:
        definition: false
        wrapper: false
    files:
        javascripts:
            joinTo:
                'js/app-1.1.0.js': /^app[\/|\\]js[\/|\\].*$/
                'js/vendor.js': /^(bower_components|vendor)[\/|\\].*$/
            order:
                before: [
                    'app/js/synapps/Array.js',
                    'app/js/OrigamiModule.js',
                    'app/js/studio/StudioModule.js',
                    'app/js/editor/EditorModule.js'
                ]
        stylesheets:
            joinTo:
                'css/app-1.1.0.css': /^app[\/|\\](assets[\/|\\])?css[\/|\\].*$/
                'css/vendor.css': /^(?!app[\/|\\]).*$/
        templates:
            joinTo: 'js/app-1.1.0.js'
