(function () {
  angular.module('myApp')
  .service("postsService", postsService);
  postsService.$inject= ['$q', '$http'];
  function postsService($q, $http) {

    this.getPosts = getPosts;
    function getPosts(query) {
      return $http({
        url: 'https://jsonplaceholder.typicode.com/posts',
        method: "GET",
        params: query
      });
    };
  }
})();