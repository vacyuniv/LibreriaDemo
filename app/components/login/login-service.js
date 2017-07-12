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

    login : function(username, password){
      this.username = username;
      this.password = password;

      // Check data in DB with lovefield service

    }

  };

}

loginModule.factory('AuthData', [ '$log', '$q', 'dbService', AuthData]);
