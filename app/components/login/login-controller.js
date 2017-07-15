// Module definition
angular.module('loginModule', [
  'databaseManager'
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

  // Reset the form, used for init too
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
        // Print growl error - manage those tooo
        else {
          $log.error('Auth failed! Code: ' + result);
        }
      });
  }

}

angular.module('loginModule')
  .config(['$stateProvider', LoginConfig])
  .controller('loginController', ['$scope', '$rootScope','$filter','$log', 'AuthUserData', '$state', LoginController]);
