(function(){
     'use strict';
     
     angular
          .module('feBlog')
          .controller('LayoutSideNavCtrl',LayoutSideNavCtrl);
          
          LayoutSideNavCtrl.$inject = ['LayoutSideNavService'];
     function LayoutSideNavCtrl(LayoutSideNavService) {
     var vm = this;
     
     vm.menu = LayoutSideNavService.getMenu();
     
}
})();