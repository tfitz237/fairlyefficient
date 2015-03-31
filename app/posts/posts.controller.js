(function() {
     'use strict';
     
     angular
          .module('app.posts')
          .controller('PostsCtrl', PostsCtrl);
     PostsCtrl.$inject = ['$scope', '$mdSidenav', '$mdMedia', 'Posts', 'BlogEntryService', 'EditMenuService','Users'];

     function PostsCtrl($scope, $mdSidenav, $mdMedia, Posts, BlogEntryService, EditMenuService, Users) {
          var vm = this;
          // constructor
          vm.openBlogEntry = function(type){BlogEntryService.openForm(type)};
          vm.openPostsEditMenu = function(post){EditMenuService.openMenu(post)};
          vm.refreshList = function(){Posts.refresh();};
          vm.toggleSidenav = toggleSidenav;
          vm.posts = null;
          constructor();
     
          
          $scope.$watch(function(){return $mdMedia('sm')}, function(e) {
               vm.smallScreen= e;
          });
         
         // First run
          function constructor() {
               Posts.getPost().then(function(posts) {
                   vm.posts = posts;
               },function(error) { console.log(error)});
               
               vm.greatMedium = $mdMedia('gt-md');
               vm.smallScreen = $mdMedia('sm');
          }
     
          function toggleSidenav(menuId) {
               $mdSidenav(menuId).toggle();
          }
     }
})();