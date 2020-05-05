app.controller('LoginController',
    function ($scope, IndexService, $rootScope, $cookies, $location, jwtHelper, Notification, CONSTANTS) {

      $scope.forms = {};
      $scope.loginUnavailable = false;
      $scope.registerUnavailable = false;
      $scope.loginForm = true;
      $scope.user = {
        username: '',
        password: '',
        fullName: '',
        email: ''
      };

      $scope.toggleLoginForm = function () {
        $scope.loginForm = !$scope.loginForm;
      };

      $scope.login = function () {
        $scope.loginUnavailable = false;
        IndexService.login({username: $scope.user.username, password: $scope.user.password})
        .then(function (response) {
          Notification.success({message: 'You are successfully logged in.'});
          var jwt = response.headers('Authorization');
          $cookies.put("jwt", jwt);
          $rootScope.userIsLogged = true;

          var decodedJwt = jwtHelper.decodeToken(jwt);
          $rootScope.loggedUser = decodedJwt.sub;
          $rootScope.loggedUserRole = decodedJwt.role1;
          if ($rootScope.loggedUserRole === CONSTANTS.USER_ADMIN){
            $location.path("/admin");
          } else {
            $location.path("/dashboard");
          }
        }, function (error) {
          $scope.loginUnavailable = true;
        });

      };

      $scope.register = function () {
        $scope.registerUnavailable = false;

        IndexService.register($scope.user)
        .then(function (response) {
          Notification.success({message: 'You are successfully registered.'});
          $scope.login();
        }, function (error) {
        });
      };
    });
