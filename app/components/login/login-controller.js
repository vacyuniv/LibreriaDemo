// Module definition
var loginModule = angular.module('loginModule', []);


// Controller definition
function LoginController($scope, $rootScope, $filter, $log, AuthData) {

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

      });


  }

}

loginModule.controller('LoginController', ['$scope', '$rootScope', 'AuthData', LoginController]);
