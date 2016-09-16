define(['app'], function (app) {
    app.register.factory('ProfilePicUpload', ['$http','$location', function ($http,$location)
    {
		return {
            get : function() {
                return $http.get('/api/uploadEncodedProfilePic');
            },
            create : function(profilePicInfo) {
                return $http.post('/api/uploadEncodedProfilePic', profilePicInfo);
            },
            delete : function(id) {
                return $http.delete('/api/uploadEncodedProfilePic/' + id);
            }
        }
	}]);
});