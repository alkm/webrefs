var userInfo = require('./datamodel/UserInfo');

module.exports = function(app) {

	// api ---------------------------------------------------------------------
	// get all users
	app.post('/api/getProfileDataSet/', function(req, res) {
		console.log("Trying to fetch data");

		//var generalDataSetInfo = new Object();
		// use mongoose to get all users in the database
		userInfo.findOne({_id: req.body.profileid}, function(err, infos) {

			// if there is an error retrieving, send the error. nothing after res.send(err) will execute
			if (err){
				res.send(err)
			}
			res.json({"profilepicpath" : infos.profilepicpath, "email" : infos.email});
		});
	});
}