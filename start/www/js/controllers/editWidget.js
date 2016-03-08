(function(angular) {

  controller.$inject = ["$scope", "widgets", "$stateParams", "$state"];

  function controller($scope, widgets, $stateParams, $state) {
    if ($stateParams.widgetId) {
      widgets.get(parseInt($stateParams.widgetId, 10)).then(function(results){
        $scope.widget = results.data;
      }).catch(function(err){
        console.dir(err);
      });
    } else {
      $scope.widget = {};
    }

    $scope.returnHome = function() {
      $state.go("home");
    }

    $scope.saveWidget = function() {
      if ($stateParams.widgetId) {
        widgets.update($scope.widget).then(function() {
          $state.go("home")
        });
      } else {
        widgets.new($scope.widget).then(function() {
          $state.go("home")
        });
      }
    };

    $scope.deleteWidget = function() {
      if (confirm("Are you really sure?")) {
        widgets.delete($stateParams.widgetId).then(function(){
          $state.go("home");
        });
      }
    };
  }

  angular.module("WidgetApp.Controllers")
    .controller("edit", controller)

})(angular)
