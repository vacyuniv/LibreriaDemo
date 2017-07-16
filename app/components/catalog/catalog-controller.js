// Module definition
angular.module('catalogModule', [
  'databaseManager',
  'libreriaDemoApp',
  'ui.router',
  'ui.bootstrap',
  'bookModule'
]);

// Module configuration
function CatalogConfig($stateProvider){

  $stateProvider.state('catalog',{
    url: '/catalog',
    views: {
      'index': {
        templateUrl: 'components/catalog/catalog-view.html',
        controller: 'catalogController'
      }
    },
    resolve: {
      dbInit: function($rootScope){
        return $rootScope._dbInitialization;
      }
    }

  });
}

// Controller definition
function CatalogController($scope, $rootScope, $filter, $log, AuthUserData, $state, CatalogService, BookActions) {

  // GTFO when not logged
  if ( !AuthUserData.hasSession() ){
    $state.go('login');
  }

  $log.debug('On Catalog controller');
  $scope.totalAuthors = 0;
  $scope.currentPage  = 1;

  // --- Book Filter ----------------------------------------
  $scope.bookFilter = {}
  $scope.resetBookFilter = function(){
    $scope.bookFilter.title = '';
    $scope.bookFilter.year  = '';
  }

  // --- Author Filter ----------------------------------------
  $scope.authorFilter = {}
  $scope.resetAuthorFilter = function(){
    $scope.authorFilter = '';
  }


  // --- Catalog ----------------------------------------
  $scope.catalog = {
    Author : [],
    Book   : []
  };
  $scope.waitCatalog = true;

  // Retrieve the catalog from service
  $scope.getCatalogList = function(filterForm){
    var bookTitle = undefined;
    var bookYear  = undefined;
    if (filterForm){
      if (filterForm.title) { bookTitle = filterForm.title; }
      if (filterForm.year)  { bookYear = filterForm.year; }
    }
    CatalogService.getCatalog(bookTitle, bookYear)
      .then(function(catalog){
        $scope.catalog = catalog;
        $scope.totalAuthors = catalog.Author.length;
        $scope.waitCatalog = false;
      });
  };
  $scope.getCatalogList();
  $scope.booksByAuthor = function(authorId){
    return _.where($scope.catalog.Book, {'authorId': authorId});
  };

  // --- Expand/collapse utilities --------------------------------------------------------
  $scope.authorBooksExpanded = [];
  $scope.showAuthorBooks = function(author){
    $scope.authorBooksExpanded[author.id] = !$scope.authorBooksExpanded[author.id];
  }

  // --- Sorting utilities ----------------------------------------------------------------
  $scope.authorSortField        = 'name';
  $scope.authorSortFieldReverse = {
    'name'     : undefined,
    'pseudonym': undefined,
    'id'       : undefined
  };
  $scope.bookSortField        = {};
  $scope.bookSortFieldReverse = {};
  $scope.setAuthorOrderBy = function(fieldToSort){
    $scope.authorSortField = fieldToSort;
    for (var property in $scope.authorSortFieldReverse){
      if (property == fieldToSort){
        $scope.authorSortFieldReverse[property] = !$scope.authorSortFieldReverse[property];
      } else {
        $scope.authorSortFieldReverse[property] = undefined;
      }
    }
  }
  $scope.setBookOrderBy = function(authorId, fieldToSort){
    $scope.bookSortField[authorId] = fieldToSort;
    var keyToReverse = authorId + '-' + fieldToSort;
    // init when not defined
    if ($scope.bookSortFieldReverse[keyToReverse] == undefined) {
      $scope.bookSortFieldReverse[keyToReverse] = false;
    }
    for (var property in $scope.bookSortFieldReverse) {
      // reset only those of the same author
      var propAuthorId = ''+ property.split("-")[0];
      if (propAuthorId ==  ''+authorId) {
        if (property == keyToReverse) {
          $scope.bookSortFieldReverse[property] = !$scope.bookSortFieldReverse[property]
        } else {
          $scope.bookSortFieldReverse[property] = undefined;
        }
      }
    }
    // if ($scope.bookSortFieldReverse[keyToReverse] == undefined){
    //   $scope.bookSortFieldReverse[keyToReverse] = false;
    // } else {
    //   $scope.bookSortFieldReverse[keyToReverse] = !$scope.bookSortFieldReverse[keyToReverse];
    // }
  }

  // --- Book detail open ----------------------------------------
  $scope.showBookDetail = function(book) {
    BookActions.openBookDetail(book.isbn);
  }

}


angular.module('catalogModule')
  .config(['$stateProvider', CatalogConfig])
  .controller('catalogController', ['$scope', '$rootScope', '$filter', '$log', 'AuthUserData', '$state', 'CatalogService', 'BookActions', CatalogController]);
