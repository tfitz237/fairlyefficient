(function(){
     'use strict';
     
     angular
          .module('app.users')
          .controller('UsersCtrl', UsersCtrl);
          
     UsersCtrl.$inject = ['Users','$mdMedia','$scope'];
     function UsersCtrl(Users,$mdMedia,$scope) {
          var vm = this;
          vm.me = Users.me();
          activate();
          
          $scope.$watch(function() { return $mdMedia('sm'); }, function(e) {
               vm.smallScreen= e;
          });
          
          function getUsers() {
               Users.get().then(function(data){
                    
                    vm.users =  data;
               });
               
               
          }
          
          function activate() {
               
               getUsers();
          }
     }
})();