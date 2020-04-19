app.controller('DashboardController',
    function ($scope, $rootScope, DashboardService, CONSTANTS, $location, ngTableParams) {

      if ($rootScope.loggedUserRole === CONSTANTS.USER_ADMIN) {
        $scope.users = [];
        $scope.usersLength = 0;

        DashboardService.getUserCount()
        .then(function (response) {
          $scope.usersLength = response.data;
          getUsers();
        });
      }

      $scope.status = true;

      function getUsers() {
        $scope.tableParams = new ngTableParams({
          page: 1,
          count: CONSTANTS.TABLE_RESULTS,
          sorting: {
            username: CONSTANTS.DEFAULT_SORTING_DIRECTION
          }
        }, {
          total: $scope.usersLength,
          getData: function ($defer, params) {
            var column = params.orderBy()[0].slice(1);
            var order = params.orderBy()[0].slice(0, 1);

            DashboardService.getUsers({
              page: params.page() - 1,
              size: params.count(),
              sortColumn: column,
              sortOrder: (order === '+') ? 'asc' : 'desc'
            })
            .then(function (response) {
              $defer.resolve(response.data.content);
            });
          }
        });
      }
    });