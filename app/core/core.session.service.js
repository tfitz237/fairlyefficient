(function(){
     'use strict';
     
     angular
          .module('app.core')
          .factory('Storage',Storage);
          
          Storage.$inject = [];
          
          function Storage() {
               var service = {
                    session: session,
                    local: local,
                    delete: del
                    
               };
               return service;
               
               
               function session(name,data) 
               {
                    if (typeof data == 'undefined') {
                         return sessionStorage.getItem(name);
                    }
                    else {
                         var setted = sessionStorage.setItem(name,JSON.stringify(data));
                         if (setted) {
                              return true;
                         } 
                         else return false;
                    }
               }
               
               function local(name,data) 
               {
                    if (typeof data == 'undefined') {
                         return localStorage.getItem(name);
                    }
                    else {
                         var setted = localStorage.setItem(name,JSON.stringify(data));
                         if (setted) {
                              return true;
                         } 
                         else return false;
                    }
               }
               function del(type,name) {
                    if(type == 'session') {
                         if (sessionStorage.removeItem(name)) return true;
                    }
                    else {
                         if (localStorage.removeItem(name)) return true;
                    }
                    
               }
          }
})();