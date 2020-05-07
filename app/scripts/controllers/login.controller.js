app.controller('LoginController',
    function ($scope, IndexService, $rootScope, $localStorage, $location, jwtHelper, Notification, CONSTANTS, $filter) {

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

      $scope.login = function (bypassCheck) {

        if (bypassCheck || $scope.forms.loginForm.$valid) {
          $scope.loginUnavailable = false;
          IndexService.login({username: $scope.user.username, password: $scope.user.password})
          .then(function (response) {
            Notification.success({message: $filter('translate')('loginSuccessful')});
            var jwt = response.headers('Authorization');
            $localStorage.jwt = jwt;
            $rootScope.userIsLogged = true;

            var decodedJwt = jwtHelper.decodeToken(jwt);
            $rootScope.loggedUser = decodedJwt.sub;
            $rootScope.loggedUserRole = decodedJwt.role1;
            if ($rootScope.loggedUserRole === CONSTANTS.USER_ADMIN) {
              $location.path("/admin");
            } else {
              $location.path("/dashboard");
            }
          }, function (error) {
            $scope.loginUnavailable = true;
          });
        }

      };

      $scope.register = function () {
        if ($scope.forms.registerForm.$valid) {
          IndexService.register($scope.user)
          .then(function (response) {
            Notification.success({message: $filter('translate')('registerSuccessful')});
            $scope.login(true);
          }, function (error) {
          });
        }
      };
    });
