app.controller('NavbarController',
    function ($rootScope, $cookies, $location, $scope, jwtHelper, IndexService, CONSTANTS, $translate, $filter) {

      $scope.CONSTANTS = CONSTANTS;

      $scope.currentLanguage = $translate.use();

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
        $scope.currentLanguage = lang;
        updateTitle();
      };

      updateTitle = function () {
        console.log($location.path() === '/');
        if ($location.path() === '/') {
          $translate('admin')
          .then(function (translatedValue) {
            $rootScope.title = translatedValue;
          });
        } else if ($location.path() === '/login') {
          $rootScope.title = $filter('translate')('login');
        } else if ($location.path() === '/admin') {
          $rootScope.title = $filter('translate')('admin');
        } else if ($location.path() === '/dashboard') {
          $rootScope.title = $filter('translate')('dashboard');
        }
      };

    });
