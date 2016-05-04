angular.module('tvbcLogViewerApp', [
    'ngRoute',
    'tvbcLogViewerApp.loggerViewer',
    'tvbcLogViewerApp.reviews'
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
