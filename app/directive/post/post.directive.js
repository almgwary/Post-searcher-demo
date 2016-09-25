(function(){
  angular.module('myApp')
 //Directive
  .directive('post', function () {
    return {
      restrict: 'E',
      templateUrl: 'directive/post/post.directive.html'
    };
  })
})();