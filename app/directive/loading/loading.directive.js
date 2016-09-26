(function(){
  angular.module('myApp')
  .directive('loading', function () {
    return {
      restrict: 'E',
      templateUrl: 'directive/loading/loading.directive.html'
    };
  })
})();