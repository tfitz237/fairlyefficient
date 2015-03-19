(function (){
     'use strict';
     
     
     angular
          .module('feBlog')
          .factory('LayoutSideNavService',LayoutSideNavService);
          LayoutSideNavService.$inject = ['$filter', '$resource'];
          function LayoutSideNavService($filter, $resource) {
           return $resource('http://api.fairlyefficient.net/menu/', null,
              {
                  
                  'get': {method: 'GET', url: 'http://api.fairlyefficient.net/menu/:id', params: {id: '@id'}},
                  'save': {method: 'POST', url: 'http://api.fairlyefficient.net/menu', params: {icon: '@icon', name: '@name', state: '@state', alt: '@alt'}},
                  'getMenu': {method: 'GET', url: 'http://api.fairlyefficient.net/menu/', isArray:true},
                  'delete': {method: 'DELETE', url: 'http://api.fairlyefficient.net/menu/:id', params: {id: '@id'}},
                  'update': {method: 'PUT', url: 'http://api.fairlyefficient.net/menu/:id', params: {id: '@id'}}
                  
              });
              
          }
          
     
})();