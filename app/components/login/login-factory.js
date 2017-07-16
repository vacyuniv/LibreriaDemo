// Factory definition
function AuthUserData($log, $q, DbManager, $cookies){

  return {

    /**
    * With a real case scenario, call a webservice to logout and handle the response, then remove the sessionCookie/localStorage.
    * Here we have just a mocked promise.
    */
    logout : function(){
      var defer = $q.defer();
      $cookies.remove('libreriaDemoAppUserSession');
      defer.resolve(true);
      return defer.promise;
    },

    /** Authenticate the user, simply checking on the db with dbServie.
    * In a real case scenario, just call the webservice to log and store the sessionCookie/localStorage instead of this.
    */
    login : function(username, password){
      // Check data in DB with lovefield service
      return DbManager.authenticate(username, password)
        .then(function(resolve){
          $cookies.putObject('libreriaDemoAppUserSession', resolve);
          return resolve;
        });
    },

    /**
    * Check if the user has already the sessionCookie/localStorage.
    */
    hasSession : function(){
      var cookieObject = $cookies.getObject('libreriaDemoAppUserSession');
      if (cookieObject && cookieObject.username){
        return true;
      }
      return false;
    }

  };

}

angular.module('loginModule').factory('AuthUserData', [ '$log', '$q', 'DbManager', '$cookies' , AuthUserData]);
