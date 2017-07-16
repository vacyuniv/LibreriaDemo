// Module declaration
angular.module('databaseManager', []);

// --- DataBase Service -------------------------
function DbManager($log, MOCK_DB){

  // DB Reference
  dbReferences = {}
  dbReferences.db          = undefined;
  // Table references
  dbReferences.userTable   = undefined;
  dbReferences.authorTable = undefined;
  dbReferences.bookTable   = undefined;

  /**
  * DB Creation and population. As of now this is mocked, with time get those from a
  * webservice and inject as json/js objects.
  */
  this.initDb = function(){
    console.log('Initializing schema for DB');
    var schemaBuilder = lf.schema.create('libreriaDemo', 1);

    // Schema declaration of the 3 tables: load from YAML file generated from backend on real apps
    // --- User Table ----
    schemaBuilder.createTable('User')
      .addColumn('id', lf.Type.INTEGER)
      .addColumn('username', lf.Type.STRING)
      .addColumn('password', lf.Type.STRING)
      .addPrimaryKey(['id'], true) // true means its autoincremental, not really used though
      .addIndex('idxUsername', ['username'], false, lf.Order.DESC);
    // --- Author Table ----
    schemaBuilder.createTable('Author')
      .addColumn('id', lf.Type.INTEGER)
      .addColumn('name', lf.Type.STRING)
      .addColumn('pseudonym', lf.Type.STRING)
      .addPrimaryKey(['id'], true); // true means its autoincremental, not really used though
    // --- Book Table ----
    schemaBuilder.createTable('Book')
      .addColumn('isbn', lf.Type.STRING)
      .addColumn('title', lf.Type.STRING)
      .addColumn('description', lf.Type.STRING)
      .addColumn('imageUrl', lf.Type.STRING)
      .addColumn('editor', lf.Type.STRING)
      .addColumn('year', lf.Type.INTEGER)
      .addColumn('authorId', lf.Type.INTEGER)
      .addColumn('basePrice', lf.Type.NUMBER)
      .addColumn('baseDiscount', lf.Type.NUMBER)
      .addForeignKey('fk_authorId',{
        local: 'authorId',
        ref: 'Author.id'
      })
      .addPrimaryKey(['isbn']);

    // ---- Connect to DB and populate the tables -------
    return schemaBuilder.connect().then(function(db){

      console.log('Populating DB');

      // Add references for queries
      dbReferences.db          = db;
      dbReferences.userTable   = db.getSchema().table('User');
      dbReferences.authorTable = db.getSchema().table('Author');
      dbReferences.bookTable   = db.getSchema().table('Book');

      // --- Populate User table ----------------------------
      var populateUsers = function pupulateUsers(){
        var userRows = [];
        var n = MOCK_DB.USER_TABLE.length;
        for (var i = 0; i < n; i++){
          userRows.push(dbReferences.userTable.createRow(MOCK_DB.USER_TABLE[i]));
        }
        return db.insertOrReplace().into(dbReferences.userTable).values(userRows).exec();
      }
      // --- Populate Author table ----------------------------
      var populateAuthors = function(){
        var authorRows = [];
        var n = MOCK_DB.AUTHOR_TABLE.length;
        for (var i = 0; i < n; i++){
          authorRows.push(dbReferences.authorTable.createRow(MOCK_DB.AUTHOR_TABLE[i]));
        }
        return db.insertOrReplace().into(dbReferences.authorTable).values(authorRows).exec();
      }
      // --- Populate Book table ----------------------------
      var populateBooks = function(){
        var bookRows = []
        var n = MOCK_DB.BOOK_TABLE.length;
        for (var i = 0; i < n; i++){
          bookRows.push(dbReferences.bookTable.createRow(MOCK_DB.BOOK_TABLE[i]));
        }
        return db.insertOrReplace().into(dbReferences.bookTable).values(bookRows).exec();
      }
      //var populateBooks = new Promise();
      var populateDB = [populateUsers() , populateAuthors() , populateBooks()];

      return Promise.all(populateDB);
    });
  }


  /**
  * Query the DB to find the username with corresponding password.
  * @return {username.id} or {false}
  */
  this.authenticate = function(username, password){

    var resultHandler = function(queryResult){
      if (queryResult && queryResult.length == 1) {
        return queryResult[0];
      }
      return false;
    }

    var db        = dbReferences.db;
    var userTable = dbReferences.userTable;

    return db.select()
      .from(userTable)
      .where(lf.op.and(
        userTable.username.eq(username),
        userTable.password.eq(password))
      )
      .exec()
      .then(resultHandler);
  }

  /**
  * Retrieve the book from DB given its id.
  * @return the book with its author for further manipolation.
  */
  this.getBook = function(bookId){
    var db          = dbReferences.db;
    var bookTable   = dbReferences.bookTable;
    var authorTable = dbReferences.authorTable;

    return db.select()
      .from(bookTable, authorTable)
      .where( lf.op.and(
          authorTable.id.eq(bookTable.authorId),
          bookTable.isbn.eq(bookId)
        )
      )
      .exec();
  }

  /**
  * Retrieve the catalog from DB
  * @return a list of records of both Author and Book joined, filtered by specified fields.
  */
  this.getCatalog = function(bookTitle, bookYear, authorName){

    var db          = dbReferences.db;
    var authorTable = dbReferences.authorTable;
    var bookTable   = dbReferences.bookTable;

    // Add wildcards when not given the records
    if (!bookTitle) {
      bookTitle = new RegExp('.*');
    } else {
      bookTitle = new RegExp(bookTitle, 'gi');
    }
    var bookYearFrom = bookYear;
    var bookYearTo   = 9999;
    if (!bookYearFrom || parseInt(bookYearFrom) == NaN){
      bookYearFrom = 1870;
    } else {
      bookYearTo = bookYearFrom;
    }
    if(!authorName){
      authorName = new RegExp('.*');
    } else {
      authorName = new RegExp(authorName, 'gi');
    }

    return db.select(authorTable.id, authorTable.pseudonym, authorTable.name, bookTable.isbn, bookTable.title,
      bookTable.year, bookTable.basePrice, bookTable.authorId, bookTable.baseDiscount)
      .from(authorTable, bookTable)
      .where( lf.op.and(
          bookTable.authorId.eq(authorTable.id),
          authorTable.name.match(authorName),
          bookTable.title.match(bookTitle),
          bookTable.year.gte(bookYearFrom),
          bookTable.year.lte(bookYearTo)
        )
      )
      .exec();
  }

}

angular.module('databaseManager').service('DbManager', DbManager );
