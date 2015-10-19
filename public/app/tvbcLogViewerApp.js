angular.module('tvbcLogViewerApp', [
    'ngRoute',
    'tvbcLogViewerApp.loggerViewer',
    'tvbcLogViewerApp.scratchPad'
])
.config(function($routeProvider){

        $routeProvider
            .when('/menu', {
                templateUrl: 'app/menu.html'
            })
            .otherwise({
                redirectTo: '/menu'
            })
        ;
    });
