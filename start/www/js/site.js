(function(angular) {

	"use strict"; // best practice, applies certain features from ECMASCRIPT2015

	demoCtrl.$inject = ["$scope", "$http"];

	function demoCtrl($scope, $http) {
		$http.post("/api/widgets", {}).then(function() {
			return $http.get("/api/widgets");
		}).then(function(results) {
			$scope.widgets = results.data;
		}).catch(function(results){
			console.dir(results);
		});
	}

	angular.module("WidgetApp", [])
		.controller("DemoCtrl", demoCtrl);

})(angular);
