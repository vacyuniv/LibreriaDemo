// Factory definition
function AuthUserData($log, $q, DbManager, $cookies){

  /*var username = undefined;
  var password = undefined;
  var userId   = undefined;*/

  return {

    userData: {
      isLogged : false,
      username : '',
      userId   : ''
    },


    logout : function(){
      /*userData.userId = undefined;
      userData.username = undefined;
      userData.password = undefined;
      userData.isLogged = false;*/
      $cookies.remove('libreriaDemoAppUserSession');
      return true;
    },


    /** Authenticate the user, simply checking on the db with dbServie
    * Futher manage the resolved promise, telling this service's caller only true/false.
    *   TODO: capire se ha senso mettere il salvataggio nella factory solo prima o solo dopo l'autenticazione.
    */
    login : function(username, password){

      // Check data in DB with lovefield service
      return DbManager.authenticate(username, password)
        .then(function(resolve){
          /*userData.isLogged = true;
          userData.username = resolve.username;
          userData.userId   = resolve.id;*/
          $cookies.putObject('libreriaDemoAppUserSession', resolve);
          // manage the correctness and return a result
          return resolve;
        });
    },

    hasSession : function(){
      var cookieObject = $cookies.getObject('libreriaDemoAppUserSession');
      if (cookieObject && cookieObject.username){
        /*userData.isLogged = true;
        userData.username = cookieObject.username;
        userData.userId   = cookieObject.id;*/
        return true;
      }
      return false;
    }

  };

}

angular.module('loginModule').factory('AuthUserData', [ '$log', '$q', 'DbManager', '$cookies' , AuthUserData]);
