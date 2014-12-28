var app = angular.module('codyApp',['ngRoute', 'ngSanitize']);


app.config(['$routeProvider', 
	function($routeProvider) {
	 // delete $httpProvider.defaults.headers.common["X-Requested-With"];
	  $routeProvider
	    .when('/home', {
	    	//templateUrl: 'http://codybartman.weebly.com/files/theme/images.html',
	    	controller: 'HomeController',
	    	templateUrl: 'partials/images.html',
	    })
	    .when('/3d-models', {
	    	//templateUrl: 'http://codybartman.weebly.com/files/theme/images.html',
	    	controller: 'ModelsController',
	    	templateUrl: 'partials/models.html',

	    })
	    .when('/photography',
	    {
	    	//templateUrl: 'http://codybartman.weebly.com/files/theme/images.html',
	    	controller: 'PhotographyController',
	    	templateUrl: 'partials/images.html',
	    })
	    .when('/2d-art', {
	    	//templateUrl: 'http://codybartman.weebly.com/files/theme/images.html',
	    	controller: 'ArtController',
	    	templateUrl: 'partials/images.html',
	    })
	    .when('/resume', {
	    	//templateUrl: 'http://codybartman.weebly.com/files/theme/resume.html',
	    	controller: 'ResumeController',
	    	templateUrl: 'partials/resume.html',
	    })
	    .when('/game', {
	    	controller: 'GameController',
	    	templateUrl: 'partials/game.html',
	    })
	    .otherwise ({ redirectTo: '/home' });
}]);




