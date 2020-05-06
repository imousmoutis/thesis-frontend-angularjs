app.controller('AdminController',
    function ($scope, $rootScope, UserService, CONSTANTS, $location, ngTableParams, $uibModal, Notification, $filter,
        $translate) {

      $scope.users = [];
      $scope.usersLength = 0;

      UserService.getUserCount()
      .then(function (response) {
        $scope.usersLength = response.data;
        getUsers();
      });

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
              $scope.usersLength = response.data.totalElements;
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
        $scope.forms = {};
        $scope.userInstance = angular.copy(user);
        $scope.userInstanceStatus = (user.status === 1);

        $scope.cancel = function () {
          $uibModalInstance.close();
        };

        $scope.changeStatus = function () {
          $scope.userInstanceStatus = !$scope.userInstanceStatus;
        };

        $scope.save = function () {
          if ($scope.forms.editUserForm.$valid) {
            $scope.userInstance.status = $scope.userInstanceStatus ? 1 : 0;
            UserService.editUser($scope.userInstance)
            .then(function (response) {
              Notification.success({message: $filter('translate')('saveUserSuccessful')});
              $uibModalInstance.close($scope.userInstance);
            }, function (error) {
            });
          }
        };

        $scope.delete = function () {

          var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'html/confirmationDialog.html',
            controller: ConfirmationDialogController,
            scope: $scope.$new(),
            resolve: {
              message: function () {
                return $filter('translate')('deleteUserConfirmation');
              }
            }
          });

          modalInstance.result
          .then(function (response) {
            if (response) {
              UserService.deleteUser($scope.userInstance.id)
              .then(function (response) {
                Notification.success({message: $filter('translate')('deleteUserSuccessful')});
                $uibModalInstance.close($scope.userInstance);
              }, function (error) {
              });
            }
          });

        };

        var ConfirmationDialogController = function (message, $uibModalInstance) {
          $scope.confirmationMessage = message;

          $scope.confirm = function () {
            $uibModalInstance.close(true);
          };

          $scope.dismiss = function () {
            $uibModalInstance.close(false);
          }
        };
      };
    });
