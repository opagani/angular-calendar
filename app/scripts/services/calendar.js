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

function GetEventsService($q, $http) {
    this.getEvents = function() {
        var d = $q.defer();

        $http({
            method: 'GET', 
            url: '/events'
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
    this.deleteEvent = function(deletedEvent) {
        var d = $q.defer();
        var deletedEventObj = JSON.parse(deletedEvent);

        $http({
            method: 'POST', 
            url: '/event/delete/' + deletedEventObj._id,
            data: deletedEventObj
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

function ModalService($modal) {

    var modalDefaults = {
        backdrop: true,
        keyboard: true,
        modalFade: true,
        templateUrl: '/views/modal.html'
    };

    var modalOptions = {
        closeButtonText: 'Cancel',
        actionButtonText: 'Delete',
        headerText: 'Proceed?',
        bodyText: 'Are you sure you want to delete this event?'
    };

    this.showModal = function (customModalDefaults, customModalOptions) {
        if (!customModalDefaults) {
            customModalDefaults = {};
        }
        customModalDefaults.backdrop = 'static';
        return this.show(customModalDefaults, customModalOptions);
    };

    this.show = function (customModalDefaults, customModalOptions) {
        //Create temp objects to work with since we're in a singleton service
        var tempModalDefaults = {};
        var tempModalOptions = {};

        //Map angular-ui modal custom defaults to modal defaults defined in service
        angular.extend(tempModalDefaults, modalDefaults, customModalDefaults);

        //Map modal.html $scope custom properties to defaults defined in service
        angular.extend(tempModalOptions, modalOptions, customModalOptions);

        if (!tempModalDefaults.controller) {
            tempModalDefaults.controller = function ($scope, $modalInstance) {
                $scope.modalOptions = tempModalOptions;
                $scope.modalOptions.ok = function (result) {
                    $modalInstance.close(result);
                };
                $scope.modalOptions.close = function (result) {
                    $modalInstance.dismiss('cancel');
                };
            };
        }

        return $modal.open(tempModalDefaults).result;
    };
}

angular.module('AngularCalendarApp.services', [])
    .service('GetUsersService', GetUsersService)
    .service('GetEventsService', GetEventsService)
    .service('CreateEventService', CreateEventService)
    .service('DeleteEventService', DeleteEventService)
    .service('UpdateEventService', UpdateEventService)
    .service('ModalService', ['$modal', ModalService]);