define(['app'], function (app) {
	//Smiley services
	app.register.factory('CreateSmileys', function() {
		return{
			setSmileys : function(post) {
				return post
				.replace(/:\)/gi,"<span><img src='/images/defaultimages/smileys/socialutility-emotion0-smile.gif'></img></span>")
				.replace(/:\(/gi,"<span><img src='/images/defaultimages/smileys/socialutility-emotion1-sadsmile.gif'></img></span>")
				.replace(/B=\)/gi,"<span><img src='/images/defaultimages/smileys/socialutility-emotion3-cool.gif'></img></span>");
			}
		};
	})

});