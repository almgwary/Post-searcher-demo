'use strict';

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])


// Service
.service("postsService", ['$q','$http',function($q,$http){
    var deferred = $q.defer();
    $http.get('https://jsonplaceholder.typicode.com/posts').then(function(data) {
        deferred.resolve(data);
    });
    this.getPosts = function(){
        return deferred.promise;
    };
}])
//Directive
.directive('post', function() {
  return {
     restrict: 'E',
    templateUrl: 'post.html'
  };
})

//controller 
.controller('View1Ctrl', ['$scope','postsService' ,function($scope,postsService) {

  $scope.posts = {};
  var promise = postsService.getPosts();
  promise.then(function(data) {
      $scope.posts = data.data;
      console.log('almg',data);
  });

}]);