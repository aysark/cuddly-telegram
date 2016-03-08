(function(angular){
  "use strict";

  service.$inject = ["$http"];

  function service($http) {
    return {
      getAll: function() {
        return $http.get("/api/widgets");
      },
      get: function(id) {
        return $http.get("/api/widgets/"+encodeURIComponent(id));
      },
      delete: function(id) {
        return $http.delete("/api/widgets/"+encodeURIComponent(id));
      },
      new: function(widget) {
        return $http.post("/api/widgets", widget); // automatically serialized to JSON
      },
      update: function(id, widget) {
        return $http.update("/api/widgets/"+encodeURIComponent(id), widget);
      }
    };
  }

  angular.module("WidgetApp.Services")
    .factory("widgets", service);
})(angular);
