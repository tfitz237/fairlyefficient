(function() {
     'use strict';
     angular
          .module('app')
          .config(feBlogTheme);
       
     feBlogTheme.$inject = ['$mdThemingProvider'];
     function feBlogTheme($mdThemingProvider) {
          
        
          $mdThemingProvider
                    .theme('default')
                         .primaryPalette('deep-orange')
                         .accentPalette('amber')
                         .backgroundPalette('grey')
     }
})();