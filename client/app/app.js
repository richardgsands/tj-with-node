'use strict';

angular.module('tjWithNodeApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ui.router',
  //'ngRoute',
  'ui.bootstrap',
  'mediaPlayer',
  'angularMoment'
])

.config(function($stateProvider, $urlRouterProvider, $locationProvider) {

    // For any unmatched url, redirect to /
    $urlRouterProvider.otherwise("/main/");

    $locationProvider
        .html5Mode(true)
        .hashPrefix('!');

    $stateProvider.state('main', {
        url: "/main",
        templateUrl: "app/main/main.html",
        controller: 'MainCtrl'
    });

    // Now set up the states
    navSections.forEach(function(section) {

        $stateProvider.state(section.state, {
            url: section.url,
            templateUrl: section.templateUrl || ( 'app/views' + section.url + '.html' ),
            controller: section.controller
        });

    });


});