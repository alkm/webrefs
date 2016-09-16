'use strict';

/* Directives */

angular.module('SocialUtility.directives', []).

	directive('scrollPosition', function($window) {
		return {
			scope: {
				scroll: '=scrollPosition'
			},
			link: function(scope, element, attrs) {
				var windowEl = angular.element($window);
				var handler = function() {
					scope.scroll = windowEl.scrollTop();
				}
				windowEl.on('scroll', scope.$apply.bind(scope, handler));
				handler();
			}
		};
	}).
    directive('orientable', function () {
        return {
            link: function(scope, element, attrs) {

                element.bind("load" , function(event){

                    // success, "load" event catched
                    // now we can do specific stuff:
                    scope.$emit("LOAD_COUNT", "");
                });

            }
        }
    }).
	
	directive('isimageloaded', function () {
        return {
            link: function(scope, element, attrs) {
                element.bind("load" , function(event){
                    // success, "load" event catched
                    // now we can do specific stuff:
                    scope.$emit("IMAGE_LOADED", "");
                });

            }
        }
    }).

    directive('appVersion', ['version', function (version) {
        return function (scope, elm, attrs) {
            elm.text(version);
        };
    }]).

    directive('cycle',function () {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                $(element).cycle({
                    fx: 'fade',
                    timeout: 10
                });
            }
        };
    }).

    directive('siteHeader',function (RefineSearchParam) {
        return {
            restrict: 'E',
            template: '<a class="button">{{back}}</a>',
            scope: {
                back: '@back',
                icons: '@icons'
            },
            link: function (scope, element, attrs) {
                $(element[0]).on('click', function () {
                    RefineSearchParam.isRefineSearch = false;
                    RefineSearchParam.backClick = true;
                    window.history.back();
                    scope.$apply();
                });
            }
        };
    }).

    directive('errSrc', function () {
        return {
            link: function (scope, element, attrs) {
                element.bind('error', function () {
                    element.attr('src', attrs.errSrc);
                });
            }
        }
    }).

    directive('keyEnter', function () {
        return function (scope, element, attrs) {
            element.bind("keydown keypress", function (event) {
                if(event.which === 13) {
					if (scope.$root.$$phase != '$apply' && scope.$root.$$phase != '$digest') {
						scope.$apply(function (){
							scope.$eval(attrs.keyEnter);
						});
					}
                    event.preventDefault();
                }
            });
        };
    }).
	directive('ngEnter', function () {
		return function (scope, element, attrs) {
			element.bind('keydown keypress', function (event) {
				if(event.which === 13) {
					if (scope.$root.$$phase != '$apply' && scope.$root.$$phase != '$digest') {
						scope.$apply(function (){
							scope.$eval(attrs.ngEnter, {$event:event});
						});
						event.preventDefault();
					}
				}
			});
		};
	}).
	/*Currently used directives*/
	directive("friendreqDetails", function() {
		return {
			restrict: "E",
			templateUrl: "./partials/snippets/chat/friend_req_details.html"
		}
	}).
	directive("friendTile", function() {
		return {
			restrict: "E",
			// templateUrl: "./partials/snippets/friend_tile.html"
		}
	}).
	directive("chatBuddy", function() {
		return {
			restrict: "E",
			templateUrl: "./partials/snippets/chat/chat_buddy_panel.html"
		}
	}).
	directive("chatWindow", function() {
		return {
			restrict: "E",
			templateUrl: "./partials/snippets/chat/chat_window_panel.html"
		}
	}).
	
	directive("postStatusInput", function() {
		return {
			restrict: "E",
			templateUrl: "./partials/snippets/feed/post_status_input.html"
		}
	}).
	directive("postedCommentItems", function() {
		return {
			restrict: "E",
			templateUrl: "./partials/snippets/feed/posted_comment_items.html"
		}
	}).
	directive("mediaElements", function() {
		return {
			restrict: "E",
			templateUrl: "./partials/snippets/media/posted_media_items.html"
		}
	}).
	directive("watcherItems", function() {
		return {
			restrict: "E",
			templateUrl: "./partials/snippets/feed/watcher_items.html"
		}
	}).
	directive('videoLoader', function(){
		return function (scope, element, attrs, window){
			scope.$watch(attrs.videoLoader, function(){
				// element[0].load();
				// element[0].currentTime = 1;
				//element.next(".can-vas").css("display", "none");
				var canv = element.next(".can-vas");
				var obj = {};
				obj.canvas = canv[0];
				obj.video = element[0];
				//canv.css("background", "#0000ff");
				//scope.ctx = scope.canv[0].getContext('2d');
				//scope.$broadcast("POSTER_CANVAS_READY", obj);
				//scope.ctx.drawImage(element[0], 100, 100, 320, 240);
					
				//element[0].addEventListener("playing", onPlayStarted);
				function onPlayStarted(){
					element[0].currentTime = 1;
					element[0].pause();
					var canvas = element[0].next("#canvas");
					var ctx = canvas.getContext('2d');
					ctx.drawImage(element[0], 0, 0, 320, 240);
				}
			});
		}
	});

