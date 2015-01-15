/*
 * author : ashok vilvanathan - 395659
 * date :
 */

igniteApp.controller('ctrlAdminStudents', ['$scope','$resource','$timeout','ngTableParams','$filter','$rootScope','$http',
function($scope, $resource, $timeout, ngTableParams, $filter, $rootScope , $http) {
	
	$scope.moduleId = "ADMINSTUDENTS";
	$scope.dataLang = {		
		labels : {
			
			lblAddStudent  : "Add Student",
			lblEditStudent : "Edit Student",
			lblStdName     : "Student Name",
			lblDisplayName : "Display Name",
			lblGrade       : "Grade",
			lblExternalId  : "SIS ID",
			lblSuccessMsg  : "student added successfully",
			lblEditBtn     : "Edit",
			lblFormFirst   : "First Name",
			lblFormLastName: "Last Name",
			lblFormGrade   : "Grade",
			lblFormEmail   : "Email Address",
			lblFormMiddle  : "Middle Initial Or Name",
			lblFormComment : "Comment",
			lblFormTeachers: "Teachers",
			lblFormGender  : "Gender",
			lblFormMale    : "Male",
			lblFormFemale  : "Female",
			lblFormSelDist : "Select District",
			lblFormCancel  : "Cancel",
			lblFormOk      : "OK",
			lblFormRemove  : "Remove",
			lblMakeActBtn  : "Make Active",
			lblMakeInaBtn  : "Make Inactive",			
		},
		messages : {
			
			lblRemoeMsg    : "Are you sure you want to remove",
			lblFormValidMsg: "At least one of the required fields is blank.Please try again."
		}
	}
	$scope.activeData = [{
		status : "View All Active",
		inActive : false
	}, {
		status : "View All Inactive",
		inActive : true
	}];
	
	$scope.init = function() {
		$scope.student={};	
		$scope.student={
			LastName:'',
			FirstName:'',
			Email:'',
			MiddleName:'',
			Comment:'',
			DisplayName:'',
			ExternalId:'',
			TenantID:'',
			Gender:'',
			selectedDistrictCombo :{ 
				orgName:'',
			},
			selectedModalGradeCombo:{
				gradeName:'',
				gradeID:''
			}
		};
		
		$scope.initSettings();
		//$scope.doMakeStatus($scope.selectedStatus);
		//$scope.getMultiLingual();
		$scope.getStudentsListData();
		$scope.getAllGrades('');
		$scope.getAllDistrict();
	}
	$scope.initSettings=function(){
		$scope.selectedStatus = {
			status : "View All Active",
			inActive : false
		};
		$scope.searchText = '';		
		$scope.doMakeStatus();
	}
	$scope.doMakeStatus=function(rec){
		$scope.filterExpr = {
			inActive : $scope.selectedStatus.inActive
		};
		$scope.makeBtnLabel=$scope.selectedStatus.inActive==false?$scope.dataLang.labels.lblMakeInaBtn:$scope.dataLang.labels.lblMakeActBtn;
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
	$scope.getAllDistrict=function($defer,params){
		var thisData = "";
		var thisApi = $resource('http://10.237.178.169/xerox.ignite.services.rest/api/admin/districts');	
		thisApi.get('', function(data) {
			$timeout(function() {
				var thisData = data.result;
				$scope.districtCombo=thisData;
				$scope.student.selectedDistrictCombo={orgID:'',orgName:''};
			}, ($scope.modPainted) ? 0 : 500);
		});	
		
	}
	$scope.getTeachers=function(paramsObj){		
		var thisData = "";
		var thisApi = $resource('http://10.237.178.169/xerox.ignite.services.rest/api/admin/users/'+paramsObj.studentID),
		 params={type:'teacher'};		
		thisApi.get(params, function(data) {
			$timeout(function() {
				var teachObj={},
				    teachObj=data.result,
				    teachersValue="";
				for( i in teachObj){
					if((teachObj.length-1)==i)
						teachersValue+= (teachObj[i].lastName+ " "+teachObj[i].firstName);
					else{
						teachersValue+= (teachObj[i].lastName+ " "+teachObj[i].firstName)+", ";
					}	
				}
				$scope.student.teachers=teachersValue;
			}, ($scope.modPainted) ? 0 : 500);
		});
	}
	$scope.resetStudents=function(){
		$scope.student={};
		$scope.student.Email="";	
	}
	$scope.setStudentValues=function(gradeComboVal,rec){	
		var comboGradeName,comboID;		
		if($scope.selectedRecord){
			for(var i in gradeComboVal){				
				if(gradeComboVal[i].gradeID==$scope.selectedRecord.grade){
					$scope.student.selectedModalGradeCombo=gradeComboVal[i];
					comboGradeName=gradeComboVal[i].gradeName;
					comboID=gradeComboVal[i].gradeID;
				}
			}
		}
		
		$scope.student={
			LastName:rec.lastName,
			FirstName:rec.firstName,
			Email:rec.email,
			MiddleName:rec.middleName,
			Comment:rec.comment,
			DisplayName:rec.displayName,
			ExternalId:rec.externalId,
			TenantID:rec.TenantID,
			Gender:rec.gender,
			selectedDistrictCombo :{
				orgName:rec.districtName
			},
			selectedModalGradeCombo :{
				gradeName:comboGradeName,
				gradeID:comboID
			}				
		};		
		
	}
	$scope.getAllGrades=function(params,val){		
		$scope.resetStudents();
		var thisData = "";
		var thisApi = $resource('http://10.237.178.169/xerox.ignite.services.rest/api/admin/grades?type=student');	
		thisApi.get('', function(data) {
			$timeout(function() {
				var thisData = data.result;						
				if(params=="modal"){	
					thisData.splice(0,0,{gradeID:"",gradeName:'Select'});				
					$scope.gradesCombo=thisData;
					$scope.setStudentValues(data.result,val);	
				}else{
					
					thisData.splice(0,0,{gradeID:"",gradeName:'All Grades'});
					$scope.gradesCombo=thisData;				
					$scope.selectedGradeCombo=thisData[0];	
					$scope.setStudentValues('',thisData);	
				}		
			}, ($scope.modPainted) ? 0 : 500);
		});			
	}		
	$scope.getStudentsListData = function($defer, params) {		
		var thisData = "";
		var thisApi = $resource('http://10.237.178.169/xerox.ignite.services.rest/api/admin/students');		 		
		$scope.tableParams = new ngTableParams({
					page : 0,
					count:25,
					sorting : {
						name : 'asc'
					}
				}, {
					//total:0,
					getData : function($defer, params) {
						IgniteLoading.showLoadMask();
						var sortName,
						 	isAscending,
						 	gradeVal=($scope.selectedGradeCombo)?$scope.selectedGradeCombo.gradeName:'';
						 	
						for(var i in params.sorting()){
							sortName=(i=='name'?'lastName':i);
							isAscending=params.sorting()[i];	
						}		
						if(gradeVal){
							if(gradeVal=="k")
								gradeVal=1;
							else{
								gradeVal=Number(gradeVal)+1;
							}	
						}										
						 paramsObj={
						  	pageIndex:params.url().page?params.url().page-1:0,
						  	isactive:!$scope.selectedStatus.inActive,
						  	sortexpr:sortName?sortName:'lastName',
						  	isascending:isAscending?isAscending:'asc',
						  	grade:gradeVal,
						  	searchKey:$scope.searchText,
						  	type:'xerox',
						  	tenantid:0
					  };		  				
						thisApi.get(paramsObj, function(data) {
							
							$timeout(function() {
								var thisRawData = data,
								thisData = thisRawData.result, tableData, 
								len = thisRawData.result.length;
								$scope.studentData = thisData;	
								$scope.selectedRecord=	$scope.studentData[0];
								$scope.makeDisableMethod=($scope.selectedStatus.inActive && $scope.selectedRecord!="")?true:false;
								$scope.makeDisableRecords=($scope.selectedRecord!="")?false:true;
								//var orderedData = params.sorting() ? $filter('orderBy')(thisData, params.orderBy()) : thisData;
								params.total(data.totalPageCount);
								$defer.resolve(data);		
								$timeout(function() {	
									$(".IgTableCls  .table > tbody > tr").removeClass("rowSelectCls");						 
									 $(".IgTableCls  .table > tbody > tr:first").addClass("rowSelectCls");
									 IgniteLoading.hideLoadMask();
								 }, 1);	
						 		$scope.selectedStatus.isactive=!$scope.selectedRecord.inActive;	
								//$scope.doMakeStatus($scope.selectedRecord);						 		
							}, ($scope.modPainted) ? 0 : 500);
							
						},function(response) {
						    //404 or bad
						   	IgniteLoading.hideLoadMask();
						   	$scope.studentData = [];	
						   	params.total(0);
						   	$scope.makeDisableMethod=true;
							$scope.makeDisableRecords=true;
						   	$defer.resolve(	$scope.studentData);
						});
					}
				});
	}
	$scope.removeInactiveUser=function(params){	
		var thisData = "";		
		var thisApi = $resource('http://10.237.178.169/xerox.ignite.services.rest/api/admin/students/'+params.studentID);
		if($scope.selectedStatus.inActive){
				thisApi.delete('', function(data) {
				$timeout(function() {				
					$('#makeInActiveModal').modal('hide');
					$scope.tableParams.reload();				
				});
			});	
		}else{
			$http({
				method: 'PUT', 
				url: 'http://10.237.178.169/xerox.ignite.services.rest/api/admin/students/'+params.studentID, 
				params:{
					type:'restore'
				}
			}).
		      success(function(data, status) {	       
			        $('#makeInActiveModal').modal('hide');	
			        $scope.doRefresh();	        
		      }).
		      error(function(data, status) {
		        IgniteLoading.hideLoadMask();
		        $scope.resetStudents();
		    });
		}			
	}	
	$scope.onGradeComboClick = function($event, value) {
		$scope.selectedGradeCombo = value;
		$scope.makeBtnLabel=$scope.selectedStatus.inActive==false?$scope.dataLang.labels.lblMakeInaBtn:$scope.dataLang.labels.lblMakeActBtn;
		$scope.tableParams.reload();
	};
	//onGradeModalComboClick
	$scope.onGradeModalComboClick = function($event, value) {
		$scope.student.selectedModalGradeCombo = value;		
	};
	$scope.onStatusComboClick = function($event, value) {
		$scope.selectedStatus = value;
		$scope.makeBtnLabel=$scope.selectedStatus.inActive==false?$scope.dataLang.labels.lblMakeInaBtn:$scope.dataLang.labels.lblMakeActBtn;
		$scope.tableParams.reload();
	};	
	$scope.onDistrictComboClick = function($event, value) {
		$scope.student.selectedDistrictCombo=value;		
	};
	//onSearchKeyUp
	$scope.onSearchKeyUp = function(e) {
		if (e.keyCode == 13) {
			$scope.tableParams.reload();
		}
	};
	$scope.onClearSearch=function(e){		
			//$scope.userSearch = !$scope.userSearch;
			//$scope.searchText='';		
	};	
	$scope.onAddEditBtnClick = function(e, val) {		
		if(!$scope.selectedStatus.inActive){			
			if(e.target.id == "addStudentId"){
				$rootScope.mode=true;
				$scope.addMode=true;
				$scope.AddEditStudentLabel = $scope.dataLang.labels.lblAddStudent;
				$scope.addEditImageURL="images/Portal/Images/add_40.png";				
				$scope.resetStudents();
			}
			else{
				$rootScope.mode =  false;
				$scope.addMode=false;
				$scope.AddEditStudentLabel=$scope.dataLang.labels.lblEditStudent;
				$scope.addEditImageURL="images/Portal/Images/edit_40.png";
				$scope.getTeachers($scope.selectedRecord);
				$scope.getAllGrades('modal',$scope.selectedRecord);
			}
			$('#myStudentModal').modal('show');	
		}
	}
	$scope.changeSelection = function(user,$event) {		
		$(".IgTableCls table tr").removeClass("rowSelectCls");
		$($event.target).parent().addClass("rowSelectCls");
	    $scope.selectedRecord=user;
	};	
	$scope.onShowInactivePopup=function(){
		if(!$scope.selectedStatus.inActive){
			$('#makeInActiveModal').modal('show');			
		}else{
			$scope.removeInactiveUser($scope.selectedRecord);
		}
	}
	$scope.onInactiveClick=function(){	
		$scope.removeInactiveUser($scope.selectedRecord);
	}	
	$scope.doRequestPost=function(method,url,data){
		$http({
			method: method, 
			url: url, 
			data: data
		}).
	      success(function(data, status) {	       
	        $('#myStudentModal').modal('hide');	
	        $scope.doRefresh();	        
	      }).
	      error(function(data, status) {
	        IgniteLoading.hideLoadMask();
		        $scope.resetStudents();
	    });
	}
	$scope.doRequestPut=function(method,url,data){
		$http({
			method: method, 
			url: url, 
			params:{
				id:$scope.selectedRecord.studentID,
				type:'update'
			},
			data: data
		}).
	      success(function(data, status) {	       
	        $('#myStudentModal').modal('hide');	
	        $scope.doRefresh();	        
	      }).
	      error(function(data, status) {
	        IgniteLoading.hideLoadMask();
		        $scope.resetStudents();
	    });
	}
	//form validation
	$scope.onStudentSubmit = function() {		
		var formValid=$scope.studentForm.$valid,
			paramsObj={};		
			paramsObj=angular.copy($scope.student);
		
		if(formValid && (paramsObj.selectedModalGradeCombo) && (paramsObj.selectedDistrictCombo)){	
			paramsObj.Grade=$scope.student.selectedModalGradeCombo.gradeID;
			paramsObj.TenantID=	$scope.student.selectedDistrictCombo.orgID;
			delete paramsObj.selectedDistrictCombo;
			delete paramsObj.selectedModalGradeCombo;
			paramsObj.StudentID=$scope.addMode?0:$scope.selectedRecord.studentID;
			
			if($scope.addMode){
				paramsObj.tenantID=$scope.student.selectedDistrictCombo.tenantID;
				$scope.doRequestPost('POST','http://10.237.178.169/xerox.ignite.services.rest/api/admin/students',paramsObj,'myStudentModal');
			}else{
				paramsObj.tenantID=$scope.selectedRecord.tenantID;
				$scope.doRequestPut('PUT','http://10.237.178.169/xerox.ignite.services.rest/api/admin/students',paramsObj,'myStudentModal');
			}			
		}else{				
			$('#formMandatoryModal').modal('show');
		}
	}
	$scope.doOpenDropDown=function(e){
		
	}
	$scope.doRefresh=function(){
		$scope.initSettings();	
		$scope.selectedGradeCombo=$scope.gradesCombo[0];	
		$scope.tableParams.page(1);	
		$scope.tableParams.reload();
	}	
	$scope.loadDStudentsList = function() {
		$scope.dataLang.modName = "District Name in Spanish";
	}	
	$scope.init();
	
}]);
