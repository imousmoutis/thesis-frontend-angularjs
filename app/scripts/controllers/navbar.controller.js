app.controller('NavbarController',
    function ($rootScope, $location, $scope, jwtHelper, IndexService, CONSTANTS, $translate, LexiconService, $localStorage) {

      $scope.CONSTANTS = CONSTANTS;

      LexiconService.getLanguages()
      .then(function (response) {
        $scope.languages = response.data;
      });

      $scope.logout = function () {
        IndexService.logout()
        .then(function (response) {
          $localStorage.jwt = null;
          $rootScope.userIsLogged = false;
          $location.path("/");
        });
      };

      $scope.changeLanguage = function (lang) {
        $translate.use(lang);
      };

    });
