(function() {
     'use strict';
angular
       .module('feBlog')
       .config(feBlogTheme);
       
       
       
function feBlogTheme($mdThemingProvider) {
  $mdThemingProvider.theme('default')
                    .primaryPalette('deep-orange')
                    .accentPalette('grey')
                    .backgroundPalette('grey');
}

})();