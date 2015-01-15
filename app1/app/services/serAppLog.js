/*
 * 
 */

igniteApp.factory('serAppLog', function() {
	
	this.logFrontend = function(dataLog) {
		console.log('............................');
		console.log('making restful call.........');
		console.log('received data...............');
		console.log(dataLog);
		console.log('............................');
	};
	
	this.logBackend = function() {
		// for logging to the backend.
	}
	
	return this;
});
