app.controller('DashboardController',
    function ($scope, $rootScope, $filter, $translate) {

      $translate('dashboard')
      .then(function (translatedValue) {
        $rootScope.title = translatedValue;
      });
    });
