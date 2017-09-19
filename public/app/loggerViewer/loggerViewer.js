angular.module('tvbcLogViewerApp.loggerViewer', [
    'ngRoute'
])
    //Was using heroku app endpoint, showing local host only
    .constant("LOGGER_API_ROOT", "/api")

 .config(function ($routeProvider) {
        $routeProvider
            .when('/viewLogs' , {
                templateUrl: 'app/loggerViewer/loggerViewer.html'
            })
        ;
    })

    .factory('searches', function ($http, $log, LOGGER_API_ROOT) {

        return {
            getSearches: function() {
                console.log("We made it to factory");

                return $http.get( LOGGER_API_ROOT + '/searchterms');
            }

        };
    })




.controller('LoggerViewerController', function(
        $log,
        $scope,
        $http,
        LOGGER_API_ROOT,
        searches)
    {

        $scope.loading = true;

        searches.getSearches().then( function ( response )
        {
            console.log("We made it to getSearches() in controller");

            $scope.searchData = response.data;
            $scope.loading = false;
        });

        $scope.deleteSearchTerm = function( id )
        {
            $http.delete( LOGGER_API_ROOT +'/searchterms/' + id )
                .success( function (data)
                {
                    $scope.searchData = data;
                })
                .error ( function (data )
            {
                console.log('Error: ' + data);
            });
        };

    });