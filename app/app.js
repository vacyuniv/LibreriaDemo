// Module definition for the app, including the submodules
angular.module('libreriaDemoApp', [
  'ngAnimate',
  'ngRoute',
  'ngCookies',
  'ui.router',
  'ui.bootstrap',
  'loginModule',
  'templates',
  'databaseManager',
  'catalogModule',
  'bookModule'
]);


// --- App main controller ----------------------
function controllerLibreriaDemo(DbManager, $log, $scope, $rootScope, $filter, AuthUserData, $state){

  $scope.waitInit = true;

  // Wait for the db initialization, see runLibreriaDemo function.
  $rootScope._dbInitialization
    .then(function(resolve){
      $scope.waitInit = false;
      if ( !AuthUserData.hasSession() ){
        $state.go('login');
      } else {
        $state.go('catalog');
      }
    });

  $scope.doLogout = function(){
    AuthUserData.logout()
      .then(function(resolve){
        $log.info('User successfully logged out. Returning to login page.');
        $state.go('login');
      });
  }
}

// --- Application configuration ----------------
function configLibreriaDemo($stateProvider, $urlRouterProvider, $locationProvider, $logProvider){

  $logProvider.debugEnabled(true);
  $urlRouterProvider.otherwise('/login');

}

function runLibreriaDemo($log, DbManager, $rootScope, $q){

  // Create the promise for DB init
  var bootstrappingPromise = $q.defer();
  $rootScope._dbInitialization = bootstrappingPromise.promise;
  // Then init and resolve the promise
  DbManager.initDb()
    .then(function(resolve){
      $log.info('DB initializated!');
      bootstrappingPromise.resolve(true);
    });
  // Handler for possible errors on stateChange
  $rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error) {
    $state.go('login');
  });
}

angular.module('libreriaDemoApp')
  .config(['$stateProvider', '$urlRouterProvider', '$locationProvider', '$logProvider', configLibreriaDemo])
  .run(['$log', 'DbManager', '$rootScope', '$q', runLibreriaDemo])
  .controller('controllerLibreriaDemo',['DbManager', '$log', '$scope', '$rootScope', '$filter', 'AuthUserData', '$state', controllerLibreriaDemo]);
