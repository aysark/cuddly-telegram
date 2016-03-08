// we are just loading all the modules here...
(function(angular){
  angular.module("WidgetApp.Services", []); // creates the module
  // controller depends on the services, so below the service will be loaded first
  angular.module("WidgetApp.Controllers", ["WidgetApp.Services"]);

  angular.module("WidgetApp", ["ui.router", "WidgetApp.Controllers"]);
})(angular);
