var friendRelationInfo = require('./datamodel/FriendsRelationship');
var userInfo = require('./datamodel/UserInfo');
var chatInfo = require('./datamodel/ChatInfo');
var socketio = require('socket.io');
var events = require('events');
var util = require('util');

// maps socket.id to user's nickname
var chatClients = {};
var chatBuddies = [];
// list of socket ids
var clients = [];
var usedSockets = {};
var chatBuddiesConnected = [];

  io.sockets.on('connection', function(socket){//Similar to document.ready when the socket initialized
	socket.on('ON_SOCKET_INIT', function(data){
		socket.userid = data.userid;
		handleActiveUsers(socket, data.userid);
		//Set user appearance status in db
		userInfo.update({_id : data.userid}, { $set: {appearance: "online"}}, function(error, docs){
			if(error){
				console.log("Error"+error);
			}else{
				io.sockets.emit("UPDATE_CHAT_LIST", "");
			}
		});
	})
	socket.on('ON_SEND_MSG', function(data){
	//Emitting the info back to client 
		console.log("sender"+data.senderInfo._id);
		console.log("receiver"+data.receiverInfo._id);
		//io.sockets.emit("ON_NEW_MSG", data);//To all users connected in socket
		usedSockets[data.receiverInfo._id].emit("ON_NEW_MSG", data);//To specific user to whom message is sent
	});
	
	socket.on('ON_SEND_VIDEO_CHAT_REQUEST', function(data){
		//Emitting the info back to client 
		console.log("data.receiverVideoInfo._id"+data.receiverVideoInfo._id);
		usedSockets[data.receiverVideoInfo._id].emit("ON_NEW_VIDEO_CHAT_REQUEST", data);//To specific user to whom video chat request is sent
	});
	
	// socket.on('ON_ACCEPT_VIDEO_CHAT_REQUEST', function(data){
		// //Emitting the info back to client 
		// console.log("Chat Responeded");
		// usedSockets[data.receiverVideoInfo._id].emit("ON_REQUESTED_VIDEO_CHAT_RESPONSE", data);//To specific user to whom video chat request is sent
	// });
	
	socket.on('ON_REJECT_VIDEO_CHAT_REQUEST', function(data){
		//Emitting the info back to client 
		usedSockets[data.receiverVideoInfo._id].emit("ON_REQUESTED_VIDEO_CHAT_REJECTION", data);//To specific user to whom video chat request is sent
	});
	
	socket.on('disconnect', function(data){
		handleClientDisconnected(socket, socket.userid);
		//Set user appearance status in db
		userInfo.update({_id : socket.userid}, { $set: {appearance: "offline"}}, function(error, docs){
			if(error){
				console.log("Error"+error);
			}else{
				io.sockets.emit("UPDATE_CHAT_LIST", "");
			}
		});
	});
  });

	function handleActiveUsers(socket, userid){
		//Saving all the users connected in socket
		for(var i = 0; i < chatBuddiesConnected.length ; i++){
			if(userid == chatBuddiesConnected[i]){
				console.log("Looks like you are already connected");
				return;
			}
		}
		
		chatBuddiesConnected.push(userid);
		chatClients[socket.id] = userid;
		usedSockets[userid] = socket;
		console.log(chatClients);
	}
	
	function handleClientDisconnected(socket, userid){
		console.log("disconnected");
		console.log(chatClients[socket.id]);
		chatBuddiesConnected.splice(0,chatClients[socket.id]); 
		var indx = chatBuddiesConnected.indexOf(chatClients[socket.id]);
		if(indx != -1){
			chatBuddiesConnected.splice(indx, 1);
		} 
		
		delete usedSockets[userid];
				for(var i in chatClients){
			console.log(i);
		}
		console.log(">>>>>>>>>>>>>>>>>>>>>>>");

		delete chatClients[socket.id];
				for(var i in chatClients){
			console.log(i);
		}
		console.log(chatBuddiesConnected);
	}

//io.sockets.on('ON_SOCKET_INIT', function(){alert("wow");})
function initializeConnection(socket){
  showActiveUsers(socket);
  //showOldMsgs(socket);
}

function showActiveUsers(socket){
  var activeNames = [];
  var usersInRoom = io.sockets.clients();
  for (var index in usersInRoom){
    var userSocketId = usersInRoom[index].id;
    if (userSocketId !== socket.id && nicknames[userSocketId]){
      var name = chatBuddiesNames[userSocketId];
      activeNames.push({id: chatBuddiesConnected.indexOf(name), nick: name});
    }
  }
  //socket.emit('names', activeNames);
  console.log(activeNames);
}
module.exports = function(app) {

	// api ---------------------------------------------------------------------
	app.post('/api/getChatBuddyList/', function(req, res) {	
		// Confirm friend and changing the status
		// Getting all the confirmed friends
		friendRelationInfo.find({requeststatus : "confirmed", $or: [ { userid: req.body.userid }, { friendid: req.body.userid }]}, function(error, infos){
			if(error){
				console.log("Error"+error);
			}else{

				res.send(infos);
			}
		});
	});
	
	app.post('/api/getAllOnLineFriendsDetails/', function(req, res) {	
		// Getting all the online friends
		userInfo.find({_id: {$in : req.body.reqidarr}, appearance: "online"}, function(error, infos){
			if(error){
				console.log("Error"+error);
			}else{
				res.send(infos);
			}
		});
	});
}

global.nodeEventer.subscribe('ON_VIDEO_PUBLISH', function(data){
	//usedSockets[data.userid].emit("ON_VIDEO_PUBLISH", data.videoPath);
});