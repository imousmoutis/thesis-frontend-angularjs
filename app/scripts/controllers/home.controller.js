app.controller('HomeController', function ($scope, IndexService, $filter, $rootScope, $translate) {

  $translate('home')
  .then(function (translatedValue) {
    $rootScope.title = translatedValue;
  });

  $scope.serverStatus = $filter('translate')('serverConnection');

  IndexService.getServerStatus()
  .then(function (response) {
    $scope.serverStatus = response.data;
  }, function (error) {
    $scope.serverStatus = $filter('translate')('serverStatus');
  });

});
