app.controller('DashboardController',
    function ($scope, $rootScope, ExpenseService, Notification, $filter) {

      $scope.forms = {};

      $scope.today = new Date();
      $scope.dateFrom = angular.copy($scope.today);
      $scope.dateTo = angular.copy($scope.today);

      $scope.dateFormat = 'dd/MM/yyyy';
      $scope.dateOptions = {
        formatYear: 'yy',
        maxDate: $scope.dateTo,
        startingDay: 1
      };

      $scope.dateFromOptions = {
        formatYear: 'yy',
        maxDate: $scope.dateTo,
        startingDay: 1
      };

      $scope.dateToOptions = {
        formatYear: 'yy',
        maxDate: angular.copy($scope.today),
        minDate: $scope.dateFrom,
        startingDay: 1
      };

      $scope.setFromDatepickerMaxDate = function () {
        $scope.dateFromOptions.maxDate = $scope.dateTo;
      };

      $scope.setToDatepickerMinDate = function () {
        $scope.dateToOptions.minDate = $scope.dateFrom;
      };

      $scope.loadTotalExpenses = function () {
        ExpenseService.getUserTotalExpenses($filter('date')($scope.dateFrom, $scope.dateFormat),
            $filter('date')($scope.dateTo, $scope.dateFormat))
        .then(function (response) {
          $scope.expensesDates = response.data.dates;
          $scope.expensesData = response.data.totalExpenses;
        });
      };

      $scope.loadTotalExpenses();

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
        loadCategoryLabels();
      });

      function loadCategoryLabels() {
        $scope.chartCategories = [];
        angular.forEach($scope.expenseCategories, function (category) {
          $scope.chartCategories.push($filter('translate')(category.name));
          console.log($scope.chartCategories);
        });
      }

      $rootScope.$on('$translateChangeSuccess', function () {
        loadCategoryLabels();
      });

      $scope.datasetOverride = [{yAxisID: 'y-axis-1'}];
      $scope.options = {
        scales: {
          yAxes: [
            {
              id: 'y-axis-1',
              type: 'linear',
              display: true,
              position: 'left'
            }
          ]
        }
      };

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
