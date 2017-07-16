// Service
function BookActions($log, DbManager, $uibModal, $q){

  /**
  * Open a modal with the bookController in book module. The get will be done there.
  */
  this.openBookDetail = function(bookId) {
    $uibModal.open({
      animation: true,
      ariaLabelledBy: 'modal-title',
      ariaDescribedBy: 'modal-body',
      templateUrl: 'components/book/book-view.html',
      controller: 'bookController',
      size: 'lg',
      resolve: {
        bookId: function () {
          return bookId;
        }
      }
    });
  };


  /**
  * Query the DB to get the book detail, given its ID
  */
  this.getBookDetail = function(bookId){
    var defer = $q.defer();
    // get the author list based on
    DbManager.getBook(bookId)
      .then(function(result){
        // Assemble all in a book object
        var book = {};
        if (result && result.length == 1){
          book.authorName = result[0].Author.name;
          var resultBook = result[0].Book;
          for (var property in resultBook){
            book[property] = resultBook[property];
          }
        }
        defer.resolve(book);
      });
    return defer.promise;
  };


}

angular.module('bookModule').service('BookActions', BookActions);
