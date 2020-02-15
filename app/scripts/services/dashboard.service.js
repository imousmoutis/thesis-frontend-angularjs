app.factory('DashboardService', function($http, CONSTANTS, $cookies) {

	return {
		getUserCount: function() {
			return $http.get(CONSTANTS.BASE + 'user/count', {
				headers: {'Authorization': $cookies.get('jwt')}
			});
		},
		getUsers: function(params) {
			return $http.get(CONSTANTS.BASE + 'user', {
				headers: {'Authorization': $cookies.get('jwt')},
				params: params
			});
		}
	};
});