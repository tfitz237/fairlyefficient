(function(){
     'use strict';
     
     angular
          .module('app.posts')
          .controller('BlogEntryCtrl', BlogEntryCtrl);
          BlogEntryCtrl.$inject = ['BlogEntryService', '$mdBottomSheet'];
          
function BlogEntryCtrl(BlogEntryService, $mdBottomSheet) {
     var vmb = this;
     
     if(BlogEntryService.getType() == 'edit') {
          vmb.post = BlogEntryService.getForm();
     }
     
    vmb.submit = function() {
         if (!vmb.post.posted_by) vmb.post.posted_by = '1';
     BlogEntryService.setForm(vmb.post);
     $mdBottomSheet.hide();
    };
   
}

})();
