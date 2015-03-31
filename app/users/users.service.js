(function(){
     'use strict';
     
     angular
          .module("app.users")
          .factory("Users",UsersService);
          
          UsersService.$inject = ['UserSession', '$resource', '$stateParams', 'md5', '$mdToast', '$q'];
          
          
          /* Description of service:
               To extract, manipulate, and interpret User Data, and interact with User Session data
               
          */
          function UsersService(UserSession, $resource, $stateParams, md5, $mdToast, $q, $filter) {
               var vms = this;
               vms.users = [];
               vms.currentUser = false;
               vms.service = {
                    me: me,
                    get: retrieve,
                    getUser: getUser,
                    loggedIn: loggedIn,
                    login: login,
                    logout: logout
                    
               };
               vms.api = $resource('http://api.fairlyefficient.net/users/', null,
                    {
                         'all': {method: 'GET', url: 'http://api.fairlyefficient.net/users/', isArray:true},
                         'getByID': {method: 'GET', url: 'http://api.fairlyefficient.net/users/:id', params: {id: '@id'}},
                         'getByUser': {method: 'GET', url: 'http://api.fairlyefficient.net/users/name/:name', params: {name: '@name'}, isArray:true},
                         'save': {method: 'POST', url: 'http://api.fairlyefficient.net/users', params: {title: '@title', content: '@content'}},
                         'delete': {method: 'DELETE', url: 'http://api.fairlyefficient.net/users/:id', params: {id: '@id'}},
                         'update': {method: 'PUT', url: 'http://api.fairlyefficient.net/users/:id', params: {id: '@id'}},
                         'verify': {method: 'GET', url: 'http://api.fairlyefficient.net/session_verify.php?id=:id', params: {id: '@id'}, isArray:true }
                    }
               );
               return vms.service;
               
               // boolean response
               function loggedIn() {
                    var deferred = $q.defer();
                    // checks if already logged in and set
                    if (vms.currentUser == false) {
                         // checks if there is a user in the session
                         var g = UserSession.getUserSession();
                         if (g) {
                              // if there is a user session, gets the full info for the user
                              getUser(g).then(function(user){
                                   if (user) {
                                        // if it could find the user, verify session
                                        if(verifySession(user)) {
                                             console.log('verified session, set current user.');
                                             console.log('logged in');
                                             vms.currentUser = user;
                                             deferred.resolve(true);
                                        }
                                   } else {
                                        
                                        deferred.reject('could not find user');
                                   }
                              });
                         } else {
                                   // there isn't a user session
                                   
                                   deferred.resolve(false);
                         }
                    
               } else {
                    // logged in.
                   
                    deferred.resolve(true);
                    
               }
                    return deferred.promise;
               }
               function me() {
                    return vms.currentUser;
               }
               
               function retrieve() {
                    var deferred = $q.defer();
                    console.log('retreiving users...');
                    if($stateParams.id) {
                         console.log('getting specific user...');
                         getUser(parseInt($stateParams.id)).then(function(data){ deferred.resolve(data)});
                    }else{
                         console.log('getting all users...');
                         getUser('$all').then(function(data){ deferred.resolve(data)});;
                    }
                    
                    return deferred.promise;
               }
               
               
               function getUser(user) {
                    
                    var deferred = $q.defer();
                    var Cached = false;
                    if(Cached) {
                         
                    }
                    else {
                         
                    
                    if (typeof user == 'boolean') {
                         if (!user) {
                              deferred.reject("No user");
                         }
                    }
                    else if (typeof user == 'number') {
                      if(user == -1) {
                           deferred.reject("No user");
                      }   else {
                         vms.api.getByID({id: user}).$promise.then(function(data){
                              deferred.resolve(data);
                              
                              
                         });
                      }
                    }
                    else if (typeof user == 'string') {
                        
                         if (user == '$all') {
                              
                              vms.api.all().$promise.then(function(data){
                              deferred.resolve(data);
                              
                              
                         });
                         } else {
                              vms.api.getByUser({name: user}).$promise.then(function(data){
                              deferred.resolve(data);
                              
                              
                         });
                         }
                    }
                    else if (typeof user == 'undefined') {
                         deferred.reject('No user');
                    }
                    else if (typeof user == 'object'){
                         var id = user.id;
                         vms.api.getByID({id: id}).$promise.then(function(data){
                              deferred.resolve(data);
                              
                              
                         });
                         
                    }
                    }
                   
                    return deferred.promise;
               }
               
               function login(user) {
                    var deferred = $q.defer();
                    getUser(user.name).then(function(verify){
                         verify = verify[0];
                         var userpass = md5.createHash(user.password);
                         if ((user.name == verify.name) && ( userpass == verify.password)) {
                              vms.api.verify({id: verify.id}).$promise.then(function(data){
                                   verify.session_verify = data[1].session_verify;
                                   
                                   $mdToast.showSimple('Success!');
                                   if(UserSession.login(verify)) {
                                        loggedIn().then(function(data){
                                             if(data)
                                                  deferred.resolve(true);
                                             
                                        });
                                   }
                              });
                                 
                         }
                    else {
                         var message;
                         if (user.name != verify.name) message = " Incorrect username. ";
                         if  ( userpass != verify.password) message = " Incorrect password.";
                         $mdToast.showSimple("Login Error: " + message);
                         deferred.reject(false);}
                    });
                    return deferred.promise;
                
               }
               function logout(user) {
                    var deferred = $q.defer();
                    if(UserSession.logout(user)) {
                         vms.currentUser = false;
                         $mdToast.showSimple('Logged out.');
                         deferred.resolve('Successful Logout');
                    }
                    else {
                         $mdToast.showSimple('Logged out.');
                         deferred.reject('Failed to logout');
                    }
                    return deferred.promise;
               }
               function verifySession(user) {
                    vms.api.getByUser({name: user.name}).$promise.then(function(data){
                         data = data[0];
                         if(data.session_verify == user.session_verify) {
                              vms.currentUser = user;
                              
                         }
                         else {
                              console.log("could not verify session");
                         }
                    });
                    
               }
               
          }
})();