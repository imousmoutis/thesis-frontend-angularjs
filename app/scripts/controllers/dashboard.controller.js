app.controller('DashboardController',
    function ($scope, ExpenseService) {

      $scope.forms = {};
      $scope.expense = {
        amount: '',
        category: '',
        date: new Date()
      };

      $scope.dateFormat = 'dd.MM.yyyy';
      $scope.dateOptions = {
        formatYear: 'yy',
        maxDate: new Date(),
        startingDay: 1
      };

      ExpenseService.getExpenseCategories()
      .then(function (response) {
        $scope.expenseCategories = response.data;
      });

      $scope.submitExpense = function () {
        if ($scope.forms.expensesForm.$valid) {
          console.log($scope.expense);
        }
      };



    });
