var app = angular.module('ThesisApp',
    ['ngRoute', 'ngCookies', 'ngAnimate', 'ngTable', 'angular-jwt', 'ui.bootstrap', 'ng-toggle.btn',
      'ui-notification']);

app.constant('CONSTANTS', {
  BASE: 'http://localhost:8080/thesis/api/',
  USER_ADMIN: 'Administrator',
  TABLE_RESULTS: 10,
  DEFAULT_SORTING_DIRECTION: 'asc'
});

app.run(function ($rootScope, $cookies, jwtHelper) {
  if ($cookies.get("jwt")) {
    $rootScope.userIsLogged = true;

    var decodedJwt = jwtHelper.decodeToken($cookies.get("jwt"));
    $rootScope.loggedUser = decodedJwt.name;
    $rootScope.loggedUserRole = decodedJwt.role;
  }
});

app.factory('responseObserver', function responseObserver($q, $rootScope, $location, $cookies) {
  return {
    'responseError': function (errorResponse) {
      if ($location.absUrl().split('/').pop() != 'login') {
        switch (errorResponse.status) {
          case 403:
            $cookies.remove("jwt");
            $rootScope.userIsLogged = false;
            $location.path("/");
            break;
        }
      }
      return $q.reject(errorResponse);
    }
  };
});

app.config(function ($routeProvider, $httpProvider, $locationProvider) {

  $locationProvider.hashPrefix('');

  $httpProvider.interceptors.push('responseObserver');

  $routeProvider
  .when('/', {
    templateUrl: 'html/home.html',
    controller: 'HomeController',
    resolve: {
      app: function ($rootScope) {
        $rootScope.title = 'Home Page';
        $rootScope.activePage = 1;
      }
    }
  })
  .when('/login', {
    templateUrl: 'html/login.html',
    controller: 'LoginController',
    resolve: {
      app: function ($q, $rootScope, $location) {
        var defer = $q.defer();

        if ($rootScope.userIsLogged) {
          $location.path('/dashboard');
        } else {
          $rootScope.title = 'Login Page';
          $rootScope.activePage = 2;
        }

        defer.resolve();
        return defer.promise;
      }
    }
  })
  .when('/dashboard', {
    templateUrl: 'html/dashboard.html',
    controller: 'DashboardController',
    resolve: {
      app: function ($q, $rootScope, $location) {
        var defer = $q.defer();

        if (!$rootScope.userIsLogged) {
          $location.path('/');
        } else {
          $rootScope.title = 'Dashboard Page';
          $rootScope.activePage = 3;
        }

        defer.resolve();
        return defer.promise;
      }
    }
  })
  .otherwise({redirectTo: '/'});

  $(document).on('click', '.navbar-collapse.in', function (e) {
    if ($(e.target).is('a:not(".dropdown-toggle")')) {
      $(this).collapse('hide');
    }
  });
});

angular.module('ng-toggle.btn', [])
.directive('toggleBtn', [function () {
  return {
    restrict: 'EA',
    replace: true,
    require: ['name', '^ngModel'],
    scope: {
      isDisabled: '=',
      onType: '@',
      offType: '@',
      name: '@',
      ngModel: '=',
      ngChange: '&',
      onLabel: '@',
      offLabel: '@',
      required: '@',
      ngTrueValue: '@',
      ngFalseValue: '@'
    },
    template:
        ' <div class="toggle-switch" ng-class="\'on\'+onType+ \' \' + \'off\'+offType"> ' +
        '		<span ng-if="offLabel" class="off-label" ng-bind="offLabel"></span> ' +
        ' 	<input ng-model="ngModel" id="{{name}}" name="{{name}}" type="checkbox" selected="ngModel" ng-disabled="isDisabled" ng-change="ngChange()" '
        +
        '			hidden="" ng-true-value="{{ngTrueValue? ngTrueValue:true}}" ng-false-value="{{ngFalseValue? ngFalseValue:false}}" ng-required="required"><label for="{{name}}" '
        +
        '			class="toggle-knob"></label> ' +
        '		<span ng-if="onLabel" class="on-label" ng-bind="onLabel"></span> ' +
        '	</div> '
  };
}]);
