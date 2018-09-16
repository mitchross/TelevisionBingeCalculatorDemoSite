var express = require ('express');
var cors = require('cors');
var app = express();
var mongoose = require ('mongoose');
var morgan = require('morgan');             // log requests to the console (express4)
var bodyParser = require('body-parser'); // pull information from HTML POST (express4)
var methodOverride = require('method-override');
var xml2js = require('xml2js');
var https = require('https');
var request = require('request');
var et = require("elementtree");
var FeedParser = require('feedparser');
var moment = require('moment');
const gplay = require('google-play-scraper');
const path = require('path');
const qs = require('querystring');






//Could use mongolab endpoint, demo is limited to local host
//mongoose.connect('mongodb://localhost/searchesTest');
mongoose.connect('mongodb://vanillax:temp15@ds037262.mongolab.com:37262/tvbc_logger/Searches');

app.use( cors() );


app.use(express.static( 'public'));
app.set('views', "public/" );
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');


app.use(morgan('dev'));
app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json'}));
app.use(methodOverride());

var port = Number(process.env.PORT || 3000);

app.listen(port);
console.log("App listening on port:" + port);

//Model Object
var SearchTerm = mongoose.model('SearchTerm' , {
    text : String,
    time : String
});

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods: GET, POST , DELETE");
    next();
});

app.get('/', function(req,res){
    res.render('index.html');
});

//Routes
app.get('/api/searchterms', function( req , res ){

    SearchTerm.find(function(err , searchTerms){
        if (err )
        {
            res.send(err)
        }

        res.json(searchTerms);
    });



});

function parseXML( data , cb) {
    

    //do something
    var parseString = require('xml2js').parseString;

    parseString( data , function ( err , result ) {
        console.log( "made it to parse xml");
        console.log ( result )
        cb( result );
    });

}


app.get('/api/getiosreviews', function( req , res ){


    //var newUrl = 'https://itunes.apple.com/rss/customerreviews/id=583093664/sortBy=mostRecent/xml';

    var reqOptions = {
        host : "itunes.apple.com",
        path: "/rss/customerreviews/id=583093664/sortBy=mostRecent/xml",
        method: 'GET',
        headers: {
            'Accept': 'Accept: text/plain, */*; q=0.01',
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        }
    }



    var req = https.get(reqOptions, function (response) {
        var completeResponse = '';
        response.on('data', function (chunk) {
            completeResponse += chunk;
        });
        response.on('end', function() {
            console.log(completeResponse);
            // var data = JSON.parse(completeResponse)
            // res.send( data )

             data = parseXML( completeResponse , function ( parsed )
            {
                 res.send( parsed )
             });
            
             

        })
    }).on('error', function (e) {
        console.log('problem with request: ' + e.message);
    });


});

app.post('/api/searchterms', function(req , res) {


    var now = moment()
    var formatted = now.format('YYYY-MM-DD HH:mm:ss Z')
    console.log(formatted)

    SearchTerm.create({
        text: req.body.text,
        time: formatted,
        done: false
    }, function(err, searchTerm){
        if ( err )
        {
            res.send(err)
        }
        res.json( searchTerm )

    });
});

app.delete('/api/searchterms/:searchterm_id' , function ( req , res ) {

    SearchTerm.remove(
        {
        _id : req.params.searchterm_id
        },
        function(err, searchTerm)
        {
            if ( err )
            {
                res.send(err);
            }

            SearchTerm.find( function(err, searchTerms) {
                if ( err )
                {
                    res.send(err)
                }

                res.json( searchTerms );
            });
        });
});



/* Google Play */

function toList (apps) {
    return {results: apps};
}

function buildUrl (req, subpath) {
    return req.protocol + '://' + path.join(req.get('host'), req.baseUrl, subpath);
}

/* App reviews */
app.get('/apps/:appId/reviews', function (req, res, next) {
    function paginate (apps) {
        const page = parseInt(req.query.page || '0');

        const subpath = '/apps/' + req.params.appId + '/reviews/';
        if (page > 0) {
            req.query.page = page - 1;
            apps.prev = buildUrl(req, subpath) + '?' + qs.stringify(req.query);
        }

        if (apps.results.length) {
            req.query.page = page + 1;
            apps.next = buildUrl(req, subpath) + '?' + qs.stringify(req.query);
        }

        return apps;
    }
    console.log("we made it in ");

    const opts = Object.assign({appId: req.params.appId}, req.query);
    gplay.reviews(opts)
        .then(toList)
        .then(paginate)
        .then(res.json.bind(res))
        .catch(next);
});