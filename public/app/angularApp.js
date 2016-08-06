var todoApp = angular.module('todoApp', ['ngRoute']);

todoApp.config(function ($routeProvider) {
  $routeProvider
    .when('/home', {
      templateUrl: 'assets/app/views/home.html',
      controller: 'listController'
    })
    .when('/home/:id', {
      templateUrl: 'assets/app/views/home.html',
      controller: 'listController'
    })
    .otherwise({
      redirectTo: '/home'
    });
});
