// Module definition
angular.module('loginModule', [
  'databaseManager',
  'ui.bootstrap',
  'libreriaDemoApp'
]);

// Module configuration
function LoginConfig($stateProvider){

  $stateProvider.state('login',{
    url: '/login',
    views: {
      'index': {
        templateUrl: 'components/login/login-view.html',
        controller: 'loginController'
      }
    }
  });
}


// Controller definition
function LoginController($scope, $rootScope, $filter, $log, AuthUserData, $state) {

  $scope.formLogin = {};
  $scope.formLogin.username = 'try';
  $scope.formLogin.password = 'me';
  $scope.alerts = [];

  // Reset the form, useful for init too
  $scope.resetForm = function(){
    $scope.formLogin = {};
    $scope.formLogin.username = '';
    $scope.formLogin.password = '';
  }

  $scope.doLogin = function(){
    $scope.waitLogin = true;
    AuthUserData.login($scope.formLogin.username, $scope.formLogin.password)
      .then(function(result){
        if (result){
          $state.go('catalog');
        }
        // Print a little friendly alert
        else {
          $scope.alerts.push( { msg: 'Credenziali errate!'} );
          $log.error('Auth failed! Code: ' + result);
        }
      });
  }

  $scope.closeAlert = function(index){
    $scope.alerts.splice(index, 1);
  }

}

angular.module('loginModule')
  .config(['$stateProvider', LoginConfig])
  .controller('loginController', ['$scope', '$rootScope','$filter','$log', 'AuthUserData', '$state', LoginController]);
