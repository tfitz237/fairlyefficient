(function(){
     'use strict';
     
     angular
          .module('feBlog')
          .controller('LayoutTemplateCtrl',LayoutTemplateCtrl);
          
          LayoutTemplateCtrl.$inject = ['$mdSidenav', 'BlogEntryService'];
          
     function LayoutTemplateCtrl($mdSidenav, BlogEntryService) {
               var vm = this;
               vm.toggleSidenav = function(menuId){$mdSidenav(menuId).toggle();};
               vm.openBlogEntry = function(){BlogEntryService.openForm('new');};
               
     }
     
})();
