'use strict';

// Create the editor module of Origami.
angular.module('inneair.origami.editor', ['ngResource']).config([
    '$urlRouterProvider',
    '$stateProvider',
    function($urlRouterProvider, $stateProvider) {
        // Routing rules.
        // Default state for the editor module.
        $urlRouterProvider.when('/editor', '/editor/page');

        // The 'editor' state is the root routing state of the editor module.
        // The 'page' state matches the display of the list of pages.
        $stateProvider.state({
            name: 'editor',
            parent: 'origami',
            url: '/editor',
            views: {
                'content@': {
                    template: '<div data-ui-view></div>'
                }
            }
        }).state({
            name: 'page',
            parent: 'editor',
            url: '/page',
            templateUrl: '/editor/page-list.html',
            controller: 'PageController'
        });
    }
]);
