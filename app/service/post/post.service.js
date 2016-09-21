angular.module('myApp')
  // Service
  .service("postsService", ['$q', '$http', function ($q, $http) {
   
    this.getPosts = function (query) {
      return $http({
          url:'https://jsonplaceholder.typicode.com/posts', 
          method:"GET",
          params:query
      });
    };
  }])