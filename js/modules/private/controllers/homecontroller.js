define(['app', 'ngload!userinfo-service', 'ngload!chat-controller', 'ngload!changeprofilepicmodal-controller', 'ngload!search-controller', 'ngload!search-service', 'ngload!utility-service', 'ngload!resource-filter'], function (app) {
    app.register.controller('HomeController', ['$rootScope', '$scope', '$window', '$state', '$uibModal', 'FBInfoService', 'SetDimension', 'CheckLocalInfo', function ($rootScope, $scope, $window, $state, $uibModal, FBInfoService, SetDimension, CheckLocalInfo)
	{
		if(!CheckLocalInfo.checkGeneralDataSet()){
			$rootScope.$emit('ON_LOGOUT', { obj: "" });
		}
		var defaultProfilePic = "../images/defaultimages/profileimages/defaultprofilepic.jpg";
		if(localStorage && localStorage.getItem("generalDataSet")){
			var generalDataSet = localStorage.getItem("generalDataSet")
			$scope.name = JSON.parse(generalDataSet).name;
			$scope.email = JSON.parse(generalDataSet).email;
			var profilePic = JSON.parse(generalDataSet).profilePic;
			$rootScope.profilePic = (profilePic == undefined) ? defaultProfilePic : profilePic;
			$rootScope.profilePicHeight = setDimension("height", profilePic.profilePicDimension);
			$rootScope.profilePicWidth = setDimension("width", profilePic.profilePicDimension);
			$rootScope.previewPicHeight = setDimension("height", profilePic.previewPicDimension);
			$rootScope.previewPicWidth = setDimension("width", profilePic.previewPicDimension);
		}
		
		function setDimension(prop, val){
			return SetDimension.setImgDimension(prop, val);
		}
		
		$scope.onSignOutBtnClick = function(){
			localStorage.removeItem("generalDataSet");
			localStorage.clear();
			console.log(localStorage);
			$rootScope.$emit('ON_LOGOUT', { obj: "" });
		}
		
		$scope.onProfileClick = function(){
			$state.transitionTo("Profile",{profileid: $scope.email});
		}
		$scope.onSearchRequest = function(){


        }
			/**
	 * Use a run block to ensure the modal will open from anywhere in the app.
	 **/
	  /**
	   * Listen to the `$stateChangeStart` event
	   */
	 // $rootScope.$on('$stateChangeStart', function (event, toState) {
		/**
		 * if the new state is not "terms", then ignore it
		 */
		//if(toState.name !== 'Home.changeProfilePic') return;
		/**
		 * Open the modal window
		 */
		 $scope.updateProfilePic = function(){
			var modalInstance = $uibModal.open({
				animation: $scope.animationsEnabled,
				templateUrl: '/partials/private/modals/changeProfilePic.html',
				controller: 'ChangeProfilePicModalController',
				// controllerUrl: 'js/modules/private/controllers/modals/changeprofilepicmodalcontroller.js'
			});
			modalInstance.result.then(function () {
			  //alert('Modal success at:' + new Date());
			}, function () {
			 // alert('Modal dismissed at: ' + new Date());
			  $rootScope.$emit('ON_STOP_CAM_STREAM', { obj: "" });
			});

		  /*modalInstance.result.then(function(selectedItem) {
			$scope.selected = selectedItem;
		  }, function() {
			$log.info('Modal dismissed at: ' + new Date());
		  });*/
		 }



		/**
		 * Prevent the transition to the dummy state, stay where you are
		 */
		// event.preventDefault();
	  // })
		
	}]);
	
}); 