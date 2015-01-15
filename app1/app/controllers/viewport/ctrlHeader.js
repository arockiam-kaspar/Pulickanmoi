/*
 * author : ashok vilvanathan - 395659
 * date :
 */

'use strict'

igniteApp.controller('ctrlHeader', ['$scope',  function($scope) {
	
	$scope.showHeader = true;
	$scope.showMainNav = true;
	$scope.dataLang = {};
	
	$scope.init = function() {
		$scope.$on('bcInitModuleLogin', function() {
			$scope.showHeader = true;
			$scope.showMainNav = false;
		});
	};
	
	$scope.$on('bcLoginSuccess', function() {
		$scope.showHeader = true;
		$scope.showMainNav = true;
	});
	
	$scope.$on('bcLogoutSuccess', function() {
		$scope.showHeader = false;
		$scope.showMainNav = false;
	});
	
	$scope.init();
}]);
