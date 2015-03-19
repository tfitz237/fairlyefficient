(function() {
     'use strict';

angular
      .module('feBlog')
      .config(configRouting);
      configRouting.$inject = ['$stateProvider', '$urlRouterProvider'];

function configRouting ($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise("/post");
   $stateProvider
    .state('posts', {
      url: "/post",
      views: {
        "": { templateUrl: "layout/template.html", controller:"LayoutTemplateCtrl", controllerAs: "vm"},
        "content@posts": { templateUrl: "posts/posts-list.html", controller:"PostsCtrl", controllerAs: "vm" },
        "sidenav@posts": { templateUrl: "layout/sidenav.html", controller:"LayoutSideNavCtrl", controllerAs: "vm" },
        "header@posts": { templateUrl: "layout/header.html", controller:"LayoutHeaderCtrl", controllerAs: "vm" }
      }
    })
    
    .state('post', {
      url: "/post/:id",
      views: {
        "": {templateUrl: "layout/template.html", controller:"LayoutTemplateCtrl", controllerAs: "vm" },
        "content@post": { templateUrl: "posts/post-details.html", controller:"PostsCtrl", controllerAs: "vm" },
        "sidenav@post": { templateUrl: "layout/sidenav.html", controller:"LayoutSideNavCtrl",controllerAs: "vm" },
        "header@post": { templateUrl: "layout/header.html",controller:"LayoutHeaderCtrl", controllerAs: "vm" }
      }
    });
    
    
    
  
  
}

})();