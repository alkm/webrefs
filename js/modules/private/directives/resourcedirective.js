define(['app'],function(App)
{
    App.register.directive("searchResult",function($document,$window)
    {
		return {
			restrict: 'E',
			template: '<div class="search-list inline-block" data= "{{info.username | fltUN}}" id="{{info.username}}"><div class="pic-icon pull-left"><img class="min-profile-pic" ng-src="{{info.profilepic.imageBuffer}}"/></div><div class="pull-left profile-name" title={{info.fullname}}><span>{{info.fullname| limitTo : nameLimit}}</span></div></div>',
			link: function(scope, element, attr){
				scope.nameLimit = 20;
				element.on("click" , function(event){
					var profileId = scope.info.id;
					var id = event.target.closest(".search-list").id;
					var obj = {};
					obj.profileId = profileId;
					obj.id = id;
					scope.$emit("ON_PROFILE_CLICK", obj);
                });
				// var picIcon = angular.element(element[0].querySelector('.pic-icon'));
				// var icon = scope.info.profilepic;
				// picIcon.css("background", "url("+icon+")");
			}
		};
	});
    App.register.directive("rotateImage",function()
    {	
		return {
			restrict: 'A',
			link: function (scope, element, attrs) {
				scope.$watch(attrs.degrees, function (rotateDegrees) {
					console.log(rotateDegrees);
					var r = 'rotate(' + rotateDegrees + 'deg)';
					element.css({
						'-moz-transform': r,
						'-webkit-transform': r,
						'-o-transform': r,
						'-ms-transform': r
					});
				});
			}
		}
	});
});