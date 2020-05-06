app.factory('IndexService', function ($http, CONSTANTS, $cookies) {

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
        headers: {'Authorization': $cookies.get('jwt')}
      });
    },
  };
});
