'use strict';

angular.module('angularCalendarApp', ['ngRoute', 'angularCalendarApp.controllers', 'ui.calendar', 'ui.bootstrap'])
.config(function($routeProvider, $locationProvider) {
    $routeProvider
        .when('/', {
            controller: 'CalendarController',
            templateUrl: '/views/main.html'           
        })
        .when('/login', {
            controller: 'LoginController',
            templateUrl: '/views/login.html'
        })
        .otherwise({redirectTo: '/'});

    $locationProvider.html5Mode(true);
});