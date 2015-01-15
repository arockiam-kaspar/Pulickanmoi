define(['app','ngGrid'], function (app,ngGrid) {
    app.controller('HomeController', function ($scope, $window) {
        $scope.title = "angularAMD";

        $scope.myData = [{name: "Moroni", age: 50},
                 {name: "Tiancum", age: 43},
                 {name: "Jacob", age: 27},
                 {name: "Nephi", age: 29},
                 {name: "Enos", age: 34}];
        $scope.gridOptions = { data: 'myData' };



        console.log('openGitPage',ngGrid);
        $scope.openGitHubPage = function () {
            //console.log("trackEvent: ViewGitHub");
           // $window._gaq.push(['_trackEvent', 'angularAMD', 'ViewGitHub', 'Clicked on View on GitHub button']);
            //$window.open("https://github.com/marcoslin/angularAMD", "_blank");
        };
    });
}); 