(function () {
    'use strict';

    angular.module('ShoppingListCheckOff', [])
        .controller('ToBuyShoppingController', ToBuyShoppingController)
        .controller('AlreadyBoughtShoppingController', AlreadyBoughtShoppingController)
        .service('ShoppingListCheckOffService', ShoppingListCheckOffService);

    ToBuyShoppingController.$inject = ['ShoppingListCheckOffService'];
    function ToBuyShoppingController(ShoppingListCheckOffService) {
        var service = ShoppingListCheckOffService;
        var ctrl = this;
        ctrl.list = service.getToBuyList();
        ctrl.isEmpty = service.isToBuyListEmpty;
        ctrl.checkOff = service.checkOff;
    }

    AlreadyBoughtShoppingController.$inject = ['ShoppingListCheckOffService'];
    function AlreadyBoughtShoppingController(ShoppingListCheckOffService) {
        var service = ShoppingListCheckOffService;
        var ctrl = this;
        ctrl.list = service.getBoughtList();
        ctrl.isEmpty = service.isBoughtListEmpty;
    }

    function ShoppingListCheckOffService() {
        var service = this;

        service.toBuyList = [
            {
                name: "bananas",
                quantity: "2 kg"
            },
            {
                name: "cookies",
                quantity: "5 pcks"
            },
            {
                name: "strawberries",
                quantity: "600 gr"
            },
            {
                name: "red_wine",
                quantity: "4 bottles"
            },
            {
                name: "cucumber",
                quantity: "10 pcs"
            },
            {
                name: "Eggs",
                quantity: "3 pcks"
            }
        ];

        service.boughtList = [];

        service.checkOff = function (itemIndex) {
            var boughtItem = service.toBuyList.splice(itemIndex, 1)[0];
            service.boughtList.push(boughtItem);
        };

        service.getToBuyList = function () {
            return service.toBuyList;
        };

        service.getBoughtList = function () {
            return service.boughtList;
        };

        service.isToBuyListEmpty = function () {
            return service.toBuyList.length == 0;
        };

        service.isBoughtListEmpty = function () {
            return service.boughtList.length == 0;
        };
    }

})();
