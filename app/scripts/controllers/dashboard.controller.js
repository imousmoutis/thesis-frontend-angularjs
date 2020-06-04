app.controller('DashboardController',
    function ($scope, ExpenseService, Notification, $filter) {

      $scope.forms = {};

      $scope.dateFormat = 'dd/MM/yyyy';
      $scope.dateOptions = {
        formatYear: 'yy',
        maxDate: new Date(),
        startingDay: 1
      };

      function initNewExpense() {
        $scope.expense = {
          amount: '',
          category: '',
          date: new Date(),
          description: ''
        };
      }

      initNewExpense();

      ExpenseService.getExpenseCategories()
      .then(function (response) {
        $scope.expenseCategories = response.data;
      });

      ExpenseService.getUserExpenses($filter('date')(new Date(), $scope.dateFormat), $filter('date')(new Date(), $scope.dateFormat))
      .then(function (response) {
        console.log(response.data);
      });

      $scope.submitExpense = function () {
        if ($scope.forms.expensesForm.$valid) {
          $scope.expense.date = $filter('date')($scope.expense.date, $scope.dateFormat);
          ExpenseService.saveExpense($scope.expense).then(function (response) {
            $scope.forms.expensesForm.$setUntouched();
            $scope.forms.expensesForm.$setPristine();
            initNewExpense();
            Notification.success({message: $filter('translate')('newExpenseSuccessful')});
          });
        }
      };

    });
