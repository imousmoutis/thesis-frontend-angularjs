app.controller('AppController', function ($rootScope, $cookies, $location, $scope, jwtHelper, IndexService) {

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
  }
});
