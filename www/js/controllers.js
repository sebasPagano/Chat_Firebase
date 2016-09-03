angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {})

.controller('ChatsCtrl', function($scope, Chats,$timeout) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

$scope.MisMensajes=[];

 var messagesRef = new Firebase('https://miprimerfirebase-88f8b.firebaseio.com/usuarios/');



  $('#messageInput').keypress(function (e) {
    if (e.keyCode == 13) {
      var name = $('#nameInput').val();
      var text = $('#messageInput').val();
      var fecha = Firebase.ServerValue.TIMESTAMP;
      console.log(fecha);
      messagesRef.push({usuario:name, mensaje:text, fechadeingreso:fecha});
      $('#messageInput').val('');
    }
  });

 messagesRef.on('child_added', function (snapshot) {
$timeout(function(){

    var message = snapshot.val();
    $scope.MisMensajes.push(message);
    console.log($scope.MisMensajes);

});

  });


  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
