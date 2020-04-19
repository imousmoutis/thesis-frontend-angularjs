app.controller('AppController', function ($rootScope, $cookies, $location, $scope, jwtHelper) {

  if ($cookies.get("jwt")) {
    var decodedJwt = jwtHelper.decodeToken($cookies.get("jwt"));
    $rootScope.loggedUser = decodedJwt.sub;
    $rootScope.loggedUserRole = decodedJwt.role1;
  }

  $scope.logout = function () {
    $cookies.remove("jwt");
    $rootScope.userIsLogged = false;
    $location.path("/");
  }
});