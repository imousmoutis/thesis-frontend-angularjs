app.factory('HomeService', function($http, CONSTANTS) {

	return {
		getServerStatus: function() {
			return $http.get(CONSTANTS.BASE);
		}
	};
});