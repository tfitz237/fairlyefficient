(function(){
     'use strict';
     
     angular
          .module("app.layout")
          .directive("feHeader", feHeader);
          
          feHeader.$inject = [];
          
          function feHeader() {
               return {
                    restrict: 'A',
                    templateUrl: "layout/layout.header.html",
                    
               };
               
          }
          
          
})();