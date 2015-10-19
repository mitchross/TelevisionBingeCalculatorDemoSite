angular.module('tvbcLogViewerApp.scratchPad', [
    'ngRoute'
])

.config(function ($routeProvider) {
        $routeProvider
            .when('/scratchPad' , {
                templateUrl: 'app/scratchPad/scratchPad.html'
            })
        ;
    })

.controller('ScratchPadController' , function (
        $scope)
    {

    }
);

