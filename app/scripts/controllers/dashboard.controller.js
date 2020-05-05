app.controller('DashboardController',
    function ($scope, $rootScope, UserService, CONSTANTS, $location, ngTableParams, $uibModal, Notification) {

      if ($rootScope.loggedUserRole === CONSTANTS.USER_ADMIN) {
        $scope.users = [];
        $scope.usersLength = 0;

        UserService.getUserCount()
        .then(function (response) {
          $scope.usersLength = response.data;
          getUsers();
        });
      }

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

            UserService.getUsers({
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

      $scope.editUser = function (user, index) {
        var modalInstance = $uibModal.open({
          animation: true,
          templateUrl: 'html/editUser.html',
          controller: EditUserController,
          scope: $scope.$new(),
          resolve: {
            user: function () {
              return user;
            }
          }
        });

        modalInstance.result
        .then(function (updatedUser) {
          if (updatedUser) {
            $scope.users[index] = updatedUser;
            $scope.tableParams.reload();
          }
        });
      };

      var EditUserController = function (user, $uibModalInstance) {
        $scope.userInstance = angular.copy(user);
        $scope.userInstanceStatus = (user.status === 1);

        $scope.cancel = function () {
          $uibModalInstance.close();
        };

        $scope.changeStatus = function () {
          $scope.userInstanceStatus = !$scope.userInstanceStatus;
        };

        $scope.save = function () {
          $scope.userInstance.status = $scope.userInstanceStatus ? 1 : 0;
          UserService.saveUser($scope.userInstance)
          .then(function (response) {
            Notification.success({message: 'User successfully saved.'});
            $uibModalInstance.close($scope.userInstance);
          }, function (error) {
          });
        }
      };
    });
