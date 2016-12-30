
(function () {
    'use strict';

    angular.module('MenuApp')
        .component('categories', {
            templateUrl: 'templates/categories.template.html',
            binding: {
                categoriesList: '<'
            }
        });
})()
