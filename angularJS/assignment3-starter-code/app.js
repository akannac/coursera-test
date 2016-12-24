(function () {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.directive('foundItems', FoundItemsDirective)



function FoundItemsDirective() {
  var ddo = {
    templateUrl: 'foundItems.html',
    scope: {
      //list: '=myList', // two-way binding attribute, i.e. <found-items my-list=".."/>
      found: '<', // one-way binding attrib, ie. <found-items found="...">
      message: '<displayMessage',
      onRemove: '&' // parent in charge of data, but directive needs button to remove it
      //onRemove is used in parent template on this directive
    },
  };

  return ddo;
}

NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {
  var list = this;
  list.itemName = "";
  list.found = []; //MenuSearchService.getFoundItems();

  // SEARCH FOR THE MENU ITEM
  list.narrowItDown = function () {

    list.isLoading = true;
    list.message = "";

    return MenuSearchService.getMatchedMenuItems(list.itemName)
    .then( function(result) {
      list.found = result;
      list.isLoading = false;
      if (list.found.length == 0) {
        list.message = "Nothing found.";
      }
    })
    .catch( function(error) {
      console.log("something went wrong!", error);
      list.isLoading = false;
    })
    //list.found = MenuSearchService.getMatchedMenuItems(list.itemName);
  };

  // REMOVE A MENU ITEM (AT INDEX)
  list.removeItem = function(index) {
    MenuSearchService.removeItem(index);
    if (list.found.length == 0) {
      list.message = "Removed all items.  Nothing found.";
    }
  }

}


MenuSearchService.$inject = ['$http', '$q'];
function MenuSearchService($http, $q) {
  var service = this;
  var foundItems = [];

  // service.getFoundItems = function() {
  //   return foundItems;
  // }

  service.removeItem = function(index) {
    foundItems.splice(index, 1);
  }

  // ASYNC function, return the promise
  service.getMatchedMenuItems = function(searchTerm) {
    foundItems.length = 0;
    if (searchTerm.length == 0) {
      var d = $q.defer();
      d.resolve(foundItems);
      return d.promise;
    }

    var promise = $http({
      method: "GET",
      templateUrl: "https://davids-restaurant.herokuapp.com/menu_items.json."
    });

    return promise.then(function (response) {
      var allItems = response.data.menu_items;
      for (var i = 0; i < allItems.length; i++) {
        if (allItems[i].description.indexOf(searchTerm) != -1) {
          foundItems.push(allItems[i]);
        }
      }
      //console.clear();
      console.log("All:", allItems);
      console.log("Matched items:", foundItems);
      return foundItems;
    })
    .catch(function (error) {
      console.log("Error:", error);
    })
  };
}

})();
