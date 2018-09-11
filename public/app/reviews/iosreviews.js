angular.module('tvbcLogViewerApp.iosreviews', [
        'ngRoute',
        'angularMoment'
    ])

    .constant("LOGGER_API_ROOT", "/api")

    .config(function ($routeProvider) {
        $routeProvider
            .when('/iosreviews' , {
                templateUrl: 'app/reviews/iosreviews.html'
            })
        ;
    })

    .factory('appleReviews', function ($http, $log, LOGGER_API_ROOT) {

        return {
            getReviews: function() {
                console.log("We made it to factory");

                return $http.get( LOGGER_API_ROOT + '/getiosreviews');
            }

        };
    })




    .controller('AppleReviewController', function(
        $log,
        $scope,
        $http,
        LOGGER_API_ROOT,
        appleReviews
        )
    {

        $scope.loading = true;

        appleReviews.getReviews().then( function ( response )
        {
            console.log("We made it to getReviews() in controller");
            var entries = response.data.feed.entry;
            $scope.reviewData = entries.splice(1, entries.length);
            $scope.loading = false;
        });
    });