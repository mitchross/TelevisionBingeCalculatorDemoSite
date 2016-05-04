angular.module('tvbcLogViewerApp.reviews', [
        'ngRoute'
    ])
    //Was using heroku app endpoint, showing local host only
    .constant("APPLE_API", "https://itunes.apple.com/rss/customerreviews/id=583093664/json")

    .config(function ($routeProvider) {
        $routeProvider
            .when('/reviews' , {
                templateUrl: 'app/reviews/reviews.html'
            })
        ;
    })

    .factory('appleReviews', function ($http, $log, APPLE_API) {

        return {
            getReviews: function() {
                console.log("We made it to factory");

                return $http.get( APPLE_API);
            }

        };
    })




    .controller('AppleReviewController', function(
        $log,
        $scope,
        $http,
        LOGGER_API_ROOT,
        appleReviews)
    {

        $scope.loading = true;

        appleReviews.getReviews().then( function ( response )
        {
            console.log("We made it to getReviews() in controller");

            $scope.reviewData = response.data.feed.entry;
            $scope.loading = false;
        });
    });