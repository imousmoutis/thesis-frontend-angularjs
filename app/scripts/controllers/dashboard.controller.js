app.controller('DashboardController', function($scope, $rootScope, DashboardService, CONSTANTS, $location, ngTableParams) {

	if ($rootScope.loggedUserRole === CONSTANTS.USER_ADMIN){
		$scope.users = [];
		$scope.usersLength = 0;

		DashboardService.getUserCount()
		.then(function (response){
			$scope.usersLength = response.data;
			getUsers();
		});
	}   

	function getUsers(){
		$scope.tableParams = new ngTableParams({
			page: 1,
			count: CONSTANTS.TABLE_RESULTS
		},{
			total: $scope.usersLength,
			getData : function($defer, params){
				DashboardService.getUsers({page: params.page() -1, size: params.count()})
				.then(function (response){
					$defer.resolve(response.data.content);
				});
			}
		});
	}
});