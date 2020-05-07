app.factory('UserService', function ($http, CONSTANTS, $localStorage) {

  return {
    getUserCount: function () {
      return $http.get(CONSTANTS.BASE + 'user/count', {
        headers: {'Authorization': $localStorage.jwt}
      });
    },
    getUsers: function (params) {
      return $http.get(CONSTANTS.BASE + 'user', {
        headers: {'Authorization': $localStorage.jwt},
        params: params
      });
    },
    editUser: function (user) {
      return $http.post(CONSTANTS.BASE + 'user', user, {
        headers: {'Authorization': $localStorage.jwt}
      });
    },
    deleteUser: function (userId) {
      return $http.delete(CONSTANTS.BASE + 'user/' + userId, {
        headers: {'Authorization': $localStorage.jwt}
      });
    },
    uniqueUser: function (term) {
      return $http.get(CONSTANTS.BASE + 'user/unique', {
        params: {term: term}
      });
    }
  };
});
