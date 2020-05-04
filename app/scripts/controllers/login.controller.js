app.controller('LoginController',
    function ($scope, LoginService, $rootScope, $cookies, $location, jwtHelper, Notification) {

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
        LoginService.login({username: $scope.user.username, password: $scope.user.password})
        .then(function (response) {
          Notification.success({message: 'You are successfully logged in.', positionY: 'top', positionX: 'right'});
          var jwt = response.headers('Authorization');
          $cookies.put("jwt", jwt);
          $rootScope.userIsLogged = true;

          var decodedJwt = jwtHelper.decodeToken(jwt);
          $rootScope.loggedUser = decodedJwt.sub;
          $rootScope.loggedUserRole = decodedJwt.role1;
          $location.path("/dashboard");
        }, function (error) {
          Notification.error({message: 'An error occurred while logging in.', positionY: 'top', positionX: 'right'});
          $scope.loginUnavailable = true;
        });

      };

      $scope.register = function () {
        $scope.registerUnavailable = false;

        LoginService.register($scope.user)
        .then(function (response) {
          Notification.success({message: 'You are successfully registered.', positionY: 'top', positionX: 'right'});
          $scope.login();
        }, function (error) {
          Notification.error({message: 'An error occurred while registering.', positionY: 'top', positionX: 'right'});
        });
      };
    });
