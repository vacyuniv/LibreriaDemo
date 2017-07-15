// Module definition
angular.module('catalogModule', [
  'databaseManager'
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
    }
  });
}

// Controller definition
function CatalogController($scope, $rootScope, $filter, $log, AuthUserData, $state, CatalogService) {

  // GTFO when not logged
  if ( !AuthUserData.hasSession() ){
    $state.go('login');
  }

  $scope.totalAuthors = 0;
  $scope.currentPage  = 1;

  // --- Book Filter ----------------------------------------
  $scope.bookFilter = {}
  $scope.resetBookFilter = function(){
    $scope.bookFilter.title = '';
    $scope.bookFilter.year  = '';
  }

  $scope.bookFilterApply = function(){

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
  $scope.authorSortFieldReverse = [];
  $scope.bookSortField        = [];
  $scope.bookSortFieldReverse = [];
  $scope.setAuthorOrderBy = function(fieldToSort){
    $scope.authorSortField = fieldToSort;
    if ($scope.authorSortFieldReverse[fieldToSort] == undefined) {
      $scope.authorSortFieldReverse[fieldToSort] = false;
    } else {
      $scope.authorSortFieldReverse[fieldToSort] = !$scope.authorSortFieldReverse[fieldToSort];
    }
  }
  $scope.setBookOrderBy = function(authorId, fieldToSort){
    $scope.bookSortField[authorId] = fieldToSort;
    var keyToReverse = '' + authorId + fieldToSort;
    if ($scope.bookSortFieldReverse[keyToReverse] == undefined){
      $scope.bookSortFieldReverse[keyToReverse] = false;
    } else {
      $scope.bookSortFieldReverse[keyToReverse] = !$scope.bookSortFieldReverse[keyToReverse];
    }
  }
}


angular.module('catalogModule')
  .config(['$stateProvider', CatalogConfig])
  .controller('catalogController', ['$scope', '$rootScope', '$filter', '$log', 'AuthUserData', '$state', 'CatalogService', CatalogController]);
