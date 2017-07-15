// Module declaration
angular.module('databaseManager', []);


// Service
function DbManager($log){

  // DB Reference
  dbReferences = {}
  dbReferences.db = undefined;
  // Table references
  dbReferences.userTable   = undefined;
  dbReferences.authorTable = undefined;
  dbReferences.bookTable   = undefined;


  /**
  * DB Creation and population. As of now this is mocked, with time get those from a
  * webservice and inject as js objects.
  */
  this.initDb = function(){
    var schemaBuilder = lf.schema.create('libreriaDemo', 1);

    // Schema declaration of the 3 tables:
    // --- User Table ----
    schemaBuilder.createTable('User')
      .addColumn('id', lf.Type.INTEGER)
      .addColumn('username', lf.Type.STRING)
      .addColumn('password', lf.Type.STRING)
      .addPrimaryKey(['id'], true) // true means its autoincremental
      .addIndex('idxUsername', ['username'], false, lf.Order.DESC);
    // --- Author Table ----
    schemaBuilder.createTable('Author')
      .addColumn('id', lf.Type.INTEGER)
      .addColumn('name', lf.Type.STRING)
      .addColumn('pseudonym', lf.Type.STRING)
      .addPrimaryKey(['id'], true); // true means its autoincremental
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
      .addForeignKey('fk_authorId',{
        local: 'authorId',
        ref: 'Author.id'
      })
      .addPrimaryKey(['isbn']);

    // ---- Connection to DB and populate the tables -------
    schemaBuilder.connect().then(function(db){

      // Add references for queries
      dbReferences.db           = db;
      dbReferences.userTable   = db.getSchema().table('User');
      dbReferences.authorTable = db.getSchema().table('Author');
      dbReferences.bookTable   = db.getSchema().table('Book');

      // --- Populate User table ----------------------------
      var populateUsers = function pupulateUsers(){
        var row1 = dbReferences.userTable.createRow({
          'id': 1,
          'username': 'try',
          'password':'me'
        });
        var row2 = dbReferences.userTable.createRow({
          'id': 2,
          'username': 'try2',
          'password':'me2'
        });
        var userRows = [row1, row2];
        return db.insertOrReplace().into(dbReferences.userTable).values(userRows).exec();
      }
      // --- Populate Author table ----------------------------
      var populateAuthors = function(){
        var row1 = dbReferences.authorTable.createRow({
          'id': 1,
          'name': 'Isaac Asimov',
          'pseudonym': 'Isaac Asimov'
        });
        var row2 = dbReferences.authorTable.createRow({
          'id': 2,
          'name': 'Robert A. Heinlein',
          'pseudonym': 'Robert A. Heinlein'
        });
        var row3 = dbReferences.authorTable.createRow({
          'id': 3,
          'name': 'Arthur C. Clarke',
          'pseudonym': 'Arthur C. Clarke'
        });
        var row4 = dbReferences.authorTable.createRow({
          'id': 4,
          'name': 'Poul Anderson',
          'pseudonym': 'Poul Anderson'
        });
        var authorRows = [ row1, row2, row3, row4];

        return db.insertOrReplace().into(dbReferences.authorTable).values(authorRows).exec();
      }
      // --- Populate Book table ----------------------------
      var populateBooks = function(){
        var row1 = dbReferences.bookTable.createRow({
          'isbn': '8804519525',
          'title': 'Io, robot',
          'description': 'A lei, un robot è solo un robot. Ma lei non ha lavorato con loro. Lei non li conosce. Loro sono degli addetti alle pulizie, i migliori che abbiamo. Quando la Terra è dominata da un padrone-macchina... quando i robot sono più umani dell\'umanità. La visione indimenticabile, agghiacciante del futuro, da parte di Isaac Asimov - disponibile finalmente nella sua prima edizione in brossura.',
          'imageUrl': 'https://images-na.ssl-images-amazon.com/images/I/41WFM04FSxL._SY344_BO1,204,203,200_.jpg',
          'editor': 'Mondadori',
          'year': 2003,
          'basePrice': 9.90,
          'authorId': 1
        });
        var row2 = dbReferences.bookTable.createRow({
          'isbn': '88-520-3675-X',
          'title': 'Le fontane del Paradiso',
          'description': 'Bellissimo',
          'imageUrl': 'http://www.bibliotecagalattica.com/romanzi/immaginiromanzi/fontane_del_paradiso.jpg',
          'editor': 'Mondadori',
          'year': 1979,
          'basePrice': 8.90,
          'authorId': 3
        });
        var row3 = dbReferences.bookTable.createRow({
          'isbn': '88-04-40304-7',
          'title': 'Abissi di acciaio',
          'description': 'Metropoli e indagini',
          'imageUrl': 'https://images-na.ssl-images-amazon.com/images/I/71LJTc5gfYL.jpg',
          'editor': 'Mondadori',
          'year': 1995,
          'basePrice': 9.90,
          'authorId': 1
        });
        var bookRows = [ row1, row2, row3 ];

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
        return queryResult[0].id;
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
  * Retrieve the book from DB given its id
  * @return a list of authors
  */
  this.getBook = function(bookId){

    var db          = dbReferences.db;
    var bookTable   = dbReferences.bookrTable;

    return db.select()
      .from(bookTable)
      .where(bookTable.id.eq(bookId))
      .exec();
  }

  /**
  * Retrieve the catalog from DB
  * @return a list of authors
  */
  this.getCatalog = function(){

    var db          = dbReferences.db;
    var authorTable = dbReferences.authorTable;
    var bookTable   = dbReferences.bookTable;

    var selectedFields = [ authorTable.id, authorTable.pseudonym, authorTable.name, bookTable.title, bookTable.year, bookTable.basePrice];

    return db.select(authorTable.id, authorTable.pseudonym, authorTable.name, bookTable.isbn, bookTable.title, bookTable.year, bookTable.basePrice, bookTable.authorId)
      .from(authorTable, bookTable)
      .where(bookTable.authorId.eq(authorTable.id))
      //.innerJoin(bookTable, authorTable.id.eq(bookTable.authorId))
      //.groupBy(authorTable.id)
      .exec();
  }


}

angular.module('databaseManager').service('DbManager', DbManager );
