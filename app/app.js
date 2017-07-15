// Module definition for the app, including the submodules
angular.module('libreriaDemoApp', [
  'ngAnimate',
  'ngRoute',
  'ui.router',
  'loginModule',
  'templates',
  'databaseManager',
  'catalogModule'
]);


// App main controller
function controllerLibreriaDemo(DbManager, $log, $scope, $rootScope, $filter, AuthUserData, $state){

  $scope.title = "pippo";
  if (!AuthUserData.isLogged){
    $state.go('login');
  }
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

function runLibreriaDemo($log, DbManager){
  $log.debug('Running phase');
  DbManager.initDb();
}

// DI
angular.module('libreriaDemoApp')
  .config(['$stateProvider', '$urlRouterProvider', '$locationProvider', '$logProvider', configLibreriaDemo])
  .run(['$log', 'DbManager', runLibreriaDemo])
  .controller('controllerLibreriaDemo',['DbManager', '$log', '$scope', '$rootScope', '$filter', 'AuthUserData', '$state', controllerLibreriaDemo]);
