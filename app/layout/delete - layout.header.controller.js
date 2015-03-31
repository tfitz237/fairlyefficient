(function(){
     'use strict';
     
     angular
          .module('app.layout')
          .controller("LayoutHeaderCtrl", LayoutHeaderCtrl);
          
     LayoutHeaderCtrl.$inject = ['$scope','$mdSidenav', 'Posts', 'Users'];
          
     function LayoutHeaderCtrl($scope, $mdSidenav, Posts, Users) {
          var vm = this;
          
          vm.refreshList = function(){Posts.refresh()};
          vm.toggleSidenav = function(menuId){$mdSidenav(menuId).toggle();};
          vm.isLoggedIn = Users.loggedIn();
          vm.refreshUser = function(){vm.currentUser = Users.me();};
          vm.currentUser = Users.me();
          vm.logout = function(){Users.logout()};
          
          
          $scope.$watch(function(){return Users.me();},function(e){vm.isLoggedIn = e});
          
          
          $scope.$watch(function() { if($mdSidenav('left').isLockedOpen() || $mdSidenav('left').isOpen()) return true; else return false; }, function(e) {
               vm.Sidenavopen= e;
          });
     }
})();