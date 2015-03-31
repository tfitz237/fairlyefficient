(function() {
     'use strict';

angular
      .module('app')
      .config(configRouting);
      configRouting.$inject = ['$stateProvider', '$urlRouterProvider'];

function configRouting ($stateProvider, $urlRouterProvider) {


  $urlRouterProvider.otherwise("/post");
   $stateProvider
   .state('app', {
     url: '',
     views: { "": { templateUrl: "layout/layout.template.html", controller:"LayoutTemplateCtrl", controllerAs: "vm"},
        "content@app": { templateUrl: "posts/posts.grid.html", controller:"PostsCtrl", controllerAs: "vm" },
     }
     
   })
    .state('app.post', {
      url: "/post",
      views: {
        "content@app": { templateUrl: "posts/posts.grid.html", controller:"PostsCtrl", controllerAs: "vm" },
      },
      resolve: {
          statePosts: postsService
      }
    })
    
    .state('app.post.details', {
      url: "/:id",
      views: {
        "content@app": { templateUrl: "posts/posts.details.html", controller:"PostsCtrl", controllerAs: "vm" },
              resolve: {
          statePosts: postsService
      }
      }
    })
    
    .state('app.user', {
      url: "/user",
      views: {
        "content@app": { templateUrl: "users/users.list.html", controller:"UsersCtrl", controllerAs: "vm" },
      }
    })
    
    .state('app.user.login', {
      url: "/login",
      views: {
        "content@app": { templateUrl: "users/login/users.login.html", controller:"UsersLoginCtrl", controllerAs: "vm" }
      }
    })
    
    .state('app.user.profile', {
      url: "/:id",
      views: {
        "content@app": { templateUrl: "users/users.profile.html", controller:"UsersCtrl", controllerAs: "vm" }
      }
    })
    ;
    
    // Doesn't work the way I want it to, but it does grab from the API before the controller, which makes the controller work faster
    function postsService(Posts){
        return Posts.getPost();
    }
    
  
  
}

})();