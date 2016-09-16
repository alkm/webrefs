define(['app', 'ngload!socket-io'], function (app) {
    app.register.controller('ChatController', ['$rootScope', '$scope', '$window', function ($rootScope, $scope, $window)
	{
			//Initialising socket connections for Chat App
		angular.element(document).ready(function() {
			initializeSocket();
		});
		function initializeSocket(){
			//openSocket();
			
			
		}
		function closeSocket(){
			//socket.disconnect();
			//$rootScope.switchSocket = true;
		}
		function openSocket()
		{
			require(['socket-io'], function(io) {
				socket = io('http://localhost:3000/');
				socket.emit('ON_SOCKET_INIT', "wow");
			});
			
			
		}
		
	}]);
}); 