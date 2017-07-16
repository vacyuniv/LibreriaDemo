// --- Module definition for the app -----------------------
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
function controllerLibreriaDemo(DbManager, $log, $scope, $rootScope, AuthUserData, $state){
  // Expose state for view
  $scope.$state = $state;

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

  // Handle the logout from everywhere
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

// --- Application runtime initialization ----------------
function runLibreriaDemo($log, DbManager, $rootScope, $q){
  // Hide all until fully initialized
  $rootScope.waitInit = true;
  // Create the promise for DB init
  var bootstrappingPromise = $q.defer();
  $rootScope._dbInitialization = bootstrappingPromise.promise;
  // Then init and resolve the promise
  DbManager.initDb()
    .then(function(resolve){
      $log.info('DB initializated!');
      bootstrappingPromise.resolve(true);
      // Show the app to the world
      $rootScope.waitInit = false;
      angular.element('#appContent').show();
    });
  // Handler for possible errors on stateChange
  $rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error) {
    $state.go('login');
  });
}

angular.module('libreriaDemoApp')
  .config(['$stateProvider', '$urlRouterProvider', '$locationProvider', '$logProvider', configLibreriaDemo])
  .run(['$log', 'DbManager', '$rootScope', '$q', runLibreriaDemo])
  .controller('controllerLibreriaDemo',['DbManager', '$log', '$scope', '$rootScope', 'AuthUserData', '$state', controllerLibreriaDemo]);
