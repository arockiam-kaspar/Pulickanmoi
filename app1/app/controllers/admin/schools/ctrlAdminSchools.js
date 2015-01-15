/*
 * author : Arun 
 * date :
 */

igniteApp.controller('ctrlAdminSchools', ['$scope', '$rootScope', '$http', '$filter', '$resource', '$timeout', 'ngTableParams',
function($scope, $rootScope, $http, $filter, $resource, $timeout, ngTableParams) {
	$scope.users = [{
		active : "View All Active",
		value : true
	}, {
		active : "View All InActive",
		value : false

	}];
	$scope.moduleId = "ADMINSCHOOLS";
	$scope.addLabelForSchool = "Add School";
	$scope.modifyStatus = "Add";
	$scope.addPopUpIconurl = "images/Portal/Images/add_40.png";
	$scope.comboDisplayVal = $scope.users[0].active;
	$scope.addSchoolDisctrict = "";
	$scope.alertFor = "Fields";
	$scope.waringInfoAlert = "Are you sure";
	$(".notificationAlert").hide();
	$scope.loginUserID = 1;
	$scope.updateMethods = "POST";
	$scope.notificationInfo = "Add"

	$scope.dataLang = {
		labels : {
			lblAddSchool : "Add School...",
			addLabelForSchool : "Add School",
			editLabelForSchool : "Edit School",
			col1title : "Name",
			col1SortParam : "OrgName",
			editSchoolbtn : "Edit",
			makeInActiveBtnlabel : "Make Inactive",
			makeActive : "Make Active",
			makeInactive : "Make Inactive",
			popLabelSchoolName : "School Name",
			popLabelSISID : "SIS ID",
			popLabelDist : "District",
			popLabelok : "OK",
			popLabelCancel : "Cancel",
			fieldValidationAlert : "Atleast one field of the required fields is blank Please try again",
			makeInactiveAlert : "Are you sure to you want to inactivate",
			makeInactiveAlertval : "? All the classes associated with this school will also be inactivated",
			addSchoolNotification : "Are you sure you want to add this school?",
			editSchoolNotification : "Are you sure you want to modify this school?",
			successAdd : "was successfully Added",
			successEdit : "was successfully Updated"
		}
	};

	$scope.modPainted = false;

	$scope.init = function() {
		$scope.initSchoolsListGrid();
		$scope.activeMode = true;

		$http({
			method : 'GET',
			url : 'http://10.237.178.169/xerox.ignite.services.rest/api/admin/districts'
		}).success(function(data, status, headers, config) {
			
			$scope.DistrictCombo = data.result
			//$scope.DistrictCombo.splice(0,0,{"orgName":"All Districts","orgID":"ALL"});
			//$scope.userDistrictVal = $scope.DistrictCombo[0].orgName;
		}).error(function(data, status, headers, config) {
			// called asynchronously if an error occurs
			// or server returns response with an error status.
		});
	}

	$scope.initSchoolsListGrid = function() {

		var restObj = {};
		restObj[$scope.dataLang.labels.col1SortParam] = 'asc';

		$scope.tableParams = new ngTableParams({
			page : 1,
			count : 25,
			sorting : restObj
		}, {
			total : 0,
			getData : function($defer, params) {
				$scope.getSchoolsListData($defer, params);
				$scope.modPainted = true;
			}
		});
	}

	$scope.getSchoolsListData = function($defer, params) {
		var thisData = "";

		var thisApi = $resource('http://10.237.178.169/xerox.ignite.services.rest/api/admin/schools/');
		IgniteLoading.showLoadMask();
		var sortBy = "";
		var sortOrder = "";
		for (i in params.parameters().sorting) {
			console.log(params.parameters())
			sortBy = i;
			sortOrder = params.parameters().sorting[i]
		}

		paramsObj = {
			pageIndex : params.url().page - 1,
			isActive : $scope.activeMode,
			sortExpr : sortBy,
			isAsc : (sortOrder == "asc") ? true : false,
			type : 'adminschools'
		}
		thisApi.get(paramsObj, function(data) {
			$timeout(function() {
				var thisRawData = data;
				var thisData = thisRawData.result;
				var thisDataTotal = thisRawData.totalPageCount;

				thisData = params.filter() ? $filter('filter')(thisData, params.filter()) : thisData;
				$scope.schools = thisData;
				params.total(thisDataTotal);
				$defer.resolve(thisData);
				$(".editSchoolCls").prop("disabled", false);
			$(".makeInActiveBtnlabel").prop("disabled", false);
				$timeout(function() {
					$(".IgTableCls table tbody tr:first").addClass("rowSelectCls");
					$scope.selecteRowSchoolName = $scope.tableParams.data[0].orgName;
					$scope.selecteRowSchoolId = $scope.tableParams.data[0].orgID;
					$scope.selecteRowDistrictName = $scope.tableParams.data[0].districtName;
					$scope.selecteRowdistrictID = $scope.tableParams.data[0].districtID;
					$scope.externalID = $scope.tableParams.data[0].externalID;
				}, 1);

				IgniteLoading.hideLoadMask();

			}, ($scope.modPainted) ? 0 : 500);
		}, function(error) {
			IgniteLoading.hideLoadMask();
			$scope.schools = [];
			params.total(0);
			$defer.resolve($scope.schools);
			$(".editSchoolCls").prop("disabled", true);
			$(".makeInActiveBtnlabel").prop("disabled", true);
		});
	}

	$scope.addSchoolpopup = function() {
		$('#addSchoolModal').modal('show');
		$timeout(function() {

			$scope.addLabelForSchool = $scope.dataLang.labels.addLabelForSchool;
			$scope.addPopUpIconurl = "images/Portal/Images/add_40.png";
			$scope.addSchoolNamefield = "";
			$scope.addSchoolSisfield = "";
			$scope.addSchoolDistfield = "";
			$scope.addPopUpStatus = "Add";

		}, 1);
	}
	$scope.editSchoolpopup = function() {
		if ($scope.activeMode) {
			$('#addSchoolModal').modal('show');
			$timeout(function() {

				$scope.addLabelForSchool = $scope.dataLang.labels.editLabelForSchool
				$scope.addPopUpIconurl = "images/Portal/Images/edit_40.png";
				$scope.addSchoolNamefield = $scope.selecteRowSchoolName;
				$scope.addSchoolSisfield = $scope.externalID;
				$scope.addSchoolDistfield = $scope.selecteRowDistrictName;
				$scope.districtID = $scope.selecteRowdistrictID;
				$scope.addPopUpStatus = "Edit";

			}, 1);
		}
	}
	$scope.changeSelection = function(user, $event) {

		$scope.selecteRowSchoolName = user.orgName;
		$scope.selecteRowSchoolId = user.orgID;
		$scope.selecteRowDistrictName = user.districtName;
		$scope.selecteRowdistrictID = user.districtID;
		$scope.externalID = user.externalID;
		$scope.updateMethods = "PUT";

		$(".IgTableCls table tr").removeClass("rowSelectCls");
		$($event.target).parent().addClass("rowSelectCls");

	};
	$scope.showAlert = function() {
		$(".notificationAlert").show();
		$timeout(function() {
			$(".notificationAlert").hide();
		}, 10000);
	}
	$scope.comboChnage = function(user) {

		$scope.comboDisplayVal = user.active;
		$scope.activeMode = user.value;
		if (!$scope.activeMode) {
			$(".editSchoolCls").prop("disabled", true);
			$scope.dataLang.labels.makeInActiveBtnlabel = $scope.dataLang.labels.makeActive;
		} else {
			$(".editSchoolCls").prop("disabled", false);
			$scope.dataLang.labels.makeInActiveBtnlabel = $scope.dataLang.labels.makeInactive;
		}
		$scope.tableParams.page(1)
		$scope.tableParams.reload();
	};
	$scope.comboDistrictChange = function(user) {
		$scope.addSchoolDistfield = user.orgName;
		$scope.districtID = user.orgID;
		$scope.tenantID = user.tenantID;
	}

	$scope.selectionboxClk = function(sel) {
		console.log(sel.srcElement)
	}
	$scope.rootFolders = "";
	$scope.addPopCall = function() {

		if (!$scope.addSchoolNamefield || !$scope.addSchoolDistfield) {
			$('#makeInActiveModal').modal('show');
			$scope.notificationInfo ="info"

			$(".alertCancel").hide();
			$scope.waringInfoAlert = $scope.dataLang.labels.fieldValidationAlert;

		} else {

			$('#makeInActiveModal').modal('show');
			$(".alertCancel").show();
			$scope.waringInfoAlert = $scope.dataLang.labels.addSchoolNotification;
			$scope.notificationInfo = "Add";

			if ($scope.addPopUpStatus == "Edit") {
				$scope.waringInfoAlert = $scope.dataLang.labels.editSchoolNotification;
				$scope.notificationMsg = $scope.addSchoolNamefield+" "+ $scope.dataLang.labels.successEdit

			} else {
				$scope.waringInfoAlert = $scope.dataLang.labels.addSchoolNotification;
				$scope.notificationMsg = $scope.addSchoolNamefield+" "+ $scope.dataLang.labels.successAdd
			}

		}

	}
	$scope.makeInActiveFn = function() {
		$('#makeInActiveModal').modal('show');
		$scope.notificationInfo = "Make";
		$(".alertCancel").show();
		$scope.waringInfoAlert = $scope.dataLang.labels.makeInactiveAlert + " " + $scope.selecteRowSchoolName + " " + $scope.dataLang.labels.makeInactiveAlertval;

	}
	$scope.conformationOk = function() {
		$('#makeInActiveModal').modal('hide');
		
		if ($scope.notificationInfo == "Make") {
			IgniteLoading.showLoadMask();
			$http({
				method : 'PUT',
				url : 'http://10.237.178.169/xerox.ignite.services.rest/api/admin/schools/' + $scope.selecteRowSchoolId,
				params : {
					type : $scope.activeMode ? "inactive" : "restore",

				}
			}).success(function(data, status, headers, config) {
				$('#makeInActiveModal').modal('hide');
				IgniteLoading.hideLoadMask();
				$scope.onRefreshUser(true);

			}).error(function(data, status, headers, config) {
				$('#makeInActiveModal').modal('hide');
				IgniteLoading.hideLoadMask();
				// called asynchronously if an error occurs
				// or server returns response with an error status.
			});
		} else if ($scope.notificationInfo == "Add") {
			var paramsObj = {
				"DistrictID" : $scope.districtID,
				"OrgName" : $scope.addSchoolNamefield,
				"TenantID" : $scope.tenantID,
				"OrgType" : 1,
				"ExternalID" : $scope.addSchoolSisfield,
				"OrgID" : $scope.selecteRowSchoolId
			}

			$http({
				method : $scope.updateMethods,
				url : 'http://10.237.178.169/xerox.ignite.services.rest/api/admin/schools',
				data : paramsObj
			}).success(function(data, status, headers, config) {
				$scope.showAlert();

				$('#addSchoolModal').modal('hide');
				$scope.addSchoolSisfield = "";
				$scope.addSchoolNamefield = "";
				$scope.addSchoolDistfield = "";
				$scope.onRefreshUser();
				//$scope.DistrictCombo.splice(0,0,{"orgName":"All Districts","orgID":"ALL"});
				//$scope.userDistrictVal = $scope.DistrictCombo[0].orgName;
			}).error(function(data, status, headers, config) {
				$scope.showAlert();

				$('#addSchoolModal').modal('hide');
				$scope.notificationMsg = data
				// called asynchronously if an error occurs
				// or server returns response with an error status.
			});

		}

	}
	$scope.onRefreshUser = function() {
		$scope.comboDisplayVal = $scope.users[0].active;
		$scope.activeMode = $scope.users[0].value;

		$scope.tableParams.page(1)
		$scope.tableParams.reload();
	}
	$scope.notificationClose=function(){
		$(".notificationAlert").hide();
	}

	$scope.init();
}]);
