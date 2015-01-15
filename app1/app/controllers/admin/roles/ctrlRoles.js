/*
 * author : ashok vilvanathan - 395659
 * date :
 */

igniteApp.controller('ctrlAdminRoles', ['$scope','$resource','$timeout','ngTableParams','$filter','$rootScope','$http',
function($scope, $resource, $timeout, ngTableParams, $filter, $rootScope, $http) {
	
	$scope.moduleId = "ADMINROLES";
	$scope.dataLang = {		
		labels : {
			
			lblAddRole     : "Add Role",
			lblEditRole    : "Edit Role",
			lblRoleID      : "Role ID",
			lblRoleName    : "Role Name",
			lblRoleDesc    : "Role Description",
			lblDateCreate  : "Date of Creation",
			lblDistrict    : "District",
			lblRemoveRole  : "Remove Role",
			lblEditName    : "Edit",
			lblEditRole    : "Edit Role",
			lblSuccessMsg  : "Role added Succeddfully",
			lblOKBtn	   : "OK",
			lblCanceBtn    : "Cancel",
			lblSelectDist  : "Select District",
			lblDelConfirMsg: "Are you sure you want to delete the role",
		}
	}
	
	var thisData = "",thisApi;
	$scope.init = function() {		
	
		$scope.getRoleListData('http://10.237.178.169/xerox.ignite.services.rest/api/admin/roles');
		$scope.getAllDistrict('http://10.237.178.169/xerox.ignite.services.rest/api/admin/districts');	
		$scope.initSettings();		
	}
	$scope.initSettings=function(){
		$scope.searchText="";		
		$scope.makeDisableMethod=false;
	   	 if($filter('filter')($scope.roleData, $scope.filterExpr)==""){
	   	 	$scope.makeDisableMethod=true;
	   	 }
	}
	$scope.getRoleListData = function(url,$defer) {	
		$scope.validateRole('http://10.237.178.169/xerox.ignite.services.rest/api/admin/roles');
	}
	$scope.onStatusComboClick = function($event, value) {
		$scope.selectedStatus = value;
		$scope.filterExpr = {
			orgName : $scope.searchText,
			inActive : value.inActive
		};
		$scope.makeDisableMethod=false;
	   	 if($filter('filter')($scope.roleData, $scope.filterExpr)==""){
	   	 	$scope.makeDisableMethod=true;
	   	 }
	};
	$scope.getAllDistrict = function(url,$defer) {
		thisData = "";
		thisApi = $resource(url);		
		thisApi.get('', function(data) {
			$timeout(function() {
				var records=data;
				$scope.validateDistrict(data);			
			}, 50);
		});		
	}
	$scope.validateRole=function(url) {	
		var thisData = "";
		var thisApi = $resource(url);			
		
		thisApi.get('', function(data) {
			$timeout(function() {
				var records=data,				
				len = data.result.length;
				$scope.thisData = data.result;
				
			$scope.tableParams = new ngTableParams({
				page : 0,		
				count:len,			
				sorting : {
					roleID : 'asc'
				}
			}, {
				counts:[],				
				getData : function($defer, params) {
					IgniteLoading.showLoadMask();
					thisApi = $resource(url);
					var orderedData = params.sorting() ? $filter('orderBy')(data.result, params.orderBy()) : data.result;
		          		$scope.roleData=orderedData;  
		          		$scope.selectedRecord=	orderedData[0];
		          		$scope.makeDisableMethod=false;
					   	 if($filter('filter')($scope.roleData, $scope.filterExpr)==""){
					   	 	$scope.makeDisableMethod=true;
					   	 }		          		
					$timeout(function() {
						$(".IgTableCls  .table > tbody > tr").removeClass("rowSelectCls");							 
						 $(".IgTableCls  .table > tbody > tr:first").addClass("rowSelectCls");
						 IgniteLoading.hideLoadMask();
					 }, 1);	
					
				}
			});		
												
			}, 50);
		},function(data){
			
		});	
			
	}
	$scope.validateDistrict=function(data){		
		var comboValues=data.result;		
		comboValues.splice(0,0,{orgID:"",orgName:'All Districts'});
		$scope.allDistrictCombo=comboValues;
		$scope.selectedDistrict=$scope.allDistrictCombo[0];		
	}	
	$scope.onDistrictComboChange = function($event, value) {
		$scope.selectedDistrict = value;		
		$scope.filterExpr = {
			orgName : $scope.searchText,
			orgID : (value.orgID=="all")?'':value.orgID
		};
		$scope.makeDisableMethod=false;
	   	 if($filter('filter')($scope.roleData, $scope.filterExpr)==""){
	   	 	$scope.makeDisableMethod=true;
	   	 }
	};
	$scope.onSearchKeyDown = function(e, txt) {
		if (e.keyCode == 13) {
			$scope.filterExpr = {
				orgName : $scope.searchText,
				orgID : ($scope.selectedDistrict.orgID=="all")?'':$scope.selectedDistrict.orgID
			};
			$scope.makeDisableMethod=false;
		   	 if($filter('filter')($scope.roleData, $scope.filterExpr)==""){
		   	 	$scope.makeDisableMethod=true;
		   	 }
		}
	};	
	$scope.resetValues=function(){
		
	}
	$scope.loadInitRole=function(){
		$('#myRoleModal').modal('show');
	}
	$scope.onAddEditBtnClick = function(e, val) {	
		//$scope.resetValues();			
		if(e.target.id == "addDistrictId"){
			$rootScope.mode=true;
			$scope.AddEditRoleLabel = $scope.dataLang.labels.lblAddRole;
			$scope.addEditImageURL="images/add.png";				
		}
		else{
			$rootScope.mode =  false;
			$scope.AddEditRoleLabel=$scope.dataLang.labels.lblEditRole;
			$scope.addEditImageURL="images/edit_40.png";
			//$scope.getSelectedDist($scope.selectedRecord);
		}	
		//$scope.loadInitRole();									
	}
    $scope.changeSelection = function(user,$event) {  
    	  	
	    $(".IgTableCls table tr").removeClass("rowSelectCls");
		$($event.target).parent().addClass("rowSelectCls");
	    $scope.selectedRecord=user;
    };  
    $scope.doRefresh=function(){
    	$scope.selectedDistrict=$scope.allDistrictCombo[0];	
		$scope.initSettings();
		$scope.filterExpr = {
				orgName : $scope.searchText,
				orgID : ($scope.selectedDistrict.orgID=="all")?'':$scope.selectedDistrict.orgID
		};
		$scope.tableParams.sorting({roleID:'asc'})
		$scope.makeDisableMethod=false;
	   	 if($filter('filter')($scope.roleData, $scope.filterExpr)==""){
	   	 	$scope.makeDisableMethod=true;
	   	 }
	}
    $scope.doDeleteRole = function(params) {		
    	var roleID=$scope.selectedRecord.roleID;
		$http({
			method: params.method, 
			url: 'http://10.237.178.169/xerox.ignite.services.rest/api/admin/roles/'+roleID , 
			}).
	      success(function(data, status) {	        
		        $('#removeRoleModal').modal('hide');
		        $scope.initSettings();
		        $scope.doRefresh();
	      }).
	      error(function(data, status) {
	        
	    });
	} 
	$scope.doOpenDropDown=function(event){
		$(e.target).parent().addClass('open');
		event.preventDefault();
		//$( "#districtComboBtn" ).trigger( "click");
		//$('.').dropdown('show');			
	}   
    $scope.onRemoveRole=function(){    	
    	$scope.doDeleteRole({method:'DELETE'});
    }
	$scope.loadRoleList = function() {
		$scope.dataLang.modName = "Role Name in Spanish";
	}
	$scope.init();
	
}]);
