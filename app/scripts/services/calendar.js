'use strict';

function GetUsersService($q, $http) {
    this.getUsers = function() {
        var d = $q.defer();

        $http({
            method: 'GET', 
            url: '/users'
        })
        .then(function(response) {
            var users = response.data;
            d.resolve(users);
        },
        function(error) {
            d.reject(error);
        });
        return d.promise;
    };
}

function UpdateUserDaysService($q, $http) {
    this.updateUserDays = function(name, dayDelta) {
        var d = $q.defer();

        $http({
            method: 'POST', 
            url: '/user/days/update',
            data: { 
                name: name,
                dayDelta: dayDelta
            }
        })
        .then(function(response) {
            d.resolve();
        },
        function(error) {
            d.reject(error);
        });
        return d.promise;
    };
}

angular.module('AngularCalendarApp.services', [])
    .service('GetUsersService', GetUsersService)
    .service('UpdateUserDaysService', UpdateUserDaysService);