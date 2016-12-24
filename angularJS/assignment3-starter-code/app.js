(function () {
  angular.
    module("NarrowItDownApp", []).
    controller("NarrowItDownController", NarrowItDownController).
    service("MenuSearchService", MenuSearchService).
    directive("foundItems", FoundItems).
    constant("REST_API_URL", "//davids-restaurant.herokuapp.com/menu_items.json");

  NarrowItDownController.$inject = ["MenuSearchService"];
  function NarrowItDownController(MenuSearchService) {
    var menu = this;

    menu.found = [];
    menu.searchTerm = "";
    menu.showError = false;

    menu.narrowItDown = function () {
      menu.found = [];

      if (menu.searchTerm) {
        var foundItemsPromise = MenuSearchService.getMatchedMenuItems(menu.searchTerm);
        foundItemsPromise.then(function (items) {
          menu.found = items;
          menu.setShowError();
        });
      } else {
        menu.setShowError();
      }
    };

    menu.removeItem = function (index) {
      menu.found.splice(index, 1);
    };

    menu.setShowError = function () {
      menu.showError = (menu.found.length === 0);
    };
  }

  MenuSearchService.$inject = ["$http", "REST_API_URL"];
  function MenuSearchService($http, REST_API_URL) {
    var service = this;

    service.getMatchedMenuItems = function (searchTerm) {
      return $http({
        method: 'GET',
        url: REST_API_URL,
      }).then(function (response) {
        return response.data.menu_items.filter(function (item) {
          return item.description.indexOf(searchTerm) !== -1;
        });
      }).catch(function (error) {
        console.log(error);
      });
    };
  }

  function FoundItems() {
    var ddo = {
      templateUrl: "foundItems.html",
      scope: {
        items: "<",
        error: "<",
        onRemove: "&"
      }
    };

    return ddo;
  }
})();
