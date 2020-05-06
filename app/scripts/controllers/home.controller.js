app.controller('HomeController', function ($scope, IndexService, $filter) {

  $scope.serverStatus = $filter('translate')('serverConnection');

  IndexService.getServerStatus()
  .then(function (response) {
    $scope.serverStatus = response.data;
  }, function (error) {
    $scope.serverStatus = $filter('translate')('serverStatus');
  });

});
