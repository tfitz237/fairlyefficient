(function() {
     'use strict';
     
     angular
          .module('app')
          .provider('userSettingsProvider',userSettingsProvider);
          
          
          function userSettingsProvider() {
               var vm = this;

               vm.getSetting = function(name) {
                    var settings = localStorage.getItem('settings');
                    settings = JSON.parse(settings);
                    return settings;
               }
               vm.setSetting = function(name, value) {
                    var settings = localStorage.getItem('settings');
                    settings = JSON.parse(settings);
                    settings[name] = value;
                    settings = JSON.stringify(settings);
                    localStorage.setItem('settings',settings);
                    
                    
               }
               
          }
     
})();