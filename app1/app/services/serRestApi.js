/*
 * author : ashok vilvanathan - 395659
 * date :
 */

'use strict'

igniteApp.factory("serRestApi", ['$http', '$resource', 'serAppLog', function($http, $resource, serAppLog) {

	this.doPOST = function(url, data, headers, cbSuccess, cbFailure) {
		$http({
			method : 'POST',
			url : url,
			data : data,
			headers : headers
		}).success(function(result, status, headers, config) {
			console.log('............................');			
			console.log('received data...............');
			console.log('............................');
			if(status == 200) {
				cbSuccess(result);
			} else {
				cbFailure(result, status, headers, config);
			}
		}).error(function(result, status, headers, config) {
			console.log('............................');	
			console.log('failure.....................');		
			console.log('received data...............');
			console.log('............................');
			cbFailure(result, status, headers, config);
		});
	};

	this.doGET = function(url, data, headers, cbSuccess, cbFailure) {
		$http({
			method : 'GET',
			url : url,
			data : data,
			headers : headers
		}).success(function(result, status, headers, config) {
			console.log('............................');
			console.log('success.....................');			
			console.log('received data...............');
			console.log('............................');
			console.log(status);
			if(status == 200) {
				cbSuccess(result);
			} else {
				cbFailure(result);
			}
		}).error(function(result, status, headers, config) {
			console.log('............................');			
			console.log('failure.....................');
			console.log('received data...............');
			console.log('............................');
			cbFailure(result, status, headers, config);
		}); 
	};
	
	this.doPUT = function(url, data, headers, cbSuccess, cbFailure) {
		$http({
			method: 'PUT',
			url: url,
			data: data,
			headers: headers
		}).success(function(result, status, headers, config) {
			console.log('............................');			
			console.log('received data...............');
			console.log('............................');
			if(status == 200) {
				cbSuccess(result);
			} else {
				cbFailure(result, status, headers, config);
			}
		}).error(function(result, status, headers, config) {
			console.log('............................');			
			console.log('received data...............');
			console.log('............................');
			cbFailure(result, status, headers, config);
		})
	}
	
	this.doDELETE = function(url, data, headers, cbSuccess, cbFailure) {
		$http({
			method : 'DELETE',
			url : url,
			data : data,
			headers : headers
		}).success(function(result, status, headers, config) {
			console.log('............................');			
			console.log('received data...............');
			console.log('............................');
			if(status == 200) {
				cbSuccess(result);
			} else {
				cbFailure(result, status, headers, config);
			}
		}).error(function(result, status, headers, config) {
			console.log('............................');			
			console.log('received data...............');
			console.log('............................');
			cbFailure(result, status, headers, config);
		});
	};
	
	return this;

}]);