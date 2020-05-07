app.directive('uniqueUsername', ['UserService', function (UserService) {
  return {
    restrict: 'A',
    require: 'ngModel',
    link: function (scope, element, attrs, ngModel) {
      element.bind('keyup', function (e) {
        var currentValue = element.val();
        if (scope.$eval(attrs.uniqueUsername).initialUsername !== currentValue) {
          UserService.uniqueUser(currentValue)
          .then(function (unique) {
            if (currentValue === element.val()) {
              ngModel.$setValidity('unique', unique.data);
            }
          }, function () {
            ngModel.$setValidity('unique', true);
          });
        }
      });
    }
  }
}]);
