'use strict';

// Create the application module, and declare its dependencies.
angular.module('inneair.origami', [
    'ui.router',
    'inneair.origami.studio',
    'inneair.origami.editor'
]).config([
    '$locationProvider',
    '$urlRouterProvider',
    '$stateProvider',
    'PageStoreProvider',
    'BikeManufacturerProvider',
    function($locationProvider, $urlRouterProvider, $stateProvider, pageStoreProvider, bikeManufacturerProvider) {
        // Tries to use HTML5 history component for URLs, if supported. Use anchors as a fallback.
        $locationProvider.html5Mode(true);

        // Routing rules.
        // Default state when bootstrapping the application, or for unknown paths.
        // Do not confuse with the 'path-like' syntax, the argument is a state name, not a path.
        $urlRouterProvider.otherwise('/editor');

        // The 'origami' state is the root router state, it declares two views are existing simultaneously, and
        // implicitly targets the topmost 'data-ui-view' HTML attribute.
        $stateProvider.state({
            name: 'origami',
            views: {
                'menu': {
                    templateUrl: '/menu.html'
                },
                'content': {}
            }
        });

        pageStoreProvider.setResourceUrl('/editor/pages.json');
        bikeManufacturerProvider.setMaxNumberOfBike(10);
    }
]);
