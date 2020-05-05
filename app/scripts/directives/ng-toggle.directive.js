app.directive('toggleBtn', [function () {
  return {
    restrict: 'EA',
    replace: true,
    require: ['name', '^ngModel'],
    scope: {
      isDisabled: '=',
      onType: '@',
      offType: '@',
      name: '@',
      ngModel: '=',
      ngChange: '&',
      onLabel: '@',
      offLabel: '@',
      required: '@',
      ngTrueValue: '@',
      ngFalseValue: '@'
    },
    template:
        ' <div class="toggle-switch" ng-class="\'on\'+onType+ \' \' + \'off\'+offType"> ' +
        '		<span ng-if="offLabel" class="off-label" ng-bind="offLabel"></span> ' +
        ' 	<input ng-model="ngModel" id="{{name}}" name="{{name}}" type="checkbox" selected="ngModel" ng-disabled="isDisabled" ng-change="ngChange()" '
        +
        '			hidden="" ng-true-value="{{ngTrueValue? ngTrueValue:true}}" ng-false-value="{{ngFalseValue? ngFalseValue:false}}" ng-required="required"><label for="{{name}}" '
        +
        '			class="toggle-knob"></label> ' +
        '		<span ng-if="onLabel" class="on-label" ng-bind="onLabel"></span> ' +
        '	</div> '
  };
}]);
