// Factory definition
function AuthData($log, $q, dbService){

  var username = undefined;
  var password = undefined;
  var userId   = undefined;

  return {

    logout : function(){
      this.userId = undefined;
      this.username = undefined;
      this.password = undefined;
      return true;
    }


    /** Authenticate the user, simply checking on the db with dbServie
    * Futher manage the resolved promise, telling this service's caller only true/false.
    *   TODO: capire se ha senso mettere il salvataggio nella factory solo prima o solo dopo l'autenticazione.
    */
    login : function(username, password){
      this.username = username;
      this.password = password;

      // Check data in DB with lovefield service
      return dbService.authenticate(this.username, this.password)
        .then(function(resolve){
          // manage the correctness and return a result
          return resolve;
        });
    }

  };

}

loginModule.factory('AuthData', [ '$log', '$q', 'dbService', AuthData]);
