define(function () {
        "use strict";

        var NavbarController = function($rootScope, $scope, $location) {
                $scope.isActive = function(page) {
                       return $location.path().indexOf(page)>-1?true:false;
                };
				$scope.isNav = false;
        };

        NavbarController.$inject = ["$scope", '$location'];

        return NavbarController;
});