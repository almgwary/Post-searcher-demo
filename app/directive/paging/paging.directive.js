angular.module('myApp')
 //Directive
  .directive('paging', function () {
    return {
      restrict: 'E',
      templateUrl: 'directive/paging/paging.directive.html'
    };
  })