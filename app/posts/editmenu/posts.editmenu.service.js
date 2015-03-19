(function(){
     'use strict';
     
     
     angular
          .module('feBlog')
          .factory('EditMenuService', EditMenuService);
          
          EditMenuService.$inject = ['$mdBottomSheet', 'BlogEntryService', 'Posts', '$mdDialog', '$mdToast'];
          
          function EditMenuService($mdBottomSheet, BlogEntryService, Posts, $mdDialog, $mdToast) {
               var vms = this; // view model service
               vms.EditButton = EditButton;
               vms.DeleteButton = DeleteButton;
               vms.openMenu = openMenu;
               return { 
                    'openMenu': vms.openMenu
               };
               
               function EditButton(post) {
                    BlogEntryService.setForm(post);
                    BlogEntryService.openForm('edit');
                    
               }
               
               function DeleteButton(post) {
                    var confirm = $mdDialog.confirm()
                                           .title('Are you sure you would like to delete this post?')
                                           .content(post.content)
                                           .ariaLabel('Delete?')
                                           .ok('Delete')
                                           .cancel('Cancel');
                    $mdDialog.show(confirm)
                             .then(function() {
                                   Posts.delete({id: post.id}, function(){
                                        $mdToast.showSimple('Post Deleted');
                                        BlogEntryService.refresh();
                                   });
                              });
                    
                    
               }
               
     
               function openMenu(post) {
                         $mdBottomSheet
                              .show({
                                   templateUrl: 'posts/editmenu/posts.editmenu.html', 
                                   controller: "PostsEditMenuCtrl", 
                                   controllerAs: "vmb"
                              })
                              .then(function(button){
                                   if(button.name == "Edit") vms.EditButton(post);
                                   else vms.DeleteButton(post);
                              })
                         
                         
                    }
          }
     
})();