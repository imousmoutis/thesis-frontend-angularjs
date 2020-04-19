app.controller('LoginController',
    function ($scope, LoginService, $rootScope, $cookies, $location, jwtHelper, FormValidation) {

      $scope.loginUnavailable = false;
      $scope.registerUnavailable = false;
      $scope.loginForm = true;
      $scope.user = {
        username: '',
        password: '',
        email: '',
        fullName: ''
      };

      $scope.toggleLoginForm = function () {
        $scope.loginForm = !$scope.loginForm;
      };

      $scope.login = function () {
        $scope.loginUnavailable = false;
        LoginService.login({username: $scope.user.username, password: $scope.user.password})
        .then(function (response) {
          var jwt = response.headers('Authorization');
          $cookies.put("jwt", jwt);
          $rootScope.userIsLogged = true;

          var decodedJwt = jwtHelper.decodeToken(jwt);
          $rootScope.loggedUser = decodedJwt.sub;
          $rootScope.loggedUserRole = decodedJwt.role1;
          $location.path("/dashboard");
        }, function (error) {
          $scope.loginUnavailable = true;
        });
      };

      $scope.register = function () {
        $scope.registerUnavailable = false;

        LoginService.register($scope.user)
        .then(function (response) {
          $scope.login();
        }, function (error) {
          $scope.registerUnavailable = true;
          validateForm(error);
        });
      };

      function validateForm(error) {
        FormValidation.renderErrors($scope, $scope.registerForm, error.data.errors);
      }
    });