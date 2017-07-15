// Module definition for the app, including the submodules
angular.module('libreriaDemoApp', [
  'ngAnimate',
  'ngRoute',
  'ngCookies',
  'ui.router',
  'loginModule',
  'templates',
  'databaseManager',
  'catalogModule'
]);


// App main controller
function controllerLibreriaDemo(DbManager, $log, $scope, $rootScope, $filter, AuthUserData, $state){

  if ( !AuthUserData.hasSession() ){
    $state.go('login');
  }
}

// Application configuration
// TODO: capire come impostare un redirect nel caso in cui l'utente non sia autenticato
//        vedere coi cookie e/o con un token autorizzativo
function configLibreriaDemo($stateProvider, $urlRouterProvider, $locationProvider, $logProvider){

  $logProvider.debugEnabled(true);
  $urlRouterProvider.otherwise('/login');

}

function runLibreriaDemo($log, DbManager, AuthUserData){
  $log.debug('Running phase');
  DbManager.initDb();
}

// DI
angular.module('libreriaDemoApp')
  .config(['$stateProvider', '$urlRouterProvider', '$locationProvider', '$logProvider', configLibreriaDemo])
  .run(['$log', 'DbManager', 'AuthUserData', runLibreriaDemo])
  .controller('controllerLibreriaDemo',['DbManager', '$log', '$scope', '$rootScope', '$filter', 'AuthUserData', '$state', controllerLibreriaDemo]);
