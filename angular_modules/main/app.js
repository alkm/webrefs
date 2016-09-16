	alert("wow");
    var app = angular.module("webrefs", ['ui.router']);
    app.controller("AppController",function ($scope, $state) {
	  // $scope.changeState = function () {
		// $state.go('contact.detail');
	  // };
	  alert("crap");
	});

    /** Configuring the app path and state using angular-ui-route
     *
     */
    app.config(function($stateProvider,$urlRouterProvider)
    {
        //$urlRouterProvider.otherwise("/dashboards");// default route

        //statemanagement for dashboard
        $stateProvider.state('home',
            {
                url:'/home',
                templateUrl: '../../private/partials/home.html',
				//controller: 'HomeController',
				//controllerUrl: 'js/modules/dashboards/homecontroller.js',
				//navTab: "home"
            })
        /* State for APPS*/
           /* .state('Products'
                {
                     url:'/products',
                     templateUrl: 'partials/products/appsmainview.html',
                     controller: 'AppListController',
                     controllerUrl: 'js/modules/products/applistcontroller.js',
                     navTab: "products"
                })
            .state('Products.Detail',
                {
                     url:'/products/:appid',
                     templateUrl: 'partials/products/appsitemdetail.html',
                     controller: 'AppItemDetailController',
                     controllerUrl: 'js/modules/products/appitemdetailcontroller.js',
                     navTab: "products"
                });*/

    });
	function AppController($rootScope){
		alert("wow");
		
	}