//Sets up express
const express = require('express');
const app = express();

//Provides parsing capability on request objects
app.use(express.json());

//Imports the node path module
const path = require('path');

//Imports pug
const pug = require('pug');

//Specifies that the folder for views is one folder down from the current directory.
//Sets the view engine to pug
app.set('views', path.join(__dirname, 'views')); 
app.set('view engine', 'pug');

//Serves the static files - tells the app they are stored in a folder called 'public'
app.use('/static', express.static('public'));


//Imports the router from the routes folder
const indexRouter = require('./routes/index') //Requires the index.js file in the routes folder. OK

//Delegates routing to the indexRouter on the root URL.
app.use('/', indexRouter);


//Sets the listener to port 3000
app.listen(3000, () => {
    console.log("App is live on localhost:3000")
});

module.exports = app;