'use strict';

require.config({
	
	paths: {
		angular: 'bower_components/angular/angular',
		angularRoute: 'bower_components/angular-route/angular-route',
		angularAMD: 'bower_components/angularAMD/angularAMD.min',
		jquery:'bower_components/jquery/dist/jquery.min',
        ngload: 'bower_components/angularAMD/ngload.min',       
        prettify: 'ower_components/angularAMD/prettify',
        ngGrid:'bower_components/ng-grid/ng-grid.min',
	},
	shim: {
		'angular': {
	      'deps': ['jquery'],
	      'exports': 'angular'
	    },
		'angularRoute': ['angular'],
		'angularAMD': ['angular'],
        'ngload': ['angularAMD'],
        'ngGrid':{
        	deps:['angular','jquery'],
        	exports: 'ngGrid'
        }
	},
	 deps: ['app']
});

/*define(['jquery'], function (jQuery) {
    return jQuery.noConflict( true );
});*/