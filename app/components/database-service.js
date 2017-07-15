// Module declaration
angular.module('databaseManager', []);


// Service
function DbManager($log, $filter){

  // DB Reference
  dbReferences = {}
  dbReferences.db = undefined;
  // Table references
  dbReferences.userTable_   = undefined;
  dbReferences.authorTable_ = undefined;
  dbReferences.bookTable_   = undefined;


  // DB Creation
  this.initDb = function(){
    var schemaBuilder = lf.schema.create('libreriaDemo', 1);

    // Schema declaration of the 3 tables
    schemaBuilder.createTable('User')
      .addColumn('id', lf.Type.INTEGER)
      .addColumn('username', lf.Type.STRING)
      .addColumn('password', lf.Type.STRING)
      .addPrimaryKey(['id'], true) // true means its autoincremental
      .addIndex('idxUsername', ['username'], false, lf.Order.DESC);

    // Schema declaration of the 3 tables
    schemaBuilder.createTable('Author')
      .addColumn('id', lf.Type.INTEGER)
      .addColumn('name', lf.Type.STRING)
      .addColumn('pseudonym', lf.Type.STRING)
      .addPrimaryKey(['id'], true); // true means its autoincremental

    // Schema declaration of the 3 tables
    schemaBuilder.createTable('Book')
      .addColumn('isbn', lf.Type.STRING)
      .addColumn('title', lf.Type.STRING)
      .addColumn('description', lf.Type.STRING)
      .addColumn('imageUrl', lf.Type.STRING)
      .addColumn('authorId', lf.Type.INTEGER)
      .addColumn('basePrice', lf.Type.NUMBER)
      .addForeignKey('fk_authorId',{
        local: 'authorId',
        ref: 'Author.id'
      })
      .addPrimaryKey(['isbn']);

    schemaBuilder.connect().then(function(db){

      // Add references
      dbReferences.db           = db;
      dbReferences.userTable_   = db.getSchema().table('User');
      dbReferences.authorTable_ = db.getSchema().table('Author');
      dbReferences.bookTable_   = db.getSchema().table('Book');

      var row1 = dbReferences.userTable_.createRow({
        'id': 1,
        'username': 'try',
        'password':'me'
      });
      var row2 = dbReferences.userTable_.createRow({
        'username': 'try2',
        'password':'me2'
      });
      var userRows = [row1, row2];

      return db.insertOrReplace().into(dbReferences.userTable_).values(userRows).exec();
    });
  }

  this.authenticate = function(username, password){

    var resultHandler = function(queryResult){
      if (queryResult && queryResult.length == 1) {
        return queryResult[0].id;
      }
      return false;
    }

    var userTable = dbReferences.userTable_;
    var db = dbReferences.db;

    return db.select()
      .from(userTable)
      .where(lf.op.and(
        userTable.username.eq(username),
        userTable.password.eq(password))
      )
      .exec()
      .then(resultHandler);

  }



}

angular.module('databaseManager').service('DbManager', DbManager );
