/**
 * @author Arun
 */
igniteApp.controller('ctrlAdminLog', ['$scope', '$rootScope', '$http', '$filter', '$resource', '$timeout', 'ngTableParams',
function($scope, $rootScope, $http, $filter, $resource, $timeout, ngTableParams) {
	
	$scope.moduleId = "ADMINCLASSES";
	$scope.addLabelForSchool = "Add School";
	$scope.modifyStatus = "Add";
	$scope.addPopUpIconurl = "images/Portal/Images/add_40.png";
	
	$scope.addSchoolDisctrict = "";
	$scope.alertFor = "Fields";
	$scope.waringInfoAlert = "Are you sure";
	$scope.logSearchVal="";

	$scope.dataLang = {
		labels : {
			lblAddSchool : "Add School...",
			col1title:"Time",
			col1SortParam:"actiontime",
			col2title:"Source",
			col2SortParam:"source",
			col3title:"User",
			col3SortParam:"userid",
			col4title:"Event ID",
			col4SortParam:"eventid",
			col5title:"Data Type",
			col5SortParam:"datatype",
			col6title:"Action",
			col6SortParam:"action",
			col7title:"Record ID",
			col7SortParam:"recordid",
			col8title:"Data",
			col8SortParam:"data",
			logRefresh:"Refresh",
			logDownLoad:"Download",
			logFilter:"Filter",
			dateAsOf:"Data as of",
			filterPopUpLabel:"Filter"
		}
	};

$scope.sources=[{name:"Portal"}];
$scope.dataTypes=[{name:"AstModel"},{name:"Class"},{name:"Config"},{name:"GradedAssessment"},{name:"GradeItem"},{name:"Help"},{name:"Job"},{name:"Login"},{name:"Organization"},{name:"ReportProfile"},{name:"Scorebook"},{name:"Student"},{name:"Tenant"},{name:"User"},{name:"UserLogout"}];
$scope.actions=[{name:"Create"},{name:"Delete"},{name:"Retrieve"},{name:"Update"}];
	

	$scope.modPainted = false;

	$scope.init = function() {
		$scope.initSchoolsListGrid();
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
		
			$http({
			method : 'GET',
			url : 'http://10.237.178.169/xerox.ignite.services.rest/api/admin/auditlogs',
		}).success(function(data, status, headers, config) {
			$scope.lastupdateTime=data.result;

		}).error(function(data, status, headers, config) {
			
			// called asynchronously if an error occurs
			// or server returns response with an error status.
		});
		
		var thisData = "";

		var thisApi = $resource('http://10.237.178.169/Xerox.Ignite.Services.Rest/api/admin/Auditlogs?userTenantID=1&orgId=1085&beginDate=2014-01-20&endDate=2014-02-20&dataTypes=AsmtModel&actions=Create&sources=portal');
		IgniteLoading.showLoadMask();
		
		var sortBy = "";
		var sortOrder = "";
		for (i in params.parameters().sorting) {
			sortBy = i;
			sortOrder = params.parameters().sorting[i]
		}

		paramsObj = {
			pageIndex : params.url().page - 1,
			sortExpr : sortBy,
			isAscending : (sortOrder == "asc") ? true : false,
			isActive : 1,
			searchString : $scope.logSearchVal,
			

		}
		thisApi.get(paramsObj, function(data) {
			$timeout(function() {
				var thisRawData = data;
				var thisData = thisRawData.result;
				var thisDataTotal = thisRawData.totalPageCount;

				
				$scope.auditLog = thisData;
				params.total(thisDataTotal);
				$defer.resolve(thisData);
				$(".IgTableCls table tbody tr:first").addClass("rowSelectCls")
				//$scope.selecteRowSchoolName = $scope.tableParams.data[0].orgName;
				//$scope.selecteRowSchoolage = $scope.tableParams.data[0].orgName;
				 IgniteLoading.hideLoadMask();

			}, ($scope.modPainted) ? 0 : 500);
		},function(error) {
			IgniteLoading.hideLoadMask();
			$scope.auditLog = [];
			params.total(0);
			$defer.resolve($scope.schools);
			
		});
	}

	$scope.changeSelection = function(user) {
		console.log("hello")
		//$("#addSchoolModal input")[0].value=user.name;
		//$("#addSchoolModal input")[1].value=user.age;
	};
	$scope.showAddSchool = function() {
		//$('#addSchoolModal').modal('show');
	}
	$scope.logSearchClick=function(){
		$scope.tableParams.page(1)
		$scope.tableParams.reload();
	}
	$scope.onRefreshLog = function(val) {
		$scope.logSearchVal = "";
		$scope.tableParams.page(1)
		$scope.tableParams.reload();
	}
	$scope.showFilterModel=function(){
		$('#logFilterId').modal('show');
	}
	$scope.init();
}]); 