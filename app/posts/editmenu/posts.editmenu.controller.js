(function(){
    'use strict';
    
    angular
        .module('app.posts')
        .controller('PostsEditMenuCtrl', PostsEditMenuCtrl );

        PostsEditMenuCtrl.$inject = ['$mdDialog'];
        function PostsEditMenuCtrl($mdDialog) {
            var vmb = this;
            vmb.menu = [
                {name: 'Edit', icon: 'create'},
                {name: 'Delete', icon: 'backspace'}
                ];
            vmb.submit = function($index) {
              
              $mdDialog.hide(vmb.menu[$index]);
            };
            
        }

})();