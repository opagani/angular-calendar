'use strict';

function MainCtrl($scope, GetUsersService, GetEventsService, CreateEventService, DeleteEventService, UpdateEventService, ModalService) {
        var date = new Date();
        var d = date.getDate();
        var m = date.getMonth();
        var y = date.getFullYear();

        $scope.minValue = 0;

        $scope.refreshState = function() {
            GetUsersService.getUsers().then(function(users) {
                $scope.users = users;
                $scope.isUserDisabled = true;
            });
        };

        $scope.refreshState();

        /* event source that contains custom events on the scope */
        $scope.events = [
            /*{title: 'All Day Event',start: new Date(y, m, 1)},
            {title: 'Long Event',start: new Date(y, m, d - 5),end: new Date(y, m, d - 2)},
            {id: 999,title: 'Repeating Event',start: new Date(y, m, d - 3, 16, 0),allDay: false},
            {id: 999,title: 'Repeating Event',start: new Date(y, m, d + 4, 16, 0),allDay: false},
            {title: 'Birthday Party',start: new Date(y, m, d + 1, 19, 0),end: new Date(y, m, d + 1, 22, 30),allDay: false},
            {title: 'Click for Google',start: new Date(y, m, 28),end: new Date(y, m, 29),url: 'http://google.com/'}*/
        ];

        GetEventsService.getEvents().then(function(events) {
           events.forEach(function(event) {
               $scope.events.push(event);
            });
        });

        $scope.convertDate = function(date) {
            var dateString = "";
            var newDate = new Date(date);

            // Get the month, day, and year.
            dateString += (newDate.getMonth() + 1) + "/";
            dateString += newDate.getDate() + "/";
            dateString += newDate.getFullYear();

            return dateString;
        };

        $scope.findObjIdFromArray = function(arr, id) {
            for (var i=0; i<arr.length; i++) {
                if (arr[i]._id === id) {
                    return i;
                }
            }
            return -1;
        };
        
        $scope.update = function() {
            $scope.username = $scope.selectedItem.username;
            $scope.name = $scope.selectedItem.name;
            $scope.isUserDisabled = false;
        };

        /* event source that pulls from google.com */
        $scope.eventSource = {
            url: "http://www.google.com/calendar/feeds/usa__en%40holiday.calendar.google.com/public/basic",
            className: 'gcal-event',           // an option!
            currentTimezone: 'America/Los_Angeles' // an option!
        };

        /* alert on eventClick */
        $scope.alertOnEventClick = function(event, allDay, jsEvent, view) {
            if (!event.end) {
                event.end = event.start;
            }

            var modalOptions = {
                closeButtonText: 'Cancel',
                actionButtonText: 'Delete Event',
                headerText: 'Delete ' +  event.title +  '  ' + $scope.convertDate(event.start) + ' - ' + 
                    $scope.convertDate(event.end) + '?',
                bodyText: 'Are you sure you want to delete this event?'          
            };

            ModalService.showModal({}, modalOptions).then(function(result) {
                $scope.deleteEvent(event);
            });
        };

        /* alert on Drop */
        $scope.alertOnDrop = function(event, dayDelta, minuteDelta, allDay, revertFunc, jsEvent, ui, view) {
            // the arshaw fullcalendar v1 creates a circular reference to its own events.
            // we use Douglas Crockford's library cycle.js to break this cycle.
            var updatedEvent = JSON.stringify(JSON.decycle(event));
            UpdateEventService.updateEvent(updatedEvent).then(function() {
                console.log("Event updated.");
            });
        };

        /* alert on Resize */
        $scope.alertOnResize = function(event, dayDelta, minuteDelta, revertFunc, jsEvent, ui, view ) {
            if (!event.end) {
                event.end = event.start;
            }

            var updatedEvent = JSON.stringify(JSON.decycle(event));
            UpdateEventService.updateEvent(updatedEvent).then(function() {
                console.log("Event updated.");
                $scope.refreshState();
            });
        };

        /* add custom event*/
        $scope.addEvent = function() {
            var newEvent = {
                username: $scope.username,
                title: $scope.name,
                start: new Date(y, m, d),
                end: new Date(y, m, d)
            };

            CreateEventService.createEvent(newEvent).then(function(event) {
                $scope.events.unshift(event);
                console.log("Event created.");
                $scope.refreshState();
            });
        };

        /* remove event */
        $scope.deleteEvent = function(event) {
            var index = $scope.findObjIdFromArray($scope.events, event._id);
            var deletedEvent = JSON.stringify(JSON.decycle(event));
            DeleteEventService.deleteEvent(deletedEvent).then(function() {
                $scope.events.splice(index, 1);
                console.log("Event deleted.");
                $scope.refreshState();
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

        /* event sources array*/
        $scope.eventSources = [$scope.events, $scope.eventSource];
}

angular.module('AngularCalendarApp.controllers')
    .controller('MainCtrl', MainCtrl);