/*
 * author : ashok vilvanathan - 395659
 * date :
 */'use strict';

var igniteApp = angular.module('igniteApp', ['ngCookies', 'ngResource', 'ngSanitize', 'ngRoute', 'dirheader', 'dirfooter', 'ngTable']);

igniteApp.config(function($routeProvider) {
		$(".loadMask").hide();
	/* configure root providers */

	/* home, login & logout */
	$routeProvider.when('/login', {
		templateUrl : 'app/views/login/viewLogin.html',
		controller : 'ctrlLogin',
		resolve: {
			lang: function() {
				console.log('resolving...');
			} 			
		}
	})
	.when('/home', {
		templateUrl : 'app/views/main.html',
		controller : 'MainCtrl'
	})

	/* assessments */
	.when('/assessments', {
		templateUrl : 'app/views/assessments/viewAssessments.html',
		controller : 'ctrlAssessments'
	})

	/* score books */
	.when('/scorebook', {
		templateUrl : 'app/views/scorebook/viewScorebook.html',
		controller : 'ctrlScorebook'
	})

	/* reports */
	.when('/reports', {
		templateUrl : 'app/views/reports/viewReports.html',
		controller : 'ctrlReports'
	})

	/* administrator */
	.when('/admin', {
		templateUrl : 'app/views/admin/main.html',
		controller : 'ctrlAdminMain'
	})
	.when('/admin/districts', {
		templateUrl : 'app/views/admin/districts/viewDistricts.html',
		controller : 'ctrlAdminDistricts'
	})
	.when('/admin/schools', {
		templateUrl : 'app/views/admin/schools/viewSchools.html',
		controller : 'ctrlAdminSchools'
	})
	.when('/admin/classes', {
		templateUrl : 'app/views/admin/classes/viewClasses.html',
		controller : 'ctrlAdminClasses'
	})
	.when('/admin/students', {
		templateUrl : 'app/views/admin/students/viewStudents.html',
		controller : 'ctrlAdminStudents'
	})
	.when('/admin/users', {
		templateUrl : 'app/views/admin/users/viewUsers.html',
		controller : 'ctrlAdminUsers'
	})
	.when('/admin/roles', {
		templateUrl : 'app/views/admin/roles/viewRoles.html',
		controller : 'ctrlAdminRoles'
	})
	.when('/admin/sis', {
		templateUrl : 'app/views/admin/sis/viewSis.html',
		controller : 'ctrlAdminSis'
	})
	.when('/admin/log', {
		templateUrl : 'app/views/admin/log/viewLog.html',
		controller : 'ctrlAdminLog'
	})
	.when('/admin/system', {
		templateUrl : 'app/views/admin/system/viewSystem.html',
		controller : 'ctrlAdminSystem'
	})

	/* else */
	.otherwise({
		redirectTo : '/home'
	});
}); 

var IgniteLoading;
IgniteLoading = IgniteLoading || (function() {
        return {
                    showLoadMask : function() {
                                    $(".loadMask").show();
                                    $('.loadMask').css("height", $('body').outerHeight());
                    },
                    hideLoadMask : function() {

                                    $(".loadMask").hide();
                                    $('.loadMask').css("height", 0);
                    },
        };
})();
