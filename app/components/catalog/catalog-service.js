// Factory definition
function CatalogService($log, $q, DbManager){

  /**
  * Get a list of authors, containing each one their books.
  */
  this.getCatalog = function(){
    var defer = $q.defer();
    // get the author list based on
    DbManager.getCatalog()
      .then(function(result){
        // Aggregate the fields so that i have an object with 2 lists, Author and Book
        console.log(result);
        var _result = {
          'Author': [],
          'Book'  : []
        };
        // Build a map of the records found in _result object, to get distinc objects by their id
        var i = 0;
        var n = result.length;
        for (i = 0; i < n; i++){
          var item = result[i];
          if (item.hasOwnProperty('Author')){
            _result.Author[item.Author.id] = item.Author;
          };
          if (item.hasOwnProperty('Book')){
            _result.Book[item.Book.isbn] = item.Book;
          };
        }
        // Now convert maps to array so i can iterate better over
        var _resultAuthor = [];
        for (key in _result.Author){
          _resultAuthor.push(_result.Author[key]);
        }
        var _resultBook = [];
        for (key in _result.Book){
          _resultBook.push(_result.Book[key]);
        }

        defer.resolve( {Author: _resultAuthor, Book: _resultBook} );
      });
      return defer.promise;
  }

}

angular.module('catalogModule').service('CatalogService', CatalogService);
