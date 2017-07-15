// Factory definition
function AuthUserData($log, $q, DbManager, $cookies){

  /*var username = undefined;
  var password = undefined;
  var userId   = undefined;*/

  return {

    isLogged : false,

    logout : function(){
      this.userId = undefined;
      this.username = undefined;
      this.password = undefined;
      isLogged = false;
      return true;
    },


    /** Authenticate the user, simply checking on the db with dbServie
    * Futher manage the resolved promise, telling this service's caller only true/false.
    *   TODO: capire se ha senso mettere il salvataggio nella factory solo prima o solo dopo l'autenticazione.
    */
    login : function(username, password){
      this.username = username;
      this.password = password;

      // Check data in DB with lovefield service
      return DbManager.authenticate(this.username, this.password)
        .then(function(resolve){
          isLogged = true;
          $cookies.putObject('libreriaDemoAppUserSession', {username: this.username});
          // manage the correctness and return a result
          return resolve;
        });
    },

    hasSession : function(){
      var cookieObject = $cookies.getObject('libreriaDemoAppUserSession');
      if (cookieObject && cookieObject.username){
        isLogged = true;
        this.username = cookieObject.username;
        return true;
      }
      return false;
    }

  };

}

angular.module('loginModule').factory('AuthUserData', [ '$log', '$q', 'DbManager', '$cookies' , AuthUserData]);
