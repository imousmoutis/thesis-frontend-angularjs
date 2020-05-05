var app = angular.module('ThesisApp',
    ['ngRoute', 'ngCookies', 'ngAnimate', 'ngTable', 'angular-jwt', 'ui.bootstrap',
      'ui-notification']);

app.constant('CONSTANTS', {
  BASE: 'http://localhost:8080/thesis/api/',
  USER_ADMIN: 'Administrator',
  TABLE_RESULTS: 10,
  DEFAULT_SORTING_DIRECTION: 'asc'
});

app.run(function ($rootScope, $cookies, jwtHelper, Notification) {
  if ($cookies.get("jwt")) {
    $rootScope.userIsLogged = true;

    var decodedJwt = jwtHelper.decodeToken($cookies.get("jwt"));
    $rootScope.loggedUser = decodedJwt.name;
    $rootScope.loggedUserRole = decodedJwt.role;
  }

  $rootScope.displayErrorMessage = function () {
    Notification.error({
      message: 'An error occurred while serving your request. Please try again or contact your'
          + ' administrator.'
    });
  }

  $rootScope.unAuthorizedErrorMessage = function () {
    Notification.error({
      message: 'You tried to access a page for which you do not have access. You are being logged out.'
    });
  }
});

app.factory('responseObserver', function responseObserver($q, $rootScope, $location, $cookies) {
  return {
    'responseError': function (errorResponse) {
      if (($location.absUrl().split('/').pop() !== 'login') && (errorResponse.status === 403)) {
        $rootScope.unAuthorizedErrorMessage();
        $cookies.remove("jwt");
        $rootScope.userIsLogged = false;
        $location.path("/");
      } else {
        $rootScope.displayErrorMessage();
      }
      return $q.reject(errorResponse);
    }
  };
});

app.config(function ($routeProvider, $httpProvider, $locationProvider, NotificationProvider) {

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
  .when('/admin', {
    templateUrl: 'html/admin.html',
    controller: 'AdminController',
    resolve: {
      app: function ($q, $rootScope, $location) {
        var defer = $q.defer();

        if (!$rootScope.userIsLogged) {
          $location.path('/');
        } else {
          $rootScope.title = 'Admin Page';
          $rootScope.activePage = 4;
        }

        defer.resolve();
        return defer.promise;
      }
    }
  })
  .otherwise({redirectTo: '/'});

  NotificationProvider.setOptions({
    delay: 10000,
    startTop: 20,
    startRight: 10,
    verticalSpacing: 20,
    horizontalSpacing: 20,
    positionX: 'right',
    positionY: 'top'
  });

  $(document).on('click', '.navbar-collapse.in', function (e) {
    if ($(e.target).is('a:not(".dropdown-toggle")')) {
      $(this).collapse('hide');
    }
  });
});
