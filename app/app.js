'use strict';

// Module definition for the app, including the submodules
var libreriaDemoApp = angular.module('libreriaDemo', [
  'ngAnimate',
  'ngRoute',
  'core',
  'loginModule',
  'templates'
]);


// App main controller
controllerLibreriaDemo = function(dbManager, $log, $scope, $rootScope, $filter, AuthData){





}

// Application configuration
// TODO: capire come impostare un redirect nel caso in cui l'utente non sia autenticato
//        vedere coi cookie e/o con un token autorizzativo
configLibreriaDemo = function($stateProvider, $urlRouterProvider, $locationProvider, $logProvider){

  $logProviderd.debugEnabled(true);
  $urlRouterProvider.otherwise('/login');

  /*$stateProvider.state('neworder', {
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
  });*/

}

// DI
libreriaDemoApp
  .config(['$stateProvider', '$urlRouterProvider', '$locationProvider', '$logProvider', configLibreriaDemo])
  .controller(['dbManager', '$log', '$scope', '$rootScope', '$filter', 'AuthData', controllerLibreriaDemo]);