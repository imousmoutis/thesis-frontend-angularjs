app.controller('NavbarController',
    function ($rootScope, $cookies, $location, $scope, jwtHelper, IndexService, CONSTANTS, $translate) {

      $scope.CONSTANTS = CONSTANTS;

      if ($cookies.get("jwt")) {
        var decodedJwt = jwtHelper.decodeToken($cookies.get("jwt"));
        $rootScope.loggedUser = decodedJwt.sub;
        $rootScope.loggedUserRole = decodedJwt.role1;
      }

      $scope.logout = function () {
        IndexService.logout()
        .then(function (response) {
          $cookies.remove("jwt");
          $rootScope.userIsLogged = false;
          $location.path("/");
        });
      };

      $scope.changeLanguage = function (lang) {
        $translate.use(lang);
      };

    });
