'use strict';

// Create the editor module of Origami.
angular.module('inneair.origami.studio', []).config([
    '$stateProvider',
    function($stateProvider) {
        $stateProvider.state({
            name: 'studio',
            parent: 'origami',
            url: '/studio',
            views: {
                'content@': {
                    template: '<div data-ui-view></div>'
                }
            }
        });
    }
]);
