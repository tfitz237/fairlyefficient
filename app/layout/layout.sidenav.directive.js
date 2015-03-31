(function(){
     'use strict';
     
     angular
          .module("app.layout")
          .directive("feSideNav", feSideNav);
          
          feSideNav.$inject = [];
          
          function feSideNav() {
               return {
                    restrict: 'A',
                    templateUrl: "layout/layout.sidenav.html",
                    
               };
               
          }
          
          
})();