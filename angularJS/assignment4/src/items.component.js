
(function () {
    'use restrict';

    angular.module('MenuApp')
        .component('items', {
            templateUrl: 'templates/items.template.html',
            binding: {
                itemsList: '<'
            }
        });;
})()
