(function () {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com/menu_items.json")
.directive('foundItems', FoundItemsDirective)

function FoundItemsDirective() {
  var ddo = {
    templateUrl: 'list.html',
    scope: {
      items: '<',
      onRemove: '&',
      showError:'<'
    },
    controller: NarrowItDownController,
    controllerAs: 'list',
    bindToController: true,
  };

  return ddo;
}

NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {
  var ctrl = this;

  ctrl.searchTerm ='';
  ctrl.found = []
  ctrl.showError = false;

  ctrl.getItems = function () {
    var promise = MenuSearchService.getMatchedMenuItems(ctrl.searchTerm);
    promise.then(function (response) {
      if (response.length !== 0) {
        ctrl.showError = false;
        ctrl.found = response;
      }else {
        ctrl.showError =true;
      }
    })
    .catch(function (error){
      console.log('something went wrong.' + error);
      ctrl.showError =true;
    })
  };
  ctrl.removeItem = function (itemIndex) {
    ctrl.found.splice(itemIndex, 1);
  };
}

MenuSearchService.$inject = ['$http', 'ApiBasePath','$filter']
function MenuSearchService($http, ApiBasePath) {
  var service = this;

  service.getMatchedMenuItems = function (searchTerm) {
    return $http({
      method: "GET",
      url: (ApiBasePath)

    }).then(function (result) {
        // process result and only keep items that match
        var foundItemsInitial = result.data.menu_items;
        var foundItems = [];
        if (searchTerm.length !== 0){
          for (var i = 0; i < foundItemsInitial.length; i++) {
            if (foundItemsInitial[i].description.toLowerCase().indexOf(searchTerm.toLowerCase()) !==-1){
              foundItems.push(foundItemsInitial[i]);
            }
          }
        }
        // return processed items
        return foundItems;
    });

  };
}

})();
