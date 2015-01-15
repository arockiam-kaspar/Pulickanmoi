'use strict';

define(['angular'], function (angular) {

	/* Controllers */
	
	return angular.module('myApp')
		// Sample controller where service is being used
		.controller('MyCtrl1', ['$scope', 'version', function ($scope, version) {
			$scope.scopedAppVersion = version;
		}]);
});
