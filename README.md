# TelevisionBingeCalculatorDemoSite
Personal project to learn a little NodeJS and Angular. I wanted to be able to track what people searched in my app here https://play.google.com/store/apps/details?id=com.vanillax.televisionbingecalculator.app&hl=en

#Fun CSS stuff
* Google Material CSS ->http://www.getmdl.io/index.html

# Requirements
* Mongodb
* NodeJS
* NPM
* Bower

# Getting started
* Start Mongo ( ie, "sudo mongod" if on osx )
* cd to Sever and run "npm install" after that goto cd public and run "bower install"
* Start the app, "cd Server" then run " node server.js"
* Open Browser and point to "http://localhost:3000"

# Adding data
* POST
* curl -XPOST -H "Content-type: application/json" -d '{"text":"testing1"}' 'http://localhost:3000/api/searchterms'

# Get Data
* GET
* curl -XGET -H "Content-type: application/json" 'http://localhost:3000/api/searchterms'
