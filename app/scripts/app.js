'use strict';

function config($routeProvider, $locationProvider) {
    $routeProvider
        .when('/', {
            templateUrl: '/views/main.html',
            controller: 'MainCtrl',
            controllerAs: 'main'                  
        })
        .when('/login', {
            templateUrl: '/views/login.html',
            controller: 'LoginCtrl',
            controllerAs: 'login'
        })
        .otherwise({redirectTo: '/'});

    $locationProvider.html5Mode(true);
}

angular.module('AngularCalendarApp', ['ngRoute', 'AngularCalendarApp.controllers',
               'AngularCalendarApp.services', 'ui.calendar', 'ui.bootstrap'])
    .config(config);