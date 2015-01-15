/*
 * author : Arun 
 * date :
 */

igniteApp.controller('ctrlAdminClasses', ['$scope', '$rootScope', '$http', '$filter', '$resource', '$timeout', 'ngTableParams',
function($scope, $rootScope, $http, $filter, $resource, $timeout, ngTableParams) {
	$scope.actStatus = [{
		active:"View All Active",
		value:true
	}, {
		active:"View All InActive",
		value:false
		
	}
	];
	
	
	$scope.grades = [{
		active:"All Grades",
		value:null
	}, {
		active:"K",
		value:"K"
		
	},{
		active:"1",
		value:"1"
		
	},{
		active:"2",
		value:"2"
		
	},{
		active:"3",
		value:"3"
		
	},{
		active:"4",
		value:"4"
		
	}
	];
	$scope.schoolCombo = [{
		active:"All Schools",
		value:0
	}, {
		active:"Banton High school",
		value:"banton"
		
	}
	];
	$scope.moduleId = "ADMINCLASSES";
	$scope.addLabelForSchool = "Add School";
	$scope.modifyStatus = "Add";
	$scope.addPopUpIconurl = "images/Portal/Images/add_40.png";
	$scope.comboStatusVal = $scope.actStatus[0].active;
	$scope.comboGradeval=$scope.grades[0].active;
	$scope.comboSchoolval=$scope.schoolCombo[0].active;
	$scope.comboGradeKey=$scope.grades[0].value;
	$scope.comboSchoolKey=$scope.schoolCombo[0].value;
	$scope.addSchoolDisctrict = "";
	$scope.alertFor = "Fields";
	$scope.waringInfoAlert = "Are you sure";
	$scope.activeMode=true;

	$scope.dataLang = {
		labels : {
			lblAddClass : "Add Class...",
			addLabelForSchool:"Add School",
			editLabelForSchool:"Edit School",
			col1title:"Name",
			col1SortParam:"name",
			col2title:"Teacher",
			col2SortParam:"teachers",
			col3title:"Grade",
			col3SortParam:"grade",
			col4title:"Resource Class",
			col4SortParam:"resource",
			col5title:"Size",
			col5SortParam:"classsize",
			col6title:"Period",
			col6SortParam:"period",
			col7title:"Description",
			col7SortParam:"description",
			editSchoolbtn:"Edit",
			makeInActiveBtnlabel:"Make Inactive",
			makeActive:"Make Active",
			makeInactive:"Make Inactive",
			popLabelSchoolName:"School Name",
			popLabelSISID:"SIS ID",
			popLabelDist:"District",
			popLabelok:"OK",
			popLabelCancel:"Cancel",
			makeInactiveAlert:"Are you sure to you want to remove",
			makeInactiveAlertval:"? ",
		}
	};

	

	$scope.modPainted = false;

	$scope.init = function() {
		
		$scope.initSchoolsListGrid();
	}

	$scope.initSchoolsListGrid = function() {
		$scope.tableParams = new ngTableParams({
			page : 1,
			count : 25,
			sorting : {
				name : 'asc'
			}
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

		var thisApi = $resource('http://10.237.178.169/xerox.ignite.services.rest/api/admin/classes');
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
			searchKey : $scope.classSearchVal,
			orgID:$scope.comboSchoolKey,
			grade:$scope.comboGradeKey

		}
		thisApi.get(paramsObj, function(data) {
			$timeout(function() {
				var thisRawData = data;
				var thisData = thisRawData.result;
				var thisDataTotal = thisRawData.totalPageCount;

				
				$scope.classes = thisData;
				params.total(thisDataTotal);
				$defer.resolve(thisData);
				$timeout(function() {
				$(".IgTableCls table tbody tr:first").addClass("rowSelectCls");
				$scope.selecteRowClassName = $scope.tableParams.data[0].name;
				$scope.selecteRowClassID = $scope.tableParams.data[0].classID;
				$(".editClassCls").prop("disabled", false);
			
			$(".makeInactiveClassCls").prop("disabled", false);
				if(!$scope.activeMode){
			$(".editClassCls").prop("disabled",true);
			$scope.dataLang.labels.makeInActiveBtnlabel=$scope.dataLang.labels.makeActive;
		}
		else{
			$(".editClassCls").prop("disabled",false);
			$scope.dataLang.labels.makeInActiveBtnlabel=$scope.dataLang.labels.makeInactive;
		}
				},1);
				
				 IgniteLoading.hideLoadMask();

			}, ($scope.modPainted) ? 0 : 500);
		},function(error) {
			IgniteLoading.hideLoadMask();
			$scope.classes = [];
			params.total(0);
			$defer.resolve($scope.classes);
			$(".editClassCls").prop("disabled", true);
			
			$(".makeInactiveClassCls").prop("disabled", true);
		});
	}

	$scope.changeSelection = function(user, $event) {
		$scope.selecteRowClassName = user.name;
		$scope.selecteRowClassID = user.classID;

		$(".IgTableCls table tr").removeClass("rowSelectCls");
		$($event.target).parent().addClass("rowSelectCls")
		

	};
	
	$scope.editUsersPopUp = function() {
		if($scope.activeMode){
		$('#addUsersModal').modal('show');
		//$timeout(function() {

		$scope.addUserpopUpTitle = $scope.dataLang.labels.editLabelForUser;
		$scope.addUserPopUpIconurl = "images/Portal/Images/edit_40.png";
		}

		//}, 1);
	}
	
	
	
	$scope.comboSchoolChnage=function(val){
		$scope.comboSchoolval = val.active;
		$scope.comboSchoolKey=val.active;
		$scope.tableParams.page(1)
		$scope.tableParams.reload()
		
	}
	$scope.comboGradeChnage=function(val){
		$scope.comboGradeval = val.active;
		$scope.comboGradeKey=val.active;
		$scope.tableParams.page(1)
		$scope.tableParams.reload()
	
		
	}
	
	$scope.comboStatusChnage=function(val){
		$scope.comboStatusVal = val.active;
		$scope.activeMode=val.value;
		$scope.comboSchoolval = $scope.grades[0].active;
		
		$scope.comboGradeval = $scope.grades[0].active;
		
		$scope.comboGradeKey=$scope.grades[0].value;
	$scope.comboSchoolKey=$scope.schoolCombo[0].value;
		$scope.tableParams.page(1)
		$scope.tableParams.reload()
		if(!$scope.activeMode){
			$(".editClassCls").prop("disabled",true);
			$scope.dataLang.labels.makeInActiveBtnlabel=$scope.dataLang.labels.makeActive;
		}
		else{
			$(".editClassCls").prop("disabled",false);
			$scope.dataLang.labels.makeInActiveBtnlabel=$scope.dataLang.labels.makeInactive;
		}
	}
	
	
	$scope.makeInactivefn=function(){
		$('#makeInActiveModal').modal('show');
		$scope.makeInactiveMsg=$scope.dataLang.labels.makeInactiveAlert+" "+$scope.selecteRowClassName +" "+$scope.dataLang.labels.makeInactiveAlertval;
	}
	$scope.showAddSchool = function() {
		//$('#addSchoolModal').modal('show');
	}
	$scope.classSearchClick=function(){
		$scope.tableParams.page(1)
		$scope.tableParams.reload();
	}
	
	$scope.conformationOk=function(){
			$('#makeInActiveModal').modal('show');
		
		//make inActive service call
		IgniteLoading.showLoadMask();
		$http({
			method : 'PUT',
			url : 'http://10.237.178.169/xerox.ignite.services.rest/api/admin/classes',
			params : {
				isActive : $scope.activeMode,
				classid : $scope.selecteRowClassID
			}
		}).success(function(data, status, headers, config) {
			$('#makeInActiveModal').modal('hide');
			IgniteLoading.hideLoadMask();
			$scope.tableParams.page(1)
			$scope.tableParams.reload();

		}).error(function(data, status, headers, config) {
			$('#makeInActiveModal').modal('hide');
			IgniteLoading.hideLoadMask();
			// called asynchronously if an error occurs
			// or server returns response with an error status.
		});
	}
		$scope.onRefreshClasses = function(val) {
		
			$scope.comboStatusVal = $scope.actStatus[0].active;
			$scope.activeMode = $scope.actStatus[0].value;
			//$scope.userDistrictVal = $scope.DistrictCombo[0].orgName;
			//$scope.userDistrictKey = "-1";
			$scope.classSearchVal = "";
		
		$scope.tableParams.page(1)
		$scope.tableParams.reload();
	}
	$scope.init();
}]); 