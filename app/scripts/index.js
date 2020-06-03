var app = angular.module('ThesisApp',
    ['ngRoute', 'ngAnimate', 'ngTable', 'angular-jwt', 'ui.bootstrap',
      'ui-notification', 'pascalprecht.translate', 'ngStorage', 'ngCookies', 'ngSanitize']);

app.constant('CONSTANTS', {
  BASE: 'http://localhost:8080/thesis/api/',
  USER_ADMIN: 'Administrator',
  TABLE_RESULTS: 10,
  DEFAULT_SORTING_DIRECTION: 'asc'
});

app.run(function ($rootScope, $localStorage, jwtHelper, Notification, $filter, $location, $translate, $locale) {
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
    } else {
      $rootScope.title = $filter('translate')('404');
    }
  };

  var locales = {
    gr: {
      "DATETIME_FORMATS": {
        "AMPMS": [
          "\u03c0.\u03bc.",
          "\u03bc.\u03bc."
        ],
        "DAY": [
          "\u039a\u03c5\u03c1\u03b9\u03b1\u03ba\u03ae",
          "\u0394\u03b5\u03c5\u03c4\u03ad\u03c1\u03b1",
          "\u03a4\u03c1\u03af\u03c4\u03b7",
          "\u03a4\u03b5\u03c4\u03ac\u03c1\u03c4\u03b7",
          "\u03a0\u03ad\u03bc\u03c0\u03c4\u03b7",
          "\u03a0\u03b1\u03c1\u03b1\u03c3\u03ba\u03b5\u03c5\u03ae",
          "\u03a3\u03ac\u03b2\u03b2\u03b1\u03c4\u03bf"
        ],
        "ERANAMES": [
          "\u03c0\u03c1\u03bf \u03a7\u03c1\u03b9\u03c3\u03c4\u03bf\u03cd",
          "\u03bc\u03b5\u03c4\u03ac \u03a7\u03c1\u03b9\u03c3\u03c4\u03cc\u03bd"
        ],
        "ERAS": [
          "\u03c0.\u03a7.",
          "\u03bc.\u03a7."
        ],
        "FIRSTDAYOFWEEK": 0,
        "MONTH": [
          "\u0399\u03b1\u03bd\u03bf\u03c5\u03b1\u03c1\u03af\u03bf\u03c5",
          "\u03a6\u03b5\u03b2\u03c1\u03bf\u03c5\u03b1\u03c1\u03af\u03bf\u03c5",
          "\u039c\u03b1\u03c1\u03c4\u03af\u03bf\u03c5",
          "\u0391\u03c0\u03c1\u03b9\u03bb\u03af\u03bf\u03c5",
          "\u039c\u03b1\u0390\u03bf\u03c5",
          "\u0399\u03bf\u03c5\u03bd\u03af\u03bf\u03c5",
          "\u0399\u03bf\u03c5\u03bb\u03af\u03bf\u03c5",
          "\u0391\u03c5\u03b3\u03bf\u03cd\u03c3\u03c4\u03bf\u03c5",
          "\u03a3\u03b5\u03c0\u03c4\u03b5\u03bc\u03b2\u03c1\u03af\u03bf\u03c5",
          "\u039f\u03ba\u03c4\u03c9\u03b2\u03c1\u03af\u03bf\u03c5",
          "\u039d\u03bf\u03b5\u03bc\u03b2\u03c1\u03af\u03bf\u03c5",
          "\u0394\u03b5\u03ba\u03b5\u03bc\u03b2\u03c1\u03af\u03bf\u03c5"
        ],
        "SHORTDAY": [
          "\u039a\u03c5\u03c1",
          "\u0394\u03b5\u03c5",
          "\u03a4\u03c1\u03af",
          "\u03a4\u03b5\u03c4",
          "\u03a0\u03ad\u03bc",
          "\u03a0\u03b1\u03c1",
          "\u03a3\u03ac\u03b2"
        ],
        "SHORTMONTH": [
          "\u0399\u03b1\u03bd",
          "\u03a6\u03b5\u03b2",
          "\u039c\u03b1\u03c1",
          "\u0391\u03c0\u03c1",
          "\u039c\u03b1\u0390",
          "\u0399\u03bf\u03c5\u03bd",
          "\u0399\u03bf\u03c5\u03bb",
          "\u0391\u03c5\u03b3",
          "\u03a3\u03b5\u03c0",
          "\u039f\u03ba\u03c4",
          "\u039d\u03bf\u03b5",
          "\u0394\u03b5\u03ba"
        ],
        "STANDALONEMONTH": [
          "\u0399\u03b1\u03bd\u03bf\u03c5\u03ac\u03c1\u03b9\u03bf\u03c2",
          "\u03a6\u03b5\u03b2\u03c1\u03bf\u03c5\u03ac\u03c1\u03b9\u03bf\u03c2",
          "\u039c\u03ac\u03c1\u03c4\u03b9\u03bf\u03c2",
          "\u0391\u03c0\u03c1\u03af\u03bb\u03b9\u03bf\u03c2",
          "\u039c\u03ac\u03b9\u03bf\u03c2",
          "\u0399\u03bf\u03cd\u03bd\u03b9\u03bf\u03c2",
          "\u0399\u03bf\u03cd\u03bb\u03b9\u03bf\u03c2",
          "\u0391\u03cd\u03b3\u03bf\u03c5\u03c3\u03c4\u03bf\u03c2",
          "\u03a3\u03b5\u03c0\u03c4\u03ad\u03bc\u03b2\u03c1\u03b9\u03bf\u03c2",
          "\u039f\u03ba\u03c4\u03ce\u03b2\u03c1\u03b9\u03bf\u03c2",
          "\u039d\u03bf\u03ad\u03bc\u03b2\u03c1\u03b9\u03bf\u03c2",
          "\u0394\u03b5\u03ba\u03ad\u03bc\u03b2\u03c1\u03b9\u03bf\u03c2"
        ],
        "WEEKENDRANGE": [
          5,
          6
        ],
        "fullDate": "EEEE, d MMMM y",
        "longDate": "d MMMM y",
        "medium": "d MMM y h:mm:ss a",
        "mediumDate": "d MMM y",
        "mediumTime": "h:mm:ss a",
        "short": "d/M/yy h:mm a",
        "shortDate": "d/M/yy",
        "shortTime": "h:mm a"
      },
      "NUMBER_FORMATS": {
        "CURRENCY_SYM": "\u20ac",
        "DECIMAL_SEP": ",",
        "GROUP_SEP": ".",
        "PATTERNS": [
          {
            "gSize": 3,
            "lgSize": 3,
            "maxFrac": 3,
            "minFrac": 0,
            "minInt": 1,
            "negPre": "-",
            "negSuf": "",
            "posPre": "",
            "posSuf": ""
          },
          {
            "gSize": 3,
            "lgSize": 3,
            "maxFrac": 2,
            "minFrac": 2,
            "minInt": 1,
            "negPre": "-",
            "negSuf": "\u00a0\u00a4",
            "posPre": "",
            "posSuf": "\u00a0\u00a4"
          }
        ]
      },
      "id": "el",
      "localeID": "el",
      "pluralCat": function(n, opt_precision) {  if (n == 1) {    return PLURAL_CATEGORY.ONE;  }  return PLURAL_CATEGORY.OTHER;}
    },
    en: {
      "DATETIME_FORMATS": {
        "AMPMS": [
          "AM",
          "PM"
        ],
        "DAY": [
          "Sunday",
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday"
        ],
        "ERANAMES": [
          "Before Christ",
          "Anno Domini"
        ],
        "ERAS": [
          "BC",
          "AD"
        ],
        "FIRSTDAYOFWEEK": 6,
        "MONTH": [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December"
        ],
        "SHORTDAY": [
          "Sun",
          "Mon",
          "Tue",
          "Wed",
          "Thu",
          "Fri",
          "Sat"
        ],
        "SHORTMONTH": [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec"
        ],
        "STANDALONEMONTH": [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December"
        ],
        "WEEKENDRANGE": [
          5,
          6
        ],
        "fullDate": "EEEE, MMMM d, y",
        "longDate": "MMMM d, y",
        "medium": "MMM d, y h:mm:ss a",
        "mediumDate": "MMM d, y",
        "mediumTime": "h:mm:ss a",
        "short": "M/d/yy h:mm a",
        "shortDate": "M/d/yy",
        "shortTime": "h:mm a"
      },
      "NUMBER_FORMATS": {
        "CURRENCY_SYM": "$",
        "DECIMAL_SEP": ".",
        "GROUP_SEP": ",",
        "PATTERNS": [
          {
            "gSize": 3,
            "lgSize": 3,
            "maxFrac": 3,
            "minFrac": 0,
            "minInt": 1,
            "negPre": "-",
            "negSuf": "",
            "posPre": "",
            "posSuf": ""
          },
          {
            "gSize": 3,
            "lgSize": 3,
            "maxFrac": 2,
            "minFrac": 2,
            "minInt": 1,
            "negPre": "-\u00a4",
            "negSuf": "",
            "posPre": "\u00a4",
            "posSuf": ""
          }
        ]
      },
      "id": "en",
      "localeID": "en",
      "pluralCat": function (n, opt_precision) {
        var i = n | 0;
        var vf = getVF(n, opt_precision);
        if (i == 1 && vf.v == 0) {
          return PLURAL_CATEGORY.ONE;
        }
        return PLURAL_CATEGORY.OTHER;
      }
    }
  };

  $rootScope.$on('$translateChangeSuccess', function () {
    updateTitle();
    $rootScope.currentLanguage = $translate.use();
    angular.copy(locales[$translate.use()], $locale);
  });
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
      .useUrlLoader(CONSTANTS.BASE + "lexicon");

      $locationProvider.hashPrefix('');

      $httpProvider.interceptors.push('responseObserver');

      $routeProvider
      .when('/', {
        templateUrl: 'html/home.html',
        controller: 'HomeController',
        resolve: {
          app: function ($rootScope) {
            $rootScope.errorPage = false;
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
              $rootScope.errorPage = false;
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
              $rootScope.errorPage = false;
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
              $rootScope.errorPage = false;
              $rootScope.activePage = 4;
            }

            defer.resolve();
            return defer.promise;
          }
        }
      })
      .otherwise({
        templateUrl: 'html/404.html',
        controller: 'ErrorController'
      });

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
