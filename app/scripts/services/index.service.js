app.factory('IndexService', function ($http, CONSTANTS, $localStorage) {

  return {
    getServerStatus: function () {
      return $http.get(CONSTANTS.BASE);
    },
    login: function (user) {
      return $http.post(CONSTANTS.BASE + 'login/', user);
    },
    register: function (user) {
      return $http.post(CONSTANTS.BASE + 'register/', user);
    },
    logout: function (user) {
      return $http.delete(CONSTANTS.BASE + 'logout/', {
        headers: {'Authorization': $localStorage.jwt}
      });
    },
  };
});
