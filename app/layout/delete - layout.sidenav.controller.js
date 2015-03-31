(function(){
     'use strict';
     
     angular
          .module('app.layout')
          .controller('LayoutSideNavCtrl',LayoutSideNavCtrl);
          
     LayoutSideNavCtrl.$inject = ['$scope','LayoutSideNavService'];
     
     function LayoutSideNavCtrl($scope,LayoutSideNavService) {
          
          $scope.menu = LayoutSideNavService.getMenu();
          
          activate();
          
          
          function activate() {
               LayoutSideNavService.getMenu().$promise.then(function(data) { $scope.menu = data});
          }
          
          
          
     }
})();