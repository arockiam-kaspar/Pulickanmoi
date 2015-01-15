/*
 * author : ashok vilvanathan - 395659
 * date :
 */

igniteApp.controller('ctrlAdminDistricts', ['$scope','$resource','$timeout','ngTableParams','$filter','$rootScope','$http',
function($scope, $resource, $timeout, ngTableParams, $filter, $rootScope,$http) {
	
	$scope.moduleId = "ADMINDISTRICTS";
	$scope.dataLang = {		
		labels : {
			lblAddDist     : "Add District",
			lblEditDist    : "Edit District",
			lblCusIdDist   : "Customer ID",
			lblDistName    : "District Name",
			lblContName    : "Contact Name",
			lblZip         : "Zip",
			lblDelete      : "Permanantly Delete",
			lblMakeActBtn  : "Make Active",
			lblMakeInaBtn  : "Make Inactive",
			lblEditBtn     : "Edit",
			lblFormStatus  : "Status",
			lblFormAct     : "Active",
			lblFormInact   : "Inactive",
			lblFormAllow   : "Allow Logins",
			lblFormCustId  : "Customer ID Number",
			lblFormLang    : "Language",
			lblFormEmail   : "E-Mail",
			lblFormAdd     : "Address",
			lblFormCity    : "City",
			lblFormState   : "State",
			lblFormTime    : "Time Zone",
			lblFormCancel  : "Cancel",
			lblFormOk      : "OK",			
		},
		messages:{
			
			lblSuccessMsg  : "district added successfully",
			lblFormValidMsg: "At least one of the required fields is blank.Please try again.",
			lblDeleteMsg   : "Are you sure you want to delete",
			lblAssoDelMsg  : "All data associated with this district will also be deleted.",
			lblInactMsg    : "Are you sure you want to inactivate",
			lblAssoInacMsg : "All data associated with this will also be inactivated."
		}
	}
	$scope.activeDatas = [{
		status : "active",
		inActive : false
	}, {
		status : "Inactive",
		inActive : true
	}];
	//$scope.setVisible=false;
	$scope.init = function() {		
		$scope.dist={
			Status:"",
			allowLogins:"",
			customerId:"",
			OrgName:"",
			ContactName:"",
			Email:"",
			Address:"",
			City:"",
			Zip:"",
			State:"",
			tenantID:"",
			selectedLanguage:{
				timeZoneDisplayName:''
			},
			selectedTimeZone:{
				timeZoneDisplayName:''
			}
		};		
		
		$scope.initSettings();
		//$scope.getMultiLingual();
		$scope.getDistrictData();		
	}
	$scope.initSettings=function(){
		$scope.selectedStatus = {
			status : "active",
			inActive : false
		};
		$scope.makeDisableMethod=$scope.selectedStatus.inActive;
		$scope.makeBtnLabel=$scope.selectedStatus.inActive==false?$scope.dataLang.labels.lblMakeInaBtn:$scope.dataLang.labels.lblMakeActBtn;
		$scope.searchText = '';
		$scope.filterExpr = {
			inActive : $scope.selectedStatus.inActive
		};
		$scope.makeDisableForRecords=false;	
	   	 if($filter('filter')($scope.distRec, $scope.filterExpr)==""){
	   	 	$scope.makeDisableMethod=true;
	   	 	$scope.makeDisableForRecords=true;	
	   	 } 
	}
	$scope.getStates=function(){
		$('input.typeahead-devs').typeahead({
		  prefetch: {
			    url: 'http://10.237.178.169/xerox.ignite.services.rest/api/admin/states',
			    filter: function (response) {			    	
			        retval = [];
					for (var i = 0;  i < response.result.length;  i++) {
						retval.push(response.result[i].name);
					}
					return retval;					
			    },
			}		   
		}).on('typeahead:selected typeahead:autocompleted', function (obj, datum) {		   
		   $scope.dist.State=datum.value;
		});
	}
	$scope.getMultiLingual=function(){
		var thisData = "";
		var thisApi = $resource('app/controllers/admin/data/tempdata/manageDistrict.json');
		thisApi.get('', function(data) {
			$timeout(function() {
				$scope.setMultiLingual(data);
			}, ($scope.modPainted) ? 0 : 500);
		});
	}
	$scope.setMultiLingual=function(rec){
		$scope.dataLang = {		
			labels : {
				lblAddDist   : rec.lblAddDist,
				lblCusIdDist : rec.lblCusIdDist,
				lblDistName  : rec.lblDistName,
				lblContName  : rec.lblContName,
				lblZip       : rec.lblZip,
				lblDelete    : rec.lblDelete,
				lblMakeActBtn: rec.lblMakeActBtn,
				lblMakeInaBtn: rec.lblMakeInaBtn,
				lblEditBtn   : rec.lblEditBtn,
				lblFormStatus: rec.lblFormStatus,
				lblFormAct   : rec.lblFormAct,
				lblFormInact : rec.lblFormInact,
				lblFormAllow : rec.lblFormAllow,
				lblFormCustId: rec.lblFormCustId,
				lblFormLang  : rec.lblFormLang,
				lblFormEmail : rec.lblFormEmail,
				lblFormAdd   : rec.lblFormAdd,
				lblFormCity  : rec.lblFormCity,
				lblFormState : rec.lblFormState,
				lblFormTime  : rec.lblFormTime,
				lblFormCancel: rec.lblFormCancel,
				lblFormOk    : rec.lblFormOk			
			}
		}
	}
	$scope.getLanguage = function($defer, params) {
		var thisData = "";
		var thisApi = $resource('app/controllers/admin/data/tempdata/manageDistrict.json');
		thisApi.get('', function(rec) {
			$timeout(function() {
				$scope.allLanguages=rec.result;	
			}, ($scope.modPainted) ? 0 : 500);
		});
	}
	$scope.setTimeZone=function(){
		if($scope.selectedRecord){
			for(var i in $scope.allTimeZone){
				if($scope.allTimeZone[i].timeZoneID==$scope.selectedRecord.tenant.timeZoneID){
					$scope.dist.selectedTimeZone=$scope.allTimeZone[i];
				}
			}
		}		
	}
	$scope.getTimeZone = function() {
		var thisData = "";
		var thisApi = $resource('http://10.237.178.169/xerox.ignite.services.rest/api/admin/timezones');
		thisApi.get('', function(rec) {
			$timeout(function() {
				$scope.allTimeZone=rec.result;
				$scope.setTimeZone();				
			}, ($scope.modPainted) ? 0 : 500);
		});
	}
	$scope.doPOSTDistrict = function(methodObj,paramsObj) {		
		$http({
			method: methodObj.method, 
			url: 'http://10.237.178.169/xerox.ignite.services.rest/api/admin/districts',			
			data: paramsObj
		 }).
	      success(function(data, status) {
	        	$('#myDistrictModal').modal('hide');
	        	$scope.doRefresh();	
	      }).
	      error(function(data, status) {
	         IgniteLoading.hideLoadMask();
	    });
	}
	$scope.doPUTDistrict = function(methodObj,paramsObj,orgID) {		
		$http({
			method: methodObj.method, 
			url: 'http://10.237.178.169/xerox.ignite.services.rest/api/admin/districts/'+orgID, 
			params:{
				type:'update'
			},
			data: paramsObj
		 }).
	      success(function(data, status) {
	        	$('#myDistrictModal').modal('hide');
	        	$scope.doRefresh();	
	      }).
	      error(function(data, status) {
	         IgniteLoading.hideLoadMask();
	    });
	}
	$scope.getDistrictData = function($defer, params) {
		var thisData = "";
		var thisApi = $resource('http://10.237.178.169/xerox.ignite.services.rest/api/admin/districts');
			
		thisApi.get('', function(data) {
			$scope.distRec= (data.result);				
			var len = data.result.length;
			//params.total(len);
		    //$defer.resolve(data.result); 
			$scope.tableParams = new ngTableParams({
				page : 0,	
				count:len,							
				sorting : {
					tenantID : 'asc'
				}
			}, {				
				counts: [],					
				getData : function($defer, params) {	
						IgniteLoading.showLoadMask();						 					  
                  		 var orderedData = params.sorting() ? $filter('orderBy')(data.result, params.orderBy()) : data.result;                  		
                  		 $scope.distRec=orderedData;
                  		 $scope.selectedRecord=	data.result[0];
					 $timeout(function() {	
					 	 $(".IgTableCls  .table > tbody > tr").removeClass("rowSelectCls");						 
						 $(".IgTableCls  .table > tbody > tr:first").addClass("rowSelectCls");
						 IgniteLoading.hideLoadMask();
					 }, 1000);				
				}
			});

		},function(response){
			$scope.distRec = [];	
		   	params.total(0);
		   	$defer.resolve(	$scope.distRec);
		   	$scope.makeDisableMethod=((selectedStatus.inActive) || (!distRec))?true:false;
		   	$scope.makeDisableForRecords=false;	
		   	 if($filter('filter')($scope.distRec, $scope.filterExpr)==""){
		   	 	$scope.makeDisableMethod=true;
		   	 	$scope.makeDisableForRecords=true;	
		   	 }   	
		});
	}
	$scope.setDistForm=function(rec){
		
		if(rec.tenant.isAllowLogin){
			$('.allowInactive').removeClass('active');
			$('.allowActive').addClass('active'); 
		}else{
			$('.allowActive').removeClass('active'); 
			$('.allowInactive').addClass('active');
		}
		$scope.dist={
			Status:rec.inActive,
			allowLogins:rec.tenant.isAllowLogin,
			customerId:rec.tenantID,
			OrgName:rec.orgName,
			ContactName:rec.tenant.contactName,
			Email:rec.tenant.email,
			Address:rec.tenant.address,
			City:rec.tenant.city,
			Zip:rec.tenant.zip,
			State:rec.tenant.state,
			tenantID:rec.tenantID,
			selectedLanguage:{
				timeLanDisplayName:''
			}
		};
	}
	$scope.getSelectedDist=function(rec) {
		$scope.setDistForm(rec);		
	}	
	$scope.onStatusComboClick = function($event, value,cmp) {		
		$scope.selectedStatus = value;
		$scope.makeDisableMethod=$scope.selectedStatus.inActive;		
		$scope.filterExpr = {
			orgName : $scope.searchText,
			inActive : value.inActive
		};
		$scope.makeBtnLabel=$scope.selectedStatus.inActive==false?$scope.dataLang.labels.lblMakeInaBtn:$scope.dataLang.labels.lblMakeActBtn;
		$scope.makeDisableForRecords=false;	
	   	 if($filter('filter')($scope.distRec, $scope.filterExpr)==""){
	   	 	$scope.makeDisableMethod=true;
	   	 	$scope.makeDisableForRecords=true;	
	   	 } 
	};
	$scope.onLanguageComboClick=function($event, value){
		$scope.dist.selectedLanguage = value;
	}
	$scope.onTimeZoneComboClick=function($event, value){
		$scope.dist.selectedTimeZone = value;
	}
	//onSearchKeyUp
	$scope.onSearchKeyUp = function(e, txt) {
		if (e.keyCode == 13) {
			$scope.filterExpr = {
				orgName : $scope.searchText,
				inActive : $scope.selectedStatus.inActive
			};
		   	$scope.makeDisableMethod=false;
		   	$scope.makeDisableForRecords=false;	
		   	 if($filter('filter')($scope.distRec, $scope.filterExpr)==""){
		   	 	$scope.makeDisableMethod=true;
		   	 	$scope.makeDisableForRecords=true;	
		   	 }
		}
	};
	$scope.onClearSearch=function(e){		
			$scope.userSearch = !$scope.userSearch;
			$scope.searchText='';		
	};
	$scope.resetValues=function(){	
		$scope.dist={};
		$scope.dist.Email="";
		$scope.dist.selectedTimeZone={};
		$scope.allTimeZone="";
		$scope.dist.selectedLanguage={};
		if($('input[name=allowLogins]').parent().hasClass('active')){
			$('input[name=allowLogins]').parent().removeClass('active');
		}
	}	
	$scope.loadInitDist=function(){
		$scope.getLanguage();
		$scope.getTimeZone();
		$scope.getStates();
		$('#myDistrictModal').modal('show');
	}	
	$scope.onAddEditBtnClick = function(e, val) {	
		$scope.resetValues();	
		if(!$scope.selectedStatus.inActive){
			if(e.target.id == "addDistrictId"){
					$scope.addMode=true;
					$rootScope.mode=true;
					$scope.AddEditDistrictLabel = $scope.dataLang.labels.lblAddDist;
					$scope.addEditImageURL="images/Portal/Images/add_40.png";	
					$scope.tenantID=0;
					$scope.orgID=0;
					$scope.loadInitDist();								
			}
			else{
					$rootScope.mode =  false;
					$scope.addMode=false;
					$scope.AddEditDistrictLabel=$scope.dataLang.labels.lblEditDist;
					$scope.addEditImageURL="images/Portal/Images/edit_40.png";
					$scope.tenantID=$scope.selectedRecord.tenantID;
					$scope.orgID=$scope.selectedRecord.orgID;
					$scope.loadInitDist();
					$scope.getSelectedDist($scope.selectedRecord);
			}	
				
		}							
	}
	$scope.changeSelection = function(dist,$event) {
		$(".IgTableCls table tr").removeClass("rowSelectCls");
		$($event.target).parent().addClass("rowSelectCls");
	    $scope.selectedRecord=dist;
	};	
	//form validation
	$scope.onDistrictSubmit = function() {
		var formValid=$scope.districtForm.$valid,
			restObj={}
			paramsObj={},
			restObj=angular.copy($scope.dist),
		    selectedRadio = $('input[name=allowLogins]').filter(':checked').val();		    
		    restObj['IsAllowLogin']="";
			restObj.TimeZoneID=$scope.dist.selectedTimeZone.timeZoneDisplayName;//timeZoneID
			//restObj.language=$scope.dist.selectedLanguage.name;			
			 if(selectedRadio){
		    	 restObj['IsAllowLogin']=selectedRadio;
		    }
	    
			paramsObj =	{
			    State: null,//always
			    schools: {},//always
			    Tenant: {
			        TenantID: $scope.tenantID, // add/edit (0,custome iD number )
			        TenantName: restObj.OrgName, //District name
			        Email: restObj.Email,  //EmailID
			        Address: restObj.Address, // Address
			        City: restObj.City, // City
			        State: restObj.State, // State code 
			        Zip: restObj.Zip,// Zip value
			        Active: true,//always
			        CreatedDate: null,//always
			        ContactName: restObj.ContactName, // Contact name
			        TimeZoneID: restObj.TimeZoneID, // Timezone ID
			        IsAllowLogin: restObj['IsAllowLogin']
			    },
			     OrgID: $scope.orgID, // add/edit (0,givenByData)
			     ExternalID: null, // (always null)
			     OrgName: restObj.OrgName,
			     OrgType: 2, // add/edit(always)
			     ParentID: 0, // add/edit(always)
			     InActive: restObj.Status, // (true/false) based on Status checkbox selection 
			     TenantID: $scope.tenantID, //add/edit (0,custome iD number )
			     Classes: {}
		 };	   	      
		if(formValid ){
			var sentMethod='PUT';
			$scope.doPUTDistrict({method:sentMethod},paramsObj,$scope.orgID);	
			
			if($scope.addMode){
				sentMethod='POST';
				$scope.doPOSTDistrict({method:sentMethod},paramsObj);		
			}				
							
		}else{				
			
			$('#formMandatoryModal').modal('show');						
		}
	}	
	$scope.doRequest=function(method,url,modalName){		
		$http({
			method: method, 
			url: url, 
			params: {
				type:!$scope.selectedStatus.inActive?"inactive":"restore"
			}}).
	      success(function(data, status) {	       
		        $('#'+modalName).modal('hide');	
		        $scope.doRefresh();	        
	      }).
	      error(function(data, status) {
	         IgniteLoading.hideLoadMask();
	    });
	}
	$scope.doRefresh=function(){
		$scope.initSettings();
		$scope.tableParams.sorting({tenantID : 'asc'});		
	}
	$scope.onShowInactivePopup=function(){
		if(!$scope.selectedStatus.inActive){
			$('#makeInActiveModal').modal('show');			
		}else{
			$scope.onInactiveDistrict($scope.selectedRecord);
		}
	}
	$scope.onInactiveDistrict=function(){			
		var orgId=$scope.selectedRecord.orgID,
		    restoreStatus=!$scope.selectedStatus.inActive?'type="inactive"':'type=restore';
		    
		$scope.doRequest('PUT','http://10.237.178.169/xerox.ignite.services.rest/api/admin/districts/'+orgId,'makeInActiveModal');		
	}
	$scope.onDeleteDist=function(){
		var orgId=$scope.selectedRecord.orgID;
		$scope.doRequest('DELETE','http://10.237.178.169/xerox.ignite.services.rest/api/admin/districts/'+orgId,'permanentlyDeleteModal');
	}
	$scope.loadDistrictsList = function() {
		$scope.dataLang.modName = "District Name in Spanish";
	}
	
	$scope.init();
	
}]);
