var app = angular.module('codyApp',['ngRoute', 'ui.utils', 'ui.bootstrap']);

app.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider
      .when('/home', {
        controller: 'HomeController',
        templateUrl: 'partials/images.html',
      })
      .when('/3d-models', {
        controller: 'ModelsController',
        templateUrl: 'partials/images.html',
      })
/*      .when('/photography',
      {
        controller: 'PhotographyController',
        templateUrl: 'partials/images.html',
      }) */
      .when('/2d-art', {
        controller: 'ArtController',
        templateUrl: 'partials/images.html',
      })
      .when('/resume', {
        controller: 'ResumeController',
        templateUrl: 'partials/resume.html',
      })
      .when('/game', {
        controller: 'GameController',
        templateUrl: 'partials/images.html',
      })
      .when('/about', {
        templateUrl: 'partials/about.html',
      })

      .when('/edit', {
        controller: 'EditController',
        templateUrl: 'partials/edit.html'
      })
      .otherwise ({ redirectTo: '/home' });
}]);
