// bootstrap angular
(function(angular){

  document.addEventListener("DOMContentLoaded", function() {
    // manually bootstrap angular
    // use querySelector as it uses the CSS selector engine
    // this is what jquery really uses anyway..
    angular.bootstrap(document.querySelector("main"), ["WidgetApp"]);
  });
})(angular);
