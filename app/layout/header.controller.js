(function(){
     'use strict';
     
     angular
          .module("feBlog")
          .controller("LayoutHeaderCtrl", LayoutHeaderCtrl);
          
          LayoutHeaderCtrl.$inject = ['$scope','$mdSidenav', 'Posts', '$mdMedia'];
          
          function LayoutHeaderCtrl($scope, $mdSidenav, Posts, $mdMedia) {
               var vm = this;
               vm.refreshList = function(){Posts.refresh()};
               vm.toggleSidenav = function(menuId){$mdSidenav(menuId).toggle();};
               vm.greatMedium = $mdMedia('gt-md');
               $scope.$watch(function() { return $mdMedia('gt-md'); }, function(e) {
                    vm.greatMedium = e;
               });
          }
     
     
})();