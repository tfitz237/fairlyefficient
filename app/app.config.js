(function() {
     'use strict';
     angular
          .module('app')
          .config(feBlogTheme);
       
     function feBlogTheme($mdThemingProvider) {
          $mdThemingProvider
                    .theme('default')
                    .primaryPalette('deep-orange')
                    .accentPalette('grey')
                    .backgroundPalette('grey');
     }
})();