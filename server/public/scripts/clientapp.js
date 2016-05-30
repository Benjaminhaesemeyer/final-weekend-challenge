var myApp = angular.module('myApp', ['ngRoute']);

myApp.config(['$routeProvider', function($routeProvider) {
  $routeProvider
    .when('/pets', {
      templateUrl: '/views/pets.html',
      controller: "PetsController"
    })
    .when('/faves', {
      templateUrl: '/views/faves.html',
      controller: "PetsController"
    })
    .otherwise({
    redirectTo: 'pets'
});

}]);
