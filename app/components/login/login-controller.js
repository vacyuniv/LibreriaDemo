// Module definition
var loginModule = angular.module('loginModule', []);

// Module configuration
function LoginConfig($stateProvider){

  $stateProvider.state('login',{
    url: '/login',
    views: {
      'index': {
        templateUrl: 'login.view.html',
        controller: 'loginController'
      }
    }
  });

}


// Controller definition
function LoginController($scope, $rootScope, $filter, $log, AuthData, $state) {

  $scope.formLogin = {};

  // Reset the form, used for init too
  $scope.resetForm = function(){
    $scope.formLogin = {};
    $scope.formLogin.username = '';
    $scope.formLogin.password = '';
  }

  $scope.doLogin = function(){
    $scope.waitLogin = true;
    AuthData.login($scope.formLogin.username, $scope.formLogin.password)
      .then(function(result){
        if (result){
          $state.go('');
        }
        // Print growl error - manage those tooo
        else {
          $log.error('Auth failed! Code: ' + result);
        }
      });
  }

}

loginModule
  .config(['$stateProvider', LoginConfig])
  .controller('loginController', ['$scope', '$rootScope', 'AuthData', '$state', LoginController]);
