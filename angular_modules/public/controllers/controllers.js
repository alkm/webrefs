'use strict';

/* Controllers */
angular.module('SocialUtility.controllers', ['ngSanitize','colorpicker.module'])
	.config(['$controllerProvider', function($controllerProvider) {
		  $controllerProvider.allowGlobals();
	   }])
    .controller('AppController',function ($scope, $rootScope, $location, $timeout, $document, $route, SearchHandler, GeneralDataSet) {
        $rootScope.currentUserInfo = {};
        $rootScope.generalDataSet = "";
		$rootScope.profileDataSet = {}; //Keep all the general profile info to push into local storage, sothat can be retrieved on page load and no need to do server call.
		$rootScope.isProfileBtnShow = false;
        $rootScope.profileID = "";
        $scope.searchInfo = {};
        $scope.searchResult = [];
		$scope.isloggedIn = true;
		$rootScope.profilePicPath = "";
		$rootScope.email = "";
		$rootScope.switchSocket = false;

		
		$('body').on('click','.option li',function(){
			var i = $(this).parents('.select').attr('id');
			var v = $(this).children().text();
			var o = $(this).attr('id');
			$('#'+i+' .selected').attr('id',o);
			$('#'+i+' .selected').text(v);
		});


        function generateSearchResultUI(searchResultData){
            console.log(searchResultData);
            var html="<ul id='searchResultContainer'></ul>";
            $(".navbar-brand").append(html);
            for(var items in searchResultData){
                $("<li class='search-list' id='"+searchResultData[items]._id+"'><img src='"+searchResultData[items].profilepicpath+"'/><span>"+searchResultData[items].fullname+"</span></li>").appendTo($(".navbar-brand > ul"));
            }
        }

        $scope.onSearchRequest = function(){
            SearchHandler.trySearch($scope.searchInfo)
            .success(function(data) {
                $scope.loading = false;
                $(".navbar-brand > ul").empty();
                $scope.searchResult = [];
                if(data.length >= 1){
                    for (var obj in data){
                        $scope.searchResult.push(data[obj]);
                    }
                    generateSearchResultUI($scope.searchResult);
                }

            });

        }
    })

    .controller('SignUpController',function ($scope, $rootScope, $location, $route, UserRegistration) {
        $scope.userInfo = {};
        $scope.signInInfo = {};
        $scope.profilePicInfo = {};
        $scope.userId = {};

        $scope.signUp = function(){
            UserRegistration.create($scope.userInfo)
            .success(function(data) {
				$scope.loading = false;
                if(data.status == "success"){
                    $scope.userInfo = {}; // clear the form so our user is ready to enter another
                    //alert(data.message);
                }
                else{
                    alert(data.message);
                }
			});
        }

        $scope.backToSignIn = function(){
            $("#signInPanel").show();
            $("#signUpPanel").hide();
        }
    })

    .controller('SignInController',function ($scope, $rootScope, $location, $route, UserAuhentication, GeneralDataSet) {
        $scope.userInfo = {};
        $scope.signIn = function(){
            UserAuhentication.authenticate($scope.signInInfo)
            .success(function(data) {
                $scope.loading = false;
                if(data.status == "success"){
                    $scope.signInInfo = {}; // clear the sign in form
					$rootScope.isloggedIn = true;
                    $location.path("/home");
                    $rootScope.profilePicPath = "/assets/images/defaultimages/profileimages/defaultprofilepic.jpg";
					localStorage.setItem("userid", data._id);
                    GeneralDataSet.getGeneralDataSet({"userid" : data._id})
                    .success(function(data){
                        $rootScope.generalDataSet = data;
                       // localStorage.setItem('generaldataset', JSON.stringify($rootScope.generalDataSet));//Lets not keep all these in local storage and call mongo db on page load
                        $rootScope.profilePicPath = $rootScope.generalDataSet.profilepicpath;
                        $(".welcome-panel").find(".welcome-message").html("Welcome "+$rootScope.generalDataSet.username);
                    });
                }
                else{
                    alert(data.message);
                }
            });
        }

        $scope.register = function(){
            $("#signInPanel").hide();
            $("#signUpPanel").show();
        }
    });
