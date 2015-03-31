(function(){
     'use strict';
     
     angular
          .module('app.users')
          .controller('UsersLoginCtrl', UsersLoginCtrl);
          UsersLoginCtrl.$inject = ['Users','$state'];
          
          function UsersLoginCtrl(Users,$state) {
               var vm = this;
               
               vm.name;
               vm.password;
               vm.login = login;
               
               activate();
               
               function login() {
                    Users.login({name:vm.name,password:vm.password}).then(function(verify){
                         if(verify) {
                              $state.go('app.post');
                         }
                         
                         
                    });
                    
               }
               
               function activate() {
                    Users.loggedIn().then(function(verify){
                         if(verify) {
                              vm.loggedIn = true;
                              $state.go('app.post');
                         }
                         else {
                              vm.loggedIn = false;
                         }
                         
                    });
                    
                    
                    
               }
          }
})();