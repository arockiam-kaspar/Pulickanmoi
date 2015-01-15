/**
 * @author Arun
 */igniteApp.controller('ctrlAdminUsers', ['$scope', '$rootScope', '$http', '$filter', '$resource', '$timeout', 'ngTableParams',
function($scope, $rootScope, $http, $filter, $resource, $timeout, ngTableParams) {
	$scope.users = [{
		active : "View All Active",
		value : true
	}, {
		active : "View All InActive",
		value : false

	}];
$(".notificationAlert").hide();
	$scope.moduleId = "ADMINUSERS";
	$scope.userDistrictKey = "-1";
	

	$scope.addUserPopUpIconurl = "images/Portal/Images/add_40.png";
	$scope.password = "P@ssw0rd";
	$scope.conformPassword = "P@ssw0rd";
	$scope.afterValidation = true;
	$scope.initialPage = false;
	$scope.addEditDistval = "";
	$scope.addEditRoleval = "Select";

	$scope.dataLang = {
		labels : {
			lblAddUser : "Add User...",
			searchPlaceholder : "Search",
			addLabelForUser : "Add User",
			editLabelForUser : "Edit User",
			col1title : "User ID",
			col1SortParam : "Email",
			col2title : "First Name",
			col2SortParam : "FirstName",
			col3title : "Last Name",
			col3SortParam : "LastName",
			col4title : "Roles Assigned",
			col4SortParam : "RolesAssigned",
			col5title : "District",
			col5SortParam : "DistrictName",
			editSchoolbtn : "Edit",
			changePassWord : "Change User Password...",
			changePasswordTitle : "Change Password",
			makeInActiveBtnlabel : "Make Inactive",
			makeActive : "Make Active",
			makeInactive : "Make Inactive",

			popLabelSchoolName : "School Name",

			popLabelDist : "District",
			popLabelok : "OK",
			popLabelCancel : "Cancel",
			addPopupLabelEmail : "E-MailID/UserID",
			addPopupLabelLName : "Last Name",
			addPopupLabelFName : "First Name",
			addPopupLabelAddress : "Address",
			addPopupLabelCity : "City",
			addPopupLabelState : "State",
			addPopupLabelZip : "Zip",
			addPopupLabelDistrict : "District",
			addPopupLabelPassword : "Password",
			addPopupLabelVerifyPass : "Verify Password",
			addPopupLabelRole : "Role",
			addPopupLabelSISID : "SIS ID",
			addPopupLabelSelectSchool : "Select Schools",
			addPopupLabelSave : "Save",
			makeInactiveAlert : "Are you sure to you want to remove",
			makeInactiveAlertval : "? ",
			passwordChangeInfo1:"Password for ",
			passwordChangeInfo2:"changed successfully"
		}
	};
	$scope.addUserpopUpTitle = $scope.dataLang.labels.addLabelForUser;
	$scope.modPainted = false;
	$scope.activeMode = true;
	$scope.init = function() {
		$scope.initSchoolsListGrid();
		$scope.initRoleListGrid();
		$(".digitChar").hide();
		$(".lowerChar").hide();
		$(".upperChar").hide();
		$(".eightChar").hide();
		$(".passNotMach").hide();
		$scope.userStatusVal = $scope.users[0].active;
		$http({
			method : 'GET',
			url : 'http://10.237.178.169/xerox.ignite.services.rest/api/admin/districts',
			params : {
				isActive : !$scope.activeMode
			}
		}).success(function(data, status, headers, config) {
			console.log(data);
			$scope.DistrictCombo = data.result
			$scope.DistrictCombo.splice(0, 0, {
				"orgName" : "All Districts",
				"orgID" : "-1"
			});
			$scope.userDistrictVal = $scope.DistrictCombo[0].orgName;
		}).error(function(data, status, headers, config) {
			// called asynchronously if an error occurs
			// or server returns response with an error status.
		});

		//Add/Edit Popup Screen District

		$http({
			method : 'GET',
			url : 'http://10.237.178.169/xerox.ignite.services.rest/api/admin/districts',
			params : {
				isActive : !$scope.activeMode
			}
		}).success(function(data, status, headers, config) {

			$scope.addEditDist = data.result

			$scope.addEditDistval = "";
		}).error(function(data, status, headers, config) {
			// called asynchronously if an error occurs
			// or server returns response with an error status.
		});

		$('input.typeahead-devs').typeahead({
		  prefetch: {
			    url: 'http://10.237.178.169/xerox.ignite.services.rest/api/admin/states',
			    filter: function (response) {
			    	console.log(response);
			        retval = [];
			        console.log(response);			       
					for (var i = 0;  i < response.result.length;  i++) {
						retval.push(response.result[i].name);
					}
					return retval;					
			    },
			}		   
		}).on('typeahead:selected typeahead:autocompleted', function (obj, datum) {		   
		   $scope.dist.selectedStatedState=datum.value;
		});

	}

	$scope.initRoleListGrid = function() {
		$scope.roleTableParams = new ngTableParams({
			page : 1,
			counts : [],
		}, {
			total : 0,
			groupBy : 'role',
			getData : function($defer, params) {

				$scope.roleList = [{
					name : "Moroni",
					age : 50,
					role : 'Administrator'
				}, {
					name : "Tiancum",
					age : 43,
					role : 'Administrator'
				}, {
					name : "Jacob",
					age : 27,
					role : 'Administrator'
				}, {
					name : "Nephi",
					age : 29,
					role : 'Moderator'
				}, {
					name : "Enos",
					age : 34,
					role : 'User'
				}, {
					name : "Tiancum",
					age : 43,
					role : 'User'
				}, {
					name : "Jacob",
					age : 27,
					role : 'User'
				}, {
					name : "Nephi",
					age : 29,
					role : 'Moderator'
				}, {
					name : "Enos",
					age : 34,
					role : 'User'
				}, {
					name : "Tiancum",
					age : 43,
					role : 'Moderator'
				}, {
					name : "Jacob",
					age : 27,
					role : 'User'
				}, {
					name : "Nephi",
					age : 29,
					role : 'User'
				}, {
					name : "Enos",
					age : 34,
					role : 'Moderator'
				}, {
					name : "Tiancum",
					age : 43,
					role : 'User'
				}, {
					name : "Jacob",
					age : 27,
					role : 'User'
				}, {
					name : "Nephi",
					age : 29,
					role : 'User'
				}, {
					name : "Enos",
					age : 34,
					role : 'User'
				}];

				$defer.resolve($scope.roleList);

			}
		});
		$scope.roleResultTableParams = new ngTableParams({
			page : 1,
			counts : [],
		}, {
			total : 0,

			getData : function($defer, params) {

				$scope.usersSub = [];

				$defer.resolve($scope.usersSub);

			}
		});

	}

	$scope.initSchoolsListGrid = function() {
		var restObj = {};
		restObj[$scope.dataLang.labels.col2SortParam] = 'asc';
		$scope.tableParams = new ngTableParams({
			page : 1,
			count : 25,
			sorting : restObj
		}, {
			total : 0,
			getData : function($defer, params) {
				$scope.getSchoolsListData($defer, params);
				$scope.modPainted = true;
				if ($scope.initialPage) {
					params.url().page = 1;
				}

			}
		});
	}

	$scope.getSchoolsListData = function($defer, params) {
		var thisData = "";

		var thisApi = $resource('http://10.237.178.169/xerox.ignite.services.rest/api/admin/users');
		//var thisApi = $resource('app/data/testdata/users.json');
		IgniteLoading.showLoadMask();

		var sortBy = "";
		var sortOrder = "";
		for (i in params.parameters().sorting) {
			sortBy = i;
			sortOrder = params.parameters().sorting[i]
		}

		paramsObj = {
			pageIndex : params.url().page - 1,
			isActive : !$scope.activeMode,
			sortExpr : sortBy,
			isAscending : (sortOrder == "asc") ? true : false,
			searchString : $scope.userSearchVal,
			districtId : $scope.userDistrictKey

		}
		thisApi.get(paramsObj, function(data) {
			$timeout(function() {
				var thisRawData = data;
				var thisData = thisRawData.result;
				var thisDataTotal = thisRawData.totalPageCount;

				//thisData = params.filter() ? $filter('filter')(thisData, params.filter()) : thisData;
				$scope.schools = thisData
				params.total(thisDataTotal);
				$defer.resolve(thisData);
				$(".editUserCls").prop("disabled", false);
				$(".ChangePassUserCls").prop("disabled", false);
				$(".makeInactiveCls").prop("disabled", false);
				$timeout(function() {
					$(".IgTableCls table tbody tr:first").addClass("rowSelectCls");
					$scope.selecteRowSchoolName = $scope.tableParams.data[0].userInformation.userName;
					$scope.selecteRowUserId = $scope.tableParams.data[0].userInformation.userID;
					$scope.selecteRowFirstName = $scope.tableParams.data[0].userInformation.firstName;
					$scope.selecteRowLastName = $scope.tableParams.data[0].userInformation.lastName;
					
				}, 1);

				IgniteLoading.hideLoadMask();

			}, ($scope.modPainted) ? 0 : 500);
			$scope.initialPage = false;
		}, function(error) {
			IgniteLoading.hideLoadMask();
			$scope.schools = [];
			params.total(0);
			$defer.resolve($scope.schools);
			$(".editUserCls").prop("disabled", true);
			$(".ChangePassUserCls").prop("disabled", true);
			$(".makeInactiveCls").prop("disabled", true);
		});

	}

	$scope.userDistrictChnage = function(val) {
		$scope.userDistrictVal = val.orgName;
		$scope.userDistrictKey = val.orgID;
		$scope.initialPage = true;
		$scope.tableParams.page(1)
		$scope.tableParams.reload();

	}

	$scope.userStatusChnage = function(val) {

		$scope.initialPage = true;
		$scope.userStatusVal = val.active;
		$scope.activeMode = val.value;
		$scope.userDistrictVal = $scope.DistrictCombo[0].orgName;
		$scope.userDistrictKey = "-1";
		if (!$scope.activeMode) {
			$(".editUserCls").prop("disabled", true);
			$(".ChangePassUserCls").prop("disabled", true);
			$scope.dataLang.labels.makeInActiveBtnlabel = $scope.dataLang.labels.makeActive;

		} else {
			$(".editUserCls").prop("disabled", false);
			$(".ChangePassUserCls").prop("disabled", false);
			$scope.dataLang.labels.makeInActiveBtnlabel = $scope.dataLang.labels.makeInactive;
		}
		$scope.tableParams.page(1)
		$scope.tableParams.reload();
		$http({
			method : 'GET',
			url : 'http://10.237.178.169/xerox.ignite.services.rest/api/admin/districts',
			params : {
				isActive : !$scope.activeMode
			}
		}).success(function(data, status, headers, config) {
			console.log(data);
			$scope.DistrictCombo = data.result
			$scope.DistrictCombo.splice(0, 0, {
				"orgName" : "All Districts",
				"orgID" : "-1"
			});
			$scope.userDistrictVal = $scope.DistrictCombo[0].orgName;
			$scope.userDistrictKey = "-1";
		}).error(function(data, status, headers, config) {
			// called asynchronously if an error occurs
			// or server returns response with an error status.
		});
	}
	$scope.userSearchClick = function(val) {

		$scope.initialPage = true;
		$scope.tableParams.page(1)
		$scope.tableParams.reload();
	}

	$scope.changeSelection = function(user, $event) {
		$scope.selecteRowSchoolName = user.userInformation.userName;
		$scope.selecteRowUserId = user.userInformation.userID;
		$scope.selecteRowFirstName = user.userInformation.firstName;
		$scope.selecteRowLastName = user.userInformation.lastName;
		$(".IgTableCls table tr").removeClass("rowSelectCls");
		$($event.target).parent().addClass("rowSelectCls")

	};
	$scope.addUsersPopUp = function() {
		$('#addUsersModal').modal('show');
		//$timeout(function() {

		$scope.addUserpopUpTitle = $scope.dataLang.labels.addLabelForUser;
		$scope.addUserPopUpIconurl = "images/Portal/Images/add_40.png";

		//}, 1);
	}
	$scope.userSeacrhKeyPress = function(val) {
		//console.log(val)
	}
	$scope.editUsersPopUp = function() {
		if ($scope.activeMode) {
			$('#addUsersModal').modal('show');
			//$timeout(function() {

			$scope.addUserpopUpTitle = $scope.dataLang.labels.editLabelForUser;
			$scope.addUserPopUpIconurl = "images/Portal/Images/edit_40.png";
		}

		//}, 1);
	}
	$scope.changePassword = function() {
		$('#changePasswordModal').modal('show');
		//$timeout(function() {

		$scope.changePasswordText = $scope.dataLang.labels.changePasswordTitle;

		//}, 1);
	}
	$scope.userPasswordchange = function(val) {

		var validated = true;

		if (!/\d/.test(val) && !/[@\!#\$\^%&*()+=\-[\]\\\';,\.\/\{\}\|\":<>\? ]/.test(val)) {
			validated = false;
			$(".digitChar").show();
		} else {
			$(".digitChar").hide();
		}
		if (!/[a-z]/.test(val)) {
			validated = false;
			$(".lowerChar").show();
		} else {
			$(".lowerChar").hide();
		}
		if (!/[A-Z]/.test(val)) {
			validated = false;
			$(".upperChar").show();
		} else {
			$(".upperChar").hide();
		}

		if (val.length < 8) {
			validated = false;
			$(".eightChar").show();
		} else {
			$(".eightChar").hide();

		}
		if ($scope.password != $scope.conformPassword) {
			validated = false;
			$(".passNotMach").show();
		} else {
			$(".passNotMach").hide();
		}
		$scope.afterValidation = !validated;
		
		if(validated){
			
		
		}

	}

	$scope.makeInActiveFn = function() {
		$('#makeInActiveModal').modal('show');
		//$timeout(function() {
		$(".alertCancel").show();
		$scope.waringInfoAlert = $scope.dataLang.labels.makeInactiveAlert + " " + $scope.selecteRowSchoolName + " " + $scope.dataLang.labels.makeInactiveAlertval;
		//}, 1);
	}
	$scope.onRefreshUser = function(val) {
		if (!val) {
			$scope.userStatusVal = $scope.users[0].active;
			$scope.activeMode = $scope.users[0].value;
			$scope.userDistrictVal = $scope.DistrictCombo[0].orgName;
			$scope.userDistrictKey = "-1";
			$scope.userSearchVal = "";
		}
		$scope.tableParams.page(1)
		$scope.tableParams.reload();
	}

	$scope.addEditSubmit = function() {

		if (!$scope.addEditForm.$valid || !$scope.addEditDistval) {
			alert("any fields are required")
		}
	}
	$scope.addEditDistChange = function(user) {
		$scope.addEditDistval = user.orgName;
$scope.selectSchool=[{name:"All School"},{name:"First School"},{name:"Second School"}];
	}

	$scope.addEditRoleChange = function(user) {
		$scope.addEditRoleval = user.orgName;
	}
	$scope.onAddRole = function() {
		$scope.usersSub.push({
			name : $scope.addEditRoleval
		})
	}
	$scope.conformationOk = function() {

		$('#makeInActiveModal').modal('show');
		
		//make inActive service call
		IgniteLoading.showLoadMask();
		$http({
			method : 'DELETE',
			url : 'http://10.237.178.169/xerox.ignite.services.rest/api/admin/users',
			params : {
				isActive : $scope.activeMode,
				id : $scope.selecteRowUserId
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

	}
	
	$scope.passwordChange=function(){
		
			$http({
			method : 'PUT',
			url : 'http://10.237.178.169/xerox.ignite.services.rest/api/admin/users/'+$scope.selecteRowUserId+'/security',
			data : {
				type : "change",
				password : $scope.password
			}
		}).success(function(data, status, headers, config) {
			$('#changePasswordModal').modal('hide');
			IgniteLoading.hideLoadMask();
		$(".notificationAlert").show();
		$scope.notificationMsg = $scope.dataLang.labels.passwordChangeInfo1+" "+$scope.selecteRowFirstName +" " +$scope.selecteRowLastName +" "+$scope.dataLang.labels.passwordChangeInfo2
		$timeout(function() {
			$(".notificationAlert").hide();
		}, 10000);

		}).error(function(data, status, headers, config) {
			$('#changePasswordModal').modal('hide');
			IgniteLoading.hideLoadMask();
			$(".notificationAlert").show();
			$scope.notificationMsg = data.validations[0].message
		$timeout(function() {
			$(".notificationAlert").hide();
		}, 10000);
			// called asynchronously if an error occurs
			// or server returns response with an error status.
		});
			
		
	}
	$scope.selectSchoolChange=function(name,val){
		
		console.log(name,val)
	}
	$scope.notificationClose=function(){
		$(".notificationAlert").hide();
	}

	$scope.init();
}]);
