(function() {
     'use strict';

angular
      .module('app')
      .config(configRouting);
      configRouting.$inject = ['$stateProvider', '$urlRouterProvider'];

function configRouting ($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise("/post");
   $stateProvider
    .state('posts', {
      url: "/post",
      views: {
        "": { templateUrl: "layout/layout.template.html", controller:"LayoutTemplateCtrl", controllerAs: "vm"},
        "content@posts": { templateUrl: "posts/posts.list.html", controller:"PostsCtrl", controllerAs: "vm" },
        "sidenav@posts": { templateUrl: "layout/layout.sidenav.html", controller:"LayoutSideNavCtrl", controllerAs: "vm" },
        "header@posts": { templateUrl: "layout/layout.header.html", controller:"LayoutHeaderCtrl", controllerAs: "vm" }
      }
    })
    
    .state('post', {
      url: "/post/:id",
      views: {
        "": {templateUrl: "layout/layout.template.html", controller:"LayoutTemplateCtrl", controllerAs: "vm" },
        "content@post": { templateUrl: "posts/posts.details.html", controller:"PostsCtrl", controllerAs: "vm" },
        "sidenav@post": { templateUrl: "layout/layout.sidenav.html", controller:"LayoutSideNavCtrl",controllerAs: "vm" },
        "header@post": { templateUrl: "layout/layout.header.html",controller:"LayoutHeaderCtrl", controllerAs: "vm" }
      }
    });
    
    
    
  
  
}

})();