app.controller('HomeController', function ($scope, IndexService) {
  $scope.serverStatus = "Connecting with server...";

  IndexService.getServerStatus()
  .then(function (response) {
    $scope.serverStatus = response.data;
  }, function (error) {
    $scope.serverStatus = "Server is down. Contact the administrator.";
  });
});
