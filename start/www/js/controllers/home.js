(function(angular){

  "use strict"

  controller.$inject = ["$scope", "widgets"];

  function controller($scope, widgets) {
    $scope.widget = {};

    widgets.getAll().then(function(results) {
      $scope.widgets = results.data;
    }).catch(function(err){
      console.dir(err);
    });

    $scope.setAddWidget = function() {
      $scope.addWidget = true;
    }
    $scope.saveWidget = function() {
      $scope.widgets.push($scope.widget);
      $scope.widget = {};
      $scope.addWidget = false;
    };
  }

  angular.module("WidgetApp.Controllers")
    .controller("home", controller);
})(angular);
