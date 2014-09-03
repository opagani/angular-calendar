'use strict';

function MainCtrl($scope, GetUsersService, UpdateUserDaysService) {
        var date = new Date();
        var d = date.getDate();
        var m = date.getMonth();
        var y = date.getFullYear();

        GetUsersService.getUsers().then(function(users) {
            $scope.users = users;
        });
        
        $scope.update = function() {
            $scope.name = $scope.selectedItem.name;
            $scope.days = $scope.selectedItem.days;
            $scope.alertMessage = ($scope.name + ' has ' + $scope.days + ' days');
        };
        
        $scope.changeTo = 'Spanish';

        /* event source that pulls from google.com */
        $scope.eventSource = {
            url: "http://www.google.com/calendar/feeds/usa__en%40holiday.calendar.google.com/public/basic",
            className: 'gcal-event',           // an option!
            currentTimezone: 'America/Los_Angeles' // an option!
        };

        /* event source that contains custom events on the scope */
        $scope.events = [
            /*{title: 'All Day Event',start: new Date(y, m, 1)},
            {title: 'Long Event',start: new Date(y, m, d - 5),end: new Date(y, m, d - 2)},
            {id: 999,title: 'Repeating Event',start: new Date(y, m, d - 3, 16, 0),allDay: false},
            {id: 999,title: 'Repeating Event',start: new Date(y, m, d + 4, 16, 0),allDay: false},
            {title: 'Birthday Party',start: new Date(y, m, d + 1, 19, 0),end: new Date(y, m, d + 1, 22, 30),allDay: false},
            {title: 'Click for Google',start: new Date(y, m, 28),end: new Date(y, m, 29),url: 'http://google.com/'}
        */];

        /* event source that calls a function on every view switch */
        $scope.eventsF = function(start, end, callback) {
            var s = new Date(start).getTime() / 1000;
            var e = new Date(end).getTime() / 1000;
            var m = new Date(start).getMonth();
            var events = [{title: 'Feed Me ' + m,start: s + (50000),end: s + (100000),allDay: false, className: ['customFeed']}];
            callback(events);
        };

        $scope.calEventsExt = {
            color: '#f00',
            textColor: 'yellow',
            events: [ 
                {type:'party',title: 'Lunch',start: new Date(y, m, d, 12, 0),end: new Date(y, m, d, 14, 0),allDay: false},
                {type:'party',title: 'Lunch 2',start: new Date(y, m, d, 12, 0),end: new Date(y, m, d, 14, 0),allDay: false},
                {type:'party',title: 'Click for Google',start: new Date(y, m, 28),end: new Date(y, m, 29),url: 'http://google.com/'}
            ]
        };

        /* alert on eventClick */
        $scope.alertOnEventClick = function(event, allDay, jsEvent, view) {
            $scope.alertMessage = (event.title + ' was clicked ');
        };

        /* alert on Drop */
        $scope.alertOnDrop = function(event, dayDelta, minuteDelta, allDay, revertFunc, jsEvent, ui, view) {
            //$scope.alertMessage = ('Event Droped to make dayDelta ' + dayDelta);
            $scope.alertMessage = ($scope.name + ' has ' + $scope.days + ' days');
        };

        /* alert on Resize */
        $scope.alertOnResize = function(event, dayDelta, minuteDelta, revertFunc, jsEvent, ui, view ) {
            UpdateUserDaysService.updateUserDays($scope.name, dayDelta).then(function() {
                $scope.days -= dayDelta;
                $scope.alertMessage = ($scope.name + ' has ' + $scope.days + ' days');
            });
        };

        /* add and removes an event source of choice */
        $scope.addRemoveEventSource = function(sources, source) {
            var canAdd = 0;
            angular.forEach(sources, function(value, key){
                if(sources[key] === source){
                    sources.splice(key, 1);
                    canAdd = 1;
                }
            });
            if(canAdd === 0){
                sources.push(source);
            }
        };

        /* add custom event*/
        $scope.addEvent = function() {
            $scope.events.unshift({
                title: 'New Event',
                start: new Date(),
                end: new Date(),
                className: ['new-event']
            });

            UpdateUserDaysService.updateUserDays($scope.name, -1).then(function() {
                $scope.days += -1;
                $scope.alertMessage = ($scope.name + ' has ' + $scope.days + ' days');
            });   
        };

        /* remove event */
        $scope.remove = function(index) {
            $scope.events.splice(index, 1);
            // TODO - FIX remove function for an event that has more than one day
            UpdateUserDaysService.updateUserDays($scope.name, 1).then(function() {
                $scope.days += 1;
                $scope.alertMessage = ($scope.name + ' has ' + $scope.days + ' days');
            });
        };

        /* Change View */
        $scope.changeView = function(view, calendar) {
            calendar.fullCalendar('changeView', view);
        };

        /* Change View */
        $scope.renderCalender = function(calendar) {
            if(calendar){
                calendar.fullCalendar('render');
            }
        };

        /* config object */
        $scope.uiConfig = {
            calendar: {
                height: 450,
                editable: true,
                header: {
                    left: 'title',
                    center: '',
                    right: 'today prev,next'
                },
                eventClick: $scope.alertOnEventClick,
                eventDrop: $scope.alertOnDrop,
                eventResize: $scope.alertOnResize
            }
        };

        $scope.changeLang = function() {
            if($scope.changeTo === 'Spanish'){
                $scope.uiConfig.calendar.dayNames = ["Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado"];
                $scope.uiConfig.calendar.dayNamesShort = ["Dom", "Lun", "Mar", "Mie", "Jue", "Vie", "Sab"];
                $scope.changeTo= 'English';
            } else {
                $scope.uiConfig.calendar.dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
                $scope.uiConfig.calendar.dayNamesShort = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
                $scope.changeTo = 'Spanish';
            }
        };

        /* event sources array*/
        //$scope.eventSources = [$scope.events, $scope.eventSource, $scope.eventsF];
        $scope.eventSources = [$scope.events, $scope.eventSource];

        $scope.eventSources2 = [$scope.calEventsExt, $scope.eventsF, $scope.events];
}

angular.module('AngularCalendarApp.controllers')
    .controller('MainCtrl', MainCtrl);