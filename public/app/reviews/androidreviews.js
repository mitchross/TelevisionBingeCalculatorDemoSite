angular.module('tvbcLogViewerApp.androidreviews', [
        'ngRoute',
        'angularMoment'
    ])


    .config(function ($routeProvider) {
        $routeProvider
            .when('/androidreviews' , {
                templateUrl: 'app/reviews/androidreviews.html'
            })
        ;
    })

    .factory('androidReviews', function ($http, $log) {

        return {
            getReviews: function() {
                console.log("We made it to factory");

                return $http.get( '/apps/com.meijer.mobile.meijer/reviews');
            }

        };
    })




    .controller('AndroidReviewController', function(
        $log,
        $scope,
        $http,
        androidReviews
    )
    {

        $scope.loading = true;

        androidReviews.getReviews().then( function ( response )
        {
            console.log("We made it to getReviews() in controller");
            $scope.reviewData = response.data.results;

            //
            //var entries = response.data.feed.entry;
            //$scope.reviewData = entries.splice(1, entries.length);
            $scope.loading = false;
        });
    });