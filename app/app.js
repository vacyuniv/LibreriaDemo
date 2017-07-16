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
  $log.debug('On Main Controller');
  $scope.waitInit = true;
  $rootScope._dbInitialization
    .then(function(resolve){
      $log.debug('Now going to the correct state');
      $scope.waitInit = false;
      if ( !AuthUserData.hasSession() ){
        $state.go('login');
      } else {
        $state.go('catalog');
      }
    });
}

// Application configuration
// TODO: capire come impostare un redirect nel caso in cui l'utente non sia autenticato
//        vedere coi cookie e/o con un token autorizzativo
function configLibreriaDemo($stateProvider, $urlRouterProvider, $locationProvider, $logProvider){

  $logProvider.debugEnabled(true);
  $urlRouterProvider.otherwise('/login');

}

function runLibreriaDemo($log, DbManager, $rootScope, $q){
  $log.debug('Running phase');
  var bootstrappingPromise = $q.defer();
  $rootScope._dbInitialization = bootstrappingPromise.promise;
  $rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error) {
    $state.go('login');
  });
  DbManager.initDb()
    .then(function(resolve){
      $log.debug('DB initializated!');
      bootstrappingPromise.resolve(true);
    });
}

// DI
angular.module('libreriaDemoApp')
  .config(['$stateProvider', '$urlRouterProvider', '$locationProvider', '$logProvider', configLibreriaDemo])
  .run(['$log', 'DbManager', '$rootScope', '$q', runLibreriaDemo])
  .controller('controllerLibreriaDemo',['DbManager', '$log', '$scope', '$rootScope', '$filter', 'AuthUserData', '$state', controllerLibreriaDemo]);
