'use strict';

angular.module('AngularCalendarApp.filters', [])
    .filter('gt', function() {
        return function(items, value) {
            var filteredItems = [];
            angular.forEach(items, function ( item ) {
                if (item.days > value) {
                    filteredItems.push(item);
                }
            });
            return filteredItems;
        };
});