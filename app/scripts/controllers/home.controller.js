app.controller('HomeController', function ($scope, HomeService) {
  $scope.serverStatus = "Connecting with server...";

  HomeService.getServerStatus()
  .then(function (response) {
    $scope.serverStatus = response.data;
  }, function (error) {
    $scope.serverStatus = "Server is down. Contact the administrator.";
  });
});