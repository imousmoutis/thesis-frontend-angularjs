app.controller('DashboardController',
    function ($scope, $rootScope, ExpenseService, Notification, $filter) {

      function initVariables() {
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

        $scope.expensesData = [];

        $scope.datasetOverride = [{yAxisID: 'y-axis-1'}];

        $scope.selectedPage = 0;
        $scope.pageSize = 15;

        $scope.totalExpensesSize = 0;
        $scope.totalExpensesData = [];

        initNewExpense();
        $scope.loadTotalExpenses();
        $scope.loadUserExpenses();
      }

      $scope.groups = [
        {
          title: 'Dynamic Group Header - 1',
          content: 'Dynamic Group Body - 1'
        },
        {
          title: 'Dynamic Group Header - 2',
          content: 'Dynamic Group Body - 2'
        }
      ];

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

      function initNewExpense() {
        $scope.expense = {
          amount: '',
          category: '',
          date: new Date(),
          description: ''
        };
      }

      $scope.reloadUserExpenses = function (page) {
        $scope.selectedPage = page;
        $scope.loadUserExpenses();
      }

      $scope.loadUserExpenses = function () {
        ExpenseService.getUserExpenses({page: $scope.selectedPage, size: $scope.pageSize})
        .then(function (response) {
          $scope.totalExpensesSize = response.data.size;
          $scope.totalExpensesData = response.data.results;

          if ($scope.totalExpensesSize > 0){
            generateExpensesPagination();
          }
        });
      };

      function generateExpensesPagination() {
        $scope.expensesPaginatedPages = [];
        for (var i = 0; i < Math.ceil($scope.totalExpensesSize / $scope.pageSize); i++) {
          $scope.expensesPaginatedPages.push(i);
        }

        if ($scope.expensesPaginatedPages.indexOf($scope.selectedPage) < 0) {
          $scope.selectedPage = $scope.expensesPaginatedPages[$scope.expensesPaginatedPages.length - 1];
          $scope.loadUserExpenses();
        }
      }

      ExpenseService.getExpenseCategories()
      .then(function (response) {
        $scope.expenseCategories = response.data;
        loadCategoryLabels();
      });

      function loadCategoryLabels() {
        $scope.chartCategories = [];
        angular.forEach($scope.expenseCategories, function (category) {
          $scope.chartCategories.push($filter('translate')(category.name));
        });
      }

      $rootScope.$on('$translateChangeSuccess', function () {
        loadCategoryLabels();
      });

      $scope.submitExpense = function () {
        if ($scope.forms.expensesForm.$valid) {
          ExpenseService.saveExpense({
            amount: $scope.expense.amount,
            category: $scope.expense.category,
            date: $filter('date')($scope.expense.date, $scope.dateFormat),
            description: $scope.expense.description
          }).then(function (response) {
            $scope.forms.expensesForm.$setUntouched();
            $scope.forms.expensesForm.$setPristine();
            $scope.loadTotalExpenses();
            initNewExpense();
            $scope.loadUserExpenses();
            Notification.success({message: $filter('translate')('newExpenseSuccessful')});
          });
        }
      };

      $scope.getTranslatedCategory = function (id) {
        return $filter('translate')($filter('filter')($scope.expenseCategories, {id: id})[0].name);
      };

      $scope.deleteExpense = function (expenseId) {
        ExpenseService.deleteExpense(expenseId)
        .then(function (response) {
          Notification.success({message: $filter('translate')('deleteExpenseSuccessful')});
          $scope.loadTotalExpenses();
          $scope.loadUserExpenses();
        }, function (error) {
        });
      }

      initVariables();

    });
