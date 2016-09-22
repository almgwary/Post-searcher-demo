'use strict';

angular.module('myApp.view1', ['ngRoute'])

  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/view1', {
      templateUrl: 'view1/view1.html',
      controller: 'View1Ctrl'
    });
  }])


 
  //controller 
  .controller('View1Ctrl', ['$scope', 'postsService', function ($scope, postsService) {

    $scope.posts = [];
    $scope.query = {
      q: '',
      _page: 0,
      _limit: 10
    }
    $scope.isLoading = false ;

    // load posts
    $scope.getPosts = function (query) {
      $scope.isLoading = true ;
      
      postsService.getPosts(query)
        .then(function (data) {
          $scope.isLoading = false ;
          if(data.data.length > 0){
            $scope.posts=$scope.posts.concat(data.data);
          }else {
            $scope.isLastpage = true;
          }
      });
    }
     $scope.getPosts($scope.query);

     // next page
     $scope.nextpage = function(){
       if(!$scope.isLastpage){
         $scope.query._page++;
          $scope.getPosts($scope.query);
       }
     }
     // previouse page
     $scope.prevpage = function(){
       if($scope.query._page>0){
          $scope.query._page--;
          $scope.getPosts($scope.query);
          $scope.isLastpage = false;
       }
     }
  }]);