(function(){
    'use strict';
    
    angular
        .module('app.posts')
        .factory('Posts', PostsService);
    
    PostsService.$inject = ['$resource', '$stateParams'];

    function PostsService($resource, $stateParams){
        var posts = [];
        var api = $resource('http://api.fairlyefficient.net/post/', null,
            {
        
        'get': {method: 'GET', url: 'http://api.fairlyefficient.net/posts/:id', params: {id: '@id'}},
        'save': {method: 'POST', url: 'http://api.fairlyefficient.net/posts', params: {title: '@title', content: '@content'}},
        'all': {method: 'GET', url: 'http://api.fairlyefficient.net/posts/', isArray:true},
        'delete': {method: 'DELETE', url: 'http://api.fairlyefficient.net/posts/:id', params: {id: '@id'}},
        'update': {method: 'PUT', url: 'http://api.fairlyefficient.net/posts/:id', params: {id: '@id'}}
        
        });
        var service =  {
            'api': api
            ,
            'refresh': function(post){
                    if(!$stateParams.id) {
                        posts = api.all();
                    }
                    else {
                        posts = [api.get({id: $stateParams.id })];
                    }
                    return posts;
                
            },
            'getPost': function() {
    
                return posts;
    
            }
                
        
        }; 
    
    
    
    
        return service;
    }

})();