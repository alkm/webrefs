var friendRelationInfo = require('./datamodel/FriendsRelationship');
var userInfo = require('./datamodel/UserInfo');

module.exports = function(app) {

	// api ---------------------------------------------------------------------
	app.post('/api/getProfileInfo/', function(req, res) {		
		// create a friend info, information comes from AJAX request from Angular
		userInfo.findOne({_id : req.body.profileid}, function(err, infos) {
			if (err){
				res.send(err);
			}else{
				res.send(infos);
			}
		});
	});
	
	app.post('/api/setFriendInfo/', function(req, res) {		
		// create a friend info, information comes from AJAX request from Angular
		console.log("req.body.friendInfo.friendID"+req.body.friendInfo.friendID);
		console.log("req.body.friendInfo.userID"+req.body.friendInfo.userID);
		friendRelationInfo.create({
			userid : req.body.friendInfo.userID,
			friendid : req.body.friendInfo.friendID,
			requester : req.body.friendInfo.userID,
			requeststatus: "pending",
			blockedby : "",
			blockedto : "",
			unfriendby : "",
			unfriendto : "",
			done: false
		}, function(err, infos) {
			if (err){
				res.send(err);
			}else{
				res.send("sent");

			}
		});
	});
	
	app.post('/api/getFriendInfo/', function(req, res) {	
		//This is happenig in profile page
		// check a friend info, information comes from AJAX request from Angular
		console.log("Info got from node"+req.body.friendInfo.userID+"//////////"+req.body.friendInfo.friendID);
		friendRelationInfo.findOne({friendid : req.body.friendInfo.userID , userid : req.body.friendInfo.friendID} 
			, function(err, infos) {
			if (err){
				console.log("Error Fetching info"+err);
				res.send(err);
			}else{
				if(infos != null){
					if(infos.requester != req.body.friendInfo.userID){
						var obj = {};
						obj.agent = "responder";
						obj.status = infos.requeststatus;
						res.send(obj);
					}else{
						var obj = {};
						obj.agent = "requester";
						obj.status = infos.requeststatus;
						res.send(obj);
					}
				}else{
					friendRelationInfo.findOne({userid : req.body.friendInfo.userID , friendid : req.body.friendInfo.friendID}
					, function(err, infos) {
						if (err){
							console.log("Error Fetching info"+err);
							res.send(err);
						}else{
							if(infos != null){
								if(infos.requester != req.body.friendInfo.userID){
									var obj = {};
									obj.agent = "responder";
									obj.status = infos.requeststatus;
									res.send(obj);
								}else{
									var obj = {};
									obj.agent = "requester";
									obj.status = infos.requeststatus;
									res.send(obj);
								}
							}else{
								var obj = {};
								obj.agent = "none";
								obj.status = "!friend";
								res.send(obj);
							}
						}
					});
				}
			}
		});
	});
	
	app.post('/api/getFriendReq/', function(req, res) {	
		//This is happenoing in home page
		// check a friend info, information comes from AJAX request from Angular
		console.log(">>>>1"+req.body.userid);
		friendRelationInfo.find({friendid : req.body.userid , requeststatus : "pending", requester: { $ne: req.body.userid }} 
			, function(err, infos) {
			if (err){
				res.send(err);
			}else{
				console.log("infos"+infos);
				res.send(infos);
			}
		});
		
		/*friendRelationInfo.findAndModify({
		query: { requeststatus : "pending" }, 
		update: { $inc: { requeststatus: "viewed"} }, 
		new: true, 
		upsert: true 
		},
		function(err, doc){
			console.log('the id is: '+doc.next);
			if (err){
				res.send(err);
			}else{
				console.log("infos"+infos);
				res.send(doc);
			}
		});*/
	});
	
	app.post('/api/getAllFriendReq/', function(req, res) {	
		//This is happenoing in home page
		// check a friend info, information comes from AJAX request from Angular
		friendRelationInfo.find({friendid : req.body.userid , requeststatus : {$in:["pending", "displayed"]}, requester: { $ne: req.body.userid }} 
			, function(err, infos) {
			if (err){
				res.send(err);
			}else{
				res.send(infos);
			}
		});
	});
	
	app.post('/api/getRequestDetails/', function(req, res) {	
		//This is happenoing in home page
		// check a friend info, information comes from AJAX request from Angular
		console.log("Req All>>"+req.body.reqarr);
		userInfo.find({_id : {$in : req.body.reqarr}} 
			, function(err, infos) {
			if (err){
				res.send(err);
			}else{
				res.send(infos);
				friendRelationInfo.update({userid : {$in : req.body.reqarr}, requeststatus:"pending" }, { $set: {requeststatus: "displayed"}}, { multi: true }, function(error, docs){
					if(error){
						console.log("Error"+err);
					}else{
						//console.log("&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&yuipee");
					}
				});
			}
		});
	});
	
	app.post('/api/confirmFriendReq/', function(req, res) {	
		// Confirm friend and changing the status
		console.log("1"+req.body.reqinfo.friendId+"2"+req.body.reqinfo.userId);
		friendRelationInfo.update({userid: req.body.reqinfo.friendId, friendid: req.body.reqinfo.userId}, { $set: {requeststatus: "confirmed"}}, function(error, docs){
			if(error){
				console.log("Error"+error);
			}else{
				res.send("confirm");
			}
		});
	});
	
	app.post('/api/getAllConfirmedFriends/', function(req, res) {	
		// Getting all the confirmed friends
		friendRelationInfo.find({requeststatus : "confirmed", $or: [ { userid: req.body.profileid }, { friendid: req.body.profileid }]}, function(error, infos){
			if(error){
				console.log("Error"+error);
			}else{

				res.send(infos);
			}
		});
	});
	
	app.post('/api/getFriendsSuggestion/', function(req, res) {	
		// Getting random friends suggestion based on preference
		//userInfo.find({appearance : "online"}, function(error, infos){
		userInfo.find({}, function(error, infos){
			if(error){
				console.log("Error"+error);
			}else{
				console.log("random friends suggestion"+infos);
				res.send(infos);
			}
		});
	});
	
	app.post('/api/getAllConfirmedFriendsDetails/', function(req, res) {	
		// Getting all the confirmed friends
		userInfo.find({_id: {$in : req.body.reqidarr}}, function(error, infos){
			if(error){
				console.log("Error"+error);
			}else{
				res.send(infos);
			}
		});
	});
	
	app.post('/api/getAllRandomFriendsDetails/', function(req, res) {	
		// Getting all the confirmed friends
		userInfo.find({_id: {$in : req.body.reqidarr}}, function(error, infos){
			if(error){
				console.log("Error"+error);
			}else{
				console.log("All random friends details"+infos);
				res.send(infos);
			}
		});
	});
	app.post('/api/blockFriend/', function(req, res) {	
		// Confirm friend and changing the status
		friendRelationInfo.findOne({$or:[{userid: req.body.reqinfo.userId, friendid: req.body.reqinfo.friendId}, {userid: req.body.reqinfo.friendId, friendid: req.body.reqinfo.userId}]}, function(err, infos) {
			if (err){
				res.send(err);
			}else{
				//res.send(infos);
				friendRelationInfo.update({_id: infos._id}, { $set: {requeststatus: "blocked", blockedby: req.body.reqinfo.userId, blockedto: req.body.reqinfo.friendId}}, 
				function(error, docs){
					if(error){
						console.log("Error"+error);
					}else{
						res.send("blocked");
					}
				});
			}
		});
	});
	app.post('/api/unFriend/', function(req, res) {	
		// Confirm friend and changing the status
		friendRelationInfo.findOne({$or:[{userid: req.body.reqinfo.userId, friendid: req.body.reqinfo.friendId}, {userid: req.body.reqinfo.friendId, friendid: req.body.reqinfo.userId}]}, function(err, infos) {
			if (err){
				res.send(err);
			}else{
				//res.send(infos);
				friendRelationInfo.update({_id: infos._id}, { $set: {requeststatus: "unfriend", unfriendby: req.body.reqinfo.userId, unfriendto: req.body.reqinfo.friendId}}, 
				function(error, docs){
					if(error){
						console.log("Error"+error);
					}else{
						res.send("blocked");
					}
				});
			}
		});
	});
	
	app.post('/api/saveWallPicPos/', function(req, res) {	
		// Getting all the information related to wall pic
		userInfo.update({_id : req.body.profileid }, { $set: {wallpicpos: req.body.wallpicpos}}, function(error, docs){
			if(error){
				console.log("Error"+err);
			}else{
				//console.log("&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&yuipee");
			}
		});
	});
}