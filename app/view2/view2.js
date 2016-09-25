(function () {
  'use strict';
  angular.module('myApp.view2', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
      $routeProvider.when('/view2', {
        templateUrl: 'view2/view2.html',
        controller: 'View2Ctrl'
      });
    }])

  .controller('View2Ctrl', View2Ctrl);
   View2Ctrl.$Inject = ['$scope'];

  function View2Ctrl($scope) {
    $scope.message = '';
    $scope.messages = [];
    $scope.send = function () {
      // handel message sending here
      $scope.openConnection();
      $scope.sendMessage($scope.message);
    };

    //[CONNECTED, NOT_CONNECTED, CONNECTING]
    $scope.status = 'NOT_CONNECTED';
    $scope.wsUri = "ws://echo.websocket.org/";
    $scope.websocket;
    // open new connection 
    $scope.openConnection = function () {
      // create new connection 
      if ($scope.status == 'NOT_CONNECTED') {
        $scope.status = 'CONNECTING';
        $scope.websocket = new WebSocket($scope.wsUri);
        $scope.websocket.onopen = function (evt) { onOpen(evt) };
        $scope.websocket.onclose = function (evt) { onClose(evt) };
        $scope.websocket.onmessage = function (evt) { onMessage(evt) };
        $scope.websocket.onerror = function (evt) { onError(evt) };
      }
    }

    $scope.sendMessage = function (message) {
      if ($scope.status == 'CONNECTED') {
        $scope.messages.push({ type: 'client', content: message });
        $scope.websocket.send(message);
      }
    }

    $scope.close = function (message) {
      $scope.websocket.close();
    }

    function onOpen(evt) {

      $scope.status = 'CONNECTED';
      $scope.$apply();
    }

    function onClose(evt) {
      $scope.status = false;
      $scope.status = 'NOT_CONNECTED';
    }

    function onMessage(evt) {
      // writeToScreen('<span style="color: blue;">RESPONSE: ' + evt.data+'</span>');
      // message received
      $scope.messages.push({ type: 'server', content: evt.data });
      $scope.$apply();
    }
    function onError(evt) {
      $scope.status = false;
    }

  }

})();