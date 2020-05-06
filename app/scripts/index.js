var app = angular.module('ThesisApp',
    ['ngRoute', 'ngAnimate', 'ngTable', 'angular-jwt', 'ui.bootstrap',
      'ui-notification', 'pascalprecht.translate', 'ngStorage', 'ngCookies', 'ngSanitize']);

app.constant('CONSTANTS', {
  BASE: 'http://localhost:8080/thesis/api/',
  USER_ADMIN: 'Administrator',
  TABLE_RESULTS: 10,
  DEFAULT_SORTING_DIRECTION: 'asc'
});

app.run(function ($rootScope, $localStorage, jwtHelper, Notification, $filter, $location, $translate) {
  if ($localStorage.jwt) {
    $rootScope.userIsLogged = true;

    var decodedJwt = jwtHelper.decodeToken($localStorage.jwt);
    $rootScope.loggedUser = decodedJwt.sub;
    $rootScope.loggedUserRole = decodedJwt.role1;
  }

  $rootScope.displayErrorMessage = function () {
    Notification.error({
      message: $filter('translate')('genericError')
    });
  };

  $rootScope.unAuthorizedErrorMessage = function () {
    Notification.error({
      message: $filter('translate')('unauthorizedError')
    });
  };

  $rootScope.$on('$translateChangeSuccess', function () {
    updateTitle();
    $rootScope.currentLanguage = $translate.use();
  });

  $rootScope.$on('$routeChangeStart', function () {
   updateTitle();
  });

  updateTitle = function () {
    if ($location.path() === '/') {
      $rootScope.title = $filter('translate')('home');
    } else if ($location.path() === '/login') {
      $rootScope.title = $filter('translate')('login');
    } else if ($location.path() === '/admin') {
      $rootScope.title = $filter('translate')('admin');
    } else if ($location.path() === '/dashboard') {
      $rootScope.title = $filter('translate')('dashboard');
    }
  }
});

app.factory('responseObserver', function responseObserver($q, $rootScope, $location, $localStorage) {
  return {
    'responseError': function (errorResponse) {
      if (($location.absUrl().split('/').pop() !== 'login') && (errorResponse.status === 403)) {
        $rootScope.unAuthorizedErrorMessage();
        $localStorage.jwt = null;
        $rootScope.userIsLogged = false;
        $location.path("/");
      } else {
        $rootScope.displayErrorMessage();
      }
      return $q.reject(errorResponse);
    }
  };
});

app.config(
    function ($routeProvider, $httpProvider, $locationProvider, NotificationProvider, $translateProvider, CONSTANTS) {

      $translateProvider
      .preferredLanguage("en")
      .useLocalStorage()
      .useSanitizeValueStrategy("escaped")
      .useUrlLoader(CONSTANTS.BASE + "lexicon/");

      $locationProvider.hashPrefix('');

      $httpProvider.interceptors.push('responseObserver');

      $routeProvider
      .when('/', {
        templateUrl: 'html/home.html',
        controller: 'HomeController',
        resolve: {
          app: function ($rootScope) {
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
