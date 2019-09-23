
const fetch = require("node-fetch");

//can store anything here to export
var stuff = {};


//Request an external endpoint for data
//Receive response data of external endpoint
//Return it
//Use the returned data, only if it is available

// Fetch a random joke
async function fetchQuote() {
  const rsp = await fetch( "https://api.icndb.com/jokes/random" ),
        data = await rsp.json();
  return data.value.joke;
}

//Async call
async function sayJokeAsync()
{
  try {
    //waits for aync to finish
    let result = await fetchQuote();
    
    //test data that the function is working
    console.log("say joke func async: " + result)

    //return result to the calling function
    return result;
  } catch( err ) {
    console.error( err );
  }
}


//test not needed
//reference model for resolving a promise using then
function getJoke() {
    //call back goes to ".then" for processing
  sayJokeAsync().then((joke) => {
    //testing that the function works
    console.log("say joke promise resolved:" + joke)

    //you can store stuff 
    stuff.myJoke = joke;
  })
}




//Test function
function hello2(s) {
    if ( s )
    {
        console.log(s)
    }
    else{
    console.log("hello world2");
    }
}

//export functions
module.exports = { hello2, getJoke, sayJokeAsync, stuff };

