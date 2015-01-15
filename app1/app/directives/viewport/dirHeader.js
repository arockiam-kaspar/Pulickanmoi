/*
 * author : ashok vilvanathan - 395659
 * date :
 */

define(['angular'],function(angular){
	console.log(angular)
	angular.module('dirHeader').directive('dirheader',function(){
		return{
			restrict : 'E',
			templateUrl : 'app/views/viewport/viewHeader.html'
		};
	});
});