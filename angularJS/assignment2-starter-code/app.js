(function () {
'use strict';

angular.module('ShoppingListCheckOff', [])
.controller('ToBuyShoppingController', ToBuyShoppingController)
.controller('AlreadyBoughtShoppingController', AlreadyBoughtShoppingController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService);

ToBuyShoppingController.$inject = ['ShoppingListCheckOffService'];
function ToBuyShoppingController(ShoppingListCheckOffService) {
  var showToBuyList = this;

  showToBuyList.items = ShoppingListCheckOffService.getToBuyItems();

  showToBuyList.buyItem = function (itemIndex) {

    ShoppingListCheckOffService.buyItem(itemIndex);

  }

}

AlreadyBoughtShoppingController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtShoppingController(ShoppingListCheckOffService) {
  var showBoughtList = this;

  showBoughtList.items = ShoppingListCheckOffService.getBoughtItems();

}
function ShoppingListCheckOffService() {
  var service = this;

  // List of to buy items
  var buyItems = [
    { name: "bananas", quantity: 5 },
    { name: "cookies", quantity: 10 },
    { name: "yogurt", quantity: 3 },
    { name: "soy sauce", quantity: 1 },
    { name: "spaghety", quantity: 2 }
  ];

  // List of bought items
  var boughtItems = []

  service.getToBuyItems = function () {
    return buyItems;
  };

  service.getBoughtItems = function () {
    return boughtItems;
  };

  service.buyItem = function (itemIndex){
    boughtItems.push(buyItems[itemIndex]);
    buyItems.splice(itemIndex,1);
  }

}

})();
