angular.module('myApp')
 //Directive
  .directive('loading', function () {
    return {
      restrict: 'E',
      templateUrl: 'directive/loading/loading.directive.html'
    };
  })