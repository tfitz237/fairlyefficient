(function() {
     'use strict';
     
     angular
          .module('feBlog')
          .controller('PostsCtrl', PostsCtrl);
PostsCtrl.$inject = ['$scope', '$mdSidenav', '$mdMedia', 'Posts', 'BlogEntryService', 'EditMenuService'];

function PostsCtrl($scope, $mdSidenav, $mdMedia, Posts, BlogEntryService, EditMenuService) {
     var vm = this;
     // constructor
     vm.openBlogEntry = function(type){BlogEntryService.openForm(type)};
     vm.openPostsEditMenu = function(post){EditMenuService.openMenu(post)};
     vm.refreshList = function(){Posts.getAllPosts();};
     vm.toggleSidenav = toggleSidenav;
    constructor();
     
  $scope.$watch(function() { return $mdMedia('sm'); }, function(e) {
    vm.smallScreen= e;
  });
  $scope.$watch(function() { return $mdMedia('gt-md'); }, function(e) {
    vm.greatMedium = e;
  });
  $scope.$watch(function() { return Posts.getPost(); }, function(e){
      vm.posts = e;
  });
    
    // First run
    function constructor() {
         
        Posts.refresh();
        vm.posts = Posts.getPost();
        vm.greatMedium = $mdMedia('gt-md');
        vm.smallScreen = $mdMedia('sm');
    }

    function toggleSidenav(menuId) {
      $mdSidenav(menuId).toggle();
     }
}

})();