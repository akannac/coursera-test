
(function () {
    'use strict';

    angular.module('MenuApp')
        .controller('CategoryController', CategoryController);

    CategoryController.$inject = ['categoriesList'];
    function CategoryController(categoriesList) {
        this.categoriesList = categoriesList;
    }
})()
