/*
 * author : ashok vilvanathan - 395659
 * date :
 */'use strict'

igniteApp.factory("config", function() {

	var config = function(data) {
		angular.extend(this, data);
	};

	config.HOST = {
		'HOSTNAME' : 'http://127.0.0.1/ignite1.0/app/',		
		'DOCROOT' : 'C:/wamp/www/ignite1.0/app/',
		'HOSTREST' : 'http://10.237.178.169/xerox.ignite.services.rest/api/',
		'TESTDATAPATH' : 'http://127.0.0.1/ignite1.0/app/app/data/testdata/',
		'APPDATAPATH' : 'http://127.0.0.1/ignite1.0/app/app/data/appdata/'
	};

	config.RESTURLS = {
		'LANG_TEST' : 'dataLanguage.json',
		'ADMIN_USERS' : 'admin/users?districtId=-1&isActive=false&isAscending=true&pageIndex=0&sortExpr=FirstName',
		'ADMIN_SCHOOL' : 'api/admin/schools?pageId=1&isActive=true&sortExpr=OrgName&isAsc=true',
		'ADMIN_SCHOOL_SEARCH' : 'api/admin/schools?pageId=1&isActive=true&sortExpr=OrgName&isAsc=true',
		'ADMINS_CHOOL_ADD' : 'api/admin/schools?pageId=1&isActive=true&sortExpr=OrgName&isAsc=true',
		'ADMIN_SCHOOL_MODIFY' : 'api/admin/schools?pageId=1&isActive=true&sortExpr=OrgName&isAsc=true',
		'ADMIN_SCHOOL_DELETE' : 'api/admin/schools?pageId=1&isActive=true&sortExpr=OrgName&isAsc=true'
	};

	return config;
});