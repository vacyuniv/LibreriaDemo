// Module definition for the app, including the submodules
angular.module('libreriaDemoApp', [
  'ngAnimate',
  'ngRoute',
  'ui.router',
  'loginModule',
  'templates',
  'databaseManager'
]);


// App main controller
function controllerLibreriaDemo(dbManager, $log, $scope, $rootScope, $filter, authUserData){

  $scope.title = "pippo";



}

// Application configuration
// TODO: capire come impostare un redirect nel caso in cui l'utente non sia autenticato
//        vedere coi cookie e/o con un token autorizzativo
function configLibreriaDemo($stateProvider, $urlRouterProvider, $locationProvider, $logProvider){

  $logProvider.debugEnabled(true);
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

function runLibreriaDemo(DbManager){
  DbManager.initDb();
}

// DI
angular.module('libreriaDemoApp')
  .config(['$stateProvider', '$urlRouterProvider', '$locationProvider', '$logProvider', configLibreriaDemo])
  .run(['DbManager', runLibreriaDemo])
  .controller(['dbManager', '$log', '$scope', '$rootScope', '$filter', 'authUserData', controllerLibreriaDemo]);
