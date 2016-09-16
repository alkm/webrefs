'use strict';

// Declare app level module which depends on filters, and services
angular.module('SocialUtility', ['ngRoute', 'SocialUtility.filters', 'SocialUtility.services', 'SocialUtility.directives', 'SocialUtilityFeed.directives', 'SocialUtilityModule.directives','SocialUtilityResources.directives', 'SocialUtility.controllers']).

    config(['$sceProvider', function ($sceProvider) {
        $sceProvider.enabled(false);
    }]).

    config(['$routeProvider', function ($routeProvider) {
        var routes = {
            '/error': { controller: 'ErrorController'},
            '/public': { controller: ''},
            // '/profile': { controller: 'ProfileController'},
            '/home': { controller: 'HomeController'}
        };

        for (var route in routes) {
            var screen = route.split('/')[1];
            $routeProvider.when(route, angular.extend({
                templateUrl: './partials/' + screen + '.html',
                current_screen: screen,
                screen_settings_key: screen + '_view'
            }, routes[route]));
        }

        $routeProvider.otherwise({ redirectTo: '/public' });
    }]);
