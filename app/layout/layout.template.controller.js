(function(){
     'use strict';
     
     angular
          .module('app.layout')
          .controller('LayoutTemplateCtrl',LayoutTemplateCtrl);
          
     LayoutTemplateCtrl.$inject = ['$rootScope','$scope', '$mdSidenav', '$state', 'BlogEntryService', 'Users', 'LayoutSideNavService', 'Posts'];
          
     function LayoutTemplateCtrl($rootScope, $scope, $mdSidenav, $state, BlogEntryService, Users, LayoutSideNavService, Posts) {
          var vm = this;
          vm.showLoading = false;
          vm.showFAB= showFab;
          vm.toggleSidenav = function(menuId){$mdSidenav('left').toggle();};
          vm.openBlogEntry = function(){BlogEntryService.openForm('new');};
               
          
          vm.refreshList = function(){Posts.refresh()};
          vm.refreshUser = function(){vm.currentUser = Users.me();};
          vm.currentUser = Users.me();
          vm.userMenu = null;
          activate();
               
          //watches
          $scope.$watch(function(){return Users.me();},function(e){
               if(!e) {
                    vm.userMenuLabel = "Login"; 
                    vm.isLoggedIn = false;
               }
               else {
                    vm.userMenuLabel = e.name;
                    vm.isLoggedIn = true;
               }
               vm.currentUser = e;
          });
          
          
          $scope.$watch('vm.userMenu',function(e,o){
               
               if (o != e)
                    userMenuClick(vm.userMenu);
              
               
          });
          
          
          $rootScope.$on('$viewContentLoading', 
function(event, viewConfig){ 
    vm.showLoading = true;
    console.log('loading..');
});
          $scope.$on('$viewContentLoaded', 
function(event){
     console.log('loaded');
     vm.showLoading = false;
     
});
               
               
          function activate() {
               Users.loggedIn()
               .then(function(success){
                    if (success) {
                         vm.refreshUser();
                    }
                    vm.isLoggedIn = success;
               },function(failure) {
                    console.log(failure);
               });
               
               LayoutSideNavService.getMenu().$promise.then(function(data){
                    vm.menu = data;
                    // Watch only when data is received
                    $scope.$watch(function() { 
                         if($mdSidenav('left').isLockedOpen() || $mdSidenav('left').isOpen()) 
                              return true; 
                         else 
                              return false; 
                    }, function(e) {
                         vm.Sidenavopen= e;
                         
                    });
                   
                  
               });
          }
               
          function showFab() {
               if($state.includes('app.post')){
                    if (vm.isLoggedIn) {
                         return true;
                    }
               }
               else {
                    return false;
               }
          }
          function userMenuClick(clickedOn) {
               $mdSidenav('left').close();
               switch (clickedOn) {
                    case 'justclicked':
                         // code
                         break;
                    case 'logout':
                          Users.logout().then(function(data) {
                       vm.userMenuLabel="Login";  
                         vm.isLoggedIn = false;
                         vm.refreshUser();
                    });
                         break;
                    case 'login':
                         $state.go('app.user.login');
                         break;
                    case 'profile':
                         $state.go('app.user.profile',{id: vm.currentUser.id});
                         break;
                         // code
               }
              
               vm.userMenu = "justclicked";
               
               
          }
     }
})();
