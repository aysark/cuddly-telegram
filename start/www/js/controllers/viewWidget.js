(function(angular){
  controller.$inject = ["$scope", "widgets", "$stateParams", "$state"];

  function controller($scope, widgets, $stateParams, $state) {
    widgets.get(parseInt($stateParams.widgetId, 10)).then(function(results){
      $scope.widget = results.data;
    }).catch(function(err){
      console.dir(err);
    });

    $scope.editWidget = function() {
      $state.go("edit");
    }
    $scope.returnHome = function() {
      $state.go("home");
    }

  }
  angular.module("WidgetApp.Controllers")
    .controller("view", controller);

})(angular)
