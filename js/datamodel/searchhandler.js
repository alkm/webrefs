var userInfo = require('./model/userinfo');
module.exports = function(app) {

	// api ---------------------------------------------------------------------
	app.post('/api/trySearch/', function(req, res) {
		userInfo.aggregate({ $match: { $text: { $search: req.body.searchString } } }, function(err, infos){

			if(err)	{
				res.send(err);
			}
				res.send(infos);
		})
	});
}