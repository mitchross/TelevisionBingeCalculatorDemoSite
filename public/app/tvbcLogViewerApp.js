angular.module('tvbcLogViewerApp', [
    'ngRoute',
    'angularMoment',
    'tvbcLogViewerApp.loggerViewer',
    'tvbcLogViewerApp.androidreviews',
    'tvbcLogViewerApp.iosreviews'



     

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
