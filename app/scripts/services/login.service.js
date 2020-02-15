app.factory('LoginService', function($http, CONSTANTS) {

	return {
		login: function(user) {
			return $http.post(CONSTANTS.BASE + 'login', user);
		},
		register: function(user) {
			return $http.post(CONSTANTS.BASE + 'register', user);
		}
	};
});