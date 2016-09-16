'use strict';

// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('SocialUtility.services', ['ngResource'])

	//Controllers communicators
	.factory('ControllersInterfaces', function(){
		var setterMethod = null;
		return{
			getRefreshFeedCallBack : function(getterMethod) {
				setterMethod = getterMethod;
			},
			setRefreshFeedCallBack : function() {
				setterMethod();
			}
		}
	})
    // super simple service
    // each function returns a promise object 
	.factory('CoolCommentMsgHandler', function(){
		var arr_ = [];
		var elm_ = "";
		return{
			getMsg : function(arr, elm) {
				arr_ = arr;
				elm_ = elm;
			},
			setMsg : function() {
				if(arr_.indexOf(elm_) == -1){
					if(arr_.length == 0){
						return "Be the first to say this is cool.";
					}
					return arr_.length+" people thinks this is cool";
				}
				else{
					if(arr_.length == 1){
						return "You think this is cool.";
					}
					return "You and "+(arr_.length-1)+" people thinks this is cool";
				}

			}
		}
	})
	
    .factory('UserRegistration', function($http) {
        return {
            get : function() {
                return $http.get('/api/userInfo');
            },
            create : function(userInfo) {
                return $http.post('/api/userInfo', userInfo);
            },
            delete : function(id) {
                return $http.delete('/api/userInfo/' + id);
            }
        }
    })

    .factory('UserAuhentication', function($http) {
        return {
            authenticate : function(signInInfo) {
                return $http.post('/api/authenticate/', signInInfo);
            }
        }
    })
    .factory('PicUpload', function($http) {
        return {
            uploadProfilePic : function(profilePicInfo) {
                return $http.post('/api/uploadProfilePic/', profilePicInfo);
            },
			uploadProfileCamPic : function(profilePicInfo) {
                return $http.post('/api/uploadProfileCamPic/', profilePicInfo);
            },
			
        }
    })
	.factory('PosterUpload', function($http) {
        return {
            uploadPoster : function(posterInfo) {
                return $http.post('/api/uploadPoster/', posterInfo);
            }
        }
    })
	
	.factory('BinaryImageUpload', function($http) {
        return {
            uploadEncodedProfilePic : function(posterInfo) {
                return $http.post('/api/uploadEncodedProfilePic/', posterInfo);
            }
        }
    })

    .factory('GeneralDataSet', function($http) {
        return {
            getGeneralDataSet : function(idInfo) {
                return $http.post('/api/getGeneralDataSet/', idInfo);
            }
        }
    })

    .factory('ProfileDataSet', function($http) {
        return {
            getProfileDataSet : function(idInfo) {
                return $http.post('/api/getProfileDataSet/', idInfo);
            }
        }
    })
	
	.factory('SetFriendOperation', function($http) {
        return {
			getProfileInfo : function(profileID) {
                return $http.post('/api/getProfileInfo/', profileID);
            },
            setFriendInfo : function(friendInfo) {
                return $http.post('/api/setFriendInfo/', friendInfo);
            },
			getFriendInfo : function(friendInfo) {
                return $http.post('/api/getFriendInfo/', friendInfo);
            },
			getFriendReq : function(userid) {
                return $http.post('/api/getFriendReq/', userid);
            },
			getAllFriendReq : function(userid) {
                return $http.post('/api/getAllFriendReq/', userid);
            },
			getRequestDetails : function(reqArr) {
                return $http.post('/api/getRequestDetails/', reqArr);
            },
			confirmFriendReq : function(reqInfo){
				return $http.post('/api/confirmFriendReq/', reqInfo);
			},
			blockFriend : function(reqInfo){
				return $http.post('/api/blockFriend/', reqInfo);
			},
			unFriend : function(reqInfo){
				return $http.post('/api/unFriend/', reqInfo);
			},
			getAllConfirmedFriends : function(profileid){
				return $http.post('/api/getAllConfirmedFriends/', profileid);
			},
			getFriendsSuggestion : function(profileid){
				return $http.post('/api/getFriendsSuggestion/', profileid);
			},
			getAllConfirmedFriendsDetails : function(reqidarr){
				return $http.post('/api/getAllConfirmedFriendsDetails/', reqidarr);
			},
			getAllRandomFriendsDetails : function(reqidarr){
				return $http.post('/api/getAllRandomFriendsDetails/', reqidarr);
			},
			
			getAllOnLineFriendsDetails : function(reqidarr){
				return $http.post('/api/getAllOnLineFriendsDetails/', reqidarr);
			}
        }
    })
	
	.factory('SetPicsOperation', function($http) {
		return {
			saveWallPicPos: function(wallPicInfo) {
				console.log(wallPicInfo.wallpicpos);
				return $http.post('/api/saveWallPicPos/', wallPicInfo);
			}
		}
	})
	
	.factory('SetFeedOperation', function($http) {
		return {
			savePost: function(postInfo) {
				return $http.post('/api/savePost/', postInfo);
			},
			getAllFriendsFeedDetails: function(reqidarr) {
				return $http.post('/api/getAllFriendsFeedDetails/', reqidarr);
			},
			pullFeedChannel: function(feedid) {
				return $http.post('/api/pullFeedChannel/', feedid);
			},
			updateCoolFeedChannel: function(updatedcoolobj) {
				return $http.post('/api/updateCoolFeedChannel/', updatedcoolobj);
			},
			updateCommentFeedChannel: function(updatedcommentobj) {
				return $http.post('/api/updateCommentFeedChannel/', updatedcommentobj);
			},
			updateCommentItemFeedChannel: function(updatedcommentitemobj) {
				return $http.post('/api/updateCommentItemFeedChannel/', updatedcommentitemobj);
			},
			checkVideoReady: function(videoKey) {
				return $http.post('/api/checkVideoReady/', videoKey);
			}
		}
	})
	
	.factory('SetChatOperation', function($http) {
        return {
			getChatBuddyList: function(userID) {
                return $http.post('/api/getChatBuddyList/', userID);
            }
        }
    })

    .factory('SearchHandler', function($http) {
        return {
            trySearch : function(searchInfo) {
                return $http.post('/api/trySearch/', searchInfo);
            }
        }
    })
	.factory('CheckLocalInfo', function() {
        return {
            checkUserID : function() {
				if(localStorage && localStorage.getItem('userid')){
					return localStorage.getItem('userid');
				}else{
					return false;
				}
            },
			checkProfileID : function() {
                if(localStorage && localStorage.getItem('profileid')){
					return localStorage.getItem('profileid');
				}else{
					return false;
				}
            },
			checkWindowScrollPos : function(){
			    if(localStorage && localStorage.getItem('windowscrollpos')){
					return localStorage.getItem('windowscrollpos');
				}else{
					return false;
				}	
			}
        }
    })
	//Smiley services
	.factory('CreateSmileys', function() {
	return{
		setSmileys : function(post) {
			return post
			.replace(/:\)/gi,"<span><img src='/assets/images/defaultimages/smileys/socialutility-emotion0-smile.gif'></img></span>")
			.replace(/:\(/gi,"<span><img src='/assets/images/defaultimages/smileys/socialutility-emotion1-sadsmile.gif'></img></span>")
			.replace(/B=\)/gi,"<span><img src='/assets/images/defaultimages/smileys/socialutility-emotion3-cool.gif'></img></span>");
		}
	};
 })
 .factory('ReadableFileSize', function() {
	return{
		setReadableFileSize : function(size) {
			var i = Math.floor( Math.log(size) / Math.log(1024) );
			return ( size / Math.pow(1024, i) ).toFixed(2) * 1 + ' ' + ['Bytes', 'KB', 'MB', 'GB', 'TB'][i];
		}
	};
 });