'use strict';

var navSections = [
  { title: 'Admin',        state: 'main.home',         url: '/admin',  controller: 'AdminCtrl' , templateUrl: 'app/views/admin.html'}
];
var navSectionPrimaryContent = navSections[0];   // Admin

angular.module('tjWithNodeApp')
    .controller('MainCtrl', function ($scope, $rootScope, $http, $interval, $location, amDateFormatFilter) {

        /* ADMIN */
        $scope.isAdmin = true;
        $scope.showAdminPanel = false;

        /* NAVIGATION */
        $scope.navSections = navSections;
        $scope.navSectionPrimaryContent = navSectionPrimaryContent;
        $rootScope.$on("$locationChangeStart", function(event, next, current) {
            $scope.path = next;
        });
        $scope.isActive = function (viewLocation) {
            return ('/main' + viewLocation) === $location.path();
        };

        $scope.showMobileMenu = false;
        $scope.toggleMobileMenu = function() {
          $scope.showMobileMenu = !$scope.showMobileMenu;
        }
        $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams){
          $scope.showMobileMenu = false;
        });

        /* EVENTS */
        // Get static JSON
        $http.get('api/admin/upcomingEvents', $scope.message, {timeout: 5000})
            .success(function(response) {
                var allEvents = response;
                allEvents = allEvents || [];
                $scope.upcomingEventsJson = allEvents;

            })
            .error(function(response) {
                console.log("Error", response);
                $scope.upcomingEvents = {};
            });


        $scope.$watch('upcomingEventsJson', function(newValue) {

          if (!newValue) return;
          console.log('Setting stuff now');
          $scope.upcomingEvents = _.filter(newValue, function(event) {

            // Exclude if end date is before today
            if (moment(event.endDate).isBefore(moment(), 'day')) {
              return false

            } else {
              // Set timeFromNow
              if (moment(event.endDate).isSame(moment(), 'day')) {
                event.timeFromNow = "Last show today"

              } else if (moment(event.startDate).isSame(moment(), 'day')) {
                event.timeFromNow = "Starts today"

              } else if (moment(event.startDate).isBefore(moment(), 'day')) {
                event.timeFromNow = "Ends " + getDaysFromNowDisplay(event.endDate);

              } else {
                event.timeFromNow = "Starts " + getDaysFromNowDisplay(event.startDate);
              }

              // Set dateStr
              if (moment(event.endDate).isSame(moment(event.startDate), 'day')) {
                event.dateStr = amDateFormatFilter(moment(event.startDate), 'ddd, DD MMM');
              } else {
                event.dateStr = amDateFormatFilter(moment(event.startDate), 'ddd, DD MMM') + ' to ' + amDateFormatFilter(moment(event.endDate), 'ddd, DD MMM');
              }

              // Sanitise link (if link is defined and contains at least one dot
              if ( event.link && event.link.indexOf('.') > -1  && event.link.indexOf('://') < 0 ) {
                event.link = 'http://' + event.link;
              }

              return true;
            }

            function getDaysFromNowDisplay(date) {
              // Before now
              if (moment(date).isBefore(moment(), 'day')) {
                return moment(date).fromNow();
                // Today
              } else if (moment(date).isSame(moment(), 'day')) {
                return "today";
                // Tomorrow
              } else if (moment(date).isSame(moment().add(1, 'days'), 'day')) {
                return "tomorrow";
              } else {
                return moment(date).add(1, 'days').fromNow();   // Need to add one day, otherwise moment sees a date two days from now as 1 day from now
              }
            }

          });

        }, true);

    })

    .controller('AdminCtrl', function($scope, $rootScope, $interval, $location, $http, amDateFormatFilter) {

      $scope.adminGridSelections = [];
      $scope.adminGridOptions = {
        data: 'upcomingEventsJson',
        enableRowSelection: true,
        multiSelect: false,
        enableCellSelection: false,
        enableCellEditOnFocus: true,
        columnDefs: [
          {field: 'name', displayName: 'Name', enableCellEdit: true},
          {field: 'location', displayName: 'Location', enableCellEdit: true},
          {field: 'startDate', displayName: 'Start date (YYYY-MM-DD)', enableCellEdit: true},
          {field: 'endDate', displayName: 'End date (YYYY-MM-DD)', enableCellEdit: true},
          {field: 'link', displayName: 'Link', enableCellEdit: true}
        ],
        selectedItems: $scope.adminGridSelections

      };

      $scope.addEvent = function() {
        $scope.upcomingEventsJson.push({
          name: "New event",
          location: "New location",
          startDate:  amDateFormatFilter(moment(), 'YYYY-MM-DD'),
          endDate:    amDateFormatFilter(moment(), 'YYYY-MM-DD')
        });
      };

      $scope.removeEvent = function(event) {
        $scope.upcomingEventsJson.splice(_.findIndex($scope.upcomingEventsJson, event), 1);
      };

      $scope.pushEventsToLive = function() {

        $http.post('/api/admin/upcomingEvents', $scope.upcomingEventsJson, {timeout: 5000})
          .success(function() {
            $scope.success = true;
            $scope.message = {};
          })
          .error(function(response) {
            console.log("Error", response);
            $scope.error = response;
          })
      };

    })

    .directive('upcomingEvent', function() {
      return {
        restrict:'E',
        scope: {
          event: '='
        },
        template: '<div class="event-item-title">{{event.name}}</div><div class="event-item-location">{{event.location}}</div><div class="event-item-date">{{event.dateStr}}</div><div class="event-item-timeago">{{event.timeFromNow}}</div>'
      };
    })
