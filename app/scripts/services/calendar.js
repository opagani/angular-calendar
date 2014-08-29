'use strict';

angular.module('angularCalendarApp.services', [])
.service('GetUsersService', function($q, $http) {
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
})
.service('SubtractUserDaysService', function($q, $http) {
    this.subtractUserDays = function(name) {
        var d = $q.defer();

        $http({
            method: 'POST', 
            url: '/user/days/subtract',
            data: { 
                name: name
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
})
.service('AddUserDaysService', function($q, $http) {
    this.addUserDays = function(name) {
        var d = $q.defer();

        $http({
            method: 'POST', 
            url: '/user/days/add',
            data: { 
                name: name
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
});