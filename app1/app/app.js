define([
	'angular',
	'angularAMD',
	'angularRoute',
	'ngGrid'
	
	], function (angular,angularAMD,ngRoute,ngGrid) {
		 
   var app = angular.module("webApp", ['ngRoute','ngGrid']);
     // Setup app here. E.g.: run .config with $routeProvider

     app.config(function ($routeProvider) {
	    $routeProvider.when(
	        "/home",
	        angularAMD.route({
	            templateUrl: 'app/views/main.html',
	            controller: 'HomeController',
	            controllerUrl: 'controllers/main'
	        })
	    ) .otherwise({redirectTo: '/home'})
	});


app.directive('dirheader', function () {
        return {
            restrict: 'AEC',
            templateUrl : 'app/views/viewport/viewHeader.html'		
           /* scope: true,
            template: '<a href="{{fullpath}}" target="_blank">{{filename}}</a>',
            controller: function ($scope, $attrs) {
                var gh_root = "https://github.com/marcoslin/angularAMD/blob/master/www/",
                    relfile = $attrs.ghLink,
                    fullpath = gh_root + relfile;
                $scope.fullpath = fullpath;
                $scope.filename = relfile.replace(/^.*[\\\/]/, '');
            }*/
        };
    });
app.directive('dirfooter', function () {
        return {
            restrict: 'AEC',
            templateUrl : 'app/views/viewport/viewFooter.html'	
        };
    });


    return angularAMD.bootstrap(app);
});