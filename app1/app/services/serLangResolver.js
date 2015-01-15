/*
 *
 */

igniteApp.factory('serLangResolver', ['$resource', 'config', 'serRestApi',
function($resource, config, serRestApi) {
	this.init = function() {

	}

	this.getLangData = function() {
		var thisData = "";

		var thisApi = $resource(config.HOST.TESTDATAPATH + config.RESTURLS.LANG_TEST);
		thisApi.query(function() {
			console.log(thisApi);
		});
	}

	this.resolveLangData = function() {

	}

	return this;
}]);
