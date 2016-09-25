'use strict';

angular.module('myApp.view2', ['ngRoute'])

  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/view2', {
      templateUrl: 'view2/view2.html',
      controller: 'View2Ctrl'
    });
  }])

  .controller('View2Ctrl', ['$scope', function ($scope) {
    $scope.message = '';
    $scope.messages = [];
    $scope.send = function () {
      // handel message sending here
      console.log('almg create new ysdfes',$scope.message);      
      $scope.openConnection();
      $scope.sendMessage($scope.message);
     
    };


    //[CONNECTED, NOT_CONNECTED, CONNECTING]
    $scope.status = 'NOT_CONNECTED';
    $scope.wsUri = "ws://echo.websocket.org/";
    $scope.websocket;
    // open new connection 
    $scope.openConnection = function () {
      console.log('almg create new one');
      // create new connection 
      if ($scope.status == 'NOT_CONNECTED') {
          $scope.status = 'CONNECTING';
          console.log('almg create new yes');
          $scope.websocket = new WebSocket($scope.wsUri);
          $scope.websocket.onopen = function (evt) { onOpen(evt) };
          $scope.websocket.onclose = function (evt) { onClose(evt) };
          $scope.websocket.onmessage = function (evt) { onMessage(evt) };
          $scope.websocket.onerror = function (evt) { onError(evt) };
      }
    }

    $scope.sendMessage = function (message) {
      console.log('almg sending');
      if ($scope.status== 'CONNECTED') {
        console.log('almg send');
        $scope.messages.push({type:'client',content:message});
        $scope.websocket.send(message);
      }
    }

    $scope.close = function (message) {
      $scope.websocket.close();
    }



    function onOpen(evt) {
      console.log('almg succefylly conected');

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
      $scope.messages.push({type:'server',content:evt.data});
        $scope.$apply();
    }

    function onError(evt) {
      $scope.status = false;
    }




  }]);