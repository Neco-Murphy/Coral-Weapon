angular.module('y.todo', []);

angular
  .module('y.todo')
  .controller('TodoCtrl', function ($scope, $window, $http) {
    'use strict';

    $http
      .post('http://localhost:8000/api/auth/local', {email:'admin@admin.com', password:'admin'})
      .then(function(data){
        console.log('logged in ', data);
      })

    $scope.todos = JSON.parse($window.localStorage.getItem('todos') || '[]');
    $scope.$watch('todos', function (newTodos, oldTodos) {
      if (newTodos !== oldTodos) {
        $window.localStorage.setItem('todos', JSON.stringify(angular.copy($scope.todos)));
      }
    }, true);

    $scope.add = function () {
      var todo = {label: $scope.label, isDone: false};
      $scope.todos.push(todo);
      $window.localStorage.setItem('todos', JSON.stringify(angular.copy($scope.todos)));
      $scope.label = '';
    };

    $scope.check = function () {
      this.todo.isDone = !this.todo.isDone;
    };
  });


angular.module('y', [
  'ngRoute',
  'y.todo'
])
.config(function ($routeProvider) {
  'use strict';
  $routeProvider
    .when('/todo', {
      controller: 'TodoCtrl',
      templateUrl: '/y/todo/todo.html'
    })
    .otherwise({
      redirectTo: '/todo'
    });
});

(function(module) {
try {
  module = angular.module('y');
} catch (e) {
  module = angular.module('y', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/y/todo/todo.html',
    '<h3>Todo</h3><ul class="todo-list"><li class="todo-item" ng-repeat="todo in todos" ng-class="{\'todo-done\': todo.isDone}"><label><input type="checkbox" ng-click="check()" ng-model="todo.isDone">&nbsp;{{todo.label}}</label></li><li class="todo-item"><form ng-submit="add()"><input placeholder="New item..." ng-model="label"> <button type="submit" ng-disabled="posting || !label">Add</button></form></li></ul>');
}]);
})();
