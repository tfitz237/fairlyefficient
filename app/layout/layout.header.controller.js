(function(){
     'use strict';
     
     angular
          .module('app.layout')
          .controller("LayoutHeaderCtrl", LayoutHeaderCtrl);
          
     LayoutHeaderCtrl.$inject = ['$scope','$mdSidenav', 'Posts', '$mdMedia'];
          
     function LayoutHeaderCtrl($scope, $mdSidenav, Posts, $mdMedia) {
          var vm = this;
          
          vm.refreshList = function(){Posts.refresh()};
          vm.toggleSidenav = function(menuId){$mdSidenav(menuId).toggle();};
     }
})();