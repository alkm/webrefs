'use strict';

/* Filters */

angular.module('SocialUtility.filters', []).
    filter('keys',function () {
        return function (obj) {
            if (!(obj instanceof Object)) {
                return obj;
            }

            console.log(obj);

            var arr = [];
            for (var key in obj) {
                arr.push(key);
            }
            return arr;
        }
    }).
    filter('values',function () {
        return function (obj) {
            if (!(obj instanceof Object)) {
                return obj;
            }

            var arr = [];
            for (var key in obj) {
                arr.push(obj[key]);
            }
            return arr;
        }
    }).
    filter('homeButtonClass', [function () {
        return function (button) {
            return (button.use_custom_image == true) ? 'custom-image-button' : 'text-button';
        }
    }]).
	filter('showScrollerArrow', function () {
		return function (arr) {
			if(arr.length == 0){
				console.log(arr);
				return false;
			}else{
				return true;
			}
		};
	}).
    //Created for pagination
    filter('startFrom', function () {
        return function (input, start) {
            start = +start;
            if (input != null && input.slice !== undefined) //Checking for null input else slice will not work
            {
                return input.slice(start);
            }
        }
    }).
	
	filter('reverse', function() {
	  return function(items) {
		return items.slice().reverse();
	  };
	}).
	
	filter('insertSmileys', ['CreateSmileys', function (CreateSmileys) {
	  return function (post) {
		  return CreateSmileys.setSmileys(post);
	  };
	}]);