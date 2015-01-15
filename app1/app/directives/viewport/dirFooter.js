/*
 * author : ashok vilvanathan - 395659
 * date :
 */
angular.module('dirfooter', []).directive('dirfooter', function() {
	return {
		restrict : 'E',
		templateUrl : 'app/views/viewport/viewFooter.html',
		controller : 'ctrlFooter'
	}
});
