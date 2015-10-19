# TelevisionBingeCalculatorDemoSite
Personal project to learn a little NodeJS and Angular

#Requirements
* Mongodb
* NodeJS
* NPM
* Bower

#Getting started
* Start Mongo ( ie, "sudo mongod" if on osx )
* Start the app, "cd Server" then run " node server.js"
* Open Browser and point to "http://localhost:3000"

#Adding data
* POST
* curl -XPOST -H "Content-type: application/json" -d '{"text":"testing1"}' 'http://localhost:3000/api/searchterms'

# Get Data
* GET
* curl -XGET -H "Content-type: application/json" 'http://localhost:3000/api/searchterms'
