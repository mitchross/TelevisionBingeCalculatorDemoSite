var express = require ('express');
var cors = require('cors');
var app = express();
var mongoose = require ('mongoose');
var morgan = require('morgan');             // log requests to the console (express4)
var bodyParser = require('body-parser'); // pull information from HTML POST (express4)
var methodOverride = require('method-override');

//Could use mongolab endpoint, demo is limited to local host
mongoose.connect('mongodb://localhost/searchesTest');

app.use( cors() );


app.use(express.static( '../public'));
app.set('views', "../public/" );
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
    text : String
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

app.post('/api/searchterms', function(req , res) {

    SearchTerm.create({
        text: req.body.text,
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