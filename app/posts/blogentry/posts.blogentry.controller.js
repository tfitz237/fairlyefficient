(function(){
     'use strict';
     
     angular
          .module('feBlog')
          .controller('BlogEntryCtrl', BlogEntryCtrl);
          BlogEntryCtrl.$inject = ['BlogEntryService', '$mdBottomSheet'];
          
function BlogEntryCtrl(BlogEntryService, $mdBottomSheet) {
     var vmb = this;
     
     if(BlogEntryService.getType() == 'edit') 
          vmb.post = BlogEntryService.getForm();
     
    vmb.submit = function() {
     BlogEntryService.setForm(vmb.post);
     $mdBottomSheet.hide();
    };
   
}

})();
