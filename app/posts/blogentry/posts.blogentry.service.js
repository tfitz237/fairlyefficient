(function(){
     'use strict';
     
     angular
          .module('feBlog')
          .factory('BlogEntryService', BlogEntryService);
          BlogEntryService.$inject = ['Posts', '$mdBottomSheet'];
          function BlogEntryService(Posts, $mdBottomSheet) {
               var entry = {
                    
               };
               var type = 'new';
               return {
                    'openForm': function(newType) {
                              type = newType;
                              $mdBottomSheet
                                   .show({
                                        templateUrl: 'posts/blogentry/posts.blogentry.html', 
                                        controller: "BlogEntryCtrl", 
                                        controllerAs: "vmb"
                                   })
                                   .then(function(post) {
                                        if(newType == 'new') {
                                             Posts.api.save(entry, function(e) { return e;});
                                        } else {
                                             Posts.api.update(entry, function(e) {return e;});
                                        }
                                        
                                   });
                              
                         
                         
                         
                         
                    },
                    
                    
                    'getForm': function() {
                         return entry;
                    },
                    'setForm': function(post) {
                         entry = post;
                    },
                    'setType': function(settype) {
                         if (settype == 'new') {
                              type = 'new';
                              
                         }
                         else {
                              type = 'edit';
                         }
                    },
                    'getType': function() {
                         return type;
                    }
                    
                    };
                    
                    
                    
                    
               
               
          }
})();