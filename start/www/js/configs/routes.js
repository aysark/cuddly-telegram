(function(angular){
  "use strict";

  angular.module("WidgetApp.Services")
    .config(function($stateProvider, $urlRouterProvider, $locationProvider){
      $urlRouterProvider.otherwise("/");
      $locationProvider.html5Mode(false);

      $stateProvider
        .state("home", {
          url: "/",
          templateUrl: "/tpls/home.tpl",
          controller: "home"
        })
        .state("view", {
          url:"/widget/:widgetId",
          templateUrl: "/tpls/viewWidget.tpl",
          controller: "view"
        })
        .state("new", {
          url:"/widget/new",
          templateUrl: "/tpls/addWidget.tpl",
          controller: "new"
        })
        .state("edit", {
          url:"/widget/:widgetId/edit",
          templateUrl: "/tpls/addWidget.tpl",
          controller: "edit"
        });
    });
})(angular)
