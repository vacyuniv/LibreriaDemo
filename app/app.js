'use strict';

// Module definition for the app, including the submodules
var libreriaDemoApp = angular.module('libreriaDemo', [
  'ngAnimate',
  'ngRoute',
  'core',
  'loginModule',
  'templates'
]);



controllerLibreriaDemo = function(dbManager, $log, $scope, $rootScope, $filter, AuthData){





}

// Application configuration
configLibreriaDemo = function($stateProvider, $urlRouterProvider, $locationProvider, $logProvider){

  $logProviderd.debugEnabled(true);
  $urlRouterProvider.otherwise('/login');

  $stateProvider.state('neworder', {
    abstract: true,
    url: '/neworder',
    params: {
      slide: {},
      order: {}
    },
    views: {
      'index': {
        templateUrl: 'components/neworder/neworder.html',
        controller: 'newOrderDataController'
      }
    },
    data: {
      ncyBreadcrumbLabel: "{{ 'index.NEW_ORDER' | translate }}"
    }
  });

}

// DI
libreriaDemoApp
  .config(['$stateProvider', '$urlRouterProvider', '$locationProvider', '$logProvider', configLibreriaDemo])
  .controller(['dbManager', '$log', '$scope', '$rootScope', '$filter', 'AuthData', controllerLibreriaDemo]);