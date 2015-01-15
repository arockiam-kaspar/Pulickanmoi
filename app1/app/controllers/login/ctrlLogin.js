/*
 * author : ashok vilvanathan - 395659
 * date :
 */

'use strict'

igniteApp.controller('ctrlLogin', ['$scope', '$rootScope', '$location', function($scope, $rootScope, $location) {
	
	$scope.isLogged = true;
	
	$scope.init = function() {
		$rootScope.$broadcast('bcInitModuleLogin');
		
		console.log('controller...');
	};
	
	$scope.doLogin = function() {
		$scope.isLogged = true;		
		$scope.onLoginSuccess();
	};
	
	$scope.doLogut = function() {
		$scope.isLogged = false;
		$scope.onLoginSuccess();		
	}
	
	$scope.onLoginSuccess = function() {		
		$rootScope.$broadcast('bcLoginSuccess');
		var lsDummyData = {
			isLogged : true,
			user : 'Ashok',
			dataLogged : new Date()
		};
		lsDummyData = JSON.stringify(lsDummyData);
		localStorage.setItem('lsDummyData', lsDummyData);
		console.log(localStorage);
		
		$location.path('/home');
	}
	
	$scope.onLoginFailure = function() {
		$rootScope.$broadcast('bcLogoutSuccess');
		$location.path('/');
	}
	
	$scope.init();
}]);
