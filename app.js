const express = require('express');
const app = express();
const pug = require('pug');
const data = require('./data.json');

//Sets the view engine to pug
app.set('view engine', 'pug');

//Serves the static files - tells the app they are stored in a folder called 'public'
app.use(express.static('public'));

app.get('/', function (req, res) {
    projects = data.projects;
    thumbnail = data.projects.image_urls;
    res.render('index');
});

//Sets the listener to port 3000
app.listen(3000, () => {
    console.log("App is live on localhost:3000")
});