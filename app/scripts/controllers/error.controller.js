app.controller('ErrorController',
    function ($scope, $rootScope, $location) {
      $rootScope.errorPage = true;

      $scope.homePage = function () {
        $location.path("/");
      };
    });
