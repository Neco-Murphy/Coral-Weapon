angular.module('shortly.savedRoutes', [])

.controller('SavedRoutesController', function ($scope, $window) {
  $scope.data = {runningRoutes: [] };
  fb.on("value", function(data) {
    var firebase = data.val();
    for(var key in firebase){
      var route = firebase[key];
      route.runningRoute = JSON.parse(route.runningRoute);
      $scope.data.runningRoutes.push( route );
    }
  });

  $scope.triggerMap = function(route){
    loadMap(route);
  }

});
