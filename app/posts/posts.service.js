(function(){
    'use strict';
    
    angular
        .module('app.posts')
        .factory('Posts', PostsService);
    
    PostsService.$inject = ['$resource', '$stateParams','Users', '$q', '$filter'];

    function PostsService($resource, $stateParams, Users, $q, $filter){
        var vms = this;
        vms.posts = null;
        vms.api = $resource('http://api.fairlyefficient.net/post/', null,
            {
        
        'get': {method: 'GET', url: 'http://api.fairlyefficient.net/posts/:id', params: {id: '@id'}},
        'save': {method: 'POST', url: 'http://api.fairlyefficient.net/posts', params: {title: '@title', content: '@content'}},
        'all': {method: 'GET', url: 'http://api.fairlyefficient.net/posts/', isArray:true},
        'delete': {method: 'DELETE', url: 'http://api.fairlyefficient.net/posts/:id', params: {id: '@id'}},
        'update': {method: 'PUT', url: 'http://api.fairlyefficient.net/posts/:id', params: {id: '@id'}}
        
        });
        var service =  {
            'api': vms.api,
            'refresh': refresh,
            'getPost': getPost
    
        }; 
        
        return service;
        function refresh() {
            var deferred = $q.defer();
            
            if(!$stateParams.id) {
                vms.api.all().$promise
                    .then(function(data){
                        deferred.resolve(data);
                        vms.posts = data;
                        getUserNames(data);
                    });
            }
            else {
                vms.api.get({id: $stateParams.id }).$promise
                    .then(function(data){
                        deferred.resolve([data]);
                        vms.posts = [data];
                        getUserNames([data]);
                    });
            }
            
            return deferred.promise;
                
          
        }
        function getUserNames(post)
        {
            post.forEach(function(e,index){
               
                Users.getUser(parseInt(e.posted_by))
                .then(function(data) {
                    vms.posts[index]["posted_by_username"] = data.name;
                },function(data){
                    console.log('Something went wrong when fetching usernames for posts');
                });
            });
        }
      
      
      function getPost() {
          var deferred = $q.defer();
          
          if(vms.posts !== null) {
              if($stateParams.id) {
                  deferred.resolve($filter('filter')(vms.posts, function(value,index){
                      if(value.id == $stateParams.id) return true;
                      
                  }));
                      
                 
              } else {
                  
                  if(Object.keys(vms.posts).length > 1)
                    deferred.resolve(vms.posts);
                    else refresh().then(function(data) {
                        deferred.resolve(data);
                });
              }
          }
          else {
              refresh().then(function(data) {
                  deferred.resolve(data);
              });
             
          }
          
          return deferred.promise;
      }
    
        
    }

})();