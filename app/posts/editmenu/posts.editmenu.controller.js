(function(){
    'use strict';
    
    angular
        .module('app.posts')
        .controller('PostsEditMenuCtrl', PostsEditMenuCtrl );

        PostsEditMenuCtrl.$inject = ['$mdBottomSheet'];
        function PostsEditMenuCtrl($mdBottomSheet) {
            var vmb = this;
            vmb.menu = [
                {name: 'Edit', icon: 'create'},
                {name: 'Delete', icon: 'backspace'}
                ];
            vmb.submit = function($index) {
              
              $mdBottomSheet.hide(vmb.menu[$index]);
            };
            
        }

})();