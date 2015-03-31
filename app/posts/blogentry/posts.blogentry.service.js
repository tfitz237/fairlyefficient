(function(){
     'use strict';
     
     angular
          .module('app.posts')
          .factory('BlogEntryService', BlogEntryService);
          BlogEntryService.$inject = ['Posts', '$mdBottomSheet', 'Users'];
          function BlogEntryService(Posts, $mdBottomSheet, Users) {
               var vmb = this;
               vmb.entry = {
                    
               };
               vmb.type = 'new';
               vmb.me = Users.me();
               return {
                    'openForm': function(newType) {
                              vmb.type = newType;
                              $mdBottomSheet
                                   .show({
                                        templateUrl: 'posts/blogentry/posts.blogentry.html', 
                                        controller: "BlogEntryCtrl", 
                                        controllerAs: "vmb"
                                   })
                                   .then(function() {
                                        var now = new Date().getTime();
                                        if(newType == 'new') {
                                             vmb.entry.created_on = now;
                                             vmb.entry.updated_on = now;
                                             Posts.api.save(vmb.entry, function(e) { return e;});
                                        } else {

                                             Posts.api.update({id: vmb.entry.id}, {
                                                  title: vmb.entry.title, 
                                                  content: vmb.entry.content, 
                                                  image: vmb.entry.image, 
                                                  updated_on: now})
                                                  .$promise.then(function(data){
                                                       console.log(data)
                                                       
                                                  },function(data){
                                                       console.log(data)
                                                       
                                                  });
                                        }
                                        
                                   });
                              
                         
                         
                         
                         
                    },
                    
                    
                    'getForm': function() {
                         return vmb.entry;
                    },
                    'setForm': function(post) {
                         vmb.entry = post;
                    },
                    'setType': function(settype) {
                         if (settype == 'new') {
                              vmb.type = 'new';
                              
                         }
                         else {
                              vmb.type = 'edit';
                         }
                    },
                    'getType': function() {
                         return vmb.type;
                    }
                    
                    };
                    
                    
                    
                    
               
               
          }
})();