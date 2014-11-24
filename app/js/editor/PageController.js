'use strict';

angular.module('inneair.origami.editor').controller(
    'PageController',
    ['$scope', 'PageStore', 'BikeManufacturer', function PageController($scope, pageStore, bikeManufacturer) {
        $scope.pages = pageStore.pages;
        $scope.maxNumberOfBike = bikeManufacturer.maxNumberOfBike;
        $scope.bikes = bikeManufacturer.bikeStore;
    }]
);
