(function () {
  'use strict';

  angular.module('LunchCheck', [])

  .controller('LunchCheckController', function ($scope) {
    $scope.dishes

    $scope.checkIfTooMuch = function () {
      // Check if dishes were typed in
      if ($scope.dishes == undefined ||
         $scope.dishes.trim().length == 0) {
        $scope.message = "Please enter data first!"
        return
      }

      // Count how many dishes were typed in
      if ($scope.dishes.split(',').length < 4) {
        $scope.message = "You're good. Enjoy!";
      } else {
        $scope.message = "You took too much man, too much, too much!";
      }
    }
  });

})();
