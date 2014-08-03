'use strict';

angular.module('tjWithNodeApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ui.router',
  //'ngRoute',
  'ui.bootstrap',
  'mediaPlayer'
])
//  .config(function ($routeProvider, $locationProvider) {
//
//    navSections.forEach(function(section) {
//        $routeProvider.when(section.url, {
//            templateUrl: section.templateUrl || ( 'app/views' + section.url + '.html' ),
//            controller: section.controller
//        });
//
//    });
//
////    $routeProvider
////        .otherwise({
////        redirectTo: '/'
////        });
//
//    $locationProvider.html5Mode(true);
//
//  });

.config(function($stateProvider, $urlRouterProvider) {
    //
    // For any unmatched url, redirect to /
    $urlRouterProvider.otherwise("/");

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