// Module declaration
angular.module('bookModule', [
  'databaseManager',
  'ui.bootstrap'
]);

// Controller definition
function BookController($scope, $rootScope, $log, AuthUserData, $state, BookActions, $uibModalInstance, bookId) {

  // GTFO when not logged
  if ( !AuthUserData.hasSession() ){
    $state.go('login');
  }

  $scope.waitBook = true;
  $scope.book     = {};

  if ( parseInt(bookId) == NaN ){
    $log.error('Book ' + bookId + ' is not a valid bookId, closing modal');
    $uibModalInstance.close();
  }
  else {
    BookActions.getBookDetail(bookId)
      .then(function(book){
        $scope.waitBook = false;
        $scope.book = book;
      });
  }

}

angular.module('bookModule')
  .controller('bookController', ['$scope', '$rootScope', '$log', 'AuthUserData', '$state', 'BookActions', '$uibModalInstance', 'bookId', BookController]);
