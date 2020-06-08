app.factory('ExpenseService', function ($http, CONSTANTS, $localStorage) {

  return {
    getExpenseCategories: function () {
      return $http.get(CONSTANTS.BASE + 'expense/categories', {
        headers: {'Authorization': $localStorage.jwt}
      });
    },
    saveExpense: function (expense) {
      return $http.post(CONSTANTS.BASE + 'expense', expense, {
        headers: {'Authorization': $localStorage.jwt}
      });
    },
    getUserTotalExpenses: function (from, to) {
      return $http.get(CONSTANTS.BASE + 'expense/total', {
        headers: {'Authorization': $localStorage.jwt},
        params: {from: from, to: to}
      });
    },
    getUserExpenses: function (params) {
      return $http.get(CONSTANTS.BASE + 'expense', {
        headers: {'Authorization': $localStorage.jwt},
        params: params
      });
    },
  };
});
