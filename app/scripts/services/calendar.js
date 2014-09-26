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

function GetUserDaysService($q, $http) {
    this.getUserDays = function(username) {
        var d = $q.defer();

        $http({
            method: 'GET', 
            url: '/user/days/' + username
        })
        .then(function(response) {
            var days = response.data;
            d.resolve(days);
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

function GetEventsService($q, $http) {
    this.getEvents = function(username) {
        var d = $q.defer();

        $http({
            method: 'GET', 
            url: '/events/' + username
        })
        .then(function(response) {
            var events = response.data;
            d.resolve(events);
        },
        function(error) {
            d.reject(error);
        });
        return d.promise;
    };
}

function CreateEventService($q, $http) {
    this.createEvent = function(newEvent) {
        var d = $q.defer();

        $http({
            method: 'POST', 
            url: '/event/create',
            data: newEvent
        })
        .then(function(response) {
            var event = response.data;
            d.resolve(event);
        },
        function(error) {
            d.reject(error);
        });
        return d.promise;
    };
}

function DeleteEventService($q, $http) {
    this.deleteEvent = function(id) {
        var d = $q.defer();

        $http({
            method: 'POST', 
            url: '/event/delete/' + id
        })
        .then(function(response) {
            var event = response.data;
            d.resolve(event);
        },
        function(error) {
            d.reject(error);
        });
        return d.promise;
    };
}

function UpdateEventService($q, $http) {
    this.updateEvent = function(updatedEvent) {
        var d = $q.defer();

        $http({
            method: 'POST', 
            url: '/event/update',
            data: JSON.parse(updatedEvent)
        })
        .then(function(response) {
            var event = response.data;
            d.resolve(event);
        },
        function(error) {
            d.reject(error);
        });
        return d.promise;
    };
}

angular.module('AngularCalendarApp.services', [])
    .service('GetUsersService', GetUsersService)
    .service('GetUserDaysService', GetUserDaysService)
    .service('UpdateUserDaysService', UpdateUserDaysService)
    .service('GetEventsService', GetEventsService)
    .service('CreateEventService', CreateEventService)
    .service('DeleteEventService', DeleteEventService)
    .service('UpdateEventService', UpdateEventService);