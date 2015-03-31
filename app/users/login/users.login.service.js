(function(){
     'use strict';
     
     angular
          .module('app.users')
          .factory('UserSession',UserSession);
          
          UserSession.$inject = ['Storage'];
          
          function UserSession(Storage) {
               var service = {
                    login: login,
                    logout: logout,
                    getUserSession: getUserSession
                    
               };
              
        
        
               return service;
               
               // Only called once verified in User service. Stores session data in localSession via Storage service
               function login(user) {
                    var d = new Date();
                    var store = Storage.session('me', 
                    {
                         id: user.id, 
                         name: user.name, 
                         login_time: d.getTime(),
                         session_verify: user.session_verify
                         
                    });
                    if (typeof JSON.parse(Storage.session('me')) == "object")
                         return true;
                    else 
                         return false;
               }
               
               // returns if there is a User session or not. 
               function getUserSession() {
                    var user = JSON.parse(Storage.session('me'));
                    
                    if(user != null) {
                         
                         return user;
                        
                    }
                         
                    else
                         return false;
                    
                    
               }
               function logout() {
                    Storage.delete('session','me');
                    return true;
               }
               
               
               function verifySession(session) {
                    if(getUserSession().session_verify == session) {
                         return true;
                    }else {
                         return false;     
                    
                    }
                    
               }
          }
     
})();